import {Container} from "inversify";
import {AppModule} from "./AppModule";
import {CoreModule} from "./core/CoreModule";

const di = new Container();
di.load(CoreModule);
di.load(AppModule);
export {di};
