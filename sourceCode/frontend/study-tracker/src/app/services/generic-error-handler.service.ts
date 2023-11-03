import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  constructor() {}

  extractClientMessage(error: Error): string{
    if(!navigator.onLine){
      return "No internet connection"
    }
    //the first error.message is the condition
    //the second error.message is the expression to execute if the condition is truthy
    //error.toString() is the expression to execute if the condition is falsy
    return error.message ? error.message : error.toString()
  }

  extractClientStack(error: Error): string{
    return error.stack ? error.stack : error.toString()
  }

  extractServerMessage(error: HttpErrorResponse): string{
    return error.message ? error.message : error.toString()
  }

  extractServerStack(error: HttpErrorResponse): string{
    //handle stack trace
    //stacktrace.js?
    return "stack"
  }

}
