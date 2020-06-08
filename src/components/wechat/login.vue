<template>
    <div class="wechatLogin">
        <!-- 手机号码验证注册 -->
        <div v-if="show == 1">
            <navbar type="clear" title="农联贡菜"></navbar>

            <van-cell-group class="basic-info">
                <!-- <div class="dflex van-cell radio-box identity-box">
                    <div class="fz_14 van-cell__title van-field__label"><span>所属身份</span></div>
                    <van-radio-group v-model="identity" class="dflex fz_12 radio-right">
                        <van-radio name="1" checked-color="#EE2D2D">采购商</van-radio>
                        <van-radio name="2" checked-color="#EE2D2D">个人/家庭</van-radio>
                    </van-radio-group>
                </div> -->
                <van-field
                    v-model="phone"
                    label="手机号"
                    placeholder="请输入手机号"
                    :error-message="ErrorPhone"
                    @blur="phoneBlur"
                />
                <div>
                    <div class="sendsms-box">
                        <van-field
                            v-model="sms"
                            center
                            clearable
                            label="短信验证码"
                            placeholder="请输入短信验证码"
                            :error-message="ErrorSms"
                            @blur="smsBlur"
                            :maxlength="limit"
                        >

                        </van-field>
                        <div class="sendsms after">
                            <span class="sendsms-line"></span>
                            <van-button slot="button" @click="SendSms" class="sendsms-txt" :disabled='isSmsDisabled'>{{codeMsge}}</van-button>
                        </div>
                    </div>
                </div>
                <!-- 
                <van-field
                    v-if="identity == '1'"
                    v-model="tag"
                    label="行业类别"
                    placeholder="请选择行业类别"
                    :error-message="Verification.tag"
                    @blur="tagclick"
                    readonly
                />
                <van-field
                    v-if="identity == '1'"
                    class="enterpriseName"
                    v-model="enterpriseName"
                    label="企业/门店名称"
                    placeholder="请输入企业名称"
                    :error-message="Verification.enterpriseName"
                    @blur="vtEnterpriseName"
                />
                <div  @click="Address" v-if="identity == '1'">
                    <van-field
                        class="enterpriseAddress"
                        v-model="address"
                        readonly
                        label="企业/门店地区"
                        placeholder="请选择省/市/区"
                        :error-message="Verification.address"
                    />
                </div>
                <div  @click="Address" v-else>
                    <van-field
                        class="enterpriseAddress"
                        v-model="address"
                        readonly
                        label="所在地区"
                        placeholder="请选择省/市/区"
                        :error-message="Verification.address"
                    />
                </div>
                <van-field
                    v-model="addressInfo"
                    label="收货详细地址"
                    placeholder="请输入收货详细地址"
                    :error-message="Verification.addressInfo"
                    @blur="vtAddressInfo"
                />
                <van-field
                    v-if="identity == '1'"
                    v-model="fullName"
                    label="负责人/收货人"
                    placeholder="请输入负责人/收货人姓名"
                    :error-message="Verification.fullName"
                    @blur="vtFullName"
                />
                <van-field
                    v-else
                    v-model="fullName"
                    label="收货人"
                    placeholder="请输入收货人姓名"
                    :error-message="Verification.fullName"
                    @blur="vtFullName"
                />
                <van-field
                    v-if="identity == '1'"
                    v-model="fullPhone"
                    label="联系方式"
                    placeholder="请输入负责人手机号"
                    maxLength="11"
                    :error-message="Verification.fullPhone"
                    @blur="vtFullPhone"
                />
                <van-field
                    v-if="identity == '1'"
                    v-model="clerkPhone"
                    label="所属采购顾问"
                    placeholder="请输入采购顾问手机号（选填）"
                    maxLength="11"
                    :error-message="Verification.clerkPhone"
                    @blur="vtClerkPhone"
                />

                <div class="dflex van-cell van-field radio-box">
                    <div class="fz_14 van-cell__title van-field__label"><span>允许无人收货</span></div>
                    <van-radio-group v-model="isUnmanned" class="dflex fz_12 radio-right">
                        <van-radio name="2" checked-color="#EE2D2D">是</van-radio>
                        <van-radio name="1" checked-color="#EE2D2D">否</van-radio>
                    </van-radio-group>
                </div>
                <div class="dflex van-cell van-field" style="word-break: break-all;">
                    {{isUnmanned == 2 ? '若因此产生商品被盗、商品没能及时保存造成变质等相关后果将由买家自行承担。' : '配送员等待取货时长至多为15分钟，超时配送员将会离开。若因此产生二次配送费用、商品签收不及时造成的变质等相关后果将由买家自行承担。'}}
                </div>

                <div class="upload-box" v-if="identity == '1'">
                    <div class="card-upload-box">
                        <div class="card-upload-img-box">
                            <div class="card-upload-label">上传店头图或营业执照</div>
                            <div class="dflex card-upload-img">
                                <div class="card-upload-img-from">
                                    <div class="wxUploadForm uploadForm">
                                        <div class="personal-img" @click="wxSetUsenImge('card3')">
                                            <img :src='chartered' width="100%">
                                            <div class="img_remove" @click.stop="imgRemove('chartered')" v-if="charteredStatus == 1">
                                                <span>&times;</span>
                                            </div>
                                        </div>
                                        <div class="card-upload-text">拍摄/上传手持营业执照</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> -->
            </van-cell-group>

            <!-- 最新 勾选同意协议样式 -->
            <div class="wx-check">
                <div class="wx-check-gou" @click="changeCheack"><img v-if="checkedtwo" src="../../assets/img/xuanzhong.png"><i v-else></i></div>同意<span @click.stop="contract">《用户条款》</span>和<span @click.stop="discounts">《隐私条约》</span>
            </div>

            <div class="submitButton">
                <van-button size="large"  :disabled='disable' @click="submitButton">确认注册</van-button>
            </div>

            <!-- <van-actionsheet v-model="PickerArealist">
                <van-area
                    :area-list="areaList"
                    @cancel="addCancel"
                    @confirm="addConfirm"
                    :columns-num="3"
                    title="所在城市"
                />
            </van-actionsheet>

            <industryLable class="goodsClass-alert" chose="radioDom" @onClickClose="onClickClose" v-if="goodsClassShow"  @listLoadingShow="listLoadingShow" @listLoadingHide="listLoadingHide"></industryLable>

            <discounts class="discountDom" v-show="discountShow" :type="discountType" @closeDiscount="closeDiscount"></discounts> -->

            <div class="vantLoading" v-if="!vloadingShow">
                <vloading :vertical="false" text=""></vloading>
            </div>
        </div>

        <!-- 审核中 -->
        <div class="reviewStatus" v-if="show == 2">
            <div class="reviewStatusImg"><img :src="reviewStatusImg" alt=""></div>
            <div class="reviewStatusTxt">{{reviewStatus}}</div>
            <div class="failButton" v-if="is_fail == 1">
            <van-button size="large" @click="toReturn">返回</van-button>
            </div>
        </div>
        <!--  -->
        <div v-if="show == 4">
            <!-- 二维码 -->
            <div class="QR">
                <div class="QRCodeImg">
                    <img src="../img/QRCodeImg.jpg" width="100%" />
                </div>
            </div>
            <!-- Button -->
            <div class="button-tips">
                <p>长按二维码进行关注公众号</p>
            </div>
        </div>
        <!-- 手机号登陆 -->
        <div v-if="show == 5">
            <van-cell-group>
                <van-field
                    v-model="phone"
                    label="手机号"
                    placeholder="请输入手机号"
                    :error-message="ErrorPhone"
                    @blur="phoneBlur"
                />
                <van-cell-group>
                    <div class="sendsms-box">
                    <van-field
                        v-model="sms"
                        center
                        clearable
                        label="短信验证码"
                        placeholder="请输入短信验证码"
                        :error-message="ErrorSms"
                        @blur="smsBlur"
                        :maxlength="limit"
                    >

                    </van-field>
                    <div class="sendsms after">
                        <span class="sendsms-line"></span>
                        <van-button slot="button" @click="SendSms" class="sendsms-txt" :disabled='isSmsDisabled'>{{codeMsge}}</van-button>
                </div>
                    </div>
                </van-cell-group>
            </van-cell-group>

            <!-- 最新 勾选同意协议样式 -->
            <div class="wx-check">
                <div class="wx-check-gou" @click="changeCheack"><img v-if="checkedtwo" src="../../assets/img/xuanzhong.png"><i v-else></i></div>同意<span @click.stop="contract">《用户条款》</span>和<span @click.stop="discounts">《隐私条约》</span>
            </div>

            <div class="submitButton">
                <van-button size="large"  :disabled='disable' @click="submitButton">验证登录</van-button>
            </div>
            <discounts class="discountDom" v-show="discountShow" :type="discountType" @closeDiscount="closeDiscount"></discounts>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue';
    import { Toast } from 'vant';
    import $ from 'jquery';
    import {wxUpload,wxStart} from '../../assets/js/wxjs.js'

    import '../../assets/css/commonstyle.css'
    import {acync} from '../../assets/js/acync.js'


    import failImg from '../../assets/img/shengheshinao.png';
    import reviewImg from '../../assets/img/shenghezhong.png';
    import chartered from '../../assets/img/yinyezhizhao.png'

    const discounts =  ()=>import("../merchants/discountDom.vue");
    const navbar =  ()=>import("../navbar/nav.vue");
    const industryLable =  ()=>import("../goodsClass/industryLable.vue");
    const vloading =  ()=>import("../vloading.vue");
    export default {
        data() {
            return {
                WebWeactInfo : '',
                phone:'',
                sms:'',
                scode:'',
                ErrorPhone:'',
                ErrorSms:'',
                smsText:'发送验证码',
                isSmsDisabled:false,
                DisabledPassword:false,
                totalTime:60,
                show:0,
                is_fail:0,
                reviewStatus:'',
                reviewStatusImg:'',
                url:'',

                limit:6,                  //验证码长度
                codeMsge:'发送验证码',    //验证码文字
                canClick: true,         //添加canClick

                checkedtwo:true, //同意协议
                disable:false,

                discountType:0,
                discountShow:false,

                loginLock:true,      //请求开关

                identity:'1',           //所属身份
                isUnmanned:'1',         //是否无人收货

                regionSn:'',
                contacts:'',
                enterpriseName:'',      //企业名称
                addressInfo:'',         //公司地址
                address:'',             //公司下拉框
                fullName:'',            //负责人姓名
                fullPhone:'',           //负责人电话
                clerkPhone:'',          //业务员电话
                imageUrl: '',           //图片地址
                val: 0,                 //控制显示
                PickerArealist:false,

                goodsClassShow:false,
                onetitle:'',

                chartered:chartered,//营业执照
                charteredStatus:0,//判断是否有上传营业执照 1 已上传 0未上传

                Verification:{
                    name:'',
                    password:'',
                    confirmPassword:'',
                    contacTinformation:'',
                    sms:'',

                    mailbox:'',
                    enterpriseName:'',
                    addressInfo:'',
                    fullName:'',
                    fullPhone:'',
                    clerkPhone:'',
                    // businessLicenseNo:'',
                    tag:'',
                    address:''
                },

                tag:'',                 //行业标签
                tagId:-1,              //行业标签ID
                saveDate:{
                    tag:'',
                    tagId:'',
                    enterpriseName:'',
                    address:'',
                    regionSn:'',
                    addressInfo:'',
                    fullName:'',
                    fullPhone:'',
                    clerkPhone:'',
                    chartered:'',
                    charteredStatus:0,
                },
                areaList:[],
                vloadingShow:true,

                imgLock:0,
            }
        },
        created(){
            let _this = this;
            let clock = sessionStorage.getItem('cl');//微信登陆时 开关 1：获取code数据成功 2 手机号登陆
         
            if(clock == 1){
                this.toHref(this.$route.query.code);//微信自动登陆
            }else if(clock == 2){
                _this.show = 1;//手机号注册/登陆
                // this.vloadingShow = false;
                // wxStart(()=>{
                //     _this.show = 1;
                //     // let saveDate = localStorage.getItem('wechatToUpdateDate');
                //     // if(saveDate){
                //     //     this.saveDate = JSON.parse(saveDate)

                //     //     this.enterpriseName = this.saveDate.enterpriseName
                //     //     this.addressInfo = this.saveDate.addressInfo
                //     //     this.fullName = this.saveDate.fullName
                //     //     this.fullPhone = this.saveDate.fullPhone
                //     //     this.clerkPhone = this.saveDate.clerkPhone
                //     //     this.chartered = this.saveDate.chartered
                //     //     this.charteredStatus = this.saveDate.charteredStatus
                //     //     this.address = this.saveDate.address
                //     //     this.regionSn = this.saveDate.regionSn
                //     //     this.tag = this.saveDate.tag
                //     //     this.tagId = this.saveDate.tagId
                //     // }   
                //     // // 公司地址下拉
                //     // let acyncList = new acync();
                //     // this.areaList = acyncList[0];
                //     this.vloadingShow = true;
                // })
            }else if(clock == 3){
                _this.show = 5;//手机号登陆
            }else{
                let fullPath = "";
                if(localStorage.getItem('fullPath') == "/errorLogin"){
                    fullPath = "/index";
                }else{
                    fullPath = localStorage.getItem('fullPath');
                }

                this.$post('/?c=wechat&a=getOauth',{
                    redirect: fullPath
                }).then((res)=>{
                    switch (Number(res.code)){
                        case 0:
                            sessionStorage.setItem('cl',1);
                            window.location.href = res.data.url
                            break;
                        case 1:
                            sessionStorage.removeItem('cl');
                            // sessionStorage.setItem('cl',1);
                    
                            this.$toast('网络异常,code:10001')
                            this.$router.push({
                                path:'/errorLogin'
                            })
                            break;
                        default:
                            break;
                    }
                })
            }
            /* this.vloadingShow = false;
            wxStart(()=>{
                _this.show = 1;
                
                // 公司地址下拉
                let acyncList = new acync();
                this.areaList = acyncList[0];
                this.vloadingShow = true;
            }) */
              // 公司地址下拉
            // let acyncList = new acync();
            // this.areaList = acyncList[0];
        },
        methods:{
            toHref(code){
                let _this = this;
                this.$post('/?c=wechat&a=login', {
                    code: code//获取code值
                }).then((res) => {
                    sessionStorage.removeItem('cl');
                    localStorage.setItem('loading',false);
                    if(res.code == 0){
                        switch (res.data.state) {
                            case 0://登录成功
                                // if(!this.$appFunc.prototype.isEmpty(res.data.label_name)){// 行业类名
                                //     localStorage.setItem('specialtitle',res.data.label_name)
                                // }
                                let fullPath = localStorage.getItem('fullPath')
                                if(this.$appFunc.prototype.isEmpty(fullPath) || fullPath == "/login"){
                                    fullPath = '/index';
                                }
                                if(this.$appFunc.prototype.isEmpty(res.data.redirect) || res.data.redirect == "/login"){
                                    res.data.redirect = '/mobile/m/index';
                                }

                                localStorage.setItem('isSeller',res.data.seller);
                                localStorage.setItem('b2bTokenId', res.data.token);
                                if (!this.$appFunc.prototype.isEmpty(res.data.redirect)) {
                                    window.location.href = res.data.redirect
                                }else{//跳转
                                    window.location.href = `/mobile/m${fullPath}`
                                    /* _this.$router.push({
                                        path: fullPath
                                    }); */
                                }
                                break;
                            case 1://1验证手机号
                            _this.vloadingShow=true;
                              _this.show = 1;
                             alert("")
                                // this.vloadingShow = false;
                                // wxStart(()=>{
                                //     _this.show = 1;
                                //     // let saveDate = localStorage.getItem('wechatToUpdateDate');
                                //     // if(saveDate){
                                //     //     this.saveDate = JSON.parse(saveDate)
                                        
                                //     //     this.enterpriseName = this.saveDate.enterpriseName
                                //     //     this.addressInfo = this.saveDate.addressInfo
                                //     //     this.fullName = this.saveDate.fullName
                                //     //     this.fullPhone = this.saveDate.fullPhone
                                //     //     this.clerkPhone = this.saveDate.clerkPhone
                                //     //     this.chartered = this.saveDate.chartered
                                //     //     this.charteredStatus = this.saveDate.charteredStatus
                                //     //     this.address = this.saveDate.address
                                //     //     this.regionSn = this.saveDate.regionSn
                                //     //     this.tag = this.saveDate.tag
                                //     //     this.tagId = this.saveDate.tagId
                                //     // }   
                                //     // // 公司地址下拉
                                //     // let acyncList = new acync();
                                //     // this.areaList = acyncList[0];
                                //     this.vloadingShow = true;
                                // })
                                sessionStorage.setItem('cl',2);
                                break;
                            case 2://2审核未通过或者审核中
                                _this.show = 2;
                                if(res.data.review_status == 0){
                                    _this.reviewStatus = '用户资料审批中';
                                    _this.reviewStatusImg = reviewImg;
                                }else{
                                    _this.reviewStatus = '用户资料审批被拒绝，请重新注册申请!';
                                    _this.reviewStatusImg = failImg ;
                                    _this.is_fail = 1;
                                }
                                break;
                            case 3://升级为企业用户
                                _this.$router.push({
                                    path: '/wechatToUpdate'
                                });
                                break;
                            case 4://关注公众号
                                _this.show = 4;
                                _this.url = res.data.url;
                                break;
                            case 5://注册
                                _this.show = 5;
                                sessionStorage.setItem('cl',3);
                                break;
                            default:
                                this.$toast('数据请求异常,code:10003')
                                this.$router.push({
                                    path: '/errorLogin'
                                });
                                break;
                        }
                    }else if(res.code == 1){
                        //微信登陆失败
                        this.$toast(res.msg);
                        _this.$router.push({
                            path: '/errorLogin'
                        });
                    }
                })
            },
            changeCheack(){
                if(this.checkedtwo==true/*  && this.checkedthree==true */){
                    this.checkedtwo = false;
                    this.disable = true;
                }else{
                    this.checkedtwo = true;
                    this.disable = false;
                }
            },
            /* 发送验证码 */
            SendSms(){
                if (!this.phoneBlur()) return; 
                if (!this.$appFunc.prototype.getSednMsgNum()){
                    this.$toast("您发送短信的次数太频繁了！")
                    return false;
                }; 
                if(this.$appFunc.prototype.isEmpty(this.phone)){
                    this.$toast('请输入手机号')
                    return false;
                }
                if (!this.canClick) {
                    this.$toast('您操作太频繁了，请稍后再试')
                    return false; 
                }

                this.canClick = false;
                this.codeMsge = this.totalTime + 's后重新发送';
                let clock = window.setInterval(() => {
                    this.totalTime--;
                    this.codeMsge = this.totalTime + 's后重新发送';
                    if (this.totalTime < 0) {
                        window.clearInterval(clock);
                        this.codeMsge = '发送验证码';
                        this.totalTime = 60;
                        this.canClick = true;  //这里重新开启
                    }
                },1000);

                this.$post('/?c=user&a=sendSms',{
                    number: this.phone
                }).then((res)=>{
                    switch (res.code) {
                        case 0:
                            this.$appFunc.prototype.setSendMsgNum();

                            this.scode = res.data.state
                            this.limit = res.data.limit
                            this.$toast(res.msg);
                            break;
                        case 1:
                            this.$toast(res.msg);
                            break;
                        default:
                            this.$toast("网络故障，发送短信失败");
                            break;
                    }
                });
            },
            phoneBlur(){
                let isPhone = /^[1][0-9][0-9]{9}$/;//手机号码
                if(this.phone == ''){
                    this.ErrorPhone = '请输入手机号码';
                    this.DisabledPassword = true;
                    return false;
                }else if(!this.$appFunc.prototype.isPhone(this.phone)){
                    this.ErrorPhone = '请输入正确的手机号码';
                    this.DisabledPassword = true;
                    return false;
                }else{
                    this.ErrorPhone = '';
                    this.DisabledPassword = false;
                    return true;
                }
            },
            smsBlur(){
                if(this.sms == ''){
                    this.ErrorSms = '请输入正确验证码';
                    this.disabled = true;
                    return false;
                }else{
                    this.ErrorSms = '';
                    this.disabled = false;
                    return true;
                }
            },
            /* 提交 */
            submitButton(){
                let _this = this;
                if(!this.phoneBlur()) return false;
                if(!this.smsBlur()) return false;
                // if(!this.vtAddressInfo()) return false;

                // if(this.identity == 1){
                //     if(!this.vtEnterpriseName()) return false;
                //     if(!this.vtFullName()) return false;
                //     if(!this.vtFullPhone()) return false;
                //     if(!this.vtClerkPhone()) return false;

                //     if(this.charteredStatus == 0){
                //         this.$toast("请上传店头图");
                //         return false
                //     }
                // }
                if(this.loginLock){
                    this.loginLock = false;
                    this.$post('/?c=wechat&a=mobile',{
                        mobile_code : this.sms,
                        scode: this.scode || 'ssss',
                        mobile_phone : this.phone,
                    }).then((res)=>{
                        localStorage.setItem('loading',false);
                        sessionStorage.removeItem('cl');
                        if(res.code == 0){
                            switch (res.data.state){
                                case 0://登录成功
                                    if(!this.$appFunc.prototype.isEmpty(res.data.label_name)){
                                        localStorage.setItem('specialtitle',res.data.label_name)
                                    }
                                    localStorage.setItem('isSeller',res.data.seller);
                                    localStorage.setItem('b2bTokenId', res.data.token);
                                    let redirect = res.data.redirect;
                                    if(this.show == 5){
                                        localStorage.setItem('loading',false);
                                        if(redirect){
                                            window.location.href = redirect
                                        }else{
                                            _this.$router.push({
                                                path:'/index'
                                            })
                                        }
                                    }else{
                                    // this.$post('/?c=user&a=receive',{
                                    //     receive: this.isUnmanned
                                    // })
                                    // this.$post('/?c=user&a=addIntoMyAddress',{
                                    //     contact_name:this.fullName,
                                    //     contact_phone:this.phone,
                                    //     consignee_address:this.addressInfo,
                                    //     region_sn:this.regionSn,
                                    //     title:''
                                    // })
                                    // if(this.identity == 1){
                                    //     this.$post('/?c=user&a=group',{
                                    //         label:this.tagId,
                                    //         // email:_this.mailbox,
                                    //         enterprise_name :this.enterpriseName,
                                    //         region_sn:this.regionSn,
                                    //         address:this.addressInfo,
                                    //         // license_key:_this.businessLicenseNo,
                                    //         attachments:this.chartered,
                                    //         legal_person:this.fullName,
                                    //         mobile_phone:this.fullPhone,
                                    //         recommend_mobile:this.clerkPhone,
                                    //     }).then((res)=>{
                                    //         this.$parent.$refs.loading.style.display = 'none'
                                    //         switch(res.code){
                                    //             case 0:
                                    //                 // _this.$toast(res.msg);
                                    //                 localStorage.setItem('loading',false);
                                    //                 localStorage.removeItem('wechatToUpdateDate');
                                    //                 localStorage.removeItem('attachments')
                                    //                 if(redirect){
                                    //                     window.location.href = redirect
                                    //                 }else{
                                    //                     _this.$router.push({
                                    //                         path:'/index'
                                    //                     })
                                    //                 }
                                    //                 break;
                                    //             case 1:
                                    //                 this.$toast(res.msg);
                                    //                 break;
                                    //         }
                                    //     })
                                    // }else{
                                    //     this.$router.push({
                                    //         path:'/index',
                                    //     });
                                    //     localStorage.setItem('loading',false);
                                    // }
                                    }

                                    break;
                                case 1://1验证手机号
                                    _this.show = 1;
                                    sessionStorage.setItem('cl',2);
                                    break;
                                case 2://2审核未通过或者审核中
                                    _this.reviewStatus = res.data.review_status;
                                    _this.show = 2;
                                    break;
                                case 3://升级为企业用户
                                    _this.$router.push({
                                        path:'/wechatToUpdate'
                                    });
                                    break;
                                case 4://关注公众号
                                    _this.show = 4;
                                    _this.url = res.data.url;
                                    break;
                                case 5://关注公众号
                                    _this.show = 5;
                                    sessionStorage.setItem('cl',3);
                                    break;
                                default:
                                    this.$toast('数据请求异常,code:10002')
                                    this.$router.push({
                                        path: '/errorLogin'
                                    });
                                    break;
                            }
                            this.loginLock = true;
                        } else if(res.code == 1){
                            this.$toast(res.msg);
                            this.loginLock = true;
                        }else{
                            this.$toast("网络故障或您的操作太频繁了");
                            this.$router.push({
                                path: '/errorLogin'
                            });
                        }
                    })
                }else{
                    this.$toast("正在请求中,请稍后")
                }
            },
            GetPost(){
                console.log(123);
            },
            toReturn(){
                this.$router.push({
                    path:'/',
                })
            },
            // 跳转《隐私条约》
            discounts(){
                this.discountType = 2;
                this.discountShow = true;
            },
            // 跳转《用户条款》
            contract(){
                $('.discountDom').scrollTop(0);
                this.discountType = 4;
                this.discountShow = true;
            },
            closeDiscount(){
                $('.discountDom').scrollTop(0);
                this.discountShow = false;
                this.discountType = 0;
            },


            //验证企业名称
            vtEnterpriseName(){
                if(this.enterpriseName == ''){
                    this.Verification.enterpriseName = '请输入企业名称';
                    return false
                }else{
                    this.Verification.enterpriseName = ''

                    this.saveDate.enterpriseName = this.enterpriseName;
                    localStorage.setItem('wechatToUpdateDate',JSON.stringify(this.saveDate));
                    return true
                }
            },
            //公司地址
            vtAddressInfo(){
                if(this.addressInfo == ''){
                    this.Verification.addressInfo = '请输入收货详细地址';
                    return false
                }else{
                    this.Verification.addressInfo = ''
                    this.saveDate.addressInfo = this.addressInfo;
                    localStorage.setItem('wechatToUpdateDate',JSON.stringify(this.saveDate));
                    return true
                }
            },
            //负责人名称
            vtFullName(){
                if(this.fullName == ''){
                    this.Verification.fullName = '请输入收货人名称';
                    return false
                }else{
                    this.Verification.fullName = ''
                    this.saveDate.fullName = this.fullName;
                    localStorage.setItem('wechatToUpdateDate',JSON.stringify(this.saveDate));
                    return true
                }
            },
            //负责人电话
            vtFullPhone(){
                let isPhone = /^[1,2][0-9][0-9]{9}$/;//手机号码
                if(this.fullPhone == ''){
                    this.Verification.fullPhone = '请输入联系方式'
                    return false
                }else if(!isPhone.test(this.fullPhone)){
                    this.Verification.fullPhone = '请输入正确的联系方式'
                    return false
                }else{
                    this.Verification.fullPhone = ''
                    this.saveDate.fullPhone = this.fullPhone;
                    localStorage.setItem('wechatToUpdateDate',JSON.stringify(this.saveDate));
                    return true
                }
            },
            vtClerkPhone(){
                let isPhone = /^[1,2][0-9][0-9]{9}$/;//手机号码
                if(this.clerkPhone == ''){
                    this.Verification.clerkPhone = ''
                    return true
                }else if(!isPhone.test(this.clerkPhone)){
                    this.Verification.clerkPhone = '请输入正确的联系方式'
                    return false
                }else{
                    this.Verification.clerkPhone = ''
                    this.saveDate.clerkPhone = this.clerkPhone;
                    localStorage.setItem('wechatToUpdateDate',JSON.stringify(this.saveDate));
                    return true
                }
            },

            wxSetUsenImge(imgType){
                let _this = this;
                console.log(_this.imgLock);
                if(_this.imgLock == 0){
                    _this.imgLock = 1;
                    wxUpload({},_this,imgType,['album', 'camera'],(res)=>{
                        if(imgType == 'card3'){
                            _this.chartered = res;
                            _this.charteredStatus = 1;

                            this.saveDate.chartered = res;
                            this.saveDate.charteredStatus = 1;
                            localStorage.setItem('wechatToUpdateDate',JSON.stringify(this.saveDate));
                            localStorage.setItem('attachments',res);
                        }
                        _this.imgLock = 0;
                    },(cancel)=>{
                        _this.imgLock = 0;
                    });
                }
            },
            imgRemove(key){
                this.chartered = chartered;
                this.charteredStatus = 0;

                this.saveDate.chartered = chartered;
                this.saveDate.charteredStatus = 0;
                localStorage.setItem('wechatToUpdateDate',JSON.stringify(this.saveDate));
            },

            //====>选择公司地址
            Address(){
                this.PickerArealist = true;
            },
            addCancel(){
                this.PickerArealist = false;
            },
            addConfirm(value){
                let add='';
                for(let i=0; i<value.length; i++){
                    add += value[i].name;
                }
                this.regionSn = value[2].code;
                this.address = add;
                this.PickerArealist = false;


                this.saveDate.address = add;
                this.saveDate.regionSn = value[2].code;

                localStorage.setItem('wechatToUpdateDate',JSON.stringify(this.saveDate));
            },
            // 点击触发弹出框
            tagclick(){
                this.goodsClassShow = true;
                /* this.$router.push({
                    path:'/industryLable'
                }) */
            },
            onClickClose(data){
                //####=>获取商品分类
                if(!this.$appFunc.prototype.isEmpty(data)){
                    let oneitem=data.enterItem;
                    let twoitem=data.enterlable;
                    if(oneitem!==''&&oneitem!==null){
                    let oneitemObj=oneitem;
                    this.onetitle=oneitemObj.label_name
                    }
                    if(twoitem!==''&&twoitem!==null){
                        let names='';
                        let ids='';
                        let twoitemObj=twoitem;
                        for(var key in twoitemObj){
                            names+=('|'+twoitemObj[key]);
                            ids+=(key+',');
                        }
                        ids = ids.substring(0,ids.length-1);
                        this.tagId=ids;
                        this.tag=this.onetitle+'\xa0'+names



                        this.saveDate.tag = this.onetitle+'\xa0'+names;
                        this.saveDate.tagId = ids;

                        localStorage.setItem('wechatToUpdateDate',JSON.stringify(this.saveDate));
                        localStorage.removeItem('twoItem');
                    }
                }
                this.goodsClassShow = false;
            },
            listLoadingShow(){
                this.$parent.$refs.loading.style.display = "flex"
            },
            listLoadingHide(){
                this.$parent.$refs.loading.style.display = "none"
            },
        },
        beforeRouteEnter(to, from, next) {
            let clock = sessionStorage.getItem('cl');
            if(clock != 1){
                if(from.fullPath == '/'){
                    localStorage.setItem('fullPath','');
                }else{
                    localStorage.setItem('fullPath',from.fullPath);
                }
            }
            next();
        },
        components:{
            discounts,
            industryLable,
            navbar,
            vloading
        }
    }
