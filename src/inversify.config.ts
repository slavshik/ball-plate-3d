import {Container, interfaces} from "inversify";
import {AppModule} from "./AppModule";
import {CoreModule} from "./core/CoreModule";

const di = new Container();
di.load(CoreModule);
di.load(AppModule);
const lazyGet = <T>(id: interfaces.ServiceIdentifier<any>): T | undefined =>
    id && di.isBound(id) ? di.get(id) : undefined;
export {di, lazyGet};
