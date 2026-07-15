import type { MockData } from "./seed";
import { createSeed } from "./seed";

const SEED_VERSION = 3;

const globalForDb = globalThis as unknown as {
  __qsarangMockData?: MockData;
  __qsarangSeedVersion?: number;
};

function isCurrentShape(data: MockData | undefined): data is MockData {
  return Boolean(
    data &&
      Array.isArray(data.directors) &&
      Array.isArray(data.managers) &&
      Array.isArray(data.owners) &&
      Array.isArray(data.contactRequests) &&
      data.owners[0] &&
      "approvalStatus" in data.owners[0] &&
      data.stores[0] &&
      "photoApprovalStatus" in data.stores[0],
  );
}

export function getMockData(): MockData {
  if (
    globalForDb.__qsarangSeedVersion !== SEED_VERSION ||
    !isCurrentShape(globalForDb.__qsarangMockData)
  ) {
    globalForDb.__qsarangMockData = createSeed();
    globalForDb.__qsarangSeedVersion = SEED_VERSION;
  }
  return globalForDb.__qsarangMockData;
}

export function resetMockData(): void {
  globalForDb.__qsarangMockData = createSeed();
  globalForDb.__qsarangSeedVersion = SEED_VERSION;
}
