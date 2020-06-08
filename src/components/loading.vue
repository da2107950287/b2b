<template>
    <div>
        <div class="index-loding-box">
            <img src="../assets/img/loding.gif" alt="">
            <div class="loading">
                <span></span>
            </div>
        </div>
    </div>
</template>


<style lang="less" scoped>
    .index-loding-box{
        position: fixed;
        top: 0;
        left: 0;
        background-color: #f2f2f2;
        width: 100%;
        height: 100%;
        z-index: 9999;
        img{
            display: block;
            width: 10.56rem;
            margin: 100px auto 0;
        }
    }
    
    .loading{
        width: 10.56rem;
        height: 4px;
        border-radius: 4px;
        margin: 0 auto;
        margin-top:0;
        position: relative;
        background: #f2f2f2;
        overflow: hidden;
        span{
            display:block;
            width: 2.64rem;
            height: 100%;
            margin: auto;
            border-radius: 3px;
            background: #fac2d2;
            animation: changePosition 4s linear infinite;
        }
    }
    @keyframes changePosition{
        0%{
            -webkit-transform: translate(-10.56rem);
        }
        50%{
            -webkit-transform: translate(0);
        }
        100%{
            -webkit-transform: translate(10.56rem);
        }
    }
    @-webkit-keyframes changePosition{
        0%{
            -webkit-transform: translate(-10.56rem);
        }
        50%{
            -webkit-transform: translate(0);
        }
        100%{
            -webkit-transform: translate(10.56rem);
        }
    }
</style>
