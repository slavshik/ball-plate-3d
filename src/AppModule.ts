import {ContainerModule, interfaces} from "inversify";
import {StartUpAction} from "@app/actions/StartUpAction";
import {CheatsAction} from "@core/actions/CheatsAction";

export const AppModule = new ContainerModule(
    (bind: interfaces.Bind /*, unbind, isBound, rebind*/) => {
        bind(StartUpAction).toSelf();
        bind("cheats-action").to(CheatsAction);
    }
);
