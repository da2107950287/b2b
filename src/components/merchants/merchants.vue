<template>
    <div class="merchants">
        <div v-show="isShop">
            <navbar type="left" title="成为供应商" @clickleft="onClickLeft"></navbar>
            <!-- 注册信息 -->
            <div class="marcontent">
                <van-cell-group>
                    <!-- 公司名称 -->
                    <div class="van-call-box">
                        <van-field
                            v-model="enterpriseName"
                            label="公司名称"
                            placeholder="公司名称"
                            :error-message="Verification.enterpriseName"
                            @blur="vtEnterpriseName"
                        />
                    </div>
                    <!--  -->
                    <div class="van-call-box">
                        <div  @click="Address">
                            <van-field
                                v-model="address"
                                readonly
                                label="公司地区"
                                placeholder="请选择省/市/区"
                                :error-message="Verification.address"
                            />
                        </div>
                    </div>
                    <div class="van-call-box">
                        <van-field
                            v-model="addressInfo"
                            label="详细地址"
                            placeholder="详细所在地"
                            :error-message="Verification.addressInfo"
                            @blur="vtAddressInfo"
                        />
                    </div>
                    <!--行业标签 -->
                    <div class="van-call-box">
                        <van-field
                            v-model="tag"
                            label="经营品类"
                            placeholder="请选择入驻分类"
                            :error-message="Verification.tag"
                            @focus='goodsClass'
                            readonly
                        />
                    </div>
                    <!--行业标签 -->
                    <div class="van-call-box">
                        <van-field
                            v-model="market"
                            label="所属市场"
                            placeholder="请选择所属市场"
                            :error-message="Verification.market"
                            @focus='marketsClass'
                            readonly
                        />
                        <van-field
                            v-model="marketc"
                            label=""
                            placeholder="请选择所属市场(选填)"
                            :error-message="Verification.marketc"
                            @blur="vtMarketc"
                            v-if="marketcShow"
                        />
                    </div>
                    <!-- 配送方式 -->
                    <div class="van-call-box">
                        <van-field
                            v-model="distributor"
                            label="配送方式"
                            @click='distributorShow = true'
                            readonly
                        />
                    </div>
                    <!-- 联系人 -->
                    <div class="van-call-box">
                        <van-field
                            v-model="fullName"
                            label="联系人"
                            placeholder="请输入您的姓名"
                            :error-message="Verification.fullName"
                            @blur="vtFullName"
                        />
                    </div>
                    <!-- 联系方式 -->
                    <div class="van-call-box">
                        <van-field
                            v-model="contacTinformation"
                            label="联系方式"
                            placeholder="请输入联系方式"
                            :error-message="Verification.contacTinformation"
                            @blur="vtContacTinformation"
                            maxlength="11"
                        />
                    </div>
                    <!-- 输入验证码 -->
                    <div class="sendsms-box van-call-box">
                        <van-field
                            v-model="sms"
                            center
                            clearable
                            label="短信验证码"
                            placeholder="请输入短信验证码"
                            :error-message="Verification.sms"
                            @blur="vtSms"
                        >   
                        </van-field>
                        <div class="sendsms after">
                            <span class="sendsms-line"></span>
                            <van-button slot="button" size="small" type="primary" @click="getCode" class="sendsms-txt">{{codeMsge}}</van-button>
                        </div>
                    </div>
                    <!-- 专属客服 -->
                    <div class="van-call-box">
                        <van-field
                            v-model="customerPhone"
                            label="专属客服"
                            placeholder="请输入专属客服联系方式(选填)"
                            :error-message="Verification.customerPhone"
                            @blur="vtCustomerPhone"
                            maxlength="11"
                        />
                    </div>
                    <!-- 营业执照号 -->
                    <div class="van-call-box">
                        <van-field
                            v-model="businessLicense"
                            label="营业执照号"
                            placeholder="请输入营业执照号"
                            :error-message="Verification.businessLicense"
                            @blur="vtBusinessLicense"
                        />
                    </div>
                </van-cell-group>
                <van-cell-group class="upload-box">
                    <div class="card-upload-box" v-if="is_weixin">
                        <div class="card-upload-img-box">
                            <div class="card-upload-label">上传身份证</div>
                            <div class="dflex card-upload-img">
                                <div class="card-upload-img-from">
                                    <div class="wxUploadForm uploadForm">
                                        <div class="personal-img" @click="wxSetUsenImge('card1')">
                                            <img :src='idcardFace' width="100%">
                                            <div class="img_remove" @click.stop="imgRemove('idcardFace')" v-if="idcardFaceStatus == 1">
                                                <span>&times;</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="card-upload-text">拍摄/上传人面照</div>
                                </div>
                                <div class="card-upload-img-from">
                                    <div class="wxUploadForm uploadForm">
                                        <div class="personal-img" @click="wxSetUsenImge('card2')">
                                            <img :src='idcardBack' width="100%">
                                            <div class="img_remove" @click.stop="imgRemove('idcardBack')" v-if="idcardBackStatus == 1">
                                                <span>&times;</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="card-upload-text">拍摄/上传国徽面</div>
                                </div>
                            </div>
                        </div>
                        <div class="card-upload-img-box">
                            <div class="card-upload-label">上传营业执照</div>
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
                    <div class="card-upload-box" v-else>
                        <div class="card-upload-img-box">
                            <div class="card-upload-label">上传身份证</div>
                            <div class="dflex card-upload-img">
                                <div class="card-upload-img-from">
                                    <div class="uploadForm">
                                        <form id="uploadForm1" class="upload" enctype="multipart/form-data">
                                            <input id="file1" type="file" name="file" class="file" @change="setUsenImge('file1')"/>
                                        </form>
                                        <div class="personal-img">
                                            <img :src='idcardFace' width="100%">
                                            <div class="img_remove" @click.stop="imgRemove('idcardFace')" v-if="idcardFaceStatus == 1">
                                                <span>&times;</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="card-upload-text">拍摄/上传人面照</div>
                                </div>
                                <div class="card-upload-img-from">
                                    <div class="uploadForm">
                                        <form id="uploadForm2" class="upload" enctype="multipart/form-data">
                                            <input id="file2" type="file" name="file" class="file" @change="setUsenImge('file2')" />
                                        </form>
                                        <div class="personal-img">
                                            <img :src='idcardBack' width="100%">
                                            <div class="img_remove" @click.stop="imgRemove('idcardBack')" v-if="idcardBackStatus == 1">
                                                <span>&times;</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="card-upload-text">拍摄/上传国徽面</div>
                                </div>
                            </div>
                        </div>
                        <div class="card-upload-img-box">
                            <div class="card-upload-label">上传营业执照</div>
                            <div class="dflex card-upload-img">
                                <div class="card-upload-img-from">
                                    <div class="uploadForm">
                                        <form id="uploadForm3" class="upload" enctype="multipart/form-data">
                                            <input id="file3" type="file" name="file" class="file" @change="setUsenImge('file3')"/>
                                        </form>
                                        <div class="personal-img">
                                            <img :src='chartered' width="100%">
                                            <div class="img_remove" @click.stop="imgRemove('chartered')" v-if="charteredStatus == 1">
                                                <span>&times;</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="card-upload-text">拍摄/上传手持营业执照</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </van-cell-group>
            </div>
            <!-- 选择城市 -->
            <van-actionsheet v-model="isShowPickerArealist">
                <van-area 
                    :value="regionSn"
                    :area-list="areaList" 
                    @cancel="addCancel" 
                    @confirm="addConfirm" 
                    :columns-num="3" 
                    title="所在城市" 
                />
            </van-actionsheet>
            <div>
                <!-- 最新 勾选同意协议样式 -->
                <div class="wx-check">
                    <div class="wx-check-gou" @click="changeCheack(1)"><img v-if="checkedtwo" src="../../assets/img/xuanzhong.png"><i v-else></i></div>同意<span @click.stop="contract">《平台服务合同》</span>和<span @click.stop="discounts">《隐私条约》</span>
                </div>
                <div class="wx-check">
                    <div class="wx-check-gou" @click="changeCheack(2)"><img v-if="checkedone" src="../../assets/img/xuanzhong.png"><i v-else></i></div>同意<span @click.stop="discount">《代运营合同》</span>
                </div>
            </div>
            <van-button type="danger" :disabled="disable" class="merbtn" @click="merchbtn">提交</van-button>

            <goodsClass class="goodsClass-alert" chose="checkDom" @onClickClose="onClickClose" v-if="goodsClassShow" @listLoadingShow="listLoadingShow" @listLoadingHide="listLoadingHide"></goodsClass>
            <marketsClass class="goodsClass-alert" chose="radioDom" @onClickClose="marketsClickClose" v-if="marketsClassShow" @listLoadingShow="listLoadingShow" @listLoadingHide="listLoadingHide"></marketsClass>
            <distributor class="goodsClass-alert" v-if="distributorShow" @onClickClose="distributorShow = false"></distributor>

            <div class="vantLoading" v-if="!lock || !vloadingShow">
                <vloading :vertical="false" text=""></vloading>
            </div>
        </div>
        <div v-show="!isShop"></div>
    </div>
    
