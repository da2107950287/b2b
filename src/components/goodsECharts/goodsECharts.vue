<template>
    <div>
        <!-- title -->
        <div class="echarts-title">
            <van-nav-bar
                left-arrow
                title="报表"
                @click-left="goPreviousPage"
            />
        </div>

        <div class="pad06" v-show="showData == 1">
            <!-- shop title -->
            <div class="shop-title">
                <van-row>
                    <van-col span='4' class="shop-title-logo">
                        <img :src="shopLogo" width="100%">
                    </van-col>
                    <van-col span='20'>
                        <h3>{{title}}</h3>
                        <p><img :src="location" width="6%">{{address}}</p>
                    </van-col>
                </van-row>
            </div>

            <div class="shop-echarts shop-echarts-title" @click="getTab">
                <van-row type="flex" justify="space-between">
                    <van-col><h3>{{period}}经营报表</h3></van-col>
                    <van-col>账单详情>></van-col>
                </van-row>
            </div>

            <div class="myState">
                <div class="shop-echarts-title-bar">
                    经营状态
                </div>
                <!-- 折线图 -->
                <div id='myState' :style="{width: '100%', height: '300px'}"></div>
                <!-- <div>
                    <van-row class="shop-echarts-bar" type="flex" justify="end">
                        <van-col>采购量环比&emsp;</van-col>
                        <van-col>账单详情>></van-col>
                    </van-row>
                </div> -->
            </div>
            <div>
                <!-- 采购量 -->
                <div class="shop-echarts-title-bar">采购量环比</div>
                <div id="myChart" :style="{width: '100%', height: '500px'}"></div>
                <!-- 均价 -->
                <!-- <div class="shop-echarts-title-bar">采购支出TOP5均价</div> -->
                <div class="line"></div>
                <div id="myQuota" :style="{width: '100%', height: '500px'}"></div>
            </div>
        </div>

        <div v-show="showData == 0" class="showData">
            暂无经验数据
        </div>
    </div>
</template>

