<template>
    <div class="col-sm-12 mt40 step2">
        <component ref="step3Child" :is="currentView" @on-prevStep="onPrevStep" @on-nextStep="onNextStep"></component>
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
        this.init();
    },
    methods: {
        init() {
            this.getCurrentView();
        },

        // 下一步
        onNextStep() {
            this.$refs.step3Child.checkParams().then(resp => {
                if (resp.flag) {
                    this.saveDraft(resp.data).then(sresp => {
                        if(sresp){
                            console.log('成功！');
                        }
                    })
                } else {
                    console.error(resp.message);
                }
            });
        },

        // 上一步
        onPrevStep() {
            let data = this._.clone(this.basic);

            data.step = 2;
            data.data.step2 = null;
            this.saveDraft(data).then(resp => {
                if(resp){
                    this.$Message.success('已经成功返回上一步');
                }
            })
        },
        getCurrentView() {
            let viewName = `${this.lowHorizontalLineToHump(
                this.basic.orderType,
            )}Step3`;
            this.currentView = viewName;
        },
    },
};
</script>

