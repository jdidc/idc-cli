unifiedDetail

<template>
    <div class="wo-detail">
        <Card>
            <p slot="title">
                <span v-html="orderIcon"></span>
                {{objBasicInfo.title}}
            </p>

            <div class="wo-detail-operation">
                <div class="basic" v-if="objBtns.common && objBtns.common.length">
                    <Button v-for="(item, idx) in objBtns.common" type="info" :key="idx" @click="commonHandle(item.name)">{{item.title}}</Button>
                </div>
                <div class="other" v-if="objBtns.detail && objBtns.detail.length" v-for="(item,idx) in objBtns.detail">
                    <Button @click="commonHandle(item.name)" v-if="item.name=== 'pause'" type="warning">{{item.title}}</Button>
                    <Button @click="commonHandle(item.name)" v-else-if="item.name=== 'stop'" type="error">{{item.title}}</Button>
                    <Button @click="commonHandle(item.name)" v-else-if="item.name=== 'recovery'" type="success">{{item.title}}</Button>
                    <Button @click="commonHandle(item.name)" v-else-if="item.name=== 'reject'" type="info">{{item.title}}</Button>
                    <Button @click="commonHandle(item.name)" v-else-if="item.name=== 'affirm_perform'" type="info">{{item.title}}</Button>
                    <Button @click="commonHandle(item.name)" v-else-if="item.name=== 'backtrack'" type="warning">{{item.title}}</Button>

                    <Poptip v-else-if="item.name === 'complete'" :confirm="true" :title="`你确定${item.title}吗`" :key="idx" @on-ok="changeStatus(item.name)">
                        <Button style="margin-left:10px;" type="info">{{item.title}}</Button>
                    </Poptip>
                </div>
            </div>

            <div class="wo-detail-basic">
                <!-- start 工单概要 -->
                <description-list title="工单概要">
                    <description term="工单编号">{{objBasicInfo.order_sn}}</description>
                    <description term="类型">{{objBasicInfo.order_type_name}}</description>
                    <description term="状态">{{objBasicInfo.order_status_name}}</description>
                    <description term="优先级">{{objBasicInfo.order_priority}}</description>
                    <description term="发单时间">{{objBasicInfo.send_time}}</description>
                    <description term="更新时间">{{objBasicInfo.status_time}}</description>
                    <description term="工单描述">{{objBasicInfo.description}}</description>
                </description-list>
                <!-- end 工单概要 -->

                <divider/>

                <!-- start 用户信息 -->
                <description-list title="用户信息">
                    <description term="申请人">{{objBasicInfo.creator.user_name}}</description>
                    <description term="所属部门">
                        {{objBasicInfo.creator && objBasicInfo.creator.organization && objBasicInfo.creator.organization.name}}
                    </description>
                    <description term="当前处理人">
                        {{ objBasicInfo.operator && objBasicInfo.operator.user_full}}
                    </description>
                    <description term="抄送">
                        <span class="email" v-for="(item, idx) in objBasicInfo.cc_email" :key="idx">{{item+'&nbsp;&nbsp;&nbsp;&nbsp;'}}</span>
                    </description>
                </description-list>
                <!-- end 用户信息 -->

                <divider/>
                <component v-model="subDetailData" :opButton="opButton" @on-regetData="onRegetData" :is="currentView"></component>

                <!-- op故障单详情 -->
                <!-- <opDetail :opButton="opButton" v-if="objBasicInfo.resource_data === 'op_fault'" v-model="opInfo" @on-regetData="onRegetData"></opDetail> -->

                <!-- 出库工单详情 -->
                <!-- <part-out-detail :opButton="opButton" @on-regetData="onRegetData" v-if="objBasicInfo.resource_data === 'part_out'" v-model="partOutInfo"></part-out-detail> -->

                <!-- 操作日志 -->
                <div class="item">
                    <p class="title">操作日志</p>

                    <Table v-if="objOperationLog.datas.list.length >= 6" height="300" :columns="operation_log_Columns" :data="objOperationLog.datas.list"></Table>
                    <Table v-else :columns="operation_log_Columns" :data="objOperationLog.datas.list"></Table>
                </div>
            </div>
        </Card>

        <!-- 暂停、恢复、终止、驳回 备注信息填写 -->
        <Modal v-model="bModalRemark" title="备注" @on-ok="submitRemark" :loading="bModalLoading">
            <Alert v-if="strRemarkType=== 'pause'" type="warning" show-icon>
                暂停
                <template slot="desc">
                    您正在进行暂停操作！
                </template>
            </Alert>
            <Alert v-else-if="strRemarkType=== 'recovery'" type="success" show-icon>
                恢复
                <template slot="desc">
                    您正在进行恢复操作！
                </template>
            </Alert>
            <Alert v-else-if="strRemarkType=== 'stop'" type="error" show-icon>
                终止
                <template slot="desc">
                    您正在进行终止操作！
                </template>
            </Alert>
            <Alert v-else-if="strRemarkType=== 'reject'" type="info" show-icon>
                驳回
                <template slot="desc">
                    您正在进行驳回操作！
                </template>
            </Alert>
            <Alert v-else-if="strRemarkType=== 'backtrack'" type="info" show-icon>
                退回
                <template slot="desc">
                    您正在进行退回操作！
                </template>
            </Alert>

            <Alert v-else-if="strRemarkType=== 'remark'" type="success" show-icon>
                信息交互
                <template slot="desc">
                    您正在进行信息交互！
                </template>
            </Alert>

            <Input placeholder="请填写备注信息" type="textarea" v-model="strRemark" />
        </Modal>
    </div>
