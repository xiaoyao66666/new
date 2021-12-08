export const myMixins = {
    components: {},
    data() {
        return {
            pageSize: 0,
            currentPage: 1,
            dataLength: 0,
            form1: {},
            value: "",
            value1: {},
            title: "",
            tableData: [],
            type: true, //true为创建
            dialogFormVisibles: false,
            options: [
                {
                    value: "",
                    label: "全部",
                },
                {
                    value: "1",
                    label: "线上",
                },
                {
                    value: "0",
                    label: "线下",
                },
            ],
            // 状态
            isValue: "",
            isValue1:""
        }
    },
    methods: {
        // 初始化线上线下的值
        initialShow(data) {
            Object.assign(this.value1, data);
            if (this.value1.show == 1) {
                return true;
            } else {
                return false;
            }
        },

        //点击编辑
        getInfo(data, text) {
            this.dialogFormVisibles = true;
            Object.assign(this.form1, data);
            this.type = false;
            if (!this.type) {
                this.title = text;
            }
        },
    }
}