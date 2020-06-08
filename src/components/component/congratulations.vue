<template>
    <div class="congratulations-box dflex">
        <div class="congratulations-bg " @click="close"></div>
        <div class="congratulations-content bigShow" :class="{'is_coupon':type != 1}">
            <div v-if="type == 1">
                <div class="face-img">
                    <img class="face-img-a" src="../../assets/img/youhuiquan1.png" alt="">
                    <img class="face-img-b" src="../../assets/img/youhuiquan4.png" alt="" @click="toCoupon">
                </div>
                <div class="center-img topShow">
                    <img src="../../assets/img/youhuiquan3.png" alt="">
                    <div class="dflex center-content color_EE2D2D">
                        <div class="center-content-price ">
                            <span class="center-content-yen fz_16">&yen;</span>
                            <span class="center-content-yuan fz_28">{{info.discount_money}}</span>
                        </div>
                        <div class="center-content-remaker fz_18">满{{info.min_amount}}减{{info.discount_money}}</div>
                    </div>
                </div>
                <div class="back-img">
                    <img src="../../assets/img/youhuiquan2.png" alt="">
                </div>
            </div>
            <div v-else>
                <div class="face-img">
                    <img class="face-img-a" src="../../assets/img/tanchuang.png" alt="">
                </div>
            </div>
            <div class="congratulations-btn" @click="close">
                <img class="quxiao" src="../../assets/img/quxiao.png" alt="">
            </div>
        </div>
    </div>
</template>


<script>
import Vue from "vue"
import "../../assets/css/commonstyle.css"
export default {
    props:['info','type'],
    data(){
        return{
        }
    },
    created(){
        setTimeout((res)=>{
            this.$emit('close');
        },5000)
    },
    methods:{
        close(){
            this.$emit('close');
        },
        toCoupon(){
            this.$router.push({
                path: '/coupon'
            })
        },
    },
}
</script>

<style lang="less" scoped>
    .congratulations-box{
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        margin: auto;
        z-index: 1003;
        .congratulations-bg{
            background-color: rgba(0,0,0,0.7);
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
        }
        .congratulations-content{
            position: relative;
            z-index: 102;
            margin: auto;
            margin-top: 100px;
            .face-img{
                position: relative;
                z-index: 105;
                width: 14.9rem;
                margin: auto;
                height: 12.91rem;
                .face-img-a{
                    position: relative;
                }
                .face-img-b{
                    position: absolute;
                    width: 10.83rem;
                    bottom: 1.28rem;
                    left: 0;
                    right: 0;
                    margin: auto;
                }
            }
            .center-img{
                position: absolute;
                z-index: 104;
                width: 14.9rem;
                margin: auto;
                left: 0;
                right: 0;
                margin-top: -.75rem;
                height: 4.37rem;
                top: 8.54rem;
                img{
                    margin: auto;
                    width: 10.64rem;
                }
                .center-content{
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 10rem;
                    height: 4rem;
                    right: 0;
                    margin: auto;
                    text-align: center;
                    .center-content-price{
                        margin: auto;
                        flex:.4;
                        border-right: 1px solid #f6d2b5;
                    }
                    .center-content-remaker{
                        margin: auto;
                        flex:.6;
                        margin-right: 5px;
                    }
                }
            }
            .back-img{
                position: relative;
                z-index: 103;
                width: 14.9rem;
                margin: auto;
                margin-top: -.533rem;
            }
            .congratulations-btn{
                width: 32px;
                margin: 16px auto;
            }
            img{
                max-width: 100%;
                display: block;
            }
        }
        .congratulations-content.is_coupon{
            margin-top: 150px;
            .face-img{
                height: auto;
            }
        }
    }
    .bigShow{
        animation-name: bigShow;
        animation-duration: .6s;
    }
    @keyframes bigShow{
        0%{
            transform:scale(0,0)
        }
        80%{
            transform:scale(1.1,1.1)
        }
        100%{
            transform:scale(1,1)
        }
    }
    .topShow{
        animation-name: topShow;
        animation-duration: .3s;
        animation-delay: .6s;
        animation-fill-mode: forwards;
    }
    @keyframes topShow{
        0%{
            top :8.54rem
        }
        100%{
            top: 12.91rem;
        }
    }
</style>
