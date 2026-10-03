// Validación de contratos de la API con JSON Schema (ajv). Los esquemas se escriben a mano
// a partir de los modelos de Swagger (/swagger): la spec no se publica como JSON.
import Ajv from 'ajv';
import librosAnadidos from './schemas/libros-anadidos.json';
import mensaje from './schemas/mensaje.json';
import token from './schemas/token.json';
import usuario from './schemas/usuario.json';
import usuarioCreado from './schemas/usuario-creado.json';

const SCHEMAS = [librosAnadidos, mensaje, token, usuario, usuarioCreado];
const ajv = new Ajv({ allErrors: true });
SCHEMAS.forEach((schema) => ajv.addSchema(schema));

/** Falla si `body` no cumple el esquema `name` (su $id), listando todos los errores. */
export function expectContract(name, body) {
  const validate = ajv.getSchema(name);
  if (!validate) {
    const names = SCHEMAS.map((schema) => schema.$id).join(', ');
    throw new Error(`No existe el contrato "${name}". Contratos: ${names}.`);
  }
  const valid = validate(body);
  expect(valid, `contrato "${name}": ${ajv.errorsText(validate.errors)}`).to.equal(true);
}
