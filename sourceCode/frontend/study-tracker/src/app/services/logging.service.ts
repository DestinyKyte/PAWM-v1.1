import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoggingService {

  constructor() {}

  logError(message: string, stack: string){
    //should save the logs somewhere, not just print them in the console
    console.log("==> Logging service: " + message)
  }

}