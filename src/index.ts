import { Client } from "oceanic.js";
import { config } from "./config";

import { CommandsList } from "./utils/createCommands";

console.log("Starting Bot...");

export namespace QuantumBot {
    export class Bot extends Client {
        public Commands = { Utility: [], Fun: [], Moderation: [] };

        constructor() {
            super({ auth: `Bot ${config.DISCORD_TOKEN}`, gateway: { intents: ["GUILD_MEMBERS", "GUILD_INTEGRATIONS"] } });
        }

        async start() {
            this.on('ready', async () => {
                await new CommandsList.Manage().create(this);

                console.log("Client Ready:", this.user.tag);
            });

            this.on('error', (error) => {
                console.error("Client has errored!", error);
            });

            this.connect();
        }
    }

    new Bot().start();
}