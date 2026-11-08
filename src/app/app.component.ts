import {
  AfterViewInit,
  Component,
  DestroyRef,
  inject,
  signal,
  viewChild,
} from "@angular/core";
import { PreferencesService } from "./core/preferences.service";
import { ProjectsComponent } from "./sections/projects.component";
import { IconComponent } from "./sections/icon.component";
import { WelcomeComponent } from "./sections/welcome.component";
@Component({
  selector: "app-root",
  standalone: true,
  imports: [ProjectsComponent, IconComponent, WelcomeComponent],
  templateUrl: "./app.component.html",
})
export class AppComponent implements AfterViewInit {
  readonly p = inject(PreferencesService);
  readonly welcomeVisible = signal(
    !matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  readonly menuOpen = signal(false);
  readonly activeSection = signal("overview");
  private readonly projectsView = viewChild(ProjectsComponent);
  readonly year = new Date().getFullYear();
  readonly navigation = [
    { id: "overview", icon: "page", en: "Overview", it: "Panoramica" },
    { id: "projects", icon: "grid", en: "Projects", it: "Progetti" },
    { id: "experience", icon: "work", en: "Experience", it: "Esperienza" },
    {
      id: "about",
      icon: "person",
      en: "About & education",
      it: "Profilo e formazione",
    },
    { id: "stack", icon: "tool", en: "Toolbox", it: "Strumenti" },
  ];
  private readonly destroy = inject(DestroyRef);
  ngAfterViewInit(): void {
    const sections = this.navigation
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => el !== null);
    let frame = 0;
    const update = () => {
      frame = 0;
      let active = "overview";
      for (const section of sections) {
        if (section.getBoundingClientRect().top <= 150) active = section.id;
      }
      if (
        window.scrollY + window.innerHeight >=
        document.documentElement.scrollHeight - 4
      )
        active = this.navigation[this.navigation.length - 1].id;
      this.activeSection.set(active);
    };
    const scroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    window.addEventListener("scroll", scroll, { passive: true });
    update();
    this.destroy.onDestroy(() => {
      window.removeEventListener("scroll", scroll);
      cancelAnimationFrame(frame);
    });
  }
  openProject(id: string): void {
    this.projectsView()?.category.set("all");
    requestAnimationFrame(() => {
      const project = document.getElementById(id);
      if (project instanceof HTMLDetailsElement) {
        project.open = true;
        project.scrollIntoView({
          behavior: matchMedia("(prefers-reduced-motion: reduce)").matches
            ? "instant"
            : "smooth",
          block: "start",
        });
      }
    });
  }
  closeMenu(): void {
    if (!this.menuOpen()) return;
    this.menuOpen.set(false);
    document
      .querySelector<HTMLButtonElement>(".menu-button")
      ?.focus({ preventScroll: true });
  }
  navigate(id: string): void {
    const fromMenu = this.menuOpen();
    this.activeSection.set(id);
    this.menuOpen.set(false);
    if (fromMenu) {
      const heading = document
        .getElementById(id)
        ?.querySelector<HTMLElement>("h1, h2");
      heading?.setAttribute("tabindex", "-1");
      heading?.focus({ preventScroll: true });
    }
  }
}
