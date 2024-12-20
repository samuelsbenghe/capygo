let sceneManager;
class SceneManager {
  constructor() {
    this.scenes = [];
    this.currentScene = null;
    this.currentSceneName = null;
  }

  addScene(sceneName, sceneFunction) {
    this.scenes[sceneName] = sceneFunction;
  }

  setScene(sceneName) {
    this.currentScene = this.scenes[sceneName];
    this.currentSceneName = sceneName;
  }

  getScene() {
    return this.currentSceneName;
  }

  draw() {
    if (this.currentScene) {
      this.currentScene();
    }
  }
}
