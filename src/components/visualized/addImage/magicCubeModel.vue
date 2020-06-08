<template>
    <div>
        <div class="magic-cube-model-dom" :class="{'isChangeFalse':!isChange}">
            <div class="operation-attr" >
                <template v-if="active == 0">
                    <div class="dflex flex-start magic-cube-model-box1">
                        <div class="magic-cube-model-row ">
                            <a :href="list[0].link != ''?list[0].link:'javascript:;'">
                                <img class="magic-cube-img" v-if="list[0].img" error="../../../assets/img/no_picture.gif" v-lazy="list[0].img" alt="">
                            </a>
                        </div>
                        <div class="magic-cube-model-row" >
                            <a :href="list[1].link != ''?list[1].link:'javascript:;'">
                                <img class="magic-cube-img" v-if="list[1].img" error="../../../assets/img/no_picture.gif" v-lazy="list[1].img" alt="">
                            </a>
                        </div>
                    </div>
                </template>
                <template v-else-if="active == 1">
                    <div class="dflex flex-start magic-cube-model-box2">
                        <div class="magic-cube-model-row ">
                            <a :href="list[0].link != ''?list[0].link:'javascript:;'">
                                <img class="magic-cube-img" v-if="list[0].img" error="../../../assets/img/no_picture.gif" v-lazy="list[0].img" alt="">
                            </a>
                        </div>
                        <div class="magic-cube-model-row" >
                            <a :href="list[1].link != ''?list[1].link:'javascript:;'">
                                <img class="magic-cube-img" v-if="list[1].img" error="../../../assets/img/no_picture.gif" v-lazy="list[1].img" alt="">
                            </a>
                        </div>
                        <div class="magic-cube-model-row" >
                            <a :href="list[2].link != ''?list[2].link:'javascript:;'">
                                <img class="magic-cube-img" v-if="list[2].img" error="../../../assets/img/no_picture.gif" v-lazy="list[2].img" alt="">
                            </a>
                        </div>
                    </div>
                </template>
                <template v-else-if="active == 2">
                    <div class="dflex flex-start magic-cube-model-box3">
                        <div class="magic-cube-model-row">
                            <a :href="list[0].link != ''?list[0].link:'javascript:;'">
                                <img class="magic-cube-img" v-if="list[0].img" error="../../../assets/img/no_picture.gif" v-lazy="list[0].img" alt="">
                            </a>
                        </div>
                        <div class="magic-cube-model-row" >
                            <a :href="list[1].link != ''?list[1].link:'javascript:;'">
                                <img class="magic-cube-img" v-if="list[1].img" error="../../../assets/img/no_picture.gif" v-lazy="list[1].img" alt="">
                            </a>
                        </div>
                        <div class="magic-cube-model-row" >
                            <a :href="list[2].link != ''?list[2].link:'javascript:;'">
                                <img class="magic-cube-img" v-if="list[2].img" error="../../../assets/img/no_picture.gif" v-lazy="list[2].img" alt="">
                            </a>
                        </div>
                        <div class="magic-cube-model-row" >
                            <a :href="list[3].link != ''?list[3].link:'javascript:;'">
                                <img class="magic-cube-img" v-if="list[3].img" error="../../../assets/img/no_picture.gif" v-lazy="list[3].img" alt="">
                            </a>
                        </div>
                    </div>
                </template>
                <template v-else-if="active == 3">
                    <div class="magic-cube-model-box4 dflex flex-start left-right-dom">
                        <div class="magic-cube-model">
                            <div class="magic-cube-model-row">
                                <a :href="list[0].link != ''?list[0].link:'javascript:;'">
                                    <img class="magic-cube-img" v-if="list[0].img" error="../../../assets/img/no_picture.gif" v-lazy="list[0].img" alt="">
                                </a>
                            </div>
                            <div class="magic-cube-model-row" >
                                <a :href="list[1].link != ''?list[1].link:'javascript:;'">
                                    <img class="magic-cube-img" v-if="list[1].img" error="../../../assets/img/no_picture.gif" v-lazy="list[1].img" alt="">
                                </a>
                            </div>
                        </div>
                        <div class="magic-cube-model">
                            <div class="magic-cube-model-row" >
                                <a :href="list[2].link != ''?list[2].link:'javascript:;'">
                                    <img class="magic-cube-img" v-if="list[2].img" error="../../../assets/img/no_picture.gif" v-lazy="list[2].img" alt="">
                                </a>
                            </div>
                            <div class="magic-cube-model-row" >
                                <a :href="list[3].link != ''?list[3].link:'javascript:;'">
                                    <img class="magic-cube-img" v-if="list[3].img" error="../../../assets/img/no_picture.gif" v-lazy="list[3].img" alt="">
                                </a>
                            </div>
                        </div>
                    </div>
                </template>
                <template v-else-if="active == 4">
                    <div class="dflex flex-start magic-cube-model-box5 left-right-dom">
                        <div class="magic-cube-model">
                            <div class="magic-cube-model-row">
                                <a :href="list[0].link != ''?list[0].link:'javascript:;'">
                                    <img class="magic-cube-img" v-if="list[0].img" error="../../../assets/img/no_picture.gif" v-lazy="list[0].img" alt="">
                                </a>
                            </div>
                        </div>
                        <div class="magic-cube-model">
                            <div class="magic-cube-model-row" >
                                <a :href="list[1].link != ''?list[1].link:'javascript:;'">
                                    <img class="magic-cube-img" v-if="list[1].img" error="../../../assets/img/no_picture.gif" v-lazy="list[1].img" alt="">
                                </a>
                            </div>
                            <div class="magic-cube-model-row" >
                                <a :href="list[2].link != ''?list[2].link:'javascript:;'">
                                    <img class="magic-cube-img" v-if="list[2].img" error="../../../assets/img/no_picture.gif" v-lazy="list[2].img" alt="">
                                </a>
                            </div>
                        </div>
                    </div>
                </template>
                <template v-else-if="active == 5">
                    <div class="dflex flex-start magic-cube-model-box6 left-right-dom">
                        <div class="magic-cube-model">
                            <div class="magic-cube-model-row">
                                <a :href="list[0].link != ''?list[0].link:'javascript:;'">
                                    <img class="magic-cube-img" v-if="list[0].img" error="../../../assets/img/no_picture.gif" v-lazy="list[0].img" alt="">
                                </a>
                            </div>
                            <div class="magic-cube-model-row" >
                                <a :href="list[1].link != ''?list[1].link:'javascript:;'">
                                    <img class="magic-cube-img" v-if="list[1].img" error="../../../assets/img/no_picture.gif" v-lazy="list[1].img" alt="">
                                </a>
                            </div>
                        </div>
                        <div class="magic-cube-model">
                            <div class="magic-cube-model-row" >
                                <a :href="list[2].link != ''?list[2].link:'javascript:;'">
                                    <img class="magic-cube-img" v-if="list[2].img" error="../../../assets/img/no_picture.gif" v-lazy="list[2].img" alt="">
                                </a>
                            </div>
                        </div>
                    </div>
                </template>
                <template v-else-if="active == 6">
                    <div class="magic-cube-model-box7 top-bottom-dom">
                        <div class="magic-cube-model">
                            <div class="magic-cube-model-row">
                                <a :href="list[0].link != ''?list[0].link:'javascript:;'">
                                    <img class="magic-cube-img" v-if="list[0].img" error="../../../assets/img/no_picture.gif" v-lazy="list[0].img" alt="">
                                </a>
                            </div>
                        </div>
                        <div class="magic-cube-model dflex flex-start">
                            <div class="magic-cube-model-row" >
                                <a :href="list[1].link != ''?list[1].link:'javascript:;'">
                                    <img class="magic-cube-img" v-if="list[1].img" error="../../../assets/img/no_picture.gif" v-lazy="list[1].img" alt="">
                                </a>
                            </div>
                            <div class="magic-cube-model-row" >
                                <a :href="list[2].link != ''?list[2].link:'javascript:;'">
                                    <img class="magic-cube-img" v-if="list[2].img" error="../../../assets/img/no_picture.gif" v-lazy="list[2].img" alt="">
                                </a>
                            </div>
                        </div>
                    </div>
                </template>
            </div>
        </div>
    </div>
