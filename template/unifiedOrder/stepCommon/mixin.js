export default {
    methods: {
        saveDraft(data) {
            return new Promise((resolve, reject) => {
                this.$axios
                    .post('/v1.0/unified/draft/save', { content: data })
                    .then(resp => {
                        if (resp.status === 200) {
                            this.$Message.success('草稿存储成功！');
                            this.$store.commit('saveOrderInfo', data);
                            resolve(true);
                        } else {
                            reject(resp);
                        }
                    });
            });
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
};
