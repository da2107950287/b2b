<template>
    <!-- 选择城市 -->
        <van-actionsheet v-model="PickerArealist">
            <van-area 
                :area-list="areaList" 
                @cancel="addCancel" 
                @confirm="addConfirm" 
                :columns-num="3" 
                title="所在城市" 
            />
        </van-actionsheet>
</template>
<script>
import $ from 'jquery'
import Vue from 'vue'
import { Dialog,Actionsheet} from 'vant';
import {acync} from '../../assets/js/acync.js';
export default {
    data(){
        return{
           PickerArealist:false,
        }
    },
    created(){
         // 公司地址下拉
            let acyncList = new acync();
            this.areaList = acyncList[0];
       
    },
    methods:{
        addCancel(){
                this.PickerArealist = false;
            },
        addConfirm(value){
                let add='';
                for(let i=0; i<value.length; i++){
                    add += value[i].name;
                }
                this.regionSn = value[2].code;
                this.address = add;
                this.PickerArealist = false;
            },    
    }
}
</script>
<style scoped>

</style>
