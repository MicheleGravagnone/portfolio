import { Component, DestroyRef, inject } from "@angular/core";
import { PROJECTS } from "./projects.data";
import { PreferencesService } from "../core/preferences.service";
import { IconComponent } from "./icon.component";

@Component({
  selector: "app-projects",
  standalone: true,
  imports: [IconComponent],
  template: `<section id="projects" class="document-section">
    <div class="section-title">
      <app-icon name="grid" />
      <h2>{{ p.text("Selected projects", "Progetti selezionati") }}</h2>
      <span class="section-count">{{ projects.length }}</span>
    </div>
    <p class="section-description">
      {{ p.text("What I built, why I built it and the decisions behind it.", "Cosa ho realizzato, perché e con quali scelte di progettazione.") }}
    </p>
    <div class="project-database">
      <div class="database-header" aria-hidden="true">
        <span>Aa &nbsp; {{ p.text("Name", "Nome") }}</span>
        <span>↳ &nbsp; {{ p.text("Focus", "Ambito") }}</span>
        <span>◉ &nbsp; {{ p.text("Status", "Stato") }}</span>
      </div>
    @for (project of projects; track project.slug) {
      <details class="project" [id]="project.slug" [open]="project.slug === 'wildlife-monitoring'">
        <summary (click)="toggleProject($event)">
          <span class="project-name"><app-icon name="chevron" /><app-icon [name]="project.art === 'cli' ? 'code' : 'page'" /><strong>{{ project.title }}</strong></span>
          <span class="project-area"><span class="tag" [class.tag-purple]="project.category === 'tooling'">{{ project.category === 'backend' ? 'Backend' : p.text('Developer tools', 'Strumenti') }}</span></span>
          <span class="project-status"><span class="status" [class.in-progress]="project.slug === 'wildlife-monitoring'"><i></i>{{ p.text(project.status, project.statusIt) }}</span></span>
        </summary>
        <div class="project-document">
          <p class="project-context">{{ p.text(project.context, project.contextIt) }}</p>
        @if (project.slug === 'wildlife-monitoring') {
          <dl class="case-study">
            <div>
              <dt>{{ p.text("The problem", "Il problema") }}</dt>
              <dd>{{ p.text("Wildlife observations in parks around Łódź need a reliable record of where a detection happened, even when the physical sensor is moved later.", "Le osservazioni della fauna nei parchi di Łódź richiedono una registrazione affidabile del luogo di ogni rilevamento, anche quando il sensore fisico viene successivamente spostato.") }}</dd>
            </div>
            <div>
              <dt>{{ p.text("My contribution", "Il mio contributo") }}</dt>
            <dd>{{ p.text("Built the NestJS API and PostgreSQL data model with Prisma: 9 REST endpoints, strict DTO validation, Swagger documentation and versioned migrations. Added unit tests and isolated PostgreSQL end-to-end tests in GitHub Actions.", "Realizzazione delle API NestJS e del modello PostgreSQL con Prisma: 9 endpoint REST, validazione rigorosa dei DTO, documentazione Swagger e migrazioni versionate. Aggiunta di test unitari e test end-to-end isolati con PostgreSQL in GitHub Actions.") }}</dd>
            </div>
            <div>
              <dt>{{ p.text("Key engineering decision", "Scelta di progettazione centrale") }}</dt>
              <dd>{{ p.text("Separate the physical sensor from its deployments. Each detection belongs to a deployment, so relocating a device creates a new deployment instead of changing the location attached to past observations.", "Separare il sensore fisico dalle sue installazioni. Ogni rilevamento appartiene a un’installazione: spostare un dispositivo crea una nuova installazione senza modificare il luogo delle osservazioni precedenti.") }}</dd>
            </div>
          </dl>
          <div class="inline-model" [attr.aria-label]="p.text('One sensor has many deployments; each deployment has many detections.', 'Un sensore ha più installazioni; ogni installazione ha più rilevamenti.')">
            <code>Sensor</code><span>1 → n</span><code>Deployment</code><span>1 → n</span><code>Detection</code>
          </div>
          <p class="project-notes">{{ p.text("Ingestion is idempotent to handle conflicting sensor uploads. Planned next: a RabbitMQ queue between the backend and AI inference service, decoupling sensor uploads from asynchronous classification. Authentication and public response filtering also remain planned.", "L’ingestione è idempotente per gestire upload dei sensori in conflitto. Prossimo passo previsto: una coda RabbitMQ tra il backend e il servizio di inferenza AI, per separare gli upload dei sensori dalla classificazione asincrona. Anche autenticazione e filtri delle risposte pubbliche restano pianificati.") }}</p>
        } @else {
          <p class="project-description">{{ p.text(project.description, project.descriptionIt) }}</p>
          <p class="project-notes">{{ p.text(project.notes, project.notesIt) }}</p>
        }
        <p class="project-tech">{{ project.tech }}</p>
        <a class="inline-link" [href]="github + project.slug" target="_blank" rel="noopener noreferrer">{{ p.text("Read the repository", "Esplora il repository") }}<app-icon name="arrow" /></a>
        </div>
      </details>
    }
    </div>
  </section>`,
})
export class ProjectsComponent {
  readonly p = inject(PreferencesService);
  readonly projects = PROJECTS;
  private readonly animations = new Map<HTMLDetailsElement, { animation: Animation; opening: boolean }>();
  private readonly destroy = inject(DestroyRef).onDestroy(() => {
    for (const [element, state] of this.animations) {
      state.animation.cancel();
      element.style.removeProperty("height");
      element.style.removeProperty("overflow");
    }
    this.animations.clear();
  });

  toggleProject(event: MouseEvent): void {
    const summary = event.currentTarget as HTMLElement;
    const element = summary.parentElement as HTMLDetailsElement;
    const previous = this.animations.get(element);
    const opening = previous ? !previous.opening : !element.open;
    event.preventDefault();
    const start = element.getBoundingClientRect().height;
    previous?.animation.cancel();
    this.animations.delete(element);
    element.style.removeProperty("height");
    element.style.removeProperty("overflow");
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
      element.open = opening;
      return;
    }
    element.open = true;
    const end = opening
      ? element.getBoundingClientRect().height
      : summary.getBoundingClientRect().height;
    element.style.height = `${start}px`;
    element.style.overflow = "clip";
    const animation = element.animate(
      { height: [`${start}px`, `${end}px`] },
      { duration: 280, easing: "cubic-bezier(0.22, 1, 0.36, 1)" },
    );
    this.animations.set(element, { animation, opening });
    animation.onfinish = () => {
      element.open = opening;
      element.style.removeProperty("height");
      element.style.removeProperty("overflow");
      this.animations.delete(element);
    };
  }

  readonly github = "https://github.com/MicheleGravagnone/";
}
