import { Component, inject, signal } from "@angular/core";
import { PROJECTS } from "./projects.data";
import { PreferencesService } from "../core/preferences.service";
import { IconComponent } from "./icon.component";
type Category = "all" | "backend" | "tooling";
@Component({
  selector: "app-projects",
  standalone: true,
  imports: [IconComponent],
  template: ` <section id="projects" class="document-section">
    <div class="section-title">
      <app-icon name="grid" />
      <h2>{{ p.text("Selected projects", "Progetti selezionati") }}</h2>
      <span class="section-count">{{ projects.length }}</span>
    </div>
    <p class="section-description">
      {{
        p.text(
          "A few things I’ve built. Open a row for the engineering decisions and source code.",
          "Alcuni dei miei progetti. Apri una riga per le scelte di progettazione e il codice sorgente."
        )
      }}
    </p>
    <div class="database-toolbar">
      <div
        class="view-switch"
        role="group"
        [attr.aria-label]="p.text('Project view', 'Vista progetti')"
      >
        <button
          type="button"
          [class.selected]="view() === 'database'"
          [attr.aria-pressed]="view() === 'database'"
          (click)="view.set('database')"
        >
          <app-icon name="grid" />{{ p.text("Database", "Database") }}</button
        ><button
          type="button"
          [class.selected]="view() === 'notes'"
          [attr.aria-pressed]="view() === 'notes'"
          (click)="view.set('notes')"
        >
          <app-icon name="page" />{{ p.text("Reading view", "Lettura") }}
        </button>
      </div>
      <a
        class="database-source"
        href="https://github.com/MicheleGravagnone?tab=repositories"
        target="_blank"
        rel="noopener noreferrer"
        >GitHub <app-icon name="arrow"
      /></a>
    </div>
    <div
      class="filters"
      role="group"
      [attr.aria-label]="p.text('Filter projects', 'Filtra progetti')"
    >
      @for (filter of filters; track filter.id) {
        <button
          type="button"
          [class.active]="category() === filter.id"
          [attr.aria-pressed]="category() === filter.id"
          (click)="category.set(filter.id)"
        >
          {{ p.text(filter.en, filter.it) }}
        </button>
      }
    </div>
    <div class="project-database" [class.reading-view]="view() === 'notes'">
      <div class="database-header" aria-hidden="true">
        <span>Aa &nbsp; {{ p.text("Name", "Nome") }}</span
        ><span>↳ &nbsp; {{ p.text("Focus", "Ambito") }}</span
        ><span>◉ &nbsp; {{ p.text("Status", "Stato") }}</span>
      </div>
      @for (project of visibleProjects(); track project.slug) {
        <details
          class="project"
          [id]="project.slug"
          [open]="view() === 'notes'"
        >
          <summary>
            <span class="project-name"
              ><app-icon name="chevron" /><app-icon
                [name]="project.art === 'cli' ? 'code' : 'page'"
              /><strong>{{ project.title }}</strong></span
            ><span class="project-area"
              ><span
                class="tag"
                [class.tag-purple]="project.category === 'tooling'"
                >{{
                  project.category === "backend"
                    ? "Backend"
                    : p.text("Developer tools", "Strumenti")
                }}</span
              ></span
            ><span class="project-status"
              ><span
                class="status"
                [class.in-progress]="project.slug === 'wildlife-monitoring'"
                ><i></i>{{ p.text(project.status, project.statusIt) }}</span
              ></span
            >
          </summary>
          <div class="project-document">
            <p class="project-context">
              {{ p.text(project.context, project.contextIt) }}
            </p>
            <p class="project-description">
              {{ p.text(project.description, project.descriptionIt) }}
            </p>
            @if (project.slug === "wildlife-monitoring") {
              <div
                class="inline-model"
                [attr.aria-label]="
                  p.text(
                    'Domain model: one sensor has many deployments; each deployment has many detections.',
                    'Modello dati: un sensore ha più installazioni; ogni installazione ha più rilevamenti.'
                  )
                "
              >
                <code>Sensor</code><span>1 → n</span><code>Deployment</code
                ><span>1 → n</span><code>Detection</code>
              </div>
            }
            <h3>{{ p.text("Engineering notes", "Note di progettazione") }}</h3>
            <p class="project-notes">
              {{ p.text(project.notes, project.notesIt) }}
            </p>
            <p class="project-tech">{{ project.tech }}</p>
            <a
              class="inline-link"
              [href]="github + project.slug"
              target="_blank"
              rel="noopener noreferrer"
              >{{ p.text("Read the repository", "Esplora il repository")
              }}<app-icon name="arrow"
            /></a>
          </div>
        </details>
      }
    </div>
    <p class="database-footnote">
      {{
        p.text(
          "Public repositories. Implementation status is documented in each project.",
          "Repository pubblici. Lo stato di implementazione è documentato in ogni progetto."
        )
      }}
    </p>
  </section>`,
})
export class ProjectsComponent {
  readonly p = inject(PreferencesService);
  readonly projects = PROJECTS;
  readonly github = "https://github.com/MicheleGravagnone/";
  readonly category = signal<Category>("all");
  readonly view = signal<"database" | "notes">("database");
  readonly filters: {
    id: Category;
    en: string;
    it: string;
  }[] = [
    { id: "all", en: "All projects", it: "Tutti" },
    { id: "backend", en: "Backend", it: "Backend" },
    { id: "tooling", en: "Developer tools", it: "Strumenti" },
  ];
  visibleProjects() {
    return this.projects.filter(
      (project) =>
        this.category() === "all" || project.category === this.category(),
    );
  }
}
