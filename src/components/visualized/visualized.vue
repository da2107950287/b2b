<template>
    <div >
        <div v-for="(item,index) in componentData" :key="index">
            <template v-if="item.template_id == 1">
                <navigator-dom :data="item.optionData"></navigator-dom>
            </template>
            <template v-else-if="item.template_id == 2">
                <picture-dom :data="item.optionData"></picture-dom>
            </template>
            <template v-else-if="item.template_id == 3">
                <commodity-dom :data="item.optionData" :ref="`goodsListCid`"></commodity-dom>
                <div class="end-msg" :data-id="item.id"></div>
            </template>
            <template v-else-if="item.template_id == 4">
                <headline-dom :data="item.optionData"></headline-dom>
            </template>
            <template v-else-if="item.template_id == 5">
                <version-dom :data="item.optionData"></version-dom>
            </template>
            <template v-else-if="item.template_id == 6">
                <space-line-dom :data="item.optionData"></space-line-dom>
            </template>
            <template v-else-if="item.template_id == 7">
                <magic-cube-dom :data="item.optionData"></magic-cube-dom>
            </template>
        </div>
    </div>
</template>

<script>
import Vue from "vue";
import $ from "jquery";
const commodityDom = ()=>import("./components/commodity-dom.vue");
const navigatorDom = ()=>import("./components/navigator-dom.vue");
const pictureDom = ()=>import("./components/picture-ads-dom.vue");
const headlineDom = ()=>import("./components/headline-dom.vue");
const versionDom = ()=>import("./components/version-dom.vue");
const spaceLineDom = ()=>import("./components/space-line-dom.vue");
const magicCubeDom = ()=>import("./components/magic-cube-dom.vue");

