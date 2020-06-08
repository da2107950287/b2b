<template>
    <div>
        <!-- 导航 -->
        <van-nav-bar
            title="升级为企业用户"
            left-arrow
            @click-left="goPreviousPage"
        />
        <!-- 用户注册信息 -->
        <div class="user-info">
            <!-- 公司信息 -->
            <div class="basic-info">
                <div class="content">
                    <van-cell-group>
                        <!--行业标签 -->
                        <van-field
                                v-model="tag"
                                label="行业类别"
                                placeholder="请选择行业类别"
                                :error-message="Verification.tag"
                                @blur="tagclick"
                                readonly
                        />
                        <van-field
                            class="enterpriseName"
                            v-model="enterpriseName"
                            label="企业/门店名称"
                            placeholder="企业名称"
                            :error-message="Verification.enterpriseName"
                            @blur="vtEnterpriseName"
                        />
                        <div  @click="Address">
                            <van-field
                                class="enterpriseAddress"
                                v-model="address"
                                readonly
                                label="公司/门店地区"
                                placeholder="请选择省/市/区"
                                :error-message="Verification.address"
                            />
                        </div>
                        <van-field
                                v-model="addressInfo"
                                label="详细地址"
                                placeholder="详细地址"
                                :error-message="Verification.addressInfo"
                                @blur="vtAddressInfo"
                        />
                        <van-field
                                v-model="fullName"
                                label="负责人"
                                placeholder="请输入负责人姓名"
                                :error-message="Verification.fullName"
                                @blur="vtFullName"
                        />
                        <van-field
                                v-model="fullPhone"
                                label="联系方式"
                                placeholder="请输入负责人手机号"
                                maxLength="11"
                                :error-message="Verification.fullPhone"
                                @blur="vtFullPhone"
                        />
                        <van-field
                                v-model="clerkPhone"
                                label="所属业务员"
                                placeholder="请输入所属业务员手机号（选填）"
                                maxLength="11"
                                :error-message="Verification.clerkPhone"
                                @blur="vtClerkPhone"
                        />
                    </van-cell-group>
                    <van-cell-group class="upload-box">
                        <div class="card-upload-box" v-if="is_weixin">
                            <div class="card-upload-img-box">
                                <div class="card-upload-label">上传店头图</div>
                                <div class="dflex card-upload-img">
                                    <div class="card-upload-img-from">
                                        <div class="wxUploadForm uploadForm">
                                            <div class="personal-img" @click="wxSetUsenImge('card3')">
                                                <img :src='chartered' width="100%">
                                                <div class="img_remove" @click.stop="imgRemove('chartered')" v-if="charteredStatus == 1">
                                                    <span>&times;</span>
                                                </div>
                                            </div>
                                            <div class="card-upload-text">拍摄/上传店头图</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="card-upload-box" v-else>
                            <div class="card-upload-img-box">
                                <div class="card-upload-label">上传店头图</div>
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
                                        <div class="card-upload-text">拍摄/上传店头图</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </van-cell-group>
                </div>
            </div>

        </div>
        <!-- 步进按钮 -->
        <div class="user-info-button">
            <van-button @click="register" class="merbtn" type="danger" >提交</van-button>
        </div>


        <!-- <downAddress></downAddress> -->
        <!-- 选择城市 -->
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

        <div class="vantLoading" v-if="!lock || !vloadingShow">
            <vloading :vertical="false" text=""></vloading>
        </div>
    </div>
</template>

