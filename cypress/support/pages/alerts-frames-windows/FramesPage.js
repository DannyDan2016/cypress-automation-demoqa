import { BasePage } from '../BasePage';

// Clave del frame (usada en los .feature) → iframe. Ambos cargan /sample.html (mismo origen).
const FRAMES = {
  grande: '#frame1',
  pequeno: '#frame2',
};

export class FramesPage extends BasePage {
  constructor() {
    super('/frames');
  }

  frameBody(key) {
    if (!FRAMES[key]) {
      throw new Error(`FramesPage: frame "${key}" desconocido. Frames: ${Object.keys(FRAMES)}.`);
    }
    return cy.iframeBody(FRAMES[key]);
  }

  frameHeading(key) {
    return this.frameBody(key).find('#sampleHeading');
  }
}
