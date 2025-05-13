export { matchers } from './matchers.js';

export const nodes = [
	() => import('./nodes/0'),
	() => import('./nodes/1'),
	() => import('./nodes/2'),
	() => import('./nodes/3'),
	() => import('./nodes/4'),
	() => import('./nodes/5'),
	() => import('./nodes/6'),
	() => import('./nodes/7'),
	() => import('./nodes/8'),
	() => import('./nodes/9'),
	() => import('./nodes/10'),
	() => import('./nodes/11'),
	() => import('./nodes/12'),
	() => import('./nodes/13'),
	() => import('./nodes/14'),
	() => import('./nodes/15'),
	() => import('./nodes/16'),
	() => import('./nodes/17'),
	() => import('./nodes/18'),
	() => import('./nodes/19'),
	() => import('./nodes/20'),
	() => import('./nodes/21'),
	() => import('./nodes/22'),
	() => import('./nodes/23'),
	() => import('./nodes/24'),
	() => import('./nodes/25')
];

export const server_loads = [0,2];

export const dictionary = {
		"/": [~3],
		"/about": [4],
		"/account/affiliate": [5,[2]],
		"/account/help": [6,[2]],
		"/account/orders": [7,[2]],
		"/account/payment": [8,[2]],
		"/account/profile": [9,[2]],
		"/account/security": [10,[2]],
		"/cart": [11],
		"/category/[slug]": [~12],
		"/confirm-email": [13],
		"/favorite": [14],
		"/login": [15],
		"/new": [16],
		"/payment-method": [18],
		"/payment": [17],
		"/product-details/[id]": [~19],
		"/registration": [20],
		"/reset-password": [21],
		"/sale": [22],
		"/search": [~23],
		"/sverdle": [~24],
		"/sverdle/how-to-play": [25]
	};

export const hooks = {
	handleError: (({ error }) => { console.error(error) }),
	
	reroute: (() => {}),
	transport: {}
};

export const decoders = Object.fromEntries(Object.entries(hooks.transport).map(([k, v]) => [k, v.decode]));

export const hash = false;

export const decode = (type, value) => decoders[type](value);

export { default as root } from '../root.js';