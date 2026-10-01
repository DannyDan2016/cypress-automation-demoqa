// Registro de page objects: una instancia por página, compartida por los steps.
// La clave es el nombre visible de la página, el mismo que usan los .feature en
// "Dado que estoy en la página "<nombre>"".
import { AlertsPage } from './alerts-frames-windows/AlertsPage';
import { BrowserWindowsPage } from './alerts-frames-windows/BrowserWindowsPage';
import { FramesPage } from './alerts-frames-windows/FramesPage';
import { SamplePage } from './alerts-frames-windows/SamplePage';
import { ProfilePage } from './bookstore/ProfilePage';
import { ButtonsPage } from './elements/ButtonsPage';
import { CheckBoxPage } from './elements/CheckBoxPage';
import { DynamicPropertiesPage } from './elements/DynamicPropertiesPage';
import { RadioButtonPage } from './elements/RadioButtonPage';
import { TextBoxPage } from './elements/TextBoxPage';
import { WebTablesPage } from './elements/WebTablesPage';
import { PracticeFormPage } from './forms/PracticeFormPage';

export const textBoxPage = new TextBoxPage();
export const checkBoxPage = new CheckBoxPage();
export const radioButtonPage = new RadioButtonPage();
export const webTablesPage = new WebTablesPage();
export const buttonsPage = new ButtonsPage();
export const dynamicPropertiesPage = new DynamicPropertiesPage();
export const practiceFormPage = new PracticeFormPage();
export const alertsPage = new AlertsPage();
export const browserWindowsPage = new BrowserWindowsPage();
export const framesPage = new FramesPage();
export const samplePage = new SamplePage();
export const profilePage = new ProfilePage();

const PAGES = {
  'Text Box': textBoxPage,
  'Check Box': checkBoxPage,
  'Radio Button': radioButtonPage,
  'Web Tables': webTablesPage,
  Buttons: buttonsPage,
  'Dynamic Properties': dynamicPropertiesPage,
  'Practice Form': practiceFormPage,
  Alerts: alertsPage,
  'Browser Windows': browserWindowsPage,
  Frames: framesPage,
  Profile: profilePage,
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
