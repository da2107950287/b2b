<template>
    <div>
        <div class="coupon-box" @click="goToNewPage(item)">
            <div class="dflex coupon-top-box">
                <div class="coupon-top-left-box" :class="{'active': active == 0}">
                    <div class="dflex coupon-top-left-money-box">
                        <span class="coupon-top-left-yen fz_14">&yen;</span>
                        <span class="coupon-top-left-money">{{item.discount_money}}</span>
                    </div>
                    <div class="coupon-top-left-remake fz_14" v-if="item.coupon_type == 1">满{{item.min_amount}}元可用</div>
                    <div class="coupon-top-left-remake fz_14" v-else>无门槛</div>
                </div>
                <div class="coupon-top-right-box" v-if="item.ru_id <= 0">
                    <div class="coupon-top-right-title fz_16" :class="{'active': active == 0}">{{item.name}}</div>
                    <div class="coupon-top-right-content fz_12" :class="{'active': active == 0}">{{item.describe}}</div>
                </div>
                <div class="coupon-top-right-box" v-else>
                    <div class="dflex coupon-top-right-title fz_16" :class="{'active': active == 0}">
                        <div class="coupon-top-right-name">{{item.name}}</div>
                        <div class="coupon-top-right-logo">
                            <img :class="{'active':active == 0}" :src="item.shop_logo" alt="">
                        </div>
                    </div>
                    <div class="coupon-top-right-content fz_12" :class="{'active': active == 0}">{{item.describe}}</div>
                </div>
            </div>
            <div class="dflex rules-box">
                <div class="rules-left"></div>
                <div class="rules-dotted"></div>
                <div class="rules-right"></div>
            </div>
            <div class="dflex coupon-bottom-box">
                <div v-if="item.coupon_type == 1" class="coupon-bottom-time fz_12 color_808080">有效期：{{item.start_time}}-{{item.end_time}}</div>
                <div class="coupon-bottom-button fz_12 active" v-if="active == 0">立即使用</div>
                <div class="coupon-bottom-button fz_12" v-else>立即使用</div>
            </div>
        </div>
        <div v-if="lock===1 && (index - 9)%10 === 0 && (index - 9)/10 === (page-2)" class="business-loading">
            <vant-loading :vertical="false" text="努力加载中..."></vant-loading>
        </div>
    </div>
</template>
<script>
import "../../../assets/css/commonstyle.css"
import vloading from "../../vloading.vue";
export default {
    // props:['item','active'],

    props: {
        item: Object,
        active: {
            type: Number,
            default: 0
        },
        page: {
            type: Number,
            default: 2,
        },
        lock: {
            type: Number,
            default: 0,
        },
        index: {
            type: Number,
        }
    },
    data() {
        return {}
    },
    components: {
        vloading
    },
    created() {},
    methods: {
        //批发分类
        // toCate(){
        //     this.$router.push({
        //         path:'/wholesale',
        //     })
        // },
        // //某个店铺
        // toShop(ru_id){
        //     this.$router.push({
        //         path:'/shop',
        //         query:{
        //             index:ru_id
        //         }
        //     })
        // },
        //点击 立即使用，进入新页面
        goToNewPage(val) {
            if(this.active != 0) {
                return
            }

            if (val.limit_type && val.limit_type > 0) {
                //进入指定券专用商品列表页
                this.$router.push({ path: '/couponAssign', query: { coupon_id: val.coupon_id } });
            }else {
                this.$router.push({
                    path: '/wholesale'
                })
            }
        }
    },
}

</script>
<style lang="less" scoped>
.coupon-box {
    background-color: #fff;
    margin: 10px 12px;
    border-radius: 5px;
    .coupon-top-box {
        padding: 30px 15px 15px;
        .coupon-top-left-box {
            max-width: 100px;
            margin-right: 12px;
            flex: 1;
            color: #808080;
            .coupon-top-left-money-box {
                margin-bottom: 12px;
                .coupon-top-left-yen {
                    margin: auto;
                    margin-right: 0;
                    margin-bottom: 0;
                }
                .coupon-top-left-money {
                    font-size: 34px;
                    margin: auto;
                    margin-bottom: 0;
                    margin-left: 0;
                    line-height: 28px;
                    font-weight: 800;
                }
            }
            .coupon-top-left-remake {
                text-align: center;
            }
        }
        .coupon-top-left-box.active {
            color: #ee2d2d;
        }
        .coupon-top-right-box {
            flex: 1;
            .coupon-top-right-title {
                margin-bottom: 12px;
                color: #808080;
                .coupon-top-right-name {}
                .coupon-top-right-logo {
                    width: 40px;
                    height: 40px;
                    margin: auto;
                    margin-right: 5px;
                    margin-top: -15px;
                    img {
                        width: 100%;
                        height: 100%;
                        display: block;
                    }
                    img.active {
                        -webkit-filter: grayscale(100%);
                        -moz-filter: grayscale(100%);
                        -ms-filter: grayscale(100%);
                        -o-filter: grayscale(100%);
                        filter: grayscale(100%);
                        filter: gray;
                    }
                }
            }
            .coupon-top-right-title.active {
                color: #212222;
            }
            .coupon-top-right-content {
                color: #808080;
                text-align: justify;
            }
            .coupon-top-right-content.active {
                color: #424242;
            }
        }
    }
    .rules-box {
        .rules-left {
            width: 8px;
            height: 16px;
            background-color: #f2f2f2;
            margin: auto 0;
            border-radius: 0 20px 20px 0;
        }
        .rules-dotted {
            width: 100%;
            border-top: 1px dashed #dedede;
            margin: auto 0;
        }
        .rules-right {
            width: 8px;
            height: 16px;
            background-color: #f2f2f2;
            margin: auto 0;
            border-radius: 20px 0 0 20px;
        }
    }
    .coupon-bottom-box {
        padding: 0 15px 3px;
        position: relative;
        top: -2px;
        .coupon-bottom-time {
            margin: auto;
            margin-left: 10px;
        }
        .coupon-bottom-button {
            border-radius: 10px;
            border: 1px solid #808080;
            padding: 1px 5px;
            margin: auto;
            margin-right: 0;
            color: #808080;
            opacity: 0;
        }
        .coupon-bottom-button.active {
            border: 1px solid #ee2d2d;
            color: #ee2d2d;
            opacity: 1;
        }
    }
}

.business-loading {
    padding: 10px;
}

</style>
