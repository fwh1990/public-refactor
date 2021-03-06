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

const createPattern = (property) => new RegExp(`^(\\s+)(public\s+)?(${property})(\\?\\s*:|:|\\(|\\<)`, 'm');

const pattern1 = /(?:\/\*+\s*(protected|private)\s*\*+\/)?\s*public\s*(?:\/\*+\s*(protected|private)\s*\*+\/)?\s*(abstract|static readonly|readonly declare|declare readonly|static|readonly|declare|async)?\s*(?:\/\*+\s*(protected|private)\s*\*+\/)?\s*([a-z0-9_]+)\s*/ig;

const files = glob.sync(path.resolve(fullSrc, '**', '**', '**', '**', '**', '**', '**', '**', '**', '**', '*.ts')).forEach((file) => {
  const relativePath = file.replace(/(?:\.d)?\.ts$/, '.d.ts').replace(fullSrc, '');
  const definitionFilePath = path.resolve(fullDist, relativePath);

  if (!fs.existsSync(definitionFilePath)) {
    console.error(chalk.yellow.bold(`Definition type "${definitionFilePath}" is not found, skipped`));
    return;
  }

  const sourceContent = fs.readFileSync(file).toString();

  let distContent, matched, records = [];

  while (matched = pattern1.exec(sourceContent)) {
    if (!matched[1] && !matched[2] && !matched[4]) {
      continue;
    }

    if (distContent === undefined) {
      distContent = fs.readFileSync(definitionFilePath).toString();
    }

    const modifier = matched[1] || matched[2] || matched[4];
    let property = (matched[3] ? matched[3].trimRight() + ' ' : '') + matched[5].trimLeft();

    records.push([modifier, property]);

    if (~property.indexOf('async')) {
      property = property.replace(/(\s+async|async\s+|async)/, '');
    }

    if (~property.indexOf('declare')) {
      distContent = distContent.replace(createPattern(property.replace(/(\s+declare|declare\s+|declare)/, '')), `$1${modifier} $3$4`);
    } else {
      distContent = distContent.replace(createPattern(property), `$1${modifier} $3$4`);
    }
  }

  if (distContent) {
    fs.writeFileSync(definitionFilePath, distContent);
    console.log(`\n${chalk.green.bold('Refactoring')} ${chalk.bold(definitionFilePath)}\n`);
    records.forEach((record) => {
      console.log(chalk.green('[√]'), record[0], record[1]);
    });
  }
});

console.log('');
