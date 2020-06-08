<template>

    <div class="confirm">
        
        <!-- 确认订单 -->
        <navbar type="left" title="确认订单信息" @clickleft="goPreviousPage"></navbar>

        <!-- 收货地址 -->
        <div class="add" @click="add">
            <div class="add-contain" v-if="addTitle != undefined">
                <img src="../../assets/img/address.png" class="add-loaction">
                <div class="add-content">
                    <p>{{addTitle}}&emsp;{{addPhone}}</p>
                    <p>{{addInfo}}</p>
                </div>
                <van-icon name="arrow" class="add-arrow" />
            </div>
            <div class="add-contain-none-box" v-else>
                <div class="add-contain-none">+添加收货地址</div>
            </div>
        </div>

        <!-- 订单商家 -->
        <div class="confirmContnent" v-for="(item,index1) in data" :key="index1">
            <div v-for="(val,index2) in item" :key="index2" class="confirmContnent-div">
                <div class="confiromTitle" v-if="val.shop_name" :data-id="val.seller_id">
                    <img src="../../assets/img/dianshang.png" alt="">
                    {{val.shop_name}}
                </div>
                <div class="confiromInfo" v-for="(info,index3) in val.list" :key="index3">
                    <div class="confiromLogo">
                        <img :src="val.goods_thumb" width="100%" />
                    </div>
                    <div class="confirGoodsName">
                        <h4>{{(val.goods_name)}}</h4>
                        <p>{{info.goods_attr}} <span>&yen;{{info.unit_price}}</span></p>
                        <p><span>&times;{{info.goods_number}}</span></p>
                      </div>
                </div>
            </div>
            <div class="message">
                <p class="message-input"><span>备注：</span> <input type="text" class='messageInput' placeholder="可以告诉卖家你的特殊要求"></p>
                <p class="message-money">商品金额 <span>&yen;{{everyTotal(item)}}</span></p>
            </div>
        </div>

        <!-- 总信息 -->
        <div class="allInfo">
            <!-- 开票信息 -->
            <div class="paymentInfo">
                <div class="paymentInfo-submit">
                    <van-cell-group class="dflex">
                        <div class="paymentInfo-title">是否开发票<span>（请选择开票信息，可不选）</span></div>
                        <van-switch-cell v-model="checked" @change="checkedClock" />
                    </van-cell-group>
                </div>
                <div class="paymentInfo-info" v-if="checked">
                    <div class="payment-info-box" @click="setPayment">
                        <van-row class="paymentInfo-info-title-box">
                            <div>发票类型：{{radioContent}}</div>
                            <div>发票抬头：{{paymentTitle}}</div>
                            <div>纳税人识别号：{{paymentInfo}}</div>
                        </van-row>
                    </div>
                </div>
                
                <div class="paymentInfo-coupon" @click="changeCoupon(0)">优惠 {{describeText}}
                    <van-icon name="arrow" />
                </div>
            </div>
        </div>

        <!-- 总金额等 -->
        <div class="allData">
            <div class="paymentInformation">
                <p><span>商品金额</span>&yen;{{PaymentForGoods.toFixed(2)}}</p>
                <p v-if="shippingFee == 0"><span>运费</span><i class="priceFree">&yen;{{freightNum}}</i> 免运费</p>
                <p v-else><span>运费</span><i>&yen;{{freightNum}}</i> </p>
                <p v-if="coupon_price > 0 || voucherMoney > 0"><span>优惠</span>-&yen;{{coupon_price>0?coupon_price:voucherMoney}}</p>
            </div>
        </div>

        <!-- 提交信息 -->
        <div style="height:104px"></div>
        <!-- 底部按钮-->
        <div class="submit-bar van-submit-bar">
            <div class="submit-bar van-submit-bar">
                <div class="van-submit-box">
                    <div class="van-submit"><span>合计：</span><span class="van-submit-price">&yen;{{amount}}</span></div>
                    <button class="van-button" @click="goSubmit">
                        <span class="van-button__text">确认订单</span>
                    </button>
                </div>
            </div>
        </div>



        <van-popup v-model="couponShow" position="bottom" :style="{ height: '66%' }">
            <changeCoupon :defActive="defActive" :coupon="coupon" @cancel="cancel" @sumbit="couponSumbit" @changeVoucher="changeVoucher" :couponId="coupon_id" :couponAmount="PaymentForGoods" :couponActive="couponActive" :amount="voucherTotal" :vouchers="vouchers" :vouchersSelected="vouchersSelected"></changeCoupon>
        </van-popup>

        <!-- 是否允许无人收货提示层 -->
        <div class="notice" v-if="isShowNotice">
            <div class="notice-box">
                <h6>收货方式</h6>
                <p>首次下单需选择是否允许无人收货， 后期如需修改，请联系运营。 </p>
                <div class="notice-btns">
                    <div class="notice-red" @click="toSureType(2)">是，允许无人收货</div>
                    <div @click="toSureType(1)">否，不允许无人收货</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import $ from 'jquery'
    import {HandleCart,getPrice} from '../../assets/js/commonAPI.js'

    const navbar =  ()=>import("../navbar/nav.vue");
    const changeCoupon =  ()=>import("../component/coupon/changeCoupon.vue");
    const vloading =  ()=>import("../vloading.vue");

    export default {
        components: {
            navbar,
            changeCoupon,
            vloading,
        },
        data() {
            return {
                message:'',
                data:[],
                dataInfo:[],
                addTitle:'请选择收货地址',
                addTitleID:true,
                addInfo:'',
                addPhone:'',
                area_sn: '',

                address_id:0,                   // 地址ID
                getInvoice:0,                   // 是否有发票  默认 :0 有; 1 没有

                checked:false,                  // 发票控制开关
                radio:0,
                paymentTitle:'点击选择内容',     // 标题
                paymentInfo:'点击选择内容',      // 信息
                invoice_id:'',                  // 发票ID
                totalMoney:'',                  // 订单总额
                freeMoney:0,                    // 满减额度
                shippingFee:0.0,                // 运费总计
                freightNum:0.0,                 // 运费
                PaymentForGoods:0.00,           // 货款总计
                amount:0.00,                    // 总计
                radioContent:'请选择发票信息',   // 发票内容

                couponShow:false,               // 优惠券弹出层
                coupons:[],                     // 商家优惠券列表
                coupon:[],                      // 平台优惠券列表
                coupon_name:'',                 // 优惠券名称
                coupon_id:0,                    // 优惠券ID
                coupon_price:0,                 // 优惠金额-优惠券
                coupon_minAmount:0,             // 最低使用金额

                sellerIds:[],                   // 商家ID
                couponActive:{},                // 已选择优惠券

                //默认选中优惠券类型 0-优惠券 1-农联金券
                defActive: 0,
                //农联金券列表
                vouchers: [],
                //选中国的金券id 集合
                vouchersSelected: [],
                //金券优惠额度
                voucherMoney: 0,
                //金券时， 总支付金额
                voucherTotal: 0,

                //优惠券处 显示文字内容
                describeText: '无',

                //是否显示无人收货
                isShowNotice: false,
            }
        },
        created(){
            this.$parent.$refs.loading.style.display = 'flex';

            //判断是否显示无人收货层
            const userinfo = JSON.parse(sessionStorage.getItem('userInfo'));
            if(userinfo) {
                this.isShowNotice = userinfo.receive == 0 && true || false;
            }else {   
                //处理 用户信息 未请求时， 就进入此页的问题
                this.$post('/?c=user&a=info',).then(res => {
                    switch (res.code) {
                        case 0:
                            sessionStorage.setItem('userInfo',JSON.stringify(res.data));
                            this.isShowNotice = res.data.receive == 0 && true || false;
                            break;
                        default:
                            this.$toast(res.msg);
                            break;
                    }
                });
            }
           

            // 获取默认收货地址 
                 // 默认收货地址
                
            if(!localStorage.getItem('goodsAdd') || this.$appFunc.prototype.isEmpty(JSON.parse(localStorage.getItem('goodsAdd')))){
                this.$post('/?c=order&a=getAddress',{
                    page:1,
                }).then((res)=>{
                    localStorage.setItem('goodsAdd', JSON.stringify({
                        consignee: res.data.consignee,
                        addTitleID: false,
                        full_address: res.data.full_address,
                        mobile: res.data.mobile,
                        address_id: res.data.address_id,
                        district: res.data.district
                    }));
                    this.addTitle = res.data.consignee
                    this.addTitleID = false
                    this.addInfo = res.data.full_address
                    this.addPhone = res.data.mobile
                    this.address_id = res.data.address_id
                    this.area_sn = res.data.district
                });
            } else {
                const goodsAdd = JSON.parse(localStorage.getItem('goodsAdd'))
                this.addTitle = goodsAdd.consignee
                this.addTitleID = false
                this.addInfo = goodsAdd.full_address
                this.addPhone = goodsAdd.mobile
                this.address_id = goodsAdd.address_id
                this.area_sn = goodsAdd.district
            }

            //sessionStorage.getItem(dataInfo.order_amount);
            this.totalMoney = sessionStorage.getItem('wapPrice');
            this.shippingFee = sessionStorage.getItem('wholesale_shipping');
            this.freightNum = sessionStorage.getItem('freight');
            this.freeMoney = sessionStorage.getItem('freeMoney');
            let data = (localStorage.getItem('data'));
            if(!this.$appFunc.prototype.isEmpty(data)){
                data = JSON.parse(data);
                for(let name in data){
                    let names = name.split('s');
                    this.sellerIds.push(names[1]);
                    this.data.push(data[name]);
                    // 计算运费、货款、总价
                    for(let val in data[name]){
                        let curShippingFee = Number(Number(data[name][val].total_number) * Number(data[name][val].shipping_fee)).toFixed(2);
                        
                        // 运费总计
                        this.shippingFee = Number(this.shippingFee)+Number(curShippingFee);
                        
                        
                        // 计算货款
                        let money=0.0;
                        for(let i of data[name][val].list){
                            money+=Number(i.unit_price)*Number(i.goods_number)
                        }
                        this.PaymentForGoods+=money
                    }
                
                }
            }
            
            // 订单总数
            this.amount = Number(this.shippingFee + this.PaymentForGoods).toFixed(2);
            if(this.amount<=0){
                this.amount = 0;
            }

            let Payment = (localStorage.getItem('Payment'));
            let val = (sessionStorage.getItem('wap-val'));
            
            if(!this.$appFunc.prototype.isEmpty(Payment)){
                Payment =  JSON.parse(Payment)
                if(!this.$appFunc.prototype.isEmpty(val)){
                    val = JSON.parse(val);
                    console.log("========")
                    // this.checked = true
                    this.checked = val.checked
                    if(Payment.invoice_type==1){
                        this.radioContent = '普票';
                    }else if(Payment.invoice_type==2){
                        this.radioContent = '专票'
                    }
                    this.radio = Payment.invoice_type;
                    this.paymentTitle = Payment.company_name
                    this.paymentInfo = Payment.tax_id
                    this.invoice_id = Payment.id
                    this.getInvoice = 0;
                }
            }else{
                // 发送请求
                this.$post('/?c=user&a=myInvoice',{
                    page:1,
                    type: 0,
                    limit:1
                }).then((res)=>{
                    if(res.data.list.length>0){
                        if(res.data.list[0].invoice_type==1){
                            this.radioContent = '普票';
                        }else if(res.data.list[0].invoice_type==2){
                            this.radioContent = '专票'
                        }
                        this.paymentTitle = res.data.list[0].company_name;
                        this.paymentInfo = res.data.list[0].tax_id;
                        this.getInvoice = 0;
                    }else{
                        // 跳转填写发票
                        this.getInvoice = 1;
                    }
                });
            }

            /* 获取商家优惠券列表 */
            /* this.$post('/?c=wholesaleCoupon&a=list&t=1',{
                status:1,
                min_amount:1,
                ru_id:this.sellerIds,
            }).then((res)=>{
                if(res.code == 0){
                    this.coupons.push(res.data.list);
                }else if(res.code == 1){
                    this.$toast(res.msg)
                }
            }); */
            /* 获取优惠券列表 */
            this.$post('/?c=wholesaleCoupon&a=list232',{
                status:1,
            }).then((res)=>{
                this.$parent.$refs.loading.style.display = 'none';
                // console.log('优惠券===',res)
                if(res.code == 0){
                    //平台优惠券
                    if(res.data.full.length){
                        this.coupon = res.data.full;
                    }

                    //农联金券
                    if(res.data.money.length) {
                        this.vouchers = res.data.money;
                    }
                    //修复金额为0的问题
                    this.voucherTotal = this.amount;

                    //判断默认选择哪种券 -1都不选择 0-优惠券 1-农联金券
                    let defIndex = -1;
                    // 判断是否有满足条件的优惠券
                    let isCan = false;
                    //优惠券存在
                    if(res.data.full.length) {
                        /*for(var key in this.coupon) {
                            if(this.coupon[key].min_amount <= this.PaymentForGoods) {
                                isCan = true;
                                break;
                            }
                        } */
                        if(this.coupon[0].status == 1 && this.coupon[0].usable == 1 && this.coupon[0].min_amount <= this.PaymentForGoods) {
                            isCan = true;
                        }
                    }

                    if(isCan) {
                        defIndex = 0;
                    }else {
                        //金券存在
                        if(res.data.money.length) {
                            defIndex = 1;
                        }
                    }  

                    if(defIndex == 0) {
                        let data = {
                            coupon_id:res.data.full[0].coupon_id,
                            coupon_price:res.data.full[0].discount_money,
                            coupon_name:res.data.full[0].name,
                            coupon_minAmount:res.data.full[0].min_amount,
                            status:res.data.full[0].status,
                        };

                        this.couponActive = res.data.full[0];
                        this.couponSumbit(data)                         
                    }else if(defIndex == 1){
                        this.defActive = 1;

                        this.vouchersSelected = [res.data.money[0].money_id];
                        
                        //商品金额+运费
                        let all = this.voucherTotal;
                        let maxVouchers = res.data.money[0].discount_money;
                        if(all <= maxVouchers) {
                            maxVouchers = this.toCalculation(all ,0.01,'sub');
                        }else if(maxVouchers <= 0){
                            maxVouchers = 0;
                        }
                        this.voucherMoney = maxVouchers;
                        let val = {selected: this.vouchersSelected, maxVouchers: this.voucherMoney};
                        this.changeVoucher(val);                        
                    }
                    
                }else if(res.code == 1){
                    this.$toast(res.msg)
                }
            });
        },
        
        computed:{
        },
        methods:{
            // 每个店铺内的总金额
            everyTotal(list){
                let nums = 0;
                for(let item in list) {
                    let num = 0;
                    for(let index in list[item].list) {
                        num = Number(num) + Number((list[item].list)[index].unit_price)*Number((list[item].list)[index].goods_number)
                }
                    nums = nums + num
                }
                return nums.toFixed(2)
            },
            //####=>返回
            goPreviousPage(){
                this.$router.push({
                    name:"shoppingCart"
                });
            },
            cutString(str,num) {
                let val = this.$appFunc.prototype.cutString(str,num)
                return val;
            },
            goSubmit(){
               if(this.addTitleID){
                    this.$toast('请选择收货地址!');
                    return;
                }
                //提交信息
                let infoObj = {}
                let eve = event.srcElement?event.srcElement:event.target;
                let confirmHtml = $(eve).parents('div').find('.confirmContnent');
                for(let i=0; i<confirmHtml.length; i++){
                    if($(confirmHtml[i]).find('textarea').val() != ''){
                        let textVal = $(confirmHtml[i]).find('input').val();
                        let dataId = $(confirmHtml[i]).find('.confiromTitle').attr('data-id');
                        infoObj[dataId] = textVal;
                    }
                }
                
                let coupons = [];
                let coupon = {
                    seller_id:0,
                    full_list_id:0,
                }
                if(this.coupon_id>0){
                    coupon.seller_id = 0;
                    coupon.full_list_id = Number(this.coupon_id);
                    coupons.push(coupon);
                }
                if(this.radio == 0){
                    this.invoice_id == ''            //发票ID
                    sessionStorage.removeItem('wap-val')
                    localStorage.removeItem('Payment')
                }
                //农联金券
                let vouchers = [];
                for(var i = 0; i<this.vouchersSelected.length; i++) {
                    vouchers.push({'money_id': this.vouchersSelected[i]});
                }
                
                this.$parent.$refs.loading.style.display = 'flex'
                this.$post('/?c=cart&a=confirm',{
                    total_amount:this.amount,
                    confirm: 1,                             //是否下单
                    address_id: this.address_id,            //地址ID
                    invoice_type: this.radio,               //发票类型
                    invoice_id: this.invoice_id,            //发票ID
                    msg:infoObj,                            //留言
                    coupon:coupons,                         //优惠券
                    coupon_money: vouchers                  //农联金券
                })
                .then((res)=>{
                    switch(res.code){                    
                        case 0:
                            localStorage.removeItem('goodsAdd');
                            localStorage.removeItem('Payment');
                            sessionStorage.removeItem('wap-val');
                            sessionStorage.setItem('wapPrice',res.data.total_amount); 
                            localStorage.removeItem('shoppingCarCount')
                            this.$emit('getShoppingCar')

                            localStorage.removeItem('shoppingCarCount')
                            this.$emit('getShoppingCar')
                            
                            // 判断是否需要商家联系 
                            if(res.data.wholesale_sure=="1"){
                                this.$parent.$refs.loading.style.display = 'none'
                                this.$toast('因生鲜市场价格存在变动，如果价格有异议，可以直接联系客服进行精确重量及价格确认！');
                                  this.$router.push({
                                    path:'/comment',
                                    query:{
                                        id:res.data.id   //订单号
                                    }
                                });
                                break;
                            }
                            this.goToPayPage(res.data.id)
                            break;
                        case 1:
                            this.$toast(res.msg);
                            this.$parent.$refs.loading.style.display = 'none'
                        default:
                            this.$toast(res.msg);
                            this.$parent.$refs.loading.style.display = 'none'
                            break;
                    }
                })
            },
            //判断是跳转到一般支付页还是线下支付页
            goToPayPage(order_id){
                this.$post('/?c=order&a=payStatus',{
                    order_sn: order_id  //订单号
                })
                .then((res)=>{   
                    console.log('/?c=order&a=payStatus===', res)                 
                    this.$parent.$refs.loading.style.display = 'none'
                    switch(res.code){                    
                        case 0:
                            let Path = ''
                            if(res.data.online_pay === 1) {
                                //线上支付
                                Path = '/Cashier'
                            }else {
                                //线下支付
                                Path = '/Payoff'
                            }
                            this.$router.push({
                                path:Path,
                                query:{
                                    id:order_id,
                                    endtime: res.data.end_time,
                                    offline_img: res.data.offline_img
                                }
                            });
                            break;
                        case 1:
                            this.$toast(res.msg);
                        default:
                            break;
                    }
                })                
            },
            //获取地址
            add(){
                this.$router.push({
                    path:'/receivingGoods'
                })
            },
            //选择发票
            setPayment(){
                if(this.getInvoice == 0){
                    this.$router.push({
                        path:'/invoiceInfo',
                        query:{
                            index:this.radio,
                            id:1,
                        }
                    })
                }else{
                    this.$router.push({
                        path:'/getinvoiceInfo',
                        query:{
                            id:1,
                        }
                    })
                }
                
            },
            
            //选择发票
            checkedClock(){
                const Payment = JSON.parse(localStorage.getItem('Payment'));
                if(Payment != null){
                    console.log("========")
                    // this.checked = true
                    if(this.checked == true){
                        this.checked = true;
                    }else{
                        this.checked = false;
                    }
                    if(Payment.invoice_type==1){
                        this.radioContent = '普票';
                    }else if(Payment.invoice_type==2){
                        this.radioContent = '专票'
                    }
                    this.radio = Payment.invoice_type;
                    this.paymentTitle = Payment.company_name
                    this.paymentInfo = Payment.tax_id
                    this.invoice_id = Payment.id
                }else{
                    // 发送请求
                    this.$post('/?c=user&a=myInvoice',{
                        page:1,
                        type: 0,
                        limit:1
                    }).then((res)=>{
                        if(res.data.list.length>0){
                            if(res.data.list[0].invoice_type==1){
                                this.radioContent = '普票';
                            }else if(res.data.list[0].invoice_type==2){
                                this.radioContent = '专票'
                            }
                            this.paymentTitle = res.data.list[0].company_name;
                            this.paymentInfo = res.data.list[0].tax_id;
                            this.radio = res.data.list[0].invoice_type;
                            this.invoice_id = res.data.list[0].id;
                        }else{
                            // 跳转填写发票
                            this.$router.push({
                                path:'/getinvoiceInfo',
                                query:{
                                    id:1,
                                }
                            })
                        }
                    });
                }

            },

            changeCoupon(){
                if(!this.coupon.length && !this.vouchers.length) {
                    return
                }
                this.couponShow = true;
            },
            cancel(){
                this.couponShow = false;
                
                this.coupon_name = '';
                this.coupon_id = 0;
                this.coupon_price = 0;
                this.describeText = '不使用';

                let freightNum = Number(this.freightNum);
                this.amount = Number(this.PaymentForGoods - this.coupon_price).toFixed(2);

                if(this.amount >= Number(this.freeMoney) ){
                    let shippingFee = 0;
                    this.shippingFee = shippingFee;
                    this.amount = Number(shippingFee + this.PaymentForGoods).toFixed(2);
                }else{
                    let shippingFee = Number(this.shippingFee);
                    this.shippingFee = shippingFee;
                    this.amount = Number(shippingFee + this.PaymentForGoods).toFixed(2);
                }

                if(this.amount<=0){
                    this.amount = 0;
                }
            },
            couponSumbit(data){
                //清除选中的金券
                this.vouchersSelected = [];
                this.voucherMoney = 0;

                this.couponShow = false;
                this.describeText = data.coupon_name;
                
                if(data.coupon_price >= this.PaymentForGoods && this.freightNum <= 0) {
                    //最大可优惠金额 = 总商品金额 - 0.01(当不存在运费时)
                    data.coupon_price = this.toCalculation(this.PaymentForGoods, 0.01, 'sub');
                }else if(data.coupon_price >= this.PaymentForGoods && this.freightNum > 0){
                    //最大可优惠金额 = 总商品金额 (当存在运费时)
                    data.coupon_price = this.PaymentForGoods;
                }

                if(data.coupon_minAmount <= this.PaymentForGoods){
                    let amount = Number(this.PaymentForGoods) - Number(data.coupon_price).toFixed(2);
                    this.coupon_name = data.coupon_name;
                    this.coupon_id = data.coupon_id;
                    this.coupon_price = data.coupon_price;
                    this.coupon_minAmount = data.coupon_minAmount;
                    if(amount < Number(this.freeMoney) ){
                        let shippingFee = Number(this.freightNum);
                        this.shippingFee = shippingFee;
                        this.amount = Number(shippingFee + this.PaymentForGoods - this.coupon_price).toFixed(2);
                    }else{
                        let shippingFee = 0;
                        this.shippingFee = 0;
                        this.amount = Number(shippingFee + this.PaymentForGoods - this.coupon_price).toFixed(2);
                    }
                    if(this.amount<=0){
                        this.amount = 0;
                    }
                }
            },
            //选中金券过后
            changeVoucher(val){
                //清除选中的优惠券
                this.cancel();

                //金券 
                this.vouchersSelected = []; 
                this.vouchersSelected = val.selected;
                if(val.selected.length) {
                    this.describeText = '农联金券（'+val.selected.length+'张）';
                }else {
                    this.describeText = '不使用';
                }
                this.couponShow = false;
                //最新优惠金额 <= 商品金额+运费-所有金券值 -0.01
                this.voucherMoney = val.maxVouchers;
                //实际支付金额
                this.amount = this.toCalculation(this.voucherTotal, this.voucherMoney, 'sub');
            },
            //修正js两位小数加减法错误问题的方法  sign add-加法  sub-减法
            toCalculation(x, y, sign){
                let a = x.toString().split('.');
                let b = y.toString().split('.');

                if(a[1] && a[1].length == 1) a[1] = a[1] + '0'; 
                if(b[1] && b[1].length == 1) b[1] = b[1] + '0'; 

                if(!a[1]) a.push('00');
                if(!b[1]) b.push('00');

                let as = Number(a.join(''));
                let bs = Number(b.join(''));

                // console.log(a, b, as, bs);

                if(sign == 'add') {
                    return (as + bs)/100;
                }else if(sign == 'sub'){
                    return (as - bs)/100;
                }
            },
            //去确认收货方式 0-未选择 1-否 2-是
            toSureType(status) {
                this.$post('/?c=user&a=receive',{
                    receive: status
                })
                .then((res)=>{
                    switch(res.code){
                        case 0:
                            //更新本地缓存的 无人收货方式 个人信息
                            const userinfo = JSON.parse(sessionStorage.getItem('userInfo'));
                            userinfo.receive = status + '';
                            sessionStorage.setItem('userInfo',JSON.stringify(userinfo));

                            this.isShowNotice = false;
                            this.$toast('确认收货方式成功');
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
        freight(item){
            console.log(item)
        }
    }
</script>
<!-- <style>
    .confirm .van-checkbox__icon .van-icon{
        background-color: #fff;
    }
    .confirm .van-checkbox__icon--checked .van-icon{
        background-color: #f44;
    }
    .confirm .paymentInfo-submit .van-switch-cell{
        width: auto;
        margin: auto;
        margin-right: 0;
    }
    .confirm .paymentInfo-submit .van-hairline--top-bottom::after{
        border:none;
        border-bottom: 1px solid #ebedf0;
    }
    .confirm .van-switch--on{
        background-color: #f44;
    }
</style> -->

<style scoped>
.van-nav-bar .van-icon {
    color: #333333;
}
    .dflex{
        display: flex;
        justify-content: flex-start;
    }
    .confirm {
        background-color: #f2f2f2;
    }
    .confirmBar{
        border-bottom: 1px solid #eee;
    }
    /* 订单信息 */
    .confirmContnent{
        background: #fff;
        margin-top: 10px;
    }
    .confirmContnent-div {
        padding: 0 .6rem;
        background-color:  #f2f2f2;
    }
    /* 标题 */
    .confiromTitle{
        height: 2rem;
        line-height: 2rem;
        font-size: 14px;
        padding: 5px 0.6rem 3px;
        border-bottom: 1px solid #eee;
        background-color: #ffffff;
        width: 100%;
        margin-left: -0.6rem;
    }
    .confiromTitle img {
        width: 18px;
        padding-right: 4px;
        vertical-align: text-top;
    }
    /* 订单信息 */
    .confiromInfo{
        display: flex;
        /*height: 6rem;*/
        flex-wrap: nowrap;
        padding-top: .4rem;
        padding-bottom: 0.4rem;
    }
    .confiromLogo{
        /*flex: 6;*/
        padding-right: 10px;
    }
    .confiromLogo img {
        width: 70px;
        height: 70px;
        border-radius: 3px;
    }
    .confirGoodsName{
        flex: 20;
        padding: 0 .4rem;
    }
    .confirGoodsName h4 {
        font-size: 12px;
        font-weight: 500;
        color: #424242;
        
        height: 30px;
        line-height: 15px;
        margin-top: 0;
        margin-bottom: 9px;
        display: -webkit-box;
        /*! autoprefixer: off */
        -webkit-box-orient: vertical;
        /* autoprefixer: on */
        -webkit-line-clamp: 2;
        overflow: hidden;        
    }
    .confirGoodsName p {
        font-size: 12px;
        color: #808080;
        margin: 0;
    }
    .confirGoodsName p span {
        float: right;
    }
    /* fixed 清除浮动的bug */
    .confirGoodsName p::after {
        clear:both;
        content:' ';
        display: block;
    }
    /* 属性信息 */
    .confiromAttributeData{
        display: flex;
        flex-wrap: nowrap;
        padding-bottom: .6rem;
    }
    .confiromAttributeData p{
        margin: 0;
    }
    .confiromAttributeInfo{
        flex: 20;
        font-size: 14px;
    }
    .confiromAttributeInfo span{
        color: #777;
        margin-right: .3rem;
    }
    .confiromAttributeName{
        flex: 10;
        font-size: 14px;
        text-align: right;
    }
    /* 总需求信息 */
    .allInfo{
        padding-top: 10px;
        border-bottom: 1px solid #eee;
        background-color: #eee;
    }
    .allData{
        display: flex;
        flex-wrap: nowrap;
        padding: 10px .6rem;
        background-color: #fff;
        margin-top: 10px;
    }
    .allData p{
        margin: 0;
        color: #EE2D2D;
        font-size: 14px;
        height: 1.5rem;
        line-height: 1.5rem;
        text-align: right;
    }
    .allData span{
        color: #424242;
        float: left;
    }
    .allData p i {
        font-style: normal;
        color: #424242;
    }
    .allData p i.priceFree {
        color: #999;
        text-decoration: line-through;
    }
    .paymentInformation{
        flex: 12;
    }

    .calculateInfo{
        flex: 8;
        text-align: right;
    }
    .calculateInfo e{
        color: #d1442b;
    }
    .submit-bar{
        border-top: 1px solid #eee;
    }
    /* 收货地址 */
    .add{
        padding: 12px .6rem;
        font-size: 14px;
        background-color: #fff;
        border-bottom: 1px solid #eee;   
    }
    /* .add-title{
        font-size: 16px;
        margin: 0;
        margin-bottom: .6rem;
    }
    .add-info{
        font-size: 16px;
    } */
    .add-contain {
        min-height: 40px;
        padding: 0 40px 0 30px;
        position: relative;
    }
    .add-loaction {
        width: 17px;
        font-size: 20px;
        color: #EE2D2D;
        position: absolute;
        left: 0;
        top: 10px;
    }
        
    .add-contain-none{
        display: block;
        color: #EE2D2D;
        border: 1px solid #EE2D2D;
        padding: 0;
        width: 110px;
        height: 28px;
        line-height: 28px;
        text-align: center;
        margin: 20px auto;
        border-radius: 5px;
    }
    .add-content p {
        margin: 0;
        font-size: 14px;
    }
    .add-content p:last-child {
        font-size: 12px;
    }
    .add-arrow {
        font-size: 20px;
        color: #999999;
        position: absolute;
        right: 0;
        top: 10px;
    }

    /* 订单信息 */
    .paymentInfo{
        font-size: 16px;
        background-color: #fff;
    }
    .paymentInfo-title{
        font-size: 14px;
        color: #424242;
        margin: auto;
        margin-left: 12px;
    }
    .paymentInfo-title span{
        font-size: 12px;
        color: #808080;
    }
    .paymentInfo-info{
        padding: .5rem .6rem;
        border-top: 1px solid #D8D8D8;
    }
    .paymentInfo-info .van-radio{
        display: inline-block;
        margin-right: 1rem;
    }
    .payment-info-box{
        padding: 0 .6rem;
        font-size: 14px;
    }
    .payment-info-box span{
        width: 7rem;
        display: inline-block;
    }
    .paymentInfo-info-title-box,
    .paymentInfo-info-tx-box{
        line-height: 1.1rem;
    }
    .paymentInfo-info-title,
    .paymentInfo-info-tx{
        text-align: right;
    }
    .paymentInfo-info-title-box div {
        line-height: 1.8em;
        color: #424242;
        font-size: 14px;
    }
    .message{
        font-size: .74rem;
        padding: 12px 0.6rem;
        background-color: #ffffff;
    }
    .message-input {
        display: flex;
        margin: 0;
    }
    .message-input span {
        padding-top: 1px;
    }
    .messageInput{
      flex-grow: 1;
      margin: 0;
      border: none;
    }
    .message-money {
        margin: 7px 0 0;
    }
    .message-money span {
        color: #EE2D2D;
        float: right;
    }

    .paymentInfo-coupon {
        font-size: 14px;
        color: #424242;
        padding: 10px .6rem;
        border-top: 1px solid #D8D8D8;
    }
    .paymentInfo-coupon i,
    .paymentInfo-coupon span{
        float: right;
        font-size: 15px;
        color: #999999;
        line-height: 1.3em;
    }

    .all-title{
        display: flex;
        justify-content: space-between;
    }
    .van-submit-box{
        display: flex;
        justify-content: flex-end;
    }
    .van-submit{
        display: flex;
        justify-content: flex-end;
        margin: auto;
        margin-right: 12px;
        padding-right: 0;
        text-align: center;
        line-height: 1em;
    }
    .van-submit span{
        display: block;
        font-size: 14px;
    }
    .van-submit span.van-submit-price{
        font-size: 18px;
        color: #f44;
    }
    .van-submit-bar .van-button{
        height: 50px;
        line-height: 48px;
        width: 110px;
        background-color: #f44;
        border: 1px solid #f44;
        color: #fff;
    }

    .dflex .van-switch-cell {
        width: auto;
    }

    .notice {
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.4);
        position: fixed;
        left: 0;
        top: 0;
        z-index: 1003;
    }
    .notice-box {
        width: 226px;
        height: 208px;
        padding: 0 15px 20px;
        background-color: #ffffff;
        border-radius: 3px;
        position: fixed;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        margin: auto;
    }
    .notice-box h6 {
        font-size: 15px;
        font-weight: normal;
        text-align: center;
        margin: 0;
        padding: 10px 0;
    }
    .notice-box p {
        font-size: 14px;
        line-height: 1.4em;
    }
    .notice-btns {
        padding: 0 12px;
        font-size: 14px;
        text-align: center;
        position: relative;
    }
    .notice-btns div {
        width: 100%;
        padding: 9px 0 11px;
        color: #ffffff;
        background-color: #d9d9d9;
        border-radius: 19px;
        margin-top: 14px;
    }
    .notice-btns div.notice-red {
        background-color: #ee2d2d;
    }

</style>
<style lang="less" scoped>
    .van-popup--bottom{
        max-height: none;
        overflow: hidden;
        border-radius: 15px 15px 0 0;
        background-color: #f2f2f2;
    }
</style>
