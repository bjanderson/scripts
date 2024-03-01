import { execSync } from 'child_process';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';

export const createDirectory = (path) => {
  try {
    mkdirSync(path, { recursive: true });
  } catch (err) {
    console.error(`Failed to create directory: ${path}`);
    console.error(err);
    process.exit(1);
  }
};

export const pathExists = (path) => {
  return existsSync(path);
};

export const createDirectoryIfNotExists = (path) => {
  if (!pathExists(path)) {
    createDirectory(path);
  }
};

export const readFile = (fileName) => {
  try {
    const fileContents = readFileSync(fileName, { encoding: 'utf-8' });
    return fileContents;
  } catch (error) {
    return '';
  }
};

export const readJsonFile = (filename) => {
  if (pathExists(filename)) {
    try {
      const str = readFile(filename);
      return JSON.parse(str);
    } catch (err) {
      console.error(`ERROR: Could not read file ${filename}`);
      return {};
    }
  }
  console.warn(message);
  return {};
};

export const writeFile = (file, text, overwrite = false) => {
  if (!overwrite && pathExists(file)) {
    console.error(`${file} already exists. Enter a different name.`);
    process.exit(1);
  }
  try {
    writeFileSync(file, text, { encoding: 'utf-8' });
  } catch (err) {
    console.error(`Failed to write file: ${file}`);
    console.error(err);
    process.exit(1);
  }
};

export const writeJsonFile = (filename, json) => {
  const str = JSON.stringify(json, null, 2);
  writeFile(filename, str);
};

export const execute = (command) => {
  try {
    execSync(command);
  } catch (err) {
    console.error(`Error executing command: ${command}`);
    console.error(err);
  }
};
