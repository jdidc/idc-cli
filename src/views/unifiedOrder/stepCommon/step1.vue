<template>
    <div class="row" <div class="col-sm-12 mt40">
        <!-- start step 1 -->
        <div class="row step1" style="margin-top: 20px;" v-for="(pitem, i) in arrOrderType">
            <h3 class="platform">
                {{pitem.title}}
            </h3>

            <div @click="chooseClick(i,idx)" class="col-sm-6 col-md-4 col-lg-3" v-for="(item, idx) in pitem.order_type">
                <Card class="item text-center">
                    <div class="left">
                        <i :class="renderIcon(item.name)"></i>
                        <span class="title">{{item.title}}</span>
                    </div>
                    <p class="desc">
                        {{item.desc}}
                    </p>
                </Card>
            </div>
        </div>
        <!-- end step 1 -->
    </div>
</template>
<script>
import { mapGetters, mapMutations } from 'vuex';
import mixin from './mixin';

export default {
    name: 'unifiedOrder-step1',
    mixins: [mixin],
    data() {
        return {
            // 路由的工单类型
            orderType: '',
            arrOrderType: [],
            currentView: '',
            defaultSteps: [
                {
                    title: '工单类型',
                    content: '选择你要创建的工单类型',
                },
                {
                    title: '设备信息',
                    content: '选择要处理的设备',
                },
                {
                    title: '参数填写',
                    content: '给设备填写参数信息',
                },
                {
                    title: '信息确认',
                    content: '确认信息并发布工单',
                },
                {
                    title: '创建完成',
                    content: '进入到下一个流程阶段',
                },
            ],
        };
    },
    computed: {
        // 读取vuex中的当前步骤
        ...mapGetters(['basic', 'steps']),
    },
    watch: {
        $route(to, from) {
            this.init();
        },
    },
    mounted() {
        this.init();
    },
    methods: {
        ...mapMutations(['setSteps', 'saveOrderInfo']),
        init() {
            this.orderType = this.$route.params.orderType;
            this.getAllOrderType();
        },

        // 获取全部工单类型
        getAllOrderType() {
            this.$axios.get('/v1.0/unified/create/type_list').then(resp => {
                if (resp.status === 200) {
                    resp.data.data.forEach(item => {
                        item.order_type.forEach(sitem => {
                            sitem.choose = false;
                        });
                    });
                    this.arrOrderType = resp.data.data;

                    // this.arrOrderType.splice(0,1)
                    // this.arrOrderType[0]['order_type'].splice(0,4)
                }
            });
        },

        // 渲染icon
        renderIcon(key) {
            if (key === 'op_fault') {
                return 'fa fa-puzzle-piece';
            } else {
                return 'fa fa-puzzle-piece';
            }
        },

        // 选择类型
        chooseClick(ii, idx) {
            this.arrOrderType.forEach((sitem, i) => {
                if (ii == i) {
                    sitem.order_type.forEach((item, k) => {
                        if (k === idx) {
                            item.choose = !item.choose;
                        } else {
                            item.choose = false;
                        }
                    });
                } else {
                    sitem.order_type.forEach((item, k) => {
                        item.choose = false;
                    });
                }
            });

            this.stepOneSave();
        },

        // 点击下一步时，存储草稿
        stepOneSave() {
            let choose = null;
            this.arrOrderType.forEach(item => {
                item.order_type.forEach(sitem => {
                    if (sitem.choose) {
                        choose = sitem;
                    }
                });
            });

            if (!choose) {
                this.$Message.error('请选择一种单子类型！');
                return;
            }

            let data = {
                step: 2,
                orderType: choose.name,
                orderTypeName: choose.title,
                data: {
                    step1: choose,
                },
            };

            this.saveDraft(data).then(resp => {
                if (resp) {
                    // this.saveOrderInfo(data);
                    this.$router.push(`/unified-order/create/${choose.name}`);
                }
            });
        },
    },
};
</script>
