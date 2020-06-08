<template>
    <div>
        <!-- 搜索框 -->
        <div class="search-bar" id='scrollSearchDiv'>
            <van-row class="search-bar-div">
                <van-col span='4'>
                    <div @click="locationInof" class="locationDiv dflex">
                        <span>
                            <svgicon name="Location_3x" class="fa p-marker"></svgicon>
                        </span>
                        <span class="locationTitle">{{location}}</span>
                    </div>
                </van-col>
                <van-col span='17'>
                    <div class="serach-form" >
                        <span>
                            <svgicon name="search_3x" class="fa fa-search"></svgicon>
                        </span>
                         <form action="javascript:;" id="searchFrom" @click.self="searchSbumit">
                           <input class= "search_in search-indiv" type="search" placeholder="找你喜欢的" v-model='value' @keyup.enter="searchSbumit"/>
                        </form>
                    </div>
                </van-col>
                <van-col span='3'>
                    <!-- <div class="onSearch"  @click="onService"> -->
                    <div class="search-text" @click.stop="searchSbumit">搜索</div>
                    <!-- <div class="onSearch"  @click="getPhone">
                        <div class="iconService"> 
                            <img src="../assets/img/indexkefu.png" alt="" >
                        </div>
                    </div> -->
                </van-col>
            </van-row>
            <notice @isNotice="getNotice" :timeSlot="timeSlot"></notice>
        </div>

        <!-- 搜索框2 -->
        <div class="search-bar-show" id='scrollSearchDivShow'>
            <van-row class="search-bar-div">
                <van-col span='4'>
                    <div @click="locationInof" class="locationDiv dflex">
                        <span>
                            <svgicon name="Location_3x" class="fa p-marker"></svgicon>
                        </span>
                        <span class="locationTitle">{{location}}</span>
                    </div>
                </van-col>
                <van-col span='17'>
                    <div class="serach-form" >
                        <span>
                            <svgicon name="search_3x" class="fa fa-search"></svgicon>
                        </span>
                         <form action="javascript:;" id="searchFrom" @click.self="searchSbumit">
                           <input class= "search_in search-indiv" type="search" placeholder="找你喜欢的" v-model='value' @keyup.enter="searchSbumit"/>
                        </form>
                    </div>
                </van-col>
                <van-col span='3'>
                    <!-- <div class="onSearch"  @click="onService"> -->
                    <div class="search-text" @click.stop="searchSbumit">搜索</div>
                    <!-- <div class="onSearch"  @click="getPhone">
                       <div class="iconService"> 
                            <img src="../assets/img/indexkefu.png" alt="" >
                        </div>
                    </div> -->
                </van-col>
            </van-row>
        </div>
        <!-- <van-row>
            <van-col span='4'>
                <div @click="locationInof" class="locationDivShow">
                    <span>
                        <svgicon name="Location1_3x" class="fa p-marker"></svgicon>
                    </span>
                    <span class="locationTitleShow">{{location}}</span>
                </div>
            </van-col>
            <van-col span='17'>
                <div class="serach-formShow" >
                    <span>
                        <svgicon name="search1_3x" class="fa fa-search"></svgicon>
                    </span>
                        <form action="javascript:;" id="searchFrom" @submit="searchSbumit">
                        <input class= "search_in search-input" type="search" placeholder="请输入搜索关键词" v-model='value'/>
                    </form>
                </div>
            </van-col>
            <van-col span='3' >
                <div class="onSearch"  @click="onService">
                    <img src="../assets/img/customerservice1_3x.png" alt="" class="iconService">>
                </div>
            </van-col>
        </van-row> -->
        <!-- 客服显示 -->
        <van-dialog
                v-model="dialogShow"
                confirmButtonText='取消'
                >
            <van-row class="dialog-box">
                <van-col span='12'>
                    <div @click="getPhone" class="getPhone">
                        <img src="../assets/img/dianhua.png" alt="">
                        <span>致电平台</span>
                    </div>
                </van-col>
                <van-col span='12'>
                    <div @click="contactService" class="contactService">
                        <img src="../assets/img/kefu1-1.png" alt="">
                        <span>联系客服</span>
                    </div>
                </van-col>
            </van-row>
        </van-dialog>
    </div>
