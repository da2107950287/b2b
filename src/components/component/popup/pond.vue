<template>
    <div class="popup-div" @click.self="showbtn">
            <div class="popup-content">
                <div class="popup-content-title">
                    <img src="../../../assets/img/zuo.png" alt="">
                     <div class="popup-content-text">
                        按重计价
                    </div>
                     <img src="../../../assets/img/you.png" alt="">
                </div>
                
                <div class="popup-content-content">
                    按重计价指此商品按照实际重量售卖。
                </div>
                <div class="popup-content-content">
                    按重计价的的商品请按照包装的最大重量填写计量及售价,实际重量以平台称重为准。
                </div>
            </div>
        </div>
</template>
<script>
export default {
    data(){
        return{
        }
    },
    methods:{
        showbtn(){
            this.$emit("showbtn",false)
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
                margin: .78rem 0;
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
        }
    }
}
</style>


