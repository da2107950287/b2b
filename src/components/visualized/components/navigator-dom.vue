<template>
    <div>
        <div class="navigator-box fz16" :style="[{'background-color': navigatorBackground}]" :class="{'isFiexd':isFiexd == '1'}">
            <div class="arrow-left" v-if="isShowArrow == '1'" @click="goback" :style="[{'color':arrowLeftColor}]">
                <svg t="1574737914831" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2658" ><path d="M589.088 790.624L310.464 512l278.624-278.624 45.248 45.248L400.96 512l233.376 233.376z" :fill="arrowLeftColor" p-id="2659"></path></svg>
                返回
            </div>
            <div class="navigator-title" :style="{'color': navigatorColor}">{{navigatorTitle}}</div>
        </div>
    </div>
</template>

<script>
import Vue from "vue";
import "../css/style.less"
export default {
    props :{
        data:{
			type: Object,
			default: undefined
        },
    },
    data () {
        return {
            componentOptionName:"navigator-option",

            isFiexd:"0",
            isShowArrow:"1",
            navigatorTitle:'导航栏名称',
            navigatorPosition:'fixed',
            navigatorBackground:'#fff',
            navigatorColor:'#212121',
            arrowLeftColor:'#333',
        }
    },
    watch:{
        data(res){
            if(this.data){
                this.isShowArrow = res.isShowArrow || "1";
                this.navigatorTitle = res.navigatorTitle || "导航栏名称";
                this.navigatorPosition = res.navigatorPosition;
                this.navigatorBackground = res.navigatorBackground;
                this.navigatorColor = res.navigatorColor;
                this.arrowLeftColor = res.arrowLeftColor;
                this.isFiexd =  res.isFiexd;
            }
        }
    },
    created(){
        if(this.data){
            this.isShowArrow = this.data.isShowArrow || "1";
            this.navigatorTitle = this.data.navigatorTitle || "导航栏名称";
            this.navigatorPosition = this.data.navigatorPosition;
            this.navigatorBackground = this.data.navigatorBackground;
            this.navigatorColor = this.data.navigatorColor;
            this.arrowLeftColor = this.data.arrowLeftColor;
            this.isFiexd =  this.data.isFiexd;
        }
    },
    methods:{
        goback(){
            this.$router.go(-1);
        },
    },
}
</script>
<style lang="less" scoped id="navigator-dom-style">
.navigator-box{
    align-items: center;
    height: 44px;
    width: 100%;
    display: flex;
    justify-content: flex-start;
    position: relative;
    line-height: 28px;
    .arrow-left{
        position: absolute;
        left: 0;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        
        svg{
            height: 28px;
            display: block;
        }
    }
    .navigator-title{
        margin: auto;

        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        /*! autoprefixer: off */
        -webkit-box-orient: vertical;
        /* autoprefixer: on */
        text-align: center;
        
        word-break: break-word;
    }
}
.isFiexd{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 2000;
    opacity: .6;
}
</style>