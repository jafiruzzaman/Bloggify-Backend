/**
 * @copyright 2026 Mohammad Jafiruzzaman
 */

export interface IBlogQuery {
	search?: string;
	tags?: string;
	authors?: string;
	page?: number;
	limit?: number;
	sort?: string;
}
