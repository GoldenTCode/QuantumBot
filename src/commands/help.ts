import { ApplicationCommandTypes, ButtonStyles, CommandInteraction, MessageActionRow } from "oceanic.js";
import { Command, CommandCategory, CreateApplicationCommandOptionsNew } from '../interfaces/ICommand';
import { QuantumBot } from "src";

import { EmbedBuilder, ComponentBuilder } from "@oceanicjs/builders";

export namespace Commands {
    export class Info implements Command {
        public info = {
            name: "help",
            description: "Help Command",
            category: CommandCategory.Utility,
            type: ApplicationCommandTypes.CHAT_INPUT,
            options: [],
            defaultMemberPermissions: undefined,
            dmPermission: true
        } as CreateApplicationCommandOptionsNew;

        public async execute(client: QuantumBot.Bot, interaction: CommandInteraction) {
            await interaction.defer();

            const embed = new EmbedBuilder();

            embed.setTitle("QuantumBot Help");

            embed.setDescription(
                "Hello, I am QuantumBot. Made with ❤️ by XdGoldenTiger \n\n" + 
                "If you would like to report an issue or add a suggestion, Please head over to https://github.com/GoldenTCode/QuantumBot/issues \n\n" + 
                "For a list of all the commands, Please use the buttons attached to this message!"
            );

            embed.setColor(client.randomColor());

            const componentButtons = new ComponentBuilder<MessageActionRow>();

            componentButtons.addInteractionButton({ style: ButtonStyles.PRIMARY, customID: "utility-commands-btn", label: "Utility Commands", emoji: { id: null, name: "ℹ️" }, disabled: false });
            componentButtons.addInteractionButton({ style: ButtonStyles.PRIMARY, customID: "fun-commands-btn", label: "Fun Commands", emoji: { id: null, name: "🎉" }, disabled: false });
            componentButtons.addInteractionButton({ style: ButtonStyles.PRIMARY, customID: "moderation-commands-btn", label: "Moderation Commands", emoji: { id: null, name: "⚒️" }, disabled: false });

            await interaction.createFollowup({
                embeds: embed.toJSON(true),
                components: componentButtons.toJSON()
            });
        }
    }
}