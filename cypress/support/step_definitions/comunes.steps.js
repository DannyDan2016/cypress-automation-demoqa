import { Given } from '@badeball/cypress-cucumber-preprocessor';
import { pageByName } from '../pages';

// La ruta de cada página la conoce su page object: los .feature solo usan el nombre visible.
Given('que estoy en la página {string}', (name) => {
  pageByName(name).visit();
});
