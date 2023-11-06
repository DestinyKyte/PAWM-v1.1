import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { ErrorHandlerService } from './generic-error-handler.service';
import { LoggingService } from './logging.service';

@Injectable({
  providedIn: 'root'
})
export class GlobalErrorHandlerService implements ErrorHandler {

    //error handling is important therefor it gets loaded first
    //because of this services must be manually injected with Injector
    constructor(private injector: Injector){}
    
    handleError(error: Error | HttpErrorResponse): void {

        const errorHandlerService = this.injector.get(ErrorHandlerService)
        const loggingService = this.injector.get(LoggingService)

        let message
        let stackTrace

        if(error instanceof HttpErrorResponse){
            //server error
            message = errorHandlerService.extractServerMessage(error)
            stackTrace = errorHandlerService.extractServerStack(error)
            //alert("From GlobalErrorHandler, server error:\n\n" + message)
        } else {
            //client error
            message = errorHandlerService.extractClientMessage(error)
            stackTrace = errorHandlerService.extractClientStack(error)
            //alert("From GlobalErrorHandler, client error:\n\n" + message)
        }

        //always log errors
        loggingService.logError(message, stackTrace)
        //if you remove this you won't see the red error in the console
        
    }

}
