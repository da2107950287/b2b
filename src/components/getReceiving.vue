<template>
    <div class="receiving">
        <!-- 创建收货地址标题 -->
        <navbar type="both" :title="title" rightTxt="删除" @clickleft="goPreviousPage" @clickRight="onClose" v-if="type == 'edit'"></navbar>
        <navbar type="left" :title="title" @clickleft="goPreviousPage" v-else></navbar>

        <!-- 地址信息 -->
        <div class="addInfo">
            <van-cell-group>
                <van-field
                    v-model="contacts"
                    clearable
                    label="收货人："
                    placeholder="请输入用户名"
                    :error-message="Verification.contacts"
                    @blur="vtContacts"
                />
                <van-field
                    v-model="phone"
                    clearable
                    label="手机号："
                    placeholder="请输入联系人电话"
                    :error-message="Verification.phone"
                    @blur="vtPhone"

                />
                <div @click="Address">
                    <van-field
                        v-model="address"
                        clearable
                        readonly
                        label="地区："
                        placeholder="请选择省/市/区"
                    />
                </div>
                <van-field
                    v-model="detailedAddress"
                    clearable
                    label="详细地址："
                    placeholder="请输入详细地址"
                    :error-message="Verification.detailedAddress"
                    @blur="vtDetailedAddress"
                />
            </van-cell-group>
        </div>
        <div class="addButton">
            <van-button type="danger" size="large" v-if="type == 'add'" @click="submitAddInfo">提交</van-button>
            <van-button type="danger" size="large" v-if="type == 'edit'" @click="submiteditAddress">提交</van-button>
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
    </div>
</template>

