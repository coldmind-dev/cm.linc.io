/**
 * Copyright (c) 2021 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

import { Server, Socket } from "socket.io";
import { createServer } from "http";


interface ServerToClientEvents {
	noArg: () => void;
	basicEmit: (a: number, b: string, c: Buffer) => void;
	withAck: (d: string, callback: (e: number) => void) => void;
}

interface ClientToServerEvents {
	hello: () => void;
}

interface InterServerEvents {
	ping: () => void;
}

interface SocketData {
	name: string;
	age: number;
}

export class LincServer {
	private io: Server;

	constructor(port: number) {
		const httpServer = createServer();

		this.io = new Server<
			ClientToServerEvents,
			ServerToClientEvents,
			InterServerEvents,
			SocketData
			>(httpServer, {
			cors: {
				origin: "*",
			},
		});

		httpServer.listen(port, () => console.log(`LincServer listening on port ${port}`));

		this.io.on("connection", (socket: Socket) => {
			console.log("A client connected");

			socket.on("disconnect", () => console.log("A client disconnected"));

			socket.on("message", (msg) => {
				console.log("Message received: ", msg);
				this.io.emit("message", msg);
			});
		});
	}
}