export default {
    data () {
        return {
            componentData:[],

            id:this.$route.query.id,
            title:'农联贡菜',
            htmlColor:'#f2f2f2',

            cat_id:0,
            lock:0,
            page:1,
        }
    },
    components: {
        pictureDom,
        navigatorDom,
        commodityDom,
        headlineDom,
        versionDom,
        spaceLineDom,
        magicCubeDom,
    },
    created(){
        this.$parent.$refs.loading.style.display = "flex"
        this.$post('/?c=visualization&a=info',{
            visualizationId:this.id,
        }).then(res=>{
            this.$parent.$refs.loading.style.display = "none"
            if(res.code == 0){
                let val = res.data.optionData;
                let arr = [];
                let arr2 = {}
                for(let key in val){
                    arr2 = this.getTemplateItem(val,key);
                    arr.push(arr2);
                }
                this.componentData = arr;
                let title = `${this.title}-${res.data.title}`;
                $('title').text(title);
                $('body').css({
                    'background-color':res.data.html_color,
                    'overflow-x':"hidden",
                    'position':"relative",
                })
                $('body>div').css({
                    'height':"auto"
                })

            }else if(res.code == 1){
                this.$toast(res.msg);
            }else{
                this.$toast('请求失败！');
            }
        });
    },
    
    methods:{
        getTemplateItem(data,key){
            let res1 = {};
            if(data[key].template_id == 1){
                let optionData = {};
                optionData = this.getOptionData(data,key);
                res1 = {
                    componentName:"navigator",
                    componentOptionName:"navigator-option",
                    id:parseInt(data[key].id),
                    sort:key,
                    title:"导航栏",
                    optionData:optionData,
                    template_id:1,
                }
            }else if(data[key].template_id == 2){
                let optionData = {};
                optionData = this.getOptionData(data,key);
                res1 = {
                    componentName:"picture-ads",
                    componentOptionName:"picture-ads-option",
                    id:parseInt(data[key].id),
                    sort:key,
                    title:"图片广告",
                    optionData:optionData,
                    template_id:2,
                }
            }else if(data[key].template_id == 3){
                let optionData = {};
                optionData = this.getOptionData(data,key);
                res1 = {
                    componentName:"commodity",
                    componentOptionName:"commodity-option",
                    id:parseInt(data[key].id),
                    sort:key,
                    title:"商品",
                    optionData:optionData,
                    template_id:3,
                }
            }else if(data[key].template_id == 4){
                let optionData = {};
                optionData = this.getOptionData(data,key);
                
                res1 = {
                    componentName:"headline",
                    componentOptionName:"headline-option",
                    id:parseInt(data[key].id),
                    sort:key,
                    title:"标题",
                    optionData:optionData,
                    template_id:4,
                }
            }else if(data[key].template_id == 5){
                let optionData = {};
                optionData = this.getOptionData(data,key);
                
                res1 = {
                    componentName:"version",
                    componentOptionName:"version-option",
                    id:parseInt(data[key].id),
                    sort:key,
                    title:"文本",
                    optionData:optionData,
                    template_id:5,
                }
            }else if(data[key].template_id == 6){
                let optionData = {};
                optionData = this.getOptionData(data,key);
                res1 = {
                    componentName:"space-line",
                    componentOptionName:"space-line-option",
                    id:parseInt(data[key].id),
                    sort:key,
                    title:"辅助空白",
                    optionData:optionData,
                    template_id:6,
                }
            }else if(data[key].template_id == 7){
                let optionData = {};
                optionData = this.getOptionData(data,key);
                res1 = {
                    componentName:"magic-cube",
                    componentOptionName:"magic-cube-option",
                    id:parseInt(key),
                    sort:key,
                    title:"魔方",
                    optionData:optionData,
                    template_id:7,
                }
            }
            return res1;
        },
        getOptionData(data,key){
            let optionData = {};
            data[key].content = JSON.parse(data[key].content);
            let datalist = false;
            let categrod = '';
            if(data[key].goodsList.length>0){
                datalist = data[key].goodsList
            }else{
                categrod = data[key].goods_id
            }
            for(let i in data[key].content){
                optionData[i] = data[key].content[i];
                if(i == "checked"){
                    let checkeds = data[key].content[i];
                    for(let i in checkeds){
                        if(checkeds[i] == '1'){
                            checkeds[i] = true;
                        }
                    }
                    optionData.checkeds = JSON.stringify(checkeds);
                }else if(i == "goodsList"){
                    optionData.goodsLists = JSON.stringify(data[key].content[i]);
                    optionData.datalist = datalist;
                    let value = [];
                    if(categrod != ''){
                        value = categrod.split(',')
                    }

                    optionData.value = value;
                    optionData.cat_id = value[value.length-1];

                }else if(i == "imageList"){
                    optionData.imageLists = JSON.stringify(data[key].content[i]);
                }
            }
            return optionData;
        },
        getGoods(cat_id){
            this.cat_id = cat_id;
            if(this.lock == 0){
                this.lock = 1;
                this.$post(`/?c=goods&a=wholesale&t=${this.cat_id}`,{
                    page:this.page,
                    cat_id: this.cat_id,
                    is_activity: 0,
                    region_id: "322",
                    sort_evaluate: 0,
                    sort_num: 0,
                    sort_price: 0,
                }).then(res=>{
                    if(res.code == 0){
                        let list = res.data;
                        if(list.length>0){
                            this.$refs.goodsListCid[0].goodsList = [...this.$refs.goodsListCid[0].goodsList,...list];
                            
                            if(list.length>9){
                                window.addEventListener('scroll', this.handleScroll, true)
                                this.page++;
                            }else{
                                window.removeEventListener('scroll', this.handleScroll, true)
                            }
                        }
                    }
                    this.lock = 0;
                })
            }
        },
        //商品瀑布流加载
        handleScroll () {
            let _this=this
            let loadBottom = $('.end-msg')[0].getBoundingClientRect().bottom;
            let toBottom = innerHeight - 51;
            if( loadBottom < toBottom + 100){
                //写后台加载数据的函数
                this.getGoods(this.cat_id);
            }
        },
    },
    destroyed () {
        $('body').css({
            'background-color':this.htmlColor,
        })
        $('body>div').attr('style','');
        $('title').text(this.title);
        window.removeEventListener('scroll', this.handleScroll)
    },
}
</script>
<style lang="less" scoped>

</style>