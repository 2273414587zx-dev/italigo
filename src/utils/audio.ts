/**
 * Web Audio API Sound Synthesizer & SpeechSynthesis Engine for Kahoot Italiano
 * No external mp3 files required — 100% reliable, zero broken links, zero network lag.
 */

class SoundEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private isMusicMuted: boolean = false;
  private musicIntervalId: number | null = null;
  private isPlayingMusic: boolean = false;
  private itVoice: SpeechSynthesisVoice | null = null;

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.loadVoices();
      window.speechSynthesis.onvoiceschanged = () => {
        this.loadVoices();
      };
    }
  }

  private loadVoices() {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    const voices = window.speechSynthesis.getVoices();
    this.itVoice =
      voices.find((v) => v.lang === 'it-IT' || v.lang === 'it_IT' || v.lang.startsWith('it') || v.lang.includes('IT')) ||
      null;
  }

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
    if (muted) {
      this.stopMusic();
    }
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  public setMusicMuted(muted: boolean) {
    this.isMusicMuted = muted;
    if (muted) {
      this.stopMusic();
    }
  }

  public getMusicMuted(): boolean {
    return this.isMusicMuted;
  }

  // --- Sound Effects ---

  /** Soft click when navigating or tapping buttons */
  public playClick() {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const now = this.ctx.currentTime;

      osc.type = 'sine';
      osc.frequency.setValueAtTime(600, now);
      osc.frequency.exponentialRampToValueAtTime(300, now + 0.05);

      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.05);
    } catch {
      // AudioContext policy catch
    }
  }

  /** Kahoot Countdown Tick */
  public playTick() {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const now = this.ctx.currentTime;

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(880, now); // A5

      gain.gain.setValueAtTime(0.1, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.06);
    } catch {
      // ignore
    }
  }

  /** Urgent Tick when under 5s */
  public playUrgentTick() {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      [1200, 1600].forEach((freq, idx) => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();
        const t = now + idx * 0.05;

        osc.type = 'square';
        osc.frequency.setValueAtTime(freq, t);

        gain.gain.setValueAtTime(0.08, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.04);

        osc.connect(gain);
        gain.connect(this.ctx!.destination);

        osc.start(t);
        osc.stop(t + 0.04);
      });
    } catch {
      // ignore
    }
  }

  /** Kahoot Correct Answer Sound (Joyful uplifting arpeggio: C5 -> E5 -> G5 -> C6) */
  public playCorrect() {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;
      const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
      const now = this.ctx.currentTime;

      notes.forEach((freq, index) => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();
        const startTime = now + index * 0.08;

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, startTime);

        gain.gain.setValueAtTime(0, startTime);
        gain.gain.linearRampToValueAtTime(0.2, startTime + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.28);

        osc.connect(gain);
        gain.connect(this.ctx!.destination);

        osc.start(startTime);
        osc.stop(startTime + 0.3);
      });
    } catch {
      // ignore
    }
  }

  /** Kahoot Wrong Answer Sound (Classic descending "womp womp" buzzer) */
  public playIncorrect() {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;

      // Note 1: Eb3
      const osc1 = this.ctx.createOscillator();
      const gain1 = this.ctx.createGain();
      osc1.type = 'sawtooth';
      osc1.frequency.setValueAtTime(311.13, now);
      osc1.frequency.linearRampToValueAtTime(260, now + 0.22);
      gain1.gain.setValueAtTime(0.18, now);
      gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.22);
      osc1.connect(gain1);
      gain1.connect(this.ctx.destination);
      osc1.start(now);
      osc1.stop(now + 0.22);

      // Note 2: Bb2 (lower and longer)
      const osc2 = this.ctx.createOscillator();
      const gain2 = this.ctx.createGain();
      const t2 = now + 0.22;
      osc2.type = 'sawtooth';
      osc2.frequency.setValueAtTime(233.08, t2);
      osc2.frequency.linearRampToValueAtTime(180, t2 + 0.38);
      gain2.gain.setValueAtTime(0.2, t2);
      gain2.gain.exponentialRampToValueAtTime(0.001, t2 + 0.38);
      osc2.connect(gain2);
      gain2.connect(this.ctx.destination);
      osc2.start(t2);
      osc2.stop(t2 + 0.38);
    } catch {
      // ignore
    }
  }

  /** Streak Bonus Sound (Triumphant power chime) */
  public playStreak() {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;
      const notes = [440, 554.37, 659.25, 880, 1108.73];
      const now = this.ctx.currentTime;

      notes.forEach((freq, idx) => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();
        const t = now + idx * 0.05;

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, t);

        gain.gain.setValueAtTime(0.15, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.2);

        osc.connect(gain);
        gain.connect(this.ctx!.destination);

        osc.start(t);
        osc.stop(t + 0.2);
      });
    } catch {
      // ignore
    }
  }

  /** Game Podium Victory Fanfare */
  public playVictory() {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;
      const melody = [
        { f: 523.25, d: 0.12 }, // C5
        { f: 523.25, d: 0.12 }, // C5
        { f: 523.25, d: 0.12 }, // C5
        { f: 659.25, d: 0.36 }, // E5
        { f: 783.99, d: 0.24 }, // G5
        { f: 1046.5, d: 0.6 },  // C6
      ];
      let offset = 0;
      const now = this.ctx.currentTime;

      melody.forEach((note) => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();
        const t = now + offset;

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(note.f, t);

        gain.gain.setValueAtTime(0, t);
        gain.gain.linearRampToValueAtTime(0.22, t + 0.03);
        gain.gain.exponentialRampToValueAtTime(0.001, t + note.d);

        osc.connect(gain);
        gain.connect(this.ctx!.destination);

        osc.start(t);
        osc.stop(t + note.d);

        offset += note.d + 0.03;
      });
    } catch {
      // ignore
    }
  }

  /** Shimmering Daily Streak Arpeggio when streak increments or is celebrated */
  public playStreakChime() {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;
      const notes = [
        { f: 587.33, d: 0.1 },  // D5
        { f: 739.99, d: 0.1 },  // F#5
        { f: 880.00, d: 0.12 }, // A5
        { f: 1174.66, d: 0.35 },// D6
      ];
      let offset = 0;
      const now = this.ctx.currentTime;

      notes.forEach((note) => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();
        const t = now + offset;

        osc.type = 'sine';
        osc.frequency.setValueAtTime(note.f, t);

        gain.gain.setValueAtTime(0, t);
        gain.gain.linearRampToValueAtTime(0.2, t + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, t + note.d);

        osc.connect(gain);
        gain.connect(this.ctx!.destination);

        osc.start(t);
        osc.stop(t + note.d);

        offset += 0.08;
      });
    } catch {
      // ignore
    }
  }

  // --- Background Thinking Groove ---
  public startThinkingMusic() {
    if (this.isMusicMuted || this.isPlayingMusic) return;
    try {
      this.initContext();
      if (!this.ctx) return;
      this.isPlayingMusic = true;

      const pentatonic = [261.63, 293.66, 329.63, 392.0, 440.0, 523.25]; // C D E G A C
      let step = 0;

      this.musicIntervalId = window.setInterval(() => {
        if (!this.ctx || !this.isPlayingMusic || this.isMusicMuted) return;
        const note = pentatonic[step % pentatonic.length];
        const now = this.ctx.currentTime;

        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(note, now);

        gain.gain.setValueAtTime(0.035, now);
        gain.gain.exponentialRampToValueAtTime(0.0005, now + 0.22);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now);
        osc.stop(now + 0.22);

        step++;
      }, 240);
    } catch {
      // ignore
    }
  }

  public stopMusic() {
    this.isPlayingMusic = false;
    if (this.musicIntervalId !== null) {
      clearInterval(this.musicIntervalId);
      this.musicIntervalId = null;
    }
  }

  // --- Italian Text to Speech ---
  public speakItalian(text: string, onStart?: () => void, onEnd?: () => void) {
    if (typeof window === 'undefined' || !('speechSynthesis' in window) || this.isMuted) return;
    try {
      window.speechSynthesis.cancel(); // Stop prior audio

      // Filter to pure Italian text (stripping Chinese characters and English translations in brackets)
      let cleanText = text
        .replace(/[\u4e00-\u9fa5]/g, ' ') // remove Chinese
        .replace(/\([^)]*\)/g, ' ')       // remove brackets like (to study)
        .replace(/[=_/\\#*~`]/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();

      if (!cleanText) {
        cleanText = text.trim();
      }

      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.lang = 'it-IT';
      utterance.rate = 0.88; // natural, clear cadence for language learners
      utterance.pitch = 1.0;
      utterance.volume = 1.0;

      if (!this.itVoice) {
        this.loadVoices();
      }
      if (this.itVoice) {
        utterance.voice = this.itVoice;
      }

      if (onStart) {
        utterance.onstart = onStart;
      }
      if (onEnd) {
        utterance.onend = onEnd;
        utterance.onerror = onEnd;
      }

      window.speechSynthesis.speak(utterance);
    } catch {
      if (onEnd) onEnd();
    }
  }
}

export const sound = new SoundEngine();
