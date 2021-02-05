#!/usr/bin/env node
'use strict';

const program = require('commander');
const { version } = require('../package.json');
const { getOptions } = require('./getOptions');

module.exports = (args) => {
  program
    .name('uikit-cli')
    .usage(`[options] command`)
    .version(version)
    .option('-a, --all', 'create all components')
    .option('-c, --create <create>', 'create components')
    .action(({create, all}, options) => {
      getOptions({create, all});
      if (!create && !all) {
        console.log('[options]: uikit-cli --help');
      }
    })
    .parse(args);
};
