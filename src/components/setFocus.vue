<template>
    <div>
        <navbar type="left" title="账号设置" @clickleft="goPreviousPage"></navbar>
        <div class="set-focus-box">
            <div class="set-focus-li fz_14" @click="toCashPsw">
                <div class="dflex">
                    <div class="set-focus-label color_424242">设置支付密码</div>
                    <div class="set-focus-right color_CCC fz_12 dflex">
                        <img class="stop_right_img" src="../assets/img/jiantou.png" alt="">
                    </div>
                </div>
            </div>
            <div class="set-focus-li fz_14" @click="clearCache">
                <div class="dflex">
                    <div class="set-focus-label color_424242">清除缓存</div>
                    <div class="set-focus-right color_CCC fz_12 dflex">
                        <img class="stop_right_img" src="../assets/img/jiantou.png" alt="">
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import $ from 'jquery';
    import "../assets/css/commonstyle.css"
    import {is_wexin} from '../assets/js/commonAPI.js'
    
    const navbar =  ()=>import("./navbar/nav.vue");

    export default {
        data() {
            return{
            }
        },
        created(){
            
        },
        methods:{
            goPreviousPage(){
                this.$router.push({
                    path: '/personal'
                })
            },
            //确认密码
            toCashPsw(){
                this.$router.push({
                    path: '/cashPsw'
                })
            },
            clearCache(){
                
                this.$post('/?c=user&a=logout', {})
                .then((res) => {
                    switch (res.code) {
                        case 0:
                            this.$appFunc.prototype.setCache();
                            this.$toast('清除成功!');
                            if(is_wexin()){
                                this.$router.push({
                                    path: '/wechatLogin'
                                });
                            }else{
                                this.$router.push({
                                    path: '/login'
                                });
                            }
                            break;
                        default:
                            break;
                    }
                })
            },
        },
        components:{
            navbar,
        },
    }
</script>

<style scoped lang="less">
.set-focus-box{
    background-color: #fff;
    .set-focus-li{
        border-bottom: 1px solid #d8d8d8;
        margin-left: 12px;
        > .dflex{
            min-height: 48px;
        }
        .set-focus-label{
            margin: auto;
            margin-left: 0;
        }
        .set-focus-right{
            margin: auto;
            margin-right: 12px;
            height: 12px;
            width: 7px;
            img{
                display: block;
                max-height: 100%;
                max-width: 100%;
            }
        }
    }
    .set-focus-li:last-child{
        border-bottom: 0;
    }
}
</style>