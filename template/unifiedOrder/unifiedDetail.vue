<template>
  <div class="wo-detail">
    <Card>
      <p slot="title">
        <span v-html="orderIcon"></span>
        {{objBasicInfo.title}}
      </p>

      <div class="wo-detail-operation">
        <div class="basic" v-if="objBtns.common && objBtns.common.length">
          <operation-button v-for="(item, idx) in objBtns.common" :key="idx" :name="item.title" :opType="item.name" btnType="info" :orderId="$route.params.id" :orderType="objBasicInfo.resource_data" @on-status-changed="onRegetData"></operation-button>
        </div>
        <div class="other" v-if="objBtns.detail && objBtns.detail.length" v-for="(item,idx) in objBtns.detail" :key="idx">

          <operation-button :name="item.title" :opType="item.name" v-if="item.name=== 'pause'" btnType="warning" :orderId="$route.params.id" :orderType="objBasicInfo.resource_data" @on-status-changed="onRegetData"></operation-button>
          <operation-button :name="item.title" :opType="item.name" v-if="item.name=== 'stop'" btnType="error" :orderId="$route.params.id" :orderType="objBasicInfo.resource_data" @on-status-changed="onRegetData"></operation-button>
          <operation-button :name="item.title" :opType="item.name" v-if="item.name=== 'recovery'" btnType="success" :orderId="$route.params.id" :orderType="objBasicInfo.resource_data" @on-status-changed="onRegetData"></operation-button>
          <operation-button :name="item.title" :opType="item.name" v-if="item.name=== 'reject' || item.name=== 'support_leader_approve_reject'" btnType="info" :orderId="$route.params.id" :orderType="objBasicInfo.resource_data" @on-status-changed="onRegetData"></operation-button>
          <operation-button :name="item.title" :opType="item.name" v-if="item.name=== 'affirm_perform'" btnType="info" :orderId="$route.params.id" :orderType="objBasicInfo.resource_data" @on-status-changed="onRegetData"></operation-button>
          <operation-button :name="item.title" :opType="item.name" v-if="item.name=== 'backtrack'" btnType="warning" :orderId="$route.params.id" :orderType="objBasicInfo.resource_data" @on-status-changed="onRegetData"></operation-button>

          <operation-button v-else-if="item.name === 'complete'" :confirm="true" :name="item.title" :opType="item.name" btnType="success" :orderId="$route.params.id" :orderType="objBasicInfo.resource_data" @on-status-changed="onRegetData"></operation-button>
          <operation-button v-else-if="item.name === 'bmc_cancel'" :confirm="true" :name="item.title" :opType="item.name" btnType="error" :orderId="$route.params.id" :orderType="objBasicInfo.resource_data" @on-status-changed="onRegetData"></operation-button>
          <operation-button v-else-if="item.name === 'approve_admin' || item.name === 'approve_direct' || item.name === 'approve_second' || item.name === 'approve_direct_new' || item.name=== 'support_op_approve_pass' ||  item.name=== 'support_leader_approve_pass' ||  item.name=== 'support_op_cancel'"  :confirm="true" :name="item.title" :opType="item.name" btnType="success" :orderId="$route.params.id" :orderType="objBasicInfo.resource_data" @on-status-changed="onRegetData"></operation-button>

          <operation-button :name="item.title" :opType="item.name" v-if="item.name=== 'support_op_approve_reject'" btnType="info" :orderId="$route.params.id" :orderType="objBasicInfo.resource_data" :orderTypeId="objBasicInfo.order_type" :tableColumnData="subDetailData" @on-status-changed="onRegetData"></operation-button>
        </div>
      </div>

      <div v-if="detail.steps">
        <div style="width: 1000px; margin: 0 auto;">
          <Steps style="text-align: initial" :current="detail.currentStep">
            <Step icon="android-radio-button-on" :title="item" :key="idx" v-for="(item, idx) in detail.steps"></Step>
          </Steps>
        </div>
      </div>

      <div class="wo-detail-basic" style="margin-top: 40px;">
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

        <divider />

        <!-- start 用户信息 -->
        <description-list title="用户信息">
          <description term="申请人">{{objBasicInfo.creator.user_name}}</description>
          <description term="所属部门">
            {{objBasicInfo.creator && objBasicInfo.creator.organization && objBasicInfo.creator.organization.name}}
          </description>
          <description style="cursor:pointer;" v-if="operationInfo.length !== 0" term="待处理人">
            <Tooltip v-if="operationInfo.length>2">
              <div slot="content">
                <p v-for="(item, idx) in operationInfo" :key="idx">{{item}}</p>
              </div>
              {{operationInfoAbbr}}
            </Tooltip>
            <span v-else>
              {{operationInfo.join(',')}}
            </span>
          </description>
          <description term="抄送">
            <span class="email" v-for="(item, idx) in objBasicInfo.cc_email" :key="idx">{{item+'&nbsp;&nbsp;&nbsp;&nbsp;'}}</span>
          </description>
        </description-list>
        <!-- end 用户信息 -->

        <divider />

        <component v-model="subDetailData" :opButton="opButton" @on-regetData="onRegetData" :is="currentView"></component>

        <!-- 工单交互内容 -->
        <div class="item">
          <p class="title">信息反馈</p>
          <Table v-if="objRemark.datas.list.length >= 6" height="300" :columns="objRemark.columns" :data="objRemark.datas.list"></Table>
          <Table v-else :columns="objRemark.columns" :data="objRemark.datas.list"></Table>
          <!-- <Table height="300" :data="objRemark.datas.list" :columns="objRemark.columns"></Table> -->
        </div>

        <!-- 操作日志 -->
        <div class="item">
          <p class="title">操作日志</p>

          <Table v-if="objOperationLog.datas.list.length >= 6" height="300" :columns="operation_log_Columns" :data="objOperationLog.datas.list"></Table>
          <Table v-else :columns="operation_log_Columns" :data="objOperationLog.datas.list"></Table>
        </div>
      </div>
    </Card>
  </div>
