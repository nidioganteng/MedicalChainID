// src/utils/auth.js
import { AuthClient } from "@dfinity/auth-client";

export const IDENTITY_PROVIDER = "https://identity.ic0.app";

let authClient;

export async function initAuthClient() {
  authClient = await AuthClient.create();
  return authClient;
}

export async function login(onSuccess) {
  if (!authClient) {
    authClient = await AuthClient.create();
  }

  await authClient.login({
    identityProvider: IDENTITY_PROVIDER,
    onSuccess: async () => {
      const identity = authClient.getIdentity();
      const principal = identity.getPrincipal().toString();
      onSuccess(principal);
    },
  });
}

export async function logout() {
  if (authClient) {
    await authClient.logout();
  }
}
