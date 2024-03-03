import { config, parseTemplate } from './config.mjs';
import { createDirectoryIfNotExists, readFile, writeFile } from './file-io.mjs';

const folder = 'src/enums';
createDirectoryIfNotExists(folder);

const enumTemplate = `export enum PascalCase {
  SNAKE_CASE = 'Title Case',
};
`;

const enumFileName = parseTemplate(`${folder}/kabab-case.enum.ts`);
const enumTxt = parseTemplate(enumTemplate);
writeFile(enumFileName, enumTxt);

const indexFile = `${folder}/index.ts`;
const index = readFile(indexFile);
let exports = index.split('\n');
exports.push(`export * from './${config.kabab}.enum';`);
exports = exports.filter((v, i, a) => a.indexOf(v) === i);
exports.sort();
writeFile(indexFile, exports.join('\n'), true);
