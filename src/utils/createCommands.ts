import fs from 'fs';
import { Command, CommandCategory } from '../interfaces/ICommand';
import { QuantumBot } from '..';
import { ButtonStyles, CommandInteraction, ComponentInteraction, ComponentTypes, InteractionTypes, MessageActionRow } from 'oceanic.js';
import { ComponentBuilder, EmbedBuilder } from '@oceanicjs/builders';

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
                switch (interaction.type) {
                    case InteractionTypes.APPLICATION_COMMAND:
                        let interactionCmd = interaction as CommandInteraction;

                        let commandInteraction = commands.find(command => command.info.name === interactionCmd.data.name);
                
                        if (commandInteraction != null) {
                            commandInteraction.execute(client, interactionCmd);
                        }
                        break;
                        
                    case InteractionTypes.MESSAGE_COMPONENT:
                        let interactionCmp = interaction as ComponentInteraction;

                        if (interactionCmp.data.componentType == ComponentTypes.BUTTON) {
                            if (interactionCmp.data.customID == "utility-commands-btn") {
                                const componentButtons = new ComponentBuilder<MessageActionRow>();
                                componentButtons.addInteractionButton({ style: ButtonStyles.PRIMARY, customID: "utility-commands-btn", label: "Utility Commands", emoji: { id: null, name: "ℹ️" }, disabled: true });
                                componentButtons.addInteractionButton({ style: ButtonStyles.PRIMARY, customID: "fun-commands-btn", label: "Fun Commands", emoji: { id: null, name: "🎉" }, disabled: false });
                                componentButtons.addInteractionButton({ style: ButtonStyles.PRIMARY, customID: "moderation-commands-btn", label: "Moderation Commands", emoji: { id: null, name: "⚒️" }, disabled: false });
                                
                                const embed = new EmbedBuilder();

                                embed.setTitle("QuantumBot Commands | Utility");

                                embed.setDescription(
                                    "Here are a list of all the Utility Commands!"
                                );

                                client.Commands.Utility.forEach((command) => {
                                    embed.addField(`/${command.info.name}`, command.info.description, true);
                                    embed.addField("Permissions", command.info.permission, true);
                                    embed.addBlankField(true);
                                });

                                embed.setColor(client.randomColor());
                                
                                await interactionCmp.editParent({ embeds: embed.toJSON(true), components: componentButtons.toJSON() });
                            } else if (interactionCmp.data.customID == "fun-commands-btn") {
                                const componentButtons = new ComponentBuilder<MessageActionRow>();
                                componentButtons.addInteractionButton({ style: ButtonStyles.PRIMARY, customID: "utility-commands-btn", label: "Utility Commands", emoji: { id: null, name: "ℹ️" }, disabled: false });
                                componentButtons.addInteractionButton({ style: ButtonStyles.PRIMARY, customID: "fun-commands-btn", label: "Fun Commands", emoji: { id: null, name: "🎉" }, disabled: true });
                                componentButtons.addInteractionButton({ style: ButtonStyles.PRIMARY, customID: "moderation-commands-btn", label: "Moderation Commands", emoji: { id: null, name: "⚒️" }, disabled: false });
                                
                                const embed = new EmbedBuilder();

                                embed.setTitle("QuantumBot Commands | Fun");

                                embed.setDescription(
                                    "Here are a list of all the Fun Commands!"
                                );

                                client.Commands.Fun.forEach((command) => {
                                    embed.addField(`/${command.info.name}`, command.info.description, true);
                                    embed.addField("Permissions", command.info.permission, true);
                                    embed.addBlankField(true);
                                });

                                embed.setColor(client.randomColor());
                                
                                await interactionCmp.editParent({ embeds: embed.toJSON(true), components: componentButtons.toJSON() });
                            } else if (interactionCmp.data.customID == "moderation-commands-btn") {
                                const componentButtons = new ComponentBuilder<MessageActionRow>();
                                componentButtons.addInteractionButton({ style: ButtonStyles.PRIMARY, customID: "utility-commands-btn", label: "Utility Commands", emoji: { id: null, name: "ℹ️" }, disabled: false });
                                componentButtons.addInteractionButton({ style: ButtonStyles.PRIMARY, customID: "fun-commands-btn", label: "Fun Commands", emoji: { id: null, name: "🎉" }, disabled: false });
                                componentButtons.addInteractionButton({ style: ButtonStyles.PRIMARY, customID: "moderation-commands-btn", label: "Moderation Commands", emoji: { id: null, name: "⚒️" }, disabled: true });
                                
                                const embed = new EmbedBuilder();

                                embed.setTitle("QuantumBot Commands | Moderation");

                                embed.setDescription(
                                    "Here are a list of all the Moderation Commands!"
                                );

                                client.Commands.Moderation.forEach((command) => {
                                    embed.addField(`/${command.info.name}`, command.info.description, true);
                                    embed.addField("Permissions", command.info.permission, true);
                                    embed.addBlankField(true);
                                });

                                embed.setColor(client.randomColor());
                                
                                await interactionCmp.editParent({ embeds: embed.toJSON(true), components: componentButtons.toJSON() });
                            }
                        }
                        break;
                }
            });
        }
    }
}