<template>
    <div>
        <!-- 搜索框 -->
        <!-- <div class="location-search">
            <span>
                <i class="fa fa-search"></i>
                城市关键词
            </span>
        </div> -->
        <!-- 定位城市列表 -->
        <div class="location-list pad6">
            <van-row type="flex" justify="space-between">
                <van-col>
                    <div class="location-city">
                        <span>当前:{{cityis}}</span>
                        <span>GPS定位</span>
                    </div>
                </van-col>
                <van-col>
                    <div class="location-restart" @click="locationRestart">
                        <i class="fa fa-crosshairs"></i>
                        <span>重新定位</span>
                    </div>
                </van-col>
            </van-row>
        </div>
        <!-- 定位到的地址 -->
        <div class="location-locking">
            <p class="pad6">已定位城市</p>
            <div class="getAddress">
                <span :data-index='dataIndx'>{{cityis}}</span>
            </div>
        </div>
        <!-- 热门城市 -->
        <div class="location-hotcity">
            <p class="pad6">热门城市</p>
            <div class="pad6 location-hotcity-info">
                <van-row>
                    <van-col span="8" class="getAddress"><span :data-index='322'>成都</span></van-col>
                </van-row>
            </div>
        </div>
    </div>
</template>

<script>
    import $ from 'jquery'
    import '../assets/css/commonstyle.css'
    import 'font-awesome/css/font-awesome.css'
    import Vue from 'vue'
    import {location,is_wexin} from '../assets/js/commonAPI.js'
    import {getLocation,wxStart} from '../assets/js/wxjs.js'
    export default {
        data() {
            return {
                cityis:'',
                x:'',
                y:'',
                dataIndx: 322
            }
        },
        methods:{
            queryRegion(cityOrig){
                let _this = this;
                this.$post('/?a=syncLocation&t=1',{
                    city:cityOrig
                }).then((res)=>{
                    switch(res.code){
                        case 0:
                            let cityNew = res.data.region_name;
                            let LastIndex = cityNew.length - 1;
                            _this.cityis = cityNew.charAt(LastIndex) == "市" ? cityNew.slice(0, LastIndex) : cityNew;
                            _this.dataIndx = res.data.region_id;
                            break;
                        case 1:
                            let city = cityOrig;
                            let lastIndex = city.length - 1;
                            _this.cityis = city.charAt(lastIndex) == "市" ? city.slice(0, lastIndex) : city; //强制定位成都
                            _this.dataIndx = 322;                                                            //强制定位成都
                            break;
                        default:
                            break;
                    }
                })
            },
            locationRestart(){
                location().then(res=>{
                    this.queryRegion(res.address.city);
                }).catch(err=>{
                    console.log(err)
                });
            },
            getLocationPost(){
                //获取用户当前地理位置
                let _this = this;
                getLocation({},_this);
            },
        },
        created(){
            this.locationRestart();
            if(is_wexin()){
                wxStart(()=>{
                    this.getLocationPost();
                })
            }
        },
        mounted(){
            let _this = this;
            $('.getAddress').click(function(){
                localStorage.setItem('wapres',$($(event.target)[0]).attr('data-index'))
                localStorage.setItem('cityInfo',$($(event.target)[0]).text())

                sessionStorage.removeItem("allCategory");
                sessionStorage.removeItem("navList");
                sessionStorage.removeItem("marketList");
                sessionStorage.removeItem("indexWholesale");
                sessionStorage.setItem("resetLocation",1);

                _this.$router.push({
                    path:'/index',
                    query:{
                        title:$($(event.target)[0]).text(),
                        region:$($(event.target)[0]).attr('data-index'),
                    }
                })
            });
        }
    }
</script>

<style scoped>
    .location-search{
        text-align: center;
        background-color: #e7e7eb;
    }
    .location-search span{
        display: inline-block;
        width: 90%;
        height: 2rem;
        line-height: 2rem;
        margin: .5rem 0;
        font-size: 14px;
        color: #777;
        background-color: #fff;
    }
    .location-list{
        height: 2.6rem;
        line-height: 2.6rem;
        background-color: #fff;
    }
    .location-city,
    .location-restart{
        color: #666;
        font-size: 14px;
    }
    .location-city span:nth-child(2){
        color: #999;
    }
    .location-restart i{
        color: #ec5151;
    }
    .location-locking p,
    .location-hotcity p{
        color: #777;
        font-size: 14px;
        margin-bottom: .4rem;
    }
    .location-locking div>span{
        font-size: 14px;
        padding: .3rem 1.6rem;
        margin-left: .6rem;
        border-radius: .2rem;
        display: inline-block;
        background-color: #fff;
    }
    .location-hotcity-info{
        text-align: center;
    }
    .location-hotcity-info span{
         font-size: 14px;
        padding: .3rem 1.6rem;
        margin-bottom: .6rem;
        border-radius: .2rem;
        display: inline-block;
        background-color: #fff;
    }
</style>
