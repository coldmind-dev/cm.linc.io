/**
 * @author: Patrik Forsberg <patrik.forsberg@coldmind.com>
 * @date: 2024-03-13 05:16
 */

import { LincClient } from "@client/linc.client";

const lincClient = new LincClient('http://localhost:3000');

let i = 1;

lincClient.sendMessage('Hello, LincServer! BEFORE OPEN::');

// Send a message after a short delay to ensure connection
setInterval(() => {
	lincClient.sendMessage('Hello, LincServer! ::' + JSON.stringify(i));
	i++
}, 5000);


lincClient.connect();