<script>
    import Vue from 'vue'
    import {post} from '../../assets/js/commonAPI.js'
    import "font-awesome/css/font-awesome.css"

    Vue.prototype.$post = post;
    export default {
        data() {
            return {
                shopLogo: require('../../assets/img/shop.png'),
                location: require('../../assets/img/pos.png'),
                EchartsType: 'line',
                num: [],
                amount: [],
                avg: [],
                title: '',
                showData: 1,
                curYear: 0,
                curMonth: 0,
                uid: 0,
                code: '',
                address: '',
                period: '',
                money: [],
                colors: ['#DBD5D2', '#FB838C', '#DB5646']
            }
        },
        created() {
            let setYear = this.$route.query.y;
            let setMonth = this.$route.query.m;
            // this.shopLogo = this.$route.query.url;  //不能来自
            this.uid = this.$route.query.u;
            this.code = this.$route.query.code;

            if (setMonth == undefined || setYear == undefined) {
                let date = new Date();
                this.curYear = date.getFullYear().toString();
                this.curMonth = (date.getMonth() + 1).toString();
            } else {
                this.curYear = setYear;
                this.curMonth = setMonth;
            }
            this.period = this.curYear + "-" + this.curMonth;

            this.$post('/?c=report&a=amount', {
                month: this.curMonth,
                year: this.curYear,
                u: this.uid,
                code: this.code,
            })
                .then((res) => {
                    switch (res.code) {
                        case 0:
                            this.amount = res.data.chart;
                            this.title = res.data.info.enterprise_name;
                            this.address = res.data.info.address;
                            // 状态
                            this.myState();
                            break;
                        case 1:
                            this.$toast(res.msg);
                            break;
                    }
                })

            // 获取总价
            this.$post('/?c=report&a=report&t=num', {
                month: this.curMonth,
                year: this.curYear,
                u: this.uid,
                code: this.code,
                type: 'num',
                limit: 5
            }).then((res) => {
                switch (res.code) {
                    case 0:
                        this.num = res.data.chart;
                        // 采购量
                        this.barChart(res.data.chart, 'myChart', '采购支出TOP5采购量', 'num');
                        break;
                    case 1:
                        this.$toast(res.msg);
                        break;
                }
            });

            // 获取均价
            this.$post('/?c=report&a=report&t=avg', {
                month: this.curMonth,
                year: this.curYear,
                u: this.uid,
                code: this.code,
                type: 'avg',
                limit: 5
            }).then((res) => {
                localStorage.setItem('goodsTab',JSON.stringify(res));
                switch (res.code) {
                    case 0:
                        // this.avg = res.data.chart;
                        // 均价图表
                        // this.myQuota();
                        this.barChart(res.data.chart, 'myQuota', '采购支出TOP5均价', 'avg');
                        break;
                    case 1:
                        this.$toast(res.msg);
                        break;
                }
            })

            this.$post('',{
                id:'',
                sum:"",
            })
            .then(res => {
                console.log(res); 
            })
            


        },
        mounted() {

        },
        methods: {
            // 返回上一页
            goPreviousPage() {
                this.$router.go(-1);
            },

            // 状态
            myState() {
                // 数组去重
                function unique5(arr) {
                    let x = new Set(arr);
                    return [...x];
                }

                let xArr = [];
                let incomeArr = [];
                let totalArr = [];
                let legendData = ['采购额', '营业额'];

                this.amount.forEach((item) => {
                    xArr.push(item.m);
                    totalArr.push(item.all_amount);
                    incomeArr.push(item.sale);
                });

                let myState = this.$echarts.init(document.getElementById('myState'));
                myState.setOption({
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'cross',
                            label: {
                                backgroundColor: '#283b56'
                            }
                        }
                    },
                    legend: {
                        bottom: 'bottom',
                        data: legendData
                    },
                    grid: {
                        top: '10%',
                        bottom: 20,
                        left: 10,
                        right: 10,
                        containLabel: true
                    },
                    dataZoom: {
                        show: false,
                        start: 0,
                        end: 100
                    },
                    xAxis: [
                        {
                            type: 'category',
                            boundaryGap: true,
                            data: unique5(xArr)
                        }
                    ],
                    yAxis: [
                        {
                            type: 'value',
                            scale: true,
                            name: '采购',
                            max: Math.max(...totalArr),
                            min: 0,
                        },
                        {
                            type: 'value',
                            scale: true,
                            name: '营收',
                            max: Math.max(...incomeArr),
                            min: 0,
                        }
                    ],
                    series: [
                        {
                            name: legendData[1],
                            type: 'bar',
                            data: totalArr,
                            itemStyle: {
                                normal: {
                                    color: this.colors[2],
                                    label: {
                                        show: true, //开启显示
                                        textStyle: { //数值样式
                                            color: 'black',
                                            fontSize: 10
                                        }
                                    }
                                }
                            }
                        },
                        {
                            name: legendData[0],
                            type: 'line',
                            data: incomeArr,
                            yAxisIndex: 1,
                            itemStyle: {
                                normal: {
                                    color: this.colors[0],
                                    label: {
                                        show: true, //开启显示
                                        position: 'right', //在上方显示
                                        textStyle: { //数值样式
                                            color: 'black',
                                            fontSize: 10
                                        }
                                    }
                                }
                            }
                        }
                    ]
                });
            },
            barChart(data, divTag, title, key) {

                let div = document.getElementById(divTag);
                div.style.width = document.body.clientWidth + 'px';

                let objArr = [];
                let goodsName = [];
                let legendData = [];

                //数据生成 start
                for (let i = 0; i < data.length; i++) {

                    let obj = {
                        name: '',
                        type: 'bar',
                        data: [],
                        itemStyle: {
                            normal: {
                                color: this.colors[i + 1],
                                label: {
                                    show: true, //开启显示
                                    position: 'right', //在上方显示
                                    textStyle: { //数值样式
                                        color: 'black',
                                        fontSize: 10
                                    }
                                }
                            }
                        }
                    };
                    data[i].forEach((item) => {
                        if (obj.name == '') {
                            obj.name = item.m;
                        }
                        obj.data.push(item[key]);
                        goodsName.push(item.x);
                        legendData.push(item.m);
                    });
                    objArr.push(obj);

                }
                //数据生成 end

                // 数组去重
                function unique5(arr) {
                    let x = new Set(arr);
                    return [...x];
                }

                let myChart = this.$echarts.init(div);
                // 绘制图表
                myChart.setOption({
                    title: {
                        text: title,
                    },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'shadow'
                        }
                    },
                    legend: {
                        top: 25,
                        data: unique5(legendData)
                    },
                    xAxis: {
                        type: 'value',
                        boundaryGap: [0, 0.01]
                    },
                    yAxis: {
                        type: 'category',
                        data: unique5(goodsName),
                        axisLabel: {
                            interval: 0,
                            formatter: function (value) {
                                //x轴的文字改为竖版显示
                                var str = value.split("");
                                return str.join("\n");
                            }
                        }
                    },
                    series: objArr
                });
            },
            getTab() {
                this.$router.push({
                    path: '/goodsTab',
                    query:{
                        title:this.title,
                        // y:this.period,
                        month: this.curMonth,
                        year: this.curYear,
                        u: this.uid,
                        code: this.code,
                    }
                })
            }
        }
    }
</script>

<style scoped>
    * {
        margin: 0;
        padding: 0;
    }

    .pad06 {
        padding: 0 .6rem;
        background-color: #eeeeee;
    }

    .shop-title {
        margin: .3rem 0;
        max-width: 80%;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        /*! autoprefixer: off */
        -webkit-box-orient: vertical;
        /* autoprefixer: on */
    }

    .shop-title p {
        color: #777;
        font-size: 12px;
    }
    .shop-title-logo{
        padding: .2rem;
    }

    .shop-echarts {
        margin-top: 1rem;
    }

    .shop-echarts-title {
        text-align: center;
        padding: .2rem 1rem;
        color: #fff;
        font-size: 14px;
        line-height: 1.5rem;
        border-radius: .2rem;
        background-color: #da251c;
    }

    .shop-echarts-bar {
        height: 2rem;
        color: #777;
        margin: .2rem 0;
        font-size: 14px;
        line-height: 2rem;
        background-color: #fff;
    }
    .shop-echarts-bar>div:nth-child(1){
        color: #da251c;
        font-weight: bold;
    }

    .shop-echarts-icon {
        text-align: center;
        font-size: 20px;
    }

    .shop-echarts-name {
        font-size: 14px;
    }

    .shop-echarts-title-bar{
        margin-top: .6rem;
        text-indent: .5rem;
        font-weight: 700;
        padding: 0.2rem;
        color: #da251c;
        display: inline-block;
        background-color: #fff;
        border-radius: 0 .2rem 0 0;
        border-left: 4px solid #da251c;
    }

    .showData {
        text-align: center;
        font-size: 14px;
    }
    .myState{
        margin-bottom: .2rem;
    }
    .line{
        width: 100%;
        height: 1px;
    }
    #myState,#myChart,#myQuota{
        background-color: #fff;
    }
</style>