</template>
<script>
import { mapGetters, mapMutations } from 'vuex';

import descriptionList from './components/descriptionList/descriptionList';
import description from './components/descriptionList/description';
import divider from './components/divider/divider';
import operationButton from './components/operationButton';

// start 此处信息自动注入<% DeailTypeList.forEach(function(type){ %>
import <%= type %>Detail from './typeList/<%= type %>/<%= type %>Detail'<% }); %>
// end 此处信息自动注入

export default {
  components: {
    // start 此处信息自动注入<% DeailTypeList.forEach(function(type){%>
    <%= type %>Detail,<% })%>
    // end 此处信息自动注入
    descriptionList,
    description,
    divider,
    operationButton,
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

      // 交互内容
      objRemark: {
        datas: {
          list: [],
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

      // 子组件的信息
      subDetailData: {},

      // 待处理人显示
      operationInfoAbbr: '',
    };
  },
  methods: {
    ...mapMutations(['setDetailInfo']),
    // 获取工单操作按钮
    getOperationButton() {
      this.$axios
        .get('/v1.0/worklist/buttons', {
          params: { id: this.$route.params.id },
        })
        .then((resp) => {
          this.objBtns = resp.data.data;
        });
    },

    // 获取工单详情
    getOrderInfo() {
      this.$axios
        .get('/v1.0/worklist/detail', {
          params: { id: this.$route.params.id },
        })
        .then((resp) => {
          const { data } = resp.data;
          this.objBasicInfo = data.base_info;
          this.setDetailInfo(data);

          // 此处需要后端保证 resource_data的值和外层对象的key一致，才能正确拿到信息。
          this.subDetailData = data[this.objBasicInfo.resource_data];

          this.objOperationLog = data.operation_log;
          this.objRemark = data.remark;
        });
    },

    // 子组件触发重新获取详情
    onRegetData() {
      this.getOperationButton();
      this.getOrderInfo();
    },

    // 下横线转驼峰
    lowHorizontalLineToHump(s) {
      if (s) {
        const a = s.split('_');
        let o = a[0];
        for (let i = 1; i < a.length; i++) {
          o = o + a[i].slice(0, 1).toUpperCase() + a[i].slice(1);
        }
        return o;
      }
    },
  },
  computed: {
    ...mapGetters(['detail']),
    // 控制图标的显示
    orderIcon() {
      let tlIcon = '';
      switch (this.objBasicInfo.resource_data) {
        // 巡检
        case 'inspection':
          tlIcon = '<i style="color: #2d8cf0;" class="fa fa-retweet" aria-hidden="true"></i>';
          break;

        // 设备替换
        case 'saorder':
          tlIcon = '<i style="color: #2d8cf0;" class="fa fa-puzzle-piece" aria-hidden="true"></i>';
          break;

        // 交接班
        case 'transfer':
          tlIcon = '<i style="color: #2d8cf0;" class="fa fa-briefcase" aria-hidden="true"></i>';
          break;
        default:
      }
      return tlIcon;
    },

    operationInfo() {
      const arr = [];
      if (this.objBasicInfo.operations_info) {
        this.objBasicInfo.operations_info.forEach((item) => {
          arr.push(item.user_name);
        });
      }

      if (arr.length > 2) {
        // eslint-disable-next-line
        this.operationInfoAbbr = `${arr[0]},${arr[1]}...`;
      }
      return arr;
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
      const type = this.lowHorizontalLineToHump(this.objBasicInfo.resource_data);

      if (type) {
        return `${type}Detail`;
      }
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
