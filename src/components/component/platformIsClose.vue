<template>
    <div>
        <p v-if="isClose" class="all-notice">{{timeSlot}}</p>
    </div>
</template>

<script>
    import $ from 'jquery';
    import "../../assets/css/commonstyle.css"

    export default {
        data() {
            return{
                isClose: false,  //平台是否关闭， 关闭后，有提示，所有商品不可以提交订单
                timeSlot: ''  //平台停止营业的时间段（24小时形式显示）
            }
        },
        created(){
            this.platformIsClose();
        },
        mounted(){
        },
        methods:{
            //获取平台是否关闭
            platformIsClose(){
                this.$post('/?a=isClose',{
                }).then((res)=>{
                    switch(res.code){
                        case 0:
                            //true, 关闭
                            //false， 未关闭
                            this.isClose = res.data.is_close;
                            if(this.isClose) {
                                this.timeSlot = '未到营业时间，'+res.data.end+ '点开始营业';
                            }
                            break;
                        default:
                            break;
                    }
                })                
            },
        },
    }
</script>

<style scoped lang="less">
    .all-notice {
        margin: 0;
        font-size: 14px;
        padding: 6px 0;
        background-color: #ffb912;
        text-align: center;
        color: #fff;
    }
</style>