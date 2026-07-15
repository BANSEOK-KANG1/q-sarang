import { nanoid } from "nanoid";
import type {
  BusinessLine,
  BusinessLineCode,
  Category,
  Manager,
  OrderStatus,
  Owner,
  Product,
  SessionUser,
} from "@/lib/domain/types";
import type {
  AdjustInventoryInput,
  CreateContactRequestInput,
  CreateManagerInput,
  CreateOrderInput,
  CreateOwnerInput,
  CreateProductInput,
  CreateStoreInput,
  DashboardStats,
  DbRepository,
  InventoryRow,
  OrderWithItems,
  ReplyContactRequestInput,
  UpdateManagerInput,
  UpdateOwnerInput,
  UpdateStoreInput,
} from "@/lib/db/types";
import { getMockData, resetMockData } from "./store";

function nowIso() {
  return new Date().toISOString();
}

function getBusinessLineForCategory(
  categoryId: string,
): BusinessLine | undefined {
  const data = getMockData();
  const cat = data.categories.find((c) => c.id === categoryId);
  if (!cat) return undefined;
  return data.businessLines.find((b) => b.id === cat.businessLineId);
}

function filterCategories(businessLineCode?: BusinessLineCode): Category[] {
  const data = getMockData();
  if (!businessLineCode) return [...data.categories];
  const bl = data.businessLines.find((b) => b.code === businessLineCode);
  if (!bl) return [];
  return data.categories.filter((c) => c.businessLineId === bl.id);
}

function ownerIdsForScope(scope?: {
  directorId?: string;
  managerId?: string;
  ownerId?: string;
}): Set<string> | null {
  const data = getMockData();
  if (scope?.ownerId) return new Set([scope.ownerId]);
  if (scope?.managerId) {
    return new Set(
      data.owners
        .filter((o) => o.managerId === scope.managerId)
        .map((o) => o.id),
    );
  }
  if (scope?.directorId) {
    const managerIds = new Set(
      data.managers
        .filter((m) => m.directorId === scope.directorId)
        .map((m) => m.id),
    );
    return new Set(
      data.owners.filter((o) => managerIds.has(o.managerId)).map((o) => o.id),
    );
  }
  return null;
}

function isLoginTaken(loginId: string, excludeId?: string): boolean {
  const data = getMockData();
  if (
    data.directors.some((d) => d.loginId === loginId && d.id !== excludeId)
  ) {
    return true;
  }
  if (
    data.managers.some((m) => m.loginId === loginId && m.id !== excludeId)
  ) {
    return true;
  }
  if (data.owners.some((o) => o.loginId === loginId && o.id !== excludeId)) {
    return true;
  }
  return false;
}

