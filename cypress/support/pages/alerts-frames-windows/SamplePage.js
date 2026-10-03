import { BasePage } from '../BasePage';

// Página de ejemplo que abren New Tab / New Window (y que cargan los iframes como /sample.html)
export class SamplePage extends BasePage {
  constructor() {
    super('/sample');
  }

  get heading() {
    return cy.get('#sampleHeading');
  }
}
