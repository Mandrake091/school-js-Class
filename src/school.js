import { Attribute } from "./attribute.js";
import { BaseClass } from "./baseClass.js";

class School extends BaseClass {
  static #attributes = {
    name: new Attribute("name", "string", true),
  };

  #name;
  #classes;
  #students;
  #studentsInClasses;

  constructor(name) {
    super();
    this.#classes = new Map();
    this.#students = new Map();
    this.#studentsInClasses = new Map();
    this.name = name;
  }

  get attributes() {
    return this.constructor.#attributes;
  }

  get classes() {
    const joinedMap = new Map();
    this.#classes.forEach((schoolClass, schoolClassId) => {
      const selClass = {
        class: this.#classes.get(schoolClassId),
        students: new Map(),
      };
      this.#studentsInClasses.forEach((studentSchoolClassId, studentId) => {
        if (studentSchoolClassId === schoolClassId) {
          selClass.students.set(studentId, this.#students.get(studentId));
        }
      });
      joinedMap.set(schoolClassId, selClass);
    });
    return joinedMap;
  }

  get students() {
    return this.#students;
  }

  get name() {
    return this.#name;
  }

  set name(name = "") {
    this.#name = name.trim();
  }

  addSchoolClass(schoolClass) {
    // if classes Map has not already this id, set in Map, else throws err
    if (!this.#classes.has(schoolClass.id)) {
      this.#classes.set(schoolClass.id, schoolClass);
    } else {
      throw `School Class ${schoolClass.id} already exists`;
    }
  }

  addStudent(student) {
    // if students Map has not already this id, set in Map, else throws err
    if (!this.#students.has(student.id)) {
      this.#students.set(student.id, student);
    } else {
      throw `Student ${schoolClass.id} already exists`;
    }
  }

  addStudentToSchoolClass(studentId, schoolClassId) {
    // check again for existing class/student in Maps, then set student in selClass
    if (!this.#classes.has(schoolClassId)) {
      throw `School class ${schoolClassId} does not exist.`;
    }
    if (!this.#students.has(studentId)) {
      throw `Student ${studentId} does not exist.`;
    }
    this.#studentsInClasses.set(studentId, schoolClassId);
  }

  removeStudent(studentId){ //per gestire l'edit abbiamo bisogno che elimini lo studente vecchio e aggiorni la mappa StudentClass

    this.#students.delete(+studentId) 
    this.#studentsInClasses.delete(+studentId)
  }
}

export { School };
