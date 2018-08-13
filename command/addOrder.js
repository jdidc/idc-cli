const inquirer = require('inquirer')
const chalk = require('chalk')
const fse = require('fs-extra')
const ejs = require('ejs')

const { autoWriteImportInfo, listAllOrder } = require('./utils')

const {
    SRC_VIEWS,
    SRC_VIEWS_ORDER,
    SRC_STEP_COMMON_DIR,
    SRC_ORDER_TYPE_LSIT,

    TEMPLATE_DIR,
    TEMPLATE_ORDER,
    TEMPLATE_STEP_COMMON_DIR,
    TEMPLATE_OP_FAULT,
} = require('./config')

const question = [
    {
        type: 'input',
        name: 'type',
        message: '工单的类型名字（驼峰形式）',
    },
    {
        type: 'input',
        name: 'step',
        message: '当前创建工单的步骤（4/5，默认5）',
    },
    {
        type: 'input',
        name: 'hasDetail',
        message: '是否创建详情页（yes/no，默认yes）',
    },
]

function copyFile(type) {
    // process.cwd() 表示进程的当前目录（绝对路径）
    let dir = `${SRC_ORDER_TYPE_LSIT}/${type}`
    if (fse.pathExistsSync(dir)) {
        console.log(chalk.red(`${type} 类型已经存在，请重试！`))
        process.exit()
    }
    fse.mkdirsSync(dir)
}

// 将ejs转为vue文件
function ejs2Vue(src, dest, anwsers) {
    const content = fse.readFileSync(src).toString()
    const html = ejs.render(content, anwsers)
    fse.outputFileSync(dest, html)
}

module.exports = () => {
    inquirer.prompt(question).then(function(anwsers) {
        copyFile(anwsers.type)

        let files = fse.readdirSync(TEMPLATE_OP_FAULT)

        files.forEach(itemFileName => {
            let file = `${TEMPLATE_OP_FAULT}/${itemFileName}`
            let newName = itemFileName.replace('opFault', anwsers.type)
            let toFile = `${SRC_ORDER_TYPE_LSIT}/${anwsers.type}/${newName}`
            ejs2Vue(file, toFile, anwsers)
        })

        if (anwsers.step === '4') {
            let file = `${SRC_ORDER_TYPE_LSIT}/${anwsers.type}/${anwsers.type}Step2.vue`

            if (fse.pathExistsSync(file)) {
                fse.removeSync(file)
            }
        }

        if (anwsers.hasDetail === 'no') {
            let file = `${SRC_ORDER_TYPE_LSIT}/${anwsers.type}/${anwsers.type}Detail.vue`

            if (fse.pathExistsSync(file)) {
                fse.removeSync(file)
            }
        }

        console.log(chalk.green(`${anwsers.type} 类型工单创建成功！\n`))

        autoWriteImportInfo()

        listAllOrder()

        process.exit()
    })
}