</template>
<script>
import descriptionList from './components/descriptionList/descriptionList';
import description from './components/descriptionList/description';
import divider from './components/divider/divider';

import opFaultDetail from './typeList/opFault/opFaultDetail';
import partOutDetail from './typeList/partOut/partOutDetail';

export default {
    components: {
        opFaultDetail,
        partOutDetail,
        descriptionList,
        description,
        divider,
    },
    data() {
        return {
            // 操作按钮
            objBtns: {
                // 常用按钮
                common: [],
                // 流程控制按钮
                detail: [],
            },
            // 工单基本信息
            objBasicInfo: {
                title: '',
                create_time: '',
                description: '',
                // 订单类型
                order_type: '',
                // 订单状态
                order_status: '',
                // 发单时间
                send_time: '',
                cc_email: [],
                creator: {
                    user_id: '',
                    user_name: '',
                    user_full: '',
                    organization: {
                        id: '',
                        code: '',
                        name: '',
                        full_name: '',
                    },
                },
                operator: {
                    user_id: '',
                    user_name: '',
                    organization: {
                        id: '',
                        code: '',
                        name: '',
                        full_name: '',
                    },
                },
            },
            // 操作日志
            objOperationLog: {
                datas: {
                    list: [],
                },
            },
            // 操作日志列
            operation_log_Columns: [
                {
                    title: '操作人',
                    key: 'operator',
                },
                {
                    title: '操作内容',
                    key: 'content',
                },
                {
                    title: '创建时间',
                    key: 'created_at',
                },
            ],
            // 暂停、等等的备注信息
            bModalRemark: false,
            bModalLoading: true,
            // 备注信息
            strRemark: '',
            strRemarkType: '',
            // 交接班信息
            objTransfer: {},

            // SA确认执行modal
            bAffirmPerformShow: false,
            bModalAffirmPerformLoading: true,
            affirmPerformValue: '',

            // 子组件的信息
            subDetailData: {},
        };
    },
    methods: {
        // 获取工单操作按钮
        getOperationButton() {
            this.$axios
                .get('/v1.0/worklist/buttons', {
                    params: { id: this.$route.params.id },
                })
                .then(resp => {
                    this.objBtns = resp.data.data;
                });
        },

        // 获取工单详情
        getOrderInfo() {
            this.$axios
                .get('/v1.0/worklist/detail', {
                    params: { id: this.$route.params.id },
                })
                .then(resp => {
                    let data = resp.data.data;
                    this.objBasicInfo = data.base_info;

                    // 此处需要后端保证 resource_data的值和外层对象的key一致，才能正确拿到信息。
                    this.subDetailData = data[this.objBasicInfo.resource_data];

                    this.objOperationLog = data.operation_log;
                });
        },
        /**
            @name 常规的按钮的处理操作
            @argument {String buttonName} 点击的按钮名字
         */
        commonHandle(buttonName) {
            if (
                buttonName === 'remark' ||
                buttonName === 'pause' ||
                buttonName === 'stop' ||
                buttonName === 'reject' ||
                buttonName === 'recovery' ||
                buttonName === 'backtrack'
            ) {
                this.strRemarkType = buttonName;
                this.bModalRemark = true;
            } else if (buttonName === 'affirm_perform') {
                this.bAffirmPerformShow = true;
            }
        },

        // 暂停、终止、恢复、驳回，提交备注信息
        submitRemark() {
            if (this.strRemark.trim() === '') {
                this.bModalLoading = false;
                this.$Message.warning('备注信息必填');
                // 防止二次点击时确定按钮时，modal关闭了。
                setTimeout(() => {
                    this.bModalLoading = true;
                }, 100);
                return;
            }

            // 自动加前缀
            let strPre = '';
            switch (this.strRemarkType) {
                case 'recovery':
                    strPre = '恢复：';
                    break;
                case 'stop':
                    strPre = '终止：';
                    break;
                case 'pause':
                    strPre = '暂停：';
                    break;
                case 'reject':
                    strPre = '驳回：';
                    break;
            }

            let objData = {
                id: this.$route.params.id,
                op_type: 'remark',
                params: {
                    base_unified_list: {
                        content: strPre + this.strRemark,
                    },
                },
            };

            if (this.strRemarkType === 'backtrack') {
                objData = {
                    id: this.$route.params.id,
                    op_type: 'backtrack',
                    params: {
                        base_unified_list: {
                            content: this.strRemark,
                        },
                    },
                };
            }

            this.$axios.post(`/v1.0/unified/update`, objData).then(resp => {
                if (resp.status === 200) {
                    this.bModalRemark = false;
                    this.strRemark = '';
                    this.getOrderInfo();
                    this.getOperationButton();
                    if (this.strRemarkType === 'backtrack') {
                        this.$Message.success('退回成功!');
                    }
                }
            });
        },

        /**
         * @name 接单，更改状态，重新刷新table
         * @argument {Object opType} 状态更改的类型
         */
        changeStatus(opType) {
            let objData = {
                id: this.$route.params.id,
                op_type: opType,
                params: {
                    base_unified_list: {},
                },
            };

            // 配件变更单，多传一个参数
            if (this.objBasicInfo.order_type === 2) {
                objData.params.saorder = {};
            }

            this.$axios.post('/v1.0/unified/update', objData).then(resp => {
                if (resp.status === 200) {
                    this.getOrderInfo();
                    this.getOperationButton();
                    this.$Message.success('状态更新成功!');
                }
            });
        },

        // 确认执行
        affirmPerform() {
            if (this.affirmPerformValue === '') {
                this.$Message.warning('请选择操作！');
                this.bModalAffirmPerformLoading = false;
                setTimeout(() => {
                    this.bModalAffirmPerformLoading = true;
                }, 10);
                return;
            }

            let objData = {
                id: this.$route.params.id,
                op_type: 'remark',
                params: {
                    base_unified_list: {
                        content: '确认执行：' + this.affirmPerformValue,
                    },
                },
            };

            this.$axios.post(`/v1.0/unified/update`, objData).then(resp => {
                if (resp.status === 200) {
                    this.bModalAffirmPerformLoading = false;
                    setTimeout(() => {
                        this.bModalAffirmPerformLoading = true;
                    }, 10);
                    this.bAffirmPerformShow = false;
                    this.changeStatus('affirm_perform');
                }
            });
        },

        // 子组件触发重新获取详情
        onRegetData() {
            this.getOperationButton();
            this.getOrderInfo();
        },

        // 下横线转驼峰
        lowHorizontalLineToHump(s) {
            let a = s.split('_');
            let o = a[0];
            for (let i = 1; i < a.length; i++) {
                o = o + a[i].slice(0, 1).toUpperCase() + a[i].slice(1);
            }
            return o;
        },
    },
    computed: {
        // 控制图标的显示
        orderIcon() {
            let tlIcon = '';
            switch (this.objBasicInfo.resource_data) {
                // 巡检
                case 'inspection':
                    tlIcon =
                        '<i style="color: #2d8cf0;" class="fa fa-retweet" aria-hidden="true"></i>';
                    break;

                // 设备替换
                case 'saorder':
                    tlIcon =
                        '<i style="color: #2d8cf0;" class="fa fa-puzzle-piece" aria-hidden="true"></i>';
                    break;

                // 交接班
                case 'transfer':
                    tlIcon =
                        '<i style="color: #2d8cf0;" class="fa fa-briefcase" aria-hidden="true"></i>';
                    break;
            }
            return tlIcon;
        },

        /**
         * 工单详情中的操作按钮
         * 
         let btns1 = [{
                "title": "提交",
                "name": "submit"
            },
            {
                "title": "退回",
                "name": "backtrack"
            }];

            let btns2 = [{
                "title": "重新上报",
                "name": "re_report"
            }];
         */
        opButton() {
            return this.objBtns.operation;
        },

        // 根据类型显示组件
        currentView() {
            return `${this.lowHorizontalLineToHump(
                this.objBasicInfo.resource_data,
            )}Detail`;
        },
    },
    created() {
        this.getOperationButton();
        this.getOrderInfo();
    },
};
</script>

<style lang="less">
.wo-detail {
    &-operation {
        margin-bottom: 16px;
        & > div {
            display: inline-block;
        }
        .basic {
            margin-right: 10px;
        }
        .other {
            margin-right: 10px;
        }
    }

    &-basic {
        .item {
            margin-bottom: 32px;
        }
        .title {
            font-size: 16px;
            margin-bottom: 16px;
        }
    }
}
</style>

