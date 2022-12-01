import { Attribute } from "./attribute.js";
import { BaseClass } from "./baseClass.js";
class Student extends BaseClass {
  // variabili private
  static #attributes = {
    name: new Attribute("name", "string", true),
    surname: new Attribute("surname", "string", true),
    birthday: new Attribute("birthday", "date", true),
  };
  #name;
  #surname;
  #birthday;

  constructor(
    name,
    surname,
    birthdayString,
  ) {
    super();
    this.name = name;
    this.surname = surname;
    this.birthday = birthdayString;
  }

  get attributes() {
    return this.constructor.#attributes;
  }

  get name() {
    return this.#name;
  }

  get surname() {
    return this.#surname;
  }

  get birthday() {
    return this.#birthday;
  }

  set name(name) {
    this.#name = String(name).trim();
  }

  set surname(surname) {
    this.#surname = String(surname).trim();
  }

  set birthday(birthdayString) {
    this.#birthday = new Date(birthdayString)
  }

  getAge() {

    // calcola la diffeerenza tra le due date
    const datesDiff = this.#birthday - new Date(this.#birthday);

    // converte la differenza in data, estraendone l'anno (+1970)
    const year = new Date(datesDiff).getUTCFullYear();

    // restituisce l'età
    return Math.abs(year - 1970);
  }
}

export { Student };
