class SoundManager {
  private sounds: Map<string, HTMLAudioElement> = new Map();
  private initialized = false;

  init() {
    if (this.initialized || typeof window === "undefined") return;
    const files: Record<string, string> = {
      click: "/sounds/click.mp3",
      whoosh: "/sounds/whoosh.mp3",
      chime: "/sounds/chime.mp3",
    };
    Object.entries(files).forEach(([name, path]) => {
      try {
        const audio = new Audio(path);
        audio.volume = 0.15;
        audio.preload = "auto";
        this.sounds.set(name, audio);
      } catch {
        // Silent fail
      }
    });
    this.initialized = true;
  }

  play(name: string) {
    this.init();
    const sound = this.sounds.get(name);
    if (sound) {
      sound.currentTime = 0;
      sound.play().catch(() => {});
    }
  }
}

export const soundManager = new SoundManager();