<template>
    <div >
        <div :class="['headline-box']" :style="[{'background-color':headlineBackground}]">
            <template v-if="isStyle=='1'">
                <a :href="link != ''?link:'javascript:;'">
                    <template>
                        <div :style="[{'color':headlineColor1}]" :class="['headline-title fz16',{'textAlignLeft':isTextAlign==0},{'textAlignCenter':isTextAlign==1},{'textAlignRight':isTextAlign==2}]" >{{headlineTitle}}</div>
                    </template>
                    <template v-if="subHeadingTitle!=''">
                        <div :style="[{'color':headlineColor2}]" :class="['subheadline-title fz12 mt9',{'textAlignLeft':isTextAlign==0},{'textAlignCenter':isTextAlign==1},{'textAlignRight':isTextAlign==2}]" >{{subHeadingTitle}}</div>
                    </template>
                </a>
            </template>
            <template v-else-if="isStyle=='2'">
                <div class="dflex flex-start align-center">
                    <div class="headline-left" :style="[{'background-color':headlineColor1}]"></div>
                    <a :href="link != ''?link:'javascript:;'" :style="[{'color':headlineColor1}]" :class="['headline-title fz16']" >    
                        {{headlineTitle}}
                    </a>
                </div>
                <div class="dflex flex-start align-center">
                    <div class="headline-left" :style="[{'background-color':'unset'}]"></div>
                    <a :href="link != ''?link:'javascript:;'" :style="[{'color':headlineColor2}]" :class="['subheadline-title fz12 mt9']" >   
                        {{subHeadingTitle}}
                    </a>
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
    data () {
        return {
            componentOptionName:"headline-option",

            isStyle:'1',//选择样式 1 样式一 2样式二
            headlineTitle:'',//标题名
            subHeadingTitle:'',//副标题
            headlineBackground:'#fff',//背景颜色
            headlineColor1:'#212121',//标题颜色
            headlineColor2:'#808080',//副标颜色
            isTextAlign:1,//文本对齐方式 1左 2中 3右
            link:'',//跳转链接
        }
    },
    created(){
        if(this.data){
            this.isStyle = this.data.isStyle
            this.isTextAlign = this.data.isTextAlign

            this.subHeadingTitle = this.data.subHeadingTitle
            this.headlineTitle = this.data.headlineTitle
            this.headlineBackground = this.data.headlineBackground
            this.headlineColor1 = this.data.headlineColor1
            this.headlineColor2 = this.data.headlineColor2
            this.link = this.data.link
        }
    },
    watch:{
        data(res){
            if(this.data){
                this.isStyle = res.isStyle
                this.isTextAlign = res.isTextAlign

                this.subHeadingTitle = res.subHeadingTitle
                this.headlineTitle = res.headlineTitle
                this.headlineBackground = res.headlineBackground
                this.headlineColor1 = res.headlineColor1
                this.headlineColor2 = res.headlineColor2
                this.link = res.link
            }
        }
    },
    methods:{
    },
}
</script>
<style lang="less" scoped >
.headline-box{
    padding: 15px 12px;
    .headline-title{
        line-height: 18px;
        
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        /*! autoprefixer: off */
        -webkit-box-orient: vertical;
        /* autoprefixer: on */
        word-break: break-word;
    }
    .mt9{
        margin-top: 9px;
    }
    .subheadline-title{
        line-height: 14px;

        word-break: break-word;
    }
    .headline-left{
        height: 19px;
        width: 3px;
        background-color: #000;
        margin-right: 5px;
    }
}
</style>