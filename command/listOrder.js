const inquirer = require('inquirer');
const chalk = require('chalk');
const fse = require('fs-extra');
const path = require('path');
const ejs = require('ejs');

module.exports = () => {
    let dest = `${process.cwd()}/src/views/unifiedOrder/typeList`;

    let files = fse.readdirSync(dest);
    if (files.length === 0) {
        console.log(chalk.yellow('当前没有工单'));
        process.exit();
    }

    files.forEach(itemFileName => {
        console.log(chalk.yellow(itemFileName));
    });

    console.log(chalk.green(`共计${files.length}种工单！`));
};
