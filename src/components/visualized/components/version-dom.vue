<template>
    <div >
        <div :class="['version-box']" :style="[{'background-color':versionBackground}]">
            <div :class="['version-text',{'fz12':fontWeight == '3'},{'fz14':fontWeight == '2'},{'fz16':fontWeight == '1'}]" >
                <a :href="link != ''?link:'javascript:;'" :style="[{'color':versionColor}]">{{versionText}}</a>
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
            componentOptionName:"version-option",

            versionBackground:"#fff",//背景颜色
            fontWeight:'1',//字体大小 1 大 2中 3小
            versionColor:'#212121',//文本颜色
            versionText:'',//内容
            link:'',//跳转链接
        }
    },
    created(){
        if(this.data){
            this.versionBackground = this.data.versionBackground
            this.fontWeight = this.data.fontWeight

            this.versionColor = this.data.versionColor
            this.versionText = this.data.versionText
            this.link = this.data.link
        }
    },
    watch:{
        data(res){
            if(this.data){
                this.versionBackground = res.versionBackground
                this.fontWeight = res.fontWeight

                this.versionColor = res.versionColor
                this.versionText = res.versionText
                this.link = res.link
            }
        }
    },
    methods:{
    },
}
</script>
<style lang="less" scoped >
.version-box{
    padding: 15px 12px;
    .version-text{
        word-break: break-all;
    }
}
</style>