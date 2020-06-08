<template>
	<div>
        <!-- 标题 -->
        <navbar type="left" title="银行账户" @clickleft="goPreviousPage"></navbar>
		
		<!-- 输入信息 -->
		<van-cell-group>
            <div class="checkbox">
                <div class="checkbox-label">账号类型：</div>
                <div class="checkbox-value" @click="changeAccountType($event)" v-if="is_edit">
                    <span :class="{'checked': bank_type === '1'}" data-v="1">私人账户</span><span :class="{'checked': bank_type === '2'}" data-v="2">对公账户</span>
                </div>
                <div class="checkbox-value" v-else> <!--显示信息时，只展示一个账户类型-->
                    <span v-if="bank_type === '1'" :class="{'checked': bank_type === '1'}" data-v="1">私人账户</span><span v-if="bank_type === '2'" :class="{'checked': bank_type === '2'}" data-v="2">对公账户</span>
                </div>
            </div>
		  	<van-field v-model="username" label="户名：" :disabled="!is_edit" placeholder="请输入持卡人姓名" :error-message="usernameErrMsg" clearable class="van-field-self" />
		  	<van-field v-model="bankName" label="所属银行：" :disabled="!is_edit" placeholder="请输入所属银行" :error-message="bankNameErrMsg" clearable class="van-field-self"/>
		  	<van-field v-model="bankCardNum" label="银行账号：" :disabled="!is_edit" placeholder="请输入银行账号" :error-message="bankCardNumErrMsg" clearable class="van-field-self" />
		  	<van-field v-model="bankCreate" label="开户行：" :disabled="!is_edit" placeholder="请输入账户开户行" :error-message="bankCreateErrMsg" clearable class="van-field-self" />
		</van-cell-group>

		<!-- 上传图片 -->
		<!-- <upload-single-box title="上传银行卡" notice="拍摄/上传银行卡正面照"></upload-single-box> -->

		<!-- 提交 -->
		<van-button v-if="is_edit" type="danger" class="merbtn" @click="submit">{{btnMsg}}</van-button>
        <van-popup @close="closePassWord" v-model="open" position="bottom" :style="{ height: '70%'}" style="border-radius: 15px 15px 0 0">
            <payPassWord class="cash-out" @yuePay="yuePay" @closePassWord="closePassWord" :no_psw="isSetPsw" :inputDisable="inputDisable"></payPassWord>
        </van-popup>

        
        <div v-if="inputDisable" class="vantLoading">
            <vloading :vertical="false" text=""></vloading>
        </div>
	</div>
</template>

<script>
import $ from 'jquery';
import Vue from 'vue'
import './reset.css'
import {post,appFunc} from '../../assets/js/commonAPI.js'
const navbar = () => import('../navbar/nav.vue');
const payPassWord =  ()=>import("../Cashier/payPassWord.vue");
const vloading =  ()=>import("../vloading.vue");
// const uploadSingleBox = () => import('../upload/uploadSingleBox.vue');

