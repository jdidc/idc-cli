<template>
    <div>
        <div class="row">
            <div class="col-sm-12">
                <div>xxx 内容</div>
                <Button @click="modalShow = true" type="info">搜索</Button>
            </div>
        </div>

        <div class="row text-right mt40">
            <div class="col-sm-12">
                <Button type="info" @click="nextStep">下一步</Button>
            </div>
        </div>

        <!-- 各种可能的弹出框，如果不需要可以删除 -->
        <Modal title="标题" v-model="modalShow">
            <p>任意内容</p>
            <div slot="footer" class="text-right">
                <Button @click="post" type="primary">确定</Button>
            </div>
        </Modal>

    </div>
</template>
<script>
import newTypeMixins from './newTypeMixins';

export default {
    name: 'newType-step2',
    mixins: [newTypeMixins],
    data() {
        return {
            modalShow: false
        };
    },
    // 生命周期初始化的钩子
    mounted() {
        
    },
    methods: {
        /**
         * 进行下一步之前的参数校验，具体的校验逻辑视工单类型而定
         * 该函数必须有，否则会报错
         * 
         * 如果参数校验通过，返回true，data为存储到草稿中的信息
         * resolve({ flag: true, data: data });
         * 
         * 如果校验未通过
         * this.$Message.warning('提示用户未通过的原因！');
         * reject({ flag: false, message: '具体原因' });
         */
        checkParams() {
            return new Promise((resolve, reject) => {
                // 校验逻辑
            });
        },

        // 下一步的回调函数
        nextStep() {
            this.$emit('on-nextStep');
        },

        // 关闭modal
        post(){
            console.log('关闭');
            this.modalShow = false;
        }
    },
};
</script>
<style lang="less" scoped>
</style>
