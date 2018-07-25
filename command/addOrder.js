const inquirer = require('inquirer');
const chalk = require('chalk');
const fse = require('fs-extra');
const path = require('path');
const ejs = require('ejs');

const question = [
    {
        type: 'input',
        name: 'type',
        message: '工单的类型名字（驼峰形式）',
    },
];

function copyFile(type) {
    // process.cwd() 表示进程的当前目录（绝对路径）
    let dir = `${process.cwd()}/src/views/unifiedOrder/typeList/${type}`;
    if (fse.pathExistsSync(dir)) {
        console.log(chalk.red(`${type} 类型已经存在，请重试！`));
        process.exit();
    }
    fse.mkdirsSync(dir);
}

// 将ejs转为vue文件
function ejs2Vue(src, dest, anwsers) {
    const content = fse.readFileSync(src).toString();
    const html = ejs.render(content, anwsers);
    fse.outputFileSync(dest, html);
}

// 自动写入import信息
function autoWriteImportInfo() {
    let typeDir = `${process.cwd()}/src/views/unifiedOrder/typeList`;
    let allType = fse.readdirSync(typeDir);

    let templateDir = path.resolve(__dirname + '/../template/unifiedOrder/stepCommon');
    let src = `${process.cwd()}/src/views/unifiedOrder/stepCommon`;
    for (let i = 2; i <= 5; i++) {
        const srcFile = `${templateDir}/step${i}.vue`;
        const destFile = `${src}/step${i}.vue`;
        const content = fse.readFileSync(srcFile).toString();
        const html = ejs.render(content, {typeList: allType});
        fse.outputFileSync(destFile, html);
    }
}

module.exports = () => {
    inquirer.prompt(question).then(function(anwsers) {
        copyFile(anwsers.type);

        let dir = path.resolve(__dirname + '/../template/unifiedOrder/opFault');
        let dest = `${process.cwd()}/src/views/unifiedOrder/typeList/${
            anwsers.type
        }`;
        let files = fse.readdirSync(dir);

        files.forEach(itemFileName => {
            let file = `${dir}/${itemFileName}`;
            let newName = itemFileName.replace('opFault', anwsers.type);
            let toFile = `${dest}/${newName}`;
            ejs2Vue(file, toFile, anwsers);
        });

        console.log(chalk.green(`${anwsers.type} 类型工单创建成功！`));

        console.log(chalk.yellow(`开始自动信息注入……`));
        autoWriteImportInfo();
        console.log(chalk.green(`注入完成！`));

        process.exit();
    });
};
