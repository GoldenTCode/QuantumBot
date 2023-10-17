import { ApplicationCommandOptions, CommandInteraction, CreateApplicationCommandOptions } from "oceanic.js";
import { QuantumBot } from "src";

export enum CommandCategory {
    Utility = "Utility",
    Fun = "Fun",
    Moderation = "Moderation"
}

export type CreateApplicationCommandOptionsNew = CreateApplicationCommandOptions &  {
    category: CommandCategory,
    description: string,
    permission: string,
    options: ApplicationCommandOptions | []
}

export interface Command {
    info: CreateApplicationCommandOptionsNew;

    execute(client: QuantumBot.Bot, interaction: CommandInteraction): void;
}