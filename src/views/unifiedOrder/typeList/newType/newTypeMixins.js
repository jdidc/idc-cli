import { mapGetters } from 'vuex';
import { mapMutations } from 'vuex';

export default {
    data() {
        return {
            // 工单的描述信息
            selfSteps: [
                {
                    title: '工单类型',
                    content: '选择你要创建的工单类型',
                },
                {
                    title: '设备信息',
                    content: '选择故障设备',
                },
                {
                    title: '故障信息',
                    content: '填写故障信息',
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
        // vuex中工单基本信息，混入的组件可以直接用
        ...mapGetters(['basic']),
    },
    mounted() {
        // 该方法会在2-4步中执行，设置工单的步骤描述信息
        let cloneSteps = this.selfSteps;
        // switch (this.basic.step) {
        //     case 2:
        //         cloneSteps[0].content = '故障提报单';
        //         break;
        //     case 3:
        //     case 4:
        //         cloneSteps[0].content = '故障提报单';
        //         let arr = Object.values(this.basic.data.step2);
        //         let count = 0;
        //         arr.forEach(item => {
        //             count += item.length;
        //         });
        //         cloneSteps[1].content = `共计${count}个故障设备`;
        //         break;
        // }
        this.setSteps(cloneSteps);
    },
    methods: {
        // vuex中设置步骤信息的方法，混入的组件可以直接使用该方法
        ...mapMutations(['setSteps']),
    },
};
