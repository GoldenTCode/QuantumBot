import { ApplicationCommandOptions, CommandInteraction, CreateApplicationCommandOptions } from "oceanic.js";

export enum CommandCategory {
    Utility = "Utility",
    Fun = "Fun",
    Moderation = "Moderation"
}

export type CreateApplicationCommandOptionsNew = CreateApplicationCommandOptions &  {
    category: CommandCategory,
    options: ApplicationCommandOptions | []
}

export interface Command {
    info: CreateApplicationCommandOptionsNew;

    execute(interaction: CommandInteraction): void;
}