export const mockRepository: DbRepository = {
  async authenticate(loginId, password) {
    const data = getMockData();

    const director = data.directors.find(
      (d) => d.loginId === loginId && d.password === password,
    );
    if (director) {
      return {
        role: "director",
        userId: director.id,
        loginId: director.loginId,
        name: director.name,
        directorId: director.id,
      } satisfies SessionUser;
    }

    const manager = data.managers.find(
      (m) => m.loginId === loginId && m.password === password,
    );
    if (manager) {
      if (manager.status === "suspended") return null;
      return {
        role: "manager",
        userId: manager.id,
        loginId: manager.loginId,
        name: manager.name,
        managerId: manager.id,
        directorId: manager.directorId,
      } satisfies SessionUser;
    }

    const owner = data.owners.find(
      (o) => o.loginId === loginId && o.password === password,
    );
    if (owner) {
      if (owner.status === "suspended") return null;
      if (owner.approvalStatus !== "approved") return null;
      const mgr = data.managers.find((m) => m.id === owner.managerId);
      return {
        role: "owner",
        userId: owner.id,
        loginId: owner.loginId,
        name: owner.name,
        ownerId: owner.id,
        managerId: owner.managerId,
        directorId: mgr?.directorId,
      } satisfies SessionUser;
    }

    return null;
  },

  async getDashboardStats(scope) {
    const data = getMockData();
    const ownerIds = ownerIdsForScope(scope);
    const owners = ownerIds
      ? data.owners.filter((o) => ownerIds.has(o.id))
      : data.owners;
    const ownerIdSet = new Set(owners.map((o) => o.id));

    let managers = data.managers;
    if (scope?.directorId) {
      managers = managers.filter((m) => m.directorId === scope.directorId);
    } else if (scope?.managerId) {
      managers = managers.filter((m) => m.id === scope.managerId);
    }

    const stores = data.stores.filter((s) => ownerIdSet.has(s.ownerId));
    const orders = data.orders.filter((o) => ownerIdSet.has(o.ownerId));

    const ordersByStatus: DashboardStats["ordersByStatus"] = {
      received: 0,
      preparing: 0,
      shipped: 0,
      completed: 0,
    };
    for (const o of orders) {
      ordersByStatus[o.status] += 1;
    }

    const pendingContactCount = data.contactRequests.filter((r) => {
      if (r.status !== "pending") return false;
      if (scope?.managerId) return r.targetUserId === scope.managerId;
      if (scope?.directorId) return r.targetUserId === scope.directorId;
      return true;
    }).length;

    const pendingOwnerApprovalCount = owners.filter(
      (o) => o.approvalStatus === "pending",
    ).length;

    const pendingPhotoApprovalCount = stores.filter(
      (s) =>
        s.businessLine === "dyeing" && s.photoApprovalStatus === "pending",
    ).length;

    return {
      managerCount: managers.length,
      ownerCount: owners.filter((o) => o.approvalStatus === "approved").length,
      storeCount: stores.length,
      productCount: data.products.length,
      lowStockCount: data.inventory.filter((i) => i.qtyOnHand < 50).length,
      openOrderCount: ordersByStatus.received + ordersByStatus.preparing,
      pendingContactCount,
      pendingOwnerApprovalCount,
      pendingPhotoApprovalCount,
      ordersByStatus,
    };
  },

  async listBusinessLines() {
    return [...getMockData().businessLines];
  },

  async listCategories(businessLineCode) {
    return filterCategories(businessLineCode);
  },

  async getDirector(id) {
    return getMockData().directors.find((d) => d.id === id) ?? null;
  },

  async updateDirector(id, input) {
    const director = getMockData().directors.find((d) => d.id === id);
    if (!director) throw new Error("이사를 찾을 수 없습니다.");
    if (input.name !== undefined) director.name = input.name;
    if (input.phone !== undefined) director.phone = input.phone;
    if (input.photoUrl === null) {
      delete director.photoUrl;
    } else if (input.photoUrl !== undefined) {
      director.photoUrl = input.photoUrl;
    }
    return director;
  },

  async listManagers(directorId) {
    const list = directorId
      ? getMockData().managers.filter((m) => m.directorId === directorId)
      : [...getMockData().managers];
    return list.sort((a, b) => a.createdAt.localeCompare(b.createdAt));
  },

  async getManager(id) {
    return getMockData().managers.find((m) => m.id === id) ?? null;
  },

  async createManager(input: CreateManagerInput) {
    const data = getMockData();
    if (!data.directors.some((d) => d.id === input.directorId)) {
      throw new Error("이사를 찾을 수 없습니다.");
    }
    if (isLoginTaken(input.loginId)) {
      throw new Error("이미 사용 중인 로그인 ID입니다.");
    }
    const manager: Manager = {
      id: `mgr_${nanoid(8)}`,
      directorId: input.directorId,
      loginId: input.loginId,
      password: input.password,
      name: input.name,
      phone: input.phone,
      status: input.status ?? "active",
      createdAt: nowIso(),
    };
    data.managers.push(manager);
    return manager;
  },

  async updateManager(id, input: UpdateManagerInput) {
    const manager = getMockData().managers.find((m) => m.id === id);
    if (!manager) throw new Error("본부장을 찾을 수 없습니다.");
    if (input.name !== undefined) manager.name = input.name;
    if (input.phone !== undefined) manager.phone = input.phone;
    if (input.status !== undefined) manager.status = input.status;
    if (input.password) manager.password = input.password;
    return manager;
  },

  async listOwners(filters) {
    const data = getMockData();
    let list = [...data.owners];
    if (filters?.managerId) {
      list = list.filter((o) => o.managerId === filters.managerId);
    } else if (filters?.directorId) {
      const mgrIds = new Set(
        data.managers
          .filter((m) => m.directorId === filters.directorId)
          .map((m) => m.id),
      );
      list = list.filter((o) => mgrIds.has(o.managerId));
    }
    if (filters?.approvalStatus) {
      list = list.filter((o) => o.approvalStatus === filters.approvalStatus);
    }
    return list.sort((a, b) => a.createdAt.localeCompare(b.createdAt));
  },

  async getOwner(id) {
    return getMockData().owners.find((o) => o.id === id) ?? null;
  },

  async createOwner(input: CreateOwnerInput) {
    const data = getMockData();
    if (!data.managers.some((m) => m.id === input.managerId)) {
      throw new Error("본부장을 찾을 수 없습니다.");
    }
    if (isLoginTaken(input.loginId)) {
      throw new Error("이미 사용 중인 로그인 ID입니다.");
    }
    const approved = input.requestedBy === "director";
    const ts = nowIso();
    const owner: Owner = {
      id: `own_${nanoid(8)}`,
      managerId: input.managerId,
      loginId: input.loginId,
      password: input.password,
      name: input.name,
      phone: input.phone,
      status: input.status ?? "active",
      approvalStatus: approved ? "approved" : "pending",
      requestedBy: input.requestedBy,
      createdAt: ts,
      approvedAt: approved ? ts : undefined,
    };
    data.owners.push(owner);
    return owner;
  },

  async updateOwner(id, input: UpdateOwnerInput) {
    const owner = getMockData().owners.find((o) => o.id === id);
    if (!owner) throw new Error("원장을 찾을 수 없습니다.");
    if (input.managerId !== undefined) {
      if (!getMockData().managers.some((m) => m.id === input.managerId)) {
        throw new Error("본부장을 찾을 수 없습니다.");
      }
      owner.managerId = input.managerId;
    }
    if (input.name !== undefined) owner.name = input.name;
    if (input.phone !== undefined) owner.phone = input.phone;
    if (input.status !== undefined) owner.status = input.status;
    if (input.password) owner.password = input.password;
    return owner;
  },

  async approveOwner(id) {
    const owner = getMockData().owners.find((o) => o.id === id);
    if (!owner) throw new Error("원장을 찾을 수 없습니다.");
    if (owner.approvalStatus !== "pending") {
      throw new Error("승인 대기 중인 원장이 아닙니다.");
    }
    owner.approvalStatus = "approved";
    owner.approvedAt = nowIso();
    return owner;
  },

  async rejectOwner(id) {
    const owner = getMockData().owners.find((o) => o.id === id);
    if (!owner) throw new Error("원장을 찾을 수 없습니다.");
    if (owner.approvalStatus !== "pending") {
      throw new Error("승인 대기 중인 원장이 아닙니다.");
    }
    owner.approvalStatus = "rejected";
    return owner;
  },

  async listStores(filters) {
    const data = getMockData();
    const ownerIds = ownerIdsForScope(filters);
    let list = [...data.stores];
    if (ownerIds) {
      list = list.filter((s) => ownerIds.has(s.ownerId));
    }
    if (filters?.photoApprovalStatus) {
      list = list.filter(
        (s) => s.photoApprovalStatus === filters.photoApprovalStatus,
      );
    }
    return list.sort((a, b) => a.createdAt.localeCompare(b.createdAt));
  },

  async getStore(id) {
    return getMockData().stores.find((s) => s.id === id) ?? null;
  },

  async createStore(input: CreateStoreInput) {
    const data = getMockData();
    if (!data.owners.some((o) => o.id === input.ownerId)) {
      throw new Error("원장을 찾을 수 없습니다.");
    }
    const store = {
      id: `str_${nanoid(8)}`,
      ownerId: input.ownerId,
      name: input.name,
      businessLine: input.businessLine,
      address: input.address,
      createdAt: nowIso(),
      photoApprovalStatus: "none" as const,
    };
    data.stores.push(store);
    return store;
  },

  async updateStore(id, input: UpdateStoreInput) {
    const store = getMockData().stores.find((s) => s.id === id);
    if (!store) throw new Error("매장을 찾을 수 없습니다.");
    if (input.name !== undefined) store.name = input.name;
    if (input.address !== undefined) store.address = input.address;
    if (input.businessLine !== undefined) {
      store.businessLine = input.businessLine;
    }
    return store;
  },

  async submitStoreCoverPhoto(storeId, ownerId, photoDataUrl) {
    const store = getMockData().stores.find((s) => s.id === storeId);
    if (!store) throw new Error("매장을 찾을 수 없습니다.");
    if (store.ownerId !== ownerId) {
      throw new Error("본인 매장만 사진을 등록할 수 있습니다.");
    }
    if (store.businessLine !== "dyeing") {
      throw new Error("염색방 매장만 대표 사진을 등록할 수 있습니다.");
    }
    store.pendingCoverPhotoUrl = photoDataUrl;
    store.photoApprovalStatus = "pending";
    return store;
  },

  async decideStoreCoverPhoto(storeId, managerId, decide) {
    const data = getMockData();
    const store = data.stores.find((s) => s.id === storeId);
    if (!store) throw new Error("매장을 찾을 수 없습니다.");
    const owner = data.owners.find((o) => o.id === store.ownerId);
    if (!owner || owner.managerId !== managerId) {
      throw new Error("산하 원장 매장만 승인할 수 있습니다.");
    }
    if (store.photoApprovalStatus !== "pending" || !store.pendingCoverPhotoUrl) {
      throw new Error("승인 대기 중인 사진이 없습니다.");
    }
    if (decide === "approve") {
      store.coverPhotoUrl = store.pendingCoverPhotoUrl;
      store.photoApprovalStatus = "approved";
    } else {
      store.photoApprovalStatus = store.coverPhotoUrl ? "approved" : "none";
    }
    delete store.pendingCoverPhotoUrl;
    return store;
  },

  async listProducts(businessLineCode) {
    const data = getMockData();
    const cats = filterCategories(businessLineCode);
    const catIds = new Set(cats.map((c) => c.id));
    return data.products
      .filter((p) => catIds.has(p.categoryId))
      .map((p) => {
        const category = data.categories.find((c) => c.id === p.categoryId)!;
        const businessLine = data.businessLines.find(
          (b) => b.id === category.businessLineId,
        )!;
        return { ...p, category, businessLine };
      });
  },

  async createProduct(input: CreateProductInput) {
    const data = getMockData();
    const category = data.categories.find((c) => c.id === input.categoryId);
    if (!category) throw new Error("카테고리를 찾을 수 없습니다.");
    if (data.products.some((p) => p.sku === input.sku)) {
      throw new Error("이미 사용 중인 SKU입니다.");
    }
    const product: Product = {
      id: `prd_${nanoid(8)}`,
      categoryId: input.categoryId,
      name: input.name,
      sku: input.sku,
      unit: input.unit,
    };
    data.products.push(product);
    data.inventory.push({
      id: `inv_${nanoid(8)}`,
      productId: product.id,
      qtyOnHand: input.initialQty ?? 0,
      updatedAt: nowIso(),
    });
    return product;
  },

  async listInventory(businessLineCode) {
    const data = getMockData();
    const rows: InventoryRow[] = [];
    for (const inv of data.inventory) {
      const product = data.products.find((p) => p.id === inv.productId);
      if (!product) continue;
      const category = data.categories.find((c) => c.id === product.categoryId);
      if (!category) continue;
      const businessLine = data.businessLines.find(
        (b) => b.id === category.businessLineId,
      );
      if (!businessLine) continue;
      if (businessLineCode && businessLine.code !== businessLineCode) continue;
      rows.push({ ...inv, product, category, businessLine });
    }
    return rows;
  },

  async adjustInventory(input: AdjustInventoryInput) {
    const inv = getMockData().inventory.find(
      (i) => i.productId === input.productId,
    );
    if (!inv) throw new Error("재고를 찾을 수 없습니다.");
    inv.qtyOnHand = input.qtyOnHand;
    inv.updatedAt = nowIso();
    return inv;
  },

  async listOrders(filters) {
    const data = getMockData();
    const ownerIds = ownerIdsForScope(filters);
    let orders = [...data.orders];
    if (ownerIds) {
      orders = orders.filter((o) => ownerIds.has(o.ownerId));
    }
    if (filters?.businessLine) {
      orders = orders.filter((o) => o.businessLine === filters.businessLine);
    }
    orders.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
    return orders.map((o) => ({
      ...o,
      items: data.orderItems.filter((i) => i.orderId === o.id),
    }));
  },

  async getOrder(id) {
    const data = getMockData();
    const order = data.orders.find((o) => o.id === id);
    if (!order) return null;
    return {
      ...order,
      items: data.orderItems.filter((i) => i.orderId === id),
    };
  },

  async createOrder(input: CreateOrderInput) {
    const data = getMockData();
    const store = data.stores.find((s) => s.id === input.storeId);
    if (!store) throw new Error("매장을 찾을 수 없습니다.");
    if (store.ownerId !== input.ownerId) {
      throw new Error("매장 소유자가 일치하지 않습니다.");
    }
    if (input.items.length === 0) {
      throw new Error("주문 상품을 선택하세요.");
    }
    for (const item of input.items) {
      if (item.qty <= 0) throw new Error("수량은 1 이상이어야 합니다.");
      const product = data.products.find((p) => p.id === item.productId);
      if (!product) throw new Error("상품을 찾을 수 없습니다.");
      const bl = getBusinessLineForCategory(product.categoryId);
      if (!bl || bl.code !== input.businessLine) {
        throw new Error("업종에 맞지 않는 상품입니다.");
      }
    }

    const ts = nowIso();
    const order = {
      id: `ord_${nanoid(8)}`,
      storeId: input.storeId,
      ownerId: input.ownerId,
      businessLine: input.businessLine,
      status: "received" as OrderStatus,
      settings: input.settings,
      createdAt: ts,
      updatedAt: ts,
    };
    data.orders.push(order);
    const items = input.items.map((item) => ({
      id: `oi_${nanoid(8)}`,
      orderId: order.id,
      productId: item.productId,
      qty: item.qty,
    }));
    data.orderItems.push(...items);
    return { ...order, items };
  },

  async updateOrderStatus(id, status) {
    const data = getMockData();
    const order = data.orders.find((o) => o.id === id);
    if (!order) throw new Error("주문을 찾을 수 없습니다.");

    if (status === "shipped" && order.status !== "shipped") {
      const items = data.orderItems.filter((i) => i.orderId === id);
      for (const item of items) {
        const inv = data.inventory.find((i) => i.productId === item.productId);
        if (inv) {
          inv.qtyOnHand = Math.max(0, inv.qtyOnHand - item.qty);
          inv.updatedAt = nowIso();
        }
      }
    }

    order.status = status;
    order.updatedAt = nowIso();
    return order;
  },

  async listContactRequests(filters) {
    let list = [...getMockData().contactRequests];
    if (filters?.fromOwnerId) {
      list = list.filter((r) => r.fromOwnerId === filters.fromOwnerId);
    }
    if (filters?.targetUserId) {
      list = list.filter((r) => r.targetUserId === filters.targetUserId);
    }
    return list.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  },

  async createContactRequest(input: CreateContactRequestInput) {
    const data = getMockData();
    const owner = data.owners.find((o) => o.id === input.fromOwnerId);
    if (!owner) throw new Error("원장을 찾을 수 없습니다.");
    const manager = data.managers.find((m) => m.id === owner.managerId);
    if (!manager) throw new Error("소속 본부장을 찾을 수 없습니다.");

    let targetUserId: string;
    if (input.targetRole === "manager") {
      targetUserId = manager.id;
    } else {
      targetUserId = manager.directorId;
    }

    const req = {
      id: `req_${nanoid(8)}`,
      fromOwnerId: input.fromOwnerId,
      targetRole: input.targetRole,
      targetUserId,
      subject: input.subject,
      body: input.body,
      status: "pending" as const,
      createdAt: nowIso(),
    };
    data.contactRequests.push(req);
    return req;
  },

  async replyContactRequest(input: ReplyContactRequestInput) {
    const req = getMockData().contactRequests.find((r) => r.id === input.id);
    if (!req) throw new Error("요청을 찾을 수 없습니다.");
    if (req.targetUserId !== input.responderUserId) {
      throw new Error("이 요청에 답변할 권한이 없습니다.");
    }
    req.reply = input.reply;
    req.status = "replied";
    req.repliedAt = nowIso();
    return req;
  },

  async getOwnerUpline(ownerId) {
    const data = getMockData();
    const owner = data.owners.find((o) => o.id === ownerId);
    if (!owner) return { manager: null, director: null };
    const manager = data.managers.find((m) => m.id === owner.managerId) ?? null;
    const director = manager
      ? (data.directors.find((d) => d.id === manager.directorId) ?? null)
      : null;
    return { manager, director };
  },

  async reset() {
    resetMockData();
  },
};
