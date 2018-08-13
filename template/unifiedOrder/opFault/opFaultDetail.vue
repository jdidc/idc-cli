<template>
    <div>
        <div class="item">
            <p class="title">{{objInfo.title}}</p>
            <Table :data="objInfo.datas.list" :columns="objInfo.columns"></Table>

            <div class="text-right">
                <Button style="margin-top: 10px;" v-if="ifShow" type="success" @click="doSomething">重新上报</Button>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: '<%= type %>-detail',
    props: {
        value: Object,
        opButton: Array,
    },
    computed: {
        objInfo() {
            return this.value
        },
        ifShow() {
            // 根据业务逻辑判断
            return true
        },
    },
    methods: {
        doSomething() {
            console.log('业务逻辑处理')
        },
    },
}
</script>
