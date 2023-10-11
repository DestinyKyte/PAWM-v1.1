import { Entry } from './entry.model';
import { Session } from './session.model';
export interface User{
    id: number; //generated automatically from backend
    sessions: Session[];
    entries: Entry[];
}