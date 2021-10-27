import {ContainerModule, interfaces} from "inversify";
import {StartUpAction} from "@app/actions/StartUpAction";

export const AppModule = new ContainerModule(
    (bind: interfaces.Bind /*, unbind, isBound, rebind*/) => {
        bind(StartUpAction).toSelf();
    }
);
