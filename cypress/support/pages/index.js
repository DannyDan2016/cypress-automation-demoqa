// Registro de page objects: una instancia por página, compartida por los steps.
// La clave es el nombre visible de la página, el mismo que usan los .feature en
// "Dado que estoy en la página "<nombre>"".
import { ButtonsPage } from './elements/ButtonsPage';
import { CheckBoxPage } from './elements/CheckBoxPage';
import { RadioButtonPage } from './elements/RadioButtonPage';
import { TextBoxPage } from './elements/TextBoxPage';
import { WebTablesPage } from './elements/WebTablesPage';
import { PracticeFormPage } from './forms/PracticeFormPage';

export const textBoxPage = new TextBoxPage();
export const checkBoxPage = new CheckBoxPage();
export const radioButtonPage = new RadioButtonPage();
export const webTablesPage = new WebTablesPage();
export const buttonsPage = new ButtonsPage();
export const practiceFormPage = new PracticeFormPage();

const PAGES = {
  'Text Box': textBoxPage,
  'Check Box': checkBoxPage,
  'Radio Button': radioButtonPage,
  'Web Tables': webTablesPage,
  Buttons: buttonsPage,
  'Practice Form': practiceFormPage,
};

export function pageByName(name) {
  const page = PAGES[name];
  if (!page) {
    throw new Error(
      `No hay page object para "${name}". Páginas: ${Object.keys(PAGES).join(', ')}.`,
    );
  }
  return page;
}
