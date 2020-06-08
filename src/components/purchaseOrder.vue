<template>
    <div class="purchase">
        <!-- 求购单 -->
        <navbar type="left" title="发布求购单" @clickleft="goPreviousPage"></navbar>
        <!-- 求购信息内容 -->
        <div class="purchase-content">
            <van-cell-group>
                <van-field
                    v-model="purchaseTitle"
                    class="bb_f2f2f2"
                    clearable
                    label="商品名称"
                    placeholder="请输入商品名称"
                    @blur="titleBlur"
                />
                <div @click="goodsClass" class="bb_f2f2f2">
                    <van-field
                        class="colorClass"
                        v-model="catName"
                        
                        clearable
                        readonly
                        label="商品分类"
                        placeholder="请选择商品分类"
                    />
                </div>
                <van-field
                    v-model="goods[0].origin"
                    class="bb_f2f2f2"
                    clearable
                    label="产地"
                    placeholder="请输入产地"
                    @blur="origin"
                />
                <div class="goods-number-box bb_f2f2f2">
                    <van-field
                        class="goods-number"
                        v-model="goods[0].goods_number"
                        type='number'
                        
                        clearable
                        label="商品数量"
                        placeholder="请输入求购商品数量"
                        @blur="goodsNumber"
                    />
                    <span class="goods-number-unit">{{goods[0].unit}}</span>
                </div>
                <div @click="goodsPrescription(1)" class="bb_f2f2f2">
                    <van-field
                        class="colorClass"
                        v-model="endTime"
                        
                        clearable
                        readonly
                        label="报价时间"
                        placeholder="请选择报价截至时间"
                    />
                </div>
                <div @click="goodsPrescription(2)" class="bb_f2f2f2">
                    <van-field
                        class="colorClass"
                        v-model="receivedTime"
                        
                        clearable
                        readonly
                        label="交货时间"
                        placeholder="请选择交货时间"
                    />
                </div>
                <div @click="goAddInfo" class="bb_f2f2f2">
                    <van-field
                        class="colorClass"
                        v-model="addInfo"
                        clearable
                        readonly
                        label="收货地址"
                        placeholder="请选择收货地址"
                        type="textarea"
                        rows="1"
                        autosize
                    />
                </div>
                
                <van-field
                    v-model="goods[0].goods_intro"
                    label="商品描述"
                    type="textarea"
                    placeholder="请输入对商品的描述"
                    rows="1"
                    autosize
                    @blur="intro"
                    class="bb_f2f2f2"
                />
            </van-cell-group>
            <div class="business-box">
                <div class="business-licence">
                    <div class="van-cell__title van-field__label">商品主图</div>
                    <uploadBox :imgList="imgList" :imgName="imgName" :count="3"></uploadBox>
                </div>
            </div>

            <!-- 弹出层 -->
            <popup></popup>

            <!-- 开票信息 -->
           <div class="paymentInfo">
                <div class="paymentInfo-submit">
                    <van-cell-group class="dflex">
                        <div class="paymentInfo-title">是否开发票<span>(请选择开票信息，可不选)</span></div>
                        <van-switch-cell v-model="checked" @change="checkedClock" />
                    </van-cell-group>
                    
                </div>
                <div class="paymentInfo-info" v-if="checked">
                    <div class="payment-info-box" @click="setPayment">
                        <van-row class="paymentInfo-info-title-box fz_14">
                            <div>发票类型：{{radioContent}}</div>
                            <div>发票抬头：{{paymentTitle}}</div>
                            <div>纳税人识别号：{{paymentInfo}}</div>
                        </van-row>
                    </div>
                </div>
            </div>

        </div>

        <div class="checked">
            <van-checkbox v-model="checkeds">仅选择农联优选商家</van-checkbox>
            <div class="introductionInfo" v-show="label_info != ''">({{label_info}})</div>
        </div>
        <div class="purchaseButton dflex">
            <van-button size="large" @click="submitReset">重置</van-button>
            <van-button type="danger" size="large" @click="submitButton">提交</van-button>
        </div>

        <!-- 报价时间 -->
        <van-popup 
            v-model="isShowPickerTiem" 
            position="bottom"
            @close="clickCancel"
            :style="{ height: '40%' }">
            <van-datetime-picker
                v-model="currentDate"
                type="datetime"
                title="请选择日期"
                :min-date="minDate"
                @cancel="clickCancel"
                @confirm="clickConfirm"
            />
        </van-popup>
        <!-- 交付时间 -->
        <!-- <van-actionsheet v-model="isReceivedTiem">
            <van-datetime-picker
                v-model="currentReceiveDate"
                type="datetime"
                title="请选择日期"
                :min-date="minReceiveDate"
                @cancel="clickReceivedCancel"
                @confirm="clickReceivedConfirm"
            />
        </van-actionsheet> -->
        <goodsClass class="goodsClass-alert" chose="radioDom" @onClickClose="onClickClose" v-if="goodsClassShow"></goodsClass>
        <receivingGoods class="goodsClass-alert" @onClickClose="onReceivingGoodClose" v-if="receivingGoodShow"></receivingGoods>

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

    import Vue from 'vue';
    import $ from 'jquery';
    import {HandleTime,post,is_wexin,appFunc} from '../assets/js/commonAPI.js';
    import '../assets/css/commonstyle.css'
    import '../assets/css/resetiu.css'
    Vue.prototype.$post = post;
    Vue.prototype.$appFunc = appFunc;
    import uploadBox from '../components/upload/uploadBox.vue'
    
    import navbar from '../components/navbar/nav.vue'
    import popup from '../components/component/popup/popup'
    import goodsClass from '../components/goodsClass/goodsClass.vue'
    import receivingGoods from '../components/goodsClass/receivingGoods.vue'
    export default {
        data() {
            return {
                purchaseTitle:'',                   //####=>求购单标题
                endTime:'',                         //####=>报价时间
                receivedTime:'',                    //####=>交付日期
                address_id:'',                      //####=>个人收货ID
                is_only_certified: 0,               //####=>是否选择农联优选
                need_invoice:0,                    //####=>是否需要发票
                invoice_id:0,                      //####=>个人发票ID
                goods:[{
                    cat_id:'',                      //####=>商品类型
                    goods_intro:'',                 //####=>商品名称
                    goods_number:'',                //####=>商品数量
                    origin:'',                      //####=>产地
                    goods_img: [],                   //####=>商品图片
                    unit:'',                        //商品单位
                }],

                isShowPickerTiem:false,
                isReceivedTiem:false,
                isGoodsClass:false,
                dateLock : 1,                       // 时间选择 1为截至时间 2为交货时间
                getDate:new Date(),                 // 存储时间
                getMinDate:new Date(),              // 存储最小时间
                currentDate: new Date(),            //####=>初始化报价时间
                minDate: new Date(),                //####=>最小公示时间
                currentReceiveDate: new Date(),     //####=>初始化交货时间
                minReceiveDate:new Date(),          //####=>初始化最小接收时间
                val:0,
                goodsClassList:[],                  //####=>商品分类列表
                radio:'',
                checked:false,                        //发票控制开关
                checkeds: 0,
                invoice: 0,
                paymentTitle:'点击选择内容',        //标题
                paymentInfo:'点击选择内容',         //信息
                radioContent:'请选择发票信息',         //信息

                addInfo:'',
                is_weixin:is_wexin(),
                imgName:'purchaseImg',
                imgList:[],
                getInvoice:0,          //是否有发票  默认 :0 有; 1 没有
                label_info:'',          //农联优选说明
                postClock: 0,           //请求开关


                goodsClassShow:false,     //分类选择显示
                receivingGoodShow:false,     //分类选择显示
                idarr:'',                 //获取所有id
                onetitle:'',
                catName: '',              //####=>商品分类名称 

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

            /* 获取农联优选说明 */
            let introductionInfo = sessionStorage.getItem('introductionInfo')
            if(this.$appFunc.prototype.isEmpty(introductionInfo)){
                this.$post('/?a=labelInfo',{
                }).then((res)=>{
                    switch (res.code) {
                        case 0:
                            this.label_info = res.data.label_info;
                            sessionStorage.setItem('introductionInfo',res.data.label_info)
                            break;
                        case 1:
                            this.$toast(res.msg);
                            break;
                        default:
                            break;
                    }
                });
            }else{
                this.label_info = introductionInfo
            }

            let purchaseImg = JSON.parse(localStorage.getItem('purchaseImg'));
            if(!this.$appFunc.prototype.isEmpty(purchaseImg)){
                this.imgList = purchaseImg;
            }

            // 获取收货地址
             let goodsAdd = localStorage.getItem('goodsAdd');
            if(goodsAdd != null && goodsAdd != '' && goodsAdd){
                const GoodsAdd = JSON.parse(goodsAdd);
                this.addInfo = GoodsAdd.full_address;
                this.address_id = GoodsAdd.address_id
            }
            //####=>判断当前页面是否为注册页面
            if(localStorage.getItem('purchaseTitle') != null){
                this.purchaseTitle = localStorage.getItem('purchaseTitle');
            }
            if(localStorage.getItem('goods_intro') != null){
                this.goods[0].goods_intro = localStorage.getItem('goods_intro');
            }
            if(localStorage.getItem('origin') != null){
                 this.goods[0].origin = localStorage.getItem('origin');
            }
            if(localStorage.getItem('goods_number') != null){
                this.goods[0].goods_number = localStorage.getItem('goods_number');
            }
            if(localStorage.getItem('endTime') != null){
                this.endTime = localStorage.getItem('endTime');
            }
            this.minDate.setDate(this.minDate.getDate() + 1);   //至少留出1天进行报价
            this.minDate.setHours(this.minDate.getHours() + 1);   

            this.getMinDate = this.minDate;

            if(localStorage.getItem('receivedTime') != null){
                this.receivedTime = localStorage.getItem('receivedTime');
            }
            this.minReceiveDate = this.setReceiveDay(this.endTime);

            let good_img=JSON.parse(localStorage.getItem('goodsImg'));
            if(!this.$appFunc.prototype.isEmpty(good_img)){
                this.imgList = good_img;
            }

            
            let oneitem=localStorage.getItem('enterItem');
            let twoitem=localStorage.getItem('enterlable');

            if(oneitem!==''&&oneitem!==null){
            let oneitemObj=JSON.parse(oneitem);
            this.onetitle=oneitemObj.cat_name
            }
            if(twoitem!==''&&twoitem!==null){
                let names='';
                let ids='';
                let twoitemObj=JSON.parse(twoitem);
                console.log(twoitemObj);
                for(var key in twoitemObj){
                    names+=('|'+twoitemObj[key].name);
                    ids+=(key+',');
                    this.goods[0].unit = twoitemObj[key].unit;
                }
                ids = ids.substring(0,ids.length-1);
                this.goods[0].cat_id = ids;
                this.catName=this.onetitle+'\xa0'+names
            }

            //发票
            const Payment = JSON.parse(localStorage.getItem('Payment'));
            const val = JSON.parse(sessionStorage.getItem('wap-val'));
            if(Payment != null){
                // this.checked = true
                this.checked = val.checked;
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
            }else{
                // 发送请求
                this.$post('/?c=user&a=myInvoice',{
                    page:1,
                    type: 0,
                    limit:1
                }).then((res)=>{
                    switch(res.code){
                        case 0:
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
                            break;
                        default:
                            break;
                    }
                    
                });
            }
            
            localStorage.removeItem('enterItem');
            localStorage.removeItem('enterlable');
        },
        methods:{
            goPreviousPage(){
                this.$router.go(-1);
            },
            setReceiveDay(endTime){
                if(endTime != ""){
                    let endDate = new Date(endTime);
                    endDate.setDate(endDate.getDate() + 2) ;//至少留出空闲时间：选择1天，付款0.5小时，备货送货23.5天
                    return endDate;
                }else{
                    let endDate = new Date();
                    endDate.setDate(endDate.getDate() + 2) ;//至少留出空闲时间：选择1天，付款0.5小时，备货送货23.5天
                    return endDate;
                }
            },
            // formatDay(day){
            //     let m = day.getMonth()+1;
            //     // return day.getFullYear()+'-'+m+'-'+day.getDate();
            //
            // },
            //####=>报价时间
            goodsPrescription(type){
                this.isShowPickerTiem = true;
                this.dateLock = type;
                function IsPC() {
                    var userAgentInfo = navigator.userAgent;
                    var Agents = ["Android", "iPhone",
                        "SymbianOS", "Windows Phone",
                        "iPad", "iPod"];
                    var flag = true;
                    for (var v = 0; v < Agents.length; v++) {
                        if (userAgentInfo.indexOf(Agents[v]) > 0) {
                            flag = false;
                            break;
                        }
                    }
                    return flag;
                }
                if(!IsPC){
                    let u = navigator.userAgent;
                    let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
                    if(!isiOS){
                        if(type == 2){
                            this.minDate = this.minReceiveDate;
                            this.currentDate = this.currentReceiveDate;
                        }else{
                            this.minDate = this.getMinDate;
                            this.currentDate = this.getDate;
                        }
                    }
                }else{
                    if(type == 2){
                        this.minDate = this.minReceiveDate;
                        this.currentDate = this.currentReceiveDate;
                    }else{
                        this.minDate = this.getMinDate;
                        this.currentDate = this.getDate;
                    }
                }
                // this.isReceivedTiem = true;
            },
            clickCancel(type){
                this.isShowPickerTiem = false;
                // this.isReceivedTiem = false;
            },
            clickConfirm(value){
                if(this.dateLock == 1){
                    this.endTime = HandleTime(value);
                    this.minReceiveDate = this.setReceiveDay(this.endTime);
                    this.currentReceiveDate = this.setReceiveDay(this.endTime);
                    localStorage.setItem('endTime',this.endTime);
                    this.isShowPickerTiem = false;
                }else{
                    this.minReceiveDate = this.setReceiveDay(this.endTime);
                    this.currentReceiveDate = this.setReceiveDay(this.endTime);

                    this.receivedTime = HandleTime(value);
                    //TODO 选择交货时间后 变更报价时间 交货再次确认时间变更无效
                    localStorage.setItem('receivedTime',this.receivedTime);
                    this.isShowPickerTiem = false;
                }
                
            },
            //####=>交付日期
            goodsReceivedTime(){
                this.isReceivedTiem = true;
            },
            clickReceivedCancel(){
                this.isReceivedTiem = false;
            },
            clickReceivedConfirm(value){
                this.receivedTime = HandleTime(value);
                //TODO 选择交货时间后 变更报价时间 交货再次确认时间变更无效
                localStorage.setItem('receivedTime',this.receivedTime);
                this.isReceivedTiem = false;
            },
            //####=>收货地址
            goAddInfo(){
                this.receivingGoodShow = true;
                // this.$router.push({name:'receivingGoods'});
            },
            onReceivingGoodClose(data){
                this.receivingGoodShow = false;
                let GoodsAdd = '';
                if(data){
                    GoodsAdd = JSON.parse(data)
                    this.addInfo = GoodsAdd.full_address;
                    this.address_id = GoodsAdd.address_id
                }
            },

            //####=>商品分类
            goodsClass(){
                this.goodsClassShow = true;
            },
            onClickClose(data){
                //####=>获取商品分类
                if(!this.$appFunc.prototype.isEmpty(data)){
                    let oneitem=data.enterItem;
                    let twoitem=data.enterlable;
                    if(oneitem!==''&&oneitem!==null){
                        let oneitemObj=oneitem;
                        this.onetitle=oneitemObj.cat_name
                    }
                    if(twoitem!==''&&twoitem!==null){
                        let names='';
                        let ids='';
                        let twoitemObj=twoitem;
                        console.log(twoitemObj);
                        for(var key in twoitemObj){
                            names+=('|'+twoitemObj[key].name);
                            ids+=(key+',');
                            this.goods[0].unit = twoitemObj[key].unit;
                        }
                        ids = ids.substring(0,ids.length-1);
                        this.idarr=ids;
                        this.goods[0].cat_id = ids;
                        this.catName=this.onetitle+'\xa0'+names
                    }
                }
                this.goodsClassShow = false;
            },

            submitButton(){
                if(this.purchaseTitle == ''){
                    this.$toast('商品名称不能为空!');
                    return;
                }else if(this.catName == ''){
                    this.$toast('请选择商品分类!');
                    return;
                }else if(this.endTime == ''){
                    this.$toast('报价日期不能为空!');
                    return;
                }else if(this.receivedTime == ''){
                    this.$toast('交付日期不能为空!');
                    return;
                }else if(this.address_id == ''){
                    this.$toast('收货不能为空!');
                    return;
                }/* else if(this.goods[0].goods_intro == ''){
                    this.$toast('商品描述不能为空!');
                    return;
                } */else if(this.goods[0].goods_number == ''){
                    this.$toast('商品数量不能为空!');
                    return;
                }

                this.goods[0].goods_img = this.imgList
                // console.log(this.goods);
                // this.purchaseTitle = this.goods[0].goods_intro;
                this.$parent.$refs.loading.style.display = 'flex'
                if(this.postClock == 0){
                    this.postClock = 1;
                    this.$post('/?c=sourcing&a=release',{
                        title : this.purchaseTitle,
                        end_time : this.endTime,
                        received_time : this.receivedTime,
                        address_id : this.address_id,
                        is_only_certified : this.checkeds?1:0,
                        need_invoice : this.checked?1:0,
                        invoice_id : this.invoice_id,
                        goods : this.goods,
                    })
                    .then((res)=>{
                        this.$parent.$refs.loading.style.display = 'none'
                        switch(res.code){
                            case 0:

                                this.purchaseTitle = '';                   //####=>求购单标题
                                this.endTime = '';                         //####=>报价时间
                                this.receivedTime = '';                    //####=>交付日期
                                this.address_id = '';                      //####=>个人收货ID
                                this.is_only_certified =  0;               //####=>是否选择农联优选
                                this.need_invoice = 0;                    //####=>是否需要发票
                                this.invoice_id = 0;                      //####=>个人发票ID
                                this.goods[0].cat_id = '';
                                this.goods[0].goods_intro = '';
                                this.goods[0].goods_number = '';
                                this.goods[0].origin = '';
                                this.goods[0].goods_img = '';
                                this.goods[0].unit = '';
                                this.isShowPickerTiem = false;
                                this.isReceivedTiem = false;
                                this.isGoodsClass = false;
                                this.val = 0;
                                this.radio =  '';
                                this.catName = '';                          //商品分类名称
                                this.checked = 0;
                                this.checkeds = 0;
                                this.invoice = 0;
                                this.paymentTitle = '点击选择内容';          //标题
                                this.paymentInfo = '点击选择内容';           //信息
                                localStorage.removeItem('purchaseTitle');
                                localStorage.removeItem('goodsClass');
                                localStorage.removeItem('goods_intro');
                                localStorage.removeItem('goods_number');
                                localStorage.removeItem('origin');
                                localStorage.removeItem('endTime');
                                localStorage.removeItem('receivedTime');
                                localStorage.removeItem('ReleaseImgeImge');
                                localStorage.removeItem('goods_img');
                                localStorage.removeItem('goodsAdd');
                                localStorage.removeItem('purchaseImg');
                                localStorage.removeItem('goodclass');
                                localStorage.removeItem('enterlable');
                                localStorage.removeItem('enterItem');

                                this.$router.push({
                                    path:'/auctionChild',
                                    query:{
                                        val:1
                                    }
                                })
                                break;
                            case 1:
                                this.$toast(res.msg);
                                break;
                            default:
                                break;
                        }
                        this.postClock = 0;
                    })
                }
            },
            //####=>失去焦点
            titleBlur(){
                localStorage.setItem('purchaseTitle',this.purchaseTitle)
            },
            intro(){
                localStorage.setItem('goods_intro',this.goods[0].goods_intro)
            },
            origin(){
                localStorage.setItem('origin',this.goods[0].origin)
            },
            goodsNumber(){
                localStorage.setItem('goods_number',this.goods[0].goods_number)
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
                        }else{
                            // 跳转填写发票
                            this.$router.push({
                                path:'/getinvoiceInfo',
                                query:{
                                    id:2,
                                }
                            })
                        }
                    });
                }

            },
            setPayment(){
                if(this.getInvoice == 0){
                    this.$router.push({
                        path:'/invoiceInfo',
                        query:{
                            index:this.radio,
                            id:2,
                        }
                    })
                }else{
                    this.$router.push({
                        path:'/getinvoiceInfo',
                        query:{
                            id:2,
                        }
                    })
                }
            },
            //重置
            submitReset(){
                this.purchaseTitle = '';                   //####=>求购单标题
                this.endTime = '';                         //####=>报价时间
                this.receivedTime = '';                    //####=>交付日期
                this.address_id = '';                      //####=>个人收货ID
                this.is_only_certified =  0;               //####=>是否选择农联优选
                this.need_invoice = 0;                    //####=>是否需要发票
                this.invoice_id = 0;                      //####=>个人发票ID
                this.goods[0].cat_id = '';
                this.goods[0].goods_intro = '';
                this.goods[0].goods_number = '';
                this.goods[0].origin = '';
                this.goods[0].goods_img = '';
                this.goods[0].unit = '';
                this.isShowPickerTiem = false;
                this.isReceivedTiem = false;
                this.isGoodsClass = false;
                this.val = 0;
                this.radio =  '';
                this.catName = '';                          //商品分类名称
                this.checked = 0;
                this.invoice = 0;
                this.paymentTitle = '点击选择内容';          //标题
                this.paymentInfo = '点击选择内容';           //信息
                
                this.purchaseImg = [];                      //图片
                localStorage.removeItem('purchaseTitle');
                localStorage.removeItem('goodsClass');
                localStorage.removeItem('goods_intro');
                localStorage.removeItem('goods_number');
                localStorage.removeItem('origin');
                localStorage.removeItem('endTime');
                localStorage.removeItem('receivedTime');
                localStorage.removeItem('ReleaseImgeImge');
                localStorage.removeItem('goods_img');
                localStorage.removeItem('goodsAdd');
                localStorage.removeItem('purchaseImg');
                localStorage.removeItem('goodclass');
                localStorage.removeItem('enterlable');
                localStorage.removeItem('enterItem');
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
        components:{
            popup,
            navbar,
            uploadBox,
            goodsClass,
            receivingGoods,
        }
    }
