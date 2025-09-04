// src/lib/auth.js
import { goto } from "$app/navigation";
import { user } from "../../stores/auth";

export async function logout() {
  try {
    user.set(null);
    await fetch("/api/logout", { method: "POST" });
  } catch (e) {
    console.error("Logout failed", e);
  }

  goto("/login");
}
