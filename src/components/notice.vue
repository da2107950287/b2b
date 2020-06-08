<template>
    <div >
      <van-notice-bar v-if="notice!='' || timeSlot!=''" class="notice-bar" color="#fff" background="#ffb912" :left-icon="noticeImg">
         <span v-if="timeSlot!=''">&emsp;&emsp;&emsp;{{timeSlot}}&emsp;&emsp;&emsp;</span>
         <span>{{notice}}</span>
      </van-notice-bar>
    </div>
</template>

<script>
import noticeImg from '../assets/img/notice.png';
export default {
    props:['timeSlot'],
    data(){
        return {
            notice:'',
            noticeImg:noticeImg,
        }
    },
    created(){
        this.$cacheStorage(
            'notice',
            '/?c=user&a=notice',
            'session',
            {},
            ((res)=>{
                if(res.code == 0){
                    this.notice = res.data.notice;
                    if(res.data.notice == ""){
                        this.$emit('isNotice',false);
                    }else{
                        this.$emit('isNotice',true);
                    }
                }
            }),
        )
    },
}
</script>
<style lang="less">
.notice-bar{
    .van-notice-bar__wrap{
        margin-left: 15px;
    }
}
</style>
<style lang="less" scoped>
.notice-bar{
    width: 100%;
    height: 40px;
    top: 0;
}
</style>