Vue.prototype.$post = post
export default {
	components:{
        navbar,
        payPassWord,
        vloading
		// uploadSingleBox
	},
	data(){
		return {
			username: '', //持卡人姓名
			bankName: '',  //所属银行
			bankCardNum: '', //银行账号
			bankCreate: '',  //开户行
            bank_type: '1', //1-私人账户  2-对公账户
            bankId: '', //银行卡id
            is_right: '1',  //0-账户信息错误/本地提交按钮显示 1-账户信息正常 
            is_edit: false,  //是否可编辑

			//错误提示
			usernameErrMsg: '',
			bankNameErrMsg: '',
			bankCardNumErrMsg: '',
			bankCreateErrMsg: '',

            //是否是修改银行卡信息, 用于提交判断
            isEdit: false,
            //提交按钮字体提示
            btnMsg: '提交',
            clock: 1, //阻止重复提交  1-未请求， 2-请求中

            
			show:'',
			innerHeight : innerHeight,
			open:false,
			inputDisable:false,
			isSetPsw:-1,    //  是否设置支付密码 0 未设置 1已设置 -1默认
		}
	},
    created(){
        //判断是否存在 this.$route.query.info，存在，则是修改银行卡信息，需要将相关信息填入
        let info = this.$route.query.info ? JSON.parse(this.$route.query.info) : null;
        
		this.$post('/?c=user&a=isSetPassWrod',{
		})
		.then((res)=>{
			switch(res.code){
				case 0:
					this.isSetPsw = res.data;
					break;
				case 1:
					// this.$toast(res.msg)
					break;
				default:
					break;
			}
		})

        //判断银行卡是否可编辑
        this.$post('/?c=user&a=withdrawalList',{
            page: 1,
            limit: 1,
            status: 0
        })
        .then((res)=>{
            if(res.code == 0) {
                this.is_edit = (res.data.list && res.data.list.length > 0) ? false : true;
            }
        })

        if(info) {
            this.username = info.account_name;
            this.bankName = info.bank_name;
            this.bankCardNum = info.account_number;
            this.bankCreate = info.bank_address;
            this.bank_type = info.bank_type;
            this.is_right = info.is_right;
            this.bankId = info.bank_id;
            this.isEdit = true;
        }else {
            //从钱包页 直接进入，则请求
            this.getBankInfo()
        } 
    },
	methods:{
        //####=>返回上一页
        goPreviousPage(){
            this.$router.push('/wallet');
        },
        //切换账户
        changeAccountType(ev) {
            if(!this.is_edit) {
                return
            }
            let target = ev.target;

            if(target.className === 'checked') {
                return
            }
            this.bank_type = target.getAttribute('data-v');
        },
        //获取银行卡信息
        getBankInfo(){
            if(this.clock == 2) {
                return
            }
            this.clock = 2;
            this.$post('/?c=user&a=bank',{})
            .then((res)=>{
                this.clock = 1;
                switch(res.code){
                    case 0:
                        //未绑定银行卡
                        if(!res.data) {
                            this.is_right = '0';
                        }else {
                            //已绑定银行卡，则跳转到提现页面
                            this.username = res.data.account_name;
                            this.bankCardNum = res.data.account_number;
                            this.bankName = res.data.bank_name;
                            this.bankCreate = res.data.bank_address;
                            this.bank_type = res.data.bank_type;
                            this.bankId = res.data.bank_id;
                            this.is_right = res.data.is_right;
                            this.isEdit = true;
                        }
                        this.isShow = true;
                        break;
                    case 1:
                        this.$toast(res.msg);
                        break;                    
                    default:
                        break;
                }
            }) 
        },
        //提交前， 检验相关项
        checkDate(arr){
        	let isErr = false;
        	for(var n in arr) {
                this[arr[n].name+'ErrMsg'] = '';
        		if(!isErr && !this[arr[n].name]) {
        			this[arr[n].name+'ErrMsg'] = arr[n].errmsg;
        			isErr = true;
        			continue;
        		}
        		this[arr[n].name+'ErrMsg'] = '';
        	}
        	return isErr;
        },

        //提交, 绑定银行卡
        submit(){
        	if(this.clock == 2) {
                return
            }

        	let isErr = this.checkDate([{
        		name: 'username',
        		errmsg: '请输入持卡人姓名'
        	}, {
        		name: 'bankName',
        		errmsg: '请输入所属银行',
        	},{
        		name: 'bankCardNum',
        		errmsg: '请输入银行账号'
        	},{
        		name: 'bankCreate',
        		errmsg: '请输入银行卡开户行'
        	}]);

        	if(isErr) return;

            //判断银行账号
            if(!/^[0-9a-zA-Z]+$/.test(this.bankCardNum)) {
                return this.bankCardNumErrMsg = '银行账号为非法字符';
            }
			this.openPayPassWord();
		},
		yuePay(password){
			
            this.btnMsg = '正在请求中...';
            this.clock = 2;

            let url = '/?c=user&a=addBank'; //提交请求接口
            let data ={
                account_name: this.username,
                bank_name: this.bankName,
                account_number: this.bankCardNum,
                bank_address: this.bankCreate,
                bank_type:this.bank_type,
                password:password
            };   //提交数据

            //当本页进行修改银行卡信息操作时，改变 请求接口地址 和 提交数据 的值
            if(this.isEdit) {
                url = '/?c=user&a=editBank';
                data.bank_id = this.bankId;
            }

			
			if(this.inputDisable == false){
                this.inputDisable = true;
                this.$post(url, data).then((res)=>{
                    this.clock = 1;
                    switch(res.code){
                        case 0:
                            //从提现 按钮进入，完成操作后，前往提现页面
                            if(this.$route.query.cashOutConfig) {
                                //绑卡成功， 到提现页
                                this.$router.push({path: '/cashOut', query:{amount: this.$route.query.amount, cashOutConfig: this.$route.query.cashOutConfig}});
                            }else {
                                //其他操作都返回钱包页
                                this.$router.push('/wallet');
                            }
                            this.inputDisable = false;
                            break;
                        case 1:
                            this.$toast(res.msg);
                            this.inputDisable = false;
                            break;                    
                        default:
                            this.$toast("系统错误，请刷新后重试！")
                            this.inputDisable = false;
                            break;
                    }
                    this.btnMsg = '提交';
                })
            }
            
		},
		/* yuePay(password){
			if(this.inputDisable == false){
				this.inputDisable = true;
				this.$post('/?c=user&a=checkPayPassWrod',{
					passWrod : password,
				})
				.then((res)=>{
					switch(res.code){
						case 0:
							this.yePay(res.data);
							break;
						case 1:
							this.$toast(res.msg);
							this.inputDisable = false;
							break;
						default:
                            this.$toast("系统错误，请刷新后重试！")
							break;
					}
				})
			}
		}, */
		closePassWord(){
			$('.contain').attr('style','');
			this.open = false;
		},
		openPayPassWord(){
			$('.contain').css({
				height:this.innerHeight,
			});
			this.open = true;
		},
	}
}
</script>
<style lang="less" scoped>
    .merbtn{
        width:95%;
        margin-left:2.5%;
        margin-top:1rem;
        border-radius:5px;
    }

    .checkbox {
        position: relative;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        width: 100%;
        overflow: hidden;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        color: #323233;
        font-size: 14px;
        line-height: 24px;
        background-color: #fff;
        padding: 10px 15px;
        .checkbox-label {
            max-width: 90px;
            -webkit-box-flex: 1;
            -ms-flex: 1;
            flex: 1;
        }
        .checkbox-value {
            -webkit-box-flex: 1;
            -ms-flex: 1;
            flex: 1;
            color: #969799;
            position: relative;
            vertical-align: middle;
            span {
                display: inline-block;
                padding: 2px 9px 0;
                color: #808080;
                border: 1px solid #808080;
                border-radius: 5px;
                &:first-child {
                    margin-right: 10px;
                }
                &.checked {
                    color: #ee2d2d;
                    border-color: #ee2d2d;
                }
            }
        }
    }
    .checkbox::after {
        content: ' ';
        position: absolute;
        pointer-events: none;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        left: 15px;
        right: 0;
        bottom: 0;
        -webkit-transform: scaleY(.5);
        transform: scaleY(.5);
        border-bottom: 1px solid #ebedf0;        
    }

    .vantLoading{
        margin-top: -20px;
        width: 100%;
        display: flex;
        position: fixed;
        z-index: 9999;
        height: 100%;
        top: 0;
        left: 0;
    }
</style>