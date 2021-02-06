const { copy } = require('fs-extra');
const path = require('path');
const { prompt } = require('inquirer');
const chalk = require('chalk');
const { upperFirst } = require('lodash');

function getOptions(opt) {
  const { create, all } = opt;

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

  const root = path.resolve(process.cwd());

  if (create) {
    const filePath = path.normalize(`${__dirname}/..//template/${create}`);

    prompt(component).then((res) => {
      if (!res.component) return;
      copy(filePath, `${root}\\uikit\\${create}`, (err) => {
        if (err) console.log(err);

        console.log(`success create ${chalk.green.bold(upperFirst(create))} !`);
      });
    });
  }

  if (all) {
    const allPath = path.normalize(`${__dirname}/..//template`);
    prompt(allComponents).then((res) => {
      if (!res.allComponents) return;
      copy(allPath, `${root}\\uikit`, (err) => {
        if (err) console.log(err);

        console.log(`${chalk.blue.bold('success create all component')} !`);
      });
    });
  }
}

module.exports = {
  getOptions,
};
