// import { refreshAuthToken, logout, saleorApiUrl } from "./auth";
// import { isTokenExpired } from "$lib/utils/jwt";


// export async function graphqlRequest(query, variables = {}) {
//     let token = JSON.parse(localStorage.getItem("authToken"));

//     if (!token || isTokenExpired(token)) {
//         const refreshed = await refreshAuthToken();
//         if (!refreshed) {
//             logout();
//             throw new Error("Session expired. Please log in again.");
//         }
//         token = refreshed.token;
//     }

//     const res = await fetch(saleorApiUrl, {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({ query, variables }),
//     });

//     return await res.json();
// }

// src/lib/utils/graphqlRequest.js
import { saleorApiUrl } from '$lib/saleor/auth';

export async function graphqlRequest(query, variables = {}) {
    const res = await fetch(saleorApiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include', // ✅ Send authToken cookie
        body: JSON.stringify({ query, variables })
    });

    const json = await res.json();
    if (json.errors) {
        throw new Error(json.errors[0].message);
    }

    return json.data;
}
