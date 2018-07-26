# idc-cli

 **一个专注于根据模板创建默认工单步骤的脚手架，一个有潜力（不正经）的脚手架。**

## feature

1. [x] 接收传入的新工单类型，根据内置的template，生成目录、文件，自动写入import信息。

2. [x] 新工单的步骤可以选择，现支持4/5，默认为5步。




## install

``` cnpm i idc-cli -g ```
或者
```npm i idc-cli -g ```

---

输入``` idc ```会显示下面的内容， 说明安装成功。

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
根据提示输驼峰形式的工单类型即可创建成功，import信息会自动写入 stepCommon中。*注意，重复的工单不能创建成功，也不会覆盖之前的工单！*

- ```idc lo```或者```idc listOrder```，
会列出现有的工单。

- ```idc do```或者```idc deleteOrder```，
删除某种工单，根据提示信息输入工单类型的key和确认的```yes```，即可删除。删除需要谨慎操作。
*如果不慎将以写好的工单删除，可以通过```git checkout dir```的方式找回*

- ```idc ai```或者```idc autoImport```，
根据提示输驼峰形式的工单类型即可创建成功，import信息会自动写入 stepCommon中。