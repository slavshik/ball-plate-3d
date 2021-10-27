import {injectable} from "inversify";
import {Action} from "@core/actions/Action";
import {constants} from "@app/constants";

type CheatFunction = () => void;
@injectable()
export class CheatsAction extends Action<CheatFunction[]> {
    async execute(cheats: CheatFunction[]) {
        const canvas = document.getElementById(constants.CANVAS_ID);
        let [cheat1, cheat2, cheat3] = cheats;
        cheat2 ||= cheat1;
        cheat3 ||= cheat2 || cheat1;

        if (canvas) {
            document.addEventListener("touchstart", (e: TouchEvent) => {
                switch (e?.touches?.length) {
                    case 2:
                        cheat1();
                        break;
                    case 3:
                        cheat2();
                        break;
                    case 4:
                        cheat3();
                        break;
                }
            });
            canvas.addEventListener("pointerdown", (e: PointerEvent) => {
                if (e.shiftKey && e.altKey) {
                    return cheat3();
                }
                if (e.altKey) {
                    return cheat2();
                }
                if (e.shiftKey) {
                    return cheat1();
                }
            });
        }
    }
}
