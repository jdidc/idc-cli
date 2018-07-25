const inquirer = require('inquirer');
const chalk = require('chalk');
const fse = require('fs-extra');
const path = require('path');
const ejs = require('ejs');

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
        console.log(__dirname + '\n');
        console.log(process.cwd() + '\n');
        if(anwsers.operation!== 'yes'){
            console.log(chalk.gray(`未确认，已取消！`))
            process.exit()
        }

        let dest = `${process.cwd()}/src/views/unifiedOrder/typeList/${
            anwsers.type
        }`;

        if(!fse.pathExistsSync(dest)){
            console.log(chalk.red(`当前工单类型 ${anwsers.type} 不存在，请重试！`))
            process.exit()
        }

        fse.removeSync(dest)

        // let files = fse.readdirSync(dest);
        // files.forEach(itemFileName => {
        //     fse.removeSync(`${dest}/${itemFileName}`)
        // });

        console.log(chalk.green('删除成功！'))

        process.exit();
    });
};
