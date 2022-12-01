class BaseClass {
    #id
    constructor(id) {
        this.#id = Math.floor(Math.random() * 10000);
    }
    get id() {
        return this.#id;
    }

    validate() {
      let validationResult = {
        invalidAttributes: [],
      };
      for (let attribute in this.attributes) {
        const attributeIsValid = this.attributes[attribute].validate(this[attribute]);
        if (!attributeIsValid) {
          validationResult.invalidAttributes.push(attribute);
        }
      }
      validationResult.success = validationResult.invalidAttributes.length === 0;
      return validationResult;
    }
}

export {BaseClass};