<script>
    import $ from 'jquery'
    import Vue from 'vue'
    import {is_wexin} from '../../assets/js/commonAPI.js'
    import {wxUpload,wxStart} from '../../assets/js/wxjs.js'
    import api from '../../assets/js/apiHeader.js'
    import 'font-awesome/css/font-awesome.css'
    import { Dialog,Actionsheet} from 'vant';
    import {acync} from '../../assets/js/acync.js';
    let wx_img='thumb';
    Vue.use(Dialog);

    import chartered from '../../assets/img/yinyezhizhao.png'
    
    const industryLable =  ()=>import("../../components/goodsClass/industryLable.vue");
    const vloading =  ()=>import("../vloading.vue");

    //引入微信上传js
    export default {
        data() {
            return {
                tag:'',                 //行业标签
                tagId:-1,              //行业标签ID
                mailbox:'',             //邮箱
                enterpriseName:'',      //企业名称
                addressInfo:'',         //公司地址
                address:'',             //公司下拉框
                fullName:'',            //负责人姓名
                fullPhone:'',            //负责人电话
                clerkPhone:'',            //业务员电话
                // businessLicenseNo:'',   //营业执照号
                imageUrl: '',           //图片地址
                val: 0,                 //控制显示
                imgURL:'',              //营业执照
                codeMsge:'发送验证码',
                canClick: true,         //添加canClick
                totalTime: 60,
                towItems:[],

                Verification:{
                    name:'',
                    password:'',
                    confirmPassword:'',
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
                PickerArealist:false,

                regionSn:'',        //地址region_sn
                
                is_weixin:is_wexin(),//判断微信
                chartered:chartered,//营业执照
                charteredStatus:0,//判断是否有上传营业执照 1 已上传 0未上传

                goodsClassShow:false,

                imgLock : 0,
                lock:true,
                vloadingShow:true,
                wxConfig: '',

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
            }
        },
        created(){
            if(is_wexin()){
                this.vloadingShow = false;
                wxStart(()=>{
                    this.vloadingShow = true;
                })
            }
            let code_sn = localStorage.getItem('getLocation');
            if(!this.$appFunc.prototype.isEmpty(localStorage.getItem('companyAddress'))){
                this.address = localStorage.getItem('companyAddress');
            }else if(!this.$appFunc.prototype.isEmpty(localStorage.getItem('getLocation'))){
                let addressCode = JSON.parse(code_sn);
                this.address = addressCode.province + addressCode.city + addressCode.district;
            }
            if(!this.$appFunc.prototype.isEmpty(localStorage.getItem('DetailAddress'))){
                this.addressInfo = localStorage.getItem('DetailAddress');
            }else if(!this.$appFunc.prototype.isEmpty(localStorage.getItem('getLocation'))){
                let addressCode = JSON.parse(code_sn);
                this.addressInfo = addressCode.street + addressCode.street_number;
            }
            if(!this.$appFunc.prototype.isEmpty(localStorage.getItem('regionSn'))){
                this.regionSn = localStorage.getItem('regionSn');
            }else if(!this.$appFunc.prototype.isEmpty(localStorage.getItem('getLocation'))){
                let addressCode = JSON.parse(code_sn);
                this.regionSn = addressCode.district_sn;
            }

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
            // _this=this
            
            // 公司地址下拉
            let acyncList = new acync();
            this.areaList = acyncList[0];
        },
        methods:{
            getSecondItems(){
                // 获取二级的内容
                let twoItem = localStorage.getItem('twoItem');
                const secondItems = JSON.parse(twoItem);
                if(secondItems){
                    this.tag = secondItems.label_name;
                    this.tagId = secondItems.label_id;
                }else{
                    this.tag="请选择行业类别"
                }
            },
            // 返回上一页
            goPreviousPage(){
                this.$router.push({
                    path:'/personal'
                });
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
            
            /* 图片上传 */
            wxSetUsenImge(imgType){
                let _this = this;
                if(_this.imgLock == 0){
                    _this.imgLock = 1;
                    wxUpload({},_this,imgType,['camera'],(res)=>{
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
            register(){
                let _this = this;
                if(this.tagId == -1){
                    this.Verification.tag = '请选择行业类别';
                    return
                }else if(this.enterpriseName == ''){
                    this.Verification.enterpriseName = '请输入企业名称';
                    return
                }else if(this.addressInfo == ''){
                    this.Verification.addressInfo = '请选择公司地址';
                    return
                }else if(this.address == ''){
                    this.Verification.address = '请选择公司地址';
                    return
                }else if(this.fullName == ''){
                    this.Verification.fullName = '请输入负责人名称';
                    return
                }else if(this.fullPhone == ''){
                    this.Verification.fullPhone = '请输入负责人手机号';
                    return
                }else if(this.fullPhone != ''){
                    if(!this.vtFullPhone()){
                        return false;
                    }
                }else if(this.clerkPhone != ''){
                    if(!this.vtClerkPhone()){
                        return false;
                    }
                }
                let attachments = "";

                if(this.charteredStatus == 1){
                    attachments = _this.chartered;
                }else {
                    this.$toast('请上传营业执照');
                    return
                }
                
                if(this.lock){
                    this.lock = false;
                    this.$post('/?c=user&a=group',{
                        label:_this.tagId,
                        // email:_this.mailbox,
                        enterprise_name :_this.enterpriseName,
                        region_sn:_this.regionSn,
                        address:_this.addressInfo,
                        // license_key:_this.businessLicenseNo,
                        attachments:attachments,
                        legal_person:_this.fullName,
                        mobile_phone:_this.fullPhone,
                        recommend_mobile:_this.clerkPhone,
                    }).then((res)=>{
                        switch(res.code){
                            case 0:
                                // _this.$toast(res.msg);
                                _this.$router.push({
                                    path:'/personal',
                                    query:{
                                        type:1,
                                    }
                                });
                                localStorage.removeItem('wechatToUpdateDate');
                                localStorage.removeItem('attachments')
                                this.lock = true;
                                break;
                            case 1:
                                this.lock = true;
                                _this.$toast(res.msg);
                                break;
                        }
                    }).catch(()=>{
                        this.lock = true;
                    })
                    setTimeout(()=>{
                        this.lock = true;
                    },20000);
                }else{
                    this.$toast("操作太频繁");
                }
                
            },

            //验证邮箱
            vtMailbox(){
                let reg = /^[a-zA-Z0-9]+[A-Za-z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
                if(this.mailbox == ''){
                    this.Verification.mailbox = '请输入邮箱';
                    return
                }else if(!reg.test(this.mailbox)){
                    this.Verification.mailbox = '请输入正确的邮箱';
                    return
                }else{
                    this.Verification.mailbox = ''
                }
            },
            //验证企业名称
            vtEnterpriseName(){
                if(this.enterpriseName == ''){
                    this.Verification.enterpriseName = '请输入企业名称';
                    return
                }else{
                    this.Verification.enterpriseName = ''

                    this.saveDate.enterpriseName = this.enterpriseName;
                    localStorage.setItem('wechatToUpdateDate',JSON.stringify(this.saveDate));
                }
            },
            //公司地址
            vtAddressInfo(){
                if(this.addressInfo == ''){
                    this.Verification.addressInfo = '请输入公司地址';
                    return
                }else{
                    this.Verification.addressInfo = ''
                    this.saveDate.addressInfo = this.addressInfo;
                    localStorage.setItem('wechatToUpdateDate',JSON.stringify(this.saveDate));
                }
            },
            //负责人名称
            vtFullName(){
                if(this.fullName == ''){
                    this.Verification.fullName = '请输入法人名称';
                    return
                }else{
                    this.Verification.fullName = ''
                    this.saveDate.fullName = this.fullName;
                    localStorage.setItem('wechatToUpdateDate',JSON.stringify(this.saveDate));
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
                }else if(!isPhone.test(this.clerkPhone)){
                    this.Verification.clerkPhone = '请输入正确的联系方式'
                    return false
                }else{
                    this.Verification.clerkPhone = ''
                    this.saveDate.clerkPhone = this.clerkPhone;
                    localStorage.setItem('wechatToUpdateDate',JSON.stringify(this.saveDate));
                }
            },

            //营业执照号
            // vtBusinessLicenseNo(){
            //     let reg = /^([159Y]{1})([1239]{1})([0-9]{6})([0-9ABCDEFGHJKLMNPQRTUWXY]{9})([0-9ABCDEFGHJKLMNPQRTUWXY]{1})$/;
            //     if(this.businessLicenseNo == ''){
            //         this.Verification.businessLicenseNo = '请输入营业执照号';
            //         return
            //     }else if(!reg.test(this.businessLicenseNo)){
            //         this.Verification.businessLicenseNo = '营业执照号效验错误，请输入正确的号码';
            //         return
            //     }else{
            //         this.Verification.businessLicenseNo = ''
            //     }
            // }


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
            vloading,
        },
    }
</script>
<style lang="less">
    .basic-info{
        background-color: unset;
        .van-field__label{
            max-width: 120px;
        }
    }
</style>
<style scoped>
    html,body{background-color: #f2f2f2;}
    .enterpriseName .van-field__label {
        max-width: 120px;
    }
    .enterpriseAddress .van-field__label {
        max-width: 120px;
    }
    .dflex{
        display: flex;
        justify-content: flex-start;
    }
/*  */
    .van-nav-bar .van-icon{
        color: #232323;
    }
    .user-info-button{
        height: 64px;
    }
    /* 注册信息样式 */

    .business-box{
        padding: 10px 15px;
        padding-left: 5px;
    }
    .business-licence{
        color: #323233;
        font-size: 14px;
    }
    .business-img{
        width: 100%;
        height: 10rem;
        border: 1px dashed #4b0;
        border-radius: .3rem;
    }
    .uploader-img{
        width: 100%;
        height: 100%;
    }


    .file{
        display: none;
    }
    .uploadStyle{
        width: 6rem;
        height: 2rem;
        line-height: 2rem;
        border-radius: .3rem;
        margin-left: 1.2rem;
        display: inline-block;
        border: 1px dotted #757575;
    }
    .uploadIcon,
    .uploadSuccess,
    .uploadError{
        margin: 0;
        font-size: 14px;
        text-align: center;
        width: 100%;
        height: 2rem;
        line-height: 2rem;
        color: #757575;
        display: inline-block;
    }
    .uploadSuccess{
        color: #44bb00;
    }
    .uploadError{
        color: #d83636;
    }
    .van-button--danger{
        background-color: #EE2D2D;
        border: 1px solid #EE2D2D;
    }
    .van-button--primary {
        color: #777;
        background-color: #fff;
        border: 1px solid #EE2D2D;
    }
    .must{
        font-size: 14px;
        color: #EE2D2D;
    }
</style>
<style lang="less" scoped>
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
    }

    .merbtn{
        width:95%;
        margin-left:2.5%;
        margin-top:30px;
        border-radius:5px;
    }

    .goodsClass-alert{
        position: fixed;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
        z-index: 5;
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
