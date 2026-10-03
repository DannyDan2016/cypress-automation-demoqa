import { BasePage } from '../BasePage';

const UPLOADS_FOLDER = 'cypress/fixtures/archivos';

// Claves de datos (YAML `entrada`) → campos de texto
const TEXT_FIELDS = {
  nombre: '#firstName',
  apellido: '#lastName',
  email: '#userEmail',
  movil: '#userNumber',
  direccion: '#currentAddress',
};

// Campos obligatorios por clave de datos. Para el género basta con el primer radio:
// la validez de un grupo de radios required es la misma en todos sus inputs.
const REQUIRED_FIELDS = {
  nombre: '#firstName',
  apellido: '#lastName',
  genero: '#gender-radio-1',
  movil: '#userNumber',
};

const pad3 = (day) => String(day).padStart(3, '0');

export class PracticeFormPage extends BasePage {
  constructor() {
    super('/automation-practice-form');
  }

  // --- Locators ---
  get form() {
    return cy.get('#userForm');
  }

  requiredField(key) {
    if (!REQUIRED_FIELDS[key]) {
      throw new Error(
        `PracticeFormPage: "${key}" no es obligatorio. Obligatorios: ${Object.keys(REQUIRED_FIELDS)}.`,
      );
    }
    return cy.get(REQUIRED_FIELDS[key]);
  }

  genderLabel(gender) {
    return cy.contains('label[for^="gender-radio-"]', gender);
  }

  hobbyLabel(hobby) {
    return cy.contains('label[for^="hobbies-checkbox-"]', hobby);
  }

  // react-datepicker
  get dateOfBirthInput() {
    return cy.get('#dateOfBirthInput');
  }

  get monthSelect() {
    return cy.get('.react-datepicker__month-select');
  }

  get yearSelect() {
    return cy.get('.react-datepicker__year-select');
  }

  calendarDay(day) {
    return cy.get(
      `.react-datepicker__day--${pad3(day)}:not(.react-datepicker__day--outside-month)`,
    );
  }

  // react-select: no se usan los ids react-select-N-* porque dependen del orden de render
  get subjectsInput() {
    return cy.get('#subjectsInput');
  }

  subjectOption(subject) {
    return cy.contains('[class*="subjects-auto-complete__option"]', subject);
  }

  get stateInput() {
    return cy.get('#state input');
  }

  get cityInput() {
    return cy.get('#city input');
  }

  get pictureInput() {
    return cy.get('#uploadPicture');
  }

  get submitButton() {
    return cy.get('#submit');
  }

  // Modal de confirmación
  get confirmationTitle() {
    return cy.get('#example-modal-sizes-title-lg');
  }

  get confirmationRows() {
    return cy.get('.modal-body table tbody tr');
  }

  // --- Acciones ---
  selectDateOfBirth({ dia, mes, anio }) {
    this.dateOfBirthInput.click();
    this.monthSelect.select(mes);
    this.yearSelect.select(String(anio));
    this.calendarDay(dia).click();
    return this;
  }

  addSubjects(subjects) {
    subjects.forEach((subject) => {
      this.subjectsInput.type(subject);
      this.subjectOption(subject).click();
    });
    return this;
  }

  selectHobbies(hobbies) {
    hobbies.forEach((hobby) => this.hobbyLabel(hobby).click());
    return this;
  }

  uploadPicture(fileName) {
    this.pictureInput.selectFile(`${UPLOADS_FOLDER}/${fileName}`);
    return this;
  }

  /** react-select: escribir filtra las opciones y Enter elige la primera coincidencia. */
  selectStateAndCity(state, city) {
    this.stateInput.type(`${state}{enter}`);
    this.cityInput.type(`${city}{enter}`);
    return this;
  }

  /** Rellena el formulario con las claves presentes en `entrada` (YAML). */
  fill(entrada) {
    const { genero, fechaNacimiento, materias, aficiones, foto, estado, ciudad, ...texts } =
      entrada;
    this.fillFields(TEXT_FIELDS, texts);
    if (genero) this.genderLabel(genero).click();
    if (fechaNacimiento) this.selectDateOfBirth(fechaNacimiento);
    if (materias) this.addSubjects(materias);
    if (aficiones) this.selectHobbies(aficiones);
    if (foto) this.uploadPicture(foto);
    if (estado) this.selectStateAndCity(estado, ciudad);
    return this;
  }

  submit() {
    this.submitButton.click();
    return this;
  }
}
