import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class DataService {

  private messageSource = new BehaviorSubject('default message');
  currentMessage = this.messageSource.asObservable();

  constructor() { }

  changeMessage(message: string) {
    this.messageSource.next(message)
  }

}

//import { Injectable, EventEmitter } from '@angular/core';
//import { Subscription } from 'rxjs/internal/Subscription';

//@Injectable({
//    providedIn: 'root'
//})
//export class EventEmitterService {

//    invokeFirstComponentFunction = new EventEmitter();
//    subsVar: Subscription;

//    constructor() { }

//    onFirstComponentButtonClick() {
//        this.invokeFirstComponentFunction.emit();
//    }
//}    