</template>
<script>
import Vue from "vue";
import $ from 'jquery'
import {is_wexin} from '../../assets/js/commonAPI.js'
import {wxUpload,wxStart} from '../../assets/js/wxjs.js'
import {acync} from '../../assets/js/acync.js'

import idcardFace from '../../assets/img/shenfenzhengzheng.png'
import idcardBack from '../../assets/img/shengfenzhengbei.png'
import chartered from '../../assets/img/yinyezhizhao.png'

const goodsClass =  ()=>import("../goodsClass/goodsClass.vue");
const marketsClass =  ()=>import("../goodsClass/marketsClass.vue");
const distributor = ()=>import("../goodsClass/distributor.vue");
const navbar =  ()=>import("../navbar/nav.vue");
const vloading =  ()=>import("../vloading.vue");

export default {
    data(){
        return{
            enterpriseName:'',         //公司名称
            address:'',                //公司下拉框
            tag:'',                    //行业内别
            market:'',                 //所属市场
            market_id:0,               //所属市场ID
            district:-1,               //是否是其他市场
            marketc:'',                //市场备注
            distributor: '',     // 一般情况下，为农联物流。  配送商为 自送
            fullName:'',               //联系人姓名
            contacTinformation:'',     //联系方式
            customerPhone:'',          //专属客服
            sms:'',                    //验证码
            codeMsge:'发送验证码',      //验证码文字
            canClick: true,            //添加canClick
            totalTime: 60,
            password:'',               //密码
            confirmPassword:'',        //确认密码
            addressInfo:'',            //详细所在地
            regionSn:'',               //####=>最小区域单位
            city_code:'',              //####=>市code
            areaList:[],
            businessLicense: '',       //营业执照号
            Verification:{
                password:'',
                confirmPassword:'',
                sms:'',
                fullName:'',
                tag:'',
                enterpriseName:'',
                address:'',
                addressInfo:'',
                contacTinformation:'',
                customerPhone:'',
                market:'',
                marketc:'',
                businessLicense: ''
            },
            // 公司地址下拉
            isShowPickerArealist:false,
            onetitle:'',    //一级菜单标题
            // twotitle:'',    //二级菜单标题
            scode:'',          //验证码字段
            idarr:'',          //获取所有id

            checkedone:false,
            checkedtwo:true,
            disable:false,
            imgCleck:true,      //控制图片上传一直点击

            is_weixin:is_wexin(),//判断微信
            idcardFace:idcardFace,//身份证正
            idcardFaceStatus:0,//判断是否有上传身份证正 1 已上传 0未上传
            idcardBack:idcardBack,//身份证反
            idcardBackStatus:0,//判断是否有上传身份证反 1 已上传 0未上传
            chartered:chartered,//营业执照
            charteredStatus:0,//判断是否有上传营业执照 1 已上传 0未上传

            goodsClassShow:false,     //分类选择显示
            marketsClassShow:false,   //市场选择显示
            marketcShow:false,        //其他市场显示规则
            distributorShow: false,   //配送方式显示
            catName: '',              //####=>商品分类名称 
            lock:true,                //请求限制开关 true 可以请求 false 不可请求
            mk:'工厂',

            isShop:false,            //是否是商家 true 是 false 否

            wxConfig: '',
            vloadingShow:true,                //wxjssdk加载loading true 可以请求 false 不可请求

        }
    },
    created(){
        // 获取内容
        
        if(is_wexin()){
            this.vloadingShow = false;
            wxStart(()=>{
                this.vloadingShow = true
            })
        }
        this.$cacheStorage(
            'isShop',
            '/?c=user&a=favorable',
            'session',
            {},
            ((res)=>{
                if(res.data==0){
                    this.isShop = true;
                    this.$router.push({
                        path: '/merchants'
                    })
                }else if(res.data==1){
                    this.$router.push({
                        path: '/contractsec'
                    })
                }else if(res.data==2){
                    this.$router.push({
                        path: '/check'
                    })
                }else if(res.data==3){
                    this.$toast('您已经是供应商');
                    this.$router.push({
                        path: '/index'
                    })
                }else if(res.data==4){
                    this.$toast('您已经是供应商');
                    this.$router.push({
                        path: '/index'
                    })
                }else if(res.data==5){
                    this.$toast('您已经是供应商');
                    this.$router.push({
                        path: '/index'
                    })
                }else if(res.data==6){
                    this.$router.push({
                        path: '/contractdefeated'
                    })
                    localStorage.setItem('defeatedMsg',res.msg);
                }
            }),
        )
        sessionStorage.removeItem('isShop');
        

        let oneitem=localStorage.getItem('enterItem');
        let twoitem=localStorage.getItem('enterlable');
        let code_sn = localStorage.getItem('getLocation');

        let discounts=localStorage.getItem("discounts")
        if(discounts==1){
            this.checkedone=true
        }
            
        if(!this.$appFunc.prototype.isEmpty(localStorage.getItem('idcardFace'))){
            this.idcardFace = localStorage.getItem('idcardFace');
            this.idcardFaceStatus= 1;
        }else{
            this.idcardFace = idcardFace;
            this.idcardFaceStatus= 0;
        }
        if(!this.$appFunc.prototype.isEmpty(localStorage.getItem('idcardBack'))){
            this.idcardBack = localStorage.getItem('idcardBack');
            this.idcardBackStatus= 1;
        }else{
            this.idcardBack = idcardBack;
            this.idcardBackStatus= 0;
        }
        if(!this.$appFunc.prototype.isEmpty(localStorage.getItem('chartered'))){
            this.chartered = localStorage.getItem('chartered');
            this.charteredStatus = 1;
        }else{
            this.chartered = chartered;
            this.charteredStatus = 0;
        }

        if(localStorage.getItem('companyName') != null){
            this.enterpriseName = localStorage.getItem('companyName');
        }
        
        if(localStorage.getItem('companyAddress') != null){
                this.address = localStorage.getItem('companyAddress');
        }else if(localStorage.getItem('getLocation') != null){
            let addressCode = JSON.parse(code_sn);
            this.address = addressCode.province + addressCode.city + addressCode.district;
        }
        if(localStorage.getItem('DetailAddress') != null){
                this.addressInfo = localStorage.getItem('DetailAddress');
        }else if(localStorage.getItem('getLocation') != null){
            let addressCode = JSON.parse(code_sn);
            this.addressInfo = addressCode.street + addressCode.street_number;
        }
        if(localStorage.getItem('linkman') != null){
                this.fullName = localStorage.getItem('linkman');
            }
        if(localStorage.getItem('telNumber') != null){
                this.contacTinformation = localStorage.getItem('telNumber');
            }
        if(localStorage.getItem('scode') != null){
                this.scode = localStorage.getItem('scode');
            }
        if(localStorage.getItem('code') != null){
            this.sms = localStorage.getItem('code');
        }
        if(localStorage.getItem('regionSn') != null){
            this.regionSn = localStorage.getItem('regionSn');
        }else if(localStorage.getItem('getLocation') != null){
            let addressCode = JSON.parse(code_sn);
            this.regionSn = addressCode.district_sn;
        }
        if(localStorage.getItem('businessLicense')) {
            this.businessLicense = localStorage.getItem('businessLicense');
        }
        if(oneitem!==''&&oneitem!==null){
           let oneitemObj=JSON.parse(oneitem);
           this.onetitle=oneitemObj.cat_name
        }
        if(twoitem!==''&&twoitem!==null){
            let names='';
            let ids='';
            let twoitemObj=JSON.parse(twoitem);
            for(var key in twoitemObj){
                names+=('|'+twoitemObj[key]);
                ids+=(key+',');
            }
            ids = ids.substring(0,ids.length-1);
            this.idarr=ids;
            this.tag=this.onetitle+'\xa0'+names
        }
        let marketData = localStorage.getItem('marketData');
        if(marketData){
            marketData = JSON.parse(marketData);
            this.marketsClickClose(marketData);
        }
        if(localStorage.getItem('marketcName') != null){
            this.marketc = localStorage.getItem('marketcName');
        }
        // 公司地址下拉
        let acyncList = new acync();
        this.areaList = acyncList[0];
        localStorage.getItem('enterItem','')
        localStorage.getItem('enterlable','')



        
        
    },
    methods: {
    /*  */
        changeCheack(type){
            //切换第一个同意
            if(type === 1) {
                if(this.checkedtwo==true){  
                    this.checkedtwo = false;  //1.此时 此条协议 未勾选
                    this.disable = true;   //2.不能点击提交按钮
                }else{
                    this.checkedtwo = true;
                    this.disable = false;       
                }
            }else if(type ===2 ){
                //切换第二个同意。 此条 与 提交 按钮状态 无直接关系
                if(this.checkedone==true){ 
                    this.checkedone = false;
                }else{
                    this.checkedone = true;
                }                
            }
        },
        // 跳转《优惠流程条款》
        runing(){
             this.$router.push({
                path:'/discounts',
                query:{id:'3'},
            })
        },
        // 跳转《待运营流程条款》
        discount(){
             this.$router.push({
                path:'/discounts',
                query:{id:'1'},
            })
        },
        // 跳转《隐私条约》
        discounts(){
             this.$router.push({
                path:'/discounts',
                query:{id:'2'},
            })
        },
        // 跳转《合同条约》
        contract(){
             this.$router.push({
                path:'/contract',
            })
        },
        onClickLeft() {
            localStorage.removeItem('telNumber')
            localStorage.removeItem('scode')
            localStorage.removeItem('code')
            this.$router.push({
                path:"/personal"
            });
        },
        //验证公司名称
        vtEnterpriseName(){
            if(this.enterpriseName == ''){
                this.Verification.enterpriseName = '请输入公司名称';
                return
            }else{
                this.Verification.enterpriseName = ''
            }
            //存入公司名称
            localStorage.setItem('companyName',this.enterpriseName);
        },
         //====>选择公司地址
        Address(){
            this.isShowPickerArealist = true;
        },
        addCancel(){
            this.isShowPickerArealist = false;
        },
        addConfirm(value){
            let add='';
            for(let i=0; i<value.length; i++){
                add += value[i].name;
            }
            this.regionSn = value[2].code;
            this.city_code = value[1].code;
            // 法人姓名（联系人）
            localStorage.setItem('regionSn',this.regionSn);
            localStorage.setItem('city_code',this.city_code);
            localStorage.setItem('companyAddress',add);
            
            sessionStorage.removeItem('factoryMarket');
            sessionStorage.removeItem('baseMarket');
            sessionStorage.removeItem('bazaarMarket');

            this.market = '';
            this.marketc = '';
            this.market_id = '';


            this.address = add;
            this.isShowPickerArealist = false;
        },
       
        //公司详细地址
        vtAddressInfo(){
            if(this.addressInfo == ''){
                this.Verification.addressInfo = '请输入公司地址'
                return
            }else{
                this.Verification.addressInfo = ''
            }
            // 存入详细地址
            localStorage.setItem('DetailAddress',this.addressInfo);
        },
        // 点击触发弹出框
        tagclick(){
            this.$router.push({
                path:'/enterLable'
            })
        },
        //法人名称
        vtFullName(){
            if(this.fullName == ''){
                this.Verification.fullName = '请输入联系人'
                return
            }else{
                this.Verification.fullName = ''
            }
            // 法人姓名（联系人）
            localStorage.setItem('linkman',this.fullName);
        },
        
        //联系方式
        vtContacTinformation(){
            if(this.contacTinformation == ''){
                this.Verification.contacTinformation = '请输入联系方式'
                localStorage.removeItem('telNumber');
                return false
            }else if(!this.$appFunc.prototype.isPhone(this.contacTinformation)){
                this.Verification.contacTinformation = '请输入正确的联系方式'
                localStorage.removeItem('telNumber');
                return false
            }else{
                this.Verification.contacTinformation = ''
                localStorage.setItem('telNumber',this.contacTinformation);
                return true
            }
        },
        //客服联系方式
        vtCustomerPhone(){
            if(this.customerPhone == ''){
                this.Verification.customerPhone = ''
            }else if(!this.$appFunc.prototype.isPhone(this.customerPhone)){
                this.Verification.customerPhone = '请输入正确的联系方式'
                return
            }else{
                this.Verification.customerPhone = ''
            }
        },
        //短信验证码
        vtSms(){
            let sum = /^[1-9]\d*$/
            if(!sum.test(this.sms)){
                this.Verification.sms = '请输入验证码'
                return
            }else{
                localStorage.setItem('code',this.sms);
                this.Verification.sms = ''
            }
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

                        this.scode = res.data.state;
                        localStorage.setItem('scode',res.data.state);
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
        //验证密码
        vtPassword(){
            let isNumber = /\d/;
            let isLetter = /[a-zA-z]/;
            if (this.password == '') {
                this.Verification.password = "请输入密码且包含特殊字符，大小写字母和数字。"
                return
            }else if ( this.password.length < 6 ) {
                this.Verification.password = "密码长度不能小于6位，且必须包含特殊字符，大小写字母和数字。"
                return
            }else if( !isNumber.test(this.password) ){
                this.Verification.password = "密码过于简单，密码必须包含特殊字符，大小写字母和数字。"
                return
            }else if( !isLetter.test(this.password) ){
                this.Verification.password = "密码过于简单，密码必须包含特殊字符，大小写字母和数字。"
                return
            }else{
                this.Verification.password = ""
            }
        },
        //确认密码
        vtCatPassword(){
            if (this.confirmPassword == '') {
                this.Verification.confirmPassword = "确认密码不能为空"
                return
            }else if(this.confirmPassword != this.password){
                this.Verification.confirmPassword = "确认密码与密码不一致。"
                return
            }else{
                this.Verification.confirmPassword = ""
            }
        },
        //营业执照号
        vtBusinessLicense(){
            if(!this.businessLicense) {
                this.Verification.businessLicense = '请输入营业执照号';
                return
            }else {
                this.Verification.businessLicense = '';
                localStorage.setItem('businessLicense', this.businessLicense);
            }     
        },
        //点击确认跳转
        merchbtn(){
            //发送请求
            
            if(this.enterpriseName == ''){
                this.$toast('请输入公司名称')
                this.Verification.enterpriseName = '请输入公司名称';
                return
            }
            if(this.addressInfo == ''){
                this.$toast('请输入公司详细地址')
                this.Verification.addressInfo = '请输入公司详细地址'
                return
            }
            if(this.idarr == ''){
                this.$toast('请选择经营品类')
                this.Verification.tag = '请选择经营品类'
                return
            }
            if(this.district == 0){//其他市场 0是其他 -1默认
            }else{
                if(this.$appFunc.prototype.isEmpty(this.market)){
                    this.$toast('请选择所属市场')
                    this.Verification.market = '请选择所属市场'
                    return false;
                }
            }
            if(this.fullName == ''){
                this.$toast('请输入联系人')
                this.Verification.fullName = '请输入联系人'
                return
            }
            if(this.contacTinformation == ''){
                this.$toast('请输入联系方式')
                this.Verification.contacTinformation = '请输入联系方式'
                return
            }

            if(!this.businessLicense) {
                this.$toast('请输入营业执照号');
                this.Verification.businessLicense = '请输入营业执照号';
                return
            }
            if(!(this.charteredStatus == 1 || (this.idcardFaceStatus == 1 && this.idcardBackStatus == 1))){
                if(this.idcardFaceStatus != 1 || this.idcardBackStatus != 1){
                    this.$toast('请上传身份证正反面');
                    return;
                }else if(this.charteredStatus != 0){
                    this.$toast('请上传营业执照');
                    return;
                }
            }

            let longitude = '';
            let latitude = '';
            if(!this.is_weixin){
                let bdPoint = localStorage.getItem('bdPoint');
                if(!this.$appFunc.prototype.isEmpty(bdPoint)){
                    let bdPointList = JSON.parse(bdPoint);
                    longitude = bdPointList.lng;
                    latitude = bdPointList.lat;
                }
            }else{
                let wxPoint = localStorage.getItem('wxPoint');
                if(!this.$appFunc.prototype.isEmpty(wxPoint)){
                    let wxPointList = JSON.parse(wxPoint);
                    longitude = wxPointList.longitude;
                    latitude = wxPointList.latitude;
                }
            }
            let idcardFaceBase = '';
            let idcardBackBase = '';
            let charteredBase = '';
            if(this.idcardBackStatus == 1||this.idcardFaceStatus == 1){
                idcardFaceBase=this.idcardFace;
                idcardBackBase=this.idcardBack;
            }
            if(this.charteredStatus == 1){
                charteredBase=this.chartered;
            }
            if(this.lock){
                this.lock = false;
                this.$post('/?c=user&a=upgradeMerchants', {
                    market_id:this.market_id,
                    market_remark:this.marketc,
                    customer_phone:this.customerPhone,
                    longitude:longitude,
                    latitude:latitude,
                    code:this.sms,
                    scode:this.scode,
                    contactName:this.fullName,
                    contactPhone:this.contacTinformation,
                    companyName:this.enterpriseName,
                    company_address:this.addressInfo,
                    cat_id:this.idarr,
                    password:this.password,
                    region_sn:this.regionSn,
                    legal_person_fileImg:idcardFaceBase,
                    legal_person_fileImg_back:idcardBackBase,
                    license_fileImg:charteredBase,
                    business_license_id: this.businessLicense,
                    type:1,
                    replace:this.checkedone?1:0,
                }).then((res) => {
                    if(res.code===0){
                        localStorage.removeItem('companyName');
                        localStorage.removeItem('companyAddress');
                        localStorage.removeItem('DetailAddress');
                        localStorage.removeItem('linkman');
                        localStorage.removeItem('telNumber');
                        localStorage.removeItem('edit');
                        localStorage.removeItem('code');
                        localStorage.removeItem('scode');
                        localStorage.removeItem('enterlable');
                        localStorage.removeItem('enterItem');
                        localStorage.removeItem('regionSn');
                        localStorage.removeItem('chartered');
                        localStorage.removeItem('idcardFace');
                        localStorage.removeItem('idcardBack');
                        localStorage.removeItem('city_code');
                        localStorage.removeItem('marketcName');
                        localStorage.removeItem('marketData');
                        localStorage.removeItem('businessLicense');

                        this.$router.push({
                            path:'/contractsec'
                        })
                        this.lock = true;
                    }else if(res.code == 1){
                        this.$toast(res.msg);
                        this.lock = true;
                    }
                });
                setTimeout(()=>{
                    this.lock = true;
                },20000);
            }else{
                this.$toast("操作太频繁");
            }
           
        },
        /* 图片上传 */
        wxSetUsenImge(imgType){
            let _this = this;
            if(_this.imgCleck){
                _this.imgCleck = false;
                wxUpload({},_this,imgType,100,(res)=>{
                    if(imgType == 'card1'){
                        _this.idcardFace = res;
                        _this.idcardFaceStatus = 1;
                        localStorage.setItem('idcardFace',res);
                    }
                    else if(imgType == 'card2'){
                        _this.idcardBack = res;
                        _this.idcardBackStatus = 1;
                        localStorage.setItem('idcardBack',res);
                    }
                    else if(imgType == 'card3'){
                        _this.chartered = res;
                        _this.charteredStatus = 1;
                        localStorage.setItem('chartered',res);
                    }
                    _this.imgCleck = true;
                },(cancel)=>{
                    _this.imgCleck = true;
                });
            }
        },
        setUsenImge(imgType){
            let _this = this;
            if(_this.imgCleck){
                _this.imgCleck = false;
                let file = $('#'+imgType)[0].files[0];
                let formData = new FormData();
                formData.append('file', file);
                _this.$post('/?c=user&a=upload',formData).then((res)=>{
                    if(res.code == 0){
                        if(imgType == 'file1'){
                            _this.idcardFace = res.data.img;
                            _this.idcardFaceStatus = 1;
                            localStorage.setItem('idcardFace',res.data.img);
                        }
                        else if(imgType == 'file2'){
                            _this.idcardBack = res.data.img;
                            _this.idcardBackStatus = 1;
                            localStorage.setItem('idcardBack',res.data.img);
                        }
                        else if(imgType == 'file3'){
                            _this.chartered = res.data.img;
                            _this.charteredStatus = 1;
                            localStorage.setItem('chartered',res.data.img);
                        }
                        _this.imgCleck = true;
                    }
                });
                
                setTimeout(()=>{
                    _this.imgCleck = true;
                },2000);
            }
        },
        
        imgRemove(key){
            if(key == 'idcardFace'){
                this.idcardFace = idcardFace;
                this.idcardFaceStatus = 0;
                localStorage.setItem('idcardFace','');
            }else if(key == 'idcardBack'){
                this.idcardBack = idcardBack;
                this.idcardBackStatus = 0;
                localStorage.setItem('idcardBack','');
            }else if(key == 'chartered'){
                this.chartered = chartered;
                this.charteredStatus = 0;
                localStorage.setItem('chartered','');

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
                
                localStorage.setItem('enterItem',JSON.stringify(data.enterItem));
                localStorage.setItem('enterlable',JSON.stringify(data.enterlable));

                if(oneitem!==''&&oneitem!==null){
                let oneitemObj=oneitem;
                this.onetitle=oneitemObj.cat_name
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
                    this.idarr=ids;
                    this.tag=this.onetitle+'\xa0'+names
                }
            }
            this.goodsClassShow = false;
        },
        //所属市场
        marketsClass(){
            this.marketsClassShow = true;
        },
        //所属市场
        marketsClickClose(data){
            if(!this.$appFunc.prototype.isEmpty(data)){
                if(data.item.district == 0){
                    this.mk = data.type.text;
                    this.district = data.item.district;
                    this.market_id = data.item.market_id;
                    this.market = data.type.text+ "\xa0|\xa0" +data.item.market_name;
                    this.marketcShow = true;
                    localStorage.setItem('marketData',JSON.stringify(data));
                }else{
                    this.mk = data.type.text;
                    this.district = data.item.district;
                    this.market_id = data.item.market_id;
                    this.market = data.type.text+ "\xa0|\xa0" +data.item.market_name;
                    this.marketcShow = false;
                    localStorage.setItem('marketData',JSON.stringify(data));
                }
                this.Verification.market = '';

                if(data.type.id == 5) {
                    //配送商， 配送方式更改为 自送
                    this.distributor = '自送';
                }else {
                    this.distributor = '农联物流';
                }
            }
            this.marketsClassShow = false;
            
        },
        //保存其他市场名称
        vtMarketc(){
            localStorage.setItem('marketcName',this.marketc);
        },       
        listLoadingShow(){
            this.$parent.$refs.loading.style.display = "flex"
        },
        listLoadingHide(){
            this.$parent.$refs.loading.style.display = "none"
        },
    },
    components:{
        navbar,
        goodsClass,
        marketsClass,
        distributor,
        vloading,
    },
}
</script>
<style>
    .merchants .feaCheckbox .van-checkbox__icon{
        height: 20px;
    }
    .merchants .van-checkbox__icon--round .van-icon{
        height: 15px;
        line-height: 15px;
        width: 15px;
    }
    .merchants .van-checkbox__icon--checked .van-icon{
        border-color: #EE2D2D;
        background-color: #EE2D2D;
        overflow: hidden;
    }
    .merchants .van-icon, .van-icon::before{
        display: inline-block;
    }
    .merchants .feaCheckbox .van-checkbox__label{
        font-size: 12px;
    }
    .merchants .feaCheckbox .van-checkbox__label span{
        color: #ee2d2d;
    }
</style>
<style scoped lang="less">
    .dflex{
        display: flex;
        justify-content: flex-start;
    }
/*  */
    .van-nav-bar .van-icon{
        color: #232323;
    }
    .merchants{
        background: #f2f2f2;
    }
    .marcontent{
        margin-top:.6rem;
    }
    .merbtn{
        width:95%;
        margin-left:2.5%;
        margin-top:1rem;
        border-radius:5px;
    }
    .pwdsize{
        font-size: .64rem;
        height: 1.8rem;
        background: #f2f2f2;
        line-height: 1.8rem;
        padding-left: 12px;
        color: #999;
    }
    .van-button--small.codeMsge{
        background-color:unset;
        color: #212221
    }
    .van-cell::after{
        border-bottom: 0;
    }
    .van-call-box{
        border-bottom: 1px solid #f2f2f2;
    }
    .van-call-box:last-child{
        border-bottom: 0;
    }
    .van-hairline--top-bottom::after{
        border-bottom: 0;
    }
    .sendsms-box{
        display: flex;
    }
    .sendsms-box > div{
        flex: 1;
    }
    .sendsms_input{
        float: left;
        width: 75%;
    }
    .feaCheckbox{
        margin: 10px 12px;
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
/*  */
.upload-box{
    margin-top: 10px;
    padding: 15px 12px;
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
    .card-upload-img-box:last-child{
        margin-top: 20px;
    }
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
    
    /**最新 勾选样式 */
    .wx-check {
        font-size: 12px;
        padding: 4px 12px 4px 16px;;
    }
    .wx-check:first-child {
        margin-bottom: 8px;
    }
    .wx-check .wx-check-gou {
        width: 15px;
        height: 15px;
        margin-right: 10px;
        vertical-align: top;
        display: inline-block;
        position: relative;
    }
    .wx-check .wx-check-gou img {
        width: 100%;
        height: 100%;
    }
    .wx-check .wx-check-gou i {
        display: block;
        width: 100%;
        height: 100%;
        border: 1px solid #e5e5e5;
        border-radius: 10px;
        font-style: normal;
    }
    .wx-check span {
        color: #f44;
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


