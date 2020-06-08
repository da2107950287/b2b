<template>
  <div>
    <!-- 属性框 -->
    <div class="goods-oder-box">
      <!-- 商品图片 -->
      <div class="goods-oder-name">
        <van-row class="dflex">
          <van-col span="6" class="goods-order-img-col">
            <div class="goods-order-img">
              <img :src="goodsImage">
            </div>
          </van-col>
          <van-col span="18" class="dflex">
            <div class="goods-order-price-box">
              <div class="goods-order-price-title">{{goodsName}}</div>
            </div>
          </van-col>
        </van-row>
      </div>

      <!-- 单属性 -->
      <div class="goods-order-one" v-show="show == 1">
        <div class="goods-order-one-title">
          <div class="goods-order-one-title-box" :data-id="goodsOrderTwo.id">{{goodsOrderTwo.name}}</div>
          <div class="goods-order-one-lis-box" :class="{'mb_50':goodsOrderTwo.values.length < 5}">
            <div v-for="(item,index) in goodsOrderTwo.values" :key="index">
              <van-row class="goods-order-ont-lis">
                <van-col span="10" class="dflex-left">
                  <div class="goods-order-ont-lis-label" data-id="1" :id="item.id">{{item.label}} <span class="goods-order-ont-lis-unit">({{item.format}}{{measure_unit}}/{{item.unit}})</span> </div>
                </van-col>
                <div class="dflex">
                  <van-col span="6" class="dflex-center">
                    <div class="goods-order-price">
                      <span class="goods-order-price1">¥</span>
                      <span class="goods-order-price2">{{item.attr_price}}</span>
                      <span class="goods-order-price3" v-if="item.unit != null">/{{item.unit}}</span>
                    </div>
                  </van-col>
                  <van-col span="8" class="dflex-right">
                    <div class="stepper dflex" :moq="item.moq">
                      <button @click.stop="reduce" class="reduce"></button>
                      <input type="text" value="0" @blur="lose">
                      <button @click="plus" class="plus"></button>
                    </div>
                  </van-col>
                </div>
              </van-row>
            </div>
          </div>
          <!-- 单属性提交按钮 -->
          <div v-if="goodsOrderTwo.values.length > 4" class="goods-order-more mb_50">下滑显示更多</div>
          <div class="button-sbmit" v-show="show == 1">
            <van-button type="danger" size="large" @click="buttonSbmitOne">加入购物车</van-button>
          </div>
        </div>
      </div>

      <!-- 多属性 -->
      <div class="goods-order-two" v-show="show == 2">
        <!-- 标题 -->
        <div v-for="(itemInfo,index) in goodsOrderOne.infoOne" :key="index" class="get-dom">
          <div id="goods-order-lis-box" :data-id="itemInfo.id">
            <div class="goods-order-one-title" :data-id="itemInfo.id" info="8">{{itemInfo.name}}</div>
          </div>
          <div
            v-for="(val,key) in itemInfo.values"
            :key="key"
            :data-id="val.id"
            class="goods-order-one-select"
            @click="select"
          >
            <label :for="key+index">
              <div>{{val.label}}</div>
            </label>
          </div>
        </div>
        <!-- 循环值 -->
        <div v-for="(item,index) in goodsOrderOne.infoTwo" :key="index" class="current">
          <div id="goods-order-lis-box" :data-id="item.id">
            <div class="goods-order-one-title" :data-id="item.id" info="8">{{item.name}}</div>
          </div>
          <div class="goods-order-ont-lis-box" :class="{'mb_50':item.values.length < 5}" v-for="(val,index) in item.values" :key="index" :data-id="val.id">
            <van-row class="goods-order-ont-lis">
              <van-col span="10" class="dflex-left">
                <span class="goods-order-ont-lis-label" data-id="1" :id="item.id">{{val.label}} <span class="goods-order-ont-lis-unit">({{val.format}}{{measure_unit}}/{{val.unit}})</span> </span>
              </van-col>
              <div class="dflex">
                <van-col span="6" class="dflex-center">
                  <div class="goods-order-price">
                    <span class="goods-order-price1">¥</span>
                    <span class="goods-order-price2">{{item.attr_price}}</span>
                    <span class="goods-order-price3" v-if="item.unit != null">/{{item.unit}}</span>
                  </div>
                </van-col>
                <van-col span="8" class="dflex-right">
                  <div class="stepper dflex" :moq="item.moq">
                    <button @click.stop="reduce" class="reduce"></button>
                    <input type="text" value="0" @blur="lose">
                    <button @click="plus" class="plus"></button>
                  </div>
                </van-col>
              </div>
            </van-row>
          </div>
          <!-- 多属性提交按钮 -->
          <div v-if="item.values.length > 4" class="goods-order-more mb_50">下滑显示更多</div>
          <div class="button-sbmit" v-show="show == 2">
            <van-button type="danger" size="large" @click="buttonSbmitTwo">加入购物车</van-button>
          </div>
        </div>
      </div>
    </div>

    <!-- 按钮 -->
    <!-- 单属性提交按钮 -->
    <!-- <div class="button-sbmit" v-show="show == 1">
            <van-button type="danger" size="large" @click="buttonSbmitOne">加入购物车</van-button>
    </div>-->
    <!-- 多属性提交按钮 -->
    <!-- <div class="button-sbmit" v-show="show == 2">
            <van-button type="danger" size="large" @click="buttonSbmitTwo">加入购物车</van-button>
    </div>-->
  </div>