</script>
<style lang="less">
    .basic-info.van-cell-group{
        background-color: unset;
        .van-field__label{
            max-width: 120px;
        }
    }
</style>
<style scoped>

</style>
<style scoped lang="less">

.wechatLogin .feaCheckbox .van-checkbox__icon{
    height: 15px;
}
.wechatLogin .van-checkbox__icon--round .van-icon{
    height: 15px;
    line-height: 15px;
    width: 15px;
}
.wechatLogin .van-checkbox__icon--checked .van-icon{
    border-color: #f44;
    background-color: #f44;
    overflow: hidden;
}
.wechatLogin .van-icon, .van-icon::before{
    display: inline-block;
    font-size: 22px;
}
.wechatLogin .feaCheckbox .van-checkbox__label{
    font-size: 12px;
}
.wechatLogin .feaCheckbox .van-checkbox__label span{
    color: #f44;
}

    .discountDom{
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: #fff;
        overflow: auto;
        z-index: 1003;
    }
    .submitButton{
        padding: 1rem .6rem;
    }
    .submitButton .van-button--default{
        background-color: #f44;
        color: #fff;
        border-radius: 5px;
    }
    .failButton{
        padding: 1rem .6rem;
    }
    .failButton .van-button--default{
        border: 1px solid #808080;
        color: #808080;
        background-color: unset;
        border-radius: 5px;
        width: 50%;
        height: 40px;
        line-height: 38px;
    }
    .reviewStatus{
        font-size: 16px;
        text-align: center;
        padding-top: 100px;
    }

    .reviewStatus .reviewStatusImg{
        width:150px;
        margin: auto;
    }
    .reviewStatus .reviewStatusImg img{
        display: block;
        width: 100%;
    }
    .reviewStatus .reviewStatusTxt{
        color: #212121;
        margin: 19px 0;
    }

    .QR{
        text-align: center;
    }
    .QRCodeImg{
        width: 10rem;
        display: inline-block;
    }
    .button-tips p{
        font-size: 14px;
        margin: 0;
        text-align: center;
    }
    .button-box{
        padding: 2rem 1rem;
    }
    .van-button-color{
        color: #fff;
        border: 1px solid #f44;
        background-color: #f44;
    }

    .sendsms-box{
        display: flex;
        background-color:#fff;
    }
    .sendsms-box > div{
        flex: 1;
    }
    .sendsms_input{
        float: left;
        width: 75%;
    }
    .feaCheckbox{
        margin: 0 12px;
    }
    .sendsms-box > div.sendsms{
        width: auto;
        float: right;
        display: flex;
        flex:none;
    }
    .after::after{
        display: table;
        content: " ";
        clear: both;
    }
    .sendsms .sendsms-line{
        height: 1.07rem;
        width:1px;
        background-color: #D8D8D8;
        display:block;
        margin: auto 0;
    }
    .sendsms .sendsms-txt{
        margin: auto 0;
        padding: 0;
        border:none;
        font-size: .64rem;
        color: #EE2D2D;
        padding: 0 .64rem;
        background-color: #fff;
    }
    .sendsms .sendsms-txt.van-button--disabled{
        color: #666;
    }



    .radio-box{
        .radio-right{
            flex: 1;
            margin: auto;
            .van-radio{
                flex: 1;
            }
        }
    }
    .wx-check {
        font-size: 12px;
        padding: 4px 12px 4px 16px;
        margin-top: 5px;
        span {
            color: #f44;
        }
        .wx-check-gou {
            width: 15px;
            height: 15px;
            margin-right: 10px;
            vertical-align: top;
            display: inline-block;
            position: relative;
            img {
                width: 100%;
                height: 100%;
            }
            i {
                display: block;
                width: 100%;
                height: 100%;
                border: 1px solid #e5e5e5;
                border-radius: 10px;
                font-style: normal;
            }
        }
    }



    .upload-box{
        margin-top: 10px;
        padding: 15px 12px;
        background-color: #fff;
    }
    .card-upload-box{
        .card-upload-img-box{
            .card-upload-label{
                font-size: 14px;
            }
            .card-upload-img{
                margin-top: 15px;
                .card-upload-img-from{
                    flex: .5;
                    margin-right: 12px;
                    .uploadForm{
                        margin-bottom: 10px;
                        position: relative;
                        width: 9.06rem;
                        overflow: hidden;
                        height: 5.6rem;
                        .upload{
                            position: absolute;
                            top: 0;
                            left: 0;
                            right: 0;
                            opacity: 0;
                            width: 100%;
                            height: 100%;
                            margin: auto;
                            z-index: 2;
                            input{
                                display: block;
                                height: 100%;
                                width: 100%;
                            }
                        }
                        .personal-img{
                            width: 100%;
                            height: 100%;
                            position: relative;
                            img{
                                display: block;
                                width: 100%;
                                height: 100%;
                            }
                            .img_remove{
                                position: absolute;
                                right: 0;
                                top: 0;
                                height: 33%;
                                width: 33%;
                                right: 0px;
                                top: 0px;
                                z-index: 2;
                                span{
                                    display: block;
                                    width: 18px;
                                    height: 18px;
                                    background-color: rgba(33, 33, 33, 0.65);
                                    font-size: 16px;
                                    border-radius: 100%;
                                    line-height: 16px;
                                    text-align: center;
                                    color: #fff;
                                    float: right;
                                }
                            }
                        }
                    }
                }
                .card-upload-img-from:last-child{
                    margin-right: 0;
                }
                .card-upload-text{
                    font-size: 12px;
                    text-align: center;
                }
            }
        }
    }

    .goodsClass-alert{
        position: fixed;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
        z-index: 1003;
        background-color: #f2f2f2;
    }

    .vantLoading{
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: flex;
        z-index: 1000;
    }
</style>