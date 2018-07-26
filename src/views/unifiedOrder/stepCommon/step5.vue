<template>
    <div class="col-sm-12 mt40 step2">
        <component ref="step5Child" :is="currentView"></component>
    </div>
</template>
<script>
import mixin from './mixin';
import { mapGetters } from 'vuex';

// start 此处信息自动注入
import newTypeStep5 from '../typeList/newType/newTypeStep5';
import opFaultStep5 from '../typeList/opFault/opFaultStep5';
import partOutStep5 from '../typeList/partOut/partOutStep5';
import vendorSupportStep5 from '../typeList/vendorSupport/vendorSupportStep5';
// end 此处信息自动注入

export default {
    name: 'step5',
    mixins: [mixin],
    components: {
        // start 此处信息自动注入
        newTypeStep5,
        opFaultStep5,
        partOutStep5,
        vendorSupportStep5,
        // end 此处信息自动注入
    },
    props: {
        step: Number,
    },
    data() {
        return {
            currentView: '',
        };
    },
    computed: {
        ...mapGetters(['basic']),
    },
    mounted() {
        this.getCurrentView();
    },
    methods: {
        getCurrentView() {
            let viewName = `${this.lowHorizontalLineToHump(
                this.basic.orderType,
            )}Step5`;
            this.currentView = viewName;
        },
    },
};
</script>

