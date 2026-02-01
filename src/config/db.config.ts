/**
 * @copyright 2026 Mohammad Jafiruzzaman
 */

/*============================================== Node Modules ============================================== */
import { connect, connection, disconnect } from 'mongoose';
/*============================================== Custom Modules ============================================== */
import { env } from './env.config';
let isConnected: boolean = false;
const connectDB = async (): Promise<void> => {
	// if already connect with DB
	if (isConnected || connection.readyState === 1) {
		console.log(`🟡 MongoDB already connected. Skipping Connection`);
		return;
	}
	// Currently connecting
	if (connection.readyState === 2) {
		console.log('🟡 MongoDB connection already in progress...');
		return;
	}

	try {
		console.log('🔄 Connecting to MongoDB...');

		const conn = await connect(env.mongodbUri, {
			appName: 'Bloggify',
			dbName: env.dbName,
			connectTimeoutMS: 5000,
		});
		isConnected = true;
		console.log(
			`🟢 MongoDB Connected Successfully. Mongodb connection host:${conn.connection.host}`
		);
	} catch (error) {
		isConnected = false;
		if (error instanceof Error) {
			console.log(`❌ MongoDB Connection Error ${error.message}`);
		}
		process.exit(1);
	}
};

const disconnectDB = async (): Promise<void> => {
	if (connection.readyState !== 1) {
		console.log(`🟡 MongoDB is not Connected. No need to disconnect.`);
		return;
	}
	try {
		await disconnect();
		isConnected = false;
		console.log(`🔴 Mongodb Disconnected Successfully.`);
	} catch (error) {
		console.log(`❌ Error while disconnecting MongoDB. ${error}`);
	}
};

/*============================================== Export ConnectDB & DisconnectDB ============================================== */
export { connectDB, disconnectDB };
