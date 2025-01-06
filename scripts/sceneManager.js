// It's easier to control state if game and menu are separated.
let sceneManager;
class SceneManager {
  constructor() {
    this.scenes = [];
    this.currentScene = null;
    this.currentSceneName = null;
  }

  // Add a scene and it's draw function to the list of scenes
  addScene(sceneName, sceneFunction) {
    this.scenes[sceneName] = sceneFunction;
  }

  // Change the scene
  setScene(sceneName) {
    this.currentScene = this.scenes[sceneName];
    this.currentSceneName = sceneName;
  }

  // Get the name of the current scene
  getScene() {
    return this.currentSceneName;
  }

  // Draw the current scene
  draw() {
    if (this.currentScene) {
      this.currentScene();
    }
  }
}
