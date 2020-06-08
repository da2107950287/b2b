<template>
    <div class="getinvoiceinfo">
        <!-- 创建收货地址标题 -->
        <van-nav-bar
            title="创建发票信息"
            class="nav-bar"
            @click-left="goPreviousPage"
        >
            <van-icon name="arrow-left" class="icon-style" slot="left" />
        </van-nav-bar>
        <!-- 地址信息 -->
        <div class="addInfo">
            <van-radio-group v-model="radio">
                <van-row class="radioBox">
                    <van-col span='6'>
                        <span class="van-cell__title"><i class="van-cell-- "></i>发票类型</span>
                    </van-col>
                    <van-col span='9'>
                        <van-radio name="1">普票</van-radio>
                    </van-col>
                    <van-col span='9'>
                        <van-radio name="2">专票</van-radio>
                    </van-col>
                </van-row>
            </van-radio-group>
            <van-cell-group>
                <van-field
                    v-show="radio >= '1'"
                    v-model="company_name"
                    clearable
                    label="公司名称："
                    placeholder="请输入发票抬头"
                    :error-message="errorMsg.company_name"
                    @change="validateName(company_name)"
                />
                <van-field
                    v-show="radio >= '1'"
                    v-model="tax_id"
                    clearable
                    label="纳税识别号："
                    placeholder="请输入纳税识别号"
                    :error-message="errorMsg.tax_id"
                />
                <van-field
                    v-show="radio === '2'"
                    v-model="detailedAddress"
                    type="textarea"
                    rows="1"
                    autosize
                    clearable
                    label="详细地址："
                    placeholder="请输入详细地址"
                    :error-message="errorMsg.infoAdd"
                />
                <van-field
                    v-show="radio === '2'"
                    v-model="Tel"
                    clearable
                    label="公司电话："
                    placeholder="请输入号码"
                    :error-message="errorMsg.Tel"
                    @change="validateTel(Tel)"
                />
                <van-field
                    v-show="radio === '2'"
                    v-model="bank"
                    clearable
                    label="开户行："
                    placeholder="请输入开户行"
                    :error-message="errorMsg.bank"
                />
                <van-field
                    v-show="radio === '2'"
                    v-model="bank_account"
                    clearable
                    label="银行账号："
                    placeholder="请输入账号"
                    :error-message="errorMsg.bank_account"
                />
            </van-cell-group>
        </div>
        <div class="addButton">
            <van-button type="danger" size="large" @click="submitAddInfo">确定</van-button>
        </div>
        <!-- 选择城市 -->
        <van-actionsheet v-model="isShowPickerArealist">
            <van-area 
                :area-list="areaList" 
                @cancel="addCancel" 
                @confirm="addConfirm" 
                :columns-num="3" 
                title="所在城市" 
            />
        </van-actionsheet>
    </div>
</template>

