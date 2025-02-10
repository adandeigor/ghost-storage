import pako from "pako";

export const storageHelper = {
  set: (key: string, value: any, type: "local" | "session" = "local", ttl?: number) => {
    const storage = type === "local" ? localStorage : sessionStorage;
    const data = {
      value,
      expiry: ttl ? Date.now() + ttl : null,
    };
    const compressed = pako.deflate(JSON.stringify(data));
    const compressedString = btoa(String.fromCharCode(...new Uint8Array(compressed)));
    storage.setItem(key, compressedString);
  },
  get: (key: string, type: "local" | "session" = "local") => {
    const storage = type === "local" ? localStorage : sessionStorage;
    const item = storage.getItem(key);
    if (!item) return null;

    try {
      const decompressed = JSON.parse(pako.inflate(Uint8Array.from(atob(item), c => c.charCodeAt(0)), { to: "string" }));
      if (decompressed.expiry && Date.now() > decompressed.expiry) {
        storage.removeItem(key);
        return null;
      }
      return decompressed.value;
    } catch (error) {
      console.error("Error decompressing or parsing data", error);
      return null;
    }
  },
  remove: (key: string, type: "local" | "session" = "local") => {
    const storage = type === "local" ? localStorage : sessionStorage;
    storage.removeItem(key);
  },
  clear: (type: "local" | "session" = "local") => {
    const storage = type === "local" ? localStorage : sessionStorage;
    storage.clear();
  },
  listen: (callback: (key: string, newValue: any) => void) => {
    window.addEventListener("storage", (event) => {
      if (event.key && event.newValue) {
        callback(event.key, JSON.parse(event.newValue));
      }
    });
  },
  
  async protectWithBiometrics(key: string, value: any, type: "local" | "session" = "local") {
    if (!window.PublicKeyCredential) {
      throw new Error("WebAuthn not supported on this browser.");
    }
    
    try {
      const credential = await navigator.credentials.create({
        publicKey: {
          challenge: new Uint8Array(32),
          rp: { name: "Storage Helper" },
          user: { id: new Uint8Array(16), name: "user", displayName: "User" },
          pubKeyCredParams: [{ type: "public-key", alg: -7 }],
          authenticatorSelection: { userVerification: "required" },
          timeout: 60000,
        },
      });

      if (credential) {
        storageHelper.set(key, value, type);
      }
    } catch (error) {
      console.error("Biometric authentication failed", error);
    }
  },

  async retrieveWithBiometrics(key: string, type: "local" | "session" = "local") {
    if (!window.PublicKeyCredential) {
      throw new Error("WebAuthn not supported on this browser.");
    }
    
    try {
      const credential = await navigator.credentials.get({
        publicKey: { challenge: new Uint8Array(32), timeout: 60000 },
      });
      
      if (credential) {
        return storageHelper.get(key, type);
      }
    } catch (error) {
      console.error("Biometric authentication failed", error);
      return null;
    }
  }
};