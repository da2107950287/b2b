<template>
    <div>
        <goodsTermNav :termShow="termShow" :type="type" @onTermShow="onTermShow" @postMarket="postMarket" @postDistrict="postDistrict" @confirmCategory="confirmCategory" @allCategory="allCategory"></goodsTermNav>
        <div class="new-goods-box">
            <goodsLi v-for="(item,index) in goodsList" :key="index" @showCart="showShopcart" :item="item"></goodsLi>

            <van-actionsheet v-if="isReceivedTiem" v-model="isReceivedTiem" :class="'pricemode'+pricemode" class="pricemode">
                <goodsSpecItem v-if='pricemode==1' :goodsID='goods_id' :id='id' :data='dataInfo' :goodsName='goods_name' :goodsImage='goodsImage' :goodsPrice='goods_price' :measure_unit="measure_unit" @shoppingCartIn="shoppingCartIn"></goodsSpecItem>
                <goodsPriceSpecItem v-if='pricemode==2' :goodsID='goods_id' :id='id' :data='dataInfo' :goodsName='goods_name' :goodsImage='goodsImage' :goodsPrice='goods_price' :measure_unit="measure_unit" @shoppingCartIn="shoppingCartIn"></goodsPriceSpecItem>
            </van-actionsheet>
        </div>
        
    </div>
</template>

