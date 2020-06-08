import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/tabber'
import notfount from '@/components/404'

/* const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
} */
/**
 * 重写路由的push方法.解决路由报错
 */
const routerPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error=> error)
}
Vue.use(Router);

export default new Router({
  mode:'history',
  base: '/mobile/m/',
  routes: [
    {path:'/', name:'Main', component:Main,children:[

      {path:'/index', name:'index', meta:{keepAlive : true}, component: resolve => require(['@/components/index'], resolve)},
      {path:'/wholesale', name:'wholesale', meta:{keepAlive : true}, component: resolve => require(['@/components/wholesale'], resolve)},
      {path:'/usedList', name:'usedList', meta:{keepAlive : true}, component: resolve => require(['@/components/usedList'], resolve)},
      {path:'/personal', name:'personal', component: resolve => require(['@/components/personal'], resolve)},
      {path:'/shoppingCart', name:'shoppingCart', component: resolve => require(['@/components/shoppingCart'], resolve)},
    ]},
    {path:'/receiveCoupon', name:'receiveCoupon', component: resolve => require(['@/components/indexBanner/receiveCoupon'], resolve)},
    {path:'/uselist', name:'uselist', component: resolve => require(['@/components/uselist'], resolve)},
    {path:'/businessList', name:'businessList', component: resolve => require(['@/components/businessList'], resolve)},
    {path:'/login', name:'login', component: resolve => require(['@/components/login'], resolve)},
    {path:'/register', name:'register', component: resolve => require(['@/components/register'], resolve)},
    {path:'/location', name:'location', component: resolve => require(['@/components/location'], resolve)},
    // {path:'/goodsList', name:'goodsList',meta:{keepAlive : true}, component: resolve => require(['@/components/goodsList'], resolve)},
    //首页搜索-搜索店铺
    {path:'/searchStore', name:'searchStore',meta:{keepAlive : true}, component: resolve => require(['@/components/searchStore'], resolve)},
    {path:'/shop', name:'shop',meta:{keepAlive : true}, component: resolve => require(['@/components/shop'], resolve)},
    {path:'/goods', name:'goods', component: resolve => require(['@/components/goods/goods'], resolve)},
    {path:'/matching', name:'matching', component: resolve => require(['@/components/matching'], resolve)},
    {path:'/priceTrend', name:'priceTrend', component: resolve => require(['@/components/priceTrend'], resolve)},
    {path:'/supplier', name:'supplier', component: resolve => require(['@/components/supplier'], resolve)},
    {path:'/comment', name:'comment', component: resolve => require(['@/components/comment'], resolve)},
    {path:'/commentInfo', name:'commentInfo', component: resolve => require(['@/components/commentInfo'], resolve)},
    {path:'/receivingGoods', name:'receivingGoods', component: resolve => require(['@/components/receivingGoods'], resolve)},
    {path:'/getReceiving', name:'getReceiving', component: resolve => require(['@/components/getReceiving'], resolve)},
    {path:'/invoiceInfo', name:'invoiceInfo', component: resolve => require(['@/components/invoiceInfo'], resolve)},
    {path:'/getinvoiceInfo', name:'getinvoiceInfo', component: resolve => require(['@/components/getinvoiceInfo'], resolve)},
    {path:'/goodsClass', name:'goodsClass', component: resolve => require(['@/components/goodsClass'], resolve)},
    {path:'/Cashier', name:'Cashier', component: resolve => require(['@/components/Cashier/Cashier'], resolve)},
    {path:'/ConfirmAnOrder', name:'ConfirmAnOrder', component: resolve => require(['@/components/ConfirmAnOrder/ConfirmAnOrder'], resolve)},
    /*线下支付页*/
    {path:'/payOff', name:'payOff', component: resolve => require(['@/components/payOff/payOff'], resolve)},
    
    {path:'/done', name:'done', component: resolve => require(['@/components/done/done'], resolve)},
    {path:'/logistics', name:'logistics', component: resolve => require(['@/components/logistics/logistics'], resolve)},
    {path:'/wholesaleS', name:'wholesaleS', component: resolve => require(['@/components/wholesale/wholesale'], resolve)},
    {path:'/evaluate', name:'evaluate', component: resolve => require(['@/components/evaluate/evaluate'], resolve)},
    {path:'/goodsEvaluate', name:'goodsEvaluate', component: resolve => require(['@/components/evaluate/goodsEvaluate'], resolve)},
    {path:'/GetPassword', name:'GetPassword', component: resolve => require(['@/components/GetPassword/GetPassword'], resolve)},
    {path:'/SetUserName', name:'SetUserName', component: resolve => require(['@/components/SetUserName/SetUserName'], resolve)},
    {path:'/SetUserImge', name:'SetUserImge', component: resolve => require(['@/components/SetUserName/SetUserImge'], resolve)},
    {path:'/tag', name:'tag', component: resolve => require(['@/components/tag/tag'], resolve)},
    {path:'/Recommend', name:'Recommend', component: resolve => require(['@/components/Recommend/Recommend'], resolve)},
    {path:'/showInfo', name:'showInfo', component: resolve => require(['@/components/showInfo'], resolve)},
    {path:'/seeDetails', name:'seeDetails', component: resolve => require(['@/components/SeeDetails/seeDetails'], resolve)},
    {path:'/goodsECharts', name:'goodsECharts', component: resolve => require(['@/components/goodsECharts/goodsECharts'], resolve)},
    {path:'/goodsTab', name:'goodsTab', component: resolve => require(['@/components/goodsTab/goodsTab'], resolve)},
    // 微信登录页面
    {path:'/wechatLogin', name:'wechatLogin', component: resolve => require(['@/components/wechat/login'], resolve)},
    {path:'/errorLogin', name:'errorLogin', component: resolve => require(['@/components/wechat/errorLogin'], resolve)},
    {path:'/wechatToUpdate', name:'toUpdate', component: resolve => require(['@/components/wechat/toUpdate'], resolve)},
    //跳转特别推荐的详情页面
    {path:'/specialRecommend', name:'specialRecommend', component: resolve => require(['@/components/specialRecommend/specialRecommend'], resolve)},
    //跳转个人注册页面
    {path:'/personalRegister', name:'personalRegister', component: resolve => require(['@/components/personalRegister'], resolve)},
    // 行业分类选择
    {path:'/industryLable', name:'industryLable', component: resolve => require(['@/components/industryLable'], resolve)},
    //入驻流程
    {path:'/merchants', name:'merchants', component: resolve => require(['@/components/merchants/merchants'], resolve)},
    {path:'/merchantsedit', name:'merchantsEdit', component: resolve => require(['@/components/merchants/merchantsEdit'], resolve)},
    {path:'/enterLable', name:'enterLable', component: resolve => require(['@/components/enterLable'], resolve)},// 入驻标签
    {path:'/contract', name:'contract', component: resolve => require(['@/components/merchants/contract'], resolve)},// 合同内容以及条约
    {path:'/contractsec', name:'contractsec', component: resolve => require(['@/components/merchants/contractsec'], resolve)},// 审核资料提交---等待审核
    {path:'/contractdefeated', name:'contractdefeated', component: resolve => require(['@/components/merchants/contractdefeated'], resolve)},// 审核资料提交---审核不通过
    {path:'/checkdes', name:'checkdes', component: resolve => require(['@/components/merchants/checkdes'], resolve)},// OA 失败
    {path:'/check', name:'check', component: resolve => require(['@/components/merchants/check'], resolve)},// OA 成功
    {path:'/discounts', name:'discounts', component: resolve => require(['@/components/merchants/discounts'], resolve)},// 《优惠流程条约》
    {path:'/runing', name:'runing', component: resolve => require(['@/components/merchants/runing'], resolve)},// 《代运营流程条约》
    {path:'/privacy', name:'privacy', component: resolve => require(['@/components/merchants/privacy'], resolve)},// 《隐私保护条约》
    {path:'/pass', name:'pass', component: resolve => require(['@/components/merchants/pass'], resolve)},// oA提交
    {path:'/accomplish', name:'accomplish', component: resolve => require(['@/components/merchants/accomplish'], resolve)},// oA提交
    // 售后流程
    {path:'/postAppeal', name:'postAppeal', component: resolve => require(['@/components/aftersales/post_appeal'], resolve)},//售后申诉
    {path:'/postSale', name:'postSale', component: resolve => require(['@/components/aftersales/postSale'], resolve)},//售后申请
    {path:'/editSale', name:'editSale', component: resolve => require(['@/components/aftersales/editSale'], resolve)},//修改申请
    {path:'/logisticsDetails', name:'logisticsDetails', component: resolve => require(['@/components/aftersales/logisticsDetails'], resolve)},//物流详情
    {path:'/salesDetails', name:'salesDetails', component: resolve => require(['@/components/aftersales/salesDetails'], resolve)},//售后详情
    {path:'/salesLists', name:'salesLists', component: resolve => require(['@/components/aftersales/salesLists'], resolve)},//售后列表
    // 评价流程
    {path:'/writeEval', name:'writeEval', component: resolve => require(['@/components/evaluate/writeEval'], resolve)},//评价
    {path:'/addWriteEval', name:'addWriteEval', component: resolve => require(['@/components/evaluate/addWriteEval'], resolve)},//评价
    {path:'/evaluadetails', name:'evaluadetails', component: resolve => require(['@/components/evaluate/evaluadetails'], resolve)},//评价
    //申诉流程
    {path:'/appealLists', name:'appealLists', component: resolve => require(['@/components/appeal/appeal_lists'], resolve)},//申诉列表
    {path:'/appealPost', name:'appealPost', component: resolve => require(['@/components/appeal/appeal_post'], resolve)},//申诉
    {path:'/appealDetails', name:'appealDetails', component: resolve => require(['@/components/appeal/appeal_details'], resolve)},//申诉详情
    /* 求购 */
    {path:'/auctionChild', name:'auction', component: resolve => require(['@/components/auction'], resolve)},
    {path:'/auction', name:'auctionAll', component: resolve => require(['@/components/auctionAll'], resolve)},
    {path:'/purchaseOrder', name:'purchaseOrder', component: resolve => require(['@/components/purchaseOrder'], resolve)},
    {path:'/orderInfo', name:'orderInfo', component: resolve => require(['@/components/orderInfo'], resolve)},
    {path:'/purchaseGoods', name:'purchaseGoods', component: resolve => require(['@/components/purchaseGoods/purchaseGoods'], resolve)},
    /* 帮助中心 */
    {path:'/help', name:'help', component: resolve => require(['@/components/helpComponents/help'], resolve)},
    {path:'/helpInfo', name:'helpInfo', component: resolve => require(['@/components/helpComponents/helpInfo'], resolve)},
    {path:'/questionnaire', name:'questionnaire', component: resolve => require(['@/components/helpComponents/questionnaire'], resolve)},
    /* 退换货政策 */
    {path:'/aftermarket', name:'aftermarket', component: resolve => require(['@/components/aftermarket'], resolve)},
    /* 404页面 */
    {path: '*',name: 'notfount',component: notfount},
    /* 搜索商品 */
    {path:'/searchGoods', name:'searchGoods', component: resolve => require(['@/components/searchGoods/searchGoods'], resolve)},
    /* 新品推荐 */
    {path:'/newGoods', name:'newGoods', component: resolve => require(['@/components/indexBanner/newGoods'], resolve)},
    /* 特价商品 */
    {path:'/recommendGoods', name:'recommendGoods', component: resolve => require(['@/components/indexBanner/recommendGoods'], resolve)},
    /* 钱包 */  
    {path:'/wallet', name:'wallet', component: resolve => require(['@/components/wallet'], resolve)},//钱包
    {path:'/account', name:'account', component: resolve => require(['@/components/account/account'], resolve)},//钱包明细
    {path:'/cashOut', name:'cashOut', component: resolve => require(['@/components/cashOut/cashOut'], resolve)},//提现
    {path:'/cashOutRecord', name:'cashOutRecord', component: resolve => require(['@/components/cashOut/cashOutRecord'], resolve)},//提现记录
    {path:'/cashOutDetails', name:'cashOutDetails', component: resolve => require(['@/components/cashOut/cashOutDetails'], resolve)},//提现明细
    {path:'/bindingBankCard', name:'bindingBankCard', component: resolve => require(['@/components/cashOut/bindingBankCard'], resolve)},//绑定银行卡
    /* 店铺列表 */
    {path:'/storeList', name:'storeList', component: resolve => require(['@/components/storeList/storeList'], resolve)},
    /* 意见反馈 */
    {path:'/feedBack', name:'feedBack', component: resolve => require(['@/components/feedBack/feedBack'], resolve)},

    /* 生意圈 */
    {path:'/businessCircle', name:'businessCircle', component: resolve => require(['@/components/businessCircle'], resolve)},
    /* 优惠券 */
    {path:'/coupon', name:'coupon', component: resolve => require(['@/components/coupon'], resolve)},
    //指定券 使用 商品列表页
    {path:'/couponAssign', name:'couponAssign', component: resolve => require(['@/components/coupon/couponAssign'], resolve)},
    /* 账号设置 */
    {path:'/setFocus', name:'setFocus', component: resolve => require(['@/components/setFocus'], resolve)},
    /* 设置支付密码 */
    {path:'/cashPsw', name:'cashPsw', component: resolve => require(['@/components/cashPsw/cashPhone'], resolve)},

    /* 团购活动 */
    // 团购活动列表  
    {path:'/groupBuying', name:'groupBuying', component: resolve => require(['@/components/groupBuying/groupBuying'], resolve)},
    //团购商品详情
    {path:'/groupBuyingGoods', name:'groupBuyingGoods', component: resolve => require(['@/components/groupBuying/groupBuyingGoods'], resolve)},
    //团购订单详情页
    {path:'/GrouyBuyingConfirmAnOrder', name:'GrouyBuyingConfirmAnOrder', component: resolve => require(['@/components/ConfirmAnOrder/GrouyBuyingConfirmAnOrder'], resolve)},

    /* 推广1 农联金券 */
    //领取金券页
    {path:'/voucherDraw', name:'voucherDraw', component: resolve => require(['@/components/voucher/voucherDraw'], resolve)},
    //发放金券页
    {path:'/voucherGrant', name:'voucherGrant', component: resolve => require(['@/components/voucher/voucherGrant'], resolve)},
    //分享金券二维码页
    {path:'/vouchEwm', name:'vouchEwm', component: resolve => require(['@/components/voucher/vouchEwm'], resolve)},

    /*推广2*/
    //我要推广二维码页面
    {path:'/extendScan', name:'extendScan', component: resolve => require(['@/components/extend/extendScan'], resolve)}, 
    //我要推广进入之前的 推广协议页
    {path:'/extendAgreement', name:'extendAgreement', component: resolve => require(['@/components/extend/extendAgreement'], resolve)}, 
    //推广账户
    {path:'/extendAcount', name:'extendAccount', component: resolve => require(['@/components/extend/extendAccount'], resolve)},
    //下级采购商
    {path:'/extendAccountBuyer', name:'extendAccountBuyer', component: resolve => require(['@/components/extend/extendAccountBuyer'], resolve)},
    //下级合伙人
    {path:'/extendAccountPartner', name:'extendAccountPartner', component: resolve => require(['@/components/extend/extendAccountPartner'], resolve)},
    //本月收益页
    {path:'/extendProfitRecord', name:'extendProfitRecord', component: resolve => require(['@/components/extend/extendProfitRecord'], resolve)},
    //收益记录页
    {path:'/extendProfitDetails', name:'extendProfitDetails', component: resolve => require(['@/components/extend/extendProfitDetails'], resolve)},
    //可视化页面
    {path:'/visualized', name:'visualized', component: resolve => require(['@/components/visualized/visualized'], resolve)},
  ]
})