</template>

<script>
import "swiper/dist/css/swiper.css";
import $ from "jquery";
import "font-awesome/css/font-awesome.css";
import { swiper, swiperSlide } from "vue-awesome-swiper";
import { post, HandleData } from "../../../assets/js/commonAPI.js";
import Vue from "vue";

Vue.prototype.$post = post;
export default {
  props: ["goodsID", "id", "data", "goodsName", "goodsImage", "goodsPrice",'measure_unit'],
  data() {
    return {
      goodsOrderName: [],
      goodsOrderTwo: [], //单属性
      goodsOrderOne: [], //多属性
      titleName: "",
      // goodsName: "", //商品名称
      // goodsImage: "", //商品图片
      // goodsPrice: "", //商品价格
      show: 1, //控制显示属性
      spec: "",
      // goodsID: "",
      // id: "",
      info: [], //缓存数据
      objSum: {},
      // data: ""
    };
  },
  created() {
    switch (this.data.code) {
      case 0:
        for (name in this.data.data.spe) {
          this.goodsOrderName.push(name);
        }
        if (this.goodsOrderName.length <= 1) {
          this.show = 1;
          this.goodsOrderTwo = this.data.data.spe[this.goodsOrderName[0]];
        } else {
          this.show = 2;
          this.goodsOrderOne = HandleData(this.data.data.spe);
        }
        break;
      default:
        break;
    }
  },
  methods: {
    /* 属性选择 */
    /* 单属性提交 */
    buttonSbmitOne() {
      const getArr = [];
      const eve = event.srcElement ? event.srcElement : event.target;
      const dom = $(
        $(eve)
          .parents(".van-actionsheet")
          .find('input[type="text"]')
      );
      for (let i = 0; i < dom.length; i++) {
        const goodsObj = {};
        if ($(dom[i]).val() != 0) {
          goodsObj.number = $(dom[i]).val();
          goodsObj.spec = $(dom[i])
            .parents(".goods-order-ont-lis")
            .find(".goods-order-ont-lis-label")
            .attr("id");
          getArr.push(goodsObj);
        }
      }
      if (getArr.length == 0) {
        this.$toast("请选择购买商品的规格");
        return;
      }
      this.$post("/?c=cart&a=addToCart", {
        wholesale_id: this.id,
        attribute: getArr
      }).then(res => {
        switch (res.code) {
          case 0:
            this.$toast("添加购物车成功");
            // this.$router.push({
            //   path: "/shoppingCart"
            // });
            break;
          case 1:
              this.$toast(res.msg);
              break;
          default:
            break;
        }
      });
    },
    /*  多属性提交 */
    buttonSbmitTwo() {
      const getArr = [];
      for (let i = 0; i < this.info.length; i++) {
        let obj = {};
        obj.spec = this.info[i].spec.sort().join(",");
        obj.number = this.info[i].number;
        getArr.push(obj);
      }
      if (getArr.length == 0) {
        this.$toast("请选择购买商品的规格");
        return;
      }
      this.$post("/?c=cart&a=addToCart", {
        wholesale_id: this.id,
        attribute: getArr
      }).then(res => {
        switch (res.code) {
          case 0:
            this.$emit('shoppingCartIn')
            /* this.$router.push({
              path: "/shoppingCart"
            }); */
            break;
          case 1:
              this.$toast(res.msg);
              break;
          default:
            break;
        }
      });
    },
    //进步器减
    //增加
    plus() {
      //4、创建数组，保存数据
      let all = [];
      //5、创建对象，保存键，值
      let obj = {};
      let htmlDemo = event.srcElement ? event.srcElement : event.target;
      let curElement = $(htmlDemo);
      let numberElement = curElement.prev();
      // 设置最小可选值
      let number = Number(numberElement.val());
      let moq = curElement.parent(".stepper").attr("moq");
      if (number < moq) {
        numberElement.val(Number(moq));
      } else {
        numberElement.val(number + 1);
      }

      //1、选择HTML选中的标签
      let selectHtml = curElement
        .parents("div.goods-order-two")
        .find("div.goods-order-one-select.select");
      //2、选择input标签
      // let inputHtml = $(htmlDemo).parents('div.goods-order-two').find('input[type="text"]');

      //6、查找选中的id，并赋值给数组
      for (let i = 0; i < selectHtml.length; i++) {
        all.push($(selectHtml[i]).attr("data-id"));
      }

      //8、查找有值的inputID标签，并赋值给数组
      all.push(curElement.parents(".goods-order-ont-lis-box").attr("data-id"));
      obj.spec = all;
      //9、获取总数量赋值给数组
      obj.number = curElement
        .parents("div.stepper")
        .find('input[type="text"]')
        .val();

      //10、判断当前数据是否存在缓存中
      if (this.info.length != 0) {
        //11、循环查找是否有存在的值
        for (let i = 0; i < this.info.length; i++) {
          if (this.info[i].spec.toString() == obj.spec.toString()) {
            this.info[i].number = obj.number;
            return;
          }
        }
        this.info.push(obj);
      } else {
        //没有数据执行
        this.info.push(obj);
      }
      //清空缓存对象；
      all = [];
      obj = {};
    },
    /**
     * 执行减少采购量
     */
    reduce() {
      // 创建数组，保存数据
      let all = [];
      // 创建对象，保存键，值
      let obj = {};

      let htmlDemo = event.srcElement ? event.srcElement : event.target;
      let curElement = $(htmlDemo);
      let numberElement = curElement.next();
      let number = Number(numberElement.val()) - 1; //目标数量
      let moq = curElement.parent(".stepper").attr("moq");
      if (number < moq) {
        numberElement.val(0);
      } else {
        numberElement.val(number);
      }

      //1、选择HTML选中的标签
      let selectHtml = curElement
        .parents("div.goods-order-two")
        .find("div.goods-order-one-select.select");
      //2、选择input标签
      // let inputHtml = $(htmlDemo).parents('div.goods-order-two').find('input[type="text"]');

      //6、查找选中的id，并赋值给数组
      for (let i = 0; i < selectHtml.length; i++) {
        all.push($(selectHtml[i]).attr("data-id"));
      }

      //8、查找有值的inputID标签，并赋值给数组
      all.push(curElement.parents(".goods-order-ont-lis-box").attr("data-id"));
      obj.spec = all;
      //9、获取总数量赋值给数组
      obj.number = curElement
        .parents("div.stepper")
        .find('input[type="text"]')
        .val();

      //10、判断当前数据是否存在缓存中
      if (this.info.length != 0) {
        //11、循环查找是否有存在的值
        for (let i = 0; i < this.info.length; i++) {
          if (this.info[i].spec.toString() == obj.spec.toString()) {
            this.info[i].number = obj.number;
            return;
          }
        }
        this.info.push(obj);
      } else {
        //没有数据执行
        this.info.push(obj);
      }
      //清空缓存对象；
      all = [];
      obj = {};
    },
    //失去焦点
    lose() {
      //1、当前元素
      const eve = event.srcElement ? event.srcElement : event.target;
      //2、选中属性标签
      const selectHtml = $(eve)
        .parents("div.goods-order-two")
        .find("div.goods-order-one-select.select");
      //3、当前元素父级
      const eveDom = $(eve).parents(".goods-order-ont-lis-box");
      let curElement = $(eve);
      let moq = curElement.parent(".stepper").attr("moq");
      //4、创建数组，保存数据
      let all = [];
      //5、创建对象，保存键，值
      let obj = {};
      if ($(selectHtml).length !== 0) {
        all.push(
          $(selectHtml).attr("data-id"),
          $(eveDom)
            .attr("data-id")
            .toString()
        );
      }
      obj.spec = all;
      obj.number = $(eve).val();
      //6、判断当前数据是否存在缓存中
      if (this.info.length != 0) {
        //7、循环查找是否有存在的值
        for (let i = 0; i < this.info.length; i++) {
          if (this.info[i].spec.toString() == obj.spec.toString()) {
            this.info[i].number = obj.number;
            return;
          }
        }
      } else {
        this.info.push(obj);
      }

      if ($(eve).val() == "") {
        $(eve).val(0);
      }
      if (Number($(eve).val()) < moq) {
        this.$toast("最小起批量为" + moq);
      }
    },
    //初始化选中
    getDom() {
      const getDom = $(".get-dom");
      for (let i = 0; i < getDom.length; i++) {
        let seletDom = $(getDom[i]).find(".goods-order-one-select")[0];
        $(seletDom).addClass("select");
        $(seletDom)
          .find('input[type="radio"]')
          .attr("checked", "checked");
      }
    },
    //选中
    select() {
      const _this = this;

      let sumAll = []; //存储选中状态的ID
      let obj = {}; //组合状态ID
      let allInfo = []; //存储对比ID

      const eve = event.srcElement ? event.srcElement : event.target; //event对象
      const sibLings = $(eve)
        .parents(".goods-order-one-select")
        .siblings(); //选中当前元素的兄弟级
      const current = $(eve).parents(".goods-order-one-select"); //选中的当前元素
      const currentBox = $(eve).parents(".goods-oder-box"); //当前选中元素的盒子

      for (let i = 0; i < sibLings.length; i++) {
        if (!$(sibLings[i]).hasClass("select")) {
          current.addClass("select");
          sibLings.removeClass("select");
        }
      }
      //1、获取选中的元素
      let selectHtml = $(eve)
        .parents("div.goods-order-two")
        .find("div.goods-order-one-select.select");
      //2、获取页面中的input元素
      let inputHtml = $(eve)
        .parents("div.goods-order-two")
        .find('input[type="text"]');

      //3、查找input不为0的元素
      for (let i = 0; i < selectHtml.length; i++) {
        sumAll.push($(selectHtml[i]).attr("data-id"));
      }

      //4、获取input自定义值
      for (let i = 0; i < inputHtml.length; i++) {
        var key =
          sumAll.toString() +
          "," +
          $(inputHtml[i])
            .parents("div.goods-order-ont-lis-box")
            .attr("data-id");
        $(inputHtml[i]).attr("data-id", key);
        $(inputHtml[i]).val(0);
      }

      for (let i = 0; i < this.info.length; i++) {
        for (let j = 0; j < inputHtml.length; j++) {
          if ($(inputHtml[j]).attr("data-id") == this.info[i].spec.join()) {
            $(inputHtml[j]).val(this.info[i].number);
          }
        }
      }
    }
  },
  mounted() {
    //调用初始化值
    this.getDom();
    //
  },
  watch: {
    goodsID: function() {
      this.goodsID = this.goodsID;
    },
    id: function() {
      this.id = this.id;
    },
    data: function() {
      this.data = this.data;
    },
    goodsName: function() {
      this.goodsName = this.goodsName;
    },
    goodsImage: function() {
      this.goodsImage = this.goodsImage;
    },
    goodsPrice: function() {
      this.goodsPrice = this.goodsPrice;
    }
  }
};
</script>

