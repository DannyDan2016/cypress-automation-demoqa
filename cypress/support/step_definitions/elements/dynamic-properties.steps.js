import { When, Then } from '@badeball/cypress-cucumber-preprocessor';
import { dynamicPropertiesPage } from '../../pages';

const DATA = 'elements/dynamic-properties';

When('el reloj avanza el retardo de las propiedades dinámicas', () => {
  cy.datos(DATA, 'retardoMs').then((retardo) => {
    cy.tick(retardo);
  });
});

Then('los botones dinámicos están en su estado inicial', () => {
  cy.datos(DATA, 'claseColor').then((clase) => {
    dynamicPropertiesPage.enableAfterButton.should('be.disabled');
    dynamicPropertiesPage.colorChangeButton.should('not.have.class', clase);
    dynamicPropertiesPage.visibleAfterButton.should('not.exist');
  });
});

Then('los botones dinámicos están en su estado final', () => {
  cy.datos(DATA, 'claseColor').then((clase) => {
    dynamicPropertiesPage.enableAfterButton.should('be.enabled');
    dynamicPropertiesPage.colorChangeButton.should('have.class', clase);
    dynamicPropertiesPage.visibleAfterButton.should('be.visible');
  });
});
