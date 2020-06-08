<template>
    <div>
        <!-- 标题 -->
        <van-nav-bar
            title='农联集配'
            left-arrow
            class="company-profile-bar"
            @click-left='goPreviousPage'
        />
        <!-- 公司简介 -->
        <div class="company-profile">
            <div class="company-title">农联高科科技发展有限公司</div>
            <div class="company-introduction">
                {{introduction}}
            </div>
        </div>
        <!-- 地图 -->
        <div class="company-map">
            <div  id="allmap" style="width:100%;height:100%"></div>
        </div>


        <div class="company-foot">
            <div class="company-address">
                <span>公司地址:</span>&nbsp;{{address}}
            </div>
            <div class="company-contact-mode" @click="clalPhone">
                <span>联系电话:</span>&nbsp;{{phone}}
                <i class="fa fa-phone-square" aria-hidden="true"></i>
            </div>
        </div>
        <div class="company-foot">
            <div class="company-foot-button-info">{{footInfo}}</div>
            <van-button size='large' class="company-foot-button" @click="companyFootButton">本地物价趋势</van-button>
        </div>
    </div>
</template>

<script>
    import 'font-awesome/css/font-awesome.css'
    export default {
        data() {
            return {
                introduction:'农联高科旗下的农联商场是是四川最具规模和专业化的农产品在线交易综合服务平台,致力于服务三农,打造（互联网+农业）第一行业网站品牌.网站主要提供农副产品网上展销,农产品供求信息发布,农产品网购,农产品价格行情,农产品网上安全交易,农产品批发,团购,农业动态、农业技术指导等服务,曾被称为永不休息的网上农贸市场!',
                address:'成都市高新区环球中心N1',
                phone:'4001288566',
                footInfo:'农联集团公司担保产品品质，商务合作支持、政府集采等大宗采购，如有意向请致电。'
            }
        },
        mounted(){
            this.getMap();
        },
        methods:{
            goPreviousPage(){
                this.$router.go(-1);
            },
            clalPhone(){
                window.location.href = 'tel:' + this.phone;
            },
            companyFootButton(){
                this.$router.push({
                    path:'/priceTrend'
                })
            },
            getMap(){
                // 百度地图API功能
                var map = new BMap.Map("allmap");
                var point = new BMap.Point(116.331398,39.897445);
                map.centerAndZoom(point,12);
                // 创建地址解析器实例
                var myGeo = new BMap.Geocoder();
                // 将地址解析结果显示在地图上,并调整地图视野
                myGeo.getPoint("成都环球中心N1", function(point){
                    if (point) {
                        map.centerAndZoom(point, 16);
                        map.addOverlay(new BMap.Marker(point));
                    }else{
                        alert("您选择地址没有解析到结果!");
                    }
                }, "北京市");

            }
        }
    }
</script>

<style scoped>
    .company-profile-bar{
        border-bottom: 1px solid #e0e0e0;
    }
    .company-profile{
        padding: 0 .6rem;
    }
    .company-title{
        padding-top: .5rem;
        text-align: center;
        font-size: 16px;
        font-weight: bold;
    }
    .company-introduction{
        padding-top: .5rem;
        font-size: 14px;
    }
    .company-foot{
        padding-top: .5rem;
    }
    .company-address,
    .company-contact-mode{
        padding-top: .5rem;
        font-size: 12px;
        color: #777;
        text-align: center;
    }
    .company-foot{
        padding: 0 .6rem;
        margin-top: .5rem;
    }
    .company-foot-button-info{
        font-size: 12px;
    }
    .company-foot-button{
        margin-top: .5rem;
        color: #fff;
        background-color: #d1442b;
        border: 1px solid #d1442b;
    }
    /* 地图 */
    .company-map{
        width: 100%;
        height: 14rem;
        text-align: center;
        background-color: #d1442b;
    }
    .company-map div{
        display: inline-block;
    }
</style>