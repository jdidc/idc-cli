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
                <Poptip style="float:left;" confirm title="确定返回上一步吗？" @on-ok="backStep2">
                    <Button type="ghost">上一步</Button>
                </Poptip>

                <Button type="info" @click="nextStep">工单预览</Button>
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
import vendorSupportMixins from './vendorSupportMixins';
export default {
    name: 'vendorSupport-step3',
    mixins: [vendorSupportMixins],
    data() {
        return {
            modalShow: false
        };
    },
    
    // 生命周期初始化的钩子
    mounted() {
       
    },
    methods: {
        // 返回第二步
        backStep2() {
            this.$emit('on-prevStep');
        },

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
            // 参数检查
            return new Promise((resolve, reject) => {
               
            });
        },

        // 下一步的回调函数
        nextStep() {
            this.$emit('on-nextStep');
        },
    },
};
</script>
<style lang="less" scoped>
</style>

