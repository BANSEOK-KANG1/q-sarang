"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getDb } from "@/lib/db";
import { requireSession, getSession } from "@/lib/auth/session";
import type {
  BusinessLineCode,
  ContactTargetRole,
  DyeingOrderSettings,
  MemberStatus,
  OrderStatus,
} from "@/lib/domain/types";
import { fileToDataUrl } from "@/lib/utils/photo";

function revalidatePeople() {
  revalidatePath("/director/managers");
  revalidatePath("/director/owners");
  revalidatePath("/director/stores");
  revalidatePath("/manager/owners");
  revalidatePath("/manager/stores");
  revalidatePath("/director");
  revalidatePath("/manager");
}

export async function createManagerAction(formData: FormData) {
  const session = await requireSession("director");
  await getDb().createManager({
    directorId: session.directorId!,
    loginId: String(formData.get("loginId") ?? "").trim(),
    password: String(formData.get("password") ?? ""),
    name: String(formData.get("name") ?? "").trim(),
    phone: String(formData.get("phone") ?? "").trim(),
    status: String(formData.get("status") ?? "active") as MemberStatus,
  });
  revalidatePeople();
}

export async function updateManagerAction(formData: FormData) {
  await requireSession("director");
  await getDb().updateManager(String(formData.get("id") ?? ""), {
    name: String(formData.get("name") ?? "").trim(),
    phone: String(formData.get("phone") ?? "").trim(),
    status: String(formData.get("status") ?? "active") as MemberStatus,
    password: String(formData.get("password") ?? "") || undefined,
  });
  revalidatePeople();
}

export async function createOwnerAction(formData: FormData) {
  const session = await getSession();
  if (!session || (session.role !== "director" && session.role !== "manager")) {
    throw new Error("FORBIDDEN");
  }

  let managerId = String(formData.get("managerId") ?? "").trim();
  if (session.role === "manager") {
    managerId = session.managerId!;
  }

  await getDb().createOwner({
    managerId,
    loginId: String(formData.get("loginId") ?? "").trim(),
    password: String(formData.get("password") ?? ""),
    name: String(formData.get("name") ?? "").trim(),
    phone: String(formData.get("phone") ?? "").trim(),
    status: String(formData.get("status") ?? "active") as MemberStatus,
    requestedBy: session.role,
  });
  revalidatePeople();
  revalidatePath("/director/approvals");
}

export async function updateOwnerAction(formData: FormData) {
  const session = await getSession();
  if (!session || (session.role !== "director" && session.role !== "manager")) {
    throw new Error("FORBIDDEN");
  }

  const id = String(formData.get("id") ?? "");
  if (session.role === "manager") {
    const owner = await getDb().getOwner(id);
    if (!owner || owner.managerId !== session.managerId) {
      throw new Error("FORBIDDEN");
    }
  }

  await getDb().updateOwner(id, {
    name: String(formData.get("name") ?? "").trim(),
    phone: String(formData.get("phone") ?? "").trim(),
    status: String(formData.get("status") ?? "active") as MemberStatus,
    password: String(formData.get("password") ?? "") || undefined,
    managerId:
      session.role === "director"
        ? String(formData.get("managerId") ?? "") || undefined
        : undefined,
  });
  revalidatePeople();
}

export async function createStoreAction(formData: FormData) {
  const session = await getSession();
  if (!session || (session.role !== "director" && session.role !== "manager")) {
    throw new Error("FORBIDDEN");
  }

  const ownerId = String(formData.get("ownerId") ?? "");
  if (session.role === "manager") {
    const owner = await getDb().getOwner(ownerId);
    if (!owner || owner.managerId !== session.managerId) {
      throw new Error("FORBIDDEN");
    }
  }

  await getDb().createStore({
    ownerId,
    name: String(formData.get("name") ?? "").trim(),
    businessLine: String(
      formData.get("businessLine") ?? "dyeing",
    ) as BusinessLineCode,
    address: String(formData.get("address") ?? "").trim(),
  });
  revalidatePeople();
}

export async function updateStoreAction(formData: FormData) {
  const session = await getSession();
  if (!session || (session.role !== "director" && session.role !== "manager")) {
    throw new Error("FORBIDDEN");
  }
  await getDb().updateStore(String(formData.get("id") ?? ""), {
    name: String(formData.get("name") ?? "").trim(),
    address: String(formData.get("address") ?? "").trim(),
    businessLine: String(
      formData.get("businessLine") ?? "dyeing",
    ) as BusinessLineCode,
  });
  revalidatePeople();
}

export async function createProductAction(formData: FormData) {
  await requireSession("director");
  const initialQty = Number(formData.get("initialQty") ?? 0);
  await getDb().createProduct({
    categoryId: String(formData.get("categoryId") ?? ""),
    name: String(formData.get("name") ?? "").trim(),
    sku: String(formData.get("sku") ?? "").trim(),
    unit: String(formData.get("unit") ?? "개").trim(),
    initialQty: Number.isFinite(initialQty) ? initialQty : 0,
  });
  revalidatePath("/director/products");
  revalidatePath("/director/inventory");
}