<script>
import goodsTermNav from "../component/termNav/goodsTermNav.vue"
import goodsLi from "../component/goodsLi/goodsLi.vue"
import goodsSpecItem from '../component/priceSpec/goodsSpec.vue';
import goodsPriceSpecItem from '../component/priceSpec/goodsPriceSpec.vue';
export default {
    data(){
        return{
            termShow:0,
            type:2,

            regionID:0,

            goodsList: [{"tag":[],"market_name":"","goods_name":"果酒","goods_price":"20.00","moq":"1","goods_unit":"份","thumb":"http://osst.nlyz365.com/images/201905/thumb_img/0_thumb_G_1558059396988.jpg","wId":"401","shop_name":"","seller_id":"244","is_collect":0,'goods_id':"29468"},{"tag":["放心购","已溯源","尾货"],"market_name":"","goods_name":"毛丹荔枝","goods_price":"1.00","moq":"1","goods_unit":"份","thumb":"http://osst.nlyz365.com/images/201907/thumb_img/0_thumb_G_1563833458571.jpg","wId":"550","shop_name":"三只松鼠","seller_id":"5","is_collect":0,'goods_id':"29468"},{"tag":["已溯源","放心购","尾货"],"market_name":"成都市场","goods_name":"绿葡萄酒","goods_price":"10.00","moq":"1","goods_unit":"份","thumb":"http://osst.nlyz365.com/images/201905/thumb_img/0_thumb_G_1558059064836.jpg","wId":"400","shop_name":"2","seller_id":"205","is_collect":0,'goods_id':"29468"},{"tag":[],"market_name":"","goods_name":"葡萄酒","goods_price":"5.00","moq":"1","goods_unit":"份","thumb":"http://osst.nlyz365.com/images/201905/thumb_img/0_thumb_G_1558062973541.jpg","wId":"402","shop_name":"5","seller_id":"246","is_collect":1,'goods_id':"29468"},{"tag":[],"market_name":"","goods_name":"威士忌","goods_price":"4.00","moq":"1","goods_unit":"份","thumb":"http://osst.nlyz365.com/images/201905/thumb_img/0_thumb_G_1558063212615.jpg","wId":"403","shop_name":"6","seller_id":"204","is_collect":1,'goods_id':"29468"},{"tag":[],"market_name":"","goods_name":"mdksdfh","goods_price":"1.00","moq":"1","goods_unit":"1","thumb":"/images/no_picture.gif","wId":"546","shop_name":"大鸟公司成都分公司","seller_id":"488","is_collect":0,'goods_id':"29468"},{"tag":[],"market_name":"","goods_name":"hdajhsd","goods_price":"1.00","moq":"1","goods_unit":"1","thumb":"/images/no_picture.gif","wId":"545","shop_name":"大鸟公司成都分公司","seller_id":"488","is_collect":0,'goods_id':"29468"},{"tag":["尾货一号","已溯源","水果"],"market_name":"","goods_name":"河套哈密瓜 西州蜜","goods_price":"1.00","moq":"1","goods_unit":"份","thumb":"http://osst.nlyz365.com/images/201908/thumb_img/0_thumb_G_1564694553114.jpg","wId":"567","shop_name":"三只松鼠","seller_id":"5","is_collect":0,'goods_id':"29468"},{"tag":["尾货一号","已溯源","水果"],"market_name":"","goods_name":"静冈蜜瓜网纹蜜瓜非哈密瓜","goods_price":"1.00","moq":"1","goods_unit":"份","thumb":"http://osst.nlyz365.com/images/201908/thumb_img/0_thumb_G_1564689140427.jpg","wId":"566","shop_name":"三只松鼠","seller_id":"5","is_collect":0,'goods_id':"29468"},{"tag":[],"market_name":"","goods_name":"无咯玉","goods_price":"1.00","moq":"1","goods_unit":"元","thumb":"http://osst.nlyz365.com/b2b/wap/wx3504a5f6a624d93187d6d1a37bb80fbf.png","wId":"555","shop_name":"一只好奇怪的土肥圆","seller_id":"386","is_collect":0,'goods_id':"29468"}], //====>商品列表


            shoppingCartClock : 0,
            dataInfo : [],
            dataInfodata:[],
            getcuTitle:[],

            
            isReceivedTiem:false,
            goodsImage:'',
            goods_name:'',
            goods_price:'',
            measure_unit:'',
            pricemode:-1,
        }
    },
    created(){
        let data = localStorage.getItem("wapres");
        this.regionID = data;
        // 获取市场信息
        this.$cacheStorage(
            'marketList',
            '/?a=marketList',
            'session',
            {
                region_id: this.regionID,
                type: this.type,
            },
            ((res)=>{
                this.marketList = res.data.list;
            }),
        )
        // 全部分类
        this.$cacheStorage(
            'allCategory',
            '/?a=allCategory',
            'session',
            {
                region_id: this.regionID,
            },
            ((res)=>{
                this.category = res.data;
            }),
        )
    },
    methods:{
        substr(val,num){
            if(val.length>num){
                val = val.substr(0,num-1) + '...';
            }else{
                val = val;
            }
            return val;
        },
        onTermShow(type){
            this.termShow = type;
        },
        allCategory(){
            this.termShow = 0;
            this.category_id = 0;
            this.showList = 0;
            this.$post("/?c=merchant&a=shopList2", {
                region_id: this.region_id,
                category_id: this.category_id,
                market_id: this.market_id,
                keywords:this.valueTwo,
                type:this.indexID
            }).then(res => {
                switch (res.code) {
                    case 0:
                        this.goodsList = res.data;
                        if(res.data.length > 0){
                        this.showList = 1;
                        }else{
                        this.showList = 2;
                        }
                        break;
                    default:
                        break;
                }
            });
        },
        confirmCategory(id){
            this.termShow = 0;
            this.category_id = id;
            this.showList = 0;
            this.$post("/?c=merchant&a=shopList2", {
                region_id: this.region_id,
                category_id: this.category_id,
                market_id: this.market_id,
                keywords:this.valueTwo,
                type:this.indexID
            }).then(res => {
                switch (res.code) {
                case 0:
                    this.goodsList = res.data;
                    if(res.data.length > 0){
                    this.showList = 1;
                    }else{
                    this.showList = 2;
                    }
                    break;
                default:
                    break;
                }
            });
        },
        postDistrict(id){
            this.termShow = 0;
            this.showList = 0;
            if(id == 'all'){
                this.region_id = this.regionID;
                this.$post("/?c=merchant&a=shopList2", {
                    region_id: this.region_id,
                    category_id: this.category_id,
                    market_id: this.market_id,
                    keywords:this.valueTwo,
                    type:this.indexID
                }).then(res => {
                    switch (res.code) {
                        case 0:
                        this.goodsList = res.data;
                        if(res.data.length > 0){
                            this.showList = 1;
                        }else{
                            this.showList = 2;
                        }
                        break;
                        default:
                        break;
                    }
                });
            }else{
                this.region_id = id;
                this.$post("/?c=merchant&a=shopList2", {
                    region_id: this.region_id,
                    category_id: this.category_id,
                    market_id: this.market_id,
                    keywords:this.valueTwo,
                    type:this.indexID
                }).then(res => {
                    switch (res.code) {
                        case 0:
                        this.goodsList = res.data;
                        if(res.data.length > 0){
                            this.showList = 1;
                        }else{
                            this.showList = 2;
                        }
                        break;
                        default:
                        break;
                    }
                });
            }
        },
        postMarket(id){
            this.termShow = 0;
            this.showList = 0;
            if(id == 'all'){
                this.market_id = 0;
                this.$post("/?c=merchant&a=shopList2", {
                region_id: this.region_id,
                category_id: this.category_id,
                market_id: this.market_id,
                keywords:this.valueTwo,
                    type:this.indexID
                }).then(res => {
                switch (res.code) {
                    case 0:
                    this.goodsList = res.data;
                    if(res.data.length > 0){
                        this.showList = 1;
                    }else{
                        this.showList = 2;
                    }
                    break;
                    default:
                    break;
                }
                });
            }else{
                this.market_id = id;
                this.$post("/?c=merchant&a=shopList2", {
                    region_id: this.region_id,
                    category_id: this.category_id,
                    market_id: this.market_id,
                    keywords:this.valueTwo,
                    type:this.indexID
                }).then(res => {
                    switch (res.code) {
                        case 0:
                        this.goodsList = res.data;
                        if(res.data.length > 0){
                            this.showList = 1;
                        }else{
                            this.showList = 2;
                        }
                        break;
                        default:
                        break;
                    }
                });
            }
        },
        onsearchTwo(){
            console.log(this.valueTwo)
            this.$post("/?c=merchant&a=shopList2", {
                region_id: this.region_id,
                category_id: this.category_id,
                market_id: this.market_id,
                keywords:this.valueTwo,
                type:this.indexID
            }).then(res => {
                switch (res.code) {
                case 0:
                    this.goodsList = res.data;
                    
                    if(res.data.length > 0){
                    this.showList = 1;
                    }else{
                    this.showList = 2;
                    }
                    break;
                default:
                    break;
                }
            });
        },
        showShopcart(data){
            this.goods_id = data.goods_id;
            this.id = data.wId;
            this.$post('/?c=goods&a=detail', {
                id: data.wId
            })
            .then((res) => {
                this.goodsImage = res.data.goods_img
                this.goods_name = res.data.goods_name
                this.goods_price = res.data.goods_price
                this.measure_unit = res.data.measure_unit
                this.pricemode = res.data.price_model
            })

            this.$post('/?c=goods&a=spec', {
                id: data.goods_id
            })
            .then((res) => {
                this.shoppingCartClock = 1;
                this.dataInfo = res;
                this.dataInfodata=res.data.spe;
                this.getcuTitle=res.data.pro;

                this.isReceivedTiem = true;
            })
        },
        shoppingCartIn(){
            
        },
    },
    components:{
        goodsTermNav,
        goodsLi,
        goodsSpecItem,
        goodsPriceSpecItem,
    }
}
</script>


<style lang="less" scoped>
.new-goods-box{
    padding: 0 12px;
    padding-top: 20px;
    background-color: #fff;
}
</style>