<style scoped>
.dflex{display: flex;}
.goods-oder-box {
  width: 100%;
  height: 30rem;
  background-color: #fff;
}

.goods-oder-name {
  /* width: 100%; */
  font-size: 14px;
  position: fixed;
  z-index: 20001;
  background-color: #fff;
  border-bottom: 1px solid #eee;
}

.goods-order-img {
  padding: 0.4rem;
}

.goods-order-img img {
  width: 100%;
}

.goods-order-price-box {
  font-size: 14px;
  margin: auto;
}

.goods-order-price {
  padding: 0.2rem 0;
  color: #e87442;
  font-size: 16px;
}

.goods-order-one,
.goods-order-two {
  padding-top: 122px;
  padding-bottom: 50px;
  background-color: #fff;
}

/*单属性样式*/
.goods-order-one {
  padding: 6rem 0.6rem;
  font-size: 14px;
  margin-top: 0.6rem;
}

.goods-order-one-title-box {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 0.7rem;
  padding-bottom: 0.4rem;
  border-bottom: 1px solid #eee;
}

.goods-order-one-title-content span {
  padding: 0.4rem 0.6rem;
  border-radius: 0.3rem;
  margin: 0.4rem;
  display: inline-block;
  background-color: #eee;
}

.goods-order-ont-lis {
  height: 2rem;
  line-height: 2rem;
  margin-bottom: 0.2rem;
  justify-content:space-between;
}

