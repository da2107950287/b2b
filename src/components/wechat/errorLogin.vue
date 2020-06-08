<template>
    <div class="loding">
        <img src="../../assets/img/lodingChange.png" alt="" class="lodingChangeImg">
        <div>
            <p class="lodingChangeP" >登录失败</p>
            <div class="refresh" @click="refresh">刷新</div>
        </div>
    </div>
</template>
<script>
import {is_wexin} from '../../assets/js/commonAPI'
export default {
    data(){
        return{
        }
    },
    created(){
    },
    methods:{
        refresh(){
            sessionStorage.removeItem('cl');
            if(is_wexin()){
                this.$router.push({
                    path:'/wechatLogin',
                })
            }else{
                this.$router.push({
                    path:'/login',
                })
            }
        },
    }
}
</script>
<style scoped>
.loding{
    display:flex;
    flex-direction: column;
    align-items: center;
    text-align:center;
}

.loding .lodingChangeImg{
    width: 9.5rem;
    margin-top: 6.5rem;
}
.loding .lodingChangeP{
    height: 17px;
    font-size: 17px;
    font-weight: 400;
    color: rgba(33,34,34,1);
    line-height: 40px;
    padding-bottom: 10px;
}

.lodingcontent{
    height: 0.7rem;
    font-size: .7rem;
    font-weight: 400;
    color: rgba(166,166,166,1);
    line-height: 2.1rem;
}

.refresh{
    font-size: .75rem;
    border: 1px solid #ee2d2d;
    color: #ee2d2d;
    width: 60px;
    height: 24px;
    border-radius: 5px;
    line-height: 24px;
    margin: auto;
}
</style>

