const Ajv = require('ajv');
const ajv = new Ajv({ schemaId: 'id', allErrors: true });
ajv.addMetaSchema(require('ajv/lib/refs/json-schema-draft-04.json'));

const validate = (schema, data) => {
  const valid = ajv.validate(schema, data);
  const errorsText =
    ajv.errorsText() && ajv.errorsText().toLowerCase() !== 'no errors'
      ? ajv.errorsText()
      : undefined;

  return {
    valid,
    errorsText,
  };
};

module.exports = {
  validate,
};
