import type {
  BusinessLine,
  Category,
  ContactRequest,
  Director,
  Inventory,
  Manager,
  Order,
  OrderItem,
  Owner,
  Product,
  Store,
} from "@/lib/domain/types";

export interface MockData {
  directors: Director[];
  managers: Manager[];
  businessLines: BusinessLine[];
  owners: Owner[];
  stores: Store[];
  categories: Category[];
  products: Product[];
  inventory: Inventory[];
  orders: Order[];
  orderItems: OrderItem[];
  contactRequests: ContactRequest[];
}

export function createSeed(): MockData {
  const now = "2026-07-01T09:00:00.000Z";

  const businessLines: BusinessLine[] = [
    { id: "bl_dyeing", code: "dyeing", name: "염색방" },
    { id: "bl_cordyceps", code: "cordyceps", name: "제왕충초" },
  ];

  const directors: Director[] = [
    {
      id: "dir_001",
      loginId: "director",
      password: "director123",
      name: "정이사",
      phone: "010-1000-0001",
    },
  ];

  const managers: Manager[] = [
    {
      id: "mgr_001",
      directorId: "dir_001",
      loginId: "manager1",
      password: "manager123",
      name: "한본부장",
      phone: "010-2000-0001",
      status: "active",
      createdAt: now,
    },
    {
      id: "mgr_002",
      directorId: "dir_001",
      loginId: "manager2",
      password: "manager123",
      name: "윤본부장",
      phone: "010-2000-0002",
      status: "active",
      createdAt: now,
    },
  ];

  const owners: Owner[] = [
    {
      id: "own_001",
      managerId: "mgr_001",
      loginId: "owner1",
      password: "owner123",
      name: "김민지",
      phone: "010-1111-2222",
      status: "active",
      approvalStatus: "approved",
      requestedBy: "director",
      createdAt: now,
      approvedAt: now,
    },
    {
      id: "own_002",
      managerId: "mgr_001",
      loginId: "owner2",
      password: "owner123",
      name: "박서준",
      phone: "010-3333-4444",
      status: "active",
      approvalStatus: "approved",
      requestedBy: "director",
      createdAt: now,
      approvedAt: now,
    },
    {
      id: "own_003",
      managerId: "mgr_002",
      loginId: "owner3",
      password: "owner123",
      name: "이하늘",
      phone: "010-5555-6666",
      status: "suspended",
      approvalStatus: "approved",
      requestedBy: "director",
      createdAt: now,
      approvedAt: now,
    },
    {
      id: "own_004",
      managerId: "mgr_001",
      loginId: "owner4",
      password: "owner123",
      name: "최예린",
      phone: "010-7777-8888",
      status: "active",
      approvalStatus: "pending",
      requestedBy: "manager",
      createdAt: "2026-07-14T10:00:00.000Z",
    },
  ];

  const stores: Store[] = [
    {
      id: "str_001",
      ownerId: "own_001",
      name: "민지 염색방 강남점",
      businessLine: "dyeing",
      address: "서울 강남구 테헤란로 12",
      createdAt: now,
      photoApprovalStatus: "none",
    },
    {
      id: "str_002",
      ownerId: "own_001",
      name: "민지 제왕충초 강남",
      businessLine: "cordyceps",
      address: "서울 강남구 테헤란로 12",
      createdAt: now,
      photoApprovalStatus: "none",
    },
    {
      id: "str_003",
      ownerId: "own_002",
      name: "서준 염색방 홍대점",
      businessLine: "dyeing",
      address: "서울 마포구 양화로 45",
      createdAt: now,
      photoApprovalStatus: "pending",
      pendingCoverPhotoUrl:
        "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MDAiIGhlaWdodD0iMjQwIj48cmVjdCBmaWxsPSIjZWRlOWZlIiB3aWR0aD0iNDAwIiBoZWlnaHQ9IjI0MCIvPjx0ZXh0IHg9IjIwMCIgeT0iMTIwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjNmQyOGQ5IiBmb250LXNpemU9IjIwIj7ssrTsobDrs7Qg7ZSM64ukPC90ZXh0Pjwvc3ZnPg==",
    },
    {
      id: "str_004",
      ownerId: "own_003",
      name: "하늘 염색방 부산점",
      businessLine: "dyeing",
      address: "부산 해운대구 센텀로 8",
      createdAt: now,
      photoApprovalStatus: "none",
    },
  ];

  const categories: Category[] = [
    { id: "cat_dye_color", businessLineId: "bl_dyeing", name: "염모제" },
    { id: "cat_dye_care", businessLineId: "bl_dyeing", name: "트리트먼트" },
    { id: "cat_dye_tool", businessLineId: "bl_dyeing", name: "시술도구" },
    {
      id: "cat_cord_bottle",
      businessLineId: "bl_cordyceps",
      name: "담금주",
    },
    {
      id: "cat_cord_raw",
      businessLineId: "bl_cordyceps",
      name: "원물·부재료",
    },
  ];

  const products: Product[] = [
    {
      id: "prd_001",
      categoryId: "cat_dye_color",
      name: "애시 브라운 염모제",
      sku: "DYE-AB-01",
      unit: "통",
    },
    {
      id: "prd_002",
      categoryId: "cat_dye_color",
      name: "밀크 티 베이지 염모제",
      sku: "DYE-MT-02",
      unit: "통",
    },
    {
      id: "prd_003",
      categoryId: "cat_dye_care",
      name: "컬러케어 마스크",
      sku: "DYE-CM-01",
      unit: "개",
    },
    {
      id: "prd_004",
      categoryId: "cat_dye_tool",
      name: "염색 브러시 세트",
      sku: "DYE-BR-01",
      unit: "세트",
    },
    {
      id: "prd_005",
      categoryId: "cat_cord_bottle",
      name: "제왕충초 담금주 500ml",
      sku: "COR-500",
      unit: "병",
    },
    {
      id: "prd_006",
      categoryId: "cat_cord_bottle",
      name: "제왕충초 담금주 1L",
      sku: "COR-1000",
      unit: "병",
    },
    {
      id: "prd_007",
      categoryId: "cat_cord_raw",
      name: "동충하초 건조원물",
      sku: "COR-RAW-01",
      unit: "팩",
    },
  ];

  const inventory: Inventory[] = [
    { id: "inv_001", productId: "prd_001", qtyOnHand: 120, updatedAt: now },
    { id: "inv_002", productId: "prd_002", qtyOnHand: 85, updatedAt: now },
    { id: "inv_003", productId: "prd_003", qtyOnHand: 200, updatedAt: now },
    { id: "inv_004", productId: "prd_004", qtyOnHand: 40, updatedAt: now },
    { id: "inv_005", productId: "prd_005", qtyOnHand: 60, updatedAt: now },
    { id: "inv_006", productId: "prd_006", qtyOnHand: 35, updatedAt: now },
    { id: "inv_007", productId: "prd_007", qtyOnHand: 90, updatedAt: now },
  ];

  const orders: Order[] = [
    {
      id: "ord_001",
      storeId: "str_001",
      ownerId: "own_001",
      businessLine: "dyeing",
      status: "preparing",
      settings: {
        colorName: "애시 브라운",
        concentration: "6%",
        technique: "뿌리 리터치",
        memo: "정기 보충",
      },
      createdAt: "2026-07-10T10:00:00.000Z",
      updatedAt: "2026-07-11T08:00:00.000Z",
    },
    {
      id: "ord_002",
      storeId: "str_003",
      ownerId: "own_002",
      businessLine: "dyeing",
      status: "received",
      settings: {
        colorName: "밀크 티 베이지",
        concentration: "3%",
        technique: "전체 염색",
        memo: "",
      },
      createdAt: "2026-07-14T14:30:00.000Z",
      updatedAt: "2026-07-14T14:30:00.000Z",
    },
    {
      id: "ord_003",
      storeId: "str_001",
      ownerId: "own_001",
      businessLine: "dyeing",
      status: "shipped",
      settings: {
        colorName: "애시 브라운",
        concentration: "6%",
        technique: "하이라이트",
        memo: "브러시 추가",
      },
      createdAt: "2026-07-05T09:00:00.000Z",
      updatedAt: "2026-07-08T16:00:00.000Z",
    },
  ];

  const orderItems: OrderItem[] = [
    { id: "oi_001", orderId: "ord_001", productId: "prd_001", qty: 10 },
    { id: "oi_002", orderId: "ord_001", productId: "prd_003", qty: 5 },
    { id: "oi_003", orderId: "ord_002", productId: "prd_002", qty: 8 },
    { id: "oi_004", orderId: "ord_002", productId: "prd_003", qty: 4 },
    { id: "oi_005", orderId: "ord_003", productId: "prd_001", qty: 6 },
    { id: "oi_006", orderId: "ord_003", productId: "prd_004", qty: 2 },
  ];

  const contactRequests: ContactRequest[] = [
    {
      id: "req_001",
      fromOwnerId: "own_001",
      targetRole: "manager",
      targetUserId: "mgr_001",
      subject: "추가 재고 문의",
      body: "주말 예약이 많아 염모제 추가 출고 가능한지 확인 부탁드립니다.",
      status: "replied",
      reply: "내일 오전 출고로 맞춰 드리겠습니다.",
      createdAt: "2026-07-12T11:00:00.000Z",
      repliedAt: "2026-07-12T15:00:00.000Z",
    },
    {
      id: "req_002",
      fromOwnerId: "own_002",
      targetRole: "director",
      targetUserId: "dir_001",
      subject: "매장 이전 상담",
      body: "홍대점 확장 이전을 검토 중입니다. 일정 조율 부탁드립니다.",
      status: "pending",
      createdAt: "2026-07-14T09:00:00.000Z",
    },
  ];

  return {
    directors,
    managers,
    businessLines,
    owners,
    stores,
    categories,
    products,
    inventory,
    orders,
    orderItems,
    contactRequests,
  };
}
