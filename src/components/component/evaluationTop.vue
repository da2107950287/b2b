<template>
    <div>
        <!-- 只有一个图片的时候显示 -->
        <div class="write_top " v-if="addList.len<=1 &&addList.len>0" >
            <div v-for="(item,index) in addList.list" :key="index" class="dflex">
                <div class="goods_img goods_attr">
                    <img :src="item.goods_img" alt="">
                </div>
                <div class="goods_name">{{item.goods_name}}</div>
            </div>
            
        </div>
        <div class="write_top dflex" v-if="addList.len<=4 &&addList.len>1">
            <div v-for="(item,index) in addList.list" :key="index" class="goods_attr">
                <div class="goods_img">
                    <img :src="item.goods_img" alt="">
                </div>
           </div>
            <div class="goods_name">共{{addList.len}}款商品</div>
        </div>    
        <div class="write_top dflex" v-if="addList.len>4">
            <div v-for="(item,index) in addList.list" :key="index" class="goods_attr">
                <div class="goods_img">
                    <img :src="item.goods_img" alt="">
                </div>
           </div>
            <div class="goods_name">等{{addList.len}}款商品</div>
        </div>
    </div>
</template>
<script>
import Vue from 'vue';
import {post} from '../../assets/js/commonAPI'
import answer from '../answer/answer'
Vue.prototype.$post = post;
export default {
    data(){
        return{
             addList:{},
        }
    },
    
    created(){
        let addSaleItem=localStorage.getItem('addSaleItem')
        if(addSaleItem){
            this.addList=JSON.parse(addSaleItem)
        }
    },
    
    components:{
      answer,
    }
}
</script>
<style lang="less" scoped>
.dflex{
    display: flex;
    justify-content: flex-start;
}
.write_top{
    height:60px;
    padding:10px 12px;
    border-bottom: 1px solid #f2f2f2;
    background: #FFF;
    .goods_attr{
        max-width: 60px;
        height: 60px;
        margin-right: 10px;
        overflow: hidden;
        border-radius: 5px;
        flex:1;
    }
    .goods_one_img{
        flex:1;

    }
    .goods_img{
        max-width: 60px;
        height: 60px;
        img{
            display: block;
            width: 100%;
            height: 100%;
        }
    }
    .goods_name{
        flex:1;
        font-size: 12px;
        color: #424242;
        margin: auto;
    }
}
</style>


