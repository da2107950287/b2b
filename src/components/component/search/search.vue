<template>
<div class="search">
    <div v-if="type==1" class="search-div">
        <form action="javascript:;" id="searchFrom" @submit="searchSbumit" class="search-froms">
            <svgicon name="search_3x" class="fa"></svgicon>
            <input class= "search_in" type="search" placeholder="请输入搜索关键词" v-model="value" @keyup.enter="searchVal"/>
        </form>
    </div>
    <div v-if="type==2" class="search-div search-divs" >
        <div class="search-img" @click="colback">
            <img src="../../../assets/img/fanhui.png" alt=""><div>返回</div>
        </div>
        <form action="javascript:;" id="searchFrom" @submit="searchSbumitTwo" class="search-from">
            <svgicon name="search_3x" class="fa"></svgicon>
            <input class= "search_in" type="search" placeholder="请输入搜索关键词" v-model="valueTwo" @keyup.enter="searchValTwo"/>
        </form>
    </div>
</div>
    
</template>
<script>
import Vue from 'vue'
export default {
    props:['secondval','type'],
    data(){
        return{
            value:'',
            valueTwo:'',
        }
    },
    watch:{
        secondval(val) {
            this.value = val;
            console.log(this.secondval)
        },
    },
    methods:{
        // type为1的时候
        searchSbumit(){
            this.$emit('onsearch',this.value)
            console.log(this.value)
        },
        searchVal(){
            this.$emit('searchval',this.value);
        },
        // type为2的时候
        searchSbumitTwo(){
            this.$emit('onsearchTwo',this.valueTwo)
        },
        searchValTwo(){
            this.$emit('searchvalTwo',this.valueTwo);
        },
        colback(){
            this.$router.go(-1)
        }
    },
}
</script>
<style lang="less" scoped>
.search{
    background-color:#fff;
}
.search-divs{
    margin-right:12px;
    padding: 7px 0 7px 13px;
}
.search-div{
    display: flex;
    align-items: center;
    background-color: #fff;
    .search-img{
        font-size: 12px;
        display:flex;
        align-items: center;
        color:#808080;
        margin-right: 15px;
        >img{
            width: 8px;
            height: 15px;
            margin-right: 6px;
        };
    }
    .search-from{
        border: none;
        display: flex;
        background: #f2f2f2;
        // margin-right: 46px;
        flex-grow: 1;
        align-items: center;
        height: 30px;
        border-radius:5px;
        .fa{
            height: 17px;
            margin-right: 7px;
            margin-left: 5px;
        }
        .search_in{
            border: none;
            font-size: 14px;
            background: #f2f2f2;
            width: 100%;
        }
    }
    .search-froms{
        border: none;
        display: flex;
        background: #f2f2f2;
        // margin-right: 46px;
        flex-grow: 1;
        align-items: center;
        height: 30px;
        border-radius:5px;
        .fa{
            height: 17px;
            margin-right: 7px;
            margin-left: 5px;
        }
        .search_in{
            border: none;
            font-size: 14px;
            background: #f2f2f2;
            width: 100%;
        }
    }
}
</style>


