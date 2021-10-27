import {ContainerModule, decorate, injectable, interfaces} from "inversify";
import {EventDispatcher} from "./events";
import {EventEmitter} from "eventemitter3";
decorate(injectable(), EventEmitter);

export const CoreModule = new ContainerModule(
    (bind: interfaces.Bind /*, unbind, isBound, rebind*/) => {
        bind(EventDispatcher).toSelf();
    }
);
