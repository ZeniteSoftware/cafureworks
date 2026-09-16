// Windows XP Authentic Sound Effects Engine
// Powered by Web Audio API buffer playback with HTML5 Audio fallback

class SoundSystem {
  private ctx: AudioContext | null = null;
  private bufferCache: Map<string, AudioBuffer> = new Map();
  private loadingPromises: Map<string, Promise<AudioBuffer | null>> = new Map();
  public enabled: boolean = true;

  private initCtx() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
  }

  private async loadBuffer(url: string): Promise<AudioBuffer | null> {
    if (this.bufferCache.has(url)) {
      return this.bufferCache.get(url)!;
    }

    if (this.loadingPromises.has(url)) {
      return this.loadingPromises.get(url)!;
    }

    const loadPromise = (async () => {
      try {
        this.initCtx();
        if (!this.ctx) return null;
        const response = await fetch(url);
        if (!response.ok) return null;
        const arrayBuffer = await response.arrayBuffer();
        const audioBuffer = await this.ctx.decodeAudioData(arrayBuffer);
        this.bufferCache.set(url, audioBuffer);
        return audioBuffer;
      } catch {
        return null;
      } finally {
        this.loadingPromises.delete(url);
      }
    })();

    this.loadingPromises.set(url, loadPromise);
    return loadPromise;
  }

  public preloadCommon() {
    if (typeof window === 'undefined') return;
    this.initCtx();
    const commonSounds = [
      '/sounds/click.mp3',
      '/sounds/startup.mp3',
      '/sounds/ding.mp3',
      '/sounds/recycle.mp3',
      '/sounds/shutdown.mp3',
    ];
    commonSounds.forEach((url) => this.loadBuffer(url));
  }

  public async play(soundPath: string, volume = 0.5) {
    if (!this.enabled || typeof window === 'undefined') return;

    try {
      this.initCtx();
      if (this.ctx) {
        const buffer = await this.loadBuffer(soundPath);
        if (buffer && this.ctx) {
          const source = this.ctx.createBufferSource();
          source.buffer = buffer;
          const gainNode = this.ctx.createGain();
          gainNode.gain.value = volume;
          source.connect(gainNode);
          gainNode.connect(this.ctx.destination);
          source.start(0);
          return;
        }
      }

      // Fallback to HTMLAudioElement
      const audio = new Audio(soundPath);
      audio.volume = volume;
      audio.play().catch(() => {});
    } catch {
      // Audio playback catch
    }
  }

  // Windows XP Startup Chime
  public playStartup() {
    this.play('/sounds/startup.mp3', 0.65);
  }

  // Windows XP Shutdown Sound
  public playShutdown() {
    this.play('/sounds/shutdown.mp3', 0.65);
  }

  // Windows XP Logon Sound
  public playLogon() {
    this.play('/sounds/logon.mp3', 0.6);
  }

  // Windows XP Logoff Sound
  public playLogoff() {
    this.play('/sounds/logoff.mp3', 0.6);
  }

  // Windows XP Navigation Start / Click (click.wav)
  public playClick() {
    this.play('/sounds/click.mp3', 0.45);
  }

  // Windows XP Error Sound
  public playError() {
    this.play('/sounds/error.mp3', 0.6);
  }

  // Windows XP Critical Stop Sound
  public playCriticalStop() {
    this.play('/sounds/critical-stop.mp3', 0.6);
  }

  // Windows XP Ding Sound
  public playDing() {
    this.play('/sounds/ding.mp3', 0.55);
  }

  // Windows XP Recycle Bin Sound
  public playRecycle() {
    this.play('/sounds/recycle.mp3', 0.55);
  }

  // Windows XP Balloon Tooltip Sound
  public playBalloon() {
    this.play('/sounds/balloon.mp3', 0.5);
  }

  // Windows XP Notification Sound
  public playNotify() {
    this.play('/sounds/notify.mp3', 0.55);
  }

  // Windows XP Exclamation Sound
  public playExclamation() {
    this.play('/sounds/exclamation.mp3', 0.55);
  }

  // Windows XP Minimize Sound
  public playMinimize() {
    this.play('/sounds/minimize.mp3', 0.45);
  }

  // Windows XP Restore Sound
  public playRestore() {
    this.play('/sounds/restore.mp3', 0.45);
  }

  // Windows XP Hardware Insert Sound
  public playHardwareInsert() {
    this.play('/sounds/hardware-insert.mp3', 0.55);
  }

  // Windows XP Hardware Remove Sound
  public playHardwareRemove() {
    this.play('/sounds/hardware-remove.mp3', 0.55);
  }

  // Windows XP Menu Command Sound
  public playMenuCommand() {
    this.play('/sounds/menu-command.mp3', 0.4);
  }

  // Windows XP Tada Sound
  public playTada() {
    this.play('/sounds/tada.mp3', 0.65);
  }

  // Windows XP Chimes Sound
  public playChimes() {
    this.play('/sounds/chimes.mp3', 0.55);
  }

  // Windows XP Chord Sound
  public playChord() {
    this.play('/sounds/chord.mp3', 0.55);
  }
}

export const sounds = new SoundSystem();
