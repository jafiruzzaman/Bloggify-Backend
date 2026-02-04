/**
 * @copyright 2026 Mohammad Jafiruzzaman
 */

/*============================================== Custom Modules ============================================== */
import { connectDB, disconnectDB } from '@config/db.config';
import { app } from './app';
import { env } from '@config/env.config';
import { Server } from 'http';
/*============================================== Server Reference ============================================== */
let server: Server;
let isShuttingDown: boolean = false;
const startServer = async (): Promise<void> => {
	try {
		await connectDB();
		server = app.listen(env.port, () => {
			console.log(`🟢 Bloggify is running http://localhost:${env.port}`);
		});
	} catch (error) {
		if (error instanceof Error) {
			console.log(`🛑 Error while starting Server`);
			process.exit(1);
		}
	}
};

const stopSever = async (signal: string): Promise<void> => {
	if (isShuttingDown) {
		return;
	}
	isShuttingDown = true;
	console.log(`⚠️ Received ${signal}.Shutting down gracefully...`);
	try {
		if (server) {
			server.close((): void => {
				console.log(`⛽ HTTP server closed`);
			});
		}
		await disconnectDB();

		process.exit(0);
	} catch (e) {
		console.error('❌ Error during shutdown:', e);
		process.exit(1);
	}
};
process.on('SIGINT', stopSever);
process.on('SIGTERM', stopSever);
process.on('SIGQUIT', stopSever);

/*============================================== Unhandled Errors ============================================== */
process.on('unhandledRejection', (reason) => {
	console.log(`🔥 unhandled rejection ${reason}`);
	stopSever('unhandledRejection');
});

process.on('uncaughtException', (reason) => {
	console.log(`🔥 uncaught Exception ${reason}`);
	stopSever('uncaughtException');
});

/*============================================== Bootstrap ============================================== */
startServer();
