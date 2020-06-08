<template>
    <div class="main">
        <!-- 顶部导航条 -->
        <navbar type="searchText" @search="search" @clickleft="onClickLeft" :value="inputVal"></navbar>
        
        <!-- 内容显示区 -->
        <store-list ref="store" :is-fixed="true"></store-list>
    </div>
</template>

<script>
export default {
    name: 'searchStore',
    components: {
        navbar: () => import('./navbar/nav.vue'),
        storeList: () => import('./indexBanner/storeList.vue')
    },
    data(){
        return {
            index: 0, //0-推荐+历史 1-搜索联想 2-商店列表
            inputVal: ''
        }
    },
    activated(){
        //解决keep-alive 存在缓存
        this.inputVal = this.$route.query.name;
        if(this.$refs.store) {
            this.$refs.store.search(this.inputVal);
        }
    },
    methods: {
        onClickLeft(){
            // this.$router.go(-1);
            this.$router.push('/index');
        },
        //搜索
        search(val){
            this.inputVal = val;
            this.$refs.store.search(val);
        }
    }
}
</script>

<style scoped>
    .main {
        height: 100%;
    }
</style>