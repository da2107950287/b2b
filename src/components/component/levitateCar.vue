<template>
<!-- 购物车悬浮 -->
    <div class="levitateCar">
        <div id="shopCart" class="car fz_12 color_EE2D2D" @click="toCar">
            <img src="../../assets/img/gwc.png" alt="">
            <span v-if="num > 0">{{num}}</span>
        </div>
    </div>
</template>

<script>
import $ from "jquery";
import Vue from "vue";
import "../../assets/css/commonstyle.css"
export default {
    props:['num'],
    data(){
        return{

        }
    },
    created(){},
    methods:{
        toCar(){
            this.$router.push({
                path:"/shoppingCart"
            })
        }
    },
}
</script>

<style lang="less" scoped>
.levitateCar{
    position: fixed;
    right: 12px;
    bottom: 70px;
    z-index: 1000;
    .car{
        width: 44px;
        height: 44px;
        box-shadow: 0px 1px 5px rgba(0,0,0,0.5);
        background-color: #fff;
        position: relative;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        img{
            width:50%;
            height:50%;
            display: block;
        }
        span{
            position: absolute;
            top: -7px;
            right: -7px;
            border: 1px solid #EE2D2D;
            background-color: #fff;
            border-radius: 10px;
            padding: 0 5px;
        }
    }
}
</style>

