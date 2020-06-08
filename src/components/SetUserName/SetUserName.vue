<template>
    <div>
        <!-- tab -->
        <van-nav-bar
            title='修改昵称'
            left-arrow
            class="company-profile-bar"
            @click-left='goPreviousPage'
            right-text="确定"
            @click-right='setUserName'
        />
        <!-- 内容 -->
        <div class="userName-title-box">
            <div class="userName-title">修改昵称</div>
            <van-cell-group>
                <van-field v-model="userName" placeholder="请输入昵称" />
            </van-cell-group>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue'
    import {post,is_wexin} from '../../assets/js/commonAPI.js'
    Vue.prototype.$post = post;
    export default {
        data() {
            return {
               userName:'',
               head:'',
            }
        },
        methods:{
            //返回上一页
            goPreviousPage(){
                this.$router.go(-1);
            },
            //修改昵称
            setUserName(){
                this.$parent.$refs.loading.style.display = 'flex'
                this.$post('/?c=user&a=editInfo',{
                    nick_name:this.userName
                })
                .then((res)=>{
                    this.$parent.$refs.loading.style.display = 'none'
                    switch(res.code){
                        case 0:
                            alert('修改成功!');
                            this.$taost(res.msg);
                            break;
                        ;
                        default:
                            break;
                    }
                })
            }
        }
    }
</script>

<style scoped>
    .userName-title-box{
        padding-top: .5rem;
    }
    .userName-title{
        font-size: 14px;
        color: #777;
        line-height: 1.5rem;
        padding: 0 1rem;
    }
    .file{
        display: none;
    }
</style>