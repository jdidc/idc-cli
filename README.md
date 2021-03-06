# idc-cli

 **一个专注于根据模板创建默认工单步骤的脚手架，一个有潜力的脚手架。**

## feature

1. [x] 接收传入的新工单类型，根据内置的template，生成目录、文件，自动写入import信息。

2. [x] 新工单的步骤可以选择，现支持4/5，默认为5步。

3. [x] git hooks，push时，自动发布到npm.js


## install

``` cnpm i idc-cli -g ```
或者
```npm i idc-cli -g ```

---

输入``` idc ```会显示下面的内容， 说明安装成功。

```YML
Usage: idc [options] [command]

  Options:

    -V, --version   output the version number
    -h, --help      output usage information

  Commands:

    addOrder|ao     add new order   # 增加工单
    listOrder|lo    list all order  # 列出已有工单
    deleteOrder|do  delete a order  # 删除某一种工单
    autoImport|ai   auto import orders to steps # 自动import工单到 stepCommon 中。
```

- ```idc ao```或者```idc addOrder```，
根据提示输驼峰形式的工单类型即可创建成功，import信息会自动写入 stepCommon中。*注意，重复的工单不能创建成功，也不会覆盖之前的工单！*

- ```idc lo```或者```idc listOrder```，
会列出现有的工单。

- ```idc do```或者```idc deleteOrder```，
删除某种工单，根据提示信息输入工单类型的key和确认的```yes```，即可删除。删除需要谨慎操作。
*如果不慎将以写好的工单删除，可以通过```git checkout dir```的方式找回*

- ```idc ai```或者```idc autoImport```，
根据提示输驼峰形式的工单类型即可创建成功，import信息会自动写入 stepCommon中。

## update

如果idc-cli版本升级了，需要更新本地已经安装的idc-cli，通过命令```npm update idc-cli -g```即可更新到最新版。

**如果这样不能够成功，可以尝试卸载idc-cli，再重新安装**
```js
// 卸载
npm uninstall -g idc-cli

// 安装
npm i idc-cli -g
```


## idc-cli开发调试模式

在项目根目录，这样执行即可：```./bin/idc.js lo```，其他命令参考上文的使用

## 主要逻辑

举例来说，我们创建名字为```bigDone```的工单类型

1. 默认会修改以下文件
```js
src/views/unifiedOrder/stepCommon/step2.vue
src/views/unifiedOrder/stepCommon/step3.vue
src/views/unifiedOrder/stepCommon/step4.vue
src/views/unifiedOrder/stepCommon/step5.vue
```
这里的修改很简单，就是注册了子组件

2. 会创建以下文件
```js
src/views/unifiedOrder/typeList/bigDone/bigDoneStep2.vue
src/views/unifiedOrder/typeList/bigDone/bigDoneStep3.vue
src/views/unifiedOrder/typeList/bigDone/bigDoneStep4.vue
src/views/unifiedOrder/typeList/bigDone/bigDoneStep5.vue
src/views/unifiedOrder/typeList/bigDone/bigDoneMixins.js
src/views/unifiedOrder/typeList/bigDone/bigDoneDetail.js
```

3. 对于新版的工单也许你会用不到 ```src/views/unifiedOrder/typeList/bigDone/bigDoneDetail.js```，
如果用不到删除即可。
