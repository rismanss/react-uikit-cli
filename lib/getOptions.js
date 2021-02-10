const { spawn } = require('child_process');
const { copy, pathExistsSync } = require('fs-extra');
const path = require('path');
const { prompt } = require('inquirer');
const chalk = require('chalk');
const { upperFirst } = require('lodash');

const root = path.resolve(process.cwd());

function getOptions(opts) {
  const { create, all } = opts;

  const component = {
    type: 'confirm',
    name: 'component',
    message: `create ${create} ?`,
  };

  const allComponents = {
    type: 'confirm',
    name: 'allComponents',
    message: 'create all ?',
  };

  if (create) {
    const filePath = path.normalize(`${__dirname}/..//template/${create}`);

    prompt(component).then((res) => {
      if (!res.component) return;
      copy(filePath, `${root}\\src\\uikit\\${create}`, (err) => {
        if (err) console.log(err);

        console.log(`success create ${chalk.green.bold(upperFirst(create))} !`);
      });
    });
  }

  if (all) {
    const allPath = path.normalize(`${__dirname}/..//template`);
    prompt(allComponents).then((res) => {
      if (!res.allComponents) return;
      copy(allPath, `${root}\\src\\uikit`, (err) => {
        if (err) console.log(err);

        console.log(`${chalk.blue.bold('success create all component')} !`);
      });
    });
  }
}

function setInit() {
  const initial = {
    type: 'confirm',
    name: 'init',
    message:
      'install all requared package development dependency & make directory .storybook ?',
  };

  const storyPath = path.normalize(`${__dirname}/..//.storybook`);
  prompt(initial).then((res) => {
    if (!res.init) return;
    copy(storyPath, `${root}\\src\\.storybook`, (err) => {
      if (err) console.log(err);
      console.log('success create dir /.storybook');
    });
  });
}

function runStorybook() {
  const checkPkgManager = pathExistsSync(
    path.resolve(process.cwd(), 'yarn.lock'),
  );
  
  const usePkgManager = checkPkgManager ? 'yarn' : 'npm';

  // yarn.cmd/npm.cmd run in windows
  const isWin = process.platform === 'win32';
 
  const sb = spawn(
    isWin ? `${usePkgManager}.cmd` : `${usePkgManager}`,
    checkPkgManager ? ['start-storybook', '-p', '9001'] : ['run', 'storybook'],
    { stdio: 'inherit' },
  );

  sb.on('error', (err) => {
    console.error(err);
    process.exit(1);
  });
}

module.exports = {
  getOptions,
  setInit,
  runStorybook,
};
