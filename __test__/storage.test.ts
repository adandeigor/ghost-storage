// filepath: /home/hustler/Bureau/Projets/local-storage/__test__/storage.test.ts
import { storageHelper } from "../src/storage";

describe("storageHelper", () => {
  beforeEach(() => {
    localStorage.clear();
    sessionStorage.clear();
  });

  test("set and get data", () => {
    storageHelper.set("testKey", "testValue", "local");
    expect(storageHelper.get("testKey", "local")).toBe("testValue");
  });

  test("removes data", () => {
    storageHelper.set("testKey", "testValue", "local");
    storageHelper.remove("testKey", "local");
    expect(storageHelper.get("testKey", "local")).toBeNull();
  });

  test("handles expiration correctly", () => {
    storageHelper.set("tempKey", "tempValue", "local", 100); // Expire après 100ms
    setTimeout(() => {
      expect(storageHelper.get("tempKey", "local")).toBeNull();
    }, 150);
  });

  test("fallback to sessionStorage", () => {
    storageHelper.set("sessionKey", "sessionValue", "session");
    expect(storageHelper.get("sessionKey", "session")).toBe("sessionValue");
  });
});