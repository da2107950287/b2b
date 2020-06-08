<template>
    <div>
        <!-- 创建收货地址标题 -->
        <van-nav-bar
            :title="title"
        />
        <!-- 地址信息 -->
        <div class="addInfo">
            <van-cell-group>
                <van-field
                    v-model="contacts"
                    required
                    clearable
                    label="联系人"
                    placeholder="请输入用户名"
                />
                <van-field
                    v-model="phone"
                    required
                    clearable
                    label="手机号"
                    placeholder="请输入联系人电话"
                />
                <div @click="Address">
                    <van-field
                        v-model="address"
                        required
                        clearable
                        disabled
                        label="地区"
                        placeholder="请选择省/市/区"
                    />
                </div>
                <van-field
                    v-model="detailedAddress"
                    required
                    clearable
                    label="详细地址"
                    placeholder="街道门牌、楼层房间号"
                />
                <van-field
                    v-model="addressName"
                    required
                    clearable
                    label="地址信息备注"
                    placeholder="家、公司"
                />
            </van-cell-group>
        </div>
        <div class="addButton">
            <van-button type="danger" size="large" @click="submiteditAddress">修改</van-button>
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
    import {acync} from '../../assets/js/acync.js';
    import {post} from '../../assets/js/commonAPI.js';
    Vue.prototype.$post = post;
    export default {
        data() {
            return {
                contacts:'',                            //####=>联系人
                phone:'',                               //####=>联系人电话
                addressName:'',                         //####=>收货地址简称
                regionSn:'',                            //####=>最小区域单位
                title:'修改收货地址',

                address_id:0,
                address:'',                             //####=>省/市/区
                detailedAddress:'',                     //####=>详细地址
                areaList:[],
                isShowPickerArealist:false,
            }
        },
        created(){
            let acyncList = new acync();
                this.areaList = acyncList[0];
            const wapItem = JSON.parse(localStorage.getItem('wapItem'));
            this.contacts = wapItem.consignee;
            this.phone = wapItem.mobile;
            this.detailedAddress = wapItem.address;
            var result=wapItem.full_address;
            // this.address = wapItem.full_address
            var i = result.indexOf(this.detailedAddress);
            this.address = result.substr(0,i);
            

            this.addressName = wapItem.address_name;
            this.address_id = wapItem.address_id
        },
        methods:{
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
            submiteditAddress(){
                this.$post('/?c=user&a=editAddress',{
                    contact_name:this.contacts,
                    contact_phone:this.phone,
                    consignee_address:this.detailedAddress,
                    region_sn:this.regionSn,
                    title:this.addressName,
                    address_id:this.address_id,
                })
                .then((res)=>{
                    switch(res.code){
                        case 0:
                            this.$toast('修改成功!');
                            this.$router.go(-1);
                            break;
                        default:
                            this.$toast(res.msg);
                            break;
                    }
                })
            },
        }
    }
</script>

<style scoped>
    .nav-bar{
        border-bottom: 1px solid #eee;
    }
    .icon-style{
        font-size: 22px;
    }
    .addInfo,
    .addButton{
        padding: .6rem;
    }
</style>