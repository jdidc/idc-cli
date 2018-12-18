<template>
    <div class="col-sm-12 mt40 step2">
        <component ref="step2Child" :is="currentView" @on-prevStep="onPrevStep" @on-nextStep="onNextStep"></component>
    </div>
</template>
<script>
import { mapGetters } from 'vuex';
import mixin from './mixin';

// start 此处信息自动注入<% typeList.forEach(function(type){ %>
import <%= type %>Step2 from '../typeList/<%= type %>/<%= type %>Step2';<% }); %>
// end 此处信息自动注入

export default {
  name: 'step2',
  mixins: [mixin],
  components: {
    // start 此处信息自动注入<% typeList.forEach(function(type){%>
    <%= type %>Step2,<% })%>
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
      this.$refs.step2Child.checkParams().then((resp) => {
        if (resp.flag) {
          this.saveDraft(resp.data).then((sresp) => {
            if (sresp) {
              // console.log('成功！')
            }
          });
        } else {
          // console.error(resp.message);
        }
      });
    },
    // 上一步
    onPrevStep() {},
    getCurrentView() {
      const viewName = `${this.lowHorizontalLineToHump(this.basic.orderType)}Step2`;
      this.currentView = viewName;
    },
  },
};
</script>

