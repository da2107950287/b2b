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
        <div class="confirmContnent">
            <div class="confirmContnent-div">
                <div class="confiromTitle" v-if="datas.shop_name">
                    <img src="../../assets/img/dianshang.png" alt="">
                    {{datas.shop_name}}
                </div>
                <div class="confiromInfo">
                    <div class="confiromLogo">
                        <img :src="datas.goods_thumb" width="100%" />
                    </div>
                    <div class="confirGoodsName">
                        <h4>{{datas.goods_name}}</h4>
                        <p>{{datas.goods_attr}} <span>&yen;{{price}}</span></p>
                        <!-- <p><span>&times;{{info.goods_number}}</span></p> -->
                      </div>
                </div>
            </div>
            <div class="message">
                <div class="mesage-num">购买数量
                    <div class="mesage-num-right">
                        {{minimumNumber}}X<van-stepper v-model="value" integer :min="1" :step="1" @change="onChange"/>
                    </div>
                </div>
                <p class="message-money">总数量 <span>{{number}}</span></p>
            </div>
        </div>

        <div class="remarks">
            <p class="remarks-input"><span>备注：</span> <input type="text" class='messageInput' placeholder="可以告诉卖家你的特殊要求" v-model="msg"></p>
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
                
            </div>
        </div>

        <!-- 总金额等 -->
        <div class="allData">
            <div class="paymentInformation">
                <p><span>商品金额</span>&yen;{{total_amount}}</p>
            </div>
        </div>

        <!-- 提交信息 -->
        <div style="height:104px"></div>
        <!-- 底部按钮-->
        <div class="submit-bar van-submit-bar">
            <div class="submit-bar van-submit-bar">
                <div class="van-submit-box">
                    <div class="van-submit"><span>合计：</span><span class="van-submit-price">&yen;{{total_amount}}</span></div>
                    <button class="van-button" @click="goSubmit">
                        <span class="van-button__text">确认订单</span>
                    </button>
                </div>
            </div>
        </div>

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
    import '../../assets/css/groupBuying/vanStepper.css'
    import navbar from '../navbar/nav.vue'
    export default {
        components: {
            navbar,
        },
        data() {
            return {
                //当前购买数量 份数
                value: 1,
                //计数器
                changing: false, 
                //活动id
                activity_id: '',
                //商品数量
                number: 0,
                //最小起订量
                minimumNumber: 0,
                //商品单价
                price: 0,
                //总价
                total_amount: 0,
                //收货地址id
                address_id: 0,
                //发票id
                invoice_id: '',
                //发票类型
                invoice_type: '',
                //买家留言
                msg: '',

                //是否有发票  默认 :0 有; 1 没有
                getInvoice:0,
                // 发票控制开关
                checked:false,

                addTitle:'请选择收货地址',
                addTitleID:true,
                addInfo:'',
                addPhone:'',

                datas: {},

                data:[],

                paymentTitle:'点击选择内容',     // 标题
                paymentInfo:'点击选择内容',      // 信息
                shippingFee:0.0,                // 运费总计
                PaymentForGoods:0.00,           // 货款总计
                radioContent:'请选择发票信息',   // 发票内容

                sellerIds: '',                   // 商家ID

                //是否显示无人收货
                isShowNotice: false,
            }
        },
        created(){
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

            // 默认收货地址
            if(!localStorage.getItem('goodsAdd') || this.$appFunc.prototype.isEmpty(JSON.parse(localStorage.getItem('goodsAdd')))){
                //为选择收货地址
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
                });
            }else {
                //已选择收货地址
                const goodsAdd = JSON.parse(localStorage.getItem('goodsAdd'))
                this.addTitle = goodsAdd.consignee
                this.addTitleID = false
                this.addInfo = goodsAdd.full_address
                this.addPhone = goodsAdd.mobile
                this.address_id = goodsAdd.address_id                
            }

            //活动商品详情页存储的数据
            let datas = JSON.parse(localStorage.getItem('goods_about_status'));
            this.activity_id = datas.activity_id;
            this.minimumNumber = datas.minimumNumber;
            this.value = datas.value;
            this.price = datas.price;
            this.sellerIds = datas.sellerIds;

            this.number = this.value*this.minimumNumber;
            this.total_amount = this.price * this.number;
            this.datas = datas;

            //当两者都为''时，来自批发分类页， 再请求接口获得相关知值
            if(this.activity_id === '' && this.minimumNumber === '') {
                this.isActivityGoods();
            }

            //发票相关部分
            if(localStorage.getItem('Payment')){
                let Payment =  JSON.parse(localStorage.getItem('Payment'))
                if(sessionStorage.getItem('wap-val')){
                    let val = JSON.parse(sessionStorage.getItem('wap-val'));
                    console.log("========")
                    // this.checked = true
                    this.checked = val.checked
                    if(Payment.invoice_type==1){
                        this.radioContent = '普票';
                    }else if(Payment.invoice_type==2){
                        this.radioContent = '专票'
                    }
                    this.invoice_type = Payment.invoice_type;
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
        },
        
        computed:{
        },
        methods:{
            //查询是否为活动商品  ,针对 活动id和最小起订量不存在特意做的操作
            isActivityGoods(){
                this.$post('/?c=groupBuying&a=isActivityGoods', {
                    wId: this.wId
                })
                .then((res) => {
                    switch (res.code) {
                        case 0:
                            if(res.data.isActivity == 1) {
                                let datas = JSON.parse(localStorage.getItem('goods_about_status'));
                                datas.activity_id = res.data.info.activity_id;
                                datas.minimum_number = res.data.info.minimum_number;
                                localStorage.setItem('goods_about_status', JSON.stringify(datas));
                                
                                this.activity_id = res.data.info.activity_id;
                                this.minimumNumber = res.data.info.minimum_number;
                            }
                            break;
                        default:
                            this.$toast(res.msg);
                            break;
                    }
                });
            },
            //计数器数值改变
            onChange(val){
                if (this.changing) {
                    return;
                }
                this.changing = true;
                this.number = val * this.minimumNumber;
                this.total_amount = this.price * this.number;
                this.value = val;
                let datas = JSON.parse(localStorage.getItem('goods_about_status'));
                datas.value = val;
                localStorage.setItem('goods_about_status', JSON.stringify(datas));
                this.changing = false;
            },
            //####=>返回
            goPreviousPage(){
                if(this.fromHerf == null){
                    this.$router.push({
                        path:'/index'
                    });
                }else{
                    this.$router.go(-1);
                }
            },
            cutString(str,num) {
                let val = this.$appFunc.prototype.cutString(str,num)
                return val;
            },
            goSubmit(){
                if(!this.addTitle){
                    this.$toast('请选择收货地址!');
                    return;
                }

                if(this.invoice_type == 0){
                    this.invoice_id == ''            //发票ID
                    sessionStorage.removeItem('wap-val')
                    localStorage.removeItem('Payment')
                }

                
                this.$post('/?c=groupBuying&a=createOrder',{
                    activity_id: this.activity_id,
                    number: this.number,
                    total_amount: this.total_amount,
                    address_id: this.address_id,
                    invoice_id: this.invoice_id,
                    invoice_type: this.invoice_type,
                    msg: this.msg,
                })
                .then((res)=>{
                
                    switch(res.code){                    
                        case 0:
                            // localStorage.removeItem('goods_about_status')
                            //收货地址
                            localStorage.removeItem('goodsAdd');
                            //发票相关
                            localStorage.removeItem('Payment');
                            sessionStorage.removeItem('wap-val');
                            //支付金额
                            sessionStorage.setItem('wapPrice',res.data.total_amount); 
                            
                            // 判断是否需要商家联系 
                            /*if(res.data.wholesale_sure=="1"){
                                 this.$toast('因生鲜市场价格存在变动，如果价格有异议，可以直接联系客服进行精确重量及价格确认！');
                                  this.$router.push({
                                    path:'/comment',
                                    query:{
                                        id:res.data.id   //订单号
                                    }
                                });
                                break;
                            }*/
                            this.$router.push({
                                path:'/Cashier',
                                query:{
                                    id:res.data.order_sn,
                                    endtime: res.data.end_time,
                                    type: 'GrouyBuyingConfirmAnOrder'
                                }
                            });
                            break;
                        case 1:
                            this.$toast(res.msg);
                        default:
                            this.$toast(res.msg);
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
                            index:this.invoice_type,
                            id:3,
                        }
                    })
                }else{
                    this.$router.push({
                        path:'/getinvoiceInfo',
                        query:{
                            id:3,
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
                    this.invoice_type = Payment.invoice_type;
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
                        }else{
                            // 跳转填写发票
                            this.$router.push({
                                path:'/getinvoiceInfo',
                                query:{
                                    id:3,
                                }
                            })
                        }
                    });
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
    .mesage-num {
        overflow: hidden;
        line-height: 30px;
        padding: 0 0 5px;
    }
    .mesage-num .mesage-num-right {
        float: right;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        font-size: 12px;
    }
    .mesage-num .van-stepper {
        margin-left: 5px;
    }
    .message-money {
        margin: 7px 0 0;
    }
    .message-money span {
        float: right;
    }

    .remarks {
        font-size: .74rem;
        padding: 12px 0.6rem;
        background-color: #ffffff;
        margin-top: 10px;
    }
    .remarks-input {
        display: flex;
        margin: 0;
    }
    .remarks-input span {
        padding-top: 1px;
    }
    .remarks .messageInput{
      flex-grow: 1;
      margin: 0;
      border: none;
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
        border-radius: 15px 15px 0 0;
        background-color: #f2f2f2;
    }
</style>
