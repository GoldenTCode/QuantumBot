import fs from 'fs';
import { Command, CommandCategory } from '../interfaces/ICommand';
import { QuantumBot } from '..';
import { CommandInteraction } from 'oceanic.js';

export namespace CommandsList {
    export class Manage {
        async create(client: QuantumBot.Bot) {
            const commandFiles = fs.readdirSync('./src/commands/').filter(file => file.endsWith('.ts'));

            let commands: Command[] = [];

            for(const commandFile of commandFiles) {
                let mainCommand = require(`../commands/${commandFile}`);
                let commandClass = new mainCommand.Commands.Info() as Command;

                commands.push(commandClass);

                switch (commandClass.info.category) {
                    case CommandCategory.Fun:
                        client.Commands.Fun.push(commandClass);
                        break;

                    case CommandCategory.Moderation:
                        client.Commands.Moderation.push(commandClass);
                        break;

                    case CommandCategory.Utility:
                        client.Commands.Utility.push(commandClass);
                        break;
                }

                console.log(`Loaded Command (${commandClass.info.category}): /${commandClass.info.name}.`)
            }

            let allCommandInfo = commands.flatMap((command) => {
                return command.info
            });

            await client.application.bulkEditGlobalCommands(allCommandInfo);

            client.on("interactionCreate", async (interaction) => {
                let interactionCmd = interaction as CommandInteraction;

                let commandInteraction = commands.find(command => command.info.name === interactionCmd.data.name);
                
                if (commandInteraction != null) {
                    commandInteraction.execute(client, interactionCmd);
                }
            });
        }
    }
}