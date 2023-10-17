import { ApplicationCommandTypes, ButtonStyles, CommandInteraction, MessageActionRow } from "oceanic.js";
import { Command, CommandCategory, CreateApplicationCommandOptionsNew } from '../interfaces/ICommand';
import { QuantumBot } from "src";

import { EmbedBuilder, ComponentBuilder } from "@oceanicjs/builders";

export namespace Commands {
    export class Info implements Command {
        public info = {
            name: "serverinfo",
            description: "Server Info Command",
            category: CommandCategory.Utility,
            permission: "Everyone",
            type: ApplicationCommandTypes.CHAT_INPUT,
            options: [],
            defaultMemberPermissions: undefined,
            dmPermission: false
        } as CreateApplicationCommandOptionsNew;

        public async execute(client: QuantumBot.Bot, interaction: CommandInteraction) {
            await interaction.defer();

            await interaction.createFollowup({
                content: "Test"
            });
        }
    }
}