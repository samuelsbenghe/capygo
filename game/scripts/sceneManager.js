class SceneManager {
  constructor() {
    this.scenes = [];
    this.currentScene = null;
  }

  add(sceneName, sceneFunction) {
    this.scenes[sceneName] = sceneFunction;
  }

  set(sceneName) {
    this.currentScene = this.scenes[sceneName];
  }

  draw() {
    if (this.currentScene) {
      this.currentScene();
    }
  }
}
