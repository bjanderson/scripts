import { config, parseTemplate } from './config.mjs';
import { createDirectoryIfNotExists, writeFile } from './file-io.mjs';

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

// create the directory for your files
const folder = `src/models/${config.kabab}`;
createDirectoryIfNotExists(folder);

// create the main file
const modelTemplate = `import { getObject, getString } from '@bjanderson/utils';

/**
 * kabab-case model
 */
export class PascalCase {
  public camelCase: string;
  public static SNAKE_CASE = 'Title Case';

  constructor(o?: Partial<PascalCase>) {
    const obj: PascalCase = getObject(o);
    this.camelCase = getString(obj.camelCase);
  }
}
`;

const modelFileName = parseTemplate(`${folder}/kabab-case.model.ts`);
const modelTxt = parseTemplate(modelTemplate);
writeFile(modelFileName, modelTxt);

// create a test file
const modelTestTemplate = `import { PascalCase } from './kabab-case.model';

describe('PascalCase', () => {
  it('constructs', () => {
    expect(new PascalCase()).toBeDefined();
  });
});
`;

const modelTestFileName = parseTemplate(`${folder}/kabab-case.model.spec.ts`);
const modelTestTxt = parseTemplate(modelTestTemplate);
writeFile(modelTestFileName, modelTestTxt);

// create an export barrel
const modelIndexTemplate = `export * from './kabab-case.model'`;
const modelIndexFileName = parseTemplate(`${folder}/index.ts`);
const modelIndexTxt = parseTemplate(modelIndexTemplate);
writeFile(modelIndexFileName, modelIndexTxt);
