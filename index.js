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

const pattern1 = /public\s*\/\*+\s*(protected|private)\s*\*+\/\s*(abstract|static readonly|readonly declare|declare readonly|static|readonly|declare|async)?\s*([a-z0-9_]+)\s*/ig;
// For prettier
const pattern2 = /public\s*(abstract|static readonly|readonly declare|declare readonly|static|readonly|declare|async)?\s*\/\*+\s*(protected|private)\s*\*+\/\s*([a-z0-9_]+)\s*/ig;

const files = glob.sync(path.resolve(fullSrc, '**', '**', '**', '**', '**', '**', '**', '**', '**', '**', '*.ts')).forEach((file) => {
  const relativePath = file.replace(/(?:\.d)?\.ts$/, '.d.ts').replace(fullSrc, '');
  const definitionFilePath = path.resolve(fullDist, relativePath);

  if (!fs.existsSync(definitionFilePath)) {
    console.error(chalk.yellow.bold(`Definition type "${definitionFilePath}" is not found, skipped`));
    return;
  }

  const sourceContent = fs.readFileSync(file).toString();

  let distContent, matched1, matched2, records = [];

  while (matched1 = pattern1.exec(sourceContent) || (matched2 = pattern2.exec(sourceContent))) {
    if (distContent === undefined) {
      distContent = fs.readFileSync(definitionFilePath).toString();

      if (/\.d\.ts$/.test(file)) {
        distContent = distContent.replace(/public\s*(.*?)\/\*+\s*(protected|private)\s*\*+\/\s*/ig, '$1');
      }
    }

    if (matched2) {
      [matched2[1], matched2[2]] = [matched2[2], matched2[1]];
    }

    const matched = matched1 || matched2;

    const modifier = matched[1];
    let property = (matched[2] ? matched[2].trimRight() + ' ' : '') + matched[3].trimLeft();

    records.push(matched);

    if (~property.indexOf('async')) {
      property = property.replace(/(\s+async|async\s+|async)/, '');
    }

    if (~property.indexOf('declare')) {
      const nextDistContent = distContent.replace(createPattern(property), (_all, $1, _2, $3, $4) => {
        return `${$1}${modifier} ${$3.replace(/(\s+declare|declare\s+|declare)/, '')}${$4}`;
      });

      if (distContent === nextDistContent) {
        distContent = distContent.replace(createPattern(property.replace(/(\s+declare|declare\s+|declare)/, '')), `$1${modifier} $3$4`);
      } else {
        distContent = nextDistContent;
      }
    } else {
      distContent = distContent.replace(createPattern(property), `$1${modifier} $3$4`);
    }
  }

  if (distContent) {
    fs.writeFileSync(definitionFilePath, distContent);
    console.log(`\n${chalk.green.bold('Refactoring')} ${chalk.bold(definitionFilePath)}\n`);
    records.forEach((record) => {
      console.log(chalk.green('[√]'), record[1], record[2]);
    });
  }
});

console.log('');
