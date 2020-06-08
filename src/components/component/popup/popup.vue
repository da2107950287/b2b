<template>
    <div>
        <div class="popup">
            <div class="popup-title">求购规则:</div>
            <div class="popup-content">
                1. 加入活动时请您详看开团/拼团的商品，确定团购要求人数、商品品牌、型号及商品团购的价格等。2. 为保障买家卖双方...
            </div>
            <div class="popup-btn" @click="btnmsg">查看全部></div>
        </div>
        <div v-show="show" class="popup-div" @click.self="showbtn">
            <div class="popup-content">
                <div class="popup-content-title">
                    <img src="../../../assets/img/zuo.png" alt="">
                     <div class="popup-content-text">
                        求购规则
                    </div>
                     <img src="../../../assets/img/you.png" alt="">
                </div>
                
                <div class="popup-content-content">
                    1.加入活动时请您详看开团/拼团的商品，确定团购要求人数、商品品牌、型号及商品团购的价格等。
                </div>
                <div class="popup-content-content">
                    2.为保障买卖双方的合法权益，同时也便于后期平台客服监督双方公平性，请您在平台内进行交易。如因场外交易发生的一切问题，本平台将不承担及协调任何造成的问题。
                </div>
                <div class="popup-content-content">
                    3.平台的活动内容可通过微信、朋友圈及微博等渠道进行亲戚和朋友的发布，能更快速有效的达成您的交易期望。
                </div>
                <div class="popup-content-content">
                    4.如您在本平台收到的商品与活动发布的内容不符（质量、数量、品牌、重量等情况），请与平台客服400-128-8566联系寻求帮助。
                </div>
            </div>
        </div>
    </div>
    
</template>
<script>
export default {
    data(){
        return{
             show: false,
        }
    },
    methods:{
        btnmsg(){
            this.show=true
        },
        showbtn(){
            this.show=false
        }
    }
}
</script>
<style lang="less" scoped>
.popup{
    margin:.533rem .64rem;
    padding:.533rem;
    background-color: #fff;
    font-size:.64rem;
    border-radius: 5px;
    color:#EE2D2D;
    display:flex;
    flex-direction: column;
    .popup-title{
        color:#EE2D2D;
        margin-bottom: .533rem;
        font-size:.64rem;
    }
    .popup-content{
        width: 100%;
        color: #666;
        line-height: .96rem;
    }
    .popup-btn{
        align-self: flex-end;
        width: 30%;
        text-align: right;
    }
}
.popup-div{
    position:fixed;
    width:100%;
    height: 100%;
    background:rgba(0,0,0,.3);
    z-index:5;
    top:0;
    left:0;
    display: flex;
    flex-direction: column;
    .popup-content{
        background: #fff;
        margin:auto 1.49rem;
        border-radius:15px;
        padding:0 1.23rem;
        text-align: center;
        padding-bottom: 1.49rem;
        color:#424242;
        .popup-content-title{
            display: flex;
            justify-content: center;
            align-items: center;
            .popup-content-text{
                font-size: .85rem;
                margin: 1.07rem 0;
                color: #EE2D2D;
            }
            >img{
                width:2.08rem;
                display: block;
                margin: auto;
                margin-right: 10px;
            }
            >img:last-child{
                margin-left: 10px;
                margin-right: auto;
            }
        }
        
        .popup-content-content{
            font-size: .75rem;
            text-align: justify;
            margin-bottom: .8rem;
        }
    }
}
</style>


