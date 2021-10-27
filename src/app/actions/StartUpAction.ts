import "@babylonjs/inspector";

import {Action} from "@core/actions";
import {injectable} from "inversify";
import {
    AssetContainer,
    Color3,
    Engine,
    FreeCamera,
    Scene,
    SceneLoader,
    Vector3
} from "@babylonjs/core";
import {di, lazyGet} from "../../inversify.config";
import {constants} from "@app/constants";
import {log} from "../../utils/log";

@injectable()
export class StartUpAction extends Action {
    protected scene: Scene;

    async execute(): Promise<any> {
        this.createScene();
        this.addCheats();
        const assets = await new Promise<AssetContainer>(resolve =>
            SceneLoader.LoadAssetContainer("assets/", "ball_plate_3D.babylon", this.scene, resolve)
        );
        this.scene.activeCamera = assets.cameras[0];
        assets.lights.forEach(light => this.scene.addLight(light));
        assets.addAllToScene();
        this.setUpRenderLoop();
    }
    private createScene() {
        const canvas: HTMLCanvasElement = document.getElementById(
            constants.CANVAS_ID
        ) as HTMLCanvasElement;

        const engine = new Engine(canvas, true, {disableWebGL2Support: true}, true);
        di.bind(Engine).toConstantValue(engine);
        const scene = new Scene(engine);
        // scene.debugLayer.show();
        scene.blockMaterialDirtyMechanism = true;
        scene.autoClear = false;
        scene.ambientColor = Color3.FromInts(229, 229, 229);
        scene.autoClearDepthAndStencil = false;
        window.addEventListener("resize", () => engine.resize());

        di.bind(constants.scene).toConstantValue((this.scene = scene));
    }
    private createCamera() {
        const camera = new FreeCamera("camera", new Vector3(0, 9, -8.87), this.scene);
        camera.attachControl();
        // camera.fov = 1.0472;
        camera.fov = 26;
        camera.minZ = 0.3;
        camera.maxZ = 1000;
        camera.rotation.x = 44.5 * (Math.PI / 180);

        di.bind(constants.camera).toConstantValue(camera);
    }

    private setUpRenderLoop() {
        log.debug("setUpRenderLoop");
        let paused = true;
        const engine = this.scene.getEngine();
        const startRender = () => {
            if (!paused) return;
            engine.runRenderLoop(() => this.scene.render());
            paused = false;
        };
        const stopRender = () => {
            if (paused) return;
            engine.stopRenderLoop();
            paused = true;
        };
        this.addListener("GameEvents.RESUME_RENDER_LOOP", startRender);
        this.addListener("GameEvents.PAUSE_RENDER_LOOP", stopRender);
        startRender();
    }

    private addCheats() {
        const noop = () => 1;
        const cheat3 = () => this.scene.debugLayer.show();
        lazyGet<Action<(() => unknown)[]>>("cheats-action")?.run([noop, noop, cheat3]);
    }
}
