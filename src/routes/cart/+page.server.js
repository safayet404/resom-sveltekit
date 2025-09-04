import { getPromotions } from "$lib/api/saleor.js";
import { defaultChannel, getProfile } from "$lib/saleor/auth.js";
import { fetchAllVouchers, fetchVouchers, fetchVouchersAll } from "$lib/saleor/vouchers";

export async function load({ cookies }) {
  try {
    const token = cookies.get("authToken");
    // const profile = await getProfile(token);

    return { token };
  } catch (error) {
    console.error("Voucher fetch failed:", error);
  }
}
