<template>
    <div class="register-dom">
        <!-- 导航 -->
        <navbar type="left" title="用户注册" @clickleft="goReturn"></navbar>
        <!-- 用户注册信息 -->
        <div class="user-info">
            <!-- 基本信息 -->
            <!-- <div class="dflex van-cell radio-box identity-box">
                <div class="fz_14 van-cell__title van-field__label"><span>所属身份</span></div>
                <van-radio-group v-model="identity" class="dflex fz_12 radio-right">
                    <van-radio name="1" checked-color="#EE2D2D">采购商</van-radio>
                    <van-radio name="2" checked-color="#EE2D2D">个人/家庭</van-radio>
                </van-radio-group>
            </div> -->
            <div class="basic-info">
                <div class="content">
                    <van-cell-group style="background-color: unset;">
                         <van-field
                            v-model="username"
                            clearable
                            label="用户名"
                            placeholder="请输入用户名"
                            :error-message="Verification.name"
                           @click-icon="$toast('question')"
                            @blur="vtName"
                        />
                        
                        <van-field
                            v-model="password"
                            type="password"
                            label="密码："
                            placeholder="请输入密码"
                            :error-message="Verification.password"
                            @blur="vtPassword"
                            @keyup.enter="register"
                        />
                        <van-field
                            v-model="confirmPassword"
                            type="password"
                            label="确认密码："
                            placeholder="请再次输入"
                            :error-message="Verification.confirmPassword"
                            @blur="vtCatPassword"
                            @keyup.enter="register"
                        />
                        <van-field
                            v-model="contacTinformation"
                            label="手机号："
                            placeholder="请输入手机号"
                            :error-message="Verification.contacTinformation"
                            @blur="vtContacTinformation"
                            @keyup.enter="register"
                        />
                        <div class="sendsms-box">
                            <van-field
                                v-model="sms"
                                center
                                clearable
                                label="验证码："
                                placeholder="请输入验证码"
                                :error-message="Verification.sms"
                                @blur="vtSms"
                                :maxlength='limit'
                                @keyup.enter="register"
                            >
                            </van-field>
                            <div class="sendsms after">
                                <span class="sendsms-line"></span>
                                <van-button slot="button" size="small" type="primary" @click="getCode" :class="[{'canClick':!canClick},'sendsms-txt']">{{codeMsge}}</van-button>
                            </div>
                        </div>
                        <!-- <van-field
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
                        <div class="upload-box" v-if="identity == '1'">
                            <div class="card-upload-box">
                                <div class="card-upload-img-box">
                                    <div class="card-upload-label">上传店头图或营业执照</div>
                                    <div class="dflex card-upload-img">
                                        <div class="card-upload-img-from">
                                            <div class="uploadForm">
                                                <form id="uploadForm3" class="upload" enctype="multipart/form-data">
                                                    <input id="file3" type="file" name="file" class="file" @change="setUsenImge('file3')"/>
                                                </form>
                                                <div class="personal-img">
                                                    <img :src='chartered' width="100%">
                                                    <div class="img_remove" @click="imgRemove('chartered')" v-if="charteredStatus == 1">
                                                        <span>&times;</span>
                                                    </div>
                                                </div>
                                            </div>
                                           
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div> -->
                    </van-cell-group>
                </div>
            </div>
        </div>
        <!-- 最新 勾选同意协议样式 -->
        <div class="wx-check">
            <div class="wx-check-gou" @click="changeCheack">
                <img v-if="checkedtwo" src="../assets/img/xuanzhong.png">
                <i v-else></i>
            </div>同意
            <span @click.stop="contract">《用户条款》</span>和
            <span @click.stop="discounts">《隐私条约》</span>
        </div>
        <div class="user-info-button">
            <van-button class="button-large fz_16" size="large" :disabled='disable' @click="register">确认注册</van-button>
        </div>

        
        <van-actionsheet v-model="PickerArealist">
            <van-area
                :area-list="areaList"
                @cancel="addCancel"
                @confirm="addConfirm"
                :columns-num="3"
                title="所在城市"
            />
        </van-actionsheet>

        <industryLable class="goodsClass-alert" chose="radioDom" @onClickClose="onClickClose" v-if="goodsClassShow"  @listLoadingShow="listLoadingShow" @listLoadingHide="listLoadingHide"></industryLable>

        <discounts class="discountDom" v-show="discountShow" :type="discountType" @closeDiscount="closeDiscount"></discounts>
    
    </div>
</template>

