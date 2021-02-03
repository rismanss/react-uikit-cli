#!/usr/bin/env node
'use strict';
// const fs = require('fs');
// const path = require('path');
const { prompt } = require('inquirer');
const chalk = require('chalk');
const program = require('commander');
const { upperFirst } = require('lodash');
const { version } = require('../package.json');
// const template = require('../template/test');

module.exports = (args) => {
  program
    .name('uikit-cli')
    .usage(`[options] command`)
    .version(version)
    .option('-a, --all-components', 'create all components')
    .option('-c, --component', 'craete component')
    .option('-f, --flag', 'boolean flag', false)
    .action(({ component, allComponents }, options) => {
      if (component) {
        prompt({
          type: 'confirm',
          name: 'component',
          message: 'component',
          // default: test,
        }).then(() => {
          console.log(
            `success create component ${chalk.green.bold(
              upperFirst(component)
            )} !`
          );
        });
      }

      if (allComponents) console.log(`success create all component !`);
      // more hanlder: require('../lib/moreHandler')(options);
    })
    .parse(args);
};
