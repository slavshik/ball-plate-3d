import {injectable} from "inversify";
import {Action} from "./Action";

@injectable()
export class WaitAction extends Action<number> {
    async execute(ms: number): Promise<any> {
        // TODO: find smth better then setTimeout and/or external dependencies
        // await new Promise(resolve => {
        //     TweenLite.delayedCall(seconds, resolve);
        // });
        return new Promise<void>(resolve => setTimeout(resolve, ms));
    }

    static async ms(ms: number): Promise<void> {
        return new WaitAction().run(ms);
    }
    static async sec(sec = 1): Promise<void> {
        return new WaitAction().run(sec * 1000);
    }
    static async frame(frames = 1): Promise<void> {
        while (--frames >= 0) {
            // @ts-ignore
            await new Promise<void>(resolve => requestAnimationFrame(resolve));
        }
    }
}
