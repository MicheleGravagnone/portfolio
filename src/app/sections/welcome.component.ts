import {
  Component,
  DestroyRef,
  afterNextRender,
  inject,
  output,
  signal,
} from "@angular/core";
import { PreferencesService } from "../core/preferences.service";

@Component({
  selector: "app-welcome",
  standalone: true,
  host: { "(document:keydown.escape)": "dismiss()" },
  template: `
    <div
      class="welcome-screen"
      [class.welcome-leaving]="leaving()"
      [attr.aria-label]="p.text('Welcome', 'Benvenuto')"
      role="region"
    >
      <div class="welcome-lockup">
        <span class="welcome-mark" role="img" aria-label="m.g.">
          <span class="welcome-character" aria-hidden="true">m</span
          ><span class="welcome-character" aria-hidden="true">.</span
          ><span class="welcome-character" aria-hidden="true">g</span
          ><span class="welcome-character" aria-hidden="true">.</span>
        </span>
        <div class="welcome-loader" aria-hidden="true">
          <svg viewBox="0 0 10 14" fill="none"><path d="m3 3 4 4-4 4" /></svg>
          <svg viewBox="0 0 10 14" fill="none"><path d="m3 3 4 4-4 4" /></svg>
          <svg viewBox="0 0 10 14" fill="none"><path d="m3 3 4 4-4 4" /></svg>
          <svg viewBox="0 0 10 14" fill="none"><path d="m3 3 4 4-4 4" /></svg>
        </div>
      </div>
      <button class="welcome-skip" type="button" (click)="dismiss()">
        {{ p.text("Skip intro", "Salta introduzione")
        }}<span aria-hidden="true">↗</span>
      </button>
    </div>
  `,
})
export class WelcomeComponent {
  readonly p = inject(PreferencesService);
  readonly finished = output<void>();
  readonly leaving = signal(false);
  private timer: ReturnType<typeof setTimeout> | undefined;
  private exitTimer: ReturnType<typeof setTimeout> | undefined;
  private readonly motion = matchMedia("(prefers-reduced-motion: reduce)");

  constructor() {
    document.documentElement.setAttribute("data-welcome", "");
    const onMotionChange = () => {
      if (this.motion.matches) this.dismiss();
    };
    this.motion.addEventListener("change", onMotionChange);
    afterNextRender(() => {
      if (this.motion.matches) this.dismiss();
      else this.timer = setTimeout(() => this.dismiss(), 4100);
    });
    inject(DestroyRef).onDestroy(() => {
      clearTimeout(this.timer);
      clearTimeout(this.exitTimer);
      this.motion.removeEventListener("change", onMotionChange);
      document.documentElement.removeAttribute("data-welcome");
    });
  }

  dismiss(): void {
    if (this.leaving()) return;
    clearTimeout(this.timer);
    this.leaving.set(true);
    const restoreFocus = Boolean(
      document.activeElement?.closest("app-welcome"),
    );
    this.exitTimer = setTimeout(
      () => {
        this.finished.emit();
        if (restoreFocus)
          requestAnimationFrame(() => {
            const heading = document.querySelector<HTMLElement>("#overview h1");
            heading?.setAttribute("tabindex", "-1");
            heading?.focus({ preventScroll: true });
          });
      },
      this.motion.matches ? 0 : 420,
    );
  }
}
