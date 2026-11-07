import { Component, input } from "@angular/core";
@Component({
  selector: "app-icon",
  standalone: true,
  template: `<svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="1.5"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
  >
    <path [attr.d]="paths[name()] || paths['page']" />
  </svg>`,
})
export class IconComponent {
  readonly name = input("page");
  readonly paths: Record<string, string> = {
    language:
      "M3 5h12M9 3v2M5 5c0 7 8 11 8 11m0-11c0 7-8 11-8 11m9 5 4-11 4 11m-7-3h6",
    page: "M7 3h7l4 4v14H6V3h1m7 0v5h4M9 12h6m-6 4h6",
    grid: "M3 5h18v15H3V5m0 5h18M9 5v15",
    work: "M9 6V3h6v3M3 7h18v13H3V7m0 5 9 3 9-3m-11 2h2",
    person: "M16 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0M4 21v-2a8 8 0 0 1 16 0v2",
    mail: "M3 5h18v14H3V5m0 1 9 7 9-7",
    arrow: "M6 18 18 6M6 6h12v12",
    chevron: "m9 5 7 7-7 7",
    code: "m8 7-5 5 5 5m8-10 5 5-5 5m-3-13-2 16",
    sun: "M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5",
    moon: "M20.5 14A8.5 8.5 0 0 1 10 3.5 8.5 8.5 0 1 0 20.5 14Z",
    menu: "M4 6h16M4 12h16M4 18h16",
    close: "m6 6 12 12M6 18 18 6",
    github:
      "M9 19c-4 1-4-2-6-2m12 5v-4c0-1-.3-2-1-2.5 3-.3 6-1.5 6-6a5 5 0 0 0-1.3-3.5A5 5 0 0 0 18.5 2S17 1.5 14.5 3a13 13 0 0 0-7 0C5 1.5 3.5 2 3.5 2a5 5 0 0 0-.2 4A5 5 0 0 0 2 9.5c0 4.5 3 5.7 6 6C7.3 16 7 17 7 18v4",
    copy: "M8 8h12v13H8V8M16 8V3H3v13h5",
    check: "m5 12 4 4L19 6",
    book: "M3 4h7l2 2 2-2h7v15h-7l-2 2-2-2H3V4m9 2v15",
    tool: "m14 6 4 4 4-4a7 7 0 0 1-9 9L6 22l-4-4 7-7a7 7 0 0 1 9-9l-4 4",
    pin: "M18 9c0 4-6 11-6 11S6 13 6 9a6 6 0 1 1 12 0m-4 0a2 2 0 1 1-4 0 2 2 0 0 1 4 0",
  };
}
