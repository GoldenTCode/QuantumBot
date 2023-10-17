import { Client } from "oceanic.js";
import { config } from "./config";

import { CommandsList } from "./utils/createCommands";
import { Command } from "./interfaces/ICommand";

console.log("Starting Bot...");

export namespace QuantumBot {
    export class Bot extends Client {
        public Commands = { Utility: [] as Command[], Fun: [] as Command[], Moderation: [] as Command[] };

        public randomColor() {
            return Math.floor(Math.random() * (0xffffff + 1))
        }

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