<script>
    import Vue from 'vue';
    import $ from 'jquery';
    import {Dialog} from 'vant';
    import {acync} from '../assets/js/acync.js';

    const navbar = ()=>import("./navbar/nav.vue");
    Vue.use(Dialog)
    export default {
        data() {
            return {
                contacts:'',                            //####=>联系人
                phone:'',                               //####=>联系人电话
                addressName:'',                         //####=>收货地址简称
                regionSn:'',                            //####=>最小区域单位
                title:'创建收货地址',


                address:'',                             //####=>省/市/区
                detailedAddress:'',                     //####=>详细地址
                areaList:[],
                isShowPickerArealist:false,
                index:0,
                checked:false,
                type:'add',                             //判断添加/修改地址 add 添加 edit 修改
                address_id:'',

                Verification:{
                    detailedAddress:'',
                    phone:'',
                    contacts:'',
                },

                lock:true,
            }
        },
        mounted(){
            let type = this.$route.query.type;

            if(type == 'edit'){
                let wapItem = localStorage.getItem('wapItem');
                wapItem = JSON.parse(wapItem);
                
                let full_address = wapItem.full_address;
                let address = wapItem.address;
                let strPos = full_address.indexOf(address);

                this.address = full_address.substr(0,strPos);
                this.address_id = wapItem.address_id;
                this.detailedAddress = wapItem.address;
                
                this.contacts = wapItem.consignee;
                this.phone = wapItem.mobile;
                this.regionSn = wapItem.district;
                this.addressName = wapItem.address_name;

                
                this.title = '修改收货地址'
                this.type = 'edit';
            }else{
                this.type = 'add';
            }
            
            let acyncList = new acync();
            this.areaList = acyncList[0];
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
                this.regionSn = value[2].code;
                this.address = add;
                this.isShowPickerArealist = false;
            },
            checkedClock(){
                if(this.checked == true){
                    this.checked = true;
                }else{
                    this.checked = false;
                }
            },
            submitAddInfo(){
                if(this.contacts == ''){
                    this.Verification.contacts = '请输入用户名';
                    return false;
                }
                if(this.phone == ''){
                    this.Verification.phone = '请输入联系电话';
                    return false;
                }
                if(this.phone != ''){
                    if(!this.vtPhone()){
                        return false
                    }
                }
                if(this.detailedAddress == ''){
                    this.Verification.detailedAddress = '详细地址不能为空';
                    return false;
                }
                if(this.address == ''){
                    this.$toast('请选择地区');
                    return false;
                }

                if(this.lock){
                    this.lock = false;
                    this.$parent.$refs.loading.style.display = "flex";
                    this.$post('/?c=user&a=addIntoMyAddress',{
                        contact_name:this.contacts,
                        contact_phone:this.phone,
                        consignee_address:this.detailedAddress,
                        region_sn:this.regionSn,
                        title:this.addressName
                    })
                    .then((res)=>{
                        this.$parent.$refs.loading.style.display = "none";
                        switch(res.code){
                            case 0:
                                this.$toast('添加成功');
                                this.$router.go(-1);
                                this.lock = true;
                                break;
                            case 1:
                                this.$toast(res.msg);
                                this.lock = true;
                                break;
                        }
                    })
                }else{
                    this.$toast("操作频繁");
                }
                
            },
            submiteditAddress(){
                if(this.contacts == ''){
                    this.Verification.contacts = '请输入用户名';
                    return false;
                }
                if(this.phone == ''){
                    this.Verification.phone = '请输入联系电话';
                    return false;
                }
                if(this.phone != ''){
                    if(!this.vtPhone()){
                        return false
                    }
                }
                if(this.detailedAddress == ''){
                    this.Verification.detailedAddress = '详细地址不能为空';
                    return false;
                }
                if(this.address == ''){
                    this.$toast('请选择地区');
                    return false;
                }
                if(this.lock){
                    this.lock = false;
                    this.$parent.$refs.loading.style.display = "flex";
                    this.$post('/?c=user&a=editAddress',{
                        contact_name:this.contacts,
                        contact_phone:this.phone,
                        consignee_address:this.detailedAddress,
                        region_sn:this.regionSn,
                        title:this.addressName,
                        address_id:this.address_id,
                    })
                    .then((res)=>{
                        this.$parent.$refs.loading.style.display = "none";
                        switch(res.code){
                            case 0:
                                this.$toast('修改成功!');
                                this.$router.go(-1);
                                this.lock = true;
                                break;
                            case 1:
                                this.lock = true;
                                this.$toast(res.msg);
                                break;
                        }
                    })
                }else{
                    this.$toast("操作频繁");
                }
            },
            onClose(item) {
                Dialog.confirm({
                    title: '删除',
                    message: '确定要删除吗？'
                }).then(() => {
                    // on confirm
                    this.$parent.$refs.loading.style.display = "flex";

                    this.$post('/?c=user&a=delAddress',{
                        address_id:this.address_id
                    })
                    .then((res)=>{
                        this.$parent.$refs.loading.style.display = "none";
                        switch(res.code){
                            case 0:
                                this.$toast('删除成功!');
                                this.$router.go(-1);
                                break;
                            default:
                                this.$toast('删除失败!');
                                break;
                        }
                    })
                }).catch(() => {
                // on cancel
                });
            },
            vtContacts(){
                if(this.contacts == ''){
                    this.Verification.contacts = '请输入用户名'
                    return false
                }else{
                    this.Verification.contacts = ''
                }
            },
            vtPhone(){
                if(this.phone == ''){
                    this.Verification.phone = '请输入联系电话'
                    return false
                }else if(!this.$appFunc.prototype.isPhone(this.phone)){
                    this.Verification.phone = '请输入正确的手机号码'
                    return false
                }else{
                    this.Verification.phone = ''
                    return true;
                }
            },
            vtDetailedAddress(){
                if(this.detailedAddress == ''){
                    this.Verification.detailedAddress = '详细地址不能为空'
                    return false
                }else{
                    this.Verification.detailedAddress = ''
                }
            },
        },
        created(){
        },
        components:{
            navbar,
        }
    }
</script>
<style>
    .receiving .van-nav-bar__text{
        color: #333;
    }
</style>

<style scoped>
    .dflex{display: flex;justify-content: flex-start;}
    .nav-bar{
        border-bottom: 1px solid #eee;
    }
    .icon-style{
        font-size: 22px;
        color: #333;
    }
    .van-cell{
        border-bottom: 1px solid #f2f2f2;
    }
    .van-cell:not(:last-child)::after{
        border-bottom: none;
    }
    .addButton{
        width: 17.65rem;
        margin: 30px auto;
        border-radius: 5px;
        overflow: hidden;
    }
    .addButton button{
        height: 44px;
        line-height: 42px;
    }
</style>