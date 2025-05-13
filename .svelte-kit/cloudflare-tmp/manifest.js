export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["affiliate.png","banner3.png","banner4.png","boleto.png","casual.png","cat1.png","cat2.png","cat3.png","credit.png","debit.png","epay.png","error.gif","error2.jpg","favicon.png","fb.png","formal.png","gpay.png","gym.png","instagram.png","linkedin.png","login.gif","login.jpg","mastercard.png","p1.png","p2.png","p3.png","p4.png","party.png","paypal.png","pd1.png","pd2.png","pd3.png","pd4.png","pix.png","review.png","robots.txt","visa.png","x.png","youtube.png"]),
	mimeTypes: {".png":"image/png",".gif":"image/gif",".jpg":"image/jpeg",".txt":"text/plain"},
	_: {
		client: {start:"_app/immutable/entry/start.D8mMjXUe.js",app:"_app/immutable/entry/app.DD0Jeyhm.js",imports:["_app/immutable/entry/start.D8mMjXUe.js","_app/immutable/chunks/1o6BxO2k.js","_app/immutable/chunks/DoNDGHyy.js","_app/immutable/chunks/14ueUjGG.js","_app/immutable/chunks/Dja85v4K.js","_app/immutable/entry/app.DD0Jeyhm.js","_app/immutable/chunks/DoNDGHyy.js","_app/immutable/chunks/DC9tgs7-.js","_app/immutable/chunks/BZLr5Rgo.js","_app/immutable/chunks/C2qLbvVc.js","_app/immutable/chunks/DNFbThfs.js","_app/immutable/chunks/BX3J5sb_.js","_app/immutable/chunks/CenNGW9f.js","_app/immutable/chunks/D_M2Cz9B.js","_app/immutable/chunks/B0y5V2xw.js","_app/immutable/chunks/jw234UM_.js","_app/immutable/chunks/14ueUjGG.js","_app/immutable/chunks/Dja85v4K.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('../output/server/nodes/0.js')),
			__memo(() => import('../output/server/nodes/1.js')),
			__memo(() => import('../output/server/nodes/2.js')),
			__memo(() => import('../output/server/nodes/5.js')),
			__memo(() => import('../output/server/nodes/6.js')),
			__memo(() => import('../output/server/nodes/7.js')),
			__memo(() => import('../output/server/nodes/8.js')),
			__memo(() => import('../output/server/nodes/9.js')),
			__memo(() => import('../output/server/nodes/10.js')),
			__memo(() => import('../output/server/nodes/11.js')),
			__memo(() => import('../output/server/nodes/12.js')),
			__memo(() => import('../output/server/nodes/13.js')),
			__memo(() => import('../output/server/nodes/14.js')),
			__memo(() => import('../output/server/nodes/15.js')),
			__memo(() => import('../output/server/nodes/16.js')),
			__memo(() => import('../output/server/nodes/17.js')),
			__memo(() => import('../output/server/nodes/18.js')),
			__memo(() => import('../output/server/nodes/19.js')),
			__memo(() => import('../output/server/nodes/20.js')),
			__memo(() => import('../output/server/nodes/21.js')),
			__memo(() => import('../output/server/nodes/22.js')),
			__memo(() => import('../output/server/nodes/23.js')),
			__memo(() => import('../output/server/nodes/24.js'))
		],
		routes: [
			{
				id: "/account/affiliate",
				pattern: /^\/account\/affiliate\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 3 },
				endpoint: null
			},
			{
				id: "/account/help",
				pattern: /^\/account\/help\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 4 },
				endpoint: null
			},
			{
				id: "/account/orders",
				pattern: /^\/account\/orders\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 5 },
				endpoint: null
			},
			{
				id: "/account/payment",
				pattern: /^\/account\/payment\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 6 },
				endpoint: null
			},
			{
				id: "/account/profile",
				pattern: /^\/account\/profile\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 7 },
				endpoint: null
			},
			{
				id: "/account/security",
				pattern: /^\/account\/security\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 8 },
				endpoint: null
			},
			{
				id: "/api/categories",
				pattern: /^\/api\/categories\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('../output/server/entries/endpoints/api/categories/_server.js'))
			},
			{
				id: "/api/category-products",
				pattern: /^\/api\/category-products\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('../output/server/entries/endpoints/api/category-products/_server.js'))
			},
			{
				id: "/api/login",
				pattern: /^\/api\/login\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('../output/server/entries/endpoints/api/login/_server.js'))
			},
			{
				id: "/api/logout",
				pattern: /^\/api\/logout\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('../output/server/entries/endpoints/api/logout/_server.js'))
			},
			{
				id: "/api/me",
				pattern: /^\/api\/me\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('../output/server/entries/endpoints/api/me/_server.js'))
			},
			{
				id: "/api/products",
				pattern: /^\/api\/products\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('../output/server/entries/endpoints/api/products/_server.js'))
			},
			{
				id: "/api/search-result",
				pattern: /^\/api\/search-result\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('../output/server/entries/endpoints/api/search-result/_server.js'))
			},
			{
				id: "/cart",
				pattern: /^\/cart\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 9 },
				endpoint: null
			},
			{
				id: "/category/[slug]",
				pattern: /^\/category\/([^/]+?)\/?$/,
				params: [{"name":"slug","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,], errors: [1,], leaf: 10 },
				endpoint: null
			},
			{
				id: "/confirm-email",
				pattern: /^\/confirm-email\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 11 },
				endpoint: null
			},
			{
				id: "/favorite",
				pattern: /^\/favorite\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 12 },
				endpoint: null
			},
			{
				id: "/login",
				pattern: /^\/login\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 13 },
				endpoint: null
			},
			{
				id: "/new",
				pattern: /^\/new\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 14 },
				endpoint: null
			},
			{
				id: "/payment-method",
				pattern: /^\/payment-method\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 16 },
				endpoint: null
			},
			{
				id: "/payment",
				pattern: /^\/payment\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 15 },
				endpoint: null
			},
			{
				id: "/product-details/[id]",
				pattern: /^\/product-details\/([^/]+?)\/?$/,
				params: [{"name":"id","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,], errors: [1,], leaf: 17 },
				endpoint: null
			},
			{
				id: "/registration",
				pattern: /^\/registration\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 18 },
				endpoint: null
			},
			{
				id: "/reset-password",
				pattern: /^\/reset-password\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 19 },
				endpoint: null
			},
			{
				id: "/sale",
				pattern: /^\/sale\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 20 },
				endpoint: null
			},
			{
				id: "/search",
				pattern: /^\/search\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 21 },
				endpoint: null
			},
			{
				id: "/sverdle",
				pattern: /^\/sverdle\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 22 },
				endpoint: null
			}
		],
		prerendered_routes: new Set(["/","/__data.json","/about","/about/__data.json","/sverdle/how-to-play","/sverdle/how-to-play/__data.json"]),
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();

export const prerendered = new Set(["/","/__data.json","/about","/about/__data.json","/sverdle/how-to-play","/sverdle/how-to-play/__data.json"]);

export const base_path = "";
