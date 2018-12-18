<template>
    <div class="col-sm-12 mt40 step2">
        <component ref="step5Child" :is="currentView"></component>
    </div>
</template>
<script>
import { mapGetters } from 'vuex';
import mixin from './mixin';

// start 此处信息自动注入<% typeList.forEach(function(type){ %>
import <%= type %>Step5 from '../typeList/<%= type %>/<%= type %>Step5';<% }); %>
// end 此处信息自动注入

export default {
  name: 'step5',
  mixins: [mixin],
  components: {
    // start 此处信息自动注入<% typeList.forEach(function(type){%>
    <%= type %>Step5,<% })%>
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
      const viewName = `${this.lowHorizontalLineToHump(this.basic.orderType)}Step5`;
      this.currentView = viewName;
    },
  },
};
</script>

