import type {
  ApprovalStatus,
  BusinessLine,
  BusinessLineCode,
  Category,
  ContactRequest,
  ContactTargetRole,
  Director,
  DyeingOrderSettings,
  Inventory,
  Manager,
  MemberStatus,
  Order,
  OrderItem,
  OrderStatus,
  Owner,
  PhotoApprovalStatus,
  Product,
  SessionUser,
  Store,
} from "@/lib/domain/types";

export interface CreateManagerInput {
  directorId: string;
  loginId: string;
  password: string;
  name: string;
  phone: string;
  status?: MemberStatus;
}

export interface UpdateManagerInput {
  name?: string;
  phone?: string;
  status?: MemberStatus;
  password?: string;
}

export interface CreateOwnerInput {
  managerId: string;
  loginId: string;
  password: string;
  name: string;
  phone: string;
  status?: MemberStatus;
  /** director 등록 → 즉시 승인, manager 등록 → 승인 대기 */
  requestedBy: "director" | "manager";
}

export interface UpdateOwnerInput {
  name?: string;
  phone?: string;
  status?: MemberStatus;
  password?: string;
  managerId?: string;
}

export interface CreateStoreInput {
  ownerId: string;
  name: string;
  businessLine: BusinessLineCode;
  address: string;
}

export interface UpdateStoreInput {
  name?: string;
  address?: string;
  businessLine?: BusinessLineCode;
}

export interface UpdateDirectorInput {
  name?: string;
  phone?: string;
  photoUrl?: string | null;
}

export interface CreateProductInput {
  categoryId: string;
  name: string;
  sku: string;
  unit: string;
  initialQty?: number;
}

export interface AdjustInventoryInput {
  productId: string;
  qtyOnHand: number;
}

export interface CreateOrderInput {
  storeId: string;
  ownerId: string;
  businessLine: BusinessLineCode;
  settings: DyeingOrderSettings;
  items: { productId: string; qty: number }[];
}

export interface CreateContactRequestInput {
  fromOwnerId: string;
  targetRole: ContactTargetRole;
  subject: string;
  body: string;
}

export interface ReplyContactRequestInput {
  id: string;
  reply: string;
  responderUserId: string;
  responderRole: "director" | "manager";
}

export interface OrderWithItems extends Order {
  items: OrderItem[];
}

export interface InventoryRow extends Inventory {
  product: Product;
  category: Category;
  businessLine: BusinessLine;
}

export interface DashboardStats {
  managerCount: number;
  ownerCount: number;
  storeCount: number;
  productCount: number;
  lowStockCount: number;
  openOrderCount: number;
  pendingContactCount: number;
  pendingOwnerApprovalCount: number;
  pendingPhotoApprovalCount: number;
  ordersByStatus: Record<OrderStatus, number>;
}

export interface DbRepository {
  authenticate(
    loginId: string,
    password: string,
  ): Promise<SessionUser | null>;

  getDashboardStats(scope?: {
    directorId?: string;
    managerId?: string;
  }): Promise<DashboardStats>;

  listBusinessLines(): Promise<BusinessLine[]>;
  listCategories(businessLineCode?: BusinessLineCode): Promise<Category[]>;

  getDirector(id: string): Promise<Director | null>;
  updateDirector(id: string, input: UpdateDirectorInput): Promise<Director>;

  listManagers(directorId?: string): Promise<Manager[]>;
  getManager(id: string): Promise<Manager | null>;
  createManager(input: CreateManagerInput): Promise<Manager>;
  updateManager(id: string, input: UpdateManagerInput): Promise<Manager>;

  listOwners(filters?: {
    directorId?: string;
    managerId?: string;
    approvalStatus?: ApprovalStatus;
  }): Promise<Owner[]>;
  getOwner(id: string): Promise<Owner | null>;
  createOwner(input: CreateOwnerInput): Promise<Owner>;
  updateOwner(id: string, input: UpdateOwnerInput): Promise<Owner>;
  approveOwner(id: string): Promise<Owner>;
  rejectOwner(id: string): Promise<Owner>;

  listStores(filters?: {
    ownerId?: string;
    managerId?: string;
    directorId?: string;
    photoApprovalStatus?: PhotoApprovalStatus;
  }): Promise<Store[]>;
  getStore(id: string): Promise<Store | null>;
  createStore(input: CreateStoreInput): Promise<Store>;
  updateStore(id: string, input: UpdateStoreInput): Promise<Store>;
  submitStoreCoverPhoto(
    storeId: string,
    ownerId: string,
    photoDataUrl: string,
  ): Promise<Store>;
  decideStoreCoverPhoto(
    storeId: string,
    managerId: string,
    decide: "approve" | "reject",
  ): Promise<Store>;

  listProducts(businessLineCode?: BusinessLineCode): Promise<
    (Product & { category: Category; businessLine: BusinessLine })[]
  >;
  createProduct(input: CreateProductInput): Promise<Product>;

  listInventory(businessLineCode?: BusinessLineCode): Promise<InventoryRow[]>;
  adjustInventory(input: AdjustInventoryInput): Promise<Inventory>;

  listOrders(filters?: {
    ownerId?: string;
    managerId?: string;
    directorId?: string;
    businessLine?: BusinessLineCode;
  }): Promise<OrderWithItems[]>;
  getOrder(id: string): Promise<OrderWithItems | null>;
  createOrder(input: CreateOrderInput): Promise<OrderWithItems>;
  updateOrderStatus(id: string, status: OrderStatus): Promise<Order>;

  listContactRequests(filters?: {
    fromOwnerId?: string;
    targetUserId?: string;
  }): Promise<ContactRequest[]>;
  createContactRequest(
    input: CreateContactRequestInput,
  ): Promise<ContactRequest>;
  replyContactRequest(
    input: ReplyContactRequestInput,
  ): Promise<ContactRequest>;

  getOwnerUpline(ownerId: string): Promise<{
    manager: Manager | null;
    director: Director | null;
  }>;

  reset(): Promise<void>;
}
