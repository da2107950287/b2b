<template>
    <div class="nl-scan">
        <!-- 标题 -->
        <van-nav-bar title="推广二维码" left-text="返回" left-arrow @click-left="goPreviousPage" />
        <div class="nl-bg">
            <div class="nl-img-1"></div>
            <div class="nl-img-2">
                <div class="nl-img-con">
                    <img class="nl-img-box" src="../img/border.png" alt="">
                    <div class="nl-img-ewm">
                        <img v-if="shrareImg" :src="shrareImg">
                        <!-- 二维码 -->
                        <div v-else class="qrcode" id="qrcode" ref="qrcode"></div>
                    </div>
                    <!-- <div v-else class="vantLoading">
                        <vloading :vertical="false" text=""></vloading>
                    </div> -->
                </div>
            </div>
            <div class="nl-img-3"></div>
        </div>
    </div>
</template>
<script>
//生成二维码
import QRCode from 'qrcodejs2';
//将html DOM元素或页面利用canvas画布生成图片
import html2canvas from 'html2canvas';

import { is_wexin } from '../../assets/js/commonAPI.js';
import { wxStart, wxShare } from '../../assets/js/wxjs.js';
import { Dialog } from 'vant';

const navbar = () => import("../navbar/nav.vue");
const vloading = () => import("../vloading.vue");
export default {
    components: {
        navbar,
        vloading
    },
    data() {
        return {
            //二维码
            shrareImg: ''
        }
    },
    created() {
        this.$post("/?c=user&a=promotion", {}).then(res => {
            if (res.code == 0) {
                this.$nextTick(() => {
                    this.initQrcode(res.data);
                });
            } else {
                this.$toast(res.msg);
            }
        });
    },
    methods: {
        //####=>返回上一页， 若无上一页， 则进入个人中心
        goPreviousPage() {
            window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/personal');
        },
        //二维码默认配置
        initQrcode(_data) {
            let wid = 160,
                hei = 153;

            //针对320px 屏特殊处理
            if (window.screen.width <= 320) {
                wid = 136,
                    hei = 130;
            }
            this.qrcode = new QRCode('qrcode', {
                width: wid, // 设置宽度 
                height: hei, // 设置高度
                text: _data.str
            });

            html2canvas(this.$refs.qrcode).then((canvas) => {
                this.shrareImg = canvas.toDataURL();
            });

            if (is_wexin()) {
                this.initWx(_data);
            }
        },
        //base64转blob
        base64ToBlob(code) {
            let parts = code.split(';base64,');
            let contentType = parts[0].split(':')[1];
            let raw = window.atob(parts[1]);
            let rawLength = raw.length;

            let uInt8Array = new Uint8Array(rawLength);

            for (let i = 0; i < rawLength; ++i) {
                uInt8Array[i] = raw.charCodeAt(i);
            }
            return new Blob([uInt8Array], { type: contentType });
        },
        //分享方法
        initWx(_data) {
            setTimeout(() => {
                wxStart((status, msg) => {
                    if (status == 'err') {} else if (status == 'exception') {

                    } else {
                        this.countdown(_data);
                    }
                });
            }, 500);
        },
        //分享
        countdown(_data) {
            // 分享内容
            let datas = {
                urls: window.location.origin + '/?u=' + _data.u,
                imgurls: window.location.origin + "/mobile/images/wxDefault.png",
                title: '【农联贡菜】健康不贵、分享有礼',
                desc: `您的朋友向您推荐了农联贡菜，这是四川最具规模和专业化的农产品在线交易综合服务平台!`,
            }
            this.wxShare(datas);
        },

        wxShare(data) {
            wxShare(data, function(res) {
                if (res == "success") {
                    // alert("success")
                } else if (res == "cancel") {
                    // alert("cancel")
                }
            });
        },
    },
    destroyed() {
        let data = {
            urls: window.location.origin,
            imgurls: "",
            title: "农联贡菜",
            desc: "",
        }
        this.wxShare(data)
    },
}

</script>
<style scoped>
.nl-scan {
    width: 100%;
    height: 100%;
    padding-top: 46px;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    position: relative;
}

/*头部导航条*/
.van-nav-bar {
    width: 100%;
    background-color: #ee3557;
    position: absolute;
    top: 0;
    left: 0;
}
.van-nav-bar .van-icon,
.van-nav-bar__text,
.van-nav-bar__title {
    color: #ffffff;
}
.van-nav-bar__text:active {
    background-color: #ee3557;
}
/*去掉头部导航条下面的白线样式*/
[class*=van-hairline]::after {
    border: none;
}

/*背景图设置*/
.nl-bg {
    width: 100%;
    height: 100%;
    position: relative;
}
.nl-img-1 {
    width: 100%;
    height: 48%;
    background: url("../img/WechatIMG1.png") no-repeat;
    background-position: center top;
    background-size: 100% 100%;
    padding-bottom: 1px;
    margin-bottom: -1px;
}
.nl-img-2 {
    width: 100%;
    height: 37%;
    min-height: 193px;
    background: url("../img/WechatIMG2.png") no-repeat;
    background-position: center top;
    background-size: 100% 100%;
    position: relative;
    overflow: hidden;
}
.nl-img-3 {
    width: 100%;
    height: 15%;
    background: url("../img/WechatIMG3.png") no-repeat;
    background-position: center top;
    background-size: 100% 100%;
    padding-top: 1px;
    margin-top: -1px;
}

.nl-img-2 .nl-img-con {
    width: 200px;
    height: 193px;
    margin: 0 auto;
    position: relative;
    top: 50%;
    margin-top: -96px;
}
.nl-img-2 .nl-img-box {
    width: 100%;
    height: 100%;
}
.nl-img-2 .nl-img-ewm {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 50%;
    top: 50%;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    padding: 20px;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
}
.nl-img-2 .nl-img-ewm .qrcode,
.nl-img-2 .nl-img-ewm img {
    width: 100%;
    height: 100%;
}

/*优化320px 宽样式*/
@media only screen and (max-width: 320px) {
    .nl-img-2 {
        min-height: 170px;
    }
    .nl-img-2 .nl-img-con {
        width: 176px;
        height: 170px;
        margin-top: -85px;
    }
}

.vantLoading {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    z-index: 1000;
}

</style>
