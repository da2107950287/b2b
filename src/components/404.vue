<template>
    <div class="notfount">
        <navbar type="left" title="页面错误" @clickleft="goPreviousPage"></navbar>
        <div class="notfount-img"><img src="../assets/img/404.png" alt=""></div>
        <div class="notfount-text fz_14 color_808080">您访问的页面找不到了~</div>
        <div class="to-index fz_14" @click="toIndex">返回首页</div>
    </div>
</template>
<script>
import navbar from "./navbar/nav.vue"
import "../assets/css/commonstyle.css";
export default {
    data(){
        return{}
    },
    methods:{
        goPreviousPage(){
            this.$router.go(-1);
        },
        toIndex() {
            this.$router.push({
                path:'/index'
            });
        },
    },
    components:{
        navbar
    }
}
</script>
<style lang="less" scoped>
    .notfount{
        .notfount-img{
            width: 50%;
            margin: auto;
            margin-top: 120px;
            img{
                display: block;
                width: 100%;
            }
        }
        .notfount-text{
            text-align: center;
            margin: 20px 0 10px;
        }
        .to-index{
            text-align: center;
            width: 148px;
            height: 28px;
            border:1px solid #EE2D2D;
            background-color: #EE2D2D;
            line-height: 28px;
            border-radius: 5px;
            color: #fff;
            margin: auto;
        }
    }
</style>
