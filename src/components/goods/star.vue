<template>
    <div>
        <div class="goods-star-box dflex">
            <div class="goods-star" :style="{marginRight: marginRight + 'px'}" v-for="(starItem,starIndex) in star" :key="starIndex">
                <div class="goodsStar_default"><img src="../../assets/img/star2.png" alt=""></div>
                <div class="goodsStar_all goodsStar_none"
                    :class="{'goodsStar_block': starItem.status == 1,'goodsStar_half': starItem.status == 2}"
                ><img src="../../assets/img/star.png" alt=""></div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            starValue: {
                type: Number,
                default: 0
            },
            marginRight: {
                type: Number,
                default: 5
            }
        },
        data() {
            return {
                //店铺星级
                star:[{status:0},{status:0},{status:0},{status:0},{status:0}],
            }
        },
        created(){
            let starValue;
            starValue = String(this.starValue)
            let starStatus = starValue.split('.');
            for (let index = 0; index < this.star.length; index++) {
                if(index < starStatus[0]){
                    this.star[index].status = 1;
                }
                if(index == starStatus[0] && starStatus[1]){
                    this.star[index].status = 2;
                }
            }
        }
    }
</script>

<style lang="less" scoped>
    .dflex{display: flex;}
    .goods-star-box{
        .goods-star{
            position: relative;
            width:16px;
            height: 16px;
            .goodsStar_default{
                img{
                    display: block;
                    width:16px;
                    height: 16px;
                }
            }
            .goodsStar_all{
                position: absolute;
                top: 0;
                overflow: hidden;
                img{
                    display: block;
                    width:16px;
                    height: 16px;
                }
            }
            .goodsStar_none{
                width: 0;
            }
            .goodsStar_half{
                width: 50%;
            }
            .goodsStar_block{
                width: 100%;
            }
        }
    }
</style>