<script>
    import Vue from 'vue';
    import {acync} from '../assets/js/acync.js';
    export default {
        data() {
            return {
                company_name:'',                   //发票抬头
                tax_id:'',                         //税号
                company_address:'',                //公司地址
                Tel:'',                            //公司电话
                bank:'',                           //开户行
                bank_account:'',                   //银行账号
                radio:'1',
                orderid:'',                        //提交订单的时候新增发票

                address:'',                             //省/市/区
                detailedAddress:'',                     //详细地址
                areaList:[],
                isShowPickerArealist:false,
                errorMsg:{
                    company_name:'',
                    Tel:'',
                    add:'',
                    infoAdd:'',
                    tax_id:'',
                    bank:'',
                    bank_account:''
                }
            }
        },
        created(){
            let acyncList = new acync();
            this.areaList = acyncList[0];
            this.orderid=this.$route.query.id
        },
        mounted(){
        },
        methods:{
            goPreviousPage(){
                this.$router.go(-1);
            },
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
                this.regionSn = value[2].code + '00';
                this.address = add;
                this.isShowPickerArealist = false;
            },
            submitAddInfo(){
                if(this.radio === '0'){
                    this.$toast('请选择发票类型');
                    return;
                }
                if(this.radio === '1'){
                    if(this.company_name == ''){
                        this.errorMsg.company_name = '请输入发票抬头';
                        return;
                    }else{
                        this.errorMsg.company_name = '';
                    }
                    if(this.tax_id == ''){
                        this.errorMsg.tax_id = '请输入开票税号';
                        return;
                    }else{
                        this.errorMsg.tax_id='';
                    }
                }else{
                    if(this.company_name == ''){
                        this.errorMsg.company_name = '请输入发票抬头';
                        return;
                    }else{
                        this.errorMsg.company_name = '';
                    }

                    if(this.tax_id == ''){
                        this.errorMsg.tax_id = '请输入开票税号';
                        return;
                    }else{
                        this.errorMsg.tax_id='';
                    }

                    if(this.detailedAddress == ''){
                        this.errorMsg.infoAdd = '请输入详细地址';
                        return;
                    }else{
                        this.errorMsg.infoAdd = '';
                    }
                    
                    if(this.Tel == ''){
                        this.errorMsg.Tel = '请输入电话号码';
                        return;
                    }else{
                        this.errorMsg.Tel = '';
                    }
                    const myreg = /^(0\d{2,3}\d{7,8})|(1\d{10})$/;
                    if(!myreg.test(this.Tel)){
                        this.errorMsg.Tel = '请输入正确电话号码';
                        return;
                    }

                    if(this.bank == ''){
                        this.errorMsg.bank = '请输入开户行名称';
                        return;
                    }else{
                        this.errorMsg.bank = '';
                    }
                    if(this.bank_account == ''){
                        this.errorMsg.bank_account = '请输入银行账号';
                        return;
                    }else{
                        this.errorMsg.bank_account = '';
                    }

                }

                this.$parent.$refs.loading.style.display = 'flex'
                this.$post('/?c=user&a=addInvoice',{
                    company_name: this.company_name,                                    //发票抬头
                    tax_id: this.tax_id,                                                //税号
                    company_address: this.detailedAddress,                 //公司地址
                    tel: this.Tel,                                                      //公司电话
                    bank: this.bank,                                                    //开户行
                    bank_account: this.bank_account,                                    //银行账号
                    type: this.radio,
                })
                .then((res)=>{
                    this.$parent.$refs.loading.style.display = 'none'
                    switch(res.code){
                        case 0:
                            this.$toast('添加成功');
                            console.log(this.orderid)
                            // 1-来自普通确认订单页 3-来自团购活动确认订单页
                            if(this.orderid==1 || this.orderid==3){
                                sessionStorage.setItem('wap-val',JSON.stringify({checked:true,radio:1}))
                                
                                this.$router.push({
                                    path:'/invoiceInfo',
                                    query:{
                                        id:this.orderid
                                    }
                                });  
                            }else if(this.orderid == 2){
                                this.$router.push({
                                    path:'/invoiceInfo',
                                    query:{
                                        id:this.orderid
                                    }
                                });
                            }else{
                                this.$router.go(-1)
                            }
                            
                            break;
                        
                        default:
                            this.$toast(res.msg);
                            break;
                    }
                })
            },
            //验证发票抬头
            validateName(company_name){
                
            },
            //验证公司电话
            validateTel(Tel){
                const myreg = /^(0\d{2,3}\d{7,8})|(1\d{10})$/;
                if(!myreg.test(Tel)){
                    this.errorMsg.Tel = '请输入正确的号码!';
                    return;
                }else{
                    this.errorMsg.Tel = '';
                }
            }
        },
        
    }
</script>
<style>
    .getinvoiceinfo .van-radio__icon--checked .van-icon{
        border-color: #EE2D2D;
        background-color: #EE2D2D;
    }
</style>

<style scoped>
    .nav-bar{
        border-bottom: 1px solid #eee;
    }
    .icon-style{
        font-size: 22px;
        color: #333;
    }
    .addInfo{
        margin: 0 0 .6rem;
        border-radius: 5px;
        background-color: #fff;
        overflow: hidden;
    }
    .addButton{
        margin: 30px auto;
        border-radius: 5px;
        overflow: hidden;
        width: 17.65rem;
    }
    .radioBox{
        font-size: 14px;
        padding: 10px 15px;
    }
</style>