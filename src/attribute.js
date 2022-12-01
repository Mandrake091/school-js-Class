import { BaseClass } from "./baseClass.js";

class Attribute extends BaseClass {
  //static contenente i types autorizzati
  static #allowedTypes = ["string", "number", "date", "class"];
  #name;
  #type;
  #required;

  constructor(name, type, required) {
    super();
    this.name = name;
    this.type = type;
    this.#required = required;
  }

  get allowedTypes() {
    return this.constructor.#allowedTypes;
  }

  get name() {
    return this.#name;
  }

  get required() {
    return this.#required;
  }

  get type() {
    return this.#type;
  }

  set name(value) {
    this.#name = value.trim();
  }

  set type(type) {
    console.log(`Set ${type} for ${this.#name}`);
    if (!this.allowedTypes.includes(type)) {
      throw `Type ${type} is not allowed`;
    }
    this.#type = type;
  }
}

export { Attribute };
