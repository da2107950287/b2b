<template>
    <div>
        <van-nav-bar
            title="审核确认"
            left-arrow
            @click-left="onClickLeft"
        />
        
        <div class="fea">
                <img src="../../assets/img/shengheshinao.png" alt="" class="secimg">
                <div class="secTitle">未通过OA审核</div>
                <div class="secText">您的资料未通过OA审核，请您与您的招商人员联系之后再确认提交！</div>
                <!-- <van-checkbox disabled="" class="feaCheckbox"><div ><span>同意</span>《代运营流程条款》</div></van-checkbox> -->
                <van-checkbox disabled="" class="feaCheckbox"><div ><span>同意</span>《优惠流程条款》</div></van-checkbox>
                <!-- <van-checkbox disabled="" class="feaCheckbox"><div ><span>同意</span>《隐私条约》</div></van-checkbox> -->
                <div class="secBtnBox">
                    <button disabled="true" class="secBtn">确认提交</button>
                </div>
            </div>
    </div>
</template>
<script>
import '../../assets/css/resetiu.css'
export default {
    data(){
        return{
            
        }
    },
    created(){
    },
    methods:{
        onClickLeft(){
            this.$router.push({
               path:'/personal'
            })
        }
    }
}
</script>
<style scoped>
</style>


