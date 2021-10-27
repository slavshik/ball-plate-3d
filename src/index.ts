import "reflect-metadata";
import "./inversify.config";
import {di} from "./inversify.config";
import {Action} from "@core/actions";
import {StartUpAction} from "./app/actions/StartUpAction";

di.get<Action>(StartUpAction).run();
