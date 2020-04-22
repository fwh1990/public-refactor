#!/usr/bin/env node

const path = require('path');
const fs = require('fs');
const chalk = require('chalk');
const glob = require('glob');
const minimist = require('minimist')(process.argv.slice(2));

const { src, dist } = minimist;

if (!src) {
  console.error(chalk.red.bold('Option "src" is required'));
  process.exit(1);
}

const fullSrc = path.resolve(src).replace(/\/^/, '') + '/';

if (!fs.statSync(fullSrc).isDirectory()) {
  console.error(chalk.red.bold('Option "src" should be a directory path'));
}

if (!dist) {
  console.error(chalk.red.bold('Option "dist" is required'));
  process.exit(1);
}

const fullDist = path.resolve(dist);

if (!fs.statSync(fullDist).isDirectory()) {
  console.error(chalk.red.bold('Option "dist" should be a directory path'));
  process.exit(1);
}

const files = glob.sync(path.resolve(fullSrc, '**', '*.ts')).forEach((file) => {
  if (/\.d\.ts$/.test(file)) {
    return;
  }

  const relativePath = file.replace(/\.ts$/, '.d.ts').replace(fullSrc, '');

  const definitionFilePath = path.resolve(fullDist, relativePath);

  if (!fs.existsSync(definitionFilePath)) {
    console.error(chalk.yellow.bold(`Definition type "${definitionFilePath}" is not found, skipped`));
    return;
  }

  const sourceContent = fs.readFileSync(file).toString();
  let distContent;
  const exp = /public\s*\/\*+\s*(protected|private)\s*\*+\/\s*\s+((?:abstract\s+)?[a-z0-9_]+?)\s*\(/ig;

  while (matched = exp.exec(sourceContent)) {
    if (distContent === undefined) {
      distContent = fs.readFileSync(definitionFilePath).toString();
    }

    distContent = distContent.replace(new RegExp(`\\b(\s*)(public\s)?(\s*)?(\s*?${matched[2]}\s*\\()`), `$1${matched[1]} $3$4`);
  }

  fs.writeFileSync(definitionFilePath, distContent);
});

console.log(chalk.green.bold('\nPublic Refactor Done.\n'));
