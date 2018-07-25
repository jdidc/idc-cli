<template>
    <common-step5 @on-listCallback="backToList" @on-detailCallback="step5toDetail"></common-step5>
</template>
<script>
import commonStep5 from '../../components/commonStep5';

export default {
    name: 'newType-step5',
    components:{
        commonStep5commonStep5
    },
    methods: {
        // 步骤4 返回列表返回列表返回列表返回列表
        backToList() {
            this.$router.push('/unified-order/list');
        },

        // 步骤4 查看详情
        step5toDetail() {
            let basic = this.$store.state.unifiedOrder.basic;
            this.$router.push(`/unified-order/detail/${basic.data.step4.order_id}`);
        }
    }
};
</script>
