#!/usr/bin/env node

// 定义脚手架的文件路径
process.env.NODE_PATH = __dirname + '/../node_modules/';

const program = require('commander');

program.version(require('../package.json').version);

program
    .command('addOrder')
    .description('add new order')
    .alias('ao')
    .action(() => {
        require('../command/addOrder')();
    });

program
    .command('listOrder')
    .description('list all order')
    .alias('lo')
    .action(() => {
        require('../command/listOrder')();
    });

program
    .command('deleteOrder')
    .description('delete a order')
    .alias('do')
    .action(() => {
        require('../command/deleteOrder')();
    });

program
.command('autoImport')
.description('auto import orders to steps')
.alias('ai')
.action(()=> {
    require('../command/utils').autoWriteImportInfo();
})

program.parse(process.argv);
if (!program.args.length) {
    program.help();
}