</script>
<style scoped>
    html,body{background-color: #f2f2f2;}
    .purchase .van-checkbox__icon .van-icon{
        background-color: #fff;
    }
    .purchase .van-switch--on{
        background-color: #f44;
    }
    .purchase .van-checkbox__icon--checked .van-icon{
        background-color: #EE2D2D;
        border-color: #EE2D2D;
    }
    .purchase .paymentInfo-submit .van-switch-cell{
        width: 40%;
        margin: auto;
    }
    .purchase .paymentInfo-submit .van-hairline--top-bottom::after{
        border:none;
        border-bottom: 1px solid #ebedf0;
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

<style scoped lang="less">
    .dflex{
        display: flex;
        justify-content: flex-start;
    }
    .icon-style{
        font-size: 1.17rem;
        color: #333;
    }
    /* 求购标题栏 */
    .purchase-bar{
        border-bottom: 1px solid #eee;
    }
    /* 求购内容 */
    .purchase-content{
        padding: 0 0 .2rem;
    }
    .van-cell:not(:last-child)::after{
        border: none;
    }
    .bb_f2f2f2{
        border-bottom: 1px solid #f2f2f2;
    }
    /* 上传附件 */
    /* 附件 */
    .business-box{
        padding: .533rem .8rem;
        background-color: #fff;
    }
    .business-licence{
        color: #323233;
        font-size: .75rem;
        .upload_box{
            margin-bottom: 5px;
            .img_box{
                .img_li{
                    width: 3.2rem;
                    height: 3.2rem;
                    position: relative;
                    margin-right: .533rem;
                    .img_li_img{
                        width: 3.2rem;
                        height: 3.2rem;
                        border-radius: 5px;
                        overflow: hidden;
                        img{
                            display: block;
                            width: 100%;
                            height: 100%;
                        }
                    }
                    .img_remove{
                        position: absolute;
                        right: 0;
                        top: 0;
                        height: 50%;
                        width: 50%;
                        right: -6px;
                        top: -6px;
                        img{
                            display: block;
                            width: 12px;
                            float: right;
                        }
                    }
                }
            }
            .uploadForm{
                position: relative;
                width: 3.2rem;
                #uploadForm{
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    opacity: 0;
                    width: 100%;
                    height: 100%;
                    margin: auto;
                    input{
                        display: block;
                        height: 100%;
                        width: 100%;
                    }
                }
                .personal-img{
                    width: 3.2rem;
                    height: 3.2rem;
                    img{
                        display: block;
                        width: 100%;
                    }
                }
            }
        }
    }
    /* 提交按钮 */
    .purchaseButton{
        width: 100%;
        margin: 0 auto;
        bottom: 0;
        justify-content: center;
    }
    .purchaseButton button{
        margin: 0 2.5%;
        margin-bottom: 1.07rem;
        border-radius: 5px;
        overflow: hidden;
        height: 2.35rem;
        line-height: 2.24rem;
    }
    /* 分类菜单选择 */
    .goods-class-lis{
        width: 80%;
        height: 100%;
        position: fixed;
        z-index: 2003;
        top: 0;
        bottom: 0;
        right: 0;
        background-color: #fff;
    }
    .goods-class-lis p{
        margin: .2rem;
        font-size: .64rem;
    }
    /* button */
    .goods-class-button{
        width: 80%;
        position: fixed;
        bottom: 0;
    }
    /* 优选 */
    .checked{
        padding: 10px .6rem;
        font-size: .75rem;
    }
    /* 发票 */
    .paymentInfo{
        margin-top: 10px;
        font-size: .85rem;
        background-color: #fff;
    }
    .paymentInfo-title{
        font-size: .75rem;
        color: #424242;
        margin: auto;
        margin-left: .64rem;
    }
    .paymentInfo-title span{
        font-size: .64rem;
        color: #808080;
    }
    .paymentInfo-info{
        padding: 10px .64rem;
    }
    .payment-info-box{
        padding: 0 .64rem;
    }
    .payment-info-box span{
        width: 7rem;
        display: inline-block;
    }
    .paymentInfo-info-title,
    .paymentInfo-info-tx{
        text-align: right;
    }
    .colorClass{
        color:#323233;
    }

    .goods-number-box{
        display: flex;
        justify-content:flex-start;
    }
    .goods-number{
        width: 70%;
    }
    .goods-number-unit{
        color: #212121;
        font-size: 14px;
        padding: 10px 0;
        display: block;
        line-height: 24px;
        margin: auto;
        margin-right: 12px;
    }
    .introductionInfo{
        font-size: 12px;
        color: #808080;
        padding-left: 30px;
    }


    .goodsClass-alert{
        position: fixed;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
        z-index: 1005;
        background-color: #f2f2f2;
    }
</style>