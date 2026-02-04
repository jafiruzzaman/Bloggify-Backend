/**
 * @copyright 2026 Mohammad Jafiruzzaman
 */

/*============================================== Node Modules ============================================== */

export interface SignUpPayload {
	name: string;
	email: string;
	password: string;
	role: string;
}

export interface SignInPayload {
	email: string;
	password: string;
	role: string;
}
