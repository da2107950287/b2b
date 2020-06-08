<template>
    <div class="shopping-dom" id="flyItem">
        <img :src="eleParabolaImg" alt=""><!-- 抛物线 -->
    </div>
</template>

<script>
import $ from "jquery"
export default {
    props:{
		isLevitateCar: {
			type: Boolean, //
            default: false,
        },
    },
    data(){
        return{
            // dropCount:0,            //购物车商品数量
            
            myParabola:'',          //抛物线函数
            eleFlyElement:'',       //抛物线起点
            eleShopCart:'',         //抛物线终点
            eleParabolaImg:'',      //抛物线图片
            is_animate:true,        //动画开关
        }
    },
    created(){
        
    },
    methods:{
        /* 抛物线 */
        setParabola(){
            // 元素以及其他一些变量
            let _this = this;
            let eleFlyElement = document.querySelector("#flyItem");
            let eleShopCart = document.querySelector("#shopCart");
            let numberItem = 0;
            // 抛物线运动
            let myParabola = this.$parabola.prototype.parabola(eleFlyElement, eleShopCart, {
                speed: 100, //抛物线速度
                curvature: 0.009, //控制抛物线弧度
                complete: function() {
                    eleFlyElement.style.visibility = "hidden";
                    // eleShopCart.querySelector("span").innerHTML = 10;
                    $('#flyItem img').css({
                        "visibility": "hidden",
                    }).removeClass('degAnimate');
                    _this.eleParabolaImg = "";
                    _this.is_animate = true;
                }
            });
            this.eleFlyElement = eleFlyElement;
            this.eleShopCart = eleShopCart;
            this.myParabola = myParabola;
        },
        shoppingInCart(res){
            let $event = res.event;
            let data = {
                attribute: [
                    {
                        number: res.moq, 
                        spec: res.spec,
                    }
                ],
                wholesale_id: res.wid
            }
            if(this.is_animate){
                this.is_animate = false;
                let images = res.item.goods_thumb || res.item.thumb;
                if(!this.$appFunc.prototype.isEmpty(images)){
                    this.eleParabolaImg = images;
                }else{
                    this.eleParabolaImg = res.item.goods_img;
                }
                let img = $('#goods-list-img-'+res.wid+"-"+res.key).find('img');
                console.log(this.eleFlyElement);
                // let img = $($event.target).parents('.goods-list').find('.goods-list-img img');
                let imgLeft = img.offset().left + (img.width() / 2);
                let imgTop = img.offset().top + (img.height() / 2);
                $('#flyItem img').css({
                    "visibility": "visible",
                    "width": img.parent().width(),
                    "height": img.parent().height(),
                }).addClass('degAnimate');

                let scrollLeft = document.documentElement.scrollLeft || document.body.scrollLeft || 0,
                    scrollTop = document.documentElement.scrollTop || document.body.scrollTop || 0;
                this.eleFlyElement.style.left = imgLeft + scrollLeft + "px";
                this.eleFlyElement.style.top = imgTop + "px";
                this.eleFlyElement.style.visibility = "visible";
                // // 需要重定位
                this.myParabola.position().move();

                
                this.$post("/?c=cart&a=addToCart", data).then(res => {
                    switch (res.code) {
                    case 0:
                        this.$parent.getShoppingCar()
                        break;
                    case 1:
                        this.$toast(res.msg);
                        break;
                    default:
                        break;
                    }
                });
            }
        },
    },
}
</script>


<style lang="less" scoped>

@keyframes changePosition{
    0%{
        -webkit-transform: translate(-10.56rem);
    }
    50%{
        -webkit-transform: translate(0);
    }
    100%{
        -webkit-transform: translate(10.56rem);
    }
}
@-webkit-keyframes changePosition{
    0%{
        -webkit-transform: translate(-10.56rem);
    }
    50%{
        -webkit-transform: translate(0);
    }
    100%{
        -webkit-transform: translate(10.56rem);
    }
}

@keyframes degAnimate{
    0%{
        transform:scale(1) translate(-50%,-50%);
        transform-origin: 0 0 0;
    }
    100%{
        width: 20px;
        height: 20px;
        /* transform:scale(.2) translate(-50%,-50%); */
        transform-origin: 0 0 0;
    }
}
@-webkit-keyframes degAnimate{
    0%{
        -webkit-transform:scale(1) translate(-50%,-50%);
        -webkit-transform-origin: 0 0 0;
    }
    100%{
        width: 20px;
        height: 20px;
        /* -webkit-transform:scale(.2) translate(-50%,-50%); */
        -webkit-transform-origin: 0 0 0;
    }
}

.degAnimate {
    animation: degAnimate .6s linear ;
    -webkit-animation: degAnimate .6s linear ;
    animation-fill-mode: forwards;
    -webkit-animation-fill-mode: forwards;
}

#flyItem{
    position: absolute;
    width: 10px;
    height: 10px;
    border-radius: 10px;
    z-index: 100000;
    visibility: hidden;
    top: 0;
    left: 0;
    img{
        display: block;
        position: relative;
        visibility: hidden;
    }
}
</style>