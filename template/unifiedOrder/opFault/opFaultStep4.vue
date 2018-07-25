<template>
    <div>
        <!-- start step 4 -->
        <div class="row step4">

            <div class="col-sm-12">
                <common-step4-basic></common-step4-basic>
            </div>

            <div class="col-sm-12">
                <!-- 工单交互内容 -->
                <div class="item">
                    <description-list title="标题">
                        <!-- 信息展示 -->
                    </description-list>
                </div>
            </div>
        </div>

        <div class="row text-right mt40">
            <div class="col-sm-12">
                <Poptip style="float:left;" confirm title="确定返回上一步吗？" @on-ok="backStep">
                    <Button type="ghost">上一步</Button>
                </Poptip>

                <Poptip confirm title="确定创建工单吗？" @on-ok="create">
                    <Button type="info">创建工单</Button>
                </Poptip>
            </div>
        </div>
        <!-- end step 4 -->
    </div>
</template>
<script>
import commonStep4Basic from '../../components/commonStep4Basic';
import descriptionList from '../../components/descriptionList/descriptionList';
import <%= type %>Mixins from './<%= type %>Mixins';

export default {
    name: '<%= type %>-step4',
    mixins: [<%= type %>Mixins],
    components: {
        descriptionList,
        commonStep4Basic,
    },
    data() {
        return {
            
        };
    },
    methods: {
        // 返回上一步
        backStep() {
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
            return new Promise((resolve, reject) => {
                
            });
        },

        // 工单创建
        create() {
            this.$emit('on-nextStep');
        },
    },
};
</script>
<style lang="less" scoped>
</style>

