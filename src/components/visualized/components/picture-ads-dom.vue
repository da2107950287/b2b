<template>
    <div>
        <div class="picture-ads-box" :style="[{'margin': htmlPadding},{'background-color':pictureAdsBgColor}]">
            <template v-if="modelListType == '0'">
                <div class="picture-ads-images" v-for="(item,index) in imageList" :key="index" :style="[{'margin': `0 0 ${imageUnit}px 0`}]">
                    <div class="picture-ads-link" :style="[{'border-radius': imgRadius}]">
                        <a :href="item.link != ''?item.link:'javascript:;'">
                            <div class="picture-ads-img" ><img error="../../../assets/img/no_picture.gif" v-lazy="item.img" alt=""></div>
                            <div class="picture-ads-title dflex align-center justify-center" v-if="item.title">{{item.title}}</div>
                        </a>
                    </div>
                </div>
            </template>
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
            componentOptionName:"picture-ads-option",
            isBorderWidth:true,

            imageList:[],//图片列表

            modelLists:{},//所选中的模板
            modelListType:"0",//所选中的模板

            isHtmlPadding:"0",//有无页面边距
            htmlPadding:"0px",

            isImgRadius:"0",//图片是否圆角
            imgRadius:"0px",

            imageUnit:"",//图片间距
            pictureAdsBgColor:"#f2f2f2",//背景颜色
        }
    },
    created(){
        if(this.data){
            this.imageList = this.data.imageList || [];
            this.modelLists = this.data.modelLists || {};
            this.modelListType = this.data.active;
            this.isHtmlPadding = this.data.isHtmlPadding || 0;
            this.isImgRadius = this.data.isImgRadius || 0;
            this.imageUnit = this.data.imageUnit || '';
            this.pictureAdsBgColor = this.data.pictureAdsBgColor || "#f2f2f2";

            if(this.data.imageList[0].img || this.data.imageList[0].text || this.data.imageList[0].url){
                // this.isBorderWidth = false;
            }
        }
    },
    computed:{
    },
    watch:{
        data(res){
            console.log(res);
            if(this.data){
                this.imageList = res.imageList || [];
                this.modelLists = res.modelLists || {};
                this.modelListType = res.active;
                this.isHtmlPadding = res.isHtmlPadding || "0";
                this.isImgRadius = res.isImgRadius || "0";
                this.imageUnit = res.imageUnit || '';
                this.pictureAdsBgColor = res.pictureAdsBgColor || "#f2f2f2";

                if(res.imageList[0].img || this.data.imageList[0].text || this.data.imageList[0].url){
                    this.isBorderWidth = false;
                }
            }
        },
        isHtmlPadding(res){
            if(this.isHtmlPadding == "1"){
                this.htmlPadding = "0 12px";
            }else{
                this.htmlPadding = "0px";
            }
        },
        isImgRadius(res){
            if(this.isImgRadius == "1"){
                this.imgRadius = "5px";
            }else{
                this.imgRadius = "0px";
            }
        },
    },
    methods:{
        toHref(link){
            if(link){
                window.location.href = link;
            }
        },
    },
}
</script>
<style lang="less" scoped>
.demo-box{
    min-height: 175px;
}
.demo-box.borderWidth{
    background-color: #e9f2fa;
    border: solid 1px #62b3ff;
}
.picture-ads-images{
    width: 100%;
    .picture-ads-link{
        display: block;
        width: 100%;
        position: relative;
        overflow: hidden;
        .picture-ads-img{
            overflow: hidden;
            img{
                min-height: 50px;
                display: block;
                width: 100%;
            }
        }
        .picture-ads-title{
            position: absolute;
            bottom: 0;
            height: 25px;
            background-color: rgba(0,0,0,0.6);
            width: 100%;
            font-size: 14px;
            color: #fff;
            
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
}
</style>