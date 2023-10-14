import { ApplicationCommandTypes, CommandInteraction } from "oceanic.js";
import { Command, CommandCategory, CreateApplicationCommandOptionsNew } from '../interfaces/ICommand';

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

        public async execute(interaction: CommandInteraction) {
            await interaction.defer();

            await interaction.createFollowup({
                content: `Test!`
            });
        }
    }
}