<template>
    <div >
        <div :class="['space-line-box',{'pd12':isHtmlPadding=='2'}]">
            <div class="dflex align-center justify-center" :style="[{'background-color':spaceLineBackground},{'height': spaceLineHeight+'px'}]">
                <template v-if="spaceLineType == '1'">
                    <div></div>
                </template>
                <template v-else-if="spaceLineType == '2'">
                    <div :class="['lineStyle',{'lineSolid':isSpaceLine=='0'},{'lineDashed':isSpaceLine=='1'},{'lineDotted':isSpaceLine=='2'}]"></div>
                </template>
            </div>
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
            componentOptionName:"space-line-option",

            spaceLineBackground:"#f2f2f2",//背景颜色
            spaceLineHeight:'10',//空白高度
            isSpaceLine:'1',//线样式
            spaceLineType:'1',//选择样式
            isHtmlPadding:'1',//页面边距
        }
    },
    created(){
        if(this.data){
            this.spaceLineBackground = this.data.spaceLineBackground
            this.spaceLineHeight = this.data.spaceLineHeight

            this.isSpaceLine = this.data.isSpaceLine
            this.spaceLineType = this.data.spaceLineType
            this.isHtmlPadding = this.data.isHtmlPadding
        }
    },
    watch:{
        data(res){
            if(this.data){
                this.spaceLineBackground = res.spaceLineBackground
                this.spaceLineHeight = res.spaceLineHeight

                this.isSpaceLine = res.isSpaceLine
                this.spaceLineType = res.spaceLineType
                this.isHtmlPadding = res.isHtmlPadding
            }
        }
    },
    methods:{
    },
}
</script>
<style lang="less" scoped >
.space-line-box{
    .lineStyle{
        height: 1px;
        width: 100%;
        border: 0;
    }
    .lineSolid{
        border-top: 1px solid #c9c9c9;
    }
    .lineDashed{
        border-top: 1px dashed #c9c9c9;
    }
    .lineDotted{
        border-top: 1px dotted #c9c9c9;
    }
}
.space-line-box.pd12{
    padding: 0 12px;    
}
</style>