import { config, parseTemplate } from './config.mjs';
import { createDirectoryIfNotExists, readFile, writeFile } from './file-io.mjs';

const folder = 'src/constants';
createDirectoryIfNotExists(folder);

const constantTemplate = `export const camelCase: any = {};
`;

const constantFileName = parseTemplate(`${folder}/kabab-case.constant.ts`);
const constantTxt = parseTemplate(constantTemplate);
writeFile(constantFileName, constantTxt);

const indexFile = `${folder}/index.ts`;
const index = readFile(indexFile);
let exports = index.split('\n');
exports.push(`export * from './${config.kabab}.constant';`);
exports = exports.filter((v, i, a) => a.indexOf(v) === i);
exports.sort();
writeFile(indexFile, exports.join('\n'), true);
