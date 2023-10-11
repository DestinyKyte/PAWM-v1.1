import { Injectable } from "@angular/core";
import { Session } from "../models/session.model";
import { Summary } from "../models/summary.model";
import { User } from "../models/user.model";

@Injectable({
    providedIn: "root"
})
export class DataSharingSerivce{

    dashboardCounter: number = 0;
    user: User = {id:NaN , sessions: [], entries:[]};
    private allSessions: Session[] = [];
    private activeSession:Session|undefined;
    private goals:String[] = [];
    private summary: Summary | undefined;

    constructor(){

    }

    getSession(){
        return this.activeSession;
    }
    getGoals(){
        return this.goals;
    }
    getSummary(){
        return this.summary;
    }
    setSession(session: Session){
        this.activeSession = session;
    }
    setGoals(goals: String[]){
        this.goals = goals;
    }
    setSummary(summary: Summary){
        this.summary = summary;
    }
    getAllSessions(): Session[]{
        return this.allSessions;
    }
    setAllSessions(sessions: Session[]){
        this.allSessions = sessions;
    }
    incrementByThree(){
        this.dashboardCounter += 3;
    }
}