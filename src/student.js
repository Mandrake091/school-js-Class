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

  constructor( //costruttore
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

}

export { Student };
