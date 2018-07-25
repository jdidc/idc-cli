// 自动写入import信息
module.exports.autoWriteImportInfo = function (){
    let typeDir = `${process.cwd()}/src/views/unifiedOrder/typeList`;
    let allType = fse.readdirSync(typeDir);
    console.log(allType);
    // process.exit();
    let src = `${process.cwd()}/src/views/unifiedOrder/stepCommon`;
    for (let i = 2; i <= 2; i++) {
        const file = `${src}/step${i}.vue`;
        const content = fse.readFileSync(file).toString();
        const html = ejs.render(content, {typeList: allType});
        fse.outputFileSync(file, html);
        console.log(html)
    }
}
