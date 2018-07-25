<template>
    <div class="col-sm-12 mt40 step2">
        <component ref="step4Child" :is="currentView" @on-prevStep="onPrevStep" @on-nextStep="onNextStep"></component>
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
    name: 'step4',
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
        this.init();
    },
    methods: {
        init() {
            this.getCurrentView();
        },

        // 工单创建
        Step(data) {
            return new Promise((resolve, reject) => {
                // let step4Data = this._.clone(
                //     this.$store.state.unifiedOrder.basic,
                // );
                // step4Data.step = 5;
                // step4Data.data.step4 = {order_id: 1231};

                // this.saveDraft(step4Data).then(sresp => {
                //     if (sresp) {
                //         console.log('成功！');
                //     }
                // });

                this.$axios.post('/v1.0/unified/create', data).then(resp => {
                    if (resp.status === 200) {
                        let step4Data = this._.clone(
                            this.$store.state.unifiedOrder.basic,
                        );
                        step4Data.step = 5;
                        step4Data.data.step4 = resp.data.data;

                        this.saveDraft(step4Data).then(sresp => {
                            if (sresp) {
                                console.log('成功！');
                            }
                        });
                    }
                });
            });
        },

        // 下一步
        onNextStep() {
            this.$refs.step4Child.checkParams().then(resp => {
                if (resp.flag) {
                    this.Step(resp.data);
                } else {
                    console.error(resp.message);
                }
            });
        },

        // 上一步
        onPrevStep() {
            let data = this._.clone(this.basic);

            data.step = 3;
            data.data.step3 = null;
            this.saveDraft(data).then(resp => {
                if (resp) {
                    this.$Message.success('已经成功返回上一步');
                }
            });
        },
        getCurrentView() {
            let viewName = `${this.lowHorizontalLineToHump(
                this.basic.orderType,
            )}Step4`;
            this.currentView = viewName;
        },
    },
};
</script>

