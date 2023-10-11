import { Timer } from "./timer.model";

export interface Session{
    id: number; //generated automatically from backend
    name: string;
    minutes: number;
}