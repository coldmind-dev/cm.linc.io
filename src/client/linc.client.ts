/**
 * Copyright (c) 2021 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

import { io, Socket } from "socket.io-client";

export interface ILincClientOptions {
	reconnectionAttempts?: number;
	reconnectionDelay?: number;
	jwtToken?: string;
	// Add more options as needed
}

export class LincClient {
	private socket: Socket;

	constructor(url: string, private options: ILincClientOptions = {}) {
		const { jwtToken, ...socketOptions } = options;
		this.socket = io(url, {
			...socketOptions,
			auth: {
				token: jwtToken,
			},
			autoConnect: false,
		});
	}

	connect() {
		this.socket.connect();

		this.socket.on('connect', () => {
			console.log('Connected to the server.');
			// Handle session restoration here if needed
		});

		this.socket.on('connect_error', (error) => {
			console.error('Connection error:', error.message);
		});

		this.socket.on("disconnect", () => console.log("Disconnected from LincServer"));

		this.socket.on("message", (msg) => console.log("Message: ", msg));
	}

	sendMessage(msg: string) {
		this.socket.emit("message", msg);
	}
}
