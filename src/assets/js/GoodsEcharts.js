// 柱状折线图
export function EchartsCategory(_this,data){
    let eve = _this;
    eve.EchartsCategory = {
        title: {
            left: 'center',
            text: data.title,
        },
        legend: {
            y:'bottom',
            data:['最新成交价', '预购队列']
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                label: {
                    backgroundColor: '#283b56'
                }
            }
        },
        toolbox: {
            show: false,
            feature: {
                dataView: {readOnly: false},
                restore: {},
                saveAsImage: {}
            }
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
                data: data.yName
            },
            {
                type: 'category',
                boundaryGap: true,
                data: data.yLineValue,
            }
        ],
        yAxis: [
            {
                type: 'value',
                scale: true,
                name: '价格',
                max: 20,
                min: 0,
                nameGap:15,
                boundaryGap: [0.2, 0.2],
            },
            {
                type: 'value',
                scale: true,
                name: '预购量',
                max: 1200,
                min: 0,
                nameGap:15,
                boundaryGap: [0.2, 0.2]
            }
        ],
        series: [
            {
                name:'预购队列',
                type:'bar',
                xAxisIndex: 1,
                yAxisIndex: 1,
                data:data.yColumnValue
            },
            {
                name:'最新成交价',
                type:'line',
                data:data.yNewestValue
            }
        ]
    }
}
// 柱状图
export function EchartsStack(_this,datainfo,data,date){
    let eve = _this;
    eve.EchartsStack = {
        title: {
            text: '采购支出TOP5采购量',
            left: 'center',
            top:25,
        },
        backgroundColor: '#fff',
        legend: {
            data: date,
            align: 'left',
            left: 10
        },
        brush: {
            toolbox: ['rect', 'polygon', 'lineX', 'lineY', 'keep', 'clear'],
            xAxisIndex: 0
        },
        toolbox: {
            show:false,
            feature: {
                magicType: {
                    type: ['stack', 'tiled']
                },
                dataView: {}
            }
        },
        tooltip: {},
        xAxis: {
            data: data,
            name: '',
            silent: false,
            axisLine: {onZero: true},
            splitLine: {show: false},
            splitArea: {show: false}
        },
        yAxis: {
            inverse: true,
            splitArea: {show: false}
        },
        series: datainfo
    }
}

// 饼图
export function EchartsVertical(_this,amountInfo,yName,date){
    console.log(amountInfo)
    let eve = _this;
    eve.EchartsVertical = {
        title : {
            text: '某地区蒸发量和降水量',
            subtext: '纯属虚构'
        },
        tooltip : {
            trigger: 'axis'
        },
        legend: {
            data: yName,
        },
        xAxis : [
            {
                type : 'category',
                data : date
            }
        ],
        yAxis : [
            {
                type : 'value'
            }
        ],
        series : amountInfo
    }
}