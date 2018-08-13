const fse = require('fs-extra')
const ejs = require('ejs')
const chalk = require('chalk')

const { SRC_VIEWS_ORDER, SRC_ORDER_TYPE_LSIT, SRC_STEP_COMMON_DIR, TEMPLATE_ORDER, TEMPLATE_STEP_COMMON_DIR } = require('./config')

module.exports = {
    // 自动写入import信息
    autoWriteImportInfo() {
        console.log(chalk.yellow(`开始自动信息注入……`))
        let allType = fse.readdirSync(SRC_ORDER_TYPE_LSIT)

        // 每个步骤的含有的类型
        let stepType = {
            step2: [],
            step3: [],
            step4: [],
            step5: [],
        }

        let DeailTypeList = []

        allType.forEach(itemType => {
            for (let i = 2; i <= 5; i++) {
                // 如果类型不存在，则不写入到类型中
                if (fse.pathExistsSync(`${SRC_ORDER_TYPE_LSIT}/${itemType}/${itemType}Step${i}.vue`)) {
                    stepType[`step${i}`].push(itemType)
                }

                
            }

            if (fse.pathExistsSync(`${SRC_ORDER_TYPE_LSIT}/${itemType}/${itemType}Detail.vue`)) {
                DeailTypeList.push(itemType)
            }
        })

        for (let i = 2; i <= 5; i++) {
            const srcFile = `${TEMPLATE_STEP_COMMON_DIR}/step${i}.vue`
            const destFile = `${SRC_STEP_COMMON_DIR}/step${i}.vue`
            const content = fse.readFileSync(srcFile).toString()
            const html = ejs.render(content, {
                typeList: stepType[`step${i}`],
            })
            fse.outputFileSync(destFile, html)
        }

        const src = `${TEMPLATE_ORDER}/unifiedDetail.vue`
        const dest = `${SRC_VIEWS_ORDER}/unifiedDetail.vue`
        const content1 = fse.readFileSync(src).toString()
        const html1 = ejs.render(content1, {
            DeailTypeList: DeailTypeList,
        })
        fse.outputFileSync(dest, html1)

        console.log(chalk.green(`注入完成！\n`))
    },

    // 展示所有工单
    listAllOrder() {
        console.log(chalk.gray(`工单查询……`))

        let files = fse.readdirSync(SRC_ORDER_TYPE_LSIT)
        if (files.length === 0) {
            console.log(chalk.yellow('当前没有工单'))
            process.exit()
        }

        files.forEach(itemFileName => {
            console.log(chalk.yellow(itemFileName))
        })

        console.log(chalk.green(`共计${files.length}种工单！`))
    },
}
