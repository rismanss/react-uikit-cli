// const { exec, spawn } = require('child_process');
const { spawn } = require('child_process');
const program = require('commander');
const { version } = require('../package.json');
const { getOptions, setInit } = require('./getOptions');

// function runCommand(someCommand) {
//   exec(someCommand, (err, stdout, stderr) => {
//     if (err) {
//       console.log(err);
//     }
//     console.log(`stdout: ${stdout}`);
//     console.log(`stderr: ${stderr}`);
//   });
// }

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
      // yarn cmd run in windows, not yet check if env not windows (check mac & linux)
      const sb = spawn('yarn.cmd', ['start-storybook', '-p', '9001'], { stdio: 'inherit' });
      sb.on('error', (err) => {
        console.error(err);
        process.exit(1);
      });
    });

  program.parse(args);
};
