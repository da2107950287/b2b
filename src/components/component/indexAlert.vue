<template>
    <div class="congratulations-box dflex">
        <div class="congratulations-bg " @click="close"></div>
        <div class="congratulations-content bigShow">
            <div @click="toHref(link)">
                <div class="face-img">
                    <img class="face-img-a" :src="img" alt="">
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
    props:['img','link'],
    data(){
        return{
        }
    },
    created(){
        setTimeout((res)=>{
            this.$emit('close');
        },10000)
    },
    methods:{
        toHref(link){
            this.$emit('close');
            window.location.href = link
        },
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
            .face-img{
                position: relative;
                z-index: 105;
                width: 13.33rem;
                margin: auto;
                max-height: 18.67rem;
                overflow: hidden;
                display: flex;
                .face-img-a{
                    margin: auto;
                    position: relative;
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
                margin: 30px auto;
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
