<template>
    <div>
        <div class="swiper-alert position-fixed">
            <div class="position-bg" @click="closeSwiper"></div>
            <swiper :options='swiperOption' ref="mySwiper"><!-- 挂载到ref上 -->
                <swiper-slide v-for="(item,index) in swiperImg" :key="index">
                    <img class="swiper-alert-img" :src="item" @click="closeSwiper">
                </swiper-slide>
            </swiper>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue';
    import 'swiper/dist/css/swiper.css'
    import {swiper, swiperSlide} from 'vue-awesome-swiper'
    export default {
        props:['swiperImg'],
        data() {
            return {
                //每一屏个数
                swiperOption:{
                    autoHeight: true,
                    slidesPerView:1,
                },
            }
        },
        computed: {
            swiper() {//
                return this.$refs.mySwiper.swiper
            },
        },
        methods:{
            closeSwiper(){
                this.$emit('swiperClose');
            },
        },
        mounted() {
            
        },
        components:{
            swiper,
            swiperSlide,
        }
    }
</script>

<style lang="less" scoped>
    .dflex{display: flex;}
    .position-fixed{
        position: fixed;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.3);
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        z-index: 10;
        .position-bg{
            height: 100%;
            width: 100%;
            position: absolute;
            z-index: 10;
        }
    }
    .swiper-alert{
        display: flex;
        .swiper-container{
            margin: auto 10px;
            position: relative;
            z-index: 11;
            width: 100%;
            .swiper-alert-img{
                display: block;
                margin: auto;
                max-width: 100%;
            }
        }
    }
</style>
