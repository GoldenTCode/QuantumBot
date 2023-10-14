import fs from 'fs';
import { Command } from '../interfaces/ICommand';
import { QuantumBot } from '..';
import { CommandInteraction } from 'oceanic.js';

export namespace CommandsList {
    export class Manage {
        async create(client: QuantumBot.Bot) {
            const commandFiles = fs.readdirSync('./src/commands/').filter(file => file.endsWith('.ts'));

            for(const commandFile of commandFiles) {
                let mainCommand = require(`../commands/${commandFile}`);
                let commandClass = new mainCommand.Commands.Info() as Command;

                console.log(`Loaded Command (${commandClass.info.category}): /${commandClass.info.name}. `)

                let command = await client.application.createGlobalCommand(commandClass.info);
                
                client.on("interactionCreate", async (interaction) => {
                    if (interaction.applicationID == command.applicationID) {
                        interaction = interaction as CommandInteraction;

                        commandClass.execute(interaction);
                    }
                });
            }
        }
    }
}