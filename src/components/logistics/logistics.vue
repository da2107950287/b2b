<template>
    <div>
        <!-- tab -->
        <van-nav-bar
            left-arrow
            title='物流信息'
            @click-left='goPreviousPage'
        />
        <!-- 物流信息 -->
        <div class="express">
            <div class="express-number">{{ExpressName}}:&nbsp;{{ExpressNumber}}</div>
        </div>
        <van-steps direction="vertical" :active="0" active-color="#7ac49f">
            <van-step class="demo-steps" v-for="(item,index) in data" :key="index">
                <h3>{{item.info}}</h3>
                <p>{{item.time}}</p>
            </van-step>
        </van-steps>
    </div>
</template>

<script>
    import Vue from 'vue'
    import {post} from "../../assets/js/commonAPI.js"
    Vue.prototype.$post = post
    export default {
        data() {
            return {
                data:[],
                active:1,
                ExpressName:'',
                ExpressNumber:'',
            }
        },
        created(){
            //获取id
            this.$post('/?c=order&a=track',{
                order_sn : this.$route.query.id
            })
            .then((res)=>{
                switch(res.code){
                    case 0:
                        this.data = res.data.express_detail
                        this.ExpressNumber = res.data.track_number
                        this.ExpressName = res.data.express_name
                        break;
                    
                    default:
                        break;
                }
            })
        },
        methods:{
            //返回上一页
            goPreviousPage(){
                this.$router.go(-1);
            }
        }
    }
</script>

<style scoped>
.demo-steps p, .demo-steps h3 {
    margin: 0;
    font-size: inherit;
    font-weight: normal;
}
.express{
    font-size: 16px;
    color: #777;
    padding: .3rem 1rem;
}
</style>