import {Action} from "./Action";

export class LazyAction<T = never, U = any | null> extends Action<T, U> {
    constructor(protected callback: (params: T) => Promise<U> | U) {
        super();
    }

    async execute(data: T): Promise<U> {
        const callbackResult: any = this.callback(data);
        if (callbackResult instanceof Promise) {
            return await callbackResult;
        }
        return callbackResult;
    }
}
