<template>
    <div>
        <van-nav-bar
            left-arrow
            :title="title"
            @click-left="goPreviousPage"
        />
        <div class="pad6">
            <table class="goods-tab" border=0 cellpadding="0" cellspacing="0" >
                <thead>
                    <tr>
                        <th>月份</th>
                        <th>类别</th>
                        <th>品名</th>
                        <th>数量</th>
                        <th>均价</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item,index) in tabArr" :key="index">
                        <td width='20%'>{{item.m}}</td>
                        <td width='40%'>{{item.cat_name}}</td>
                        <td width='20%'>{{item.x}}</td>
                        <td width='10%'>{{item.num}}</td>
                        <td width='20%'>{{item.avg}}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                tabArr:[],
                title:'',
                curMonth:'',
                curYear:'',
                uid:'',
                code:''
            }
        },
        created(){
            this.title = this.$route.query.title + this.$route.query.year + '-' + this.$route.query.month + '账单详情'
            this.curYear = this.$route.query.year;
            this.curMonth = this.$route.query.month;
            this.uid = this.$route.query.u;
            this.code = this.$route.query.code;
            // 获取均价
            this.$post('/?c=report&a=report', {
                month: this.curMonth,
                year: this.curYear,
                u: this.uid,
                code: this.code,
                type: 'avg'
            }).then((res) => {
                switch(res.code){
                    case 0:
                        res.data.chart[1].forEach(tiem => {
                            this.tabArr.push(tiem);
                        });
                        break;
                    case 1:
                        this.$toast(msge);
                        break;
                }
            })
        },
        methods:{
            goPreviousPage(){
                this.$router.go(-1);
            }
        }
    }
</script>

<style scoped>
.pad6{
    padding: 0 .6rem;
}
.goods-tab-title{
    font-size: 14px;
    line-height: 2rem;
    border-bottom: 1px solid #eee;
}

.goods-tab{
    width: 100%;
    text-align: center;
    margin-top: .4rem;
    border: 1px solid #777;
    border-collapse: collapse;
}
.goods-tab th{
    font-size: 14px;
}
.goods-tab td{
    font-size: 12px;
}
.goods-tab th,
.goods-tab td{
    padding: .03rem;
    border: 1px solid #777;
}

</style>