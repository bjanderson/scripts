import {
  camelFromKabobOrPascal,
  getString,
  lowerize,
  pascalFromKabobOrCamel,
  snakeFromKabob,
  titleFromKabob,
} from './string.mjs';

/**
 * Place the RegEx search strings in your template and the parseTemplate function will replace them
 * with the corresponding values from the config.
 */
const camelRE = RegExp('camelCase', 'g');
const kababRE = RegExp('kabab-case', 'g');
const pascalRE = RegExp('PascalCase', 'g');
const titleRE = RegExp('Title Case', 'g');
const snakeRE = RegExp('SNAKE_CASE', 'g');

const args = process.argv.slice(2).map((arg) => arg.toLocaleLowerCase());

// name is the first arg you pass in to the cli when you run a script. It should be entered in kabab-case.
// e.g. node scripts/create-model-ts.mjs model-name
const name = getString(args[0]);

if (!name) {
  console.error('Invalid name');
  process.exit(1);
}

export const config = {
  camel: camelFromKabobOrPascal(name),
  kabab: lowerize(name),
  name,
  pascal: pascalFromKabobOrCamel(name),
  snake: snakeFromKabob(name),
  title: titleFromKabob(name),
};

export const parseTemplate = (template) => {
  const txt = template
    .replace(camelRE, config.camel)
    .replace(kababRE, config.kabab)
    .replace(pascalRE, config.pascal)
    .replace(titleRE, config.title)
    .replace(snakeRE, config.snake);
  return txt;
};

console.log('args :>> ', args);
console.log('config :>> ', config);
