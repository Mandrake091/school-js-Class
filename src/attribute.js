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
    if (!this.allowedTypes.includes(type)) {
      throw `Type ${type} is not allowed`;
    }
    this.#type = type;
  }

  validate(value) {
    let success = false;
    switch (this.type) {
      case "string": 
        success = typeof(value) == "string";
        if (this.required) {
          success = success && value.replaceAll(" ", "").length > 0;
        }
        break;
      case "number":
        success = !isNaN(+value);
        break;
      case "date":
        success = !isNaN(Date.parse(value));
        break;
      case "class":
        success = [1, 2, 3, 4, 5].includes(value);
        break;
    }
    return success;
  }
}

export { Attribute };