.goods-order-ont-lis div {
  display: block;
}
.goods-order-ont-lis .dflex{
  display: flex;
  justify-content: space-between;
}
.goods-order-ont-lis .dflex-left{
  margin: auto;
  width: auto;
  margin-left: 0;
  float: none;
}
.goods-order-ont-lis .dflex-center{
  margin: auto;
  width: auto;
  margin-left: 0;
  float: none;
}
.goods-order-ont-lis .dflex-right{
  margin: auto;
  width: auto;
  margin-right: 0;
  float: none;
}

/*多属性样式*/
.goods-order-two {
  margin: 0 0.6rem;
}

.goods-order-one-title {
  height: 2rem;
  line-height: 2rem;
  font-weight: bold;
}

.goods-order-one-select {
  display: inline-block;
  padding: 0.2rem;
  margin-right: 1rem;
  margin-bottom: 1rem;
  border: 1px solid #eee;
  border-radius: 0.3rem;
}

.goods-order-one-select div {
  padding: 0.2rem 0.6rem;
  text-align: center;
}

/* 属性选中状态 */
.select {
  border: 1px solid #d1442b !important;
  background-color: #fff !important;
}

/* 加入购物车按钮 */
.button-sbmit {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 50px;
  z-index: 20015;
}

/* 进步步器 */
.stepper {
  font-size: 0px;
  text-align: right;
  display: inline-block;
}

