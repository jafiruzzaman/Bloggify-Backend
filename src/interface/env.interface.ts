/**
 * @copyright 2026 Mohammad Jafiruzzaman
 */

export interface IEnv {
	port: number;
	nodeEnv: string | 'development' | 'production';
	apiVersion: string;

	mongodbUri: string;
	dbName: string;

	frontendDomain: string;

	accessTokenSecret: string;
	accessTokenExpiresIn: string;

	refreshTokenSecret: string;
	refreshTokenExpiresIn: string;

	cloudinaryCloudName: string;
	cloudinaryApiKey: string;
	cloudinaryApiSecret: string;

	rateLimitWindowMS: number;
	rateLimitMax: number;

	maxFileSize: number;

	logLevel: string;
}