</template>

<script>
import Vue from "vue";
import $ from "jquery";
import "../css/style.less"
export default {
    props :{
        active:{
            type:Number,
            default:-1,
        },
        data:{
            type:Array,
            default:()=>{
                return [];
            }
        },
        isChange:{
            type:Boolean,
            default:true,
        },
    },
    data () {
        return{
            list:[],
            model:0,
        }
    },
    watch:{
        data(res){
            this.list = res;
        }
    },
    created(){
        if(this.data){
            this.list = this.data;
        }
    },
    methods:{
    },
}
</script>
<style lang="less" scoped>
.operation-images-box{
    border-radius: 5px;
    border: 2px dashed #c9c9c9;
    padding: 11px;
    width: calc(100% - 26px);
    position: relative;
    #uploadForm{
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        opacity: 0;
        width: 100%;
        height: 100%;
        margin: auto;
        input{
            display: block;
            height: 100%;
            width: 100%;
        }
    }
    .operation-images{
        min-width: 80px;
        max-width: 80px;
        min-height: 80px;
        background-color: #fff;
        border: 1px solid #c9c9c9;
        position: relative;
        img{
            display: block;
            width: 100%;
        }
        .goods-images-box{
            border-radius: 5px;
            overflow: hidden;
            border: 1px solid #c9c9c9;
        }
    }
    .operation-attr{
        margin: auto 0;
        width: 100%;
    }
    .operation-label{
        min-width: 90px;
        text-align: right;
        font-size: 12px;
    }
    .operation-attr-li{
        margin-bottom: 10px;
        width: 100%;
    }
    .operation-attr-li:last-child{
        margin-bottom: 0;
    }
}
.change-img{
    display: none;
    position: absolute;
    bottom: 0;
    width: 100%;
    left: 0;
    background-color: rgba(0,0,0,0.3);
    font-size: 12px;
    color: #fff;
    justify-content: center;
    align-items: center;
}
.operation-images-box:hover{
    border-color:#62b3ff;
    .remove-btn{
        display: flex;
    }
    .change-img{
        display: flex;
    }
}
.magic-cube-model-dom{
    margin-bottom: 10px;
    .magic-cube-model{
        flex:1;
    }
    .magic-cube-model-row{
        position: relative;
        flex:1;
        // background-color: #fff;
        border: 1px dashed #c9c9c9;
        margin-top: -1px;
        margin-left: -1px;
        img{
            display: block;
            width: 100%;
        }
        img.magic-cube-default-img{
            height: 100%;
        }
        .magic-cube-default-text{
            font-size: 14px;
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
        }
    }
    .magic-cube-model-row.active{
        border-style: solid;
        border-color:#62b3ff;
        z-index: 1;
    }
}

.magic-cube-model-dom.isChangeFalse{
    margin-bottom: 0;
    .magic-cube-model-row{
        border:0;
        margin-top: 0;
        margin-left: 0px;
        background-color: unset;
    }
    .magic-cube-model-row:last-child{
        margin-right: 0;
    }
}

.magic-cube-box{
    .magic-cube-model-dom{
        margin-bottom: 0;
        .magic-cube-model{
            flex:1;
        }
        .magic-cube-model-row{
            position: relative;
            flex:1;
            border: 0;
            margin-top: 0;
            margin-left: 0;
            img{
                display: block;
                width: 100%;
            }
            img.magic-cube-default-img{
                // min-height: 211px;
            }
            .magic-cube-default-text{
                font-size: 14px;
                position: absolute;
                top: 0;
                bottom: 0;
                left: 0;
                right: 0;
            }
        }
        .magic-cube-model-row.active{
            border-style: solid;
            border-color:#62b3ff;
            z-index: 1;
        }
    }
}
</style>