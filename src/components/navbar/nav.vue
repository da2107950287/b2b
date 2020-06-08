<template>
    <div>
        <div id="navbar">
            <div v-if="type == 'left'">
                <van-nav-bar
                    :title='title'
                    left-arrow
                    @click-left="onClickLeft"
                >
                    <van-icon slot="left" class="left-icon"><img src="../../assets/img/jiantou.png" alt=""><span>返回</span></van-icon>
                </van-nav-bar>
            </div>
            <div v-else-if="type == 'right'">
                <van-nav-bar
                    :title='title'
                    right-arrow
                    @click-right="onClickRight"
                >
                    <van-icon name="arrow-right" slot="right" class="right-icon"><span>提交</span></van-icon>
                </van-nav-bar>
            </div>
            <div v-else-if="type == 'both'">
                <van-nav-bar
                    :title='title'
                    left-arrow
                    right-arrow
                    @click-left="onClickLeft"
                    @click-right="onClickRight"
                >
                    <van-icon slot="left" class="left-icon"><img src="../../assets/img/jiantou.png" alt=""><span>返回</span></van-icon>
                    <van-icon name="arrow-right" slot="right" class="right-icon"><span>{{rightTxt}}</span></van-icon>
                </van-nav-bar>
            </div>
            <div v-else-if="type == 'bothRight'" class="">
                <van-nav-bar
                    :title='title'
                    left-arrow
                    right-arrow
                    @click-left="onClickLeft"
                    @click-right="onClickMore"
                >
                    <van-icon slot="left" class="left-icon"><img src="../../assets/img/jiantou.png" alt=""><span>返回</span></van-icon>
                    <van-icon slot="right" class="right-more-icon" name="arrow-right"><img src="../../assets/img/more.png" alt=""></van-icon>
                </van-nav-bar>
            </div>
            <div v-else-if="type == 'clear'">
                <van-nav-bar
                    :title='title'
                >
                </van-nav-bar>
            </div>
            <div v-else-if="type == 'search'" class="search-box">
                <div class="van-nav-bar van-hairline--bottom">
                    <div class="van-nav-bar__left" @click="onClickLeft">
                        <i class="left-icon van-icon van-icon-undefined">
                            <img src="../../assets/img/jiantou.png" alt="">
                            <span>返回</span>
                        </i>
                    </div>
                    <div class="van-nav-bar__title van-ellipsis">
                        <form class="search-both-input" @submit="search" action="javascript:;">
                            <label for="nav-search-input"><img src="../../assets/img/search.png" alt=""></label>
                            <input type="search" id="nav-search-input" placeholder="请输入搜索关键词" @keyup.enter="search" v-model="val">
                        </form>
                    </div>
                </div>
            </div>
            <div v-else-if="type == 'searchBoth'" class="search-box">
                <div class="van-nav-bar van-hairline--bottom">
                    <div class="van-nav-bar__left" @click="onClickLeft">
                        <i class="left-icon van-icon van-icon-undefined">
                            <img src="../../assets/img/jiantou.png" alt="">
                            <span>返回</span>
                        </i>
                    </div>
                    <div class="van-nav-bar__title van-ellipsis">
                        <form class="search-both-input" @submit="search(searchVal)" action="javascript:;">
                            <label for="nav-search-input"><img src="../../assets/img/search.png" alt=""></label>
                            <input type="search" id="nav-search-input" placeholder="请输入搜索关键词" @input="searchInput" v-model="val">
                        </form>
                    </div>
                    <div class="van-nav-bar__right" @click="onClickMore">
                        <i class="right-more-icon van-icon van-icon-arrow-right">
                            <img src="../../assets/img/more.png" alt="">
                        </i>
                    </div>
                </div>
            </div>
            <div v-else-if="type == 'searchText'" class="search-box">
                <div class="van-nav-bar van-hairline--bottom">
                    <div class="van-nav-bar__left" @click="onClickLeft">
                        <i class="left-icon van-icon van-icon-undefined">
                            <img src="../../assets/img/jiantou.png" alt="">
                            <span>返回</span>
                        </i>
                    </div>
                    <div class="van-nav-bar__title van-ellipsis">
                        <form class="search-both-input" action="javascript:;">
                            <label for="nav-search-input"><img src="../../assets/img/search.png" alt=""></label>
                            <input type="search" id="nav-search-input" placeholder="找你喜欢的" @keyup.enter.stop="searchText" v-model="val">
                        </form>
                    </div>
                    <div class="van-nav-bar__right" @click.stop="searchText">
                        搜索
                    </div>
                </div>
            </div>
            <more :show="moreShow" @closeMore="closeMore"></more>
        </div>
        <div class="navbarHeight"></div>
    </div>
</template>
<script>
import more from './more.vue'
export default {
    props:['title','type','rightTxt','value'],
    data(){
        return{
            moreShow:false,
            val:'',
        }
    },
    created(){
        this.val = this.value;
    },
    methods:{
        onClickLeft(){
            this.$emit('clickleft')
        },
        onClickRight(){
            this.$emit('clickRight')
        },
        onClickMore(){
            if(this.moreShow){
                this.moreShow = false;
            }else{
                this.moreShow = true;
            }
        },
        closeMore(){
            this.moreShow = false;
        },
        search(val){
            this.$emit('search',val);
        },
        searchText(){
            /*if(!this.val) {
                this.$toast('搜索不能为空');
                return
            }*/
            this.$emit('search',this.val);
        },
        searchInput(){
            this.$emit('searchInput',this.val);
        },
        searchValTwo(val){
            this.$emit('searchVal',val);
        },
    },
    watch:{
        value(res){
            this.val = this.value;
        }
    },
    computed:{
        searchVal(){
            this.val = this.value;
            return this.value;
        }
    },
    activated(){
        this.val = this.value;
        // console.log(this.value);
    },
    components:{
        more,
    } 
}
</script>

<style scoped lang="less">
    #navbar{
        position: fixed;
        z-index: 1002;
        width: 100%;
        background-color: #ffffff;
    }
    .navbarHeight{
        height: 46px;
    }
    #navbar .van-nav-bar__left{
        left: 12px;
    }
    #navbar .van-nav-bar__left,.van-nav-bar__right{
        height: 100%;
        display: flex;
    }
    #navbar .left-icon,.right-icon{
        margin: auto;
        font-size: 22px;
        line-height: 22px;
        color: #333;
        display: flex;
        img{
            height: 15px;
            display: block;
            margin: auto;
            transform:rotate(180deg);
            margin-right: 5px;
        }
        span{
            font-size: 14px;
            display: block;
            margin: auto;
        }
    }
    #navbar .right-icon{
        color: #EE2D2D;
    }
    #navbar .right-more-icon{
        color: #EE2D2D;
        width: 20px;
        display: flex;
        img{
            display: block;
            margin: auto;
            width: 100%;
            margin-right: 5px;
        }
    }
    #navbar .search-box .van-nav-bar{
        display: flex;
        .van-nav-bar__title{
            flex: 1;
            display: flex;
            width: 100%;
            position: relative;
            left: 10px;
            height: 100%;
        }
        .search-both-input{
            display: flex;
            width: calc(100% - 10px);
            border-radius: 5px;
            background-color: #eee;
            height: 30px;
            margin: auto;
            padding-right: 10px;
            label{
                display: flex;
                img{
                    width: 15px;
                    display: block;
                    margin: auto 10px;
                }
            }
            input{
                width: 100%;
                display: block;
                border:0;
                background-color: unset;
                font-size: 14px;
                line-height: normal;
                color: #666;
            }
        }
    }
</style>