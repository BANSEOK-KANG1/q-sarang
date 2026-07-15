import type { DbRepository } from "./types";
import { mockRepository } from "./mock/repository";

/**
 * Returns the active DB implementation.
 * Swap to SqlRepository when DATABASE_URL is configured.
 */
export function getDb(): DbRepository {
  return mockRepository;
}
