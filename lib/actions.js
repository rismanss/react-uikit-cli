const { spawn } = require('child_process');
const {
  copy, pathExistsSync, readJSONSync, writeFileSync,
} = require('fs-extra');
const path = require('path');
const { prompt } = require('inquirer');
const chalk = require('chalk');
const { upperFirst, has } = require('lodash');

const root = path.resolve(process.cwd());
const checkPkgManager = pathExistsSync(
  path.resolve(process.cwd(), 'yarn.lock'),
);

const usePkgManager = checkPkgManager ? 'yarn' : 'npm';

// yarn.cmd/npm.cmd run in windows
const isWin = process.platform === 'win32';

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
    const filePath = path.normalize(`${__dirname}/..//template/uikit/${create}`);

    prompt(component).then((res) => {
      if (!res.component) return;
      copy(filePath, `${root}\\src\\uikit\\${create}`, (err) => {
        if (err) console.log(err);

        console.log(`success create ${chalk.green.bold(upperFirst(create))} !`);
      });
    });
  }

  if (all) {
    const allPath = path.normalize(`${__dirname}/..//template/uikit`);
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

  const storyPath = path.normalize(`${__dirname}/..//template/.storybook`);
  prompt(initial).then((res) => {
    if (!res.init) return;

    const pkg = readJSONSync(`${root}/package.json`);

    // dont install babel-loader if have react-scripts (react-scripts already include babel-loader)
    const checkBabelLoader = has(pkg.dependencies, 'react-scripts') ? null : 'babel-loader';

    const isYarn = [
      'add',
      '--dev',
      '@storybook/react',
      '@babel/core',
      '@storybook/addon-actions',
      '@storybook/addon-essentials',
      checkBabelLoader,
    ];

    const isNpm = [
      'install',
      '@storybook/react',
      '@babel/core',
      '@storybook/addon-actions',
      '@storybook/addon-essentials',
      checkBabelLoader,
      '--save-dev',
    ];

    copy(storyPath, `${root}\\.storybook`)
      .then(() => {
        console.log('success build directory ./.storybook');
        console.log('waiting install dependencies...');

        const getPkg = spawn(
          isWin ? `${usePkgManager}.cmd` : `${usePkgManager}`,
          checkPkgManager ? isYarn : isNpm,
          { stdio: 'inherit' },
        );

        getPkg.on('error', (err) => {
          console.error(err);
          process.exit(1);
        });
      })
      .then(() => {
        if (typeof pkg.scripts.storybook === 'undefined') {
          pkg.scripts.storybook = 'start-storybook -p 9001';
          return writeFileSync(`${root}/package.json`, JSON.stringify(pkg, null, 2));
        }
        return null;
      })
      .catch((err) => {
        console.log(err);
      });
  });
}

function runStorybook() {
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
