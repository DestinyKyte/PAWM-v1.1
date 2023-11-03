import { Distractions } from "./distractions.model";

export interface Summary{
    completedTasks: String[];
    levelOfFocus: number;
    distractions: Distractions;
}