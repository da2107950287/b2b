<template>
    <div>
        <div v-show="show" class="search-more-item">
            <img src="../../assets/img/shape.png" alt="">
            <div class="search-more-div">
                <div class="dis dis-div" @click="goservice">
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
            configId: '',                //客服id
        }
    },
    created(){
    // 获取客服id
        this.$post('/?c=user&a=getHx',).then((res) => {
            if(res.code == 0){
                this.configId = res.data;
            }
        })
    },
    methods:{
        // 弹出客服
        goservice(){
            this.dialogShow = true;
        },
        // 跳转首页
        goindex(){
            this.$router.push({
            path:'/index'
            })
        },
        // 跳转购物车
        goshop(){
            this.$router.push({
            path:'/shoppingCart'
            })
        },
        // 跳转个人中心
        gopersonal(){
            this.$router.push({
            path:'/personal'
            })
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
    }
}
</script>
<style lang="less" scoped>
.dis{
  display:flex;
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


