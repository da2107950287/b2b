<template>
    <div :class="['none', {'none-type-2': tType}]" :style="{'background-color': bgColor}">
        <img :src="list[item].img">
        <p>{{list[item].msg}}</p>
    </div>
</template>

<script>
//空白占位图
import order from '../../../assets/img/none/search-order-none.png'
import evaluate from '../../../assets/img/none/search-evaluate-none.png'
import receivinggoods from '../../../assets/img/none/search-receivinggoods-none.png'
import order1 from '../../../assets/img/none/search-order1-none.png'
import seller from '../../../assets/img/none/search-seller-none.png'
import receiving from '../../../assets/img/none/search-receiving-none.png'
import invoice from '../../../assets/img/none/search-invoice-none.png'
import research from '../../../assets/img/none/search-research-none.png'
import coupon from '../../../assets/img/none/search-coupon-none.png'
import goods from '../../../assets/img/none/search-goods-none.png'

export default {
	props:{
		item: {
			type: String
		},
		tType: {
			type: String
		},
		bgColor: {
			type: String,
			default: '#f2f2f2'
		}
	},
	data(){
		return {
			list:{
				'salesList': {
					name: '售后列表、我的订单',
					img: order,
					msg: '您还没有相关的订单'
				},
				'evaluate': {
					name: '评价中心',
					img: evaluate,
					msg: '您还没有商品的评价哟'
				},
				'goodsEvaluate': {
					name: '商品评价',
					img: evaluate,
					msg: '此商品还没有评论哟'
				},
				'wallet': {
					name: '钱包-无交易记录',
					img: order,
					msg: '您还没有交易记录哟'
				},
				'walletAccount': {
					name: '钱包-无交易记录-账户明细',
					img: order,
					msg: '您还没有相关记录哟'
				},
				'supplier': {
					name: '关注商家',
					img: receivinggoods,
					msg: '您还没关注的店铺哟'
				},
				'uselist': {
					name: '收藏商品',
					img: receivinggoods,
					msg: '您还没收藏的商品哟'
				},
				'whole': {
					name: '我的求购',
					img: order1,
					msg: '您还没有发布过求购单哟'
				},
				'businessList': {
					name: '批发市场、搜索商家、首页商户推荐',
					img: seller,
					msg: '搜索的商家不存在哦'
				},
				'receivingGoods': {
					name: '收货地址',
					img: receiving,
					msg: '暂无收货地址'
				},
				'invoiceInfo': {
					name: '发票管理',
					img: invoice,
					msg: '暂无发票信息'
				},
				'businessCircle': {
					name: '生意圈',
					img: research,
					msg: '研发中未开放'
				},
				'coupon': {
					name: '优惠券',
					img: coupon,
					msg: '您还没有领取优惠券！'
				},
				/* 首页 */
				'specialRecoommend': {
					name: '首页-农联特推',
					img: goods,
					msg: '暂无推荐商品'
				},
				'supplierRecoommend': {
					name: '首页-商户用户特推',
					img: seller,
					msg: '暂无推荐商户'
				},
				'goods': {
					name: '首页-新品上市',
					img: goods,
					msg: '暂无推荐商品'
				},
				'recommendGoods': {
					name: '首页-品牌尖货',
					img: goods,
					msg: '暂无尾货商品'
				},

				/**/
				'goodsList': {
					name: '搜索的商品不存在',
					img: goods,
					msg: '搜索的商品不存在哦'
				},
				/**/
				'newGoodsList': {
					name: '该分类下商品不存在',
					img: goods,
					msg: '该分类下商品不存在'
				},
				'shop': {
					name: '商家店铺内无商品存在',
					img: goods,
					msg: '暂无商品'
				},
				'usedList': {
					name: '您还没有常用清单',
					img: goods,
					msg: '您还没有常用清单'
				},

				'voucher': {
					name: '金券',
					img: coupon,
					msg: '暂无可发放金券'
				},

				'storeList': {
					name: '通用商家列表',
					img: seller,
					msg: '暂无商家'
				},
			}
		}
	}
}
</script>

<style scoped>
    .none {
        text-align: center;
        padding: 35px 0 10px;
        /*background-color: #f2f2f2;*/
    }
    .none img {
        width: 110px;
        height: 110px;
    }
    .none p {
        margin: 0;
        font-size: 14px;
        color: #808080;    
    }

    .none-type-2 {
    	padding-top: 85px;
    }
</style>