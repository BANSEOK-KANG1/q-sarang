export type Role = "director" | "manager" | "owner";

export type BusinessLineCode = "dyeing" | "cordyceps";

export type MemberStatus = "active" | "suspended";

export type ApprovalStatus = "pending" | "approved" | "rejected";

export type PhotoApprovalStatus = "none" | "pending" | "approved";

export type OrderStatus = "received" | "preparing" | "shipped" | "completed";

export type ContactTargetRole = "manager" | "director";

export type ContactRequestStatus = "pending" | "replied";

export interface BusinessLine {
  id: string;
  code: BusinessLineCode;
  name: string;
}

/** 이사 */
export interface Director {
  id: string;
  loginId: string;
  password: string;
  name: string;
  phone: string;
  /** data URL or remote URL (mock: data URL) */
  photoUrl?: string;
}

/** 본부장 — 이사 산하 */
export interface Manager {
  id: string;
  directorId: string;
  loginId: string;
  password: string;
  name: string;
  phone: string;
  status: MemberStatus;
  createdAt: string;
}

/** 원장 — 본부장 산하 */
export interface Owner {
  id: string;
  managerId: string;
  loginId: string;
  password: string;
  name: string;
  phone: string;
  status: MemberStatus;
  /** 본부장 등록 시 pending → 이사 승인 후 approved */
  approvalStatus: ApprovalStatus;
  requestedBy: "director" | "manager";
  createdAt: string;
  approvedAt?: string;
}

export interface Store {
  id: string;
  ownerId: string;
  name: string;
  businessLine: BusinessLineCode;
  address: string;
  createdAt: string;
  /** 승인된 대표 사진 (염색방) */
  coverPhotoUrl?: string;
  /** 승인 대기 중인 새 대표 사진 */
  pendingCoverPhotoUrl?: string;
  photoApprovalStatus: PhotoApprovalStatus;
}

export interface Category {
  id: string;
  businessLineId: string;
  name: string;
}

export interface Product {
  id: string;
  categoryId: string;
  name: string;
  sku: string;
  unit: string;
}

export interface Inventory {
  id: string;
  productId: string;
  qtyOnHand: number;
  updatedAt: string;
}

export interface DyeingOrderSettings {
  colorName?: string;
  concentration?: string;
  technique?: string;
  memo?: string;
}

export interface Order {
  id: string;
  storeId: string;
  ownerId: string;
  businessLine: BusinessLineCode;
  status: OrderStatus;
  settings: DyeingOrderSettings;
  createdAt: string;
  updatedAt: string;
}

export interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  qty: number;
}

export interface ContactRequest {
  id: string;
  fromOwnerId: string;
  targetRole: ContactTargetRole;
  targetUserId: string;
  subject: string;
  body: string;
  status: ContactRequestStatus;
  reply?: string;
  createdAt: string;
  repliedAt?: string;
}

export interface SessionUser {
  role: Role;
  userId: string;
  loginId: string;
  name: string;
  directorId?: string;
  managerId?: string;
  ownerId?: string;
}

export const ROLE_LABEL: Record<Role, string> = {
  director: "이사",
  manager: "본부장",
  owner: "원장",
};

export const ORDER_STATUS_LABEL: Record<OrderStatus, string> = {
  received: "접수",
  preparing: "준비",
  shipped: "출고",
  completed: "완료",
};

export const BUSINESS_LINE_LABEL: Record<BusinessLineCode, string> = {
  dyeing: "염색방",
  cordyceps: "제왕충초",
};

export const MEMBER_STATUS_LABEL: Record<MemberStatus, string> = {
  active: "활성",
  suspended: "중지",
};

export const APPROVAL_STATUS_LABEL: Record<ApprovalStatus, string> = {
  pending: "승인대기",
  approved: "승인완료",
  rejected: "반려",
};

export const PHOTO_APPROVAL_LABEL: Record<PhotoApprovalStatus, string> = {
  none: "사진없음",
  pending: "사진 승인대기",
  approved: "사진 승인",
};

export const CONTACT_STATUS_LABEL: Record<ContactRequestStatus, string> = {
  pending: "대기",
  replied: "답변완료",
};

export const OWNER_STATUS_LABEL = MEMBER_STATUS_LABEL;
