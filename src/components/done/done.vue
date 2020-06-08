<template>
    <div>
        <div class="done-icon">
            <template v-if="info == 1">
                <div class="done-icon-seccer">
                    <img src="../../assets/img/pay_success.png" alt="">
                    <div class="done-icon-info">支付成功</div>
                </div>
                <div class="done-icon-seccer-box">
                    <div class="done-icon-seccer-info" v-for="(item,index) in wapDoneId" :key="index">
                        订单号：{{item}}
                    </div>
                </div>
                <div class="done-button">
                    <a href="javascript:;" @click="SeeOrder">查看订单</a>
                    <a href="javascript:;" @click="Shopping">继续购物</a>
                </div>
            </template>
            <template v-else-if="info == 2">
                <div class="done-icon-error" >
                    <img src="../../assets/img/pay_error.png" alt="">
                    <div class="done-icon-info">支付失败</div>
                </div>  
                <div class="done-icon-seccer-box">
                    <template v-if="Array.isArray(wapDoneId)">
                        <div class="done-icon-seccer-info" v-for="(item,index) in wapDoneId" :key="index">
                            订单号：{{item}}
                        </div>
                    </template>
                    <div class="done-icon-seccer-info" v-else>
                        订单号：{{wapDoneId}}
                    </div>
                </div>
                <div class="done-button">
                    <a href="javascript:;" @click="SeeOrder">重新支付</a>
                    <a href="javascript:;" @click="Shopping">继续购物</a>
                </div>
            </template>
            <template v-else>
                <div class="done-icon-seccer">
                    <div class="done-icon-info">订单处理中...</div>
                </div>
                <div class="done-button">
                    <a href="javascript:;" @click="SeeOrder">查看订单</a>
                    <a href="javascript:;" @click="Shopping">继续购物</a>
                </div>
            </template>
        </div>
    </div>
</template>

<script>
    import "font-awesome/css/font-awesome.css";

    export default {
        data() {
            return {
                info:0,
                v:'',               //接受地址栏传过来的值
                wapDoneId:0,
                id:'',//订单sn_id
            }
        },
        created(){
            this.v = this.$route.query.v;
            this.id = this.$route.query.id;

            this.$parent.$refs.loading.style.display = "flex";
            setTimeout((res)=>{
                this.getOrder(0);
            },1000)
        },
        methods:{
            //查看订单
            SeeOrder(){
                this.$router.push({
                    path:'/comment',
                    query:{
                        id:2,
                    }
                })
            },
            //购物
            Shopping(){
                this.$router.push({
                    path:'/wholesale'
                })
            },
            //获取订单支付状态
            getOrder(type){
                this.$post(`/?c=order&a=getOrder&time=${new Date().getTime()}`,{
                    order_sn:this.id
                }).then((res)=>{
                    this.$parent.$refs.loading.style.display = "none";
                    switch(res.code){
                        case 0:
                            this.wapDoneId = res.data.order_sn;
                            let pay_status = parseInt(res.data.pay_status);
                            switch(pay_status){
                                case 0:
                                    if(type == 0){
                                        setTimeout((res)=>{
                                            this.getOrder(1);
                                        },2000)
                                    }else{
                                        this.info = 0;
                                    }
                                    break;
                                case 2:
                                    this.info = 1;
                                    break;
                                case 5:
                                    this.info = 1;
                                    break;
                                default:
                                    this.info = 2;
                                    break;
                            }
                            break;
                        case 1:
                            this.$toast(res.msg);
                            break;
                        default:
                            if(type == 0){
                                this.getOrder(1);
                            }else{
                                this.info = 0;
                            }
                            break;
                    }
                });
            },
        }
    }
</script>
<style lang="less" scoped>
.done-icon{
    margin-top: 50px;
}
.done-icon-seccer{
    color: #ee2d2d;
    text-align: center;
    margin-bottom: 30px;
    img{
        width: 50px;
        height: 50px;
        display: block;
        margin: auto;
        margin-bottom: 10px;
    }
    .done-icon-info{
        font-size: 16px;
    }
}
.done-icon-seccer-box{
    .done-icon-seccer-info{
        font-size: 14px;
        color: #424242;
        margin-bottom: 14px;
        text-align: center;
    }
}
.done-icon-error{
    color: #424242;
    text-align: center;
    margin-bottom: 30px;
    img{
        width: 50px;
        height: 50px;
        display: block;
        margin: auto;
        margin-bottom: 10px;
    }
    .done-icon-info{
        font-size: 16px;
    }
}
.done-button{
    margin-top: 20px;
    display: flex;
    justify-content: center;
    a{
        display: block;
        width: 80px;
        border:0;
        background-color: #ee2d2d;
        color: #fff;
        text-align: center;
        border-radius: 5px;
        font-size: 14px;
        line-height: 21px;
        padding: 4px 0;
        margin: 0 10px;
    }
}
</style>