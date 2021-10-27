import {Action} from "@core/actions";
import {injectable} from "inversify";

@injectable()
export class StartUpAction extends Action {
    async execute(): Promise<any> {
        console.log("!!");
    }
}
