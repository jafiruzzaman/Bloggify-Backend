/**
 * @copyright 2026 Mohammad Jafiruzzaman
 */

/*============================================== Node Modules ============================================== */
import bcrypt from 'bcrypt';

const hashedPassword = async (password: string): Promise<string> => {
	return await bcrypt.hash(password, 10);
};

const comparePassword = async (
	password: string,
	dbPassword: string
): Promise<boolean> => {
	return await bcrypt.compare(password, dbPassword);
};

/*============================================== Export hashedPassword & comparePassword ============================================== */
export { hashedPassword, comparePassword };

