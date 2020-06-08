<template>
    <div>
        <div class="bg-box" v-show="show" @click="closeMore"></div>
        <div v-show="show" class="search-more-item">
            <img src="../../assets/img/shape.png" alt="">
            <div class="search-more-div">
                <div class="dis dis-div" @click="getPhone">
                    <img class="search-more-imgs" src="../../assets/img/shopkefu.png" alt="">
                    <div>客服</div>
                </div>
                <div class="dis dis-div" @click="goindex">
                    <img class="search-more-img" src="../../assets/img/shopshouye.png" alt="">
                    <div>首页</div>
                </div>
                <div class="dis dis-div" @click="goshop">
                    <img class="search-more-img" src="../../assets/img/shopgouwuche.png" alt="">
                    <div>购物车</div>
                </div>
                <div class="dis dis-div" @click="gopersonal">
                    <img class="search-more-img" src="../../assets/img/shopme.png" alt="">
                    <div>个人中心</div>
                </div>
            </div>
          
        </div>
        <!--客服 -->
        <van-dialog
        v-model="dialogShow"
        confirmButtonText='取消'
        >
        <van-row class="dialog-box">
            <van-col span='12'>
                <div @click="getPhone" class="getPhone">
                    <img src="../../assets/img/dianhua.png" alt="">
                    <span>致电平台</span>
                </div>
            </van-col>
            <van-col span='12'>
                <div @click="contactService" class="contactService">
                    <img src="../../assets/img/kefu1-1.png" alt="">
                    <span>联系客服</span>
                </div>
            </van-col>
        </van-row>
        </van-dialog>
    </div>
</template>

<script>
export default {
    props:['show'],
    data(){
        return{
            dialogShow:false,     //电话的显示
        }
    },
    methods:{
        // 弹出客服
        goservice(){
            this.dialogShow = true;
        },
        // 跳转首页
        goindex(){
            this.$emit('closeMore')
            sessionStorage.removeItem('searchInputVal');
            this.$router.push({
                path:'/index'
            })
        },
        // 跳转购物车
        goshop(){
            this.$emit('closeMore')
            sessionStorage.removeItem('searchInputVal');
            this.$router.push({
                path:'/shoppingCart'
            })
        },
        // 跳转个人中心
        gopersonal(){
            this.$emit('closeMore')
            sessionStorage.removeItem('searchInputVal');
            this.$router.push({
                path:'/personal'
            })
        },
        closeMore(){
            this.$emit('closeMore')
        },
        getPhone(){
            this.$emit('closeMore')
            window.location.href='tel:4001288566';
            this.dialogShow = false;
        },
        contactService(){},

    }
}
</script>
<style lang="less" scoped>
.dis{
  display:flex;
}
.bg-box{
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
}
.search-more-item{
      position: absolute;
      top:44px;
      right:12px;
      background-color: #fff;
      width:120px;
      height:180px;
      border:1px solid #fff;
      box-shadow: 0 0 24px 1px rgba(0, 0, 0, 0.15);
      border-radius: 5px;
      z-index: 1002;
      >img{
          position: absolute;
          top: -8px;
          right: 11px;
          width: 18PX;
      }
      .search-more-div{
            margin: 16px 0 16px 20px;
            display: flex;
            flex-direction: column;
            font-size: 12px;
            .dis-div{
              padding-bottom: 16px;
              align-items: center;
            }
        .search-more-img{
          height: 24px;
          display: block;
          margin-right: 12px;
        }
        .search-more-imgs{
          height: 24px;
          display: block;
          margin-right: 8px;
        }
      }
    }


    /* 电话弹出框样式 */
    .dialog-box {
        height: 3rem;
        line-height: 3rem;
        font-size: 20px;
        text-align: center;
    }

    
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


<style lang="less">
    .van-dialog__footer{
        .van-button{
            background-color: #f2f2f2;
            font-size: 14px;
            color: #999;
        }
        .van-button.van-dialog__confirm{
            background-color: #f2f2f2;
            font-size: 14px;
            color: #EE2D2D;
        }
    }
</style>