</template>

<script>
    import 'font-awesome/css/font-awesome.css';
    import $ from 'jquery';
    import Vue from 'vue';
    import {location} from '../assets/js/commonAPI.js';
    const notice = () => import('./notice.vue');

    export default {
        data(){
            return{
                value:'',
                location:'定位',
                region: 322,
                dialogShow: false,          //显示客服
                configId: '',                //客服id

                isClose: false,  //平台是否关闭， 关闭后，有提示，所有商品不可以提交订单
                isNotice:false,
                timeSlot: ''  //平台停止营业的时间段（24小时形式显示）
            }
        },
        created(){
            let _this = this;
            //调用方法，判断平台是否开启
            this.platformIsClose()
            // 设置顶部到达一定位置取消显示

            let wapres = localStorage.getItem('wapres');
            let wCityInfo = localStorage.getItem('cityInfo');

            if(this.$appFunc.prototype.isEmpty(wapres)){
                location().then(res=>{
                    //===============================显示默认定位地址=================================
                    let address = res;
                    let city = address.address.city;
                    let lastIndex = city.length - 1;
                    let cityInfo = city.charAt(lastIndex) == "市" ? city.slice(0, lastIndex) : city;
                    this.location = cityInfo

                    localStorage.setItem('bdPoint',JSON.stringify(res.point));
                    //==============================================================================
                    this.$post('/?a=syncLocation',{
                        city: city,
                        x:res.point.lng,
                        y:res.point.lat
                    })
                    .then((res)=>{
                        switch(res.code){
                            case 0:
                                let City = res.data.region_name;
                                let LastIndex = City.length - 1;
                                let cityInfo = City.charAt(LastIndex) == "市" ? City.slice(0, LastIndex) : City;
                                this.location = cityInfo
                                this.region = res.data.region_id
                                
                                localStorage.setItem('cityInfo',cityInfo)
                                this.$emit('wapres',this.region);
                                break;
                            default:
                                break;
                        }
                    })
                })
                .catch(err=>{
                    console.log(err)
                })
            }else{
                //====>接收地址栏信息
                this.region = wapres;
                this.location = wCityInfo;
                this.$emit('wapres',wapres);
            }
            // 获取客服id
            /*this.$post('/?c=user&a=getHx',).then((res) => {
                if(res.code == 0){
                    this.configId = res.data;
                }
            })*/

        },
        mounted(){
            
        },
        activated(){
            let _this = this;
            let wapres = localStorage.getItem('wapres');
            let wCityInfo = localStorage.getItem('cityInfo');
            if(this.$appFunc.prototype.isEmpty(wapres)){
                location().then(res=>{
                    //===============================显示默认定位地址=================================
                    let address = res;
                    let city = address.address.city;
                    let lastIndex = city.length - 1;
                    let cityInfo = city.charAt(lastIndex) == "市" ? city.slice(0, lastIndex) : city;
                    this.location = cityInfo

                    localStorage.setItem('bdPoint',JSON.stringify(res.point));
                    //==============================================================================
                    this.$post('/?a=syncLocation',{
                        city: city,
                        x:res.point.lng,
                        y:res.point.lat
                    })
                    .then((res)=>{
                        switch(res.code){
                            case 0:
                                let City = res.data.region_name;
                                let LastIndex = City.length - 1;
                                let cityInfo = City.charAt(LastIndex) == "市" ? City.slice(0, LastIndex) : City;
                                this.location = cityInfo
                                this.region = res.data.region_id
                                
                                localStorage.setItem('cityInfo',cityInfo)

                                this.$emit('wapres',this.region);
                                break;
                            default:
                                break;
                        }
                    })
                })
                .catch(err=>{
                    console.log(err)
                })
            }else{
                console.log('22222')
                //====>接收地址栏信息
                this.region = wapres;
                this.location = wCityInfo;
                this.$emit('wapres',wapres);
            }
        },
        methods:{
            //去搜索页
            toSearchPage(){
                this.$router.push({
                    path:'/searchStore',
                    query:{
                        'name': this.value,
                        'region':this.region,
                    }
                })
            },
            topScroll(){
                let _this = this;
                $(window).bind("scroll", function () {
                    var sTop = $(window).scrollTop();
                    var sTop = parseInt(sTop);
                    if (sTop <=46) {
                        $("#scrollSearchDiv").removeClass('position-fiexd mymove1');
                        $("#scrollSearchDiv").removeClass('position-fiexd mymove2');
                        _this.$emit('scrollTopHide');
                    }
                    else {
                        if(_this.isClose){
                            $("#scrollSearchDiv").addClass('position-fiexd mymove1');
                        }else if(_this.isNotice){
                            $("#scrollSearchDiv").addClass('position-fiexd mymove1');
                        }else{
                            $("#scrollSearchDiv").addClass('position-fiexd mymove2');
                        }
                        _this.$emit('scrollTopShow');
                    } 
                });
            },
            //是否有公告
            getNotice(val){
                this.isNotice = val;
            },
            //获取平台是否关闭
            platformIsClose(){
                this.$post('/?a=isClose',{
                }).then((res)=>{
                    switch(res.code){
                        case 0:
                            //true, 关闭
                            //false， 未关闭
                            this.isClose = res.data.is_close;
                            if(this.isClose) {
                                this.timeSlot = '未到营业时间，'+res.data.end+ '点开始营业';
                            }
                            this.topScroll();
                            break;
                        default:
                            break;
                    }
                })                
            },
            // 软键盘的搜索
            searchSbumit(){
                 if(this.value == ''){
                    this.$toast('搜索不能为空');
                }else{
                    //====>页面之间传值
                    // localStorage.setItem('searchInputVal',this.value);
                    // sessionStorage.setItem('searchInputVal',this.value);
                    this.$router.push({
                        path:'/searchStore',
                        query:{
                            'name': this.value,
                            'region':this.region,
                        }
                    })
                }
            },
            
            
            // 点击客服
            onService(){
                this.dialogShow = true;
            },
            // 获取电话
            getPhone() {
                window.location.href='tel:4001288566';
                this.dialogShow = false;
            },
            // 点击跳转方法
            contactService() {
                let _this = this;
                this.dialogShow = false;
                easemobim.bind({configId: _this.configId});
            },
            locationInof(){
                this.$router.push({
                    path:'/location'
                })
            }
        },
        components:{
            notice,
        }
    }
