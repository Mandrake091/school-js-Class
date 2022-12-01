import { BaseClass } from "./baseClass.js";
import { Attribute } from "./attribute.js";

class SchoolClass extends BaseClass {
    static #attributes = {
        name: new Attribute("name", "string", true),
        ageRequired: new Attribute("ageRequired", "number", true),
    };
    #name 
    #ageRequired
    #studentClass = [];
    constructor(name, ageRequired) {
        super();
        this.#name = name;
        this.#ageRequired = ageRequired;
        this.#studentClass = [];
    }

    get attributes() {
        return this.constructor.#attributes;
    }

    get ageRequired() {
        return this.#ageRequired;
    }

    get name() {
        return this.#name;
    }

    get studentClass() {
        return this.#studentClass;
    }

    set name(name) {
        this.#name = name.trim();
    }

    set ageRequired(ageRequired) {
        this.#ageRequired = +ageRequired;
    }

    set studentClass(studentClass) {
        this.#studentClass = studentClass;
    }
}

export {SchoolClass};