<script>
    import $ from 'jquery'
    import {is_wexin} from '../assets/js/commonAPI.js'
    import 'font-awesome/css/font-awesome.css'
    import {acync} from '../assets/js/acync.js'
    import '../assets/css/commonstyle.css'
    
    import chartered from '../assets/img/yinyezhizhao.png'
    const industryLable =  ()=>import("./goodsClass/industryLable.vue");
    const discounts =  ()=>import("./merchants/discountDom.vue");
    const navbar =  ()=>import("./navbar/nav.vue");

    //引入微信上传js
    export default {
        data() {
            return {
                identity:'1',           //所属身份
                isUnmanned:'1',         //是否无人收货

                imgLock:0,
                username:'',            //用户名
                password:'',            //密码
                confirmPassword:'',     //确认密码
                contacTinformation:'',  //联系方式

                sms:'',                 //短信验证码
                codeMsge:'获取验证码',
                canClick: true,         //添加canClick
                totalTime: 60,
                scode:'',               //验证安全码

                getLabel:[],
                labelId:0,

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

                limit:'',

                goodsClassShow:false,
                onetitle:'',

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
                checkedtwo:false, //同意协议
                disable:true,

                discountType:0,
                discountShow:false,
            }
        },
        created(){
            this.$post('/?c=user&a=getLabel',{
            })
            .then((res)=>{
                switch(res.code){
                    case 0:
                        this.getLabel = res.data
                    break;
                }
            })
            
            let wechatToUpdateDate = localStorage.getItem('wechatToUpdateDate');//上次录入数据
            if(!this.$appFunc.prototype.isEmpty(wechatToUpdateDate)){
                wechatToUpdateDate = JSON.parse(wechatToUpdateDate);
                this.saveDate = wechatToUpdateDate;
                this.tag = wechatToUpdateDate.tag;
                this.tagId = wechatToUpdateDate.tagId;
                this.enterpriseName = wechatToUpdateDate.enterpriseName;
                this.address = wechatToUpdateDate.address;
                this.regionSn = wechatToUpdateDate.regionSn;
                this.addressInfo = wechatToUpdateDate.addressInfo;
                this.fullName = wechatToUpdateDate.fullName;
                this.fullPhone = wechatToUpdateDate.fullPhone;
                this.clerkPhone = wechatToUpdateDate.clerkPhone;
                this.chartered = wechatToUpdateDate.chartered || this.chartered;
                this.charteredStatus = wechatToUpdateDate.charteredStatus;
            }
            
            
        },
        mounted(){
              // 公司地址下拉
            let acyncList = new acync();
            this.areaList = acyncList[0];
        },
        methods:{
            //返回上一页
            goReturn(){
                this.$router.go(-1);
            },
            //获取短信验证码
            getCode(){
                if (!this.vtContacTinformation()) return; 
                if (!this.$appFunc.prototype.getSednMsgNum()){
                    this.$toast("您发送短信的次数太频繁了！") 
                    return
                }; 

                if (!this.canClick) return; 
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
                    number: this.contacTinformation
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
            //验证用户名
            vtName(){
                let inputDome = $(event.target); 
                let han = /^[\u4e00-\u9fa5]+$/;
                let res = /^[a-zA-Z\d][a-zA-Z\d_\-\.]{5,10}$/
                if(res.test(this.username) == ''){
                    inputDome.focus();
                    this.Verification.name = '用户名以字母或者数字开头同时不能少于6位且不能大于11位'
                    return false;
                }else if(han.test(this.username)){
                    inputDome.focus();
                    this.Verification.name = "不能为中文，请以数字或者字母开头，特殊字符支持、_、-、@、.'";
                    return false;
                }else{
                    this.Verification.name = "";
                    return true;
                }
            },
            //验证密码
            vtPassword(){
                let inputDome = $(event.target); 
                let isNumber = /\d/;
                let isLetter = /[a-zA-z]/;
                let isMax = /^(?![a-zA-z]+$)(?!\d+$)(?![\d-,./?=+!@#$%^&*]+$)(?![a-zA-z\d]+$)(?![a-zA-z-=+!@#$%^&*]+$)(?![\d-,./?=+!@#$%^&*]+$)[a-zA-Z\d-,./?=+!@#$%^&*]+$/;
                if (this.password == '') {
                    this.Verification.password = "请输入密码且包含特殊字符，大小写字母和数字。"
                    return false;
                }else if ( this.password.length < 8) {
                    this.Verification.password = "密码长度不能小于8位，且必须包含特殊字符，大小写字母和数字。"
                    return false;
                }else if( !isMax.test(this.password)){
                    this.Verification.password = "密码过于简单，密码必须包含特殊字符，大小写字母和数字。"
                    return false;
                }else{
                    this.Verification.password = ""
                    return true;
                }
            },
            //确认密码
            vtCatPassword(){
                let inputDome = $(event.target); 
                if (this.confirmPassword == '') {
                    this.Verification.confirmPassword = "确认密码不能为空"
                    return false
                }else if(this.confirmPassword != this.password){
                    this.Verification.confirmPassword = "确认密码与密码不一致。"
                    return false
                }else{
                    this.Verification.confirmPassword = ""
                    return true
                }
            },
            //联系方式
            vtContacTinformation(){
                let inputDome = $(event.target); 
                if(this.contacTinformation == ''){
                    // inputDome.focus();
                    this.Verification.contacTinformation = '请输入联系方式'
                    return false
                }else if(!this.$appFunc.prototype.isPhone(this.contacTinformation)){
                    // inputDome.focus();
                    this.Verification.contacTinformation = '请输入正确的联系方式'
                    return false
                }else{
                    this.Verification.contacTinformation = ''
                    return true;
                }
            },
            //短信验证码
            vtSms(){
                let sum = /^[1-9]\d*$/
                if(!sum.test(this.sms)){
                    this.Verification.sms = '请输入验证码'
                    return false
                }else{
                    this.Verification.sms = ''
                    return true
                }
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
            // 提交
            register(){
                if(!this.vtName()) return false
                if(!this.vtPassword()) return false
                if(!this.vtCatPassword()) return false
                if(!this.vtContacTinformation()) return false
                if(!this.vtSms()) return false
                // if(!this.vtAddressInfo()) return false;

                let data = {};
                // if(this.identity == 1){
                //     if(!this.vtEnterpriseName()) return false;
                //     if(!this.vtFullName()) return false;
                //     if(!this.vtFullPhone()) return false;
                //     if(!this.vtClerkPhone()) return false;
                //     if(this.charteredStatus == 0){
                //         this.$toast("请上传店头图或营业执照");
                //         return false
                //     }
                // }
                this.$parent.$refs.loading.style.display = 'flex'
                // 用户注册为普通用户
                this.$post('/?c=user&a=registerN',{
                    phone : this.contacTinformation,//手机号
                    user_pwd : this.password,//密码
                    mobile_code : this.sms,//验证码
                    scode : this.scode,//短信
                }).then((res)=>{
                    switch(res.code){
                        case 0:
                            localStorage.setItem('b2bTokenId', res.data.token);
                            localStorage.setItem('b2bTokenId', res.data.token);
                            
                            // this.$post('/?c=user&a=receive',{
                            //     receive: this.isUnmanned
                            // })
                            // this.$post('/?c=user&a=addIntoMyAddress',{
                            //     contact_name: this.fullName,
                            //     contact_phone:this.contacTinformation,
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
                            //                 this.$router.push({
                            //                     path:'/index',
                            //                 });

                            //                 localStorage.setItem('loading',false);
                            //                 localStorage.removeItem('wechatToUpdateDate');
                            //                 localStorage.removeItem('attachments')
                            //                 break;
                            //             case 1:
                            //                 this.$toast(res.msg);
                            //                 break;
                            //         }
                            //     })
                            // }else{
                                this.$parent.$refs.loading.style.display = 'none'
                                this.$router.push({
                                    path:'/index',
                                });
                                localStorage.setItem('loading',false);
                            // }

                            break;
                        case 1:
                            this.$parent.$refs.loading.style.display = 'none'
                            this.$toast(res.msg);
                            break;
                        default:
                            this.$parent.$refs.loading.style.display = 'none'
                            break;
                    }
                });
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
            
            setUsenImge(imgType){
                let _this = this;
                if(_this.imgLock == 0){
                    _this.imgLock = 1;
                    let file = $('#'+imgType)[0].files[0];
                    let formData = new FormData();
                    formData.append('file', file);
                    _this.$post('/?c=user&a=upload',formData).then((res)=>{
                        if(res.code == 0){
                            if(imgType == 'file3'){
                                _this.chartered = res.data.img;
                                _this.charteredStatus = 1;

                                this.saveDate.chartered = res.data.img;
                                this.saveDate.charteredStatus = 1;
                                localStorage.setItem('wechatToUpdateDate',JSON.stringify(this.saveDate));
                                localStorage.setItem('attachments',res.data.img);
                            }
                        }
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
        components:{
            // downAddress,
            industryLable,
            discounts,
            navbar,
        },
    }
</script>
<style lang="less">
    .basic-info{
        .van-field__label{
            max-width: 120px;
        }
    }
</style>
<style lang="less" scoped>

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
    .van-nav-bar .van-icon.icon-style{
        color:#333;
        font-size: 15px;
    }
    .register-dom{
        height: 100%;
    }

    .user-info-button{
        padding: 0 22px;
        margin-top: 10px;
        .button-large{
            color: #fff;
            background-color: #EE2D2D;
            border-radius: 5px;
            height: 44px;
            line-height: 42px;
        }
    }
    .sendsms-box{
        background-color: #fff;
        display: flex;
        > div{
            flex: 1;
        }
        .sendsms {
            width: auto;
            float: right;
            display: flex;
            flex:none;
            .sendsms-line{
                height: 1.07rem;
                width:1px;
                background-color: #D8D8D8;
                display:block;
                margin: auto 0;
            }
            .sendsms-txt{
                margin: auto 0;
                padding: 0;
                border:none;
                font-size: .64rem;
                color: #EE2D2D;
                padding: 0 .64rem;
                background-color: #fff;
            }
            .sendsms-txt.canClick{
                color: #ccc;
            }
            
        }
    }
    
    .radio-box{
        margin-bottom: 10px;
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
    
    .goodsClass-alert{
        position: fixed;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
        z-index: 1003;
        background-color: #f2f2f2;
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
</style>