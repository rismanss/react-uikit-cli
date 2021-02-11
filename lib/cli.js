const program = require('commander');
const { version } = require('../package.json');
const { getOptions, setInit, runStorybook } = require('./actions');

module.exports = (args) => {
  program
    .name('uikit-cli')
    .usage('[options]')
    .version(version)
    .option('-a, --all', 'create all uikit', false)
    .option('-c, --create <create>', 'create uikit')
    .action((opts) => {
      const { create, all } = opts;
      if (!create && !all) {
        console.log('[help]: uikit-cli --help');
      }
      getOptions(opts);
    });

  program
    .command('init')
    .description('Initializes project')
    .action(() => {
      setInit();
    });

  program
    .command('start:sb')
    .description('run watch storybook')
    .action(() => {
      runStorybook();
    });

  program.parse(args);
};
