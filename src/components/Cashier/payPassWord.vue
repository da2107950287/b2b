<template>
    <div>
        <div class="psw-title">请输入支付密码</div>
        <div class="pwdpush-box">
            <div class="phonenum-show" v-if="no_psw == 1">
                <div class="write-phonenum">
                    <ul class="write-input dflex">
                        <input type="tel" id="realInput" autocomplete="off" ref="input" maxlength="6" class="realInput" v-model="realInput" @keyup="getNum()"  @keydown="delNum()" :disabled="inputDisable">
                        <li v-for="(disInput,disIndex) in disInputs" :key="disIndex"><input type="password" maxlength="1" disabled  v-model="disInput.value"></li>
                    </ul>
                </div>
                <div class="fz_14 color_808080 forget_psw" @click="toSetPsw">忘记密码？</div>
            </div>
            <div class="dflex fz_16 toSetPsw" @click="toSetPsw" v-else>
                <div>你没有支付密码，</div>
                <div class="color_EE2D2D">去设置></div>
            </div>
        </div>
    </div>
</template>

<script>
    import $ from 'jquery';
    import "../../assets/css/commonstyle.css"
    
    const navbar =  ()=>import("./../navbar/nav.vue");

    export default {
        props:['no_psw','inputDisable'],
        data() {
            return{
                messagepacket:false,
                packets:[

                ],
                disInputs:[{value:''},{value:''},{value:''},{value:''},{value:''},{value:''}],
                realInput:'',
                pushShow:false,
            }
        },
        created(){
        },
        mounted(){
            if(this.no_psw == 1){
                let realInput = document.getElementById('realInput');
                realInput.focus();
            }
        },
        methods:{
            goPreviousPage(){
                this.$emit('closePassWord')
            },
            getNum(){
                for(var i=0;i<this.realInput.length;i++){
                    this.disInputs[i].value=this.realInput.charAt(i);
                    // 表示字符串中某个位置的数字，即字符在字符串中的下标。
                }
                if(this.realInput.length==6){
                    this.$emit('yuePay',this.realInput)
                    this.realInput = '';
                    this.disInputs = [{value:''},{value:''},{value:''},{value:''},{value:''},{value:''}];
                }
            },
            delNum(){
                var oEvent = window.event;
                if (oEvent.keyCode == 8) {
                    if(this.realInput.length>0){
                        this.disInputs[this.realInput.length-1].value=''
                    }
                }
            },
            toSetPsw(){
                this.$router.push({
                    path: '/cashPsw'
                })
            },
        },
        components:{
            navbar,
        },
    }
</script>

<style scoped lang="less">
.psw-title{
    margin: 0 auto;
    color: #323233;
    font-size: 16px;
    font-weight: 500;
    text-align: center;
    height: 46px;
    line-height: 46px;
    border-bottom: 1px solid #f8f8f8;
}
.pwdpush-box{
    margin-top: 20px;
}
.write-input{
    width: 92%;
    justify-content: space-between;
    position: relative;
    margin: auto;
    .realInput{
        width: 100%;
        height: 100%;
        opacity: 0;
        position: absolute;
        left: 0;
        top: 0;
    }
    li{
        flex: 1;
        border:1px solid #808080;
        border-right: 0;
        overflow: hidden;
        input{
            width: 100%;
            min-height: 2.51rem;
            border:0 solid #808080;
            border-right: 0;
            background-color: #fff;
            text-align: center;
            font-size: 20px;
        }
    }
    li:nth-child(2){
        border-radius: 5px 0 0 5px;
        input{
            // border-radius: 5px 0 0 5px;
        }
    }
    li:last-child{
        border-radius: 0 5px 5px 0;
        border-right: 1px solid #808080;
        input{
            // border-radius: 0 5px 5px 0;
            // border-right: 1px solid #808080;
        }
    }
}
.forget_psw{
    text-align: right;
    padding: 10px 12px;
}
.toSetPsw{
    justify-content: center;
}
</style>