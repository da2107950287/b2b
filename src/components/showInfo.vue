<template>
    <div class="showInfo">
        <!-- 创建收货地址标题 -->
        <van-nav-bar
            title="发票信息"
            class="nav-bar"
            @click-left="goPreviousPage"
        >
            <van-icon name="arrow-left" class="icon-style" slot="left" />
        </van-nav-bar>
        <div>
            <van-cell-group>
                <van-field
                    v-model="company_name"
                    label="发票抬头:"
                    disabled
                />
                <van-field
                    v-model="company_telephone"
                    label="公司电话:"
                    disabled
                    v-if="type == 2"
                />
                <van-field
                    v-model="company_address"
                    label="地址:"
                    disabled
                    v-if="type == 2"
                />
                <van-field
                    v-model="tax_id"
                    label="税号:"
                    disabled
                />
                <van-field
                    v-model="bank_of_deposit"
                    label="开户行:"
                    disabled
                    v-if="type == 2"
                />
                <van-field
                    v-model="bank_account"
                    label="银行账号:"
                    disabled
                    v-if="type == 2"
                />
                <van-field
                    v-model="invoiceText"
                    label="发票类型:"
                    disabled
                />
            </van-cell-group>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue';
    import {acync} from '../assets/js/acync.js';
    import {post} from '../assets/js/commonAPI.js';
    Vue.prototype.$post = post;
    export default {
        data() {
            return {
                company_name:'',                   //发票抬头
                tax_id:'',                         //税号
                company_address:'',                //公司地址
                company_telephone:'',                            //公司电话
                bank_of_deposit:'',                           //开户行
                bank_account:'',                   //银行账号
                radio:0,
                invoiceText:'',
                type:'',
            }
        },
        mounted(){
            let wapShowInfo = JSON.parse(localStorage.getItem('wapshowInfo'));
                this.company_name = wapShowInfo.company_name
                this.company_telephone = wapShowInfo.company_telephone
                this.company_address = wapShowInfo.company_address
                this.tax_id = wapShowInfo.tax_id
                this.bank_of_deposit = wapShowInfo.bank_of_deposit
                this.bank_account = wapShowInfo.bank_account
                if(wapShowInfo.invoice_type != 2){
                    this.type = 1;
                    this.invoiceText = '普票';
                }else{
                    this.type = 2;
                    this.invoiceText = '专票';
                }
        },
        methods:{
            goPreviousPage(){
                this.$router.go(-1);
            }
        }
    }
</script>
<style>
.showInfo .van-field__control:disabled{
    color: #666;
}
</style>

<style scoped>
    .icon-style{
        font-size: 22px;
        color: #333;
    }
</style>