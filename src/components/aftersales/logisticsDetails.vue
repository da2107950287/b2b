<template>
    <div>
        <!-- 头部导航 -->
        <van-nav-bar
            left-arrow
            title='进度跟踪'
            @click-left="goPreviousPage"
            class="comment-info-bar"
        />
        <div class="logistics_box">
            <div class="logisticsBox" v-if="type == 'order'">
                <div class="logisticsContentBox dflex " v-for="(item,index) in lists" :key="index">
                    <div class="logisticsLine" v-show="index < lists.length-1"></div>
                    <div class="logisticsRadius " :class="{'active':index == 0}"><span></span></div>
                    <div class="logisticsContent">
                        <div class="logisticsTime fz_12">{{item.log_time}}</div>
                        <div class="logisticsText fz_14" v-html="item.action_note"></div>
                    </div>
                </div>
            </div>
            <div class="logisticsBox" v-else>
                <div class="logisticsContentBox dflex " v-for="(item,index) in lists" :key="index">
                    <div class="logisticsLine" v-show="index < lists.length-1"></div>
                    <div class="logisticsRadius " :class="{'active':index == 0}"><span></span></div>
                    <div class="logisticsContent">
                        <div class="logisticsTime fz_12">{{item.add_time}}</div>
                        <div class="logisticsText fz_14" v-html="item.content"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue'
    import {post} from '../../assets/js/commonAPI.js'
    Vue.prototype.$post = post;
    export default {
        data() {
            return{
                active:0,
                lists:[],
                type : '',
            }
        },
        created(){
            this.type = this.$route.query.type;
            if(this.$route.query.type == 'order'){
                let logList = localStorage.getItem('logList');
                this.lists  = JSON.parse(logList);
            }else{
                let logList = localStorage.getItem('afterlogList');
                this.lists  = JSON.parse(logList);
            }
        },
        methods:{
            goPreviousPage(){
                this.$router.go(-1);
            },
        }
    }
</script>

<style>
    html,body{background-color: #f2f2f2;}
    .van-nav-bar .van-icon{color: #333;}
</style>
<style lang="less" scoped>
    .color_424242{color:#424242;}
    .color_808080{color:#808080;}
    .color_EE2D2D{color:#EE2D2D;}
    .fz_12{font-size: .64rem;line-height: .64rem;}
    .fz_14{font-size: .75rem;line-height: .75rem;}
    .fz_16{font-size: .85rem;line-height: .85rem;}
    .dflex{display: flex;}

    .logistics_box{
        padding: 1.6rem .69rem;
        background-color: #fff;
    }
    .logisticsBox{
        position: relative;
        .logisticsLine{
            position: absolute;
            width: 1px;
            height: 100%;
            top: 0;
            left: 6px;
            background-color: #ccc;
            z-index: 1;
        }
        .logisticsContentBox{
            color: #212121;
            position: relative;
            padding-bottom: 35px;
            .logisticsRadius{
                margin-right: 30px;
                min-width: 12px;
                position: relative;
                z-index: 2;
                span{
                    width: 8px;
                    height: 8px;
                    border-radius: 8px;
                    background-color: #ccc;
                    display: block;
                    margin: auto;
                }
            }
            .logisticsRadius.active{
                span{
                    width: 12px;
                    height: 12px;
                    border-radius: 12px;
                    background-color: #EE2D2D;
                }
            }
            .logisticsContent{
                margin-top: -2px;
                .logisticsTime{
                    margin-bottom: 10px;
                }
                .logisticsText{
                    line-height: 21px;
                }
            }
        }
    }
    .logisticsContentBox:first-child .logisticsContent{
        margin-top: 0;
    }
    .logisticsContentBox:last-child{
        padding-bottom: 0;
    }
</style>