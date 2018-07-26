const inquirer = require('inquirer');
const chalk = require('chalk');
const fse = require('fs-extra');

const {autoWriteImportInfo, listAllOrder} = require('./utils')
const { SRC_ORDER_TYPE_LSIT } = require('./config');

const question = [
    {
        type: 'input',
        name: 'type',
        message: '要删除工单的类型名字（驼峰形式），请谨慎操作！',
    },
    {
        type: 'input',
        name: 'operation',
        message: '是否确定，请输入 yes/no',
    },
];

module.exports = () => {
    inquirer.prompt(question).then(function(anwsers) {
        if (anwsers.operation !== 'yes') {
            console.log(chalk.gray(`未确认，已取消！`));
            process.exit();
        }

        let dest = `${SRC_ORDER_TYPE_LSIT}/${anwsers.type}`;

        if (!fse.pathExistsSync(dest)) {
            console.log(
                chalk.red(`当前工单类型 ${anwsers.type} 不存在，请重试！`),
            );
            process.exit();
        }

        fse.removeSync(dest);
        autoWriteImportInfo()
        console.log(chalk.green('删除成功！'));

        listAllOrder();

        process.exit();
    });
};
