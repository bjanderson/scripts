import { config, parseTemplate } from './config.mjs';
import { createDirectoryIfNotExists, readFile, writeFile } from './file-io.mjs';

/**
 * This is an example of how to create a code generator using these scripts.
 * It can generate any code you want - just use the template tokens correctly.
 * Template tokens are defined in regex's in config.mjs:
 * - camelCase
 * - kabab-case
 * - PascalCase
 * - Title Case
 * - SNAKE_CASE
 *
 * You would run this file using node:
 *  node scripts/create-model-ts.mjs <model-name>
 */

// ------------------------------------
// create the directory for your files
// ------------------------------------
const parentFolder = 'src/models';
const folder = `${parentFolder}/${config.kabab}`;
createDirectoryIfNotExists(folder);

// ------------------------------------
// create the main file
// ------------------------------------
const modelTemplate = `import { getObject, getString } from '@bjanderson/utils';
import { v4 as guid } from 'uuid';

export class PascalCase {
  public id: string;

  constructor(o?: Partial<PascalCase>) {
    const obj: PascalCase = getObject(o);
    this.id = getString(obj.id, guid());
  }
}
`;

const modelFileName = parseTemplate(`${folder}/kabab-case.model.ts`);
const modelTxt = parseTemplate(modelTemplate);
writeFile(modelFileName, modelTxt);

// ------------------------------------
// create a test file
// ------------------------------------
const modelTestTemplate = `import { DEFAULT_STRING } from '@bjanderson/utils';
import { PascalCase } from './kabab-case.model';

describe('PascalCase', () => {
  describe('constructor defaults', () => {
    const defaults = {
      id: DEFAULT_STRING,
    };

    it('should have the expected fields', () => {
      expect(Object.keys(defaults)).toEqual(Object.keys(new PascalCase()));
    });

    it('should set the default values when given no input object', () => {
      const model = new PascalCase();
      defaults.id = model.id; // id should be a random guid by default so we won't know what it is until the model is created
      expect(Object.values(defaults)).toEqual(Object.values(model));
    });
  });

  describe('constructor assignments', () => {
    it('should set all values passed into the constructor', () => {
      const test = {
        id: 'test id',
      };

      expect(Object.values(test)).toEqual(Object.values(new PascalCase(test)));
    });
  });
});
`;

const modelTestFileName = parseTemplate(`${folder}/kabab-case.model.spec.ts`);
const modelTestTxt = parseTemplate(modelTestTemplate);
writeFile(modelTestFileName, modelTestTxt);

// ------------------------------------
// create an export barrel
// ------------------------------------
const modelIndexTemplate = `export * from './kabab-case.model'`;
const modelIndexFileName = parseTemplate(`${folder}/index.ts`);
const modelIndexTxt = parseTemplate(modelIndexTemplate);
writeFile(modelIndexFileName, modelIndexTxt);

// ------------------------------------
// create a parent export barrel
// ------------------------------------
const indexFile = `${parentFolder}/index.ts`;
const index = readFile(indexFile);
let exports = index.split('\n');
exports.push(`export * from './${config.kabab}';`);
exports = exports.filter((v, i, a) => a.indexOf(v) === i);
exports.sort();
writeFile(indexFile, exports.join('\n'), true);