export async function adjustInventoryAction(formData: FormData) {
  await requireSession("director");
  const qtyOnHand = Number(formData.get("qtyOnHand") ?? 0);
  await getDb().adjustInventory({
    productId: String(formData.get("productId") ?? ""),
    qtyOnHand: Number.isFinite(qtyOnHand) ? qtyOnHand : 0,
  });
  revalidatePath("/director/inventory");
}

export async function updateOrderStatusAction(formData: FormData) {
  await requireSession("director");
  const id = String(formData.get("id") ?? "");
  const status = String(formData.get("status") ?? "") as OrderStatus;
  await getDb().updateOrderStatus(id, status);
  revalidatePath("/director/orders");
  revalidatePath("/director");
  revalidatePath("/manager/orders");
  revalidatePath("/owner/orders");
  revalidatePath("/owner/inventory");
}

export async function createOwnerOrderAction(formData: FormData) {
  const session = await requireSession("owner");
  const ownerId = session.ownerId!;
  const storeId = String(formData.get("storeId") ?? "");
  const businessLine = String(
    formData.get("businessLine") ?? "dyeing",
  ) as BusinessLineCode;

  const settings: DyeingOrderSettings = {
    colorName: String(formData.get("colorName") ?? "").trim() || undefined,
    concentration:
      String(formData.get("concentration") ?? "").trim() || undefined,
    technique: String(formData.get("technique") ?? "").trim() || undefined,
    memo: String(formData.get("memo") ?? "").trim() || undefined,
  };

  const productIds = formData.getAll("productId").map(String);
  const qtys = formData.getAll("qty").map((q) => Number(q));
  const items = productIds
    .map((productId, i) => ({ productId, qty: qtys[i] ?? 0 }))
    .filter((item) => item.qty > 0);

  await getDb().createOrder({
    storeId,
    ownerId,
    businessLine,
    settings,
    items,
  });

  revalidatePath("/owner/orders");
  revalidatePath("/director/orders");
  revalidatePath("/manager/orders");
  redirect("/owner/orders");
}

export async function createContactRequestAction(formData: FormData) {
  const session = await requireSession("owner");
  await getDb().createContactRequest({
    fromOwnerId: session.ownerId!,
    targetRole: String(formData.get("targetRole") ?? "manager") as ContactTargetRole,
    subject: String(formData.get("subject") ?? "").trim(),
    body: String(formData.get("body") ?? "").trim(),
  });
  revalidatePath("/owner/requests");
  revalidatePath("/director/requests");
  revalidatePath("/manager/requests");
  redirect("/owner/requests");
}

export async function replyContactRequestAction(formData: FormData) {
  const session = await getSession();
  if (!session || (session.role !== "director" && session.role !== "manager")) {
    throw new Error("FORBIDDEN");
  }
  await getDb().replyContactRequest({
    id: String(formData.get("id") ?? ""),
    reply: String(formData.get("reply") ?? "").trim(),
    responderUserId: session.userId,
    responderRole: session.role,
  });
  revalidatePath("/director/requests");
  revalidatePath("/manager/requests");
  revalidatePath("/owner/requests");
}

export async function updateDirectorProfileAction(formData: FormData) {
  const session = await requireSession("director");
  const file = formData.get("photo");
  const photoUrl =
    file instanceof File ? await fileToDataUrl(file) : undefined;
  const clearPhoto = String(formData.get("clearPhoto") ?? "") === "1";

  await getDb().updateDirector(session.userId, {
    name: String(formData.get("name") ?? "").trim(),
    phone: String(formData.get("phone") ?? "").trim(),
    photoUrl: clearPhoto ? null : photoUrl,
  });
  revalidatePath("/director/profile");
  revalidatePath("/director");
}

export async function approveOwnerAction(formData: FormData) {
  await requireSession("director");
  await getDb().approveOwner(String(formData.get("id") ?? ""));
  revalidatePeople();
  revalidatePath("/director/approvals");
}

export async function rejectOwnerAction(formData: FormData) {
  await requireSession("director");
  await getDb().rejectOwner(String(formData.get("id") ?? ""));
  revalidatePeople();
  revalidatePath("/director/approvals");
}

export async function submitStoreCoverPhotoAction(formData: FormData) {
  const session = await requireSession("owner");
  const file = formData.get("photo");
  if (!(file instanceof File) || file.size === 0) {
    throw new Error("사진을 선택하세요.");
  }
  const photoUrl = await fileToDataUrl(file);
  if (!photoUrl) throw new Error("사진을 선택하세요.");

  await getDb().submitStoreCoverPhoto(
    String(formData.get("storeId") ?? ""),
    session.ownerId!,
    photoUrl,
  );
  revalidatePath("/owner/stores");
  revalidatePath("/manager/photos");
  revalidatePath("/manager/stores");
  revalidatePath("/director/stores");
}

export async function decideStoreCoverPhotoAction(formData: FormData) {
  const session = await requireSession("manager");
  const decide = String(formData.get("decide") ?? "") as "approve" | "reject";
  await getDb().decideStoreCoverPhoto(
    String(formData.get("storeId") ?? ""),
    session.managerId!,
    decide,
  );
  revalidatePath("/manager/photos");
  revalidatePath("/manager/stores");
  revalidatePath("/owner/stores");
  revalidatePath("/director/stores");
}
