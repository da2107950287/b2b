<template>
    <div>
        <!-- 标题 -->
        <van-nav-bar 
            title='本地物价趋势'
            left-arrow
            class="price-trend-bar"
            @click-left='goPreviousPage'
        />
        <!-- 图表 -->
        <div class="pricEchart" id="myChart" :style="{width: '300px', height: '300px'}"></div>
        <!-- 查询类别 -->
        <div class="pric">
            <div class="pric-term">
                <van-row>
                    <van-col span='4'>
                        查询条件:
                    </van-col>
                    <van-col span='12'>
                        <div @click="onPric">
                            <van-cell-group>
                                <van-field v-model="pricValue" disabled placeholder="输入需要查询条件" />
                            </van-cell-group>
                        </div>
                    </van-col>
                    <van-col span='8' class="pric-button">
                        <van-button size='small' class="pric-button-style" @click="pricButton">查询</van-button>
                    </van-col>
                </van-row>
            </div>
        </div>

        <!-- 查询弹框 -->
        <van-actionsheet v-model="isShowPickerPric">
            <van-picker 
                show-toolbar
                title="标题"
                :columns="columns" 
                @cancel="onCancel"
                @confirm="onConfirm"
            />
        </van-actionsheet>
    </div>
</template>

<script>
    const citys = {
    '浙江': ['杭州', '宁波', '温州', '嘉兴', '湖州'],
    '福建': ['福州', '厦门', '莆田', '三明', '泉州']
    };
    export default {
        data() {
            return {
                pricValue:'',
                title:'萝卜',
                isShowPickerPric: false,
                columns: [{
                    values: Object.keys(citys),
                    className: 'column1'
                },
                {
                    values: citys['浙江'],
                    className: 'column2',
                    defaultIndex: 2
                }],
                chartDate:[{
                    name: '销量',
                    type: 'bar',
                    data: [1,22,95,100,60]
                }]
            }
        },
        mounted(){
            this.drawLine();
        },
        methods:{
            goPreviousPage(){
                this.$router.go(-1);
            },
            onChange(picker, values) {
                picker.setColumnValues(1, citys[values[0]]);
            },
            onPric(){
                this.isShowPickerPric = true;
            },
            onCancel(){
                this.isShowPickerPric = false;
            },
            onConfirm(value){
                this.pricValue = value[0] + value[1];
                this.isShowPickerPric = false;
            },
            pricButton(){
                alert('未写逻辑')
            },
            // ####=>图表
            drawLine(){
                // 基于准备好的dom，初始化echarts实例
                let myChart = this.$echarts.init(document.getElementById('myChart'))
                // 绘制图表
                myChart.setOption({
                    title: { text: this.title+'物价趋势图' },
                    tooltip: {
                        trigger: 'axis'
                    },
                    xAxis: {
                        data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
                    },
                    yAxis: [
                        {
                        
                        },
                    ],
                    series: this.chartDate
                });
            }
        }
    }
</script>

<style scoped>
    .price-trend-bar{
        border-bottom: 1px solid #e0e0e0;
    }
    .pric-term{
        line-height: 2.3rem;
        font-size: 12px;
        padding: 0 .6rem;
    }
    .pric-button{
        text-align: center;
    }
    .pric-button-style{
        color: #fff;
        background-color: #d1442b;
        border: 1px solid #d1442b;
    }
</style>