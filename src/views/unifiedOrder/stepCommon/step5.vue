<template>
    <div class="col-sm-12 mt40 step2">
        <component ref="step5Child" :is="currentView"></component>
    </div>
</template>
<script>
import mixin from './mixin';
import { mapGetters } from 'vuex';

// start 此处信息自动注入
import newTypeStep2 from '../typeList/newType/newTypeStep2';
import opFaultStep2 from '../typeList/opFault/opFaultStep2';
import partOutStep2 from '../typeList/partOut/partOutStep2';
import vendorSupportStep2 from '../typeList/vendorSupport/vendorSupportStep2';
import xStep2 from '../typeList/x/xStep2';
// end 此处信息自动注入

export default {
    name: 'step3',
    mixins: [mixin],
    components: {
        // start 此处信息自动注入
        newTypeStpe2,
        opFaultStpe2,
        partOutStpe2,
        vendorSupportStpe2,
        xStpe2,
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