.stepper button {
  width: 30px;
  height: 30px;
  line-height: 18px;
  box-sizing: border-box;
  background-color: #fff;
  border: 1px solid #ebedf0;
  position: relative;
  padding: 5px;
  vertical-align: middle;
}

.stepper input {
  width: 33px;
  height: 26px;
  line-height: 1;
  padding: 1px;
  border: 1px solid #ebedf0;
  border-width: 1px 0;
  border-radius: 0;
  box-sizing: content-box;
  color: #7d7e80;
  font-size: 14px;
  vertical-align: middle;
  text-align: center;
  -webkit-appearance: none;
}

.reduce::before {
  width: 9px;
  height: 1px;
  content: "";
  position: absolute;
  margin: auto;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #7d7e80;
}

.plus::before {
  width: 9px;
  height: 1px;
  content: "";
  position: absolute;
  margin: auto;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #7d7e80;
}

.plus::after {
  width: 1px;
  height: 9px;
  content: "";
  position: absolute;
  margin: auto;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #7d7e80;
}

.reduce,
.plus {
  font-size: 18px;
}
</style>



<style lang="less" scoped>
.goods-order-price-box{
  padding: 0 .4rem;
  margin-left: 0;
  margin-top: 0;
}
.goods-order-one-title{
  line-height: 1;
  height: auto;
  font-weight: normal;
}
.goods-order-ont-lis{
  line-height: 1;
  height: auto;
}
.goods-oder-name{
  padding: 15px 12px;
  position: relative;
  .van-row{
    .van-col{
      width: auto;
      .goods-order-img{
        width: 75px;
        height: 75px;
        padding: 0;
        overflow: hidden;
        img{
          display: block;
          height: auto;
        }
      }
    }
    .goods-order-img-col{
      max-width: 75px;
      min-width: 75px;
    }
  }
}
.goods-oder-box{
  height: auto;
}
.goods-order-one{
  margin: auto;
  position: relative;
  bottom: 0;
  width: 100%;
  padding: 0;
  .goods-order-one-title-box{
    font-size: 16px;
    color: #212121;
    font-weight: normal;
    padding: 15px 12px;
    margin-bottom: 0;
  }
  .goods-order-one-lis-box{
    overflow-y: auto;
    max-height: 13rem;
    padding: 0 12px;
    margin-bottom: 15px;
  }
  .goods-order-ont-lis{
    padding: 15px 0 12px;
    margin-bottom: 0;
    border-bottom: 1px solid #d8d8d8;
    .dflex-left{
      .goods-order-ont-lis-label{
        font-size: 14px;
        margin-bottom: 5px;
      }
      .goods-order-ont-lis-unit{
        font-size: 12px;
        padding-left: 5px;
      }
    }
    .dflex-center{
      .goods-order-price{
        .goods-order-price1{
          font-size: 12px;
          color: #EE2D2D;
        }
        .goods-order-price2{
          font-size: 16px;
          color: #EE2D2D;
        }
        .goods-order-price3{
          font-size: 12px;
          color: #424242;
        }
      }
    }
  }
  .goods-order-more{
    font-size: 12px;
    text-align: center;
    color: #808080;
    padding: 0 0 15px 0;
  }
  .mb_50{
    margin-bottom: 50px;
  }
  .button-sbmit button{
    background-color: #EE2D2D;
  }
}
.goods-order-one-lis-box >div:last-child .goods-order-ont-lis{
  border-bottom: 0;
}
</style>
