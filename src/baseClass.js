class BaseClass {
    #id
    constructor(id) {
        this.#id = Math.floor(Math.random() * 10000);
    }
    get id() {
        return this.#id;
    }

    validate() {
        console.log(`Validate: `, this);
        let validationResult = {
          invalidAttributes: [],
        };
        try {
          for (let attribute in this.attributes) {
            console.log(
              `Validating ${attribute} of type ${this.attributes[attribute].type} for value ${this[attribute]}`
            );
            const attributeIsValid = this.attributes[attribute].validate(
              this[attribute]
            );
            if (!attributeIsValid) {
              validationResult.invalidAttributes.push(attribute);
            }
          }
          validationResult.success =
            validationResult.invalidAttributes.length === 0;
        } catch (err) {
          console.log(`Error: `, err);
          validationResult.success = false;
        }
        return validationResult;
      }
}

export {BaseClass};