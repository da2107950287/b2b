<template>
    <div>
        <div :class="['magic-cube-box']" :style="[{'padding':htmlPadding},{'background':pictureAdsBgColor}]">
            <magic-cube-model :active="modelActive" :data="imageList"></magic-cube-model>
        </div>
    </div>
</template>

<script>
import Vue from "vue";
import "../css/style.less"
const magicCubeModel = ()=> import("../addImage/magicCubeModel.vue");

export default {
    props :{
        data:{
			type: Object,
			default: ()=>{
                return {}
            }
        },
        mid:{
            type:Number,
            default:0,
        },
        template_id:{
            type:Number,
            default:0,
        },
        index:{
            type:Number,
            default: 0,
        }
    },
    components:{
        magicCubeModel
    },
    data () {
        return {
            componentOptionName:"magic-cube-option",

            modelActive:0,
            imageList:[],
            imageLists:'',
            isHtmlPadding:'2',
            pictureAdsBgColor:'#f2f2f2',
            htmlPadding:'',
        }
    },
    created(){
        if(this.data){
            this.modelActive = this.data.modelActive;
            this.imageList = this.data.imageList;
            this.imageLists = this.data.imageLists;
            this.isHtmlPadding = this.data.isHtmlPadding;
            this.pictureAdsBgColor = this.data.pictureAdsBgColor;
        }
    },
    watch:{
        data(res){
            if(this.data){
                this.modelActive = res.modelActive;
                this.imageList = res.imageList;
                this.imageLists = res.imageLists;
                this.isHtmlPadding = res.isHtmlPadding;
                this.pictureAdsBgColor = res.pictureAdsBgColor;
            }
        },
        
        isHtmlPadding(res){
            if(this.isHtmlPadding == "1"){
                this.htmlPadding = "0 12px";
            }else{
                this.htmlPadding = "0px";
            }
        },
    },
    methods:{
    },
}
</script>
<style lang="less" scoped >
.magic-cube-box{
    .headline-title{
        line-height: 18px;
    }
    .mt9{
        margin-top: 9px;
    }
    .subheadline-title{
        line-height: 14px;
    }
    .headline-left{
        height: 19px;
        width: 3px;
        background-color: #000;
        margin-right: 5px;
    }
}
</style>