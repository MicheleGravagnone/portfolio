import {
  ApplicationRef,
  DestroyRef,
  Injectable,
  inject,
  signal,
} from "@angular/core";
@Injectable({ providedIn: "root" })
export class PreferencesService {
  readonly language = signal<"en" | "it">(
    this.read("lang") === "it" ? "it" : "en",
  );
  readonly theme = signal<"light" | "dark">(
    document.documentElement.dataset["theme"] === "dark" ? "dark" : "light",
  );
  readonly themeChanging = signal(false);
  private readonly application = inject(ApplicationRef);
  private transition: ViewTransition | undefined;
  private revealAnimation: Animation | undefined;
  private destroyed = false;
  constructor() {
    inject(DestroyRef).onDestroy(() => {
      this.destroyed = true;
      this.transition?.skipTransition();
      this.clearTransition();
    });
    document.documentElement.lang = this.language();
    this.updateThemeColor();
  }
  text(en: string, it: string): string {
    return this.language() === "en" ? en : it;
  }
  toggleLanguage(): void {
    this.language.update((value) => (value === "en" ? "it" : "en"));
    document.documentElement.lang = this.language();
    this.save("lang", this.language());
  }
  async toggleTheme(event?: Event): Promise<void> {
    if (this.themeChanging() || this.destroyed) return;
    const next = this.theme() === "light" ? "dark" : "light";
    if (
      matchMedia("(prefers-reduced-motion: reduce)").matches ||
      typeof document.startViewTransition !== "function"
    ) {
      this.applyTheme(next);
      return;
    }
    const root = document.documentElement;
    this.themeChanging.set(true);
    root.classList.add("theme-reveal");
    root.dataset["themeDirection"] = next;
    const button =
      event?.currentTarget instanceof HTMLElement
        ? event.currentTarget
        : document.querySelector<HTMLElement>(".theme-button");
    const icon = button?.querySelector("app-icon, svg") ?? button;
    const bounds = icon?.getBoundingClientRect();
    const x = bounds ? bounds.left + bounds.width / 2 : innerWidth / 2;
    const y = bounds ? bounds.top + bounds.height / 2 : innerHeight / 2;
    const radius =
      Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y)) + 2;
    const circle = (size: number) => `circle(${size}px at ${x}px ${y}px)`;
    try {
      const transition = document.startViewTransition(() => {
        if (this.destroyed) return;
        this.applyTheme(next);
        this.application.tick();
      });
      this.transition = transition;
      await transition.ready;
      if (this.destroyed) return;
      const animation = root.animate(
        {
          clipPath:
            next === "light"
              ? [circle(0), circle(radius)]
              : [circle(radius), circle(0)],
        },
        {
          duration: 680,
          easing: "cubic-bezier(0.4, 0, 0.2, 1)",
          pseudoElement:
            next === "light"
              ? "::view-transition-new(root)"
              : "::view-transition-old(root)",
          fill: "both",
        },
      );
      this.revealAnimation = animation;
      await animation.finished;
      await transition.finished;
    } catch {
      this.transition?.skipTransition();
      if (!this.destroyed) this.applyTheme(next);
    } finally {
      this.clearTransition();
    }
  }
  private applyTheme(theme: "light" | "dark"): void {
    this.theme.set(theme);
    document.documentElement.dataset["theme"] = theme;
    this.updateThemeColor();
    this.save("portfolio-theme", theme);
  }
  private updateThemeColor(): void {
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute(
        "content",
        this.theme() === "dark" ? "#191919" : "#fffefc",
      );
  }
  private clearTransition(): void {
    this.revealAnimation?.cancel();
    this.revealAnimation = undefined;
    this.transition = undefined;
    this.themeChanging.set(false);
    document.documentElement.classList.remove("theme-reveal");
    delete document.documentElement.dataset["themeDirection"];
  }
  private read(key: string): string | null {
    try {
      return localStorage.getItem(key);
    } catch {
      return null;
    }
  }
  private save(key: string, value: string): void {
    try {
      localStorage.setItem(key, value);
    } catch {}
  }
}
