import {injectable} from "inversify";
import {EventEmitter} from "eventemitter3";

@injectable()
export class EventDispatcher extends EventEmitter {}