</script>

<style scoped>
    .dflex{display: flex;}
    *{
        box-sizing: border-box;
        -webkit-box-sizing: border-box;
        /*-webkit-user-select: none; */
        outline: none;
        -webkit-tap-highlight-color: transparent;
    }
    .search-bar{
        text-align: center;
        color: #fff;
        background: rgb(238, 45, 45);
        position: relative;
        width: 100%;
        z-index: 1005;
        overflow: hidden;
    }
    .position-fiexd.mymove1{
        position: fixed;
        top: 0;
        animation: mymove1 .6s ease-in-out 0s 1 alternate forwards;
    }
    .position-fiexd.mymove2{
        position: fixed;
        top: 0;
        animation: mymove2 .6s ease-in-out 0s 1 alternate forwards;
    }
    @keyframes mymove1{
        from{opacity: 0.7;height:0;}
        to{opacity: 1;height:83px;}
    }
    @keyframes mymove2{
        from{opacity: 0.7;height:0;}
        to{opacity: 1;height:49px;}
    }
     .search-bar-div{
        padding: 7px 0
     }
     .search-bar-show{
        display:none;
        text-align: center;
        color: #fff;
        position: fixed;
        z-index: 1003;
        top: 0px;
        width: 100%;
        background: rgb(238, 45, 45);
     }
    .search-left-button i{
        font-size: 18px;
    }

    .all-notice {
        margin: 0;
        font-size: 14px;
        padding: 10px 0;
        background-color: #ffb912;
    }

    .locationDiv{
        min-width: 50px;
        height: 1.7rem;
        line-height: 1.7rem;
        margin-left: .6rem;
        border-radius: 5px;
        padding: 0 3px;
    }
    .locationDiv span{margin: auto;}
    .locationDivShow{
        height: 1.7rem;
        line-height: 1.7rem;
        margin-left: .6rem;
        border-radius: 5px;
        padding: 0 3px;
        background:rgba(250,224,224,.4);
    }
    .locationDiv .locationTitle{
        color:#fff;
        font-size: 12px;
    }
    .locationDivShow .locationTitleShow{
        color:#666666;
        font-size: 12px;
    }
    .p-marker{
        width: .7rem;
        height: .8rem;
    }
    .fa-search{
        width: .7rem;
        height: .7rem;
        margin-left: .5rem;
        margin-top: .5rem;
    }
    .fa-searchshow{
        width: .9rem;
        height: .9rem;
        margin-left: .5rem;
        margin-top: .5rem;
    }
    .serach-form{
        text-align: right;
        padding-left: 15px;
        position: relative;
    }
    .serach-formShow{
        position: relative;
    }
    .serach-formShow input::placeholder{
        color:#fff;
    }
    .serach-formShow input{
        width: 100%;
        height: 1.7rem;
        border: none;
        font-size: 12px;
        text-indent: 1.7rem;
        border-radius: .25rem;
        line-height: normal;
        background: #C3C3C3;
    }
    .serach-form input{
        width: 100%;
        height: 1.7rem;
        border: none;
        font-size: 12px;
        text-indent: 1.7rem;
        border-radius: 5px;
        line-height: normal;
        background: rgba(255,255,255,.9);
    }
    .serach-form .search-indiv{
        color:black;
    }
    .serach-form .search-input{
        background: #C3C3C3;
    }
    .serach-formShow span{
        position: absolute;
        left: .8rem;
        color: #777;
    }
    
    .serach-form span{
        position: absolute;
        left: .8rem;
        color: #777;
    }
    .search-text {
        font-size: 12px;
        height: 1.7rem;
        line-height: 1.7rem;
    }
    /* .onSearch>span{
      font-size: 16px;
    }
    .iconService{
        color: #fff;
        font-size: 1.2rem;
        height: 1.7rem;
        margin-right: .6rem;
        line-height: 1.7rem;
        display: flex;
        align-items: center;
        justify-content: center
    }
    .iconService>img{
        width: 24px;
        display: block;
    } */
    
    /* 电话弹出框样式 */
    .dialog-box {
        height: 3rem;
        line-height: 3rem;
        font-size: 20px;
        text-align: center;
    }
</style>

<style lang="less">
    .search .van-dialog__footer{
        .van-button{
            background-color: #f2f2f2;
            font-size: 14px;
            color: #999;
        }
    }
</style>

<style lang="less" scoped>
    .van-dialog{
        border-radius: 10px;
    }
    .dialog-box{
        .getPhone{
            display: flex;
            font-size: 16px;
            color: #424242;
            img{
                margin: auto;
                display: block;
                height: 22px;
                margin-right: 0;
            }
            span{
                margin: auto;
                margin-left: 5px;
            }
        }
        .contactService{
            display: flex;
            font-size: 16px;
            color: #424242;
            img{
                margin: auto;
                display: block;
                height: 22px;
                margin-right: 0;
            }
            span{
                margin: auto;
                margin-left: 5px;
            }
        }
    }
</style>
