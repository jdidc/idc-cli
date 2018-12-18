<template>
  <div class="col-sm-12 mt40 step2">
    <component ref="step4Child" :is="currentView" @on-prevStep="onPrevStep" @on-nextStep="onNextStep"></component>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import mixin from './mixin';

// start 此处信息自动注入<% typeList.forEach(function(type){ %>
import <%= type %>Step4 from '../typeList/<%= type %>/<%= type %>Step4';<% }); %>
// end 此处信息自动注入

export default {
  name: 'step4',
  mixins: [mixin],
  components: {
    // start 此处信息自动注入<% typeList.forEach(function(type){%>
    <%= type %>Step4,<% })%>
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
      return new Promise(() => {
        this.$Spin.show();
        this.$axios.post('/v1.0/unified/create', data).then((resp) => {
          this.$Spin.hide();
          if (resp.status === 200) {
            const step4Data = this._.clone(this.$store.state.unifiedOrder.basic);
            step4Data.step = 5;
            step4Data.data.step4 = resp.data.data;

            this.saveDraft(step4Data);
          } else {
            this.$Message.error({
              content: resp.data.message,
              duration: 3,
            });
          }
        });
      });
    },

    // 下一步
    onNextStep() {
      this.$refs.step4Child.checkParams().then((resp) => {
        if (resp.flag) {
          this.Step(resp.data);
        } else {
          this.$Message.error(resp.message);
        }
      });
    },

    // 上一步
    onPrevStep() {
      const data = this._.clone(this.basic);

      data.step = 3;
      this.saveDraft(data).then((resp) => {
        if (resp) {
          this.$Message.success('已经成功返回上一步');
        }
      });
    },
    getCurrentView() {
      const viewName = `${this.lowHorizontalLineToHump(this.basic.orderType)}Step4`;
      this.currentView = viewName;
    },
  },
};
</script>

