<template>
    <div style="background-color: #fff;">
        <van-nav-bar
            :title="title"
            left-arrow
            @click-left="onClickLeft"
        >
                <van-icon name="arrow-left" slot="left" class="left-icon"></van-icon>
        </van-nav-bar>
        <div class="ffc">
            <div>
                <div class="discountsTitle">《{{title}}》</div>
                <div class="discountsText" v-html="content"></div>
            </div>
            <div class="secBtnBox">
                <button @click="deabtn" class="deabtn">确认</button>
            </div>
        </div>


    </div>
</template>
<script>
import Vue from "vue";
import { post } from "../../assets/js/commonAPI";
Vue.prototype.$post = post;
export default {
    props:['type'],
    data(){
        return{
            title:'',
            status:this.$route.query.id,
            content:''      //文章内容
        }
    },
    created(){
        // 获取数据
        if (this.type == 1){
            this.title='店铺托管合作协议'
            this.status=1
            this.content=`
                <div class='WordSection1' style=''>
                    <p  style='text-indent:24.0px;
                    line-height:150%'><span style='font-size:12.0px;line-height:150%;'>经双方确认，就农联贡菜托管方（以下简称“乙方”）受甲方委托，负责以入驻供应商（以下简称“甲方”）名义在“农联贡菜”商城（简称“农联贡菜”）网店的推广、营销、运营，以及其他电子商务等相关事宜达成如下协议</span></p>

                    <p  style='line-height:150%'><b><span style='font-size:14.0px;
                    line-height:150%;'>一、委托服务内容</b></p>

                    <p  style='text-indent:28.3px;
                    line-height:150%'><span style='font-size:12.0px;line-height:150%;'>（一）甲方授权乙方对农联贡菜商城上所开店铺<span >(</span>以下统一简称<span >“</span>网店<span
                    >”)</span>进行代运营。甲方按照双方约定的供货价格提供商品，并承诺按照乙方平台成交信息内容所提供的地址、商品、规格、重量等要求进行按时正确的发货。该店铺的所有权及店铺账户主控权归甲方所有。</span></p>

                    <p  style='text-indent:28.3px;
                    line-height:150%'><span style='font-size:12.0px;line-height:150%;'>（二）乙方负责该店的店铺装修、推广、销售、客服等日常运营工作<span >,</span>由此产生的代运营服务费由甲方进行承担。乙方向甲方收取代运营基础服务费：<u><span
                    >1000</span>元</u><span >/</span>月；并根据甲方月度销售金额的<span
                    >2%</span>收取代运营营销费。</p>

                    <p  style='line-height:150%'><b><span style='font-size:14.0px;
                    line-height:150%;'>二、甲方的权利和义务</b></p>

                    <p  style='text-indent:28.3px;
                    line-height:150%'><span style='font-size:12.0px;line-height:150%;'>（一）甲方作为实际供货商与货物的出卖方，必须保证提供给乙方受托在农联贡菜上所销售的商品的合法性，并对所提供的所有产品承担所有责任，包括但不限于行政许可、知识产权、产品质量、产品三包政策等，货品本身及其供应、运输、包装等不得侵犯第三<span
                    >方任何</span>合法权益。</p>

                    <p  style='text-indent:28.3px;
                    line-height:150%'><span style='font-size:12.0px;line-height:150%;'>（二）甲方应当对所销售的产品向乙方提供相关产品知识培训、产品素材、信息，以及所销售产品的详尽品牌介绍，产品亮点<span >,</span>卖点说明和产品详细参数等资料<span
                    >,</span>甲方需对所提供资料的真实性、完整性、合法性负责。对于产品更新换代，更换型号，包装名称等情况，甲方应在更新之后的<u><span
                    style='background:yellow;'>两</span></u>个工作日内告知乙方并提供更新之后的文案、图片、广告宣传语等信息，<span
                    >否则导致</span>乙方损失的，甲方负责赔偿；如导致货不对版或引发消费者误解或索赔等后果，由甲方自行承担。</span></p>

                    <p  style='text-indent:40.2px;
                    line-height:150%'><span  style='font-size:12.0px;line-height:150%;
                    '>(</span><span style='font-size:12.0px;line-height:150%;
                    '>三<span >) </span>甲方负责提供产品售后相关规定和相应的退换<span
                    >货政策</span>给乙方参考。同时向乙方提供因产品文字说明与必要数据，如<span >因说明</span>或数据不足、不符或不真实导致乙方无法正确回答客户专业咨询的，影响销售情况或引发消费者误解或索赔后果的，由甲方自行承担。</span></p>

                    <p  style='text-indent:28.3px;
                    line-height:150%'><span style='font-size:12.0px;line-height:150%;'>（四）甲方负责指导农联贡菜上所销售的产品的商品范围及其销售的相关政策；甲方有权随时修订上述相关政策；当任何相关政策发生变化，甲方应至少提前三日书面通知到乙方，乙方将及时根据甲方要求及政策内容对甲方店铺内所涉及产品进行相应调整，包括但不限于更换、下架等。</span></p>

                    <p  style='text-indent:28.3px;
                    line-height:150%'><span  style='font-size:12.0px;line-height:150%;
                    '>(</span><span style='font-size:12.0px;line-height:150%;
                    '>五<span >) </span>甲方负责提供产品清单、产品相关信息、供货价格、农联平台价格或价格区间，乙方有权自行选择决定其所<span
                    >代销售</span>的产品（包括但不限于数量、品种、规格<span >/</span>型号等），根据甲方制定的线上销售定价范围对产品进行定价，在农联贡菜上进行产品销售。</span></p>

                    <p  style='text-indent:28.3px;
                    line-height:150%'><span  style='font-size:12.0px;line-height:150%;
                    '><span style=''>&nbsp;</span>(</span><span
                    style='font-size:12.0px;line-height:150%;'>六<span >) </span>甲方应向乙方提供书面授权文件（见附件<span
                    >1</span>），授权乙方在农联贡菜上作为独家授权主体代运营甲方店铺，不得再授权其他公司经营此店铺。</p>

                    <p  style='text-indent:28.3px;
                    line-height:150%'><span  style='font-size:12.0px;line-height:150%;
                    '>(</span><span style='font-size:12.0px;line-height:150%;
                    '>七<span >) </span>甲方负责向网店不间断、及时且合格地供货，并有权向乙方收取实际产生的商品费用（扣除乙方代运营服务费、代运营营销费、激励性管理费、甲方承担的商品销售<span
                    style='background:yellow;'>税金</span>等费用后）。对于甲方错发漏发导致产品遗失损坏等问题产生的相关费用及引发的损失<span
                    >,</span>当由甲方承担全部责任。</p>

                    <p  style='text-indent:28.3px;
                    line-height:150%'><span  style='font-size:12.0px;line-height:150%;
                    '>(</span><span style='font-size:12.0px;line-height:150%;
                    '>八<span >) </span>甲方负责网店订单的仓储与物流，由此产生的仓储、物流费用以及非因乙方原因（包括但不限于甲方错发漏发等情形）产生的退换货费用（含物流费用）、以及物流过程中发生的货物毁损灭失后果与产生的一系列物流费，由甲方全部承担。</span></p>

                    <p  style='text-indent:28.3px;
                    line-height:150%'><span  style='font-size:12.0px;line-height:150%;
                    '>(</span><span style='font-size:12.0px;line-height:150%;
                    '>九<span >) </span>乙方负责处理因媒体、个人偏好、促销活动、网上客<span
                    >服服务</span>态度不善引起的售前售后相关投诉和赔偿相关事宜，赔偿金额由乙方根据惯例、事件背景等综合考虑后向甲方报备，甲方负责承担该等赔偿金及乙方因解决上述索赔事件所产生的实际开支。</span></p>

                    <p  style='text-indent:28.3px;
                    line-height:150%'><span  style='font-size:12.0px;line-height:150%;
                    '>(</span><span style='font-size:12.0px;line-height:150%;
                    '>十<span >) </span>在买家已支付货款的前提下，甲方应保证足够的货源，并按要求按时发货。如遇甲方缺货，应自缺货之日起<span
                    >1</span>日内告知乙方，并应在<span >2</span>日内补足，因故未能在此期间内补足的，甲方应提前告知乙方并及时采取补救措施，以便乙方及时修改在<span
                    >售产品</span>的供应信息。因甲方未尽及时通知义务给乙方产生损失的，损失将由甲方承担。</p>

                    <p  style='text-indent:28.3px;
                    line-height:150%'><span  style='font-size:12.0px;line-height:150%;
                    '>(</span><span style='font-size:12.0px;line-height:150%;
                    '>十一<span >) </span>为满足正常的业绩增长需求，甲方应根据乙方的需求，提供足够乙方进行销售的产品<span
                    >SKU</span>数量，及时做出产品调整，更新等配合。</p>

                    <p  style='text-indent:28.3px;
                    line-height:150%'><span style='font-size:12.0px;line-height:150%;'>（十二）对于已托管店铺的装修美化、销售客服、新产品的发布、推广、售后等问题，甲方可合理参与并给出相关意见或建议<span >,</span>乙方有权根据自身实际情况选择接受或不接受<span
                    >,</span>如该意见与本协议其他条款相冲突<span >,</span>则该意见自始无效。乙方受甲方委托负责装修美化该网店等工作，乙方无垫付款项的义务，若双方无另行约定，有关费用由甲方负责承担。</span></p>

                    <p  style='text-indent:28.3px;
                    line-height:150%'><span style='font-size:12.0px;line-height:150%;'>（十三）对于网店的售后问题，乙方应在每日及时处理，如遇到乙方权限之内无法处理的售后问题，甲方有义务积极协助乙方，以保证问题快速、高效的解决，不得推诿。</span></p>


                    <p  style='line-height:150%'><b><span style='font-size:14.0px;
                    line-height:150%;'>三、乙方的权利与义务</span></b></p>

                    <p  style='text-indent:28.3px;
                    line-height:150%'><span  style='font-size:12.0px;line-height:150%;
                    '>(</span><span ><span style='font-size:12.0px;
                    line-height:150%;'>一</span></span><span 
                    style='font-size:12.0px;line-height:150%;'>) </span><span
                    style='font-size:12.0px;line-height:150%;'>乙方负责网店的设计装修、市场营销、分销推广策划与执行、商品管理等工作。因乙方的疏忽<span
                    >,</span><span >不</span>专业<span >,</span>错误引导等乙方过错导致的售后问题，由乙方承担相应责任。</span></p>

                    <p  style='text-indent:24.0px;
                    line-height:150%'><span style='font-size:12.0px;line-height:150%;'>（二）乙方在代运营服务有效期间<span >不</span>单方面使用甲方任何品牌、产品、账户资金、资料、账户做与该网店运营服务无关的事宜。该店铺的重大营销活动、店铺改版、品牌宣传策划等原则上须提前<span
                    style='background:yellow;'>两周</span>与甲方商议（但紧急情况除外）；</span></p>

                    <p  style='text-indent:24.0px;
                    line-height:150%'><span style='font-size:12.0px;line-height:150%;'>（三）乙方需提供甲方<a href="javascript:;"
                    target="_blank"><span style=''><span style='color:
                    windowtext'>网<span style=''>店</span><span
                    style=''><span style=''>托</span></span>管</span></span></a><a
                    ></a><a name="_Hlt10467414"></a><span
                    style=''></span>服务的保密工作，未经允许的情况下，不得将甲方的保密信息资料外泄。</span></p>

                    <p  style='text-indent:28.3px;
                    line-height:150%'><span  style='font-size:12.0px;line-height:150%;
                    '>(</span><span style='font-size:12.0px;line-height:150%;
                    '>四<span >) </span>在本协议终止后，乙方应于协议终止后一周内停止<span
                    >甲方网</span>店运营，但因甲方违约在先导致协议终止的或双方另有约定除外。</p>

                    <p  style='text-indent:28.3px;
                    line-height:150%'><span  style='font-size:12.0px;line-height:150%;
                    '>(</span><span style='font-size:12.0px;line-height:150%;
                    '>五<span >) </span>乙方须在不违背甲方品牌规划前提下对店铺进行设计装修，乙方同时有权依照销售状况对店铺所售商品进行陈列及促销调整，乙方应于陈列及促销方案调整前书面通知甲方并获得甲方许可方可执行，甲方应于通知送达后<span
                    >1</span>日内回复，逾期未回复的视为许可。</p>

                    <p  style='text-indent:28.3px;
                    line-height:150%'><span  style='font-size:12.0px;line-height:150%;
                    '>(</span><span style='font-size:12.0px;line-height:150%;
                    '>六<span >) </span>正常营业期间，乙方需按照甲方制定的价格或价格区间对产品进行定价<span
                    >,</span>如需调整产品的价格等信息<span >,</span>乙方应与甲方沟通并获得甲方同意之后进行操作。</span></p>

                    <p  style='text-indent:28.3px;
                    line-height:150%'><span  style='font-size:12.0px;line-height:150%;
                    '>(</span><span style='font-size:12.0px;line-height:150%;
                    '>七<span >) </span>在未获得甲方同意情况下<span >,</span>乙方不得在该网店销售与甲方要求无关的产品<span
                    >,</span>乙方不得直接从甲方以外的渠道进货（双方另有约定的除外）。</p>


                    <p  style='line-height:150%'><b><span style='font-size:14.0px;
                    line-height:150%;'>四、费用支付及结算模式</b></p>

                    <p  style='text-indent:28.3px;
                    line-height:150%'><span style='font-size:12.0px;line-height:150%;'>（一）乙方自本协议生效后实际<span >运营网</span>店之日起，每月向甲方收取代运营基础服务费：<u><span
                    >1000</span>元<span >/</span></u>月。同时甲方按月支付农联贡菜平台甲方月度销售金额<span
                    >2%</span>的代运营营销费用。</p>

                    <p  style='text-indent:28.3px;
                    line-height:150%'><span style='font-size:12.0px;line-height:150%;'>（二）乙方自本协议生效后，<u><span >3</span></u>个工作日内将代运营基础服务费<span
                    style='background:yellow;'>按年</span>支付给乙方指定账户，即<span
                    >&yen;12,000</span>元<span >/</span>年（大写：人民币壹万贰仟元每年），代运营营销费用自平台月度结算完成后<span
                    >3</span>个工作日内支付给乙方。</p>

                    <p  style='line-height:150%'><b><span style='font-size:14.0px;
                    line-height:150%;'>五、保密协议</span></b></p>

                    <p  style='text-indent:28.3px;
                    line-height:150%'><span style='font-size:12.0px;line-height:150%;'>（一）甲乙双方都有保守商业秘密的义务。保密的内容包括但不限于供货价格、商品价格、销售数据、客户信息等商业信息。双方均应对相互了解之有关各方的商业秘密及其他文档资料采取严格的保密措施。除履行法定的义务外，未经对方许可，本协议任何一方不得向其他第三</span>方透露。</p>

                    <p  style='text-indent:28.3px;
                    line-height:150%'><span style='font-size:12.0px;line-height:150%;'>（二）甲方所有权店铺的销售数据统计、客户个人信息等均属于甲方的商业机密，乙方及乙方的员工均不得采取任何非法的方式获取。如乙方确需获得相关数据信息，须向甲方提出申请，在获得批准后，才能从甲方相关部门获取。</span></p>

                    <p  style='line-height:150%'><b><span style='font-size:14.0px;
                    line-height:150%;'>六、协议的解除、终止及违约责任</b></p>

                    <p  style='text-indent:28.3px;
                    line-height:150%'><span style='font-size:12.0px;line-height:150%;'>（一）在本协议有效期届满前，任何一方不得单方面终止本协议，若一方擅自终止本协议，由此造成的任何损失由其承担。本协议终止情况下，双方应配合完成该店铺资料、费用清算及程序交接工作。</span></p>

                    <p  style='text-indent:28.3px;
                    line-height:150%'><span style='font-size:12.0px;line-height:150%;'>（二）下列任<span >一</span>情形出现的，对方可据此解除本协议并主张违约一方承担违约责任：</span></p>

                    <p  style='text-indent:28.3px;
                    line-height:150%'><span  style='font-size:12.0px;line-height:150%;
                    '>1. </span><span style='font-size:12.0px;line-height:150%;
                    '>甲方如不按时向乙方支付协议中约定的应得费用，乙方有权责令甲方在限期内补足并终止对甲方所提供的<span
                    >网店代运营</span>服务且无需承担任何违约责任，因甲方不按时支付乙方应得费用造成的损失，甲方全部承担，并且自逾期支付之日起，每逾期一日按乙方应得费用的万分之五缴纳滞纳金（即违约金<span
                    >=</span>乙方应收款项<span >*0.05%*</span>实际滞纳天数）。</span></p>

                    <p  style='text-indent:28.3px;
                    line-height:150%'><span  style='font-size:12.0px;line-height:150%;
                    '>2. </span><span style='font-size:12.0px;line-height:150%;
                    '>甲方所供产品不符合国家及行业关于该产品生产、质量、计量、环保的标准，乙方有权解除本协议并要求甲方承担年度代运营基础服务费<span
                    >30%</span>的违约金，违约金不足以弥补乙方损失的，甲方负责补足。</p>

                    <p  style='text-indent:28.3px;
                    line-height:150%'><span  style='font-size:12.0px;line-height:150%;
                    '>3. </span><span style='font-size:12.0px;line-height:150%;
                    '>乙方如违反协议及其附件、补充协议之约定构成违约的，或连续三个月未能达到服务及业绩规定的指标的，甲方有权立即终止该店铺的乙方代运营权利。</span></p>

                    <p  style='text-indent:28.3px;
                    line-height:150%'><span  style='font-size:12.0px;line-height:150%;
                    '>4. </span><span style='font-size:12.0px;line-height:150%;
                    '>双方对在本协议履行过程中以任何方式获知的另一方商业机密或技术及经营信息均负有保密责任，不得向任何第三方透漏或泄露。我国现行法律法规及政策中另有规定或得到另一方书面同意的除外。</span></p>

                    <p  style='text-indent:28.3px;
                    line-height:150%'><span  style='font-size:12.0px;line-height:150%;
                    '>5. </span><span style='font-size:12.0px;line-height:150%;
                    '>甲方违反独家授权的约定，在授权期间内再授权其他公司经营此店铺的，乙方有权解除本协议并向甲方主张年度代运营基础服务费<span
                    >30%</span>的违约金，违约金不足以弥补乙方损失的，甲方负责补足。</p>

                    <p  style='text-indent:28.3px;
                    line-height:150%'><span  style='font-size:12.0px;line-height:150%;
                    '>6</span><span style='font-size:12.0px;line-height:150%;
                    '>．任何一方拒绝履行或以其行为表明不再履行协议主要义务的，对方可据此解除本协议并要求违约方赔偿全部损失。 </span></p>

                    <p  style='text-indent:28.3px;
                    line-height:150%'><span style='font-size:12.0px;line-height:150%;'>（三）下列任<span >一</span>情形出现的，本协议即行终止：</p>

                    <p  style='text-indent:28.3px;
                    line-height:150%'><span  style='font-size:12.0px;line-height:150%;
                    '>1</span><span style='font-size:12.0px;line-height:150%;
                    '>． 双方约定的协议终止条件出现的；</p>

                    <p  style='text-indent:28.3px;
                    line-height:150%'><span  style='font-size:12.0px;line-height:150%;
                    '>2</span><span style='font-size:12.0px;line-height:150%;
                    '>． 任何一方依法破产、结算的；</p>

                    <p  style='text-indent:28.3px;
                    line-height:150%'><span  style='font-size:12.0px;line-height:150%;
                    '>3</span><span style='font-size:12.0px;line-height:150%;
                    '>． 协议有效期届满、双方未续约的。</p>



                    <p  style='line-height:150%'><b><span style='font-size:14.0px;
                    line-height:150%;'>七、不可抗力与免责</b></p>

                    <p  style='text-indent:28.3px;
                    line-height:150%'><span style='font-size:12.0px;line-height:150%;'>（一）“不可抗力”是指所有超出本协议双方合理控制范围的事件，该事件应不可预见，或虽然可以预见，但通过合理努力无法阻止或避免其发生，如自然灾害、战争、网络故障、服务器被黑客攻击等等，且这类事件发生于本协议签字之后，并且阻止任何一方全部或部分履行本协议。</span></p>

                    <p  style='text-indent:28.3px;
                    line-height:150%'><span style='font-size:12.0px;line-height:150%;'>（二）如果符合所有上述条件，一方未履行其本协议项下的任何义务，则应免责不构成违约：</p>

                    <p  style='text-indent:28.3px;
                    line-height:150%'><span  style='font-size:12.0px;line-height:150%;
                    '>1</span><span style='font-size:12.0px;line-height:150%;
                    '>． 如果不可抗力事件致使该方未能全部履行其在本协议项下的义务；</p>

                    <p  style='text-indent:28.3px;
                    line-height:150%'><span  style='font-size:12.0px;line-height:150%;
                    '>2</span><span style='font-size:12.0px;line-height:150%;
                    '>． 双方应立即相互协商以找出合理解决办法并应尽所有合理的努力尽可能地减小不可抗力的后果；</p>

                    <p  style='text-indent:28.3px;
                    line-height:150%'><span  style='font-size:12.0px;line-height:150%;
                    '>3</span><span style='font-size:12.0px;line-height:150%;
                    '>． 在不可抗力事件发生后的<span >5</span>日内，该方应书面通知对方，解释其未履行及不能完全履行其在本协议项下的义务之原因，并且其履行本协议的期限应延长，延长期应与不可抗力事件造成的拖延相同。</span></p>


                    <p  style='line-height:150%'><b><span style='font-size:14.0px;
                    line-height:150%;'>八、其他</b></p>

                    <p  style='text-indent:28.3px;
                    line-height:150%'><span style='font-size:12.0px;line-height:150%;'>（一）本协议自双方签订之日起生效。</p>

                    <p  style='text-indent:28.3px;
                    line-height:150%'><span style='font-size:12.0px;line-height:150%;'>（二）本协议未约定事项，可由双方另行签订书面补充协议，本协议的补充协议或附件、附则与本协议具有同等的法律效力。</p>

                    <p  style='text-indent:28.3px;
                    line-height:150%'><span style='font-size:12.0px;line-height:150%;'>（三）双方如有纠纷应友好协商解决，如协商不成则提交所在地人民法院诉讼解决。</p>

                    <p  style='text-indent:28.3px;
                    line-height:150%'><span style='font-size:12.0px;line-height:150%;'>（以下为签署页，无正文）</p>


                    <p  align=left style='text-align:left;line-height:150%'><b><span
                    style='font-size:14.0px;line-height:150%;'>附件<span >1</span></span></b></p>

                    <p  align=center style='text-align:center;line-height:150%'><b
                    style='mso-bidi-font-weight:normal'><span style='font-size:18.0px;line-height:
                    150%;'>授<span ><span
                    style=''>&nbsp; </span></span>权<span ><span
                    style=''>&nbsp; </span></span>书</b></p>


                    <p  style='line-height:150%'><span style='font-size:14.0px;
                    line-height:150%;'>致：<span >农联高科</span>科技发展有限公司</span></p>

                    <p  align=left style='text-align:left;text-indent:28.0px;
                    line-height:150%'><span style='font-size:14.0px;
                    line-height:150%;'>兹授予我公司农联店经营权。经营细则及授权范围以《店铺托管合作协议》为准。</span></p>

                    <p  style='text-indent:28.0px;
                    line-height:150%'><span style='font-size:14.0px;line-height:150%;'>本公司<span >承诺此</span>授权为独家授权，在授权期间内不再授权其他公司经营此店铺。</span></p>


                </div>
            `;
        }
        if (this.type == 3){
            this.$post('/?c=user&a=rule', {
                type:3,
            }).then((res) => {
                if(res.code===0){
                    this.title=res.data.title
                    this.status=3
                    this.content=res.data.content
                }else if(res.code == 1){
                   this.$toast(res.msg);
                }
            }); 
        }
        if (this.type == 2){
            this.title='隐私条约'
            this.status=2
            this.content=`
                <div class=WordSection1 style='layout-grid:15.6pt'>

                <p align=center style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;
                margin-left:0cm;text-align:center;'><strong><span
                style='font-size:14.5pt;font-family:宋体;color:black'>隐私权政策</span></strong></p>

                <p align=right style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;
                margin-left:0cm;text-align:right;text-indent:16.95pt;line-height:10.9pt;
                '><span lang=EN-US style='font-size:7.5pt;font-family:"微软雅黑",sans-serif;
                color:#333333'>&nbsp;</span></p>

                <p align=right style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;
                margin-left:0cm;text-align:right;text-indent:16.95pt;line-height:10.9pt;
                '><span style='font-size:9.5pt;color:black'>最近更新日期：</span><span
                lang=EN-US style='font-size:9.5pt;color:#333333'>2019</span><span
                style='font-size:9.5pt;color:black'>年<span lang=EN-US>&nbsp; </span>月<span
                lang=EN-US>&nbsp; </span>日</span></p>

                <p align=right style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;
                margin-left:0cm;text-align:right;text-indent:16.95pt;line-height:10.9pt;
                '><span lang=EN-US style='font-size:7.5pt;font-family:"微软雅黑",sans-serif;
                color:#333333'>&nbsp;</span></p>

                <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                0cm;'><strong><span style='font-size:11.5pt;font-family:宋体;
                color:black'>提示条款</span></strong></p>

                <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                0cm;text-indent:16.95pt;'><span lang=EN-US style='font-size:
                9.5pt;font-family:"微软雅黑",sans-serif;color:#333333'>&nbsp;</span><span
                style='font-size:9.5pt;color:black'>您的信任对我们非常重要，我们深知个人信息对您的重要性，我们将按法律法规要求，采取相应安全保护措施，尽力保护您的个人信息安全可控。鉴于此，农联贡菜网服务提供者（或简称“我们”）制定本《隐私权政策》（下称“本政策</span><span
                lang=EN-US style='font-size:9.5pt;font-family:"微软雅黑",sans-serif;color:#333333'>&nbsp;/</span><span
                style='font-size:9.5pt;color:black'>本隐私权政策”）并提醒您：</span></p>

                <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                0cm;text-indent:16.95pt;line-height:10.9pt;'><span
                style='font-size:9.5pt;color:black'>本政策适用于农联贡菜网提供的所有产品和服务。<strong><u><span
                style='font-family:宋体'>如我们及关联公司（范围详见定义部分）的产品或服务中使用了农联贡菜网提供的产品或服务（例如使用农联贡菜平台账户登录）但未设独立隐私权政策的，则本政策同样适用于该部分产品或服务。我们及关联公司就其向您提供的产品或服务单独设立有隐私权政策的（如</span></u></strong></span><span
                lang=EN-US><a
                href="javascript:;"><span
                lang=EN-US style='font-size:9.5pt;color:#C0504D;text-decoration:none'><span
                lang=EN-US>《农联贡菜隐私权政策》</span></span></a></span><strong><u><span
                style='font-size:9.5pt;font-family:宋体;color:black'>），则相应产品或服务适用相应隐私权政策。</span></u></strong></p>

                <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                0cm;line-height:10.9pt;'><span lang=EN-US style='font-size:
                9.5pt;font-family:"微软雅黑",sans-serif;color:#333333'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><span
                style='font-size:9.5pt;color:black'>需要特别说明的是，<strong><u><span style='font-family:
                宋体'>本政策不适用于其他第三方向您提供的服务，也不适用于农联贡菜网中已另行独立设置隐私权政策的产品或服务。</span></u></strong>例如农联贡菜网上的卖家依托农联贡菜网向您提供服务时，您向卖家提供的个人信息不适用本政策。</span></p>

                <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                0cm;text-indent:16.95pt;line-height:10.9pt;'><strong><u><span
                style='font-size:9.5pt;font-family:宋体;color:black'>在使用农联贡菜网各项产品或服务前，请您务必仔细阅读并透彻理解本政策，特别是以粗体<span
                lang=EN-US>/</span>粗体下划线标识的条款，您应重点阅读，在确认充分理解并同意后再开始使用。</span></u></strong><span
                style='font-size:9.5pt;color:black'>如对本政策内容有任何疑问、意见或建议，您可通过农联贡菜网提供的各种</span><span
                lang=EN-US><a href="javascript:;"><b><i><span
                lang=EN-US style='font-size:9.5pt;color:#C0504D;text-decoration:none'><span
                lang=EN-US>联系方式</span></span></i></b></a></span><span style='font-size:9.5pt;
                color:black'>与我们联系。</span></p>

                <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                0cm;'><strong><span lang=EN-US style='font-size:11.5pt;
                font-family:宋体;color:black'>&nbsp;</span></strong></p>

                <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                0cm;'><strong><span style='font-size:11.5pt;font-family:宋体;
                color:black'>第一部分</span></strong><strong><span lang=EN-US style='font-size:
                11.5pt;font-family:"微软雅黑",sans-serif;color:#333333'>&nbsp;</span></strong><strong><span
                style='font-size:11.5pt;font-family:宋体;color:black'>定义</span></strong></p>

                <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                0cm;text-indent:16.95pt;line-height:10.9pt;'><strong><span
                style='font-size:9.5pt;font-family:宋体;color:black'>农联贡菜网：</span></strong><span
                style='font-size:9.5pt;color:black'>指农联贡菜网（域名为</span><span lang=EN-US
                style='font-size:9.5pt;font-family:"微软雅黑",sans-serif;color:#333333'>&nbsp;https://b2b.nlyz365.com/</span><span
                style='font-size:9.5pt;color:black'>）网站及农联贡菜客户端。</span></p>

                <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                0cm;text-indent:16.95pt;line-height:10.9pt;'><strong><span
                style='font-size:9.5pt;font-family:宋体;color:black'>个人信息：</span></strong><span
                style='font-size:9.5pt;color:black'>指以电子或者其他方式记录的能够单独或者与其他信息结合识别特定自然人身份或者反映特定自然人活动情况的各种信息。</span></p>

                <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                0cm;text-indent:16.95pt;line-height:10.9pt;'><strong><span
                style='font-size:9.5pt;font-family:宋体;color:black'>个人敏感信息：</span></strong><strong><span
                style='font-size:9.5pt;font-family:宋体;color:black;font-weight:normal'>指</span></strong><span
                style='font-size:9.5pt;color:black'>包括身份证件号码、个人生物识别信息、银行账号、财产信息、行踪轨迹、交易信息、</span><span
                lang=EN-US style='font-size:9.5pt;font-family:"微软雅黑",sans-serif;color:#333333'>14</span><span
                style='font-size:9.5pt;color:black'>岁以下（含）儿童信息等的个人信息（我们将在本隐私权政策中对具体个人敏感信息以<strong><span
                style='font-family:宋体'>粗体</span></strong>进行显著标识）。</span></p>

                <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                0cm;text-indent:16.95pt;line-height:10.9pt;'><strong><span
                style='font-size:9.5pt;font-family:宋体;color:black'>个人信息删除：</span></strong><span
                style='font-size:9.5pt;color:black'>指在实现日常业务功能所涉及的系统中去除个人信息的行为，使其保持不可被检索、访问的状态。</span></p>

                <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                0cm;text-indent:16.95pt;line-height:10.9pt;'><span
                style='font-size:9.5pt;color:black'>除另有约定外，本政策所用定义与</span><span lang=EN-US><a
                href="javascript:;"><b><i><span
                lang=EN-US style='font-size:9.5pt;color:#C0504D;text-decoration:none'><span
                lang=EN-US>《农联贡菜平台服务协议》</span></span></i></b></a></span><span style='font-size:
                9.5pt;color:black'>中的定义具有相同的涵义。</span></p>

                <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                0cm;'><span lang=EN-US style='font-size:7.5pt;font-family:"Tahoma",sans-serif;
                color:#333333'>&nbsp;</span></p>

                <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                0cm;'><strong><span style='font-size:11.5pt;font-family:宋体;
                color:black'>第二部分</span></strong><strong><span lang=EN-US style='font-size:
                11.5pt;font-family:"微软雅黑",sans-serif;color:#333333'>&nbsp;&nbsp;</span></strong><strong><span
                style='font-size:11.5pt;font-family:宋体;color:black'>隐私权政策</span></strong></p>

                <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                0cm;text-indent:16.95pt;line-height:10.9pt;'><span lang=EN-US
                style='font-size:9.5pt;font-family:"微软雅黑",sans-serif;color:#333333'>&nbsp;</span></p>

                <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                0cm;text-indent:16.95pt;line-height:10.9pt;'><span
                style='font-size:9.5pt;color:black'>本隐私权政策部分将帮助您了解以下内容：</span></p>

                <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                0cm;text-indent:16.95pt;line-height:10.9pt;'><span
                style='font-size:9.5pt;color:black'>一、我们如何收集和使用您的信息</span></p>

                <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                0cm;text-indent:16.95pt;line-height:10.9pt;'><span
                style='font-size:9.5pt;color:black'>二、我们如何使用<span lang=EN-US>Cookie</span>和同类技术</span></p>

                <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                0cm;text-indent:16.95pt;line-height:10.9pt;'><span
                style='font-size:9.5pt;color:black'>三、我们如何共享、转让、公开披露您的信息</span></p>

                <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                0cm;text-indent:16.95pt;line-height:10.9pt;'><span
                style='font-size:9.5pt;color:black'>四、我们如何保护您的信息</span></p>

                <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                0cm;text-indent:16.95pt;line-height:10.9pt;'><span
                style='font-size:9.5pt;color:black'>五、您如何管理您的信息</span></p>

                <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                0cm;text-indent:16.95pt;line-height:10.9pt;'><span
                style='font-size:9.5pt;color:black'>六、我们如何处理未成年人的信息</span></p>

                <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                0cm;text-indent:16.95pt;line-height:10.9pt;'><span
                style='font-size:9.5pt;color:black'>七、本隐私权政策如何更新</span></p>

                <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                0cm;text-indent:16.95pt;line-height:10.9pt;'><span
                style='font-size:9.5pt;color:black'>八、如何联系我们</span></p>

                <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                0cm;'><span lang=EN-US style='font-size:7.5pt;font-family:"Tahoma",sans-serif;
                color:#333333'>&nbsp;</span></p>

                <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                21.2pt;line-height:10.9pt;'><strong><span style='font-size:
                9.5pt;font-family:宋体;color:black'>一、<span lang=EN-US>&nbsp;</span>我们如何收集和使用您的信息</span></strong></p>

                <p style='margin-top:7.25pt;margin-right:0cm;margin-bottom:0cm;margin-left:
                0cm;margin-bottom:.0001pt;text-indent:19.35pt;line-height:12.1pt;background:
                white'><span style='font-size:9.5pt;color:black'>在您使用我们的产品及<span lang=EN-US>/</span>或服务时，我们需要<span
                lang=EN-US>/</span>可能需要收集和使用的您的个人信息包括如下两种：</span></p>

                <p style='margin-top:7.25pt;margin-right:0cm;margin-bottom:0cm;margin-left:
                0cm;margin-bottom:.0001pt;text-indent:19.35pt;line-height:12.1pt;background:
                white'><span lang=EN-US style='font-size:9.5pt;color:black'>1</span><span
                style='font-size:9.5pt;color:black'>、</span><strong><span style='font-size:
                9.5pt;font-family:宋体;color:#333333'>为实现向您提供我们产品及<span lang=EN-US>/</span>或服务的基本功能，您须授权我们收集、使用的必要的信息。如您拒绝提供相应信息，您将无法正常使用我们的产品及<span
                lang=EN-US>/</span>或服务；</span></strong></p>

                <p style='margin-top:7.25pt;margin-right:0cm;margin-bottom:0cm;margin-left:
                0cm;margin-bottom:.0001pt;text-indent:19.35pt;line-height:12.1pt;background:
                white'><span lang=EN-US style='font-size:9.5pt;color:black'>2</span><span
                style='font-size:9.5pt;color:black'>、</span><strong><span style='font-size:
                9.5pt;font-family:宋体;color:#333333'>为实现向您提供我们产品及<span lang=EN-US>/</span>或服务的附加功能，您可选择授权我们收集、使用的信息。如您拒绝提供，您将无法正常使用相关附加功能或无法达到我们拟达到的功能效果，但并不会影响您正常使用我们产品及<span
                lang=EN-US>/</span>或服务的基本功能。</span></strong></p>

                <p style='margin-top:7.25pt;margin-right:0cm;margin-bottom:0cm;margin-left:
                0cm;margin-bottom:.0001pt;text-indent:19.35pt;line-height:12.1pt;background:
                white'><strong><u><span style='font-size:9.5pt;font-family:宋体;color:#333333'>您理解并同意：</span></u></strong></p>

                <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                0cm;text-indent:19.35pt;line-height:12.1pt;'><strong><span
                lang=EN-US style='font-size:9.5pt;font-family:宋体;color:#333333'>1</span></strong><strong><span
                style='font-size:9.5pt;font-family:宋体;color:#333333'>、<u>我们致力于打造多样的产品和服务以满足您的需求。因我们向您提供的产品和服务种类众多，且不同用户选择使用的具体产品<span
                lang=EN-US>/</span>服务范围存在差异，相应的，基本<span lang=EN-US>/</span>附加功能及收集使用的个人信息类型、范围等会有所区别，请以具体的产品<span
                lang=EN-US>/</span>服务功能为准</u>；</span></strong></p>

                <p style='margin-top:7.25pt;margin-right:0cm;margin-bottom:0cm;margin-left:
                0cm;margin-bottom:.0001pt;text-indent:19.35pt;line-height:12.1pt;background:
                white'><strong><span lang=EN-US style='font-size:9.5pt;font-family:宋体;
                color:#333333'>2</span></strong><strong><span style='font-size:9.5pt;
                font-family:宋体;color:#333333'>、<u>为给您带来更好的产品和服务体验，我们在持续努力改进我们的技术，随之我们可能会不时推出新的或优化后的功能，可能需要收集、使用新的个人信息或变更个人信息使用目的或方式。对此，我们将通过更新本政策、弹窗、页面提示等方式另行向您说明对应信息的收集目的、范围及使用方式，并为您提供自主选择同意的方式，且在征得您明示同意后收集、使用</u>。</span></strong><span
                style='font-size:9.5pt;color:black'>在此过程中，如果您有任何疑问、意见或建议的，您可通过农联贡菜网提供的各种</span><span
                lang=EN-US><a href="javascript:;"><b><i><span
                lang=EN-US style='font-size:9.5pt;color:#3B8FD9;text-decoration:none'><span
                lang=EN-US>联系方式</span></span></i></b></a></span><span style='font-size:9.5pt;
                color:black'>与我们联系，我们会尽快为您作出解答。</span></p>

                <p style='margin-top:7.25pt;margin-right:0cm;margin-bottom:0cm;margin-left:
                0cm;margin-bottom:.0001pt;text-indent:19.35pt;line-height:12.1pt;background:
                white'><span lang=EN-US style='font-size:9.5pt;color:black'><br>
                <br>
                </span></p>

                <p style='margin-top:7.25pt;margin-right:0cm;margin-bottom:0cm;margin-left:
                0cm;margin-bottom:.0001pt;text-indent:19.35pt;line-height:12.1pt;background:
                white'><span style='font-size:9.5pt;color:black'>我们会为实现本政策下述的各项功能，收集和使用您的个人信息：</span></p>

                <p style='margin-top:7.25pt;margin-right:0cm;margin-bottom:0cm;margin-left:
                0cm;margin-bottom:.0001pt;text-indent:19.35pt;line-height:12.1pt;background:
                white'><strong><span style='font-size:9.5pt;font-family:宋体;color:black'>（一）<span
                lang=EN-US>&nbsp;</span>帮助您成为我们的会员</span></strong></p>

                <p style='margin-top:7.25pt;margin-right:0cm;margin-bottom:0cm;margin-left:
                0cm;margin-bottom:.0001pt;text-indent:19.35pt;line-height:12.1pt;background:
                white'><strong><span lang=EN-US style='font-size:9.5pt;font-family:宋体;
                color:black'>1</span></strong><strong><span style='font-size:9.5pt;font-family:
                宋体;color:black'>、基础会员服务</span></strong></p>

                <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                0cm;text-indent:19.35pt;line-height:10.9pt;'><span
                style='font-size:9.5pt;color:black'>我们通过农联贡菜平台账户为您提供基础会员服务。为注册成为会员并使用我们的会员服务，您需要提供<strong><span
                style='font-family:宋体'>手机号码、拟使用的会员名和密码</span></strong>用于创建农联贡菜平台账户。如果您仅需使用浏览、搜索服务，您不需要注册成为我们的会员及提供上述信息。</span></p>

                <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                0cm;text-indent:19.35pt;line-height:10.9pt;'><strong><u><span
                style='font-size:9.5pt;font-family:宋体;color:black'>对于需要通过农联贡菜平台账户才能使用的服务，我们可能会根据您提供的上述信息校验您的会员身份，确保我们是在为您本人提供服务。</span></u></strong></p>

                <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                0cm;text-indent:19.35pt;line-height:10.9pt;'><span
                style='font-size:9.5pt;color:black'>我们会根据您的会员账户使用情况及平台设置的会员等级计算规则确定您当前的会员等级，并为您提供相应会员等级所对应的基本权益。</span></p>

                <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                20.45pt;text-indent:-1.55pt;line-height:10.9pt;'><b><span
                lang=EN-US style='font-size:9.5pt;color:black'>2</span></b><strong><span
                style='font-size:9.5pt;font-family:宋体;color:black'>、附加会员服务</span></strong></p>

                <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                0cm;text-indent:19.35pt;line-height:10.9pt;'><span
                style='font-size:9.5pt;color:black'>特别会员权益：如果您选择提供<strong><span
                style='font-family:宋体'>真实姓名、性别、出生年月日、居住地、</span></strong></span><span
                style='font-size:9.5pt;color:#333333'>昵称、头像</span><span style='font-size:9.5pt;
                color:black'>等非注册必须的个人资料，我们可以为您提供会员生日特权等更加个性化的会员服务。<strong><span
                style='font-family:宋体'>其中，为保证交易辨识度，您的昵称、头像将公开显示。</span></strong></span></p>

                <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                0cm;text-indent:19.35pt;'><span style='font-size:9.5pt;
                color:#333333'>实人认证：您可以根据认证要求向我们提供相应的<strong><span style='font-family:宋体'>身份信息（身份证、护照、户口本及其他身份证件信息）、生物识别特征（静态或动态的面部特征）</span></strong>以完成实人认证。若您要使用账户增强保护功能，除可选择完成上述实人认证外，您还可以选择开启声纹密保或者扫脸登录，提供<strong><span
                style='font-family:宋体'>声纹</span></strong>或者<strong><span style='font-family:
                宋体'>面部特征信息</span></strong>。</span></p>

                <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                0cm;text-indent:19.35pt;line-height:10.9pt;'><span
                style='font-size:9.5pt;color:black'>授权登录：</span><span style='font-size:9.5pt;
                color:#333333'>我们可能经您同意后向第三方共享您的账户信息（头像、昵称及其他页面提示的信息），使您可以便捷地实现第三方账户的注册或登录。此外，我们可能会根据您的授权从第三方处获取您的</span><span
                style='font-size:9.5pt;color:black'>第三方账户信息，并与您的农联贡菜平台账户进行绑定，使您可通过第三方账户直接登录、使用我们的产品及<span
                lang=EN-US>/</span>或服务。我们将在您授权同意的范围内使用您的相关信息。</span></p>

                <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                0cm;text-indent:19.35pt;line-height:10.9pt;'><strong><u><span
                style='font-size:9.5pt;font-family:宋体;color:black'>其他会员角色服务：如果您申请注册成为卖家、服务商或其他存在额外身份认证要求的会员角色，您需主动向我们提供身份信息及<span
                lang=EN-US>/</span>或企业相关信息，或授权我们自支付宝公司处获取您对应支付宝账户的上述相关认证信息，用于您身份及特殊会员角色获取资格的核验、登记、公示及其他我们明确告知的目的。</span></u></strong><b><u><span
                lang=EN-US style='font-size:9.5pt;color:black'><br>
                <br>
                </span></u></b></p>

                <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                0cm;text-indent:19.35pt;line-height:10.9pt;'><strong><u><span
                lang=EN-US style='font-size:9.5pt;font-family:宋体;color:black'>3</span></u></strong><strong><u><span
                style='font-size:9.5pt;font-family:宋体;color:black'>、账户信息展示：如果您已拥有农联贡菜平台账户，我们可能会在农联贡菜平台服务中显示您的上述个人信息（实人认证仅显示认证是否通过的结果），以及您在农联贡菜平台上或与农联贡菜平台账户相关联的产品和服务中执行的操作（</span></u></strong><span
                style='font-size:9.5pt;color:black'>您可通过农联贡菜平台账户在我们提供的农联贡菜网<span lang=EN-US>/</span>手机农联贡菜首页、“必备工具”、“添加卡片”链接入口或其他产品<span
                lang=EN-US>/</span>服务入口使用我们及<span lang=EN-US>/</span>或关联公司提供的产品或服务）<strong><u><span
                style='font-family:宋体'>，包括通过农联贡菜平台账户集中展示您的个人资料、优惠权益、交易订单。我们会尊重您对农联贡菜平台服务和农联贡菜平台账户设置所做的选择。</span></u></strong></span></p>

                <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                9.45pt;text-indent:8.0pt;line-height:10.9pt;'><span lang=EN-US
                style='font-size:9.5pt;color:black'><br>
                </span><span style='font-size:9.5pt;color:black'>（二）<span lang=EN-US>&nbsp;</span><strong><span
                style='font-family:宋体'>为您提供商品或服务信息展示</span></strong></span></p>

                <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                0cm;text-indent:19.35pt;'><span style='font-size:9.5pt;
                color:#333333'>在您使用我们服务过程中，为识别账号异常状态、了解产品适配性、向您提供更契合您需求的页面展示和搜索结果，我们可能会自动收集您的使用情况并存储为网络日志信息，包括：</span></p>

                <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                0cm;text-indent:19.35pt;'><span style='font-size:9.5pt;
                color:#333333'>设备信息：我们会根据您在软件安装及<span lang=EN-US>/</span>或使用中的具体操作，接收并记录您所使用的设备相关信息（包括设备型号、操作系统版本、设备设置、唯一设备标识符、设备环境等软硬件特征信息）、设备所在位置相关信息（包括您授权的<span
                lang=EN-US>GPS</span>位置以及<span lang=EN-US>WLAN</span>接入点、蓝牙和基站等传感器信息）。</span></p>

                <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                0cm;text-indent:19.35pt;'><span style='font-size:9.5pt;
                color:#333333'>服务日志信息：当您使用我们的网站或客户端提供的产品或服务时，我们会自动收集您对我们服务的详细使用情况，作为服务日志保存，包括浏览、点击查看、搜索查询、收藏、添加至购物车、交易、售后、关注分享信息、发布信息，以及<span
                lang=EN-US>IP</span>地址、浏览器类型、电信运营商、使用语言、访问日期和时间。</span></p>

                <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                0cm;text-indent:19.35pt;'><strong><u><span style='font-size:
                9.5pt;font-family:宋体;color:#333333'>请注意，单独的设备信息、服务日志信息是无法识别特定自然人身份的信息。</span></u></strong><span
                style='font-size:9.5pt;color:#333333'>如果我们将这类非个人信息与其他信息结合用于识别特定自然人身份，或者将其与个人信息结合使用，则在结合使用期间，这类非个人信息将被视为个人信息，除取得您授权或法律法规另有规定外，我们会将这类信息做匿名化、去标识化处理。</span></p>

                <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                0cm;text-indent:19.35pt;'><strong><u><span style='font-size:
                9.5pt;font-family:宋体;color:#333333'>为向您提供更便捷、更符合您个性化需求的信息展示、搜索及推送服务，我们会根据您的设备信息和服务日志信息，提取您的偏好特征，并基于特征标签产出间接人群画像，用于展示、推送信息和可能的商业广告。</span></u></strong></p>

                <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                0cm;text-indent:19.35pt;'><span style='font-size:9.5pt;
                color:#333333'>如果您不想接受我们给您发送的商业广告，您可通过短信提示回复退订或我们提供的其他方式进行退订或关闭。在您使用我们提供的站内搜索服务时，我们也同时提供了不针对您个人特征的选项。</span></p>

                <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                0cm;text-indent:19.35pt;'><span style='font-size:9.5pt;
                color:#333333'>此外，我们也会为了不断改进和优化上述的功能来使用您的上述信息。</span></p>

                <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                0cm;text-indent:19.35pt;'><b><span lang=EN-US style='font-size:
                9.5pt;color:black'><br>
                <br>
                </span></b></p>

                <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                0cm;text-indent:19.35pt;'><strong><span style='font-size:9.5pt;
                font-family:宋体;color:black'>（三）<span lang=EN-US>&nbsp;</span></span></strong><strong><span
                style='font-size:9.5pt;font-family:宋体;color:#333333'>为您提供收藏、加购、关注与分享功能</span></strong></p>

                <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                0cm;text-indent:19.35pt;'><span style='font-size:9.5pt;
                color:#333333'>在您浏览我们网站或客户端的过程中，您可以选择对感兴趣的商品及<span lang=EN-US>/</span>或服务进行收藏、添加至购物车、与您感兴趣的商家<span
                lang=EN-US>/</span>品牌<span lang=EN-US>/</span>其他会员建立关注关系、通过我们提供的功能组件向其他第三方分享信息。在您使用上述功能的过程中，我们会收集包括您的收藏及添加购物车的记录、关注关系、分享历史在内的服务日志信息用于实现上述功能及其他我们明确告知的目的。</span></p>

                <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                0cm;text-indent:19.35pt;'><b><span lang=EN-US style='font-size:
                9.5pt;font-family:"微软雅黑",sans-serif;color:#333333'><br>
                <br>
                </span></b></p>

                <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                0cm;text-indent:19.35pt;'><span style='font-size:9.5pt;
                color:#333333'>（四）<b>帮<strong><span style='font-family:宋体'>助您完成下单及订单管理</span></strong></b></span></p>

                <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                0cm;text-indent:19.35pt;line-height:10.9pt;'><span
                style='font-size:9.5pt;color:black'>当您在我们的产品及<span lang=EN-US>/</span>或服务中订购具体商品及<span
                lang=EN-US>/</span>或服务时，我们会通过系统为您生成购买该商品及<span lang=EN-US>/</span>或服务的订单。在下单过程中<span
                lang=EN-US>,</span>您需至少提供您的<strong><span style='font-family:宋体'>收货人姓名、收货地址、收货人联系电话</span></strong>，同时该订单中会载明您所购买的商品及<span
                lang=EN-US>/</span>或服务信息、具体订单号、订单创建时间、您应支付的金额，我们收集这些信息是为了帮助您顺利完成交易、保障您的交易安全、查询订单信息、提供客服与售后服务及其他我们明确告知的目的。</span></p>

                <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                0cm;text-indent:19.35pt;'><span style='font-size:9.5pt;
                color:#333333'>您可以通过农联贡菜网为其他人订购商品及<span lang=EN-US>/</span>或服务，您需要提供该实际订购人的前述个人信息。</span></p>

                <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                0cm;text-indent:19.35pt;'><span style='font-size:9.5pt;
                color:#333333'>为便于您了解查询订单信息并对订单信息进行管理，我们会收集您在使用我们服务过程中产生的订单信息用于向您展示及便于您对订单进行管理。<span
                lang=EN-US>&nbsp;</span></span></p>

                <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                0cm;text-indent:16.95pt;'><span style='font-size:9.5pt;
                color:black'>您可额外填写<span lang=EN-US>/</span>选择包括<strong><span style='font-family:
                宋体'>其他联系电话</span></strong>、收货时间在内的更多附加信息以确保商品或服务的准确送达</span><span
                style='font-size:9.5pt;color:#333333'>。</span></p>

                <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                0cm;text-indent:16.95pt;'><span lang=EN-US style='font-size:
                9.5pt;color:#333333'>&nbsp;</span></p>

                <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                0cm;text-indent:16.95pt;'><strong><span style='font-size:9.5pt;
                font-family:宋体;color:black'>（五）<span lang=EN-US>&nbsp;</span>帮助您完成支付<span
                lang=EN-US>&nbsp;</span></span></strong></p>

                <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                0cm;text-indent:16.95pt;'><span style='font-size:9.5pt;
                color:#333333'>为完成订单支付，您需要提供<strong><span style='font-family:宋体'>支付宝账户</span></strong>并选择付款方式，<strong><span
                style='font-family:宋体'>我们会将您的农联贡菜平台账户会员名、对应的支付宝账户会员名、订单支付相关信息及其他反洗钱法律要求的必要信息与支付宝公司共享。如您选择由其他金融机构为您提供支付服务的，我们还会将您的包括银行卡号、有效期在内的银行卡支付必要信息与您选择的相应金融机构共享。</span></strong></span></p>

                <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                0cm;text-indent:19.35pt;'><span style='font-size:9.5pt;
                color:#333333'>您可以请求其他人为您付款，那么您需要提供<strong><span style='font-family:宋体'>代付人的支付宝账户及</span></strong></span><strong><span
                lang=EN-US style='font-size:9.5pt;font-family:"微软雅黑",sans-serif;color:#333333'>/</span></strong><strong><span
                style='font-size:9.5pt;font-family:宋体;color:#333333'>或手机号码</span></strong><span
                style='font-size:9.5pt;color:#333333'>。</span></p>

                <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                0cm;text-indent:19.35pt;line-height:10.9pt;'><span
                style='font-size:9.5pt;color:black'>为</span><span style='font-size:9.5pt;
                color:#333333'>使我们及时获悉并确认您的</span><span style='font-size:9.5pt;color:black'>支付进度及状态，为您提供售后与争议解决服务，您同意我们可自您所选择的交易对象、支付宝公司或您选择的其他金融机构处收集与支付进度相关信息。</span></p>

                <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                0cm;text-indent:19.35pt;line-height:10.9pt;'><b><span
                lang=EN-US style='font-size:9.5pt;color:black'><br>
                <br>
                </span></b></p>

                <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                0cm;text-indent:19.35pt;line-height:10.9pt;'><strong><span
                style='font-size:9.5pt;font-family:宋体;color:black'>（六）<span lang=EN-US>&nbsp;</span>帮助向您完成商品或服务的交付</span></strong></p>

                <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                0cm;text-indent:19.35pt;line-height:10.9pt;'><span
                style='font-size:7.5pt;color:#333333'>为保证您购买的商品及</span><span lang=EN-US
                style='font-size:7.5pt;font-family:"Tahoma",sans-serif;color:#333333'>/</span><span
                style='font-size:7.5pt;color:#333333'>或服务能够顺利、安全、准确送达，我们会向为农联贡菜平台提供物流信息系统和技术服务的浙江菜鸟供应链管理有限公司披露</span><b><span
                style='font-size:10.5pt;color:#333333'>订单相关配送信息</span></b><span
                style='font-size:7.5pt;color:#333333'>，并由其根据商品及</span><span lang=EN-US
                style='font-size:7.5pt;font-family:"Tahoma",sans-serif;color:#333333'>/</span><span
                style='font-size:7.5pt;color:#333333'>或服务提供主体的指定向相应的物流配送主体同步相关配送信息。您知晓并同意相应物流配送主体不可避免地获知及使用您的配送信息，用于完成交付目的。</span></p>

                <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                0cm;text-indent:19.35pt;line-height:10.9pt;'><span
                style='font-size:7.5pt;color:#333333'>为使我们及时获悉并确认交付进度及状态，向您提供售后与争议解决服务，您同意我们可自物流相关服务主体处收集与交付进度相关信息。</span></p>

                <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:0cm;margin-left:
                0cm;margin-bottom:.0001pt;text-indent:19.35pt;line-height:10.9pt;background:
                white'><b><span lang=EN-US style='font-size:9.5pt;color:black'><br>
                <br>
                </span></b></p>

                <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:0cm;margin-left:
                0cm;margin-bottom:.0001pt;text-indent:19.35pt;line-height:10.9pt;background:
                white'><strong><span style='font-size:9.5pt;font-family:宋体;color:black'>（七）<span
                lang=EN-US>&nbsp;</span>客服及争议处理</span></strong></p>

                <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                0cm;text-indent:19.35pt;'><span style='font-size:9.5pt;
                color:#333333'>当您与我们联系或提出售中售后、争议纠纷处理申请时，为了保障您的账户及系统安全，<strong><u><span
                style='font-family:宋体'>我们需要您提供必要的个人信息以核验您的会员身份。</span></u></strong></span></p>

                <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                0cm;text-indent:19.35pt;'><strong><u><span style='font-size:
                9.5pt;font-family:宋体;color:#333333'>为便于与您联系、尽快帮助您解决问题或记录相关问题的处理方案及结果，我们可能会保存您</span></u></strong><strong><u><span
                style='font-size:9.5pt;font-family:宋体;color:black'>与我们</span></u></strong><strong><u><span
                style='font-size:9.5pt;font-family:宋体;color:#333333'>的通信<span lang=EN-US>/</span>通话记录及相关内容（包括账号信息、订单信息、您为了证明相关事实提供的其他信息，或您留下的联系方式信息），如果您针对具体订单进行咨询、投诉或提供建议的，我们会使用您的账号信息和订单信息。</span></u></strong></p>

                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:12.1pt;margin-left:
                0cm;text-indent:19.95pt;'><span style='font-size:9.5pt;
                color:#333333'>为了提供服务及改进服务质量的合理需要，我们还可能使用的您的其他信息，包括您与客服联系时您提供的相关信息，您参与问卷调查时向我们发送的问卷答复信息。</span></p>

                <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                0cm;'><strong><span lang=EN-US style='font-size:9.5pt;
                font-family:宋体;color:black'>&nbsp;&nbsp;</span></strong><strong><span
                style='font-size:9.5pt;font-family:宋体;color:black'>（八）<span lang=EN-US>&nbsp;</span>为您提供评论、问答等信息公开发布功能</span></strong></p>

                <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                0cm;text-indent:19.35pt;'><span style='font-size:9.5pt;
                color:#333333'>您可通过我们为您提供的评论、问答、论坛、晒单分享、直播及其他信息发布功能公开发布信息，包括作为会员可发布图文<span
                lang=EN-US>/</span>视频<span lang=EN-US>/</span>直播内容、发表评价及问答内容，以及作为卖家发布商品及<span
                lang=EN-US>/</span>或服务相关信息、店铺相关信息。</span></p>

                <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                0cm;text-indent:19.35pt;'><span style='font-size:9.5pt;
                color:#333333'>我们可能会根据您的会员类型及网络日志信息判断您是否可享受对应功能权限（例如只有曾购买过某商品的会员才可通过问大家对其他会员针对该商品的提问做出回答）。</span></p>

                <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                0cm;text-indent:16.95pt;line-height:10.9pt;'><strong><u><span
                style='font-size:9.5pt;font-family:宋体;color:black'>请注意，您公开发布的信息中可能会涉及您或他人的个人信息甚至个人敏感信息，如您在评价时选择上传包含个人信息的图片。请您更加谨慎地考虑，是否在使用我们的服务时共享甚至公开分享相关信息。</span></u></strong></p>

                <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                0cm;'><strong><span lang=EN-US style='font-size:9.5pt;
                font-family:宋体;color:black'>&nbsp;</span></strong></p>

                <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                0cm;'><strong><span lang=EN-US style='font-size:9.5pt;
                font-family:宋体;color:black'>&nbsp; </span></strong><strong><span
                style='font-size:9.5pt;font-family:宋体;color:black'>（九）<span lang=EN-US>&nbsp;</span>为您提供安全保障</span></strong></p>

                <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                0cm;text-indent:19.35pt;'><span style='font-size:9.5pt;
                color:#333333'>为提高您使用我们及我们关联公司、合作伙伴提供服务的安全性，保护您或其他用户或公众的人身财产安全免遭侵害，更好地预防钓鱼网站、欺诈、网络漏洞、计算机病毒、网络攻击、网络侵入等安全风险，更准确地识别违反法律法规或农联贡菜网相关协议规则的情况，我们可能使用或整合您的会员信息、交易信息、设备信息、服务日志信息以及我们关联公司、合作伙伴取得您授权或依据法律共享的信息，来综合判断您账户及交易风险、进行身份验证、检测及防范安全事件，并依法采取必要的记录、审计、分析、处置措施。</span></p>

                <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                0cm;'><span lang=EN-US style='font-size:9.5pt;color:#333333'>&nbsp;</span></p>

                <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                0cm;'><span lang=EN-US style='font-size:9.5pt;color:#333333'>&nbsp;&nbsp;</span><b><span
                style='font-size:9.5pt;color:black'>（十）<span lang=EN-US>&nbsp;</span><strong><span
                style='font-family:宋体'>为您提供其他附加服务</span></strong></span></b></p>

                <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                0cm;text-indent:16.95pt;line-height:10.9pt;'><span
                style='font-size:9.5pt;color:black'>为向您提供更便捷、更优质、个性化的产品及<span lang=EN-US>/</span>或服务，努力提升您的体验，我们在向您提供的以下附加服务中可能会收集和使用您的个人信息。<strong><u><span
                style='font-family:宋体'>如果您不提供这些信息，不会影响您使用农联贡菜网的浏览、搜索、购买等基本服务，</span></u></strong>但您可能无法获得这些附加服务给您带来的用户体验。这些附加服务包括：</span></p>

                <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:0cm;margin-left:
                0cm;margin-bottom:.0001pt;text-indent:19.35pt;'><span
                lang=EN-US style='font-size:9.5pt;color:black'>1</span><span style='font-size:
                9.5pt;color:black'>、基于位置信息的个性化推荐服务：我们会在您开启位置权限后访问获取您的位置信息，根据您的位置信息为您提供更契合您需求的页面展示、产品及<span
                lang=EN-US>/</span>或服务，比如向您推荐附近的优惠信息。</span></p>

                <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:0cm;margin-left:
                0cm;margin-bottom:.0001pt;text-indent:19.35pt;'><span
                lang=EN-US style='font-size:9.5pt;color:black'>2</span><span style='font-size:
                9.5pt;color:black'>、基于相机<span lang=EN-US>/</span>摄像头的附加服务：您可在开启相机<span
                lang=EN-US>/</span>摄像头权限后使用该功能进行扫码用于登录、购物、领取优惠信息，拍摄照片或视频用于评价、分享，以及特定场景下经您授权的人脸识别等功能。当您使用该附加功能进行人脸识别时我们会收集您的<strong><span
                style='font-family:宋体'>面部特征</span></strong>，且严格在经您授权同意的范围内使用，未来如我们拟使用您的面部信息为您提供其他产品及<span
                lang=EN-US>/</span>或服务功能的，我们会再次与您确认。</span></p>

                <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                0cm;text-indent:19.35pt;'><span lang=EN-US style='font-size:
                9.5pt;color:black'>3</span><span style='font-size:9.5pt;color:black'>、基于相册（图片库<span
                lang=EN-US>/</span>视频库）的图片<span lang=EN-US>/</span>视频访问及上传的附加服务：您可在开启相册权限后使用该功能上传您的照片<span
                lang=EN-US>/</span>图片<span lang=EN-US>/</span>视频，以实现更换头像、发表评论<span lang=EN-US>/</span>分享、拍照购物或与客服沟通提供证明等功能<strong><span
                style='font-family:宋体'>。</span></strong></span><strong><u><span
                style='font-size:9.5pt;font-family:宋体;color:#333333'>我们可能会通过您所上传的照片<span
                lang=EN-US>/</span>图片来识别您需要购买的商品或服务，或使用包含您所上传照片或图片的评论信息。</span></u></strong></p>

                <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:0cm;margin-left:
                0cm;margin-bottom:.0001pt;text-indent:19.35pt;'><span
                lang=EN-US style='font-size:9.5pt;color:black'>4</span><span style='font-size:
                9.5pt;color:black'>、基于麦克风的语音技术相关附加服务：您可在开启麦克风权限后使用麦克风实现语音购物功能，或与客服联系或与客服机器人实现语音交互，在这些功能中我们会收集您的<strong><span
                style='font-family:宋体'>录音内容</span></strong>以识别您的购物需求，或响应您的客服及争议处理等需求。请您知晓，<strong><u><span
                style='font-family:宋体'>即使您已同意开启麦克风权限，我们也仅会在</span></u></strong></span><strong><u><span
                style='font-size:9.5pt;font-family:宋体;color:#333333'>您主动点击客户端内麦克风图标或录制视频时通过麦克风获取语音信息。</span></u></strong></p>

                <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                0cm;text-indent:19.35pt;'><span lang=EN-US style='font-size:
                9.5pt;color:black'>5</span><span style='font-size:9.5pt;color:black'>、基于通讯录信息的附加服务：我们将在您开启通讯录权限后收集您的<strong><span
                style='font-family:宋体'>通讯录信息</span></strong>使您在购物时可以更便利地取用您通讯录内的联系人信息，无需再手动输入，包括您可以直接为通讯录中的联系人手机号进行充值；此外，为提升您在使用我们产品及<span
                lang=EN-US>/</span>或服务过程中的社交互动分享乐趣，与您认识的人分享购物体验，在经您同意的前提下，我们也可能对您联系人的姓名和电话号码进行加密收集，帮助您判断您的通讯录联系人是否同为我们的会员进而在农联贡菜网为你们的交流建立联系，同时，会员可选择开启或关闭好友隐私权限决定自己是否可被其他会员通过手机号码搜索、联系。</span></p>

                <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                0cm;text-indent:19.35pt;'><span lang=EN-US style='font-size:
                9.5pt;color:#333333'>6</span><span style='font-size:9.5pt;color:#333333'>、基于日历的附加服务：在您开启我们可读取<span
                lang=EN-US>/</span>写入您日历的权限后，我们将收集您的日历信息用于向您提供购物或领取权益相关记录及提醒。</span></p>

                <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:0cm;margin-left:
                0cm;margin-bottom:.0001pt;text-indent:19.35pt;'><span
                lang=EN-US style='font-size:9.5pt;color:black'>&nbsp;</span></p>

                <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:0cm;margin-left:
                0cm;margin-bottom:.0001pt;text-indent:19.35pt;'><span
                style='font-size:9.5pt;color:#333333'>您理解并同意，上述附加服务可能需要您在您的设备中开启您的位置信息 （地理位置）、摄像头（相机）、相册（图片库）、麦克风（语音）、通讯录及<span
                lang=EN-US>/</span>或日历的访问权限，以实现这些权限所涉及信息的收集和使用。您可在您的设备设置或我们客户端“我的农联贡菜<span
                lang=EN-US>-</span>设置<span lang=EN-US>-</span>隐私—系统权限”中逐项查看上述权限的状态，并可自行决定这些权限随时的开启或关闭。<strong><u><span
                style='font-family:宋体'>请您注意，您开启任一权限即代表您授权我们可以收集和使用相关个人信息来为您提供对应服务，您一旦关闭任一权限即代表您取消了授权，我们将不再基于对应权限继续收集和使用相关个人信息，也无法为您提供该权限所对应的服务。但是，您关闭权限的决定不会影响此前基于您的授权所进行的信息收集及使用。</span></u></strong></span></p>

                <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                14.5pt;'><strong><span lang=EN-US style='font-size:9.5pt;
                font-family:"微软雅黑",sans-serif;color:#333333'>&nbsp;</span></strong></p>

                <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                14.5pt;'><strong><span style='font-size:9.5pt;font-family:宋体;
                color:#333333'>（十一）其他</span></strong></p>

                <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                0cm;text-indent:19.35pt;'><strong><u><span lang=EN-US
                style='font-size:9.5pt;font-family:宋体;color:#333333'>1</span></u></strong><strong><u><span
                style='font-size:9.5pt;font-family:宋体;color:#333333'>、若你提供的信息中含有其他用户的个人信息，在向农联贡菜网提供这些个人信息之前，您需确保您已经取得合法的授权。</span></u></strong></p>

                <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                0cm;text-indent:19.35pt;'><strong><u><span lang=EN-US
                style='font-size:9.5pt;font-family:宋体;color:#333333'>2</span></u></strong><strong><u><span
                style='font-size:9.5pt;font-family:宋体;color:#333333'>、若我们将信息用于本政策未载明的其他用途，或者将基于特定目的收集而来的信息用于其他目的，或者我们主动从第三方处获取您的个人信息，均会事先获得您的同意。</span></u></strong></p>

                <p style='margin-top:7.25pt;margin-right:0cm;margin-bottom:0cm;margin-left:
                0cm;margin-bottom:.0001pt;text-indent:19.35pt;line-height:12.1pt;background:
                white'><span style='font-size:9.5pt;color:#333333'>若我们从第三方处间接获取您的信息的，</span><span
                style='font-size:9.5pt;color:black'>我们会在收集前明确以书面形式要求该第三方在已依法取得您同意后收集个人信息，并向您告知共享的信息内容，且涉及敏感信息的在提供给我们使用前需经过您的明确确认，要求第三方对个人信息来源的合法性和合规性作出承诺，如第三方有违反行为的，我们会明确要求对方承担相应法律责任；同时，我们的专业安全团队对个人信息会进行安全加固（包括敏感信息报备、敏感信息加密存储、访问权限控制等）。我们会使用不低于我们对自身用户个人信息同等的保护手段与措施对间接获取的个人信息进行保护。</span></p>

                <p style='margin-top:7.25pt;margin-right:0cm;margin-bottom:0cm;margin-left:
                0cm;margin-bottom:.0001pt;text-indent:19.35pt;line-height:12.1pt;background:
                white'><span lang=EN-US style='font-size:9.5pt;color:black'>3</span><span
                style='font-size:9.5pt;color:black'>、征得授权同意的例外</span></p>

                <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:0cm;margin-left:
                0cm;margin-bottom:.0001pt;text-indent:19.35pt;line-height:10.9pt;background:
                white'><span style='font-size:9.5pt;color:black'>您充分理解并同意，我们在以下情况下收集、使用您的个人信息无需您的授权同意，且我们可能不会响应您提出的更正<span
                lang=EN-US>/</span>修改、删除、注销、撤回同意、索取信息的请求：</span></p>

                <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:0cm;margin-left:
                0cm;margin-bottom:.0001pt;text-indent:19.35pt;line-height:10.9pt;background:
                white'><span style='font-size:9.5pt;color:black'>（<span lang=EN-US>1</span>）与国家安全、国防安全有关的；</span></p>

                <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:0cm;margin-left:
                0cm;margin-bottom:.0001pt;text-indent:19.35pt;line-height:10.9pt;background:
                white'><span style='font-size:9.5pt;color:black'>（<span lang=EN-US>2</span>）与公共安全、公共卫生、重大公共利益有关的；</span></p>

                <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:0cm;margin-left:
                0cm;margin-bottom:.0001pt;text-indent:19.35pt;line-height:10.9pt;background:
                white'><span style='font-size:9.5pt;color:black'>（<span lang=EN-US>3</span>）与犯罪侦查、起诉、审判和判决执行等司法或行政执法有关的；</span></p>

                <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:0cm;margin-left:
                0cm;margin-bottom:.0001pt;text-indent:19.35pt;line-height:10.9pt;background:
                white'><span style='font-size:9.5pt;color:black'>（<span lang=EN-US>4</span>）出于维护您或其他个人的生命、财产等重大合法权益但又很难得到本人同意的；</span></p>

                <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:0cm;margin-left:
                0cm;margin-bottom:.0001pt;text-indent:19.35pt;line-height:10.9pt;background:
                white'><span style='font-size:9.5pt;color:black'>（<span lang=EN-US>5</span>）您自行向社会公众公开的个人信息；</span></p>

                <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:0cm;margin-left:
                0cm;margin-bottom:.0001pt;text-indent:19.35pt;line-height:10.9pt;background:
                white'><span style='font-size:9.5pt;color:black'>（<span lang=EN-US>6</span>）从合法公开披露的信息中收集个人信息的，如合法的新闻报道、政府信息公开等渠道。</span></p>

                <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:0cm;margin-left:
                0cm;margin-bottom:.0001pt;text-indent:19.35pt;line-height:10.9pt;background:
                white'><span style='font-size:9.5pt;color:black'>（<span lang=EN-US>7</span>）根据与您签订和履行相关协议或其他书面文件所必需的；</span></p>

                <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:0cm;margin-left:
                0cm;margin-bottom:.0001pt;text-indent:19.35pt;line-height:10.9pt;background:
                white'><span style='font-size:9.5pt;color:black'>（<span lang=EN-US>8</span>）用于维护所提供的产品及<span
                lang=EN-US>/</span>或服务的安全稳定运行所必需的，例如发现、处置产品及<span lang=EN-US>/</span>或服务的故障；</span></p>

                <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:0cm;margin-left:
                0cm;margin-bottom:.0001pt;text-indent:19.35pt;line-height:10.9pt;background:
                white'><span style='font-size:9.5pt;color:black'>（<span lang=EN-US>9</span>）为合法的新闻报道所必需的；</span></p>

                <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:0cm;margin-left:
                0cm;margin-bottom:.0001pt;text-indent:19.35pt;line-height:10.9pt;background:
                white'><span style='font-size:9.5pt;color:black'>（<span lang=EN-US>10</span>）学术研究机构基于公共利益开展统计或学术研究所必要，且对外提供学术研究或描述的结果时，对结果中所包含的个人信息进行去标识化处理的；</span></p>

                <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:0cm;margin-left:
                0cm;margin-bottom:.0001pt;text-indent:19.35pt;line-height:10.9pt;background:
                white'><span style='font-size:9.5pt;color:black'>（<span lang=EN-US>11</span>）法律法规规定的其他情形。</span></p>

                <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                0cm;text-indent:19.35pt;line-height:10.9pt;'><span
                style='font-size:9.5pt;color:black'>请知悉，根据适用的法律，若我们<strong><u><span
                style='font-family:宋体'>对个人信息采取技术措施和其他必要措施进行处理，使得数据接收方无法重新识别特定个人且不能复原</span></u></strong>，或我们可能会对收集的信息进行去标识化地研究、统计分析和预测，用于改善农联贡菜网的内容和布局，为商业决策提供产品或服务支撑，以及改进我们的产品和服务（包括使用匿名数据进行机器学习或模型算法训练），<strong><u><span
                style='font-family:宋体'>则此类处理后数据的使用无需另行向您通知并征得您的同意</span></u></strong>。</span></p>

                <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                0cm;text-indent:19.35pt;line-height:10.9pt;'><span lang=EN-US
                style='font-size:9.5pt;color:black'>4</span><span style='font-size:9.5pt;
                color:black'>、如我们停止运营农联贡菜网产品或服务，我们将及时停止继续收集您个人信息的活动，将停止运营的通知以逐一送达或公告的形式通知您，并对我们所持有的与已关停业务相关的个人信息进行删除或匿名化处理。</span></p>

                <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                0cm;text-indent:19.35pt;line-height:10.9pt;'><span lang=EN-US
                style='font-size:9.5pt;color:black'>&nbsp;</span></p>

                <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                0cm;text-indent:16.95pt;line-height:10.9pt;'><strong><span
                style='font-size:9.5pt;font-family:宋体;color:black'>二、我们如何使用</span></strong><strong><span
                lang=EN-US style='font-size:9.5pt;font-family:宋体;color:#333333'>Cookie</span></strong><strong><span
                style='font-size:9.5pt;font-family:宋体;color:black'>和同类技术</span></strong></p>

                <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                0cm;text-indent:16.95pt;line-height:10.9pt;'><b><span
                lang=EN-US style='font-size:9.5pt;color:black'><br>
                <br>
                </span></b></p>

                <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                0cm;text-indent:16.95pt;line-height:10.9pt;'><strong><span
                style='font-size:9.5pt;font-family:宋体;color:black'>（一）</span></strong><strong><span
                lang=EN-US style='font-size:9.5pt;font-family:宋体;color:#333333'>Cookie</span></strong></p>

                <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                0cm;text-indent:16.95pt;line-height:10.9pt;'><span
                style='font-size:9.5pt;color:black'>为确保网站正常运转、为您获得更轻松的访问体验、向您推荐您可能感兴趣的内容，我们会在您的计算机或移动设备上存储<span
                lang=EN-US>Cookie</span>、<span lang=EN-US>Flash Cookie</span>，或浏览器（或关联应用程序）提供的其他通常包含标识符、站点名称以及一些号码和字符的本地存储（统称“<span
                lang=EN-US>Cookie</span>”）。借助于<span lang=EN-US> Cookie</span>，网站能够存储您的偏好或购物车内的商品等数据。</span></p>

                <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                0cm;text-indent:16.95pt;line-height:10.9pt;'><strong><u><span
                style='font-size:9.5pt;font-family:宋体;color:black'>如果您的浏览器或浏览器附加服务允许，您可修改对<span
                lang=EN-US>Cookie</span>的接受程度或拒绝我们的<span lang=EN-US>Cookie</span>。</span></u></strong><span
                style='font-size:9.5pt;color:black'>有关详情，请参见<span lang=EN-US> AboutCookies.org</span>。但如果您这么做，在某些情况下可能会影响您安全访问我们的网站，且可能需要在每一次访问我们的网站时更改用户设置。</span></p>

                <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                0cm;text-indent:16.95pt;line-height:10.9pt;'><span lang=EN-US
                style='font-size:9.5pt;color:black'><br>
                <br>
                </span></p>

                <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                0cm;text-indent:16.95pt;line-height:10.9pt;'><strong><span
                style='font-size:9.5pt;font-family:宋体;color:black'>（二）</span></strong><strong><span
                lang=EN-US style='font-size:9.5pt;font-family:宋体;color:#333333'>Cookie</span></strong><strong><span
                style='font-size:9.5pt;font-family:宋体;color:#333333'>同类技术</span></strong></p>

                <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                0cm;text-indent:16.95pt;line-height:10.9pt;'><span
                style='font-size:9.5pt;color:black'>除</span><span lang=EN-US style='font-size:
                9.5pt;font-family:"微软雅黑",sans-serif;color:#333333'>&nbsp;</span><span
                lang=EN-US style='font-size:9.5pt;color:#333333'>Cookie</span><span
                style='font-size:9.5pt;color:black'>外，我们还会在网站上使用网站信标、像素标签、<span lang=EN-US>ETag</span>等其他同类技术。</span></p>

                <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                0cm;text-indent:16.95pt;line-height:10.9pt;'><span
                style='font-size:9.5pt;color:black'>例如，我们向您发送的电子邮件可能含有链接至我们网站内容的地址链接，如果您点击该链接，我们则会跟踪此次点击，帮助我们了解您的产品或服务偏好，以便于我们主动改善客户服务体验。网站信标通常是一种嵌入到网站或电子邮件中的透明图像。借助于电子邮件中的像素标签，我们能够获知电子邮件是否被打开。如果您不希望自己的活动以这种方式被追踪，则可以随时从我们的寄信名单中退订。</span></p>

                <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                0cm;text-indent:16.95pt;line-height:10.9pt;'><span lang=EN-US
                style='font-size:9.5pt;color:black'>ETag</span><span style='font-size:9.5pt;
                color:black'>（实体标签）是在互联网浏览器与互联网服务器之间背后传送的<span lang=EN-US>HTTP</span>协议标头，可代替<span
                lang=EN-US>Cookie</span>。<span lang=EN-US>ETag</span>可以帮助我们避免不必要的服务器负载，提高服务效率，节省资源、能源，同时，我们可能通过<span
                lang=EN-US>ETag</span>来记录您的身份，以便我们可以更深入地了解和改善我们的产品或服务。<strong><u><span
                style='font-family:宋体'>大多数浏览器均为用户提供了清除浏览器缓存数据的功能，您可以在浏览器设置功能中进行相应的数据清除操作。</span></u></strong>但请注意，如果停用<span
                lang=EN-US>ETag</span>，您可能无法享受相对更佳的产品或服务体验。</span></p>

                <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                0cm;line-height:10.9pt;'><span lang=EN-US style='font-size:
                9.5pt;font-family:"微软雅黑",sans-serif;color:#333333'>&nbsp;</span></p>

                <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                0cm;text-indent:16.95pt;line-height:10.9pt;'><strong><span
                style='font-size:9.5pt;font-family:宋体;color:black'>三、我们如何共享、转让、公开披露您的信息</span></strong></p>

                <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                9.45pt;text-indent:5.8pt;line-height:10.9pt;'><b><span
                lang=EN-US style='font-size:9.5pt;color:black'><br>
                </span></b><strong><span style='font-size:9.5pt;font-family:宋体;color:black'>（一）共享</span></strong></p>

                <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                0cm;line-height:10.9pt;'><span lang=EN-US style='font-size:
                9.5pt;font-family:"微软雅黑",sans-serif;color:#333333'>&nbsp; &nbsp; &nbsp;&nbsp;</span><span
                style='font-size:9.5pt;color:black'>我们不会与农联贡菜网服务提供者以外的公司、组织和个人共享您的个人信息，但以下情况除外：</span></p>

                <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                0cm;text-indent:16.95pt;line-height:10.9pt;'><span lang=EN-US
                style='font-size:9.5pt;color:black'>1</span><span style='font-size:9.5pt;
                color:black'>、在法定情形下的共享：我们可能会根据法律法规规定、诉讼、争议解决需要，或按行政、司法机关依法提出的要求，对外共享您的个人信息。</span></p>

                <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                0cm;text-indent:16.95pt;line-height:10.9pt;'><span lang=EN-US
                style='font-size:9.5pt;color:black'>2</span><span style='font-size:9.5pt;
                color:black'>、在获取明确同意的情况下共享：获得您的明确同意后，我们会与其他方共享您的个人信息。</span></p>

                <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                0cm;text-indent:16.95pt;line-height:10.9pt;'><span lang=EN-US
                style='font-size:9.5pt;color:black'>3</span><span style='font-size:9.5pt;
                color:black'>、在您主动选择情况下共享：您通过农联贡菜平台购买商品或服务，我们会根据您的选择，将您的订单信息中与交易有关的必要信息共享给相关商品或服务的提供者，以实现您的交易及售后服务需求。</span></p>

                <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                0cm;text-indent:16.95pt;line-height:10.9pt;'><span lang=EN-US
                style='font-size:9.5pt;color:black'>4</span><span style='font-size:9.5pt;
                color:black'>、与关联公司间共享：<strong><u><span style='font-family:宋体'>为便于我们基于农联贡菜平台账户向您提供产品和服务，推荐您可能感兴趣的信息，识别会员账号异常，保护农联贡菜网关联公司或其他用户或公众的人身财产安全免遭侵害，您的个人信息可能会与我们的关联公司和<span
                lang=EN-US>/</span>或其指定的服务提供商共享。</span></u></strong>我们只会共享必要的个人信息，且受本隐私政策中所声明目的的约束，如果我们共享您的个人敏感信息或关联公司改变个人信息的使用及处理目的，将再次征求您的授权同意。</span></p>

                <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                0cm;text-indent:16.95pt;line-height:10.9pt;'><span lang=EN-US
                style='font-size:9.5pt;color:black'>5</span><span style='font-size:9.5pt;
                color:black'>、与授权合作伙伴共享：<strong><u><span style='font-family:宋体'>我们可能委托授权合作伙伴为您提供某些服务或代表我们履行职能，</span></u></strong>我们仅会出于本隐私权政策声明的合法、正当、必要、特定、明确的目的共享您的信息，授权合作伙伴只能接触到其履行职责所需信息，且不得将此信息用于其他任何目的。</span></p>

                <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                0cm;text-indent:16.95pt;line-height:10.9pt;'><span
                style='font-size:9.5pt;color:black'>目前，我们的授权合作伙伴包括以下类型：</span></p>

                <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                0cm;text-indent:16.95pt;line-height:10.9pt;'><span
                style='font-size:9.5pt;color:black'>（<span lang=EN-US>1</span>）广告、分析服务类的授权合作伙伴。除非得到您的许可，否则我们不会将您的个人身份信息与提供广告、分析服务的合作伙伴共享。我们会委托这些合作伙伴处理与广告覆盖面和有效性相关的信息，但不会提供您的个人身份信息，或者我们将这些信息进行去标识化处理，以便它不会识别您个人。这类合作伙伴可能将上述信息与他们合法获取的其他数据相结合，以执行我们委托的广告服务或决策建议。</span></p>

                <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                0cm;text-indent:16.95pt;line-height:10.9pt;'><span
                style='font-size:9.5pt;color:black'>（<span lang=EN-US>2</span>）供应商、服务提供商和其他合作伙伴。我们将信息发送给支持我们业务的供应商、服务提供商和其他合作伙伴，这些支持包括受我们委托提供的技术基础设施服务、分析我们服务的使用方式、衡量广告和服务的有效性、提供客户服务、支付便利或进行学术研究和调查。</span></p>

                <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                0cm;text-indent:16.95pt;line-height:10.9pt;'><span
                style='font-size:9.5pt;color:black'>我们会对授权合作伙伴获取有关信息的应用程序接口（<span lang=EN-US>API</span>）、软件工具开发包（<span
                lang=EN-US>SDK</span>）进行严格的安全检测，并与授权合作伙伴约定严格的数据保护措施，令其按照我们的委托目的、服务说明、本隐私权政策以及其他任何相关的保密和安全措施来处理个人信息。</span></p>

                <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                0cm;text-indent:16.95pt;line-height:10.9pt;'><span lang=EN-US
                style='font-size:9.5pt;color:black'><br>
                <br>
                </span></p>

                <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                0cm;text-indent:16.95pt;line-height:10.9pt;'><strong><span
                style='font-size:9.5pt;font-family:宋体;color:black'>（二）转让</span></strong></p>

                <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                0cm;text-indent:16.95pt;line-height:10.9pt;'><span
                style='font-size:9.5pt;color:black'>我们不会将您的个人信息转让给任何公司、组织和个人，但以下情况除外：</span></p>

                <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                0cm;text-indent:16.95pt;line-height:10.9pt;'><span lang=EN-US
                style='font-size:9.5pt;color:black'>1</span><span style='font-size:9.5pt;
                color:black'>、在获取明确同意的情况下转让：获得您的明确同意后，我们会向其他方转让您的个人信息；</span></p>

                <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                0cm;text-indent:16.95pt;line-height:10.9pt;'><span lang=EN-US
                style='font-size:9.5pt;color:black'>2</span><span style='font-size:9.5pt;
                color:black'>、在农联贡菜网服务提供者发生合并、收购或破产清算情形，或其他涉及合并、收购或破产清算情形时，如涉及到个人信息转让，我们会要求新的持有您个人信息的公司、组织继续受本政策的约束，否则我们将要求该公司、组织和个人重新向您征求授权同意。</span></p>

                <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                0cm;text-indent:16.95pt;line-height:10.9pt;'><span lang=EN-US
                style='font-size:9.5pt;color:black'><br>
                <br>
                </span></p>

                <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                0cm;text-indent:16.95pt;line-height:10.9pt;'><strong><span
                style='font-size:9.5pt;font-family:宋体;color:black'>（三）公开披露</span></strong></p>

                <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                0cm;text-indent:16.95pt;line-height:10.9pt;'><span
                style='font-size:9.5pt;color:black'>我们仅会在以下情况下，公开披露您的个人信息：</span></p>

                <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                0cm;text-indent:16.95pt;line-height:10.9pt;'><span lang=EN-US
                style='font-size:9.5pt;color:black'>1</span><span style='font-size:9.5pt;
                color:black'>、获得您明确同意或基于您的主动选择，我们可能会公开披露您的个人信息；</span></p>

                <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                0cm;text-indent:16.95pt;line-height:10.9pt;'><span lang=EN-US
                style='font-size:9.5pt;color:black'>2</span><span style='font-size:9.5pt;
                color:black'>、<strong><u><span style='font-family:宋体'>如果我们确定您出现违反法律法规或严重违反农联贡菜平台相关协议及规则的情况，或为保护农联贡菜平台用户或公众的人身财产安全免遭侵害，我们可能依据法律法规或征得您同意的情况下披露关于您的个人信息</span></u></strong>，包括相关违规行为以及农联贡菜平台已对您采取的措施。例如，若您因出售假冒商品而严重违反农联贡菜规则，我们可能会公开披露您的店铺认证主体信息与违规情况。</span></p>

                <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                0cm;text-indent:16.95pt;line-height:10.9pt;'><span lang=EN-US
                style='font-size:9.5pt;color:black'><br>
                <br>
                </span></p>

                <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                0cm;line-height:10.9pt;'><strong><span lang=EN-US
                style='font-size:9.5pt;font-family:"微软雅黑",sans-serif;color:#333333'>&nbsp;&nbsp;&nbsp;&nbsp;</span></strong><strong><span
                style='font-size:9.5pt;font-family:宋体;color:black'>（四）共享、转让、公开披露个人信息时事先征得授权同意的例外</span></strong></p>

                <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                0cm;text-indent:16.95pt;line-height:10.9pt;'><span
                style='font-size:9.5pt;color:black'>以下情形中，共享、转让、公开披露您的个人信息无需事先征得您的授权同意：</span></p>

                <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                0cm;text-indent:16.95pt;line-height:10.9pt;'><span lang=EN-US
                style='font-size:9.5pt;color:black'>1</span><span style='font-size:9.5pt;
                color:black'>、与国家安全、国防安全有关的；</span></p>

                <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                0cm;text-indent:16.95pt;line-height:10.9pt;'><span lang=EN-US
                style='font-size:9.5pt;color:black'>2</span><span style='font-size:9.5pt;
                color:black'>、与公共安全、公共卫生、重大公共利益有关的；</span></p>

                <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                0cm;text-indent:16.95pt;line-height:10.9pt;'><span lang=EN-US
                style='font-size:9.5pt;color:black'>3</span><span style='font-size:9.5pt;
                color:black'>、与犯罪侦查、起诉、审判和判决执行等司法或行政执法有关的；</span></p>

                <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                0cm;text-indent:16.95pt;line-height:10.9pt;'><span lang=EN-US
                style='font-size:9.5pt;color:black'>4</span><span style='font-size:9.5pt;
                color:black'>、出于维护您或其他个人的生命、财产等重大合法权益但又很难得到本人同意的；</span></p>

                <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                0cm;text-indent:16.95pt;line-height:10.9pt;'><span lang=EN-US
                style='font-size:9.5pt;color:black'>5</span><span style='font-size:9.5pt;
                color:black'>、您自行向社会公众公开的个人信息；</span></p>

                <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                0cm;text-indent:16.95pt;line-height:10.9pt;'><span lang=EN-US
                style='font-size:9.5pt;color:black'>6</span><span style='font-size:9.5pt;
                color:black'>、从合法公开披露的信息中收集个人信息的，如合法的新闻报道、政府信息公开等渠道。</span></p>

                <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                0cm;text-indent:16.95pt;line-height:10.9pt;'><span
                style='font-size:9.5pt;color:black'>请知悉，根据适用的法律，若我们<strong><u><span
                style='font-family:宋体'>对个人信息采取技术措施和其他必要措施进行处理，使得数据接收方无法重新识别特定个人且不能复原，则此类处理后数据的共享、转让、公开披露无需另行向您通知并征得您的同意</span></u></strong>。</span></p>

                <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                0cm;text-indent:16.95pt;line-height:10.9pt;'><span lang=EN-US
                style='font-size:9.5pt;font-family:"微软雅黑",sans-serif;color:#333333'>&nbsp;</span></p>

                <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                0cm;text-indent:16.95pt;line-height:10.9pt;'><strong><span
                lang=EN-US style='font-size:9.5pt;font-family:宋体;color:black'>&nbsp;</span></strong><strong><span
                style='font-size:9.5pt;font-family:宋体;color:black'>四、我们如何保护您的信息</span></strong></p>

                <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                0cm;text-indent:16.95pt;line-height:10.9pt;'><span
                style='font-size:9.5pt;color:black'>（一）我们已采取符合业界标准、合理可行的安全防护措施保护您的信息，防止个人信息遭到未经授权访问、公开披露、使用、修改、损坏或丢失。例如，在您的浏览器与服务器之间交换数据时受</span><span
                lang=EN-US style='font-size:9.5pt;font-family:"微软雅黑",sans-serif;color:#333333'>&nbsp;</span><span
                lang=EN-US style='font-size:9.5pt;color:#333333'>SSL</span><span
                style='font-size:9.5pt;color:black'>协议加密保护；我们同时对农联贡菜网网站提供</span><span
                lang=EN-US style='font-size:9.5pt;color:#333333'>HTTPS</span><span
                style='font-size:9.5pt;color:black'>协议安全浏览方式；我们会使用加密技术提高个人信息的安全性；我们会使用受信赖的保护机制防止个人信息遭到恶意攻击；我们会部署访问控制机制，尽力确保只有授权人员才可访问个人信息；以及我们会举办安全和隐私保护培训课程，加强员工对于保护个人信息重要性的认识。</span></p>

                <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                0cm;text-indent:16.95pt;line-height:10.9pt;'><span
                style='font-size:9.5pt;color:black'>（二）我们有行业先进的以数据为核心、围绕数据生命周期进行的数据安全管理体系，从组织建设、制度设计、人员管理、产品技术等方面多维度提升整个系统的安全性。</span></p>

                <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                0cm;text-indent:16.95pt;line-height:10.9pt;'><span
                style='font-size:9.5pt;color:black'>（三）我们会采取合理可行的措施，尽力避免收集无关的个人信息。<strong><u><span
                style='font-family:宋体'>我们只会在达成本政策所述目的所需的期限内保留您的个人信息，除非法律有强制的存留要求，</span></u></strong><strong><span
                style='font-family:宋体;font-weight:normal'>例如《中华人民共和国电子商务法》要求商品和服务信息、交易信息保存时间自交易完成之日起不少于三年。而我们判断前述期限的标准包括：</span></strong></span></p>

                <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                0cm;text-indent:16.95pt;line-height:10.9pt;'><strong><span
                lang=EN-US style='font-size:9.5pt;font-family:宋体;color:black;font-weight:normal'>1</span></strong><strong><span
                style='font-size:9.5pt;font-family:宋体;color:black;font-weight:normal'>、完成与您相关的交易目的、维护相应交易及业务记录、应对您可能的查询或投诉；</span></strong></p>

                <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                0cm;text-indent:16.95pt;line-height:10.9pt;'><strong><span
                lang=EN-US style='font-size:9.5pt;font-family:宋体;color:black;font-weight:normal'>2</span></strong><strong><span
                style='font-size:9.5pt;font-family:宋体;color:black;font-weight:normal'>、保证我们为您提供服务的安全和质量；</span></strong></p>

                <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                0cm;text-indent:16.95pt;line-height:10.9pt;'><strong><span
                lang=EN-US style='font-size:9.5pt;font-family:宋体;color:black;font-weight:normal'>3</span></strong><strong><span
                style='font-size:9.5pt;font-family:宋体;color:black;font-weight:normal'>、您是否同意更长的留存期间；</span></strong></p>

                <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                0cm;text-indent:16.95pt;line-height:10.9pt;'><strong><span
                lang=EN-US style='font-size:9.5pt;font-family:宋体;color:black;font-weight:normal'>4</span></strong><strong><span
                style='font-size:9.5pt;font-family:宋体;color:black;font-weight:normal'>、是否存在保留期限的其他特别约定。</span></strong></p>

                <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                0cm;text-indent:16.95pt;line-height:10.9pt;'><strong><u><span
                style='font-size:9.5pt;font-family:宋体;color:black'>在您的个人信息超出保留期间后，我们会根据适用法律的要求删除您的个人信息，或使其匿名化处理。</span></u></strong></p>

                <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                0cm;text-indent:16.95pt;line-height:10.9pt;'><span
                style='font-size:9.5pt;color:black'>（四）互联网并非绝对安全的环境，使用农联贡菜平台服务时，<strong><u><span
                style='font-family:宋体'>我们强烈建议您不要使用非农联贡菜平台推荐的通信方式发送您的信息。</span></u></strong>您可以通过我们的服务建立联系和相互分享。当您通过我们的服务创建交流、交易或分享时，您可以自主选择沟通、交易或分享的对象，作为能够看到您的交易内容、联络方式、交流信息或分享内容等相关信息的第三方。</span></p>

                <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                0cm;text-indent:16.95pt;line-height:10.9pt;'><span
                style='font-size:9.5pt;color:black'>在使用农联贡菜网服务进行网上交易时，您不可避免地要向交易对方或潜在的交易对方披露自己的个人信息，如<strong><span
                style='font-family:宋体'>联络方式</span></strong>或<strong><span style='font-family:
                宋体'>联系地址</span></strong>。请您妥善保护自己的个人信息，仅在必要的情形下向他人提供。如您发现自己的个人信息尤其是您的账户或密码发生泄露，请您立即联络农联贡菜网客服，以便我们根据您的申请采取相应措施。</span></p>

                <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                0cm;text-indent:16.95pt;line-height:10.9pt;'><span
                style='font-size:9.5pt;color:black'>请注意，您在使用我们服务时自愿共享甚至公开分享的信息，可能会涉及您或他人的个人信息甚至个人敏感信息。请您更加谨慎地考虑，是否在使用我们的服务时共享甚至公开分享相关信息。</span></p>

                <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                0cm;text-indent:16.95pt;line-height:10.9pt;'><span
                style='font-size:9.5pt;color:black'>请使用复杂密码，协助我们保证您的账号安全。我们将尽力保障您发送给我们的任何信息的安全性。如果我们的物理、技术或管理防护设施遭到破坏，导致信息被非授权访问、公开披露、篡改或毁坏，导致您的合法权益受损，我们将承担相应的法律责任。</span></p>

                <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                0cm;text-indent:16.95pt;line-height:10.9pt;'><span
                style='font-size:9.5pt;color:black'>（五）我们将不定期更新并公开安全风险、个人信息安全影响评估报告等有关内容，您可通过农联贡菜网公告方式获得。</span></p>

                <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                0cm;text-indent:16.95pt;line-height:10.9pt;'><span
                style='font-size:9.5pt;color:black'>（六）在不幸发生个人信息安全事件后，我们将按照法律法规的要求向您告知：安全事件的基本情况和可能的影响、我们已采取或将要采取的处置措施、您可自主防范和降低风险的建议、对您的补救措施等。事件相关情况我们将以邮件、信函、电话、推送通知等方式告知您，难以逐一告知个人信息主体时，我们会采取合理、有效的方式发布公告。</span></p>

                <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                0cm;text-indent:16.95pt;line-height:10.9pt;'><span
                style='font-size:9.5pt;color:black'>同时，我们还将按照监管部门要求，上报个人信息安全事件的处置情况。</span></p>

                <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                0cm;line-height:10.9pt;'><span lang=EN-US style='font-size:
                9.5pt;font-family:"微软雅黑",sans-serif;color:#333333'>&nbsp;</span></p>

                <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                0cm;text-indent:16.95pt;line-height:10.9pt;'><strong><span
                style='font-size:9.5pt;font-family:宋体;color:black'>五、您如何管理您的信息</span></strong></p>

                <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                0cm;text-indent:16.95pt;line-height:10.9pt;'><b><span
                lang=EN-US style='font-size:9.5pt;color:black'><br>
                <br>
                </span></b></p>

                <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                0cm;text-indent:16.95pt;line-height:10.9pt;'><span
                style='font-size:9.5pt;color:black'>您可以通过以下方式访问及管理您的信息：</span></p>

                <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                0cm;text-indent:16.95pt;line-height:10.9pt;'><span lang=EN-US
                style='font-size:9.5pt;color:black'><br>
                <br>
                </span></p>

                <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                0cm;text-indent:16.95pt;line-height:10.9pt;'><strong><span
                style='font-size:9.5pt;font-family:宋体;color:black'>（一）查询、更正和补充您的信息</span></strong></p>

                <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                0cm;text-indent:16.95pt;line-height:10.9pt;'><span
                style='font-size:9.5pt;color:black'>您有权查询、更正或补充您的信息。您可以通过以下方式自行进行：</span></p>

                <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                0cm;text-indent:19.35pt;line-height:10.9pt;'><span lang=EN-US
                style='font-size:9.5pt;color:black'>1</span><span style='font-size:9.5pt;
                color:black'>、登录农联贡菜网，进入“我的农联贡菜”首页，点击个人账户设置后查询、更正个人资料及个人账户相关信息；</span></p>

                <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                0cm;text-indent:19.35pt;line-height:10.9pt;'><span lang=EN-US
                style='font-size:9.5pt;color:black'>2</span><span style='font-size:9.5pt;
                color:black'>、登录手机农联贡菜客户端，进入“我的农联贡菜<span lang=EN-US>-</span>设置”对个人资料、账户与安全及我的收货地址等信息进行查询、更正或补充；</span></p>

                <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                0cm;text-indent:19.35pt;line-height:10.9pt;'><span lang=EN-US
                style='font-size:9.5pt;color:black'>3</span><span style='font-size:9.5pt;
                color:black'>、登录农联贡菜网并选择联系客服，或登录手机农联贡菜客户端并选择在线客服寻求帮助，协助您查询、更正或补充您的信息。</span></p>

                <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                0cm;text-indent:19.35pt;line-height:10.9pt;'><span lang=EN-US
                style='font-size:9.5pt;color:black'><br>
                <br>
                </span></p>

                <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                0cm;text-indent:16.95pt;line-height:10.9pt;'><strong><span
                style='font-size:9.5pt;font-family:宋体;color:black'>（二）删除您的信息</span></strong></p>

                <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                0cm;text-indent:16.95pt;line-height:10.9pt;'><span
                style='font-size:9.5pt;color:black'>您可以通过“（一）查询、更正和补充您的信息”中列明的方式删除您的部分信息。</span></p>

                <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                0cm;text-indent:16.95pt;line-height:10.9pt;'><span
                style='font-size:9.5pt;color:black'>在以下情形中，您可以向我们提出删除个人信息的请求：</span></p>

                <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                0cm;text-indent:16.95pt;line-height:10.9pt;'><span lang=EN-US
                style='font-size:9.5pt;color:black'>1</span><span style='font-size:9.5pt;
                color:black'>、如果我们处理个人信息的行为违反法律法规；</span></p>

                <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                0cm;text-indent:16.95pt;line-height:10.9pt;'><span lang=EN-US
                style='font-size:9.5pt;color:black'>2</span><span style='font-size:9.5pt;
                color:black'>、如果我们收集、使用您的个人信息，却未征得您的明确同意；</span></p>

                <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                0cm;text-indent:16.95pt;line-height:10.9pt;'><span lang=EN-US
                style='font-size:9.5pt;color:black'>3</span><span style='font-size:9.5pt;
                color:black'>、如果我们处理个人信息的行为严重违反了与您的约定；</span></p>

                <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                0cm;text-indent:16.95pt;line-height:10.9pt;'><span lang=EN-US
                style='font-size:9.5pt;color:black'>4</span><span style='font-size:9.5pt;
                color:black'>、如果您不再使用我们的产品或服务，或您主动注销了账号；</span></p>

                <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                0cm;text-indent:16.95pt;line-height:10.9pt;'><span lang=EN-US
                style='font-size:9.5pt;color:black'>5</span><span style='font-size:9.5pt;
                color:black'>、如果我们永久不再为您提供产品或服务。</span></p>

                <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                0cm;text-indent:16.95pt;line-height:10.9pt;'><span
                style='font-size:9.5pt;color:black'>若我们决定响应您的删除请求，我们还将同时尽可能通知从我们处获得您的个人信息的主体，并要求其及时删除（除非法律法规另有规定，或这些主体已独立获得您的授权）。</span></p>

                <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                0cm;text-indent:16.95pt;line-height:10.9pt;'><strong><u><span
                style='font-size:9.5pt;font-family:宋体;color:black'>当您或我们协助您删除相关信息后，因为适用的法律和安全技术，我们可能无法立即从备份系统中删除相应的信息，我们将安全地存储您的个人信息并将其与任何进一步处理隔离，直到备份可以清除或实现匿名。</span></u></strong></p>

                <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                0cm;text-indent:16.95pt;line-height:10.9pt;'><b><u><span
                lang=EN-US style='font-size:9.5pt;color:black'><br>
                <br>
                </span></u></b></p>

                <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                0cm;text-indent:16.95pt;line-height:10.9pt;'><strong><span
                style='font-size:9.5pt;font-family:宋体;color:black'>（三）改变您授权同意的范围</span></strong></p>

                <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                0cm;text-indent:16.95pt;line-height:10.9pt;'><span
                style='font-size:9.5pt;color:black'>每个业务功能需要一些基本的个人信息才能得以完成（见本隐私权政策“第一部分”）。除此之外，您可以与农联贡菜网客服联系或改变您的智能移动设备的设置等方式给予或收回您的授权同意。</span></p>

                <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                0cm;text-indent:16.95pt;line-height:10.9pt;'><span
                style='font-size:9.5pt;color:black'>当您收回同意后，我们将不再处理相应的个人信息。<strong><u><span
                style='font-family:宋体'>但您收回同意的决定，不会影响此前基于您的授权而开展的个人信息处理。</span></u></strong></span></p>

                <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                0cm;text-indent:16.95pt;line-height:10.9pt;'><b><u><span
                lang=EN-US style='font-size:9.5pt;color:black'><br>
                <br>
                </span></u></b></p>

                <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                0cm;text-indent:16.95pt;line-height:10.9pt;'><strong><span
                style='font-size:9.5pt;font-family:宋体;color:black'>（四）注销您的账户</span></strong></p>

                <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                0cm;text-indent:16.95pt;line-height:10.9pt;'><span
                style='font-size:9.5pt;color:black'>您可以通过以下方式申请注销您的账户：</span></p>

                <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                0cm;text-indent:16.95pt;line-height:10.9pt;'><span lang=EN-US
                style='font-size:9.5pt;color:black'>1</span><span style='font-size:9.5pt;
                color:black'>、登录农联贡菜网并选择联系客服，或登录手机农联贡菜客户端并联系在线客服寻求帮助，协助您申请注销您的账户。</span></p>

                <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                0cm;text-indent:16.95pt;line-height:10.9pt;'><span
                style='font-size:9.5pt;color:black'>在您主动注销账户之后，我们将停止为您提供产品或服务，根据适用法律的要求删除您的个人信息，或使其匿名化处理。</span></p>

                <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                0cm;text-indent:16.95pt;line-height:10.9pt;'><span lang=EN-US
                style='font-size:9.5pt;color:black'><br>
                <br>
                </span></p>

                <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                0cm;text-indent:16.95pt;line-height:10.9pt;'><strong><span
                style='font-size:9.5pt;font-family:宋体;color:black'>（五）约束信息系统自动决策</span></strong></p>

                <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                0cm;text-indent:16.95pt;line-height:10.9pt;'><span
                style='font-size:9.5pt;color:black'>在某些业务功能中，我们可能仅依据信息系统、算法等在内的非人工自动决策机制做出决定。如果这些决定显著影响您的合法权益，您有权要求我们做出解释，我们也将在不侵害农联贡菜网商业秘密或其他用户权益、社会公共利益的前提下提供申诉方法。</span></p>

                <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                0cm;text-indent:16.95pt;line-height:10.9pt;'><span lang=EN-US
                style='font-size:9.5pt;color:black'><br>
                <br>
                </span></p>

                <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                0cm;text-indent:16.95pt;line-height:10.9pt;'><strong><span
                style='font-size:9.5pt;font-family:宋体;color:black'>（六）响应您的上述请求</span></strong></p>

                <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                0cm;text-indent:16.95pt;line-height:10.9pt;'><span
                style='font-size:9.5pt;color:black'>为保障安全，您可能需要提供书面请求，或以其他方式证明您的身份。我们可能会先要求您验证自己的身份，然后再处理您的请求。</span></p>

                <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                0cm;text-indent:16.95pt;line-height:10.9pt;'><span
                style='font-size:9.5pt;color:black'>我们将在</span><span lang=EN-US
                style='font-size:9.5pt;color:#333333'>15</span><span style='font-size:9.5pt;
                color:black'>天内做出答复。如您不满意，还可以通过农联贡菜网客服发起投诉。</span></p>

                <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                0cm;text-indent:16.95pt;line-height:10.9pt;'><span
                style='font-size:9.5pt;color:black'>对于您合理的请求，我们原则上不收取费用，但对多次重复、超出合理限度的请求，我们将酌情收取一定费用。对于与您的身份不直接关联的信息、无端重复信息，或者需要过多技术手段（例如，需要开发新系统或从根本上改变现行惯例）、给他人合法权益带来风险或者不切实际的请求，我们可能会予以拒绝。</span></p>

                <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                0cm;text-indent:16.95pt;line-height:10.9pt;'><span
                style='font-size:9.5pt;color:black'>在以下情形中，按照法律法规要求，我们将无法响应您的请求：</span></p>

                <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                0cm;text-indent:16.95pt;line-height:10.9pt;'><span lang=EN-US
                style='font-size:9.5pt;color:black'>1</span><span style='font-size:9.5pt;
                color:black'>、与国家安全、国防安全有关的；</span></p>

                <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                0cm;text-indent:16.95pt;line-height:10.9pt;'><span lang=EN-US
                style='font-size:9.5pt;color:black'>2</span><span style='font-size:9.5pt;
                color:black'>、与公共安全、公共卫生、重大公共利益有关的；</span></p>

                <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                0cm;text-indent:16.95pt;line-height:10.9pt;'><span lang=EN-US
                style='font-size:9.5pt;color:black'>3</span><span style='font-size:9.5pt;
                color:black'>、与犯罪侦查、起诉、审判和执行判决等有关的；</span></p>

                <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                0cm;text-indent:16.95pt;line-height:10.9pt;'><span lang=EN-US
                style='font-size:9.5pt;color:black'>4</span><span style='font-size:9.5pt;
                color:black'>、有充分证据表明个人信息主体存在主观恶意或滥用权利的；</span></p>

                <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                0cm;text-indent:16.95pt;line-height:10.9pt;'><span lang=EN-US
                style='font-size:9.5pt;color:black'>5</span><span style='font-size:9.5pt;
                color:black'>、响应您的请求将导致您或其他个人、组织的合法权益受到严重损害的；</span></p>

                <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                0cm;text-indent:16.95pt;line-height:10.9pt;'><span lang=EN-US
                style='font-size:9.5pt;color:black'>6</span><span style='font-size:9.5pt;
                color:black'>、涉及商业秘密的。</span></p>

                <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                0cm;line-height:10.9pt;'><span lang=EN-US style='font-size:
                9.5pt;font-family:"微软雅黑",sans-serif;color:#333333'>&nbsp;</span></p>

                <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                0cm;text-indent:16.95pt;line-height:10.9pt;'><strong><span
                style='font-size:9.5pt;font-family:宋体;color:black'>六、我们如何处理未成年人的信息</span></strong></p>

                <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                0cm;text-indent:16.95pt;line-height:10.9pt;'><strong><u><span
                style='font-size:9.5pt;font-family:宋体;color:black'>在电子商务活动中我们推定您具有相应的民事行为能力。如您为未成年人，我们要求您请您的父母或监护人仔细阅读本隐私权政策，并在征得您的父母或监护人同意的前提下使用我们的服务或向我们提供信息。</span></u></strong></p>

                <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                0cm;text-indent:16.95pt;line-height:10.9pt;'><span
                style='font-size:9.5pt;color:black'>对于经父母或监护人同意使用我们的产品或服务而收集未成年人个人信息的情况，我们只会在法律法规允许、父母或监护人明确同意或者保护未成年人所必要的情况下使用、共享、转让或披露此信息。</span></p>

                <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                0cm;line-height:10.9pt;'><span lang=EN-US style='font-size:
                7.5pt;font-family:"Tahoma",sans-serif;color:#333333'>&nbsp;</span></p>

                <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                0cm;text-indent:16.95pt;line-height:10.9pt;'><strong><span
                style='font-size:9.5pt;font-family:宋体;color:black'>七、本隐私权政策如何更新</span></strong></p>

                <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                0cm;text-indent:16.95pt;line-height:10.9pt;'><span
                style='font-size:9.5pt;color:black'>我们的隐私权政策可能变更。</span></p>

                <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                0cm;text-indent:16.95pt;line-height:10.9pt;'><span
                style='font-size:9.5pt;color:black'>未经您明确同意，我们不会限制您按照本隐私权政策所应享有的权利。我们会在</span><span
                lang=EN-US><a
                href="javascript:;"><b><i><span
                lang=EN-US style='font-size:9.5pt;color:windowtext;text-decoration:none'><span
                lang=EN-US>专门页面</span></span></i></b></a></span><span style='font-size:9.5pt;
                color:black'>上发布对隐私权政策所做的任何变更。</span></p>

                <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                0cm;text-indent:16.95pt;line-height:10.9pt;'><span
                style='font-size:9.5pt;color:black'>对于重大变更，我们还会提供更为显著的通知（包括我们会通过农联贡菜网公示的方式进行通知甚至向您提供弹窗提示）。</span></p>

                <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                0cm;text-indent:16.95pt;line-height:10.9pt;'><span
                style='font-size:9.5pt;color:black'>本政策所指的重大变更包括但不限于：</span></p>

                <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                0cm;text-indent:16.95pt;line-height:10.9pt;'><span lang=EN-US
                style='font-size:9.5pt;color:black'>1</span><span style='font-size:9.5pt;
                color:black'>、我们的服务模式发生重大变化。如处理个人信息的目的、处理的个人信息类型、个人信息的使用方式等；</span></p>

                <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                0cm;text-indent:16.95pt;line-height:10.9pt;'><span lang=EN-US
                style='font-size:9.5pt;color:black'>2</span><span style='font-size:9.5pt;
                color:black'>、我们在控制权等方面发生重大变化。如并购重组等引起的信息控制者变更等；</span></p>

                <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                0cm;text-indent:16.95pt;line-height:10.9pt;'><span lang=EN-US
                style='font-size:9.5pt;color:black'>3</span><span style='font-size:9.5pt;
                color:black'>、个人信息共享、转让或公开披露的主要对象发生变化；</span></p>

                <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                0cm;text-indent:16.95pt;line-height:10.9pt;'><span lang=EN-US
                style='font-size:9.5pt;color:black'>4</span><span style='font-size:9.5pt;
                color:black'>、您参与个人信息处理方面的权利及其行使方式发生重大变化；</span></p>

                <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                0cm;text-indent:16.95pt;line-height:10.9pt;'><span lang=EN-US
                style='font-size:9.5pt;color:black'>5</span><span style='font-size:9.5pt;
                color:black'>、我们负责处理个人信息安全的责任部门、联络方式及投诉渠道发生变化；</span></p>

                <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                0cm;text-indent:16.95pt;line-height:10.9pt;'><span lang=EN-US
                style='font-size:9.5pt;color:black'>6</span><span style='font-size:9.5pt;
                color:black'>、个人信息安全影响评估报告表明存在高风险。</span></p>

                <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                0cm;text-indent:16.95pt;line-height:10.9pt;'><span
                style='font-size:9.5pt;color:black'>我们还会将本隐私权政策的旧版本在</span><span lang=EN-US><a
                href="javascript:;"><b><i><span
                lang=EN-US style='font-size:9.5pt;color:black;text-decoration:none'><span
                lang=EN-US>农联贡菜网专门页面</span></span></i></b></a></span><span style='font-size:
                9.5pt;color:black'>存档，供您查阅。</span></p>

                <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                0cm;text-indent:16.95pt;line-height:10.9pt;'><span lang=EN-US
                style='font-size:9.5pt;font-family:"微软雅黑",sans-serif;color:#333333'>&nbsp;</span></p>

                <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                0cm;text-indent:16.95pt;line-height:10.9pt;'><strong><span
                style='font-size:9.5pt;font-family:宋体;color:black'>八、如何联系我们</span></strong></p>

                <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                0cm;text-indent:16.95pt;line-height:10.9pt;'><span
                style='font-size:9.5pt;color:black'>您可以通过以下方式与我们联系，我们将在<span lang=EN-US>15</span>天内回复您的请求：</span></p>

                <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                0cm;text-indent:16.95pt;line-height:10.9pt;'><span lang=EN-US
                style='font-size:9.5pt;color:black'>1</span><span style='font-size:9.5pt;
                color:black'>、如对本政策内容有任何疑问、意见或建议，您可通过农联贡菜网客服及</span><span lang=EN-US><a
                href="javascript:;"><b><i><span lang=EN-US
                style='font-size:9.5pt;color:black;text-decoration:none'><span lang=EN-US>农联贡菜网</span></span></i></b></a></span><span
                style='font-size:9.5pt;color:black'>在线客服与我们联系；</span></p>

                <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                0cm;text-indent:16.95pt;line-height:10.9pt;'><span lang=EN-US
                style='font-size:9.5pt;color:black'>2</span><span style='font-size:9.5pt;
                color:black'>、如发现个人信息可能被泄露，您可以通过</span><span lang=EN-US><a
                href="javascript:;"><b><i><span
                style='font-size:9.5pt;color:black;text-decoration:none'>400-128-8566</span></i></b></a></span><span
                style='font-size:9.5pt;color:black'>投诉举报；</span></p>

                <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                0cm;text-indent:16.95pt;line-height:10.9pt;'><span lang=EN-US
                style='font-size:9.5pt;color:black'>3</span><span style='font-size:9.5pt;
                color:black'>、我们还设立了个人信息保护专职部门，您可以通过与其联系。</span></p>

                <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                0cm;text-indent:16.95pt;line-height:10.9pt;'><span
                style='font-size:9.5pt;color:black'>如果您对我们的回复不满意，特别是您认为我们的个人信息处理行为损害了您的合法权益，<strong><u><span
                style='font-family:宋体'>您还可以通过向被告住所地有管辖权的法院提起诉讼来寻求解决方案。</span></u></strong></span></p>

                <p class=MsoNormal><span lang=EN-US>&nbsp;</span></p>

                </div>
            `;
        }
        if (this.type == 4){
            this.title='用户协议'
            this.status=4
            this.content=`
                <div class=WordSection1 style='font-size:14px;'>

                    <p><span ><span style='
                    
                    '>农联贡菜</span></span><span
                    style='
                    
                    '>用户协议</span></p>

                    <p><span ><o:p>&nbsp;</o:p></span></p>

                    <p><span style='
                    
                    '>提示条款</span></p>

                    <p><span ><span style='
                    
                    '>农联高科</span></span><span
                    style='
                    
                    '>科技发展有限公司依照《农联贡菜用户协议》（下称“本协议”）向用户提供本网站及移动产品，包括相关的应用程序，用户可以在该产品</span><span
                    >/</span><span style='
                    
                    '>程序中下<span
                    >单购买</span>商品。用户注册或登录前，应仔细阅读《农联贡菜用户协议》，用户应在充分阅读、理解及认可本协议的所有规定后，根据农联贡<span
                    >菜注册</span>页面提示拨打客<span >服电话</span>进行注册，客服协助客户完成注册或者客户进行登录，视为用户与农联贡菜已达成本协议。</span></p>

                    <p><span style='
                    
                    '>用户决定注册或点击登录前，请务必认真阅读、充分理解各条款内容，特别是免除或者限制责任的条款、法律适用和管辖争议解决条款，免除或者限制责任的条款可能以黑体加粗或加下划线的形式提示用户重点注意。阅读本协议的过程中，如果用户不同意本协议或其中任何条款，用户应立即停止注册或登录程序。如果用户对本协议有任何疑问</span><span
                    >,</span><span style='
                    
                    '>可通过注册页面公布的联系方式咨询。如用户勾选“同意《农联贡菜用户协议》”并通过登录或者其他任何方式使用、接受农联贡菜的任何服务，即视为用户已阅读并同意本协议，自愿接受本协议所有内容的约束。请用户在决定注册或使用服务前再次确认已知悉并完全理解本协议的所有内容。</span></p>

                    <p><span style='
                    
                    '>农联贡菜有权对本协议条款进行修改，修改后的协议自公布之日起生效，在生效后即代替原来的协议。用户可随时查阅最新协议。为给用户提供更好的服务，农联贡菜的业务将不时变化，本协议也将随之调整。农联贡菜会通过在农联贡菜客户端上发出更新版本或以其他方式提醒用户相关内容的更新，用户应当及时查阅并了解本协议的最新内容。在上述情况下，若用户继续使用农联贡菜的服务，即表示同意接受修改后的本协议并受之约束。</span></p>

                    <p><span style='
                    
                    '>本协议内容同时包括：</span></p>

                    <p><span style='
                    
                    '>（</span><span
                    >1</span><span style='
                    
                    '>）</span><span
                    >&nbsp; </span><span style='
                    
                    '>本《农联贡菜用户协议》文本（下载地址：《农联贡菜用户协议》）；</span></p>

                    <p><span style='
                    
                    '>（</span><span
                    >2</span><span style='
                    
                    '>）《隐私政策》（链接地址：《隐私政策》</span>
                    <span style='
                    
                    '>）：农联贡<span >菜非常</span>重视用户提供的个人信息和隐私的保护，将按照《隐私政策》中所公布的政策在具体服务中进行隐私及个人信息的收集、存储、使用、披露等活动。用户在注册登录账号前，应仔细阅读《隐私政策》。</span></p>

                    <p><span style='
                    
                    '>（</span><span
                    >3</span><span style='
                    
                    '>）由于互联网高速发展，为防止用户与农联贡<span
                    >菜签署</span>的本协议列明的条款，无法及时完整罗列并覆盖用户与农联贡<span >菜所有</span>权利与义务，农联贡菜售后规则、发票规则、<span
                    >配送费</span>规则、退换货规则、订单取消规则等服务规则均为本协议的补充协议，构成本协议不可分割的一部分，且具有同等法律效力。农联贡菜可按照前述关于本协议条款修改方式的约定对服务规则进行修改或调整。如服务规则与本协议有不一致之处，适用该服务规则。如用户与农联贡菜已达成《农联贡菜用户协议》，使用农联贡菜服务，视为用户同意上述服务规则。</span></p>

                    <p><span style='
                    
                    '>（</span><span
                    >4</span><span style='
                    
                    '>）第三<span
                    >方服务</span>相关的用户授权协议。为方便您在使用农联贡<span >菜服务</span>的同时，根据您自身需要，通过农联贡菜进行跳转等方式，自愿选择接受<span
                    >独立第三方服务</span>商及部分关联第三<span >方服务</span>商所提供的服务，您将在使用该第三<span
                    >方服务</span>前对相应的用户授权协议予以同意确认，以作为您和农联贡菜之间就该第三<span >方服务</span>的使用所涉及的相关事项的权利义务依据。</span></p>

                    <p><span style='
                    
                    '>一、定义条款</span></p>

                    <p><span >1.1 </span><span style='
                    
                    '>“农联贡菜”：<span
                    >指农联高科</span>科技发展有限公司运营和管理的、提供服务的域名为</span><span >www.b2b.nlyz365.com</span><span
                    style='
                    
                    '>的网站、客户端及未来技术发展出现的新的服务形态。</span></p>

                    <p><span >1.2</span><span style='
                    
                    '>“用户”：接受并同意本协议全部条款及其他全部服务规则、通过农联贡菜进行交易的农联贡<span
                    >菜注册</span>会员商户（根据农联贡菜流程直接登录视为已注册）。</span></p>

                    <p><span >1.3</span><span style='
                    
                    '>“农联贡菜服务”：<span
                    >指农联高科</span>科技发展有限公司向用户提供的商品发布、网页浏览、信息交流、商品交易以及线上空间、技术支持、相关软件、系统维护等相关服务。</span></p>

                    <p><span >1.4</span><span style='
                    
                    '>“服务规则”：指在农联贡菜上已经发布或将来可能发布的各种规范性文件，包括但不限于协议、协议附件、细则、服务规则等各类规则、使用说明等及主页、商品页面或其它页面发布的常见问题说明、商品说明、退换货说明、通知、公告、其它文字说明、服务条款等。</span></p>

                    <p><span >1.5</span><span style='
                    
                    '>“账户”：指用户作为唯一授权使用方，可以登录农联贡菜的一个服务账户（该账户形式可能是在农联贡<span
                    >菜注册</span>所获得的农联贡菜账户、用户填写的手机号、电子邮箱等农联贡<span >菜支持</span>的其他形式账户，具体形式以农联贡<span
                    >菜实施</span>为准）。</span></p>

                    <p><span >1.6</span><span style='
                    
                    '>“互联网支付服务”：指具有互联网支付合法资质的第三方支付机构为用户完成交易、转移资金提供的支付服务，详情见该第三方支付机构通过用户与其所签订的约定其所提供支付服务的协议、公司网站、电子邮件或其他形式所公布的相关规则及说明。农联贡<span
                    >菜对于</span>用户与第三方支付机构之间所产生的权利义务和争议不承担相应责任。</span></p>

                    <p><span >1.7</span><span style='
                    
                    '>“关联公司”：<span
                    >指农联高科</span>科技发展有限公司直接或间接参股、控股，或与农联高<span >科科技</span>发展有限公司受同一股东直接或间接参股、控股，或与农联高<span
                    >科科技</span>发展有限公司经营同一主打品牌、共同进行经营管理的公司。</span></p>

                    <p><span >1.8</span><span style='
                    
                    '>“销售者”：指通过农联贡<span
                    >菜实际</span>向用户销售商品或服务的主体，包括农联贡菜运营者及其分公司、子公司、关联公司，也包括未来可能引进的其它合作销售商。销售者与用户通过农联贡菜进行的商品买卖、配送、退换货等均受本协议约束。</span></p>

                    <p><span style='
                    
                    '>二、用户注册</span><span
                    >/</span><span style='
                    
                    '>登录</span></p>

                    <p><span >2.1.</span><span style='
                    
                    '>注册</span><span
                    >/</span><span style='
                    
                    '>登录资格</span></p>

                    <p><span style='
                    
                    '>用户承诺：用户是拥有符合现行有效法律法规的相关民事能力、资质能力的、有权与农联贡<span
                    >菜达成</span>本协议的合法民事主体，可以进行注册</span><span >/</span><span
                    style='
                    
                    '>登录及使用农联贡菜进行交易。</span></p>

                    <p><span ><span style='
                    
                    '>您承诺</span></span><span
                    style='
                    
                    '>并确认，您作为农联贡菜的服务对象，是以生产、经营为目的，而非以最终消费为目的的商户。</span></p>

                    <p><span >2.2.</span><span style='
                    
                    '>注册</span><span
                    >/</span><span style='
                    
                    '>登录目的</span></p>

                    <p><span style='
                    
                    '>用户承诺：用户进行用户注册</span><span
                    >/</span><span style='
                    
                    '>登录并非出于违反法律法规或破坏农联贡<span
                    >菜网络</span>交易秩序的目的。</span></p>

                    <p><span >2.3.</span><span style='
                    
                    '>注册</span><span
                    >/</span><span style='
                    
                    '>登录流程</span></p>

                    <p><span >2.3.1</span><span style='
                    
                    '>用户充分理解《农联贡菜用户协议》后，通过注册页面提示拨打客<span
                    >服电话</span>进行注册，注册完成后用户获得初始密码和账号。用户通过“初始密码</span><span >+</span><span
                    style='
                    
                    '>账号”或“手机号</span><span >+</span><span style='
                    
                    '>农联贡菜发送的验证码”进行登录，用户登录后应务必对原始登录密码进行修改。</span></p>

                    <p><span >2.3.2</span><span style='
                    
                    '>用户应确保所提供全部信息（包括名称</span><span
                    >/</span><span style='
                    
                    '>姓名、地址、联系人、联系电话、邮箱等）的真实性、完整性和准确性。用户的注册资料若有变动，应及时联系<span
                    >农联贡菜客服人</span>员进行变更。如因用户提供的信息不合法、不真实、不准确、不详尽或未及时更新的，用户需承担因此引起的相应的责任及后果。</span></p>

                    <p><span >2.3.3 </span><span style='
                    
                    '>为了用户更好的使用各项服务，尤其是第三方支付服务，保障用户账户安全，农联贡菜可能要求用户完成实名认证。</span></p>

                    <p><span >2.3.4 </span><span style='
                    
                    '>农联贡菜将对用户所提交的注册信息予以保护，不会将其披露给任何非关联的第三方，除非：</span></p>

                    <p><span style='
                    
                    '>（</span><span
                    >1</span><span style='
                    
                    '>）相关法律法规或国家机关要求；</span></p>

                    <p><span style='
                    
                    '>（</span><span
                    >2</span><span style='
                    
                    '>）农联贡菜发生相关合并、分立、收购或资产转移；</span></p>

                    <p><span style='
                    
                    '>（</span><span
                    >3</span><span style='
                    
                    '>）为提供相关服务所必须的。</span></p>

                    <p><span style='
                    
                    '>对于用户所提交的注册信息中涉及个人信息的内容，农联贡菜将严格按照《隐私政策》的规定进行收集、处理和使用。</span></p>

                    <p><span >2.3.5 </span><span style='
                    
                    '>除因历史原因、业务整合等农联贡菜所认可的特殊情况外，农联贡菜原则上只允许用户使用一个农联贡<span
                    >菜用户</span>账号。如有证据证明或农联贡菜有理由相信用户存在不当注册或不当使用多个农联贡菜账号的情形，农联贡菜可将相关账号信息进行合并或采取其他合理措施，如因用户不当注册或不当使用给农联贡菜及相关方造成损失的，用户还应承担相应的赔偿责任。此外，出于相关业务需要，农联贡菜也可对同一用户的多个账号或相关信息进行合并，如合并将对用户的权益产生实质影响，农联贡菜将在进行上述合并前事先征得用户的同意。</span></p>

                    <p><span style='
                    
                    '>三、用户服务</span></p>

                    <p><span style='
                    
                    '>农联贡菜为用户进行网络交易活动提供农联贡菜服务。</span></p>

                    <p><span >3.1</span><span style='
                    
                    '>服务内容</span></p>

                    <p><span >3.1.1</span><span style='
                    
                    '>用户有权在农联贡菜浏览商品信息、有权通过农联贡菜下达购买商品的订单、支付价款等。</span></p>

                    <p><span >3.1.2</span><span style='
                    
                    '>用户有权在农联贡菜查看其账户下的信息，有权使用农联贡菜提供的功能进行相关操作。</span></p>

                    <p><span >3.1.3</span><span style='
                    
                    '>用户有权按照农联贡<span
                    >菜发布</span>的活动规则参与农联贡菜组织的线上线下活动。</span></p>

                    <p><span >3.1.4</span><span style='
                    
                    '>农联贡<span
                    >菜承诺</span>为用户提供的其他服务。</span></p>

                    <p><span >3.2</span><span style='
                    
                    '>服务规则</span></p>

                    <p><span style='
                    
                    '>用户承诺遵守包括但不限于下列农联贡<span
                    >菜服务</span>规则：</span></p>

                    <p><span >3.2.1</span><span style='
                    
                    '>用户应当遵守法律法规、规章、规范性文件及政策要求的规定，不得在农联贡菜或利用农联贡<span
                    >菜服务</span>从事非法的或其他损害农联贡菜及第三方权益的活动：如发送或接收任何违法、违规、违反公序良俗、侵犯他人权益的信息，发送或接收传销材料或存在其他危害的信息或言论，未经农联贡菜授权使用或伪造农联贡菜电子邮件题头信息等。</span></p>

                    <p><span >3.2.2&nbsp; </span><span style='
                    
                    '>用户承诺在农联贡菜上购买商品过程中遵守法律法规、不违背社会公德及遵守诚实信用原则，不扰乱农联贡菜的正常经营秩序，用户亦不得实施以下行为：</span><span
                    style=''>&#8232;</span><span
                    style='
                    
                    '>（</span><span >1</span><span style='
                    
                    '>）不应利用农联贡菜或相关服务危害国家安全、破坏政治稳定、泄露国家秘密，不侵犯国家、社会、集体利益和第三方的合法权益，不从事违法犯罪活动，不设立用于实施诈骗，传授犯罪方法，制作或者销售违禁物品、管制物品等违法犯罪活动的网站、通讯群组，不利用网络发布涉及实施诈骗，制作或者销售违禁物品、管制物品以及其他违法犯罪活动的信息；</span></p>

                    <p><span style='
                    
                    '>（</span><span
                    >2</span><span style='
                    
                    '>）<span
                    >不</span>应制作、发布、复制、查阅和传播、存储、链接下列信息：反对宪法所确定的基本原则的；危害国家安全，泄露国家秘密，颠覆国家政权，推翻社会主义制度，煽动分裂国家，破坏国家统一的；损害国家荣誉和利益的；煽动民族仇恨、民族歧视，破坏民族团结的；破坏国家宗教政策，宣扬邪教和封建迷信的；煽动非法集会、结社、游行、示威、聚众扰乱社会秩序的；捏造、散布谣言，侵犯他人权利，扰乱经济、社会秩序，破坏社会稳定的；散布淫秽、色情、赌博、暴力、凶杀、恐怖或者教唆犯罪的；侮辱或者诽谤他人，侵害他人合法权益的；宣扬恐怖主义、极端主义的；违背当地风俗习惯的；含有法律、行政法规禁止的其他内容的；</span></p>

                    <p><span style='
                    
                    '>（</span><span
                    >3</span><span style='
                    
                    '>）<span
                    >不</span>应从<span >事下列</span>危害计算机信息网络安全的活动：对网络服务及相关软硬件设施进行破解、破坏、删除、修改或者增加的；对计算机信息网络中存储或者传输的数据和应用程序进行删除、修改或者增加的；使用软件或硬件等方式窃取他人口令、非法入侵他人计算机系统；故意制作、传播计算机病毒等破坏性程序的；其他危害计算机信息网络安全的活动；通过任何方式对农联贡<span
                    >菜造成</span>或可能造成不合理或不合比例的重大负荷；通过发送病毒、木马等行为攻击其它用户的账号或终端设备；</span></p>

                    <p><span style='
                    
                    '>（</span><span
                    >4</span><span style='
                    
                    '>）不应擅自复制和使用网络上未公开和未授权的文件。除非相关著作权人明示同意，不应在网络中擅自破解、传播、下载或复制第三人享有著作权的软件或进行其他任何侵害他人知识产权的活动；</span></p>

                    <p><span style='
                    
                    '>（</span><span
                    >5</span><span style='
                    
                    '>）不应私自传播广告信息或以“刷单”等不正当方式帮助他人提升评价或利用评价权利对其他用户、商户实施威胁、敲诈勒索；</span></p>

                    <p><span style='
                    
                    '>（</span><span
                    >6</span><span style='
                    
                    '>）不应对农联贡<span
                    >菜相关</span>服务的使用行为导致农联贡菜卷入政治和公共事件；</span></p>

                    <p><span style='
                    
                    '>（</span><span
                    >7</span><span style='
                    
                    '>）不应通过侵犯第三人合法权益、作弊、扰乱系统、实施网络攻击、恶意套现、刷信誉、批量注册、用机器注册农联贡菜账户、用机器模拟客户端等手段进行交易或参加农联贡菜及其所授权的第三方发布的任何活动。</span></p>

                    <p><span style='
                    
                    '>（</span><span
                    >8</span><span style='
                    
                    '>）未经农联贡菜事先书面许可，不应自行或授权、协助任何第三方非法抓取农联贡菜所展示的任何内容（“非法抓取”是指采用未经农联贡菜认可的程序或者非正常浏览等技术手段获取内容数据的行为），包括但不限于以任何机器人软件、蜘蛛软件、爬虫软件、刷<span
                    >屏软件</span>等非农联贡菜认可的方式访问或登录农联贡菜。</span></p>

                    <p><span style='
                    
                    '>（</span><span
                    >9</span><span style='
                    
                    '>）冒充农联贡菜工作人员欺骗其他用户；</span></p>

                    <p><span style='
                    
                    '>（</span><span
                    >10</span><span style='
                    
                    '>）下单后无正当理由拒不收货；</span></p>

                    <p><span style='
                    
                    '>（</span><span
                    >11</span><span style='
                    
                    '>）通过留言、评价等手段发送违规或垃圾信息；</span></p>

                    <p><span style='
                    
                    '>（</span><span
                    >12</span><span style='
                    
                    '>）协助他人获取不正当利益；教唆他人从事本协议所禁止的行为。</span></p>

                    <p><span style='
                    '>&#8232;</span><span >3.2.3</span><span style='
                    
                    '>未经农联贡菜同意，用户不得在农联贡菜上发布任何形式的广告。</span><span
                    style=''>&#8232;</span><span
                    >3.2.4 </span><span style='
                    
                    '>除本协议另有明确约定外，用户理解并保证不利用在农联贡菜上注册的账户进行经营活动、牟利行为及其他未经农联贡菜许可的行为，包括但不仅限于以下行为：</span></p>

                    <p><span style='
                    
                    '>①</span> <span
                    style='
                    
                    '>用户账户内的任何农联贡<span >菜优惠</span>信息（包括但不限于抵用<span
                    >券</span>、积分），由农联贡菜享有解释权和修改权，用户仅享有在农联贡菜购物时的使用权，严禁用户转卖农联贡菜账户、抵用<span
                    >券</span>、积分及其他类型的优惠券或利用农联贡菜账户进行任何经营性行为等；</span></p>

                    <p><span style='
                    
                    '>②严禁用户为获取优惠、折扣或其他利益，恶意利用技术手段或其他方式（如注册多个账户下单等），实施影响其他用户正常消费或相关合法权益、影响农联贡<span
                    >菜正常</span>销售秩序等行为；</span></p>

                    <p><span style='
                    
                    '>③如果用户是为农联贡菜提供商品或服务的供应商、代理商以及合作商家，则不得对其所供商品或服务进行回购等行为；</span></p>

                    <p><span style='
                    
                    '>④任何对商品目录、说明、价格、数量、其他用户信息或其他内容的下载、转载、收集、衍生利用、复制、出售、转售或其他形式的使用，无论是否通过</span><span
                    >Robots</span><span style='
                    
                    '>、</span><span
                    >Spiders</span><span style='
                    
                    '>、自动仪器或手工操作；</span></p>

                    <p><span >3.2.5</span><span style='
                    
                    '>如用户在使用农联贡<span
                    >菜服务</span>过程中涉及上述行为中的一项或多项，则需要对自己的行为承担法律责任。承担法律责任的形式包括但不限于：对受到侵害者进行赔偿，以及在农联贡<span
                    >菜首先</span>承担了因用户的行为导致的行政处罚或侵权损害赔偿责任等损失（含诉讼费、律师费等相关法律程序费用）后，用户应立即给予农联贡菜等额的赔偿。此外，根据具体违法违规情形，农联贡菜有权<span
                    >作出</span>独立判断，立即暂停或终止对用户提供部分或全部服务，包括锁定、注销、删除<span >帐号</span>、冻结账号内余额（如有）、取消相应交易订单、要求销售者停止发货等措施。同时，用户同意，如因用户的行为造成他人的经济损失的，农联贡菜可出于公共利益保护、商业利益保护等原则，在合法合<span
                    >规</span>的前提下，从用户的钱袋宝账户（如有）中划<span >扣相应</span>款项，用户同意并授权、委托农联贡菜进行上述划扣操作。</span></p>

                    <p><span style='
                    
                    '>用户知悉并理解，如果农联贡菜发现用户的上述违法违规行为，依据相关法律法规的规定，农联贡菜有权或有义务立即停止相关服务，删除或屏蔽相关违规信息、服务评价，并视情况进行调查取证，保存有关记录，或向国家有关机关举报。同时，农联贡菜有权自主删除、屏蔽含有该内容的任何数据信息。农联贡菜将根据国家相关法律法规要求，对依法删除、屏蔽的数据信息予以记录、保存。</span></p>

                    <p><span >&nbsp;</span></p>

                    <p><span style='
                    
                    '>四、交易规则</span></p>

                    <p><span style='
                    
                    '>用户承诺其通过农联贡菜进行交易的过程中良好遵守如下农联贡<span
                    >菜交易</span>规则。</span></p>

                    <p><span >4.1</span><span style='
                    
                    '>浏览商品信息</span></p>

                    <p><span style='
                    
                    '>用户在农联贡菜浏览商品信息时，应当仔细阅读商品信息中包含的全部内容，包括但不限于商品的名称、种类、数量、质量、价格、有效期、配送条件、退换<span
                    >货方</span>式、退款条件、售后服务等内容，其中用户应特别注意商品的退款条件等内容，用户完全接受商品信息中包含的全部内容后方可点击购买。</span></p>

                    <p><span >4.2</span><span style='
                    
                    '>提交及确认商品订单</span></p>

                    <p><span >4.2.1</span><span style='
                    
                    '>用户应当仔细阅读商品订单页面中所包含的全部内容，包括但不限于商品信息中的全部内容、为再次提示用户注意而标明的本<span
                    >单商品</span>的退款条件等内容（如有），选择及确认购买数量、价格、应付总额、接收货物的收货地址、送货时间、收货人等内容。销售者依据用户填写的收货地址及收货人进行配送，如果实际收货人与用户注册信息联系人或用户填写的收货人不一致的，实际收货人的签收或其它意思表示或行为，即视为用户的意思表示或行为，其法律效果由用户承担。</span></p>

                    <p><span >4.2.2 </span><span style='
                    
                    '>除法律另有强制性规定外，双方约定如下：农联贡菜上展示的商品和价格等信息仅仅是要约邀请，用户下单时须填写用户希望购买的商品数量、价款及支付方式、收货人、联系方式、收货地址等内容；系统生成的订单信息是计算机信息系统根据用户填写的内容自动生成的数据，仅是用户向销售者发出的合同要约；销售者收到用户的订单信息后，只有在销售者将用户在订单中订购的商品实际直接向用户发出时方视为用户与销售者之间就实际向用户发出的商品建立了合同关系；如果用户在一份订单里订购了多种商品并且销售者只给用户发出了部分商品时，用户与销售者仅就实际向用户发出的商品建立了合同关系；只有在销售者实际向用户发出了订单中订购的其他商品时，用户和销售者之间就订单中其他商品才成立合同关系。用户可以随时登录农联贡菜，查询用户的订单状态。</span></p>

                    <p><span >4.2.3</span><span style='
                    
                    '>商品交易合同关系一经成立，商品订单中所包含的全部内容即为商品合同的内容，具体包括但不限于商品的名称、种类、数量、质量、价格、有效期、配送条件、退换<span
                    >货方</span>式、退款条件、售后服务，及用户填写的商品数量、价款及支付方式、收货人、联系方式、收货地址等，用户与销售者均应当按照前述商品合同的约定履行各自的权利义务。</span></p>

                    <p><span >4.2.4</span><span style='
                    
                    '>由于市场变化及各种以合理商业努力难以控制的因素的影响，销售者无法保证用户提交的订单信息中希望购买的商品都会有货；在一些情况下，农联贡菜也会存在库存不足，以及配送员运力不足，以及不可抗力等导致的履约不能的可能。如果发生这种情况，用户或销售者均有权取消订单。用户已支付货款的，交易价款应原路返还用户付款账户。</span></p>

                    <p><span >4.2.5</span><span style='
                    
                    '>销售者有权在发现农联贡<span
                    >菜显示</span>的商品及订单明显错误、有重大瑕疵或缺货的情况下，销售者将和您协商处理。在协商无果的情况下，销售者有权单方面撤回这些信息或撤销该订单。销售者保留对商品订购数量的限制权。</span></p>

                    <p><span >4.3.</span><span style='
                    
                    '>支付商品价款</span></p>

                    <p><span style='
                    
                    '>用户应根据付款页面的提示通过网上支付农联贡<span
                    >菜完成</span>商品价款的支付。<span >除货到</span>付款的商品外（如有），用户在支付商品价款之前无权要求销售者向用户提供商品。</span></p>

                    <p><span >4.4.</span><span style='
                    
                    '>配送规则</span></p>

                    <p><span >4.4.1</span><span style='
                    
                    '>为保证用户的购物体验，如有特别标明，则商品由销售者向用户提供送货服务。在此情况下，为用户提供送货服务的一方将向用户收取一定的配送服务费用，具体金额以用户下单时系统显示的费用为准，用户知悉并授权销售者及其指定的第三方配送机构将商品送到用户所指定的收货地址。</span></p>

                    <p><span >4.4.2</span><span style='
                    
                    '>所有在农联贡菜上显示的送货时间和预计送达时间（如有）为参考时间，参考时间的计算是根据库存状况、正常的处理过程和送货时间、送货地点的基础上估计得出的，具体送出和送达时间以实际为准。如下情况的订单延迟或无法配送等，农联贡菜及销售者不承担延迟配送的责任：</span></p>

                    <p><span style='
                    
                    '>①用户提供的信息错误、地址不详细等原因导致的；</span></p>

                    <p><span style='
                    
                    '>②货物送达后无人签收，导致无法配送或延迟配送的；</span></p>

                    <p><span style='
                    
                    '>③约定特殊时间段内送货的；</span></p>

                    <p><span style='
                    
                    '>④比农联贡<span
                    >菜显示</span>送出和送达时间迟延在</span><span >24</span><span
                    style='
                    
                    '>小时以内的；</span></p>

                    <p><span style='
                    
                    '>⑤不可抗力因素导致的，例如：自然灾害、交通戒严、交通管制、突发战争等。</span></p>

                    <p><span >4.4.3 </span><span style='
                    
                    '>收货人在签收商品时，应当对商品进行验收，发现存在商品破损、表面不一或其它质量问题的，有权拒绝签收商品，留存开封和商品质量问题的视频作为证据，并在纸质配送单（收货人联和承运人联）上备注详细情况并让承运人签字确认或者直接退回商品。</span></p>

                    <p><span style='
                    
                    '>收货人未保留上述证据而拒收的，视为已签收；收货人签收后未进行验收或未留存开封和商品质量问题的证明但此后主张此类商品质量问题的，销售者及农联贡菜不承担因此产生的责任，但是无法从外观中当即发现的商品质量问题除外。</span></p>

                    <p><span >4.4.4 </span><span style='
                    
                    '>如用户下单时选择使用电子配送单，承运人在交付商品时，收货人应当场对商品进行验收，发现存在商品破损、表面不一或其它质量问题的，应直接拒收商品，留存开封和商品质量问题的视频作为证据，如收货人接收商品视为承运人已完成交付。</span></p>

                    <p><span style='
                    
                    '>承运人完成交付后，用户应及时在农联贡菜上点击确认收货，用户有七天时间进行确认，如商品存在问题或需要申请退换货等请及时联系客服，以免系统自动确认收货。</span></p>

                    <p><span style='
                    
                    '>该笔订单确认收货后视为已签收，签收后用户主张商品数量、质量问题的，销售者及农联贡菜不承担因此产生的责任，但是无法从外观中当即发现的商品质量问题除外。用户可以在农联贡菜中查看该笔订单交易的电子配送单，该电子配送单与纸质配送单具有相同的法律效力。</span></p>

                    <p><span >4.5</span><span style='
                    
                    '>退款</span><span
                    >/</span><span style='
                    
                    '>退货</span><span
                    >/</span><span style='
                    
                    '>换货规则</span></p>

                    <p><span >4.5.1</span><span style='
                    
                    '>用户支付商品价款成功后，有下列情形的，用户有权要求农联贡菜或销售者退款：</span></p>

                    <p><span style='
                    
                    '>①用户付款成功后开始配送前，因不可抗力或非用户原因，导致无法向用户提供商品的；</span></p>

                    <p><span style='
                    
                    '>②用户付款成功后，因确属情况变化导致销售者需要变更商品合同内容，用户不接受变更<span
                    >后内容</span>的。</span></p>

                    <p><span >4.5.2</span><span style='
                    
                    '>用户支付商品价款成功后，有下列情形的，用户有权要求销售者退货或换货</span><span
                    >,</span><span style='
                    
                    '>但换货商品只能针对同一商品、不同批次的更换，不支持商品间换货及差价换货：</span></p>

                    <p><span style='
                    
                    '>①因商品存在质量问题的，用户应提供相关证明文件，并应于签收订单起</span><span
                    >24</span><span style='
                    
                    '>小时内与农联贡<span
                    >菜联系</span>退换货事宜；</span></p>

                    <p><span style='
                    
                    '>②对国家质量监督检验检疫总局公告的存在质量问题的食品。</span></p>

                    <p><span >4.5.3</span><span style='
                    
                    '>用户支付商品价款成功后，有下列情形的，用户不得要求销售者及农联贡菜退货或换货或退款：</span></p>

                    <p><span style='
                    
                    '>①任何非通过农联贡菜出售的商品；</span></p>

                    <p><span style='
                    
                    '>②任何已使用过的商品；</span></p>

                    <p><span style='
                    
                    '>③任何因用户原因导致超过保质期的商品；</span></p>

                    <p><span style='
                    
                    '>④任何因非正常使用及保管导致出现质量问题的商品；</span></p>

                    <p><span style='
                    
                    '>⑤未经授权的误用、疏忽、滥用、事故、改动、不正确的使用方法所造成的商品质量问题，或撕毁、涂改标贴、防伪标记的商品；</span></p>

                    <p><span style='
                    
                    '>⑥商品的图片及信息仅供参照，具体以实物为准。因拍摄灯光及不同显示器而导致的色差等问题，不属质量问题，不予退货、换货或退款；</span></p>

                    <p><span style='
                    
                    '>⑦对于商品数量缺失的情况，只受理当场投诉，即商品送达目的地后，收货人当面清点货物数量，若有异议需当场向配送者及农联贡菜提出；对于收货人签收后发现的数量缺失的情况，不予补货或退款。</span></p>

                    <p><span >4.5.4 </span><span style='
                    
                    '>用户退货的商品应当完好。同时，除非因商品存在质量问题，退换<span
                    >货商品</span>产生的运费由用户承担。</span></p>

                    <p><span >4.5.5 </span><span style='
                    
                    '>如果农联贡菜另行发布售后规则的，该规则属于本协议的一部分，与本协议具有同等效力；如与本协议有冲突的，以农联贡菜另行发布的售后规则为准。服务规则有变更的，以新变更的规则为准，请用户注意及时查看。</span></p>

                    <p><span >4.5.6 </span><span style='
                    
                    '>实际交易之中，如果农联贡菜或销售者给予用户的退货或退款条件比本协议约定的条件更为优越，<span
                    >不</span>视为<span >农联贡菜于本</span>协议项下约定的权利的减损和义务的加重。</span></p>

                    <p><span style='
                    
                    '>五、用户的权利和义务</span></p>

                    <p><span >5.1</span><span style='
                    
                    '>用户有权按照本协议约定接受农联贡菜提供的农联贡<span
                    >菜服务</span>并在服务页面查询用户相关信息。</span></p>

                    <p><span >5.2 </span><span style='
                    
                    '>用户有权要求销售者提供与订单相符的发票，具体开票规则以农联贡菜另行发布的发票规则为准或者由用户与销售者另行协商确定。</span></p>

                    <p><span >5.3 </span><span style='
                    
                    '>用户获得初始登录密码后应及时修改，并应当妥善使用和保管农联贡菜账号、密码、数字证书（如有）、手机动态口令（如有）、账户绑定的手机号码及农联贡菜关联账户银行账户、卡号、密码、开户行预留的手机号码，及来自于农联贡菜或开户行向用户发送的校验码等与农联贡菜账户或与农联贡菜账户关联的银行账户有关的一切信息和设备。若上述信息发生泄漏等，按照以下约定处理：</span></p>

                    <p><span style='
                    
                    '>①如用户更换、暂停或终止使用上述信息或设备，或遗失或泄露前述信息或设备的，用户应及时通知农联贡菜并及时联系农联贡菜进行解绑、变更或注销处理，以减少可能发生的损失。无论是否已通知农联贡菜，因上述原因所致损失需由用户自行承担。</span></p>

                    <p><span style='
                    
                    '>②若因用户未主动或及时更改初始登录密码，或者用户主动泄露账户信息或遭受他人攻击、诈骗或其他行为导致的损失及后果，由用户自己承担。</span></p>

                    <p><span style='
                    
                    '>③当用户发现农联贡菜账号被未经其授权的第三方使用或存在其他账号安全问题时，应立即有效通知农联贡菜暂停该农联贡菜账号的服务。用户理解农联贡菜对用户的任何请求采取行动均需要合理时间，且农联贡<span
                    >菜应用</span>户的请求而采取的行动可能无法避免或阻止侵害后果的形成或扩大，除农联贡<span >菜存在</span>法定过错外，农联贡菜不承担责任。用户在未经农联贡<span
                    >菜同意</span>的情况下不得将农联贡菜账号以赠与、借用、租用、转让或其他方式处分给他人。</span></p>

                    <p><span style='
                    
                    '>④凡使用注册用户名、手机号、账户和手机验证码、密码进行交易、提出交易条件、或做出其它意思表示的，均视为用户的意思表示，因此产生的交易效果由用户承担。但用户在交易前已有效通知农联贡菜挂失账户的除外。</span></p>

                    <p><span style='
                    
                    '>六、农联贡菜的权利和义务</span></p>

                    <p><span >6.1</span><span style='
                    
                    '>如用户不具备本协议约定的注册资格，则农联贡菜有权拒绝用户进行注册，若该用户已经注册，则农联贡菜有权注销该用户的农联贡菜账号，农联贡<span
                    >菜因此</span>而遭受损失的有权向前述用户主张赔偿。同时，农联贡菜保留其他任何情况下是否接受用户注册的权利。</span></p>

                    <p><span >6.2</span><span style='
                    
                    '>农联贡<span
                    >菜发现</span>账户使用者并非账户初始注册人时，有权中止该账户的使用。</span></p>

                    <p><span >6.3</span><span style='
                    
                    '>农联贡<span
                    >菜通过</span>技术检测、人工抽检等检测方式合理怀疑用户提供的信息错误、不实、失效或不完整时，有权通知用户更正、更新信息或中止、终止为其提供农联贡菜服务。</span></p>

                    <p><span >6.4</span><span style='
                    
                    '>农联贡菜有权在发现农联贡菜上显示的任何信息存在明显错误时，对信息予以更正。</span></p>

                    <p><span >6.5</span><span style='
                    
                    '>用户付款成功前，农联贡菜有权对订单内容做出变更，如用户接受变更后的内容则用户可确认订单及付款，如用户不接受变更<span
                    >后内容</span>则有权取消订单。用户付款成功后，如确因情况变化导致需对订单内容做出变更的，农联贡菜有权单方对订单内容<span
                    >作出</span>变更，如用户接受变更则销售者按变更后的订单内容进行配送，如用户不接受变更则用户有权取消订单并要求农联贡菜全额退款。</span></p>

                    <p><span >6.6</span><span style='
                    
                    '>农联贡菜保留修改、中止或终止农联贡<span
                    >菜服务</span>的权利，农联贡菜行使前述权利将按照法律规定的程序及方式告知用户。</span></p>

                    <p><span >6.7</span><span style='
                    
                    '>农联贡<span
                    >菜应当</span>采取必要的技术手段和管理措施保障农联贡菜的正常运行，并提供必要、可靠的交易环境和交易服务，维护交易秩序。</span></p>

                    <p><span >6.8</span><span style='
                    
                    '>如用户连续一年未使用农联贡菜账号和密码登录农联贡菜，则农联贡菜在通知用户后，有权注销用户的农联贡菜账号。</span></p>

                    <p><span >6.9</span><span style='
                    
                    '>农联贡菜有权在本协议履行期间及本协议终止后保留用户的注册信息及用户使用农联贡<span
                    >菜服务</span>期间的全部交易信息，但不得非法使用该等信息。</span></p>

                    <p><span >6.10</span><span style='
                    
                    '>农联贡菜有权随时删除农联贡菜网站内各类不符合国家法律法规、规范性文件或农联贡菜网站规定的用户评价等内容信息，农联贡菜行使该等权利不需提前通知用户。</span></p>

                    <p><span style='
                    
                    '>七、用户个人信息</span></p>

                    <p><span >7.1</span><span style='
                    
                    '>用户个人信息收集与使用</span></p>

                    <p><span >7.1.1</span><span style='
                    
                    '>用户在农联贡菜网站进行注册、浏览、下单购物、参加活动等行为时，涉及用户提供的个人的真实姓名</span><span
                    >/</span><span style='
                    
                    '>名称、收货地址、联系电话、电子邮箱、订单详情等信息的，农联贡菜有权从完成交易、提供配送、售后及客户服务、开展活动、完成良好的用户体验等多种角度予以收集，并将对其中涉及个人隐私信息予以严格保护。</span></p>

                    <p><span >7.1.2</span><span style='
                    
                    '>农联贡菜还可能在下述情况下收集和使用用户个人信息：</span></p>

                    <p><span style='
                    
                    '>①农联贡菜在用户使用服务过程中可能收集的个人信息，包括日志信息、位置信息、设备信息；</span></p>

                    <p><span style='
                    
                    '>②为了维护或改进农联贡菜的产品</span><span
                    >\</span><span style='
                    
                    '>服务，从农联贡菜关联公司中获取的信息，以及收集的个人行为偏好、位置信息。</span></p>

                    <p><span >7.1.3</span><span style='
                    
                    '>请注意，无法与任何特定个人直接建立联系的数据，不属于个人信息。</span></p>

                    <p><span >7.2</span><span style='
                    
                    '>信息披露及共享：农联贡<span
                    >菜不会</span>与农联贡菜以外的任何公司、组织和个人共享用户个人的个人信息，但以下情况除外：</span></p>

                    <p><span >7.2.1</span><span style='
                    
                    '>基于法定情形下：根据法律法规的规定、诉讼争议解决需要，或行政、司法等有权机关依法提出的要求；</span></p>

                    <p><span >7.2.2</span><span style='
                    
                    '>与关联公司共享：为向用户提供一致化服务以及便于用户进行统一管理，农联贡菜可能会将用户的个人信息与农联贡菜的关联公司共享。但农联贡菜只会共享为您提供相关服务必要的个人信息。</span></p>

                    <p><span >7.2.3</span><span style='
                    
                    '>与合作伙伴分享：<span
                    >农联贡菜</span>可能会向业务合作伙伴共享为用户个人提供服务所必要的订单信息、账户信息、支付信息等。<span
                    >农联贡菜</span>的业务合作伙伴包括供应商</span><span >\</span><span
                    style='
                    
                    '>服务提供商、第三方商家、其他业务合作伙伴。</span></p>

                    <p><span >7.2.4</span><span ><span
                    style='
                    
                    '>基于协议</span></span><span style='
                    
                    '>约定：依据用户与农联贡<span
                    >菜签署</span>的相关协议</span><span >(</span><span
                    style='
                    
                    '>包括<span >在线签署</span>的电子协议及服务规则</span><span >)</span><span
                    style='
                    
                    '>或法律文件，有必要向第三方共享时；</span></p>

                    <p><span >7.2.5</span><span style='
                    
                    '>基于合理商业习惯：例如与第三方共享联合营销活动中的中奖信息，以便第三方能及时向用户个人发放奖品；或者在农联贡<span
                    >菜计划</span>与其他公司进行资本市场活动</span><span >(</span><span
                    style='
                    
                    '>包括但不限于</span><span >IPO</span><span style='
                    
                    '>，债券发行</span><span
                    >)</span><span style='
                    
                    '>接受尽职调查时等；</span></p>

                    <p><span >7.2.6</span><span style='
                    
                    '>基于学术研究；例如为科研机构开展统计或学术研究之必要；</span></p>

                    <p><span >7.2.7</span><span style='
                    
                    '>基于符合法律法规的社会公共利益等。</span></p>

                    <p><span >7.3</span><span style='
                    
                    '>随着农联贡<span
                    >菜业务</span>的发展，农联贡菜及农联贡菜的关联方有可能进行合并、收购、资产转让或类似的交易，如涉及个人信息的转让，农联贡菜会要求受让用户个人信息的公司、组织继续接受本条款的约束，否则</span><span
                    >,</span><span style='
                    
                    '>农联贡菜将要求该公司、组织重新征求用户个人的授权同意。</span></p>

                    <p><span >7.4. </span><span style='
                    
                    '>用户一经注册</span><span
                    >/</span><span style='
                    
                    '>登录，即视为同意接收来自农联贡菜的推送信息，包括但不限于营销活动信息、商品交易信息、促销信息等。为使用户及时了解丰富的商品信息，提升服务体验，农联贡菜或农联贡菜的关联公司或与农联贡<span
                    >菜合作</span>的第三方可以在法律法规允许的范围内，通过短信、电话、邮件等各种方式向用户提供前述信息。如果用户不同意接收来自农联贡菜的推送信息，可以退订。</span></p>

                    <p><span style='
                    
                    '>八、特别声明</span></p>

                    <p><span >8.1.</span><span style='
                    
                    '>用户未通过农联贡菜进行的交易均不受本协议约束，农联贡<span
                    >菜对此</span>也不承担任何责任。不属于农联贡<span >菜交易</span>的情况具体包括但不限于：用户未与销售者成立订单、用户未通过农联贡菜付款。</span></p>

                    <p><span >8.2.</span><span style='
                    
                    '>不论在何种情况下，农联贡菜对由于信息网络设备维护、信息网络连接故障、电脑、通讯或其他系统的故障、电力故障、罢工、劳动争议、暴乱、起义、骚乱、生产力或生产资料不足、火灾、洪水、风暴、爆炸、战争、政府行为、司法行政机关的命令、其他不可抗力或第三方的不作为而造成的不能服务或延迟服务不承担责任。</span></p>

                    <p><span >8.3.</span><span style='
                    
                    '>作弊、扰乱交易秩序的情况</span></p>

                    <p><span >8.3.1</span><span ><span
                    style='
                    
                    '>除活动</span></span><span style='
                    
                    '>规则另有规定外，每次活动中，每个用户只限参加一次活动（活动包括并不限于促销优惠、秒杀、抽奖等等），每个用户只能中奖一次。同一手机、同<span
                    >一联系</span>方式、同一</span><span >IP</span><span
                    style='
                    
                    '>地址、同一农联贡菜账户、同一身份证件、同一银行卡号、同一收货地址、同一终端设备号或其他可以合理显示为同一用户的情形，均视为同一用户。</span></p>

                    <p><span >8.3.2</span><span style='
                    
                    '>活动期间，如发现有用户通过不正当手段（包括但不限于侵犯第三人合法权益、作弊、扰乱系统、实施网络攻击、恶意套现、刷信誉、批量注册、用机器注册农联贡菜账户、用机器模拟客户端）参加活动而有碍其他用户公平参加本次活动或有违反活动目的之行为，农联贡菜有权取消其获奖资格或其因参加活动所获赠品及权益。如该作弊行为给农联贡<span
                    >菜造成</span>损失的，农联贡菜保留追究其赔偿的权利。</span></p>

                    <p><span >8.3.3</span><span style='
                    
                    '>对于恶意进行注册，反复交易退款，侵害农联贡<span
                    >菜实际</span>经营交易的情况，农联贡菜会停止服务、封停账号并追究责任。</span></p>

                    <p><span style='
                    
                    '>九、知识产权</span></p>

                    <p><span >9.1.</span><span style='
                    
                    '>用户理解并知悉，除另有书面声明以外，以下信息和内容的知识产权（包括但不限于专利权、著作权、商标权及商业秘密）归农联贡菜所有：</span></p>

                    <p><span >9.1.1</span><span style='
                    
                    '>在农联贡<span
                    >菜相关</span>服务中所提供的内容和信息（包括但不限于软件、技术、程序、网页、文字、图片、图像、地图、图标、音频、视频、图表、版面设计、电子文档、数据资料等）；</span></p>

                    <p><span >9.1.2</span><span style='
                    
                    '>农联贡<span
                    >菜用于</span>提供上述内容和信息的基础设施和农联贡菜（包括但不限于软件、网站、应用程序等）；</span></p>

                    <p><span >9.1.3</span><span style='
                    
                    '>在农联贡菜提供相关服务中所使用的各项商标、商业形象、商业标识、技术诀窍、标语、文案等；</span></p>

                    <p><span >9.1.4</span><span style='
                    
                    '>农联贡<span
                    >菜服务</span>的开发、运营、维护等过程中产生的所有数据和信息。</span></p>

                    <p><span style='
                    
                    '>农联贡菜所拥有的上述权利及所提供服务中所包含的任何内容的知识产权均受到法律保护，未经农联贡菜事先书面许可，用户承诺不应且<span
                    >不</span>应允许或协助任何人以任何形式（包括但不限于通过任何机器人、蜘蛛、截屏等程序或设备）进行使用、出租、出借、分发、展示、复制、修改、链接、转载、汇编、发表、出版、抓取、监视、引用或创造相关衍生作品。</span></p>

                    <p><span >9.2.</span><span style='
                    
                    '>用户理解并同意，用户在使用农联贡菜提供的服务时上传、提交、存储或发布的内容（包括但不限于文字、图片、视频、音频、动画等）均由用户原创或已获合法授权。用户通过农联贡菜上传、提交、存储或发布的任何内容的知识产权归属用户或原始著作权人所有，用户的上传、提交、存储或发布行为不会侵犯他人的知识产权或其他合法权益。</span></p>

                    <p><span style='
                    
                    '>用户知悉、理解并同意，用户一旦接受<span
                    >本服务</span>协议，即表明用户主动将上述内容<span >的非专属</span>、可转让的财产性权利，如著作权（包括但不限于：复制权、发行权、出租权、展览权、表演权、放映权、广播权、信息网络传播权、摄制权、改编权、翻译权、汇编权以及应当由著作权人享有的其他可转让权利），在全世界范围内永久、免费、独家且不可撤销地授权给农联贡菜及其关联公司，农联贡菜及其关联公司可基于该等授权使用上述内容（包括但不限于用于商业用途）或向第三方自主进行任何必要的转授权。该等授权、转授权的使用场景包括但不限于当前或其他任何网站、应用程序、产品或移动终端设备等，且农联贡菜及其关联公司或农联贡菜及其关联公司所授权许可的第三方可通过对上述授权内容进行修改、复制、改编、翻译、汇编或制作，形成衍生产品。在不违反相关法律法规的强制性规定、尊重相关原始授权内容的知识产权的基础上，该等衍生产品的相关知识产权归农联贡菜及其关联公司或农联贡菜所授权许可的第三方所有。</span></p>

                    <p><span style='
                    
                    '>用户确认并同意授权农联贡菜及其关联公司以自己的名义或委托专业<span
                    >第三方针</span>对有关用户上传、提交、存储或发布的内容（含衍生作品）的侵权行为进行独立自主的维权并获得全部赔偿。维权形式包括但不限于：监测侵权行为、发送维权函、提起诉讼或仲裁、调解、和解等。农联贡菜及其关联公司有权对维权事宜做出独立决策并予以实施。</span></p>

                    <p><span style='
                    
                    '>用户同意，因用户通过农联贡菜上传、发布的任何内容导致的知识产权侵权问题，用户将承担全部责任；如农联贡菜及其关联公司，或农联贡菜授权的其他服务提供方因第三方知识产权维权而产生损失，用户将等额赔偿。</span></p>

                    <p><span ><span style='
                    
                    '>本服务</span></span><span
                    style='
                    
                    '>协议已经构成《著作权法》第二十五条所规定的书面协议，其效力及于用户在农联贡<span >菜发布</span>的任何受著作权法保护的作品内容，无论该内容形成于<span
                    >本服务</span>协议签订前还是<span >本服务</span>协议签订后。农联贡菜及农联贡菜转授权、许可的相关方有权将用户在农联贡<span
                    >菜发表</span>的产品使用体验、产品讨论或图片进行使用或者与其他人合作使用，使用范围包括但不限于网站、电子杂志、杂志、刊物、海报、公众号文章、<span
                    >微信小</span>程序等。</span></p>

                    <p><span >9.3.</span><span style='
                    
                    '>在使用农联贡<span
                    >菜相关</span>客户端的过程中，用户可能需要下载特定软件。为了改善用户体验、修复漏洞、保障安全性等考虑，农联贡菜有权对软件进行更新，用户应该将相关软件更新至最新版本，否则农联贡菜将不保证用户能正常使用相关软件。</span></p>

                    <p><span style='
                    
                    '>如果用户从未经农联贡菜授权的第三方获取软件或与该软件名称相同的安装程序，农联贡<span
                    >菜无法</span>保证该软件能够正常使用，由此造成的相关损失，农联贡菜不予负责。</span></p>

                    <p><span >9.4.</span><span style='
                    
                    '>除非农联贡菜书面许可，用户在使用农联贡菜的软件时不得从事下列<span
                    >任一行</span>为：</span></p>

                    <p><span >9.4.1</span><span style='
                    
                    '>删除、编辑或遮挡软件及其副本上关于著作权、商标或其他权利标识或标记的信息；</span></p>

                    <p><span >9.4.2</span><span style='
                    
                    '>复制、发布、出售或出租软件或其任何部分；</span></p>

                    <p><span >9.4.3</span><span style='
                    
                    '>对软件进行反向工程、反向汇编、反向编译，或者以其他方式尝试挖掘、提取软件的源代码；</span></p>

                    <p><span >9.4.4</span><span style='
                    
                    '>其他对软件、软件所产生的数据所进行的任何增加、删减、变动的任何行为，包含制作、利用、授权各种第三方外挂、插件、系统进行上述行为。</span></p>

                    <p><span style='
                    
                    '>十、客户服务</span></p>

                    <p><span style='
                    
                    '>农联贡<span
                    >菜建立</span>专业的客服团队，并建立完善的客户服务制度，从技术、人员和制度上保障用户提问及投诉渠道的畅通，为用户提供及时的疑难解答与投诉反馈。</span></p>

                    <p><span style='
                    
                    '>十一、协议的终止</span></p>

                    <p><span >11.1.</span><span style='
                    
                    '>农联贡菜有权依据本协议约定注销用户的农联贡菜账号，本协议于账号注销之日终止。</span></p>

                    <p><span >11.2.</span><span style='
                    
                    '>在农联贡菜未向您收取服务费的情况下，农联贡菜可以任何理由自行决定终止农联贡菜服务、解除与<span
                    >您之间</span>订立的本条款，并终止您的服务密码、账户（或其任何部分）或您对农联贡菜的使用。该等情况下，农联贡菜将依法提前三十日在网站或客户端首页显著位置持续公示有关信息。停止服务后，农联贡菜将无义务为您保留账号中的任何信息，或留存、转发任何账号内的任何站内信或短消息。您同意农联贡菜不就终止农联贡<span
                    >菜服务</span>而对您或任何第三方承担任何责任。本协议于农联贡菜全部服务依法定程序及方式终止之日终止。</span></p>

                    <p><span >11.3.</span><span style='
                    
                    '>本协议终止后，用户无权要求农联贡<span
                    >菜继续</span>向其提供任何服务或履行任何其他义务，包括但不限于要求农联贡菜为用户保留或向用户披露其原农联贡菜账号中的任何信息，向用户或第三方转发任何其未曾阅读或发送过的信息等。</span></p>

                    <p><span >11.4. </span><span ><span
                    style='
                    
                    '>本服务</span></span><span style='
                    
                    '>及本协议终止后，<span
                    >农联贡菜仍享有</span>下列权利：</span></p>

                    <p><span >11.4.1</span><span style='
                    
                    '>继续保存用户留存于农联贡菜的本协议第七条所列的各类信息</span></p>

                    <p><span >11.4.2</span><span style='
                    
                    '>对于用户过往的违约行为，农联贡菜仍可依据本协议向用户追究违约责任。</span></p>

                    <p><span style='
                    
                    '>十二、违约责任</span></p>

                    <p><span >12.1</span><span style='
                    
                    '>农联贡菜或用户违反本协议的约定即构成违约，违约方应当向守约方承担违约责任。<span
                    >除违反</span>本协议第</span><span >3.2</span><span
                    style='
                    
                    '>条约定的情形以外，双方违反本协议的损害赔偿范围只包括直接损失，不包括间接损失。</span></p>

                    <p><span >12.2</span><span style='
                    
                    '>如用户违反本协议约定，农联贡菜有权取消相关交易，并有权注销其农联贡菜账号，终止为其提供农联贡菜服务，如农联贡<span
                    >菜因此</span>而遭受损失的，有权要求用户赔偿损失。</span></p>

                    <p><span >12.3.</span><span style='
                    
                    '>如因用户提供的信息不真实、不完整或不准确给农联贡<span
                    >菜造成</span>损失的，农联贡菜有权要求用户进行赔偿。</span></p>

                    <p><span >12.4.</span><span style='
                    
                    '>如因用户违反法律法规规定或本协议约定，在农联贡菜或利用农联贡<span
                    >菜服务</span>从事非法活动的，农联贡菜有权立即终止继续对其提供农联贡菜服务，注销其账号，并要求其赔偿由此给农联贡<span
                    >菜造成</span>的损失。</span></p>

                    <p><span >12.5.</span><span style='
                    
                    '>如用户以技术手段干扰农联贡菜的运行或干扰其他用户对农联贡<span
                    >菜使用</span>的，农联贡菜有权立即注销其农联贡菜账号，并有权要求其赔偿由此给农联贡<span >菜造成</span>的损失。</span></p>

                    <p><span >12.6.</span><span style='
                    
                    '>如用户以虚构事实等方式恶意诋毁农联贡菜的商誉，农联贡菜有权要求用户向农联贡<span
                    >菜公开</span>道歉，赔偿其给农联贡<span >菜造成</span>的损失，并有权终止对其提供农联贡菜服务，甚至注销其账号。</span></p>

                    <p><span >12.7 </span><span style='
                    
                    '>除上述约定外，如本协议或服务规则对相关违约责任有其他约定，应同时适用相关约定。</span></p>

                    <p><span style='
                    
                    '>十三、责任限制</span></p>

                    <p><span >13.1 </span><span style='
                    
                    '>用户理解并同意，农联贡菜会在现有技术水平和条件下尽最大努力向用户提供服务，确保服务的连贯性和安全性；但农联贡<span
                    >菜不能</span>随时预见和防范法律、技术以及其他风险，包括但不限于不可抗力，大规模的病毒、木马和黑客攻击，系统不稳定，第三<span
                    >方服务</span>瑕疵，政府管制等原因可能导致的服务中断、数据丢失以及其他的损失和风险。</span></p>

                    <p><span >13.2 </span><span style='
                    
                    '>在法律允许的范围内，农联贡菜对以下情形之一导致的服务中断或受阻不承担责任：</span></p>

                    <p><span >13.2.1</span><span style='
                    
                    '>受到计算机病毒、木马或其他恶意程序、黑客攻击的破坏；</span></p>

                    <p><span >13.2.2</span><span style='
                    
                    '>用户或农联贡菜的电脑软件、系统、硬件和通信线路出现故障；</span></p>

                    <p><span >13.2.3</span><span style='
                    
                    '>用户操作不当；</span></p>

                    <p><span >13.2.4</span><span style='
                    
                    '>用户通过非农联贡菜授权的方式使用服务；</span></p>

                    <p><span >13.2.5</span><span style='
                    
                    '>其他农联贡菜无法控制或合理预见的情形。</span></p>

                    <p><span >13.3</span><span style='
                    
                    '>用户理解并同意，在使用农联贡<span
                    >菜服务</span>的过程中，可能会遇到不可抗力等风险因素使农联贡<span >菜服务</span>发生中断。不可抗力是指不能预见、不能克服并不能避免且对一方或双方造成重大影响的客观事件，包括但不限于自然灾害如洪水、地震、瘟疫流行和风暴等以及社会事件如战争、动乱、政府行为等。出现上述情况时，农联贡菜将努力在第一时间与相关单位配合，及时进行修复，但是由此给用户造成的损失，农联贡菜将在法律允许的范围内免责。</span></p>

                    <p><span >13.4</span><span style='
                    
                    '>农联贡<span
                    >菜依据</span>本协议约定获得处理违法违规内容的权利，该权利不构成农联贡菜的义务或承诺，农联贡<span >菜不能</span>保证及时发现违法行为或进行相应处理。</span></p>

                    <p><span >13.5 </span><span style='
                    
                    '>农联贡菜提示用户，在使用<span
                    >本服务</span>的过程中，用户可能会遇到网络信息或其他用户行为带来的风险，该等风险包含他人匿名或冒名的含有威胁、诽谤、令人反感、非法、误导、欺骗等任何信息或行为所造成任何商誉损失或经济损失。请用户仔细甄别，并在遇到上述相关不法行为时及时向农联贡菜或有关机关举报或投诉。农联贡菜将对相关内容开展日常检查并在收到举报或投诉时进行相应处理，但请用户注意，农联贡菜不对非农联贡菜所发出或刊登的任何信息的真实性、适用性、合法性承担责任，也不对因第三方侵权行为给用户造成的损害负责。</span></p>

                    <p><span style='
                    
                    '>十四、通知与送达</span></p>

                    <p><span >14.1</span><span style='
                    
                    '>用户知悉并认可，农联贡菜可视情况通过下列任意一种或几种方式向用户通知重要信息：</span></p>

                    <p><span >14.1.1</span><span style='
                    
                    '>向用户注册时所提交的电子邮箱地址发送电子信息</span></p>

                    <p><span >14.1.2</span><span style='
                    
                    '>向用户注册时所提交的手机号码发送电子信息</span></p>

                    <p><span >14.1.3</span><span style='
                    
                    '>向用户提供的实际地址进行寄送纸质载体信息</span></p>

                    <p><span >14.1.4</span><span style='
                    
                    '>在网站或客户端显著位置刊登电子信息</span></p>

                    <p><span >14.1.5</span><span style='
                    
                    '>向农联贡菜网站或相应客户端的账户的站内信或其他即时通信客户端发送电子信息</span></p>

                    <p><span style='
                    
                    '>上述电子信息在发送成功或刊登完成后即视为送达。相关纸质载体的发送以相关邮寄凭证上的邮寄日期后的第五个自然日视为送达。</span></p>

                    <p><span style='
                    
                    '>上述送达方式同样可适用于相关仲裁或司法程序（含起诉、审理、执行等各阶段）。</span></p>

                    <p><span >14.2</span><span style='
                    
                    '>用户应当保证所提供的联系方式是准确、有效的，并进行适时更新，如因提供的联系方式不准确或<span
                    >怠</span>于更新等不可归责于农联贡菜的原因，导致相关通知、文件、文书无法送达或及时送达，用户将自行承担由此可能产生的法律后果。</span></p>

                    <p><span style='
                    
                    '>十五、法律适用和管辖</span></p>

                    <p><span >15.1</span><span style='
                    
                    '>本协议之订立、生效、解释、修订、补充、终止、执行与争议解决均适用中华人民共和国大陆地区法律；如法律无相关规定的，参照商业惯例或行业惯例。</span></p>

                    <p><span >15.2</span><span style='
                    
                    '>用户与农联贡菜因本协议的履行发生争议的应通过友好协商解决，协商解决不成的，任何一方均可<span
                    >向农联高科</span>科技发展有限公司注册地所属的人民法院提起诉讼。</span></p>

                    <p><span style='
                    
                    '>十六、其他</span></p>

                    <p><span >16.1</span><span style='
                    
                    '>本服务协议各条款前所列关键词仅<span
                    >供帮助</span>理解条款主旨及快速定位查询条款所用，不能代替条款的任何内容，亦不作为解释条款的依据，农联贡<span
                    >菜建议</span>用户仔细阅读各条款的具体表述，以维护用户的合法权益。</span></p>

                    <p><span >16.2</span><span style='
                    
                    '>如果<span
                    >本服务</span>协议中任何一条被视为废止、无效或因任何理由不可执行，该条应视为可分的且并不影响任何其余条款的有效性和<span
                    >可</span>执行性。</span></p>

                    <p><span >16.3</span><span style='
                    
                    '>如用户对自行查询的信息存在异议、或对<span
                    >本服务</span>协议有任何问题或建议，请联系<span >农联贡菜客服</span>部门（联系方式：</span><span
                    >400-128-8566</span><span style='
                    
                    '>）。同时，您可通过联系<span
                    >农联贡菜客服</span>部门，对您的用户信息进行查询、更正、删除，或对账户进行注销。</span></p>

                    <p><span ><o:p>&nbsp;</o:p></span></p>

                    <p><span style='
                    
                    '>再次感谢用户的耐心阅读！</span></p>

                </div>
            `
        }
        /* this.$post('/?c=user&a=rule', {
                type:type,
            }).then((res) => {
                if(res.code===0){
                    this.title=res.data.title
                    this.status=res.data.type
                    this.content=res.data.content
                }else if(res.code == 1){
                    this.$toast(res.msg);
                }
            }); */
    },
    watch:{
        type(){
            if (this.type == 1){
                this.title='店铺托管合作协议'
                this.status=1
                this.content=`
                    <div class='WordSection1' style=''>
                        <p  style='text-indent:24.0px;
                        line-height:150%'><span style='font-size:12.0px;line-height:150%;'>经双方确认，就农联贡菜托管方（以下简称“乙方”）受甲方委托，负责以入驻供应商（以下简称“甲方”）名义在“农联贡菜”商城（简称“农联贡菜”）网店的推广、营销、运营，以及其他电子商务等相关事宜达成如下协议</span></p>

                        <p  style='line-height:150%'><b><span style='font-size:14.0px;
                        line-height:150%;'>一、委托服务内容</b></p>

                        <p  style='text-indent:28.3px;
                        line-height:150%'><span style='font-size:12.0px;line-height:150%;'>（一）甲方授权乙方对农联贡菜商城上所开店铺<span >(</span>以下统一简称<span >“</span>网店<span
                        >”)</span>进行代运营。甲方按照双方约定的供货价格提供商品，并承诺按照乙方平台成交信息内容所提供的地址、商品、规格、重量等要求进行按时正确的发货。该店铺的所有权及店铺账户主控权归甲方所有。</span></p>

                        <p  style='text-indent:28.3px;
                        line-height:150%'><span style='font-size:12.0px;line-height:150%;'>（二）乙方负责该店的店铺装修、推广、销售、客服等日常运营工作<span >,</span>由此产生的代运营服务费由甲方进行承担。乙方向甲方收取代运营基础服务费：<u><span
                        >1000</span>元</u><span >/</span>月；并根据甲方月度销售金额的<span
                        >2%</span>收取代运营营销费。</p>

                        <p  style='line-height:150%'><b><span style='font-size:14.0px;
                        line-height:150%;'>二、甲方的权利和义务</b></p>

                        <p  style='text-indent:28.3px;
                        line-height:150%'><span style='font-size:12.0px;line-height:150%;'>（一）甲方作为实际供货商与货物的出卖方，必须保证提供给乙方受托在农联贡菜上所销售的商品的合法性，并对所提供的所有产品承担所有责任，包括但不限于行政许可、知识产权、产品质量、产品三包政策等，货品本身及其供应、运输、包装等不得侵犯第三<span
                        >方任何</span>合法权益。</p>

                        <p  style='text-indent:28.3px;
                        line-height:150%'><span style='font-size:12.0px;line-height:150%;'>（二）甲方应当对所销售的产品向乙方提供相关产品知识培训、产品素材、信息，以及所销售产品的详尽品牌介绍，产品亮点<span >,</span>卖点说明和产品详细参数等资料<span
                        >,</span>甲方需对所提供资料的真实性、完整性、合法性负责。对于产品更新换代，更换型号，包装名称等情况，甲方应在更新之后的<u><span
                        style='background:yellow;'>两</span></u>个工作日内告知乙方并提供更新之后的文案、图片、广告宣传语等信息，<span
                        >否则导致</span>乙方损失的，甲方负责赔偿；如导致货不对版或引发消费者误解或索赔等后果，由甲方自行承担。</span></p>

                        <p  style='text-indent:40.2px;
                        line-height:150%'><span  style='font-size:12.0px;line-height:150%;
                        '>(</span><span style='font-size:12.0px;line-height:150%;
                        '>三<span >) </span>甲方负责提供产品售后相关规定和相应的退换<span
                        >货政策</span>给乙方参考。同时向乙方提供因产品文字说明与必要数据，如<span >因说明</span>或数据不足、不符或不真实导致乙方无法正确回答客户专业咨询的，影响销售情况或引发消费者误解或索赔后果的，由甲方自行承担。</span></p>

                        <p  style='text-indent:28.3px;
                        line-height:150%'><span style='font-size:12.0px;line-height:150%;'>（四）甲方负责指导农联贡菜上所销售的产品的商品范围及其销售的相关政策；甲方有权随时修订上述相关政策；当任何相关政策发生变化，甲方应至少提前三日书面通知到乙方，乙方将及时根据甲方要求及政策内容对甲方店铺内所涉及产品进行相应调整，包括但不限于更换、下架等。</span></p>

                        <p  style='text-indent:28.3px;
                        line-height:150%'><span  style='font-size:12.0px;line-height:150%;
                        '>(</span><span style='font-size:12.0px;line-height:150%;
                        '>五<span >) </span>甲方负责提供产品清单、产品相关信息、供货价格、农联平台价格或价格区间，乙方有权自行选择决定其所<span
                        >代销售</span>的产品（包括但不限于数量、品种、规格<span >/</span>型号等），根据甲方制定的线上销售定价范围对产品进行定价，在农联贡菜上进行产品销售。</span></p>

                        <p  style='text-indent:28.3px;
                        line-height:150%'><span  style='font-size:12.0px;line-height:150%;
                        '><span style=''>&nbsp;</span>(</span><span
                        style='font-size:12.0px;line-height:150%;'>六<span >) </span>甲方应向乙方提供书面授权文件（见附件<span
                        >1</span>），授权乙方在农联贡菜上作为独家授权主体代运营甲方店铺，不得再授权其他公司经营此店铺。</p>

                        <p  style='text-indent:28.3px;
                        line-height:150%'><span  style='font-size:12.0px;line-height:150%;
                        '>(</span><span style='font-size:12.0px;line-height:150%;
                        '>七<span >) </span>甲方负责向网店不间断、及时且合格地供货，并有权向乙方收取实际产生的商品费用（扣除乙方代运营服务费、代运营营销费、激励性管理费、甲方承担的商品销售<span
                        style='background:yellow;'>税金</span>等费用后）。对于甲方错发漏发导致产品遗失损坏等问题产生的相关费用及引发的损失<span
                        >,</span>当由甲方承担全部责任。</p>

                        <p  style='text-indent:28.3px;
                        line-height:150%'><span  style='font-size:12.0px;line-height:150%;
                        '>(</span><span style='font-size:12.0px;line-height:150%;
                        '>八<span >) </span>甲方负责网店订单的仓储与物流，由此产生的仓储、物流费用以及非因乙方原因（包括但不限于甲方错发漏发等情形）产生的退换货费用（含物流费用）、以及物流过程中发生的货物毁损灭失后果与产生的一系列物流费，由甲方全部承担。</span></p>

                        <p  style='text-indent:28.3px;
                        line-height:150%'><span  style='font-size:12.0px;line-height:150%;
                        '>(</span><span style='font-size:12.0px;line-height:150%;
                        '>九<span >) </span>乙方负责处理因媒体、个人偏好、促销活动、网上客<span
                        >服服务</span>态度不善引起的售前售后相关投诉和赔偿相关事宜，赔偿金额由乙方根据惯例、事件背景等综合考虑后向甲方报备，甲方负责承担该等赔偿金及乙方因解决上述索赔事件所产生的实际开支。</span></p>

                        <p  style='text-indent:28.3px;
                        line-height:150%'><span  style='font-size:12.0px;line-height:150%;
                        '>(</span><span style='font-size:12.0px;line-height:150%;
                        '>十<span >) </span>在买家已支付货款的前提下，甲方应保证足够的货源，并按要求按时发货。如遇甲方缺货，应自缺货之日起<span
                        >1</span>日内告知乙方，并应在<span >2</span>日内补足，因故未能在此期间内补足的，甲方应提前告知乙方并及时采取补救措施，以便乙方及时修改在<span
                        >售产品</span>的供应信息。因甲方未尽及时通知义务给乙方产生损失的，损失将由甲方承担。</p>

                        <p  style='text-indent:28.3px;
                        line-height:150%'><span  style='font-size:12.0px;line-height:150%;
                        '>(</span><span style='font-size:12.0px;line-height:150%;
                        '>十一<span >) </span>为满足正常的业绩增长需求，甲方应根据乙方的需求，提供足够乙方进行销售的产品<span
                        >SKU</span>数量，及时做出产品调整，更新等配合。</p>

                        <p  style='text-indent:28.3px;
                        line-height:150%'><span style='font-size:12.0px;line-height:150%;'>（十二）对于已托管店铺的装修美化、销售客服、新产品的发布、推广、售后等问题，甲方可合理参与并给出相关意见或建议<span >,</span>乙方有权根据自身实际情况选择接受或不接受<span
                        >,</span>如该意见与本协议其他条款相冲突<span >,</span>则该意见自始无效。乙方受甲方委托负责装修美化该网店等工作，乙方无垫付款项的义务，若双方无另行约定，有关费用由甲方负责承担。</span></p>

                        <p  style='text-indent:28.3px;
                        line-height:150%'><span style='font-size:12.0px;line-height:150%;'>（十三）对于网店的售后问题，乙方应在每日及时处理，如遇到乙方权限之内无法处理的售后问题，甲方有义务积极协助乙方，以保证问题快速、高效的解决，不得推诿。</span></p>


                        <p  style='line-height:150%'><b><span style='font-size:14.0px;
                        line-height:150%;'>三、乙方的权利与义务</span></b></p>

                        <p  style='text-indent:28.3px;
                        line-height:150%'><span  style='font-size:12.0px;line-height:150%;
                        '>(</span><span ><span style='font-size:12.0px;
                        line-height:150%;'>一</span></span><span 
                        style='font-size:12.0px;line-height:150%;'>) </span><span
                        style='font-size:12.0px;line-height:150%;'>乙方负责网店的设计装修、市场营销、分销推广策划与执行、商品管理等工作。因乙方的疏忽<span
                        >,</span><span >不</span>专业<span >,</span>错误引导等乙方过错导致的售后问题，由乙方承担相应责任。</span></p>

                        <p  style='text-indent:24.0px;
                        line-height:150%'><span style='font-size:12.0px;line-height:150%;'>（二）乙方在代运营服务有效期间<span >不</span>单方面使用甲方任何品牌、产品、账户资金、资料、账户做与该网店运营服务无关的事宜。该店铺的重大营销活动、店铺改版、品牌宣传策划等原则上须提前<span
                        style='background:yellow;'>两周</span>与甲方商议（但紧急情况除外）；</span></p>

                        <p  style='text-indent:24.0px;
                        line-height:150%'><span style='font-size:12.0px;line-height:150%;'>（三）乙方需提供甲方<a href="javascript:;"
                        target="_blank"><span style=''><span style='color:
                        windowtext'>网<span style=''>店</span><span
                        style=''><span style=''>托</span></span>管</span></span></a><a
                        ></a><a name="_Hlt10467414"></a><span
                        style=''></span>服务的保密工作，未经允许的情况下，不得将甲方的保密信息资料外泄。</span></p>

                        <p  style='text-indent:28.3px;
                        line-height:150%'><span  style='font-size:12.0px;line-height:150%;
                        '>(</span><span style='font-size:12.0px;line-height:150%;
                        '>四<span >) </span>在本协议终止后，乙方应于协议终止后一周内停止<span
                        >甲方网</span>店运营，但因甲方违约在先导致协议终止的或双方另有约定除外。</p>

                        <p  style='text-indent:28.3px;
                        line-height:150%'><span  style='font-size:12.0px;line-height:150%;
                        '>(</span><span style='font-size:12.0px;line-height:150%;
                        '>五<span >) </span>乙方须在不违背甲方品牌规划前提下对店铺进行设计装修，乙方同时有权依照销售状况对店铺所售商品进行陈列及促销调整，乙方应于陈列及促销方案调整前书面通知甲方并获得甲方许可方可执行，甲方应于通知送达后<span
                        >1</span>日内回复，逾期未回复的视为许可。</p>

                        <p  style='text-indent:28.3px;
                        line-height:150%'><span  style='font-size:12.0px;line-height:150%;
                        '>(</span><span style='font-size:12.0px;line-height:150%;
                        '>六<span >) </span>正常营业期间，乙方需按照甲方制定的价格或价格区间对产品进行定价<span
                        >,</span>如需调整产品的价格等信息<span >,</span>乙方应与甲方沟通并获得甲方同意之后进行操作。</span></p>

                        <p  style='text-indent:28.3px;
                        line-height:150%'><span  style='font-size:12.0px;line-height:150%;
                        '>(</span><span style='font-size:12.0px;line-height:150%;
                        '>七<span >) </span>在未获得甲方同意情况下<span >,</span>乙方不得在该网店销售与甲方要求无关的产品<span
                        >,</span>乙方不得直接从甲方以外的渠道进货（双方另有约定的除外）。</p>


                        <p  style='line-height:150%'><b><span style='font-size:14.0px;
                        line-height:150%;'>四、费用支付及结算模式</b></p>

                        <p  style='text-indent:28.3px;
                        line-height:150%'><span style='font-size:12.0px;line-height:150%;'>（一）乙方自本协议生效后实际<span >运营网</span>店之日起，每月向甲方收取代运营基础服务费：<u><span
                        >1000</span>元<span >/</span></u>月。同时甲方按月支付农联贡菜平台甲方月度销售金额<span
                        >2%</span>的代运营营销费用。</p>

                        <p  style='text-indent:28.3px;
                        line-height:150%'><span style='font-size:12.0px;line-height:150%;'>（二）乙方自本协议生效后，<u><span >3</span></u>个工作日内将代运营基础服务费<span
                        style='background:yellow;'>按年</span>支付给乙方指定账户，即<span
                        >&yen;12,000</span>元<span >/</span>年（大写：人民币壹万贰仟元每年），代运营营销费用自平台月度结算完成后<span
                        >3</span>个工作日内支付给乙方。</p>

                        <p  style='line-height:150%'><b><span style='font-size:14.0px;
                        line-height:150%;'>五、保密协议</span></b></p>

                        <p  style='text-indent:28.3px;
                        line-height:150%'><span style='font-size:12.0px;line-height:150%;'>（一）甲乙双方都有保守商业秘密的义务。保密的内容包括但不限于供货价格、商品价格、销售数据、客户信息等商业信息。双方均应对相互了解之有关各方的商业秘密及其他文档资料采取严格的保密措施。除履行法定的义务外，未经对方许可，本协议任何一方不得向其他第三</span>方透露。</p>

                        <p  style='text-indent:28.3px;
                        line-height:150%'><span style='font-size:12.0px;line-height:150%;'>（二）甲方所有权店铺的销售数据统计、客户个人信息等均属于甲方的商业机密，乙方及乙方的员工均不得采取任何非法的方式获取。如乙方确需获得相关数据信息，须向甲方提出申请，在获得批准后，才能从甲方相关部门获取。</span></p>

                        <p  style='line-height:150%'><b><span style='font-size:14.0px;
                        line-height:150%;'>六、协议的解除、终止及违约责任</b></p>

                        <p  style='text-indent:28.3px;
                        line-height:150%'><span style='font-size:12.0px;line-height:150%;'>（一）在本协议有效期届满前，任何一方不得单方面终止本协议，若一方擅自终止本协议，由此造成的任何损失由其承担。本协议终止情况下，双方应配合完成该店铺资料、费用清算及程序交接工作。</span></p>

                        <p  style='text-indent:28.3px;
                        line-height:150%'><span style='font-size:12.0px;line-height:150%;'>（二）下列任<span >一</span>情形出现的，对方可据此解除本协议并主张违约一方承担违约责任：</span></p>

                        <p  style='text-indent:28.3px;
                        line-height:150%'><span  style='font-size:12.0px;line-height:150%;
                        '>1. </span><span style='font-size:12.0px;line-height:150%;
                        '>甲方如不按时向乙方支付协议中约定的应得费用，乙方有权责令甲方在限期内补足并终止对甲方所提供的<span
                        >网店代运营</span>服务且无需承担任何违约责任，因甲方不按时支付乙方应得费用造成的损失，甲方全部承担，并且自逾期支付之日起，每逾期一日按乙方应得费用的万分之五缴纳滞纳金（即违约金<span
                        >=</span>乙方应收款项<span >*0.05%*</span>实际滞纳天数）。</span></p>

                        <p  style='text-indent:28.3px;
                        line-height:150%'><span  style='font-size:12.0px;line-height:150%;
                        '>2. </span><span style='font-size:12.0px;line-height:150%;
                        '>甲方所供产品不符合国家及行业关于该产品生产、质量、计量、环保的标准，乙方有权解除本协议并要求甲方承担年度代运营基础服务费<span
                        >30%</span>的违约金，违约金不足以弥补乙方损失的，甲方负责补足。</p>

                        <p  style='text-indent:28.3px;
                        line-height:150%'><span  style='font-size:12.0px;line-height:150%;
                        '>3. </span><span style='font-size:12.0px;line-height:150%;
                        '>乙方如违反协议及其附件、补充协议之约定构成违约的，或连续三个月未能达到服务及业绩规定的指标的，甲方有权立即终止该店铺的乙方代运营权利。</span></p>

                        <p  style='text-indent:28.3px;
                        line-height:150%'><span  style='font-size:12.0px;line-height:150%;
                        '>4. </span><span style='font-size:12.0px;line-height:150%;
                        '>双方对在本协议履行过程中以任何方式获知的另一方商业机密或技术及经营信息均负有保密责任，不得向任何第三方透漏或泄露。我国现行法律法规及政策中另有规定或得到另一方书面同意的除外。</span></p>

                        <p  style='text-indent:28.3px;
                        line-height:150%'><span  style='font-size:12.0px;line-height:150%;
                        '>5. </span><span style='font-size:12.0px;line-height:150%;
                        '>甲方违反独家授权的约定，在授权期间内再授权其他公司经营此店铺的，乙方有权解除本协议并向甲方主张年度代运营基础服务费<span
                        >30%</span>的违约金，违约金不足以弥补乙方损失的，甲方负责补足。</p>

                        <p  style='text-indent:28.3px;
                        line-height:150%'><span  style='font-size:12.0px;line-height:150%;
                        '>6</span><span style='font-size:12.0px;line-height:150%;
                        '>．任何一方拒绝履行或以其行为表明不再履行协议主要义务的，对方可据此解除本协议并要求违约方赔偿全部损失。 </span></p>

                        <p  style='text-indent:28.3px;
                        line-height:150%'><span style='font-size:12.0px;line-height:150%;'>（三）下列任<span >一</span>情形出现的，本协议即行终止：</p>

                        <p  style='text-indent:28.3px;
                        line-height:150%'><span  style='font-size:12.0px;line-height:150%;
                        '>1</span><span style='font-size:12.0px;line-height:150%;
                        '>． 双方约定的协议终止条件出现的；</p>

                        <p  style='text-indent:28.3px;
                        line-height:150%'><span  style='font-size:12.0px;line-height:150%;
                        '>2</span><span style='font-size:12.0px;line-height:150%;
                        '>． 任何一方依法破产、结算的；</p>

                        <p  style='text-indent:28.3px;
                        line-height:150%'><span  style='font-size:12.0px;line-height:150%;
                        '>3</span><span style='font-size:12.0px;line-height:150%;
                        '>． 协议有效期届满、双方未续约的。</p>



                        <p  style='line-height:150%'><b><span style='font-size:14.0px;
                        line-height:150%;'>七、不可抗力与免责</b></p>

                        <p  style='text-indent:28.3px;
                        line-height:150%'><span style='font-size:12.0px;line-height:150%;'>（一）“不可抗力”是指所有超出本协议双方合理控制范围的事件，该事件应不可预见，或虽然可以预见，但通过合理努力无法阻止或避免其发生，如自然灾害、战争、网络故障、服务器被黑客攻击等等，且这类事件发生于本协议签字之后，并且阻止任何一方全部或部分履行本协议。</span></p>

                        <p  style='text-indent:28.3px;
                        line-height:150%'><span style='font-size:12.0px;line-height:150%;'>（二）如果符合所有上述条件，一方未履行其本协议项下的任何义务，则应免责不构成违约：</p>

                        <p  style='text-indent:28.3px;
                        line-height:150%'><span  style='font-size:12.0px;line-height:150%;
                        '>1</span><span style='font-size:12.0px;line-height:150%;
                        '>． 如果不可抗力事件致使该方未能全部履行其在本协议项下的义务；</p>

                        <p  style='text-indent:28.3px;
                        line-height:150%'><span  style='font-size:12.0px;line-height:150%;
                        '>2</span><span style='font-size:12.0px;line-height:150%;
                        '>． 双方应立即相互协商以找出合理解决办法并应尽所有合理的努力尽可能地减小不可抗力的后果；</p>

                        <p  style='text-indent:28.3px;
                        line-height:150%'><span  style='font-size:12.0px;line-height:150%;
                        '>3</span><span style='font-size:12.0px;line-height:150%;
                        '>． 在不可抗力事件发生后的<span >5</span>日内，该方应书面通知对方，解释其未履行及不能完全履行其在本协议项下的义务之原因，并且其履行本协议的期限应延长，延长期应与不可抗力事件造成的拖延相同。</span></p>


                        <p  style='line-height:150%'><b><span style='font-size:14.0px;
                        line-height:150%;'>八、其他</b></p>

                        <p  style='text-indent:28.3px;
                        line-height:150%'><span style='font-size:12.0px;line-height:150%;'>（一）本协议自双方签订之日起生效。</p>

                        <p  style='text-indent:28.3px;
                        line-height:150%'><span style='font-size:12.0px;line-height:150%;'>（二）本协议未约定事项，可由双方另行签订书面补充协议，本协议的补充协议或附件、附则与本协议具有同等的法律效力。</p>

                        <p  style='text-indent:28.3px;
                        line-height:150%'><span style='font-size:12.0px;line-height:150%;'>（三）双方如有纠纷应友好协商解决，如协商不成则提交所在地人民法院诉讼解决。</p>

                        <p  style='text-indent:28.3px;
                        line-height:150%'><span style='font-size:12.0px;line-height:150%;'>（以下为签署页，无正文）</p>


                        <p  align=left style='text-align:left;line-height:150%'><b><span
                        style='font-size:14.0px;line-height:150%;'>附件<span >1</span></span></b></p>

                        <p  align=center style='text-align:center;line-height:150%'><b
                        style='mso-bidi-font-weight:normal'><span style='font-size:18.0px;line-height:
                        150%;'>授<span ><span
                        style=''>&nbsp; </span></span>权<span ><span
                        style=''>&nbsp; </span></span>书</b></p>


                        <p  style='line-height:150%'><span style='font-size:14.0px;
                        line-height:150%;'>致：<span >农联高科</span>科技发展有限公司</span></p>

                        <p  align=left style='text-align:left;text-indent:28.0px;
                        line-height:150%'><span style='font-size:14.0px;
                        line-height:150%;'>兹授予我公司农联店经营权。经营细则及授权范围以《店铺托管合作协议》为准。</span></p>

                        <p  style='text-indent:28.0px;
                        line-height:150%'><span style='font-size:14.0px;line-height:150%;'>本公司<span >承诺此</span>授权为独家授权，在授权期间内不再授权其他公司经营此店铺。</span></p>


                    </div>
                `;
            }
            if (this.type == 3){
                this.$post('/?c=user&a=rule', {
                    type:3,
                }).then((res) => {
                    if(res.code===0){
                        this.title=res.data.title
                        this.status=3
                        this.content=res.data.content
                    }else if(res.code == 1){
                        this.$toast(res.msg);
                    }
                }); 
            }
            if (this.type == 2){
                this.title='隐私条约'
                this.status=2
                this.content=`
                    <div class=WordSection1 style='layout-grid:15.6pt'>

                    <p align=center style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;
                    margin-left:0cm;text-align:center;'><strong><span
                    style='font-size:14.5pt;font-family:宋体;color:black'>隐私权政策</span></strong></p>

                    <p align=right style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;
                    margin-left:0cm;text-align:right;text-indent:16.95pt;line-height:10.9pt;
                    '><span lang=EN-US style='font-size:7.5pt;font-family:"微软雅黑",sans-serif;
                    color:#333333'>&nbsp;</span></p>

                    <p align=right style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;
                    margin-left:0cm;text-align:right;text-indent:16.95pt;line-height:10.9pt;
                    '><span style='font-size:9.5pt;color:black'>最近更新日期：</span><span
                    lang=EN-US style='font-size:9.5pt;color:#333333'>2019</span><span
                    style='font-size:9.5pt;color:black'>年<span lang=EN-US>&nbsp; </span>月<span
                    lang=EN-US>&nbsp; </span>日</span></p>

                    <p align=right style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;
                    margin-left:0cm;text-align:right;text-indent:16.95pt;line-height:10.9pt;
                    '><span lang=EN-US style='font-size:7.5pt;font-family:"微软雅黑",sans-serif;
                    color:#333333'>&nbsp;</span></p>

                    <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                    0cm;'><strong><span style='font-size:11.5pt;font-family:宋体;
                    color:black'>提示条款</span></strong></p>

                    <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                    0cm;text-indent:16.95pt;'><span lang=EN-US style='font-size:
                    9.5pt;font-family:"微软雅黑",sans-serif;color:#333333'>&nbsp;</span><span
                    style='font-size:9.5pt;color:black'>您的信任对我们非常重要，我们深知个人信息对您的重要性，我们将按法律法规要求，采取相应安全保护措施，尽力保护您的个人信息安全可控。鉴于此，农联贡菜网服务提供者（或简称“我们”）制定本《隐私权政策》（下称“本政策</span><span
                    lang=EN-US style='font-size:9.5pt;font-family:"微软雅黑",sans-serif;color:#333333'>&nbsp;/</span><span
                    style='font-size:9.5pt;color:black'>本隐私权政策”）并提醒您：</span></p>

                    <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                    0cm;text-indent:16.95pt;line-height:10.9pt;'><span
                    style='font-size:9.5pt;color:black'>本政策适用于农联贡菜网提供的所有产品和服务。<strong><u><span
                    style='font-family:宋体'>如我们及关联公司（范围详见定义部分）的产品或服务中使用了农联贡菜网提供的产品或服务（例如使用农联贡菜平台账户登录）但未设独立隐私权政策的，则本政策同样适用于该部分产品或服务。我们及关联公司就其向您提供的产品或服务单独设立有隐私权政策的（如</span></u></strong></span><span
                    lang=EN-US><a
                    href="javascript:;"><span
                    lang=EN-US style='font-size:9.5pt;color:#C0504D;text-decoration:none'><span
                    lang=EN-US>《农联贡菜隐私权政策》</span></span></a></span><strong><u><span
                    style='font-size:9.5pt;font-family:宋体;color:black'>），则相应产品或服务适用相应隐私权政策。</span></u></strong></p>

                    <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                    0cm;line-height:10.9pt;'><span lang=EN-US style='font-size:
                    9.5pt;font-family:"微软雅黑",sans-serif;color:#333333'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><span
                    style='font-size:9.5pt;color:black'>需要特别说明的是，<strong><u><span style='font-family:
                    宋体'>本政策不适用于其他第三方向您提供的服务，也不适用于农联贡菜网中已另行独立设置隐私权政策的产品或服务。</span></u></strong>例如农联贡菜网上的卖家依托农联贡菜网向您提供服务时，您向卖家提供的个人信息不适用本政策。</span></p>

                    <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                    0cm;text-indent:16.95pt;line-height:10.9pt;'><strong><u><span
                    style='font-size:9.5pt;font-family:宋体;color:black'>在使用农联贡菜网各项产品或服务前，请您务必仔细阅读并透彻理解本政策，特别是以粗体<span
                    lang=EN-US>/</span>粗体下划线标识的条款，您应重点阅读，在确认充分理解并同意后再开始使用。</span></u></strong><span
                    style='font-size:9.5pt;color:black'>如对本政策内容有任何疑问、意见或建议，您可通过农联贡菜网提供的各种</span><span
                    lang=EN-US><a href="javascript:;"><b><i><span
                    lang=EN-US style='font-size:9.5pt;color:#C0504D;text-decoration:none'><span
                    lang=EN-US>联系方式</span></span></i></b></a></span><span style='font-size:9.5pt;
                    color:black'>与我们联系。</span></p>

                    <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                    0cm;'><strong><span lang=EN-US style='font-size:11.5pt;
                    font-family:宋体;color:black'>&nbsp;</span></strong></p>

                    <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                    0cm;'><strong><span style='font-size:11.5pt;font-family:宋体;
                    color:black'>第一部分</span></strong><strong><span lang=EN-US style='font-size:
                    11.5pt;font-family:"微软雅黑",sans-serif;color:#333333'>&nbsp;</span></strong><strong><span
                    style='font-size:11.5pt;font-family:宋体;color:black'>定义</span></strong></p>

                    <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                    0cm;text-indent:16.95pt;line-height:10.9pt;'><strong><span
                    style='font-size:9.5pt;font-family:宋体;color:black'>农联贡菜网：</span></strong><span
                    style='font-size:9.5pt;color:black'>指农联贡菜网（域名为</span><span lang=EN-US
                    style='font-size:9.5pt;font-family:"微软雅黑",sans-serif;color:#333333'>&nbsp;https://b2b.nlyz365.com/</span><span
                    style='font-size:9.5pt;color:black'>）网站及农联贡菜客户端。</span></p>

                    <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                    0cm;text-indent:16.95pt;line-height:10.9pt;'><strong><span
                    style='font-size:9.5pt;font-family:宋体;color:black'>个人信息：</span></strong><span
                    style='font-size:9.5pt;color:black'>指以电子或者其他方式记录的能够单独或者与其他信息结合识别特定自然人身份或者反映特定自然人活动情况的各种信息。</span></p>

                    <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                    0cm;text-indent:16.95pt;line-height:10.9pt;'><strong><span
                    style='font-size:9.5pt;font-family:宋体;color:black'>个人敏感信息：</span></strong><strong><span
                    style='font-size:9.5pt;font-family:宋体;color:black;font-weight:normal'>指</span></strong><span
                    style='font-size:9.5pt;color:black'>包括身份证件号码、个人生物识别信息、银行账号、财产信息、行踪轨迹、交易信息、</span><span
                    lang=EN-US style='font-size:9.5pt;font-family:"微软雅黑",sans-serif;color:#333333'>14</span><span
                    style='font-size:9.5pt;color:black'>岁以下（含）儿童信息等的个人信息（我们将在本隐私权政策中对具体个人敏感信息以<strong><span
                    style='font-family:宋体'>粗体</span></strong>进行显著标识）。</span></p>

                    <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                    0cm;text-indent:16.95pt;line-height:10.9pt;'><strong><span
                    style='font-size:9.5pt;font-family:宋体;color:black'>个人信息删除：</span></strong><span
                    style='font-size:9.5pt;color:black'>指在实现日常业务功能所涉及的系统中去除个人信息的行为，使其保持不可被检索、访问的状态。</span></p>

                    <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                    0cm;text-indent:16.95pt;line-height:10.9pt;'><span
                    style='font-size:9.5pt;color:black'>除另有约定外，本政策所用定义与</span><span lang=EN-US><a
                    href="javascript:;"><b><i><span
                    lang=EN-US style='font-size:9.5pt;color:#C0504D;text-decoration:none'><span
                    lang=EN-US>《农联贡菜平台服务协议》</span></span></i></b></a></span><span style='font-size:
                    9.5pt;color:black'>中的定义具有相同的涵义。</span></p>

                    <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                    0cm;'><span lang=EN-US style='font-size:7.5pt;font-family:"Tahoma",sans-serif;
                    color:#333333'>&nbsp;</span></p>

                    <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                    0cm;'><strong><span style='font-size:11.5pt;font-family:宋体;
                    color:black'>第二部分</span></strong><strong><span lang=EN-US style='font-size:
                    11.5pt;font-family:"微软雅黑",sans-serif;color:#333333'>&nbsp;&nbsp;</span></strong><strong><span
                    style='font-size:11.5pt;font-family:宋体;color:black'>隐私权政策</span></strong></p>

                    <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                    0cm;text-indent:16.95pt;line-height:10.9pt;'><span lang=EN-US
                    style='font-size:9.5pt;font-family:"微软雅黑",sans-serif;color:#333333'>&nbsp;</span></p>

                    <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                    0cm;text-indent:16.95pt;line-height:10.9pt;'><span
                    style='font-size:9.5pt;color:black'>本隐私权政策部分将帮助您了解以下内容：</span></p>

                    <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                    0cm;text-indent:16.95pt;line-height:10.9pt;'><span
                    style='font-size:9.5pt;color:black'>一、我们如何收集和使用您的信息</span></p>

                    <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                    0cm;text-indent:16.95pt;line-height:10.9pt;'><span
                    style='font-size:9.5pt;color:black'>二、我们如何使用<span lang=EN-US>Cookie</span>和同类技术</span></p>

                    <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                    0cm;text-indent:16.95pt;line-height:10.9pt;'><span
                    style='font-size:9.5pt;color:black'>三、我们如何共享、转让、公开披露您的信息</span></p>

                    <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                    0cm;text-indent:16.95pt;line-height:10.9pt;'><span
                    style='font-size:9.5pt;color:black'>四、我们如何保护您的信息</span></p>

                    <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                    0cm;text-indent:16.95pt;line-height:10.9pt;'><span
                    style='font-size:9.5pt;color:black'>五、您如何管理您的信息</span></p>

                    <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                    0cm;text-indent:16.95pt;line-height:10.9pt;'><span
                    style='font-size:9.5pt;color:black'>六、我们如何处理未成年人的信息</span></p>

                    <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                    0cm;text-indent:16.95pt;line-height:10.9pt;'><span
                    style='font-size:9.5pt;color:black'>七、本隐私权政策如何更新</span></p>

                    <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                    0cm;text-indent:16.95pt;line-height:10.9pt;'><span
                    style='font-size:9.5pt;color:black'>八、如何联系我们</span></p>

                    <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                    0cm;'><span lang=EN-US style='font-size:7.5pt;font-family:"Tahoma",sans-serif;
                    color:#333333'>&nbsp;</span></p>

                    <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                    21.2pt;line-height:10.9pt;'><strong><span style='font-size:
                    9.5pt;font-family:宋体;color:black'>一、<span lang=EN-US>&nbsp;</span>我们如何收集和使用您的信息</span></strong></p>

                    <p style='margin-top:7.25pt;margin-right:0cm;margin-bottom:0cm;margin-left:
                    0cm;margin-bottom:.0001pt;text-indent:19.35pt;line-height:12.1pt;background:
                    white'><span style='font-size:9.5pt;color:black'>在您使用我们的产品及<span lang=EN-US>/</span>或服务时，我们需要<span
                    lang=EN-US>/</span>可能需要收集和使用的您的个人信息包括如下两种：</span></p>

                    <p style='margin-top:7.25pt;margin-right:0cm;margin-bottom:0cm;margin-left:
                    0cm;margin-bottom:.0001pt;text-indent:19.35pt;line-height:12.1pt;background:
                    white'><span lang=EN-US style='font-size:9.5pt;color:black'>1</span><span
                    style='font-size:9.5pt;color:black'>、</span><strong><span style='font-size:
                    9.5pt;font-family:宋体;color:#333333'>为实现向您提供我们产品及<span lang=EN-US>/</span>或服务的基本功能，您须授权我们收集、使用的必要的信息。如您拒绝提供相应信息，您将无法正常使用我们的产品及<span
                    lang=EN-US>/</span>或服务；</span></strong></p>

                    <p style='margin-top:7.25pt;margin-right:0cm;margin-bottom:0cm;margin-left:
                    0cm;margin-bottom:.0001pt;text-indent:19.35pt;line-height:12.1pt;background:
                    white'><span lang=EN-US style='font-size:9.5pt;color:black'>2</span><span
                    style='font-size:9.5pt;color:black'>、</span><strong><span style='font-size:
                    9.5pt;font-family:宋体;color:#333333'>为实现向您提供我们产品及<span lang=EN-US>/</span>或服务的附加功能，您可选择授权我们收集、使用的信息。如您拒绝提供，您将无法正常使用相关附加功能或无法达到我们拟达到的功能效果，但并不会影响您正常使用我们产品及<span
                    lang=EN-US>/</span>或服务的基本功能。</span></strong></p>

                    <p style='margin-top:7.25pt;margin-right:0cm;margin-bottom:0cm;margin-left:
                    0cm;margin-bottom:.0001pt;text-indent:19.35pt;line-height:12.1pt;background:
                    white'><strong><u><span style='font-size:9.5pt;font-family:宋体;color:#333333'>您理解并同意：</span></u></strong></p>

                    <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                    0cm;text-indent:19.35pt;line-height:12.1pt;'><strong><span
                    lang=EN-US style='font-size:9.5pt;font-family:宋体;color:#333333'>1</span></strong><strong><span
                    style='font-size:9.5pt;font-family:宋体;color:#333333'>、<u>我们致力于打造多样的产品和服务以满足您的需求。因我们向您提供的产品和服务种类众多，且不同用户选择使用的具体产品<span
                    lang=EN-US>/</span>服务范围存在差异，相应的，基本<span lang=EN-US>/</span>附加功能及收集使用的个人信息类型、范围等会有所区别，请以具体的产品<span
                    lang=EN-US>/</span>服务功能为准</u>；</span></strong></p>

                    <p style='margin-top:7.25pt;margin-right:0cm;margin-bottom:0cm;margin-left:
                    0cm;margin-bottom:.0001pt;text-indent:19.35pt;line-height:12.1pt;background:
                    white'><strong><span lang=EN-US style='font-size:9.5pt;font-family:宋体;
                    color:#333333'>2</span></strong><strong><span style='font-size:9.5pt;
                    font-family:宋体;color:#333333'>、<u>为给您带来更好的产品和服务体验，我们在持续努力改进我们的技术，随之我们可能会不时推出新的或优化后的功能，可能需要收集、使用新的个人信息或变更个人信息使用目的或方式。对此，我们将通过更新本政策、弹窗、页面提示等方式另行向您说明对应信息的收集目的、范围及使用方式，并为您提供自主选择同意的方式，且在征得您明示同意后收集、使用</u>。</span></strong><span
                    style='font-size:9.5pt;color:black'>在此过程中，如果您有任何疑问、意见或建议的，您可通过农联贡菜网提供的各种</span><span
                    lang=EN-US><a href="javascript:;"><b><i><span
                    lang=EN-US style='font-size:9.5pt;color:#3B8FD9;text-decoration:none'><span
                    lang=EN-US>联系方式</span></span></i></b></a></span><span style='font-size:9.5pt;
                    color:black'>与我们联系，我们会尽快为您作出解答。</span></p>

                    <p style='margin-top:7.25pt;margin-right:0cm;margin-bottom:0cm;margin-left:
                    0cm;margin-bottom:.0001pt;text-indent:19.35pt;line-height:12.1pt;background:
                    white'><span lang=EN-US style='font-size:9.5pt;color:black'><br>
                    <br>
                    </span></p>

                    <p style='margin-top:7.25pt;margin-right:0cm;margin-bottom:0cm;margin-left:
                    0cm;margin-bottom:.0001pt;text-indent:19.35pt;line-height:12.1pt;background:
                    white'><span style='font-size:9.5pt;color:black'>我们会为实现本政策下述的各项功能，收集和使用您的个人信息：</span></p>

                    <p style='margin-top:7.25pt;margin-right:0cm;margin-bottom:0cm;margin-left:
                    0cm;margin-bottom:.0001pt;text-indent:19.35pt;line-height:12.1pt;background:
                    white'><strong><span style='font-size:9.5pt;font-family:宋体;color:black'>（一）<span
                    lang=EN-US>&nbsp;</span>帮助您成为我们的会员</span></strong></p>

                    <p style='margin-top:7.25pt;margin-right:0cm;margin-bottom:0cm;margin-left:
                    0cm;margin-bottom:.0001pt;text-indent:19.35pt;line-height:12.1pt;background:
                    white'><strong><span lang=EN-US style='font-size:9.5pt;font-family:宋体;
                    color:black'>1</span></strong><strong><span style='font-size:9.5pt;font-family:
                    宋体;color:black'>、基础会员服务</span></strong></p>

                    <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                    0cm;text-indent:19.35pt;line-height:10.9pt;'><span
                    style='font-size:9.5pt;color:black'>我们通过农联贡菜平台账户为您提供基础会员服务。为注册成为会员并使用我们的会员服务，您需要提供<strong><span
                    style='font-family:宋体'>手机号码、拟使用的会员名和密码</span></strong>用于创建农联贡菜平台账户。如果您仅需使用浏览、搜索服务，您不需要注册成为我们的会员及提供上述信息。</span></p>

                    <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                    0cm;text-indent:19.35pt;line-height:10.9pt;'><strong><u><span
                    style='font-size:9.5pt;font-family:宋体;color:black'>对于需要通过农联贡菜平台账户才能使用的服务，我们可能会根据您提供的上述信息校验您的会员身份，确保我们是在为您本人提供服务。</span></u></strong></p>

                    <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                    0cm;text-indent:19.35pt;line-height:10.9pt;'><span
                    style='font-size:9.5pt;color:black'>我们会根据您的会员账户使用情况及平台设置的会员等级计算规则确定您当前的会员等级，并为您提供相应会员等级所对应的基本权益。</span></p>

                    <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                    20.45pt;text-indent:-1.55pt;line-height:10.9pt;'><b><span
                    lang=EN-US style='font-size:9.5pt;color:black'>2</span></b><strong><span
                    style='font-size:9.5pt;font-family:宋体;color:black'>、附加会员服务</span></strong></p>

                    <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                    0cm;text-indent:19.35pt;line-height:10.9pt;'><span
                    style='font-size:9.5pt;color:black'>特别会员权益：如果您选择提供<strong><span
                    style='font-family:宋体'>真实姓名、性别、出生年月日、居住地、</span></strong></span><span
                    style='font-size:9.5pt;color:#333333'>昵称、头像</span><span style='font-size:9.5pt;
                    color:black'>等非注册必须的个人资料，我们可以为您提供会员生日特权等更加个性化的会员服务。<strong><span
                    style='font-family:宋体'>其中，为保证交易辨识度，您的昵称、头像将公开显示。</span></strong></span></p>

                    <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                    0cm;text-indent:19.35pt;'><span style='font-size:9.5pt;
                    color:#333333'>实人认证：您可以根据认证要求向我们提供相应的<strong><span style='font-family:宋体'>身份信息（身份证、护照、户口本及其他身份证件信息）、生物识别特征（静态或动态的面部特征）</span></strong>以完成实人认证。若您要使用账户增强保护功能，除可选择完成上述实人认证外，您还可以选择开启声纹密保或者扫脸登录，提供<strong><span
                    style='font-family:宋体'>声纹</span></strong>或者<strong><span style='font-family:
                    宋体'>面部特征信息</span></strong>。</span></p>

                    <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                    0cm;text-indent:19.35pt;line-height:10.9pt;'><span
                    style='font-size:9.5pt;color:black'>授权登录：</span><span style='font-size:9.5pt;
                    color:#333333'>我们可能经您同意后向第三方共享您的账户信息（头像、昵称及其他页面提示的信息），使您可以便捷地实现第三方账户的注册或登录。此外，我们可能会根据您的授权从第三方处获取您的</span><span
                    style='font-size:9.5pt;color:black'>第三方账户信息，并与您的农联贡菜平台账户进行绑定，使您可通过第三方账户直接登录、使用我们的产品及<span
                    lang=EN-US>/</span>或服务。我们将在您授权同意的范围内使用您的相关信息。</span></p>

                    <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                    0cm;text-indent:19.35pt;line-height:10.9pt;'><strong><u><span
                    style='font-size:9.5pt;font-family:宋体;color:black'>其他会员角色服务：如果您申请注册成为卖家、服务商或其他存在额外身份认证要求的会员角色，您需主动向我们提供身份信息及<span
                    lang=EN-US>/</span>或企业相关信息，或授权我们自支付宝公司处获取您对应支付宝账户的上述相关认证信息，用于您身份及特殊会员角色获取资格的核验、登记、公示及其他我们明确告知的目的。</span></u></strong><b><u><span
                    lang=EN-US style='font-size:9.5pt;color:black'><br>
                    <br>
                    </span></u></b></p>

                    <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                    0cm;text-indent:19.35pt;line-height:10.9pt;'><strong><u><span
                    lang=EN-US style='font-size:9.5pt;font-family:宋体;color:black'>3</span></u></strong><strong><u><span
                    style='font-size:9.5pt;font-family:宋体;color:black'>、账户信息展示：如果您已拥有农联贡菜平台账户，我们可能会在农联贡菜平台服务中显示您的上述个人信息（实人认证仅显示认证是否通过的结果），以及您在农联贡菜平台上或与农联贡菜平台账户相关联的产品和服务中执行的操作（</span></u></strong><span
                    style='font-size:9.5pt;color:black'>您可通过农联贡菜平台账户在我们提供的农联贡菜网<span lang=EN-US>/</span>手机农联贡菜首页、“必备工具”、“添加卡片”链接入口或其他产品<span
                    lang=EN-US>/</span>服务入口使用我们及<span lang=EN-US>/</span>或关联公司提供的产品或服务）<strong><u><span
                    style='font-family:宋体'>，包括通过农联贡菜平台账户集中展示您的个人资料、优惠权益、交易订单。我们会尊重您对农联贡菜平台服务和农联贡菜平台账户设置所做的选择。</span></u></strong></span></p>

                    <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                    9.45pt;text-indent:8.0pt;line-height:10.9pt;'><span lang=EN-US
                    style='font-size:9.5pt;color:black'><br>
                    </span><span style='font-size:9.5pt;color:black'>（二）<span lang=EN-US>&nbsp;</span><strong><span
                    style='font-family:宋体'>为您提供商品或服务信息展示</span></strong></span></p>

                    <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                    0cm;text-indent:19.35pt;'><span style='font-size:9.5pt;
                    color:#333333'>在您使用我们服务过程中，为识别账号异常状态、了解产品适配性、向您提供更契合您需求的页面展示和搜索结果，我们可能会自动收集您的使用情况并存储为网络日志信息，包括：</span></p>

                    <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                    0cm;text-indent:19.35pt;'><span style='font-size:9.5pt;
                    color:#333333'>设备信息：我们会根据您在软件安装及<span lang=EN-US>/</span>或使用中的具体操作，接收并记录您所使用的设备相关信息（包括设备型号、操作系统版本、设备设置、唯一设备标识符、设备环境等软硬件特征信息）、设备所在位置相关信息（包括您授权的<span
                    lang=EN-US>GPS</span>位置以及<span lang=EN-US>WLAN</span>接入点、蓝牙和基站等传感器信息）。</span></p>

                    <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                    0cm;text-indent:19.35pt;'><span style='font-size:9.5pt;
                    color:#333333'>服务日志信息：当您使用我们的网站或客户端提供的产品或服务时，我们会自动收集您对我们服务的详细使用情况，作为服务日志保存，包括浏览、点击查看、搜索查询、收藏、添加至购物车、交易、售后、关注分享信息、发布信息，以及<span
                    lang=EN-US>IP</span>地址、浏览器类型、电信运营商、使用语言、访问日期和时间。</span></p>

                    <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                    0cm;text-indent:19.35pt;'><strong><u><span style='font-size:
                    9.5pt;font-family:宋体;color:#333333'>请注意，单独的设备信息、服务日志信息是无法识别特定自然人身份的信息。</span></u></strong><span
                    style='font-size:9.5pt;color:#333333'>如果我们将这类非个人信息与其他信息结合用于识别特定自然人身份，或者将其与个人信息结合使用，则在结合使用期间，这类非个人信息将被视为个人信息，除取得您授权或法律法规另有规定外，我们会将这类信息做匿名化、去标识化处理。</span></p>

                    <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                    0cm;text-indent:19.35pt;'><strong><u><span style='font-size:
                    9.5pt;font-family:宋体;color:#333333'>为向您提供更便捷、更符合您个性化需求的信息展示、搜索及推送服务，我们会根据您的设备信息和服务日志信息，提取您的偏好特征，并基于特征标签产出间接人群画像，用于展示、推送信息和可能的商业广告。</span></u></strong></p>

                    <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                    0cm;text-indent:19.35pt;'><span style='font-size:9.5pt;
                    color:#333333'>如果您不想接受我们给您发送的商业广告，您可通过短信提示回复退订或我们提供的其他方式进行退订或关闭。在您使用我们提供的站内搜索服务时，我们也同时提供了不针对您个人特征的选项。</span></p>

                    <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                    0cm;text-indent:19.35pt;'><span style='font-size:9.5pt;
                    color:#333333'>此外，我们也会为了不断改进和优化上述的功能来使用您的上述信息。</span></p>

                    <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                    0cm;text-indent:19.35pt;'><b><span lang=EN-US style='font-size:
                    9.5pt;color:black'><br>
                    <br>
                    </span></b></p>

                    <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                    0cm;text-indent:19.35pt;'><strong><span style='font-size:9.5pt;
                    font-family:宋体;color:black'>（三）<span lang=EN-US>&nbsp;</span></span></strong><strong><span
                    style='font-size:9.5pt;font-family:宋体;color:#333333'>为您提供收藏、加购、关注与分享功能</span></strong></p>

                    <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                    0cm;text-indent:19.35pt;'><span style='font-size:9.5pt;
                    color:#333333'>在您浏览我们网站或客户端的过程中，您可以选择对感兴趣的商品及<span lang=EN-US>/</span>或服务进行收藏、添加至购物车、与您感兴趣的商家<span
                    lang=EN-US>/</span>品牌<span lang=EN-US>/</span>其他会员建立关注关系、通过我们提供的功能组件向其他第三方分享信息。在您使用上述功能的过程中，我们会收集包括您的收藏及添加购物车的记录、关注关系、分享历史在内的服务日志信息用于实现上述功能及其他我们明确告知的目的。</span></p>

                    <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                    0cm;text-indent:19.35pt;'><b><span lang=EN-US style='font-size:
                    9.5pt;font-family:"微软雅黑",sans-serif;color:#333333'><br>
                    <br>
                    </span></b></p>

                    <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                    0cm;text-indent:19.35pt;'><span style='font-size:9.5pt;
                    color:#333333'>（四）<b>帮<strong><span style='font-family:宋体'>助您完成下单及订单管理</span></strong></b></span></p>

                    <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                    0cm;text-indent:19.35pt;line-height:10.9pt;'><span
                    style='font-size:9.5pt;color:black'>当您在我们的产品及<span lang=EN-US>/</span>或服务中订购具体商品及<span
                    lang=EN-US>/</span>或服务时，我们会通过系统为您生成购买该商品及<span lang=EN-US>/</span>或服务的订单。在下单过程中<span
                    lang=EN-US>,</span>您需至少提供您的<strong><span style='font-family:宋体'>收货人姓名、收货地址、收货人联系电话</span></strong>，同时该订单中会载明您所购买的商品及<span
                    lang=EN-US>/</span>或服务信息、具体订单号、订单创建时间、您应支付的金额，我们收集这些信息是为了帮助您顺利完成交易、保障您的交易安全、查询订单信息、提供客服与售后服务及其他我们明确告知的目的。</span></p>

                    <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                    0cm;text-indent:19.35pt;'><span style='font-size:9.5pt;
                    color:#333333'>您可以通过农联贡菜网为其他人订购商品及<span lang=EN-US>/</span>或服务，您需要提供该实际订购人的前述个人信息。</span></p>

                    <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                    0cm;text-indent:19.35pt;'><span style='font-size:9.5pt;
                    color:#333333'>为便于您了解查询订单信息并对订单信息进行管理，我们会收集您在使用我们服务过程中产生的订单信息用于向您展示及便于您对订单进行管理。<span
                    lang=EN-US>&nbsp;</span></span></p>

                    <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                    0cm;text-indent:16.95pt;'><span style='font-size:9.5pt;
                    color:black'>您可额外填写<span lang=EN-US>/</span>选择包括<strong><span style='font-family:
                    宋体'>其他联系电话</span></strong>、收货时间在内的更多附加信息以确保商品或服务的准确送达</span><span
                    style='font-size:9.5pt;color:#333333'>。</span></p>

                    <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                    0cm;text-indent:16.95pt;'><span lang=EN-US style='font-size:
                    9.5pt;color:#333333'>&nbsp;</span></p>

                    <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                    0cm;text-indent:16.95pt;'><strong><span style='font-size:9.5pt;
                    font-family:宋体;color:black'>（五）<span lang=EN-US>&nbsp;</span>帮助您完成支付<span
                    lang=EN-US>&nbsp;</span></span></strong></p>

                    <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                    0cm;text-indent:16.95pt;'><span style='font-size:9.5pt;
                    color:#333333'>为完成订单支付，您需要提供<strong><span style='font-family:宋体'>支付宝账户</span></strong>并选择付款方式，<strong><span
                    style='font-family:宋体'>我们会将您的农联贡菜平台账户会员名、对应的支付宝账户会员名、订单支付相关信息及其他反洗钱法律要求的必要信息与支付宝公司共享。如您选择由其他金融机构为您提供支付服务的，我们还会将您的包括银行卡号、有效期在内的银行卡支付必要信息与您选择的相应金融机构共享。</span></strong></span></p>

                    <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                    0cm;text-indent:19.35pt;'><span style='font-size:9.5pt;
                    color:#333333'>您可以请求其他人为您付款，那么您需要提供<strong><span style='font-family:宋体'>代付人的支付宝账户及</span></strong></span><strong><span
                    lang=EN-US style='font-size:9.5pt;font-family:"微软雅黑",sans-serif;color:#333333'>/</span></strong><strong><span
                    style='font-size:9.5pt;font-family:宋体;color:#333333'>或手机号码</span></strong><span
                    style='font-size:9.5pt;color:#333333'>。</span></p>

                    <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                    0cm;text-indent:19.35pt;line-height:10.9pt;'><span
                    style='font-size:9.5pt;color:black'>为</span><span style='font-size:9.5pt;
                    color:#333333'>使我们及时获悉并确认您的</span><span style='font-size:9.5pt;color:black'>支付进度及状态，为您提供售后与争议解决服务，您同意我们可自您所选择的交易对象、支付宝公司或您选择的其他金融机构处收集与支付进度相关信息。</span></p>

                    <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                    0cm;text-indent:19.35pt;line-height:10.9pt;'><b><span
                    lang=EN-US style='font-size:9.5pt;color:black'><br>
                    <br>
                    </span></b></p>

                    <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                    0cm;text-indent:19.35pt;line-height:10.9pt;'><strong><span
                    style='font-size:9.5pt;font-family:宋体;color:black'>（六）<span lang=EN-US>&nbsp;</span>帮助向您完成商品或服务的交付</span></strong></p>

                    <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                    0cm;text-indent:19.35pt;line-height:10.9pt;'><span
                    style='font-size:7.5pt;color:#333333'>为保证您购买的商品及</span><span lang=EN-US
                    style='font-size:7.5pt;font-family:"Tahoma",sans-serif;color:#333333'>/</span><span
                    style='font-size:7.5pt;color:#333333'>或服务能够顺利、安全、准确送达，我们会向为农联贡菜平台提供物流信息系统和技术服务的浙江菜鸟供应链管理有限公司披露</span><b><span
                    style='font-size:10.5pt;color:#333333'>订单相关配送信息</span></b><span
                    style='font-size:7.5pt;color:#333333'>，并由其根据商品及</span><span lang=EN-US
                    style='font-size:7.5pt;font-family:"Tahoma",sans-serif;color:#333333'>/</span><span
                    style='font-size:7.5pt;color:#333333'>或服务提供主体的指定向相应的物流配送主体同步相关配送信息。您知晓并同意相应物流配送主体不可避免地获知及使用您的配送信息，用于完成交付目的。</span></p>

                    <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                    0cm;text-indent:19.35pt;line-height:10.9pt;'><span
                    style='font-size:7.5pt;color:#333333'>为使我们及时获悉并确认交付进度及状态，向您提供售后与争议解决服务，您同意我们可自物流相关服务主体处收集与交付进度相关信息。</span></p>

                    <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:0cm;margin-left:
                    0cm;margin-bottom:.0001pt;text-indent:19.35pt;line-height:10.9pt;background:
                    white'><b><span lang=EN-US style='font-size:9.5pt;color:black'><br>
                    <br>
                    </span></b></p>

                    <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:0cm;margin-left:
                    0cm;margin-bottom:.0001pt;text-indent:19.35pt;line-height:10.9pt;background:
                    white'><strong><span style='font-size:9.5pt;font-family:宋体;color:black'>（七）<span
                    lang=EN-US>&nbsp;</span>客服及争议处理</span></strong></p>

                    <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                    0cm;text-indent:19.35pt;'><span style='font-size:9.5pt;
                    color:#333333'>当您与我们联系或提出售中售后、争议纠纷处理申请时，为了保障您的账户及系统安全，<strong><u><span
                    style='font-family:宋体'>我们需要您提供必要的个人信息以核验您的会员身份。</span></u></strong></span></p>

                    <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                    0cm;text-indent:19.35pt;'><strong><u><span style='font-size:
                    9.5pt;font-family:宋体;color:#333333'>为便于与您联系、尽快帮助您解决问题或记录相关问题的处理方案及结果，我们可能会保存您</span></u></strong><strong><u><span
                    style='font-size:9.5pt;font-family:宋体;color:black'>与我们</span></u></strong><strong><u><span
                    style='font-size:9.5pt;font-family:宋体;color:#333333'>的通信<span lang=EN-US>/</span>通话记录及相关内容（包括账号信息、订单信息、您为了证明相关事实提供的其他信息，或您留下的联系方式信息），如果您针对具体订单进行咨询、投诉或提供建议的，我们会使用您的账号信息和订单信息。</span></u></strong></p>

                    <p style='margin-top:0cm;margin-right:0cm;margin-bottom:12.1pt;margin-left:
                    0cm;text-indent:19.95pt;'><span style='font-size:9.5pt;
                    color:#333333'>为了提供服务及改进服务质量的合理需要，我们还可能使用的您的其他信息，包括您与客服联系时您提供的相关信息，您参与问卷调查时向我们发送的问卷答复信息。</span></p>

                    <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                    0cm;'><strong><span lang=EN-US style='font-size:9.5pt;
                    font-family:宋体;color:black'>&nbsp;&nbsp;</span></strong><strong><span
                    style='font-size:9.5pt;font-family:宋体;color:black'>（八）<span lang=EN-US>&nbsp;</span>为您提供评论、问答等信息公开发布功能</span></strong></p>

                    <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                    0cm;text-indent:19.35pt;'><span style='font-size:9.5pt;
                    color:#333333'>您可通过我们为您提供的评论、问答、论坛、晒单分享、直播及其他信息发布功能公开发布信息，包括作为会员可发布图文<span
                    lang=EN-US>/</span>视频<span lang=EN-US>/</span>直播内容、发表评价及问答内容，以及作为卖家发布商品及<span
                    lang=EN-US>/</span>或服务相关信息、店铺相关信息。</span></p>

                    <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                    0cm;text-indent:19.35pt;'><span style='font-size:9.5pt;
                    color:#333333'>我们可能会根据您的会员类型及网络日志信息判断您是否可享受对应功能权限（例如只有曾购买过某商品的会员才可通过问大家对其他会员针对该商品的提问做出回答）。</span></p>

                    <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                    0cm;text-indent:16.95pt;line-height:10.9pt;'><strong><u><span
                    style='font-size:9.5pt;font-family:宋体;color:black'>请注意，您公开发布的信息中可能会涉及您或他人的个人信息甚至个人敏感信息，如您在评价时选择上传包含个人信息的图片。请您更加谨慎地考虑，是否在使用我们的服务时共享甚至公开分享相关信息。</span></u></strong></p>

                    <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                    0cm;'><strong><span lang=EN-US style='font-size:9.5pt;
                    font-family:宋体;color:black'>&nbsp;</span></strong></p>

                    <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                    0cm;'><strong><span lang=EN-US style='font-size:9.5pt;
                    font-family:宋体;color:black'>&nbsp; </span></strong><strong><span
                    style='font-size:9.5pt;font-family:宋体;color:black'>（九）<span lang=EN-US>&nbsp;</span>为您提供安全保障</span></strong></p>

                    <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                    0cm;text-indent:19.35pt;'><span style='font-size:9.5pt;
                    color:#333333'>为提高您使用我们及我们关联公司、合作伙伴提供服务的安全性，保护您或其他用户或公众的人身财产安全免遭侵害，更好地预防钓鱼网站、欺诈、网络漏洞、计算机病毒、网络攻击、网络侵入等安全风险，更准确地识别违反法律法规或农联贡菜网相关协议规则的情况，我们可能使用或整合您的会员信息、交易信息、设备信息、服务日志信息以及我们关联公司、合作伙伴取得您授权或依据法律共享的信息，来综合判断您账户及交易风险、进行身份验证、检测及防范安全事件，并依法采取必要的记录、审计、分析、处置措施。</span></p>

                    <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                    0cm;'><span lang=EN-US style='font-size:9.5pt;color:#333333'>&nbsp;</span></p>

                    <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                    0cm;'><span lang=EN-US style='font-size:9.5pt;color:#333333'>&nbsp;&nbsp;</span><b><span
                    style='font-size:9.5pt;color:black'>（十）<span lang=EN-US>&nbsp;</span><strong><span
                    style='font-family:宋体'>为您提供其他附加服务</span></strong></span></b></p>

                    <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                    0cm;text-indent:16.95pt;line-height:10.9pt;'><span
                    style='font-size:9.5pt;color:black'>为向您提供更便捷、更优质、个性化的产品及<span lang=EN-US>/</span>或服务，努力提升您的体验，我们在向您提供的以下附加服务中可能会收集和使用您的个人信息。<strong><u><span
                    style='font-family:宋体'>如果您不提供这些信息，不会影响您使用农联贡菜网的浏览、搜索、购买等基本服务，</span></u></strong>但您可能无法获得这些附加服务给您带来的用户体验。这些附加服务包括：</span></p>

                    <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:0cm;margin-left:
                    0cm;margin-bottom:.0001pt;text-indent:19.35pt;'><span
                    lang=EN-US style='font-size:9.5pt;color:black'>1</span><span style='font-size:
                    9.5pt;color:black'>、基于位置信息的个性化推荐服务：我们会在您开启位置权限后访问获取您的位置信息，根据您的位置信息为您提供更契合您需求的页面展示、产品及<span
                    lang=EN-US>/</span>或服务，比如向您推荐附近的优惠信息。</span></p>

                    <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:0cm;margin-left:
                    0cm;margin-bottom:.0001pt;text-indent:19.35pt;'><span
                    lang=EN-US style='font-size:9.5pt;color:black'>2</span><span style='font-size:
                    9.5pt;color:black'>、基于相机<span lang=EN-US>/</span>摄像头的附加服务：您可在开启相机<span
                    lang=EN-US>/</span>摄像头权限后使用该功能进行扫码用于登录、购物、领取优惠信息，拍摄照片或视频用于评价、分享，以及特定场景下经您授权的人脸识别等功能。当您使用该附加功能进行人脸识别时我们会收集您的<strong><span
                    style='font-family:宋体'>面部特征</span></strong>，且严格在经您授权同意的范围内使用，未来如我们拟使用您的面部信息为您提供其他产品及<span
                    lang=EN-US>/</span>或服务功能的，我们会再次与您确认。</span></p>

                    <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                    0cm;text-indent:19.35pt;'><span lang=EN-US style='font-size:
                    9.5pt;color:black'>3</span><span style='font-size:9.5pt;color:black'>、基于相册（图片库<span
                    lang=EN-US>/</span>视频库）的图片<span lang=EN-US>/</span>视频访问及上传的附加服务：您可在开启相册权限后使用该功能上传您的照片<span
                    lang=EN-US>/</span>图片<span lang=EN-US>/</span>视频，以实现更换头像、发表评论<span lang=EN-US>/</span>分享、拍照购物或与客服沟通提供证明等功能<strong><span
                    style='font-family:宋体'>。</span></strong></span><strong><u><span
                    style='font-size:9.5pt;font-family:宋体;color:#333333'>我们可能会通过您所上传的照片<span
                    lang=EN-US>/</span>图片来识别您需要购买的商品或服务，或使用包含您所上传照片或图片的评论信息。</span></u></strong></p>

                    <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:0cm;margin-left:
                    0cm;margin-bottom:.0001pt;text-indent:19.35pt;'><span
                    lang=EN-US style='font-size:9.5pt;color:black'>4</span><span style='font-size:
                    9.5pt;color:black'>、基于麦克风的语音技术相关附加服务：您可在开启麦克风权限后使用麦克风实现语音购物功能，或与客服联系或与客服机器人实现语音交互，在这些功能中我们会收集您的<strong><span
                    style='font-family:宋体'>录音内容</span></strong>以识别您的购物需求，或响应您的客服及争议处理等需求。请您知晓，<strong><u><span
                    style='font-family:宋体'>即使您已同意开启麦克风权限，我们也仅会在</span></u></strong></span><strong><u><span
                    style='font-size:9.5pt;font-family:宋体;color:#333333'>您主动点击客户端内麦克风图标或录制视频时通过麦克风获取语音信息。</span></u></strong></p>

                    <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                    0cm;text-indent:19.35pt;'><span lang=EN-US style='font-size:
                    9.5pt;color:black'>5</span><span style='font-size:9.5pt;color:black'>、基于通讯录信息的附加服务：我们将在您开启通讯录权限后收集您的<strong><span
                    style='font-family:宋体'>通讯录信息</span></strong>使您在购物时可以更便利地取用您通讯录内的联系人信息，无需再手动输入，包括您可以直接为通讯录中的联系人手机号进行充值；此外，为提升您在使用我们产品及<span
                    lang=EN-US>/</span>或服务过程中的社交互动分享乐趣，与您认识的人分享购物体验，在经您同意的前提下，我们也可能对您联系人的姓名和电话号码进行加密收集，帮助您判断您的通讯录联系人是否同为我们的会员进而在农联贡菜网为你们的交流建立联系，同时，会员可选择开启或关闭好友隐私权限决定自己是否可被其他会员通过手机号码搜索、联系。</span></p>

                    <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                    0cm;text-indent:19.35pt;'><span lang=EN-US style='font-size:
                    9.5pt;color:#333333'>6</span><span style='font-size:9.5pt;color:#333333'>、基于日历的附加服务：在您开启我们可读取<span
                    lang=EN-US>/</span>写入您日历的权限后，我们将收集您的日历信息用于向您提供购物或领取权益相关记录及提醒。</span></p>

                    <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:0cm;margin-left:
                    0cm;margin-bottom:.0001pt;text-indent:19.35pt;'><span
                    lang=EN-US style='font-size:9.5pt;color:black'>&nbsp;</span></p>

                    <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:0cm;margin-left:
                    0cm;margin-bottom:.0001pt;text-indent:19.35pt;'><span
                    style='font-size:9.5pt;color:#333333'>您理解并同意，上述附加服务可能需要您在您的设备中开启您的位置信息 （地理位置）、摄像头（相机）、相册（图片库）、麦克风（语音）、通讯录及<span
                    lang=EN-US>/</span>或日历的访问权限，以实现这些权限所涉及信息的收集和使用。您可在您的设备设置或我们客户端“我的农联贡菜<span
                    lang=EN-US>-</span>设置<span lang=EN-US>-</span>隐私—系统权限”中逐项查看上述权限的状态，并可自行决定这些权限随时的开启或关闭。<strong><u><span
                    style='font-family:宋体'>请您注意，您开启任一权限即代表您授权我们可以收集和使用相关个人信息来为您提供对应服务，您一旦关闭任一权限即代表您取消了授权，我们将不再基于对应权限继续收集和使用相关个人信息，也无法为您提供该权限所对应的服务。但是，您关闭权限的决定不会影响此前基于您的授权所进行的信息收集及使用。</span></u></strong></span></p>

                    <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                    14.5pt;'><strong><span lang=EN-US style='font-size:9.5pt;
                    font-family:"微软雅黑",sans-serif;color:#333333'>&nbsp;</span></strong></p>

                    <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                    14.5pt;'><strong><span style='font-size:9.5pt;font-family:宋体;
                    color:#333333'>（十一）其他</span></strong></p>

                    <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                    0cm;text-indent:19.35pt;'><strong><u><span lang=EN-US
                    style='font-size:9.5pt;font-family:宋体;color:#333333'>1</span></u></strong><strong><u><span
                    style='font-size:9.5pt;font-family:宋体;color:#333333'>、若你提供的信息中含有其他用户的个人信息，在向农联贡菜网提供这些个人信息之前，您需确保您已经取得合法的授权。</span></u></strong></p>

                    <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                    0cm;text-indent:19.35pt;'><strong><u><span lang=EN-US
                    style='font-size:9.5pt;font-family:宋体;color:#333333'>2</span></u></strong><strong><u><span
                    style='font-size:9.5pt;font-family:宋体;color:#333333'>、若我们将信息用于本政策未载明的其他用途，或者将基于特定目的收集而来的信息用于其他目的，或者我们主动从第三方处获取您的个人信息，均会事先获得您的同意。</span></u></strong></p>

                    <p style='margin-top:7.25pt;margin-right:0cm;margin-bottom:0cm;margin-left:
                    0cm;margin-bottom:.0001pt;text-indent:19.35pt;line-height:12.1pt;background:
                    white'><span style='font-size:9.5pt;color:#333333'>若我们从第三方处间接获取您的信息的，</span><span
                    style='font-size:9.5pt;color:black'>我们会在收集前明确以书面形式要求该第三方在已依法取得您同意后收集个人信息，并向您告知共享的信息内容，且涉及敏感信息的在提供给我们使用前需经过您的明确确认，要求第三方对个人信息来源的合法性和合规性作出承诺，如第三方有违反行为的，我们会明确要求对方承担相应法律责任；同时，我们的专业安全团队对个人信息会进行安全加固（包括敏感信息报备、敏感信息加密存储、访问权限控制等）。我们会使用不低于我们对自身用户个人信息同等的保护手段与措施对间接获取的个人信息进行保护。</span></p>

                    <p style='margin-top:7.25pt;margin-right:0cm;margin-bottom:0cm;margin-left:
                    0cm;margin-bottom:.0001pt;text-indent:19.35pt;line-height:12.1pt;background:
                    white'><span lang=EN-US style='font-size:9.5pt;color:black'>3</span><span
                    style='font-size:9.5pt;color:black'>、征得授权同意的例外</span></p>

                    <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:0cm;margin-left:
                    0cm;margin-bottom:.0001pt;text-indent:19.35pt;line-height:10.9pt;background:
                    white'><span style='font-size:9.5pt;color:black'>您充分理解并同意，我们在以下情况下收集、使用您的个人信息无需您的授权同意，且我们可能不会响应您提出的更正<span
                    lang=EN-US>/</span>修改、删除、注销、撤回同意、索取信息的请求：</span></p>

                    <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:0cm;margin-left:
                    0cm;margin-bottom:.0001pt;text-indent:19.35pt;line-height:10.9pt;background:
                    white'><span style='font-size:9.5pt;color:black'>（<span lang=EN-US>1</span>）与国家安全、国防安全有关的；</span></p>

                    <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:0cm;margin-left:
                    0cm;margin-bottom:.0001pt;text-indent:19.35pt;line-height:10.9pt;background:
                    white'><span style='font-size:9.5pt;color:black'>（<span lang=EN-US>2</span>）与公共安全、公共卫生、重大公共利益有关的；</span></p>

                    <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:0cm;margin-left:
                    0cm;margin-bottom:.0001pt;text-indent:19.35pt;line-height:10.9pt;background:
                    white'><span style='font-size:9.5pt;color:black'>（<span lang=EN-US>3</span>）与犯罪侦查、起诉、审判和判决执行等司法或行政执法有关的；</span></p>

                    <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:0cm;margin-left:
                    0cm;margin-bottom:.0001pt;text-indent:19.35pt;line-height:10.9pt;background:
                    white'><span style='font-size:9.5pt;color:black'>（<span lang=EN-US>4</span>）出于维护您或其他个人的生命、财产等重大合法权益但又很难得到本人同意的；</span></p>

                    <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:0cm;margin-left:
                    0cm;margin-bottom:.0001pt;text-indent:19.35pt;line-height:10.9pt;background:
                    white'><span style='font-size:9.5pt;color:black'>（<span lang=EN-US>5</span>）您自行向社会公众公开的个人信息；</span></p>

                    <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:0cm;margin-left:
                    0cm;margin-bottom:.0001pt;text-indent:19.35pt;line-height:10.9pt;background:
                    white'><span style='font-size:9.5pt;color:black'>（<span lang=EN-US>6</span>）从合法公开披露的信息中收集个人信息的，如合法的新闻报道、政府信息公开等渠道。</span></p>

                    <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:0cm;margin-left:
                    0cm;margin-bottom:.0001pt;text-indent:19.35pt;line-height:10.9pt;background:
                    white'><span style='font-size:9.5pt;color:black'>（<span lang=EN-US>7</span>）根据与您签订和履行相关协议或其他书面文件所必需的；</span></p>

                    <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:0cm;margin-left:
                    0cm;margin-bottom:.0001pt;text-indent:19.35pt;line-height:10.9pt;background:
                    white'><span style='font-size:9.5pt;color:black'>（<span lang=EN-US>8</span>）用于维护所提供的产品及<span
                    lang=EN-US>/</span>或服务的安全稳定运行所必需的，例如发现、处置产品及<span lang=EN-US>/</span>或服务的故障；</span></p>

                    <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:0cm;margin-left:
                    0cm;margin-bottom:.0001pt;text-indent:19.35pt;line-height:10.9pt;background:
                    white'><span style='font-size:9.5pt;color:black'>（<span lang=EN-US>9</span>）为合法的新闻报道所必需的；</span></p>

                    <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:0cm;margin-left:
                    0cm;margin-bottom:.0001pt;text-indent:19.35pt;line-height:10.9pt;background:
                    white'><span style='font-size:9.5pt;color:black'>（<span lang=EN-US>10</span>）学术研究机构基于公共利益开展统计或学术研究所必要，且对外提供学术研究或描述的结果时，对结果中所包含的个人信息进行去标识化处理的；</span></p>

                    <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:0cm;margin-left:
                    0cm;margin-bottom:.0001pt;text-indent:19.35pt;line-height:10.9pt;background:
                    white'><span style='font-size:9.5pt;color:black'>（<span lang=EN-US>11</span>）法律法规规定的其他情形。</span></p>

                    <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                    0cm;text-indent:19.35pt;line-height:10.9pt;'><span
                    style='font-size:9.5pt;color:black'>请知悉，根据适用的法律，若我们<strong><u><span
                    style='font-family:宋体'>对个人信息采取技术措施和其他必要措施进行处理，使得数据接收方无法重新识别特定个人且不能复原</span></u></strong>，或我们可能会对收集的信息进行去标识化地研究、统计分析和预测，用于改善农联贡菜网的内容和布局，为商业决策提供产品或服务支撑，以及改进我们的产品和服务（包括使用匿名数据进行机器学习或模型算法训练），<strong><u><span
                    style='font-family:宋体'>则此类处理后数据的使用无需另行向您通知并征得您的同意</span></u></strong>。</span></p>

                    <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                    0cm;text-indent:19.35pt;line-height:10.9pt;'><span lang=EN-US
                    style='font-size:9.5pt;color:black'>4</span><span style='font-size:9.5pt;
                    color:black'>、如我们停止运营农联贡菜网产品或服务，我们将及时停止继续收集您个人信息的活动，将停止运营的通知以逐一送达或公告的形式通知您，并对我们所持有的与已关停业务相关的个人信息进行删除或匿名化处理。</span></p>

                    <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                    0cm;text-indent:19.35pt;line-height:10.9pt;'><span lang=EN-US
                    style='font-size:9.5pt;color:black'>&nbsp;</span></p>

                    <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                    0cm;text-indent:16.95pt;line-height:10.9pt;'><strong><span
                    style='font-size:9.5pt;font-family:宋体;color:black'>二、我们如何使用</span></strong><strong><span
                    lang=EN-US style='font-size:9.5pt;font-family:宋体;color:#333333'>Cookie</span></strong><strong><span
                    style='font-size:9.5pt;font-family:宋体;color:black'>和同类技术</span></strong></p>

                    <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                    0cm;text-indent:16.95pt;line-height:10.9pt;'><b><span
                    lang=EN-US style='font-size:9.5pt;color:black'><br>
                    <br>
                    </span></b></p>

                    <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                    0cm;text-indent:16.95pt;line-height:10.9pt;'><strong><span
                    style='font-size:9.5pt;font-family:宋体;color:black'>（一）</span></strong><strong><span
                    lang=EN-US style='font-size:9.5pt;font-family:宋体;color:#333333'>Cookie</span></strong></p>

                    <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                    0cm;text-indent:16.95pt;line-height:10.9pt;'><span
                    style='font-size:9.5pt;color:black'>为确保网站正常运转、为您获得更轻松的访问体验、向您推荐您可能感兴趣的内容，我们会在您的计算机或移动设备上存储<span
                    lang=EN-US>Cookie</span>、<span lang=EN-US>Flash Cookie</span>，或浏览器（或关联应用程序）提供的其他通常包含标识符、站点名称以及一些号码和字符的本地存储（统称“<span
                    lang=EN-US>Cookie</span>”）。借助于<span lang=EN-US> Cookie</span>，网站能够存储您的偏好或购物车内的商品等数据。</span></p>

                    <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                    0cm;text-indent:16.95pt;line-height:10.9pt;'><strong><u><span
                    style='font-size:9.5pt;font-family:宋体;color:black'>如果您的浏览器或浏览器附加服务允许，您可修改对<span
                    lang=EN-US>Cookie</span>的接受程度或拒绝我们的<span lang=EN-US>Cookie</span>。</span></u></strong><span
                    style='font-size:9.5pt;color:black'>有关详情，请参见<span lang=EN-US> AboutCookies.org</span>。但如果您这么做，在某些情况下可能会影响您安全访问我们的网站，且可能需要在每一次访问我们的网站时更改用户设置。</span></p>

                    <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                    0cm;text-indent:16.95pt;line-height:10.9pt;'><span lang=EN-US
                    style='font-size:9.5pt;color:black'><br>
                    <br>
                    </span></p>

                    <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                    0cm;text-indent:16.95pt;line-height:10.9pt;'><strong><span
                    style='font-size:9.5pt;font-family:宋体;color:black'>（二）</span></strong><strong><span
                    lang=EN-US style='font-size:9.5pt;font-family:宋体;color:#333333'>Cookie</span></strong><strong><span
                    style='font-size:9.5pt;font-family:宋体;color:#333333'>同类技术</span></strong></p>

                    <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                    0cm;text-indent:16.95pt;line-height:10.9pt;'><span
                    style='font-size:9.5pt;color:black'>除</span><span lang=EN-US style='font-size:
                    9.5pt;font-family:"微软雅黑",sans-serif;color:#333333'>&nbsp;</span><span
                    lang=EN-US style='font-size:9.5pt;color:#333333'>Cookie</span><span
                    style='font-size:9.5pt;color:black'>外，我们还会在网站上使用网站信标、像素标签、<span lang=EN-US>ETag</span>等其他同类技术。</span></p>

                    <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                    0cm;text-indent:16.95pt;line-height:10.9pt;'><span
                    style='font-size:9.5pt;color:black'>例如，我们向您发送的电子邮件可能含有链接至我们网站内容的地址链接，如果您点击该链接，我们则会跟踪此次点击，帮助我们了解您的产品或服务偏好，以便于我们主动改善客户服务体验。网站信标通常是一种嵌入到网站或电子邮件中的透明图像。借助于电子邮件中的像素标签，我们能够获知电子邮件是否被打开。如果您不希望自己的活动以这种方式被追踪，则可以随时从我们的寄信名单中退订。</span></p>

                    <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                    0cm;text-indent:16.95pt;line-height:10.9pt;'><span lang=EN-US
                    style='font-size:9.5pt;color:black'>ETag</span><span style='font-size:9.5pt;
                    color:black'>（实体标签）是在互联网浏览器与互联网服务器之间背后传送的<span lang=EN-US>HTTP</span>协议标头，可代替<span
                    lang=EN-US>Cookie</span>。<span lang=EN-US>ETag</span>可以帮助我们避免不必要的服务器负载，提高服务效率，节省资源、能源，同时，我们可能通过<span
                    lang=EN-US>ETag</span>来记录您的身份，以便我们可以更深入地了解和改善我们的产品或服务。<strong><u><span
                    style='font-family:宋体'>大多数浏览器均为用户提供了清除浏览器缓存数据的功能，您可以在浏览器设置功能中进行相应的数据清除操作。</span></u></strong>但请注意，如果停用<span
                    lang=EN-US>ETag</span>，您可能无法享受相对更佳的产品或服务体验。</span></p>

                    <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                    0cm;line-height:10.9pt;'><span lang=EN-US style='font-size:
                    9.5pt;font-family:"微软雅黑",sans-serif;color:#333333'>&nbsp;</span></p>

                    <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                    0cm;text-indent:16.95pt;line-height:10.9pt;'><strong><span
                    style='font-size:9.5pt;font-family:宋体;color:black'>三、我们如何共享、转让、公开披露您的信息</span></strong></p>

                    <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                    9.45pt;text-indent:5.8pt;line-height:10.9pt;'><b><span
                    lang=EN-US style='font-size:9.5pt;color:black'><br>
                    </span></b><strong><span style='font-size:9.5pt;font-family:宋体;color:black'>（一）共享</span></strong></p>

                    <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                    0cm;line-height:10.9pt;'><span lang=EN-US style='font-size:
                    9.5pt;font-family:"微软雅黑",sans-serif;color:#333333'>&nbsp; &nbsp; &nbsp;&nbsp;</span><span
                    style='font-size:9.5pt;color:black'>我们不会与农联贡菜网服务提供者以外的公司、组织和个人共享您的个人信息，但以下情况除外：</span></p>

                    <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                    0cm;text-indent:16.95pt;line-height:10.9pt;'><span lang=EN-US
                    style='font-size:9.5pt;color:black'>1</span><span style='font-size:9.5pt;
                    color:black'>、在法定情形下的共享：我们可能会根据法律法规规定、诉讼、争议解决需要，或按行政、司法机关依法提出的要求，对外共享您的个人信息。</span></p>

                    <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                    0cm;text-indent:16.95pt;line-height:10.9pt;'><span lang=EN-US
                    style='font-size:9.5pt;color:black'>2</span><span style='font-size:9.5pt;
                    color:black'>、在获取明确同意的情况下共享：获得您的明确同意后，我们会与其他方共享您的个人信息。</span></p>

                    <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                    0cm;text-indent:16.95pt;line-height:10.9pt;'><span lang=EN-US
                    style='font-size:9.5pt;color:black'>3</span><span style='font-size:9.5pt;
                    color:black'>、在您主动选择情况下共享：您通过农联贡菜平台购买商品或服务，我们会根据您的选择，将您的订单信息中与交易有关的必要信息共享给相关商品或服务的提供者，以实现您的交易及售后服务需求。</span></p>

                    <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                    0cm;text-indent:16.95pt;line-height:10.9pt;'><span lang=EN-US
                    style='font-size:9.5pt;color:black'>4</span><span style='font-size:9.5pt;
                    color:black'>、与关联公司间共享：<strong><u><span style='font-family:宋体'>为便于我们基于农联贡菜平台账户向您提供产品和服务，推荐您可能感兴趣的信息，识别会员账号异常，保护农联贡菜网关联公司或其他用户或公众的人身财产安全免遭侵害，您的个人信息可能会与我们的关联公司和<span
                    lang=EN-US>/</span>或其指定的服务提供商共享。</span></u></strong>我们只会共享必要的个人信息，且受本隐私政策中所声明目的的约束，如果我们共享您的个人敏感信息或关联公司改变个人信息的使用及处理目的，将再次征求您的授权同意。</span></p>

                    <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                    0cm;text-indent:16.95pt;line-height:10.9pt;'><span lang=EN-US
                    style='font-size:9.5pt;color:black'>5</span><span style='font-size:9.5pt;
                    color:black'>、与授权合作伙伴共享：<strong><u><span style='font-family:宋体'>我们可能委托授权合作伙伴为您提供某些服务或代表我们履行职能，</span></u></strong>我们仅会出于本隐私权政策声明的合法、正当、必要、特定、明确的目的共享您的信息，授权合作伙伴只能接触到其履行职责所需信息，且不得将此信息用于其他任何目的。</span></p>

                    <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                    0cm;text-indent:16.95pt;line-height:10.9pt;'><span
                    style='font-size:9.5pt;color:black'>目前，我们的授权合作伙伴包括以下类型：</span></p>

                    <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                    0cm;text-indent:16.95pt;line-height:10.9pt;'><span
                    style='font-size:9.5pt;color:black'>（<span lang=EN-US>1</span>）广告、分析服务类的授权合作伙伴。除非得到您的许可，否则我们不会将您的个人身份信息与提供广告、分析服务的合作伙伴共享。我们会委托这些合作伙伴处理与广告覆盖面和有效性相关的信息，但不会提供您的个人身份信息，或者我们将这些信息进行去标识化处理，以便它不会识别您个人。这类合作伙伴可能将上述信息与他们合法获取的其他数据相结合，以执行我们委托的广告服务或决策建议。</span></p>

                    <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                    0cm;text-indent:16.95pt;line-height:10.9pt;'><span
                    style='font-size:9.5pt;color:black'>（<span lang=EN-US>2</span>）供应商、服务提供商和其他合作伙伴。我们将信息发送给支持我们业务的供应商、服务提供商和其他合作伙伴，这些支持包括受我们委托提供的技术基础设施服务、分析我们服务的使用方式、衡量广告和服务的有效性、提供客户服务、支付便利或进行学术研究和调查。</span></p>

                    <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                    0cm;text-indent:16.95pt;line-height:10.9pt;'><span
                    style='font-size:9.5pt;color:black'>我们会对授权合作伙伴获取有关信息的应用程序接口（<span lang=EN-US>API</span>）、软件工具开发包（<span
                    lang=EN-US>SDK</span>）进行严格的安全检测，并与授权合作伙伴约定严格的数据保护措施，令其按照我们的委托目的、服务说明、本隐私权政策以及其他任何相关的保密和安全措施来处理个人信息。</span></p>

                    <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                    0cm;text-indent:16.95pt;line-height:10.9pt;'><span lang=EN-US
                    style='font-size:9.5pt;color:black'><br>
                    <br>
                    </span></p>

                    <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                    0cm;text-indent:16.95pt;line-height:10.9pt;'><strong><span
                    style='font-size:9.5pt;font-family:宋体;color:black'>（二）转让</span></strong></p>

                    <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                    0cm;text-indent:16.95pt;line-height:10.9pt;'><span
                    style='font-size:9.5pt;color:black'>我们不会将您的个人信息转让给任何公司、组织和个人，但以下情况除外：</span></p>

                    <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                    0cm;text-indent:16.95pt;line-height:10.9pt;'><span lang=EN-US
                    style='font-size:9.5pt;color:black'>1</span><span style='font-size:9.5pt;
                    color:black'>、在获取明确同意的情况下转让：获得您的明确同意后，我们会向其他方转让您的个人信息；</span></p>

                    <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                    0cm;text-indent:16.95pt;line-height:10.9pt;'><span lang=EN-US
                    style='font-size:9.5pt;color:black'>2</span><span style='font-size:9.5pt;
                    color:black'>、在农联贡菜网服务提供者发生合并、收购或破产清算情形，或其他涉及合并、收购或破产清算情形时，如涉及到个人信息转让，我们会要求新的持有您个人信息的公司、组织继续受本政策的约束，否则我们将要求该公司、组织和个人重新向您征求授权同意。</span></p>

                    <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                    0cm;text-indent:16.95pt;line-height:10.9pt;'><span lang=EN-US
                    style='font-size:9.5pt;color:black'><br>
                    <br>
                    </span></p>

                    <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                    0cm;text-indent:16.95pt;line-height:10.9pt;'><strong><span
                    style='font-size:9.5pt;font-family:宋体;color:black'>（三）公开披露</span></strong></p>

                    <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                    0cm;text-indent:16.95pt;line-height:10.9pt;'><span
                    style='font-size:9.5pt;color:black'>我们仅会在以下情况下，公开披露您的个人信息：</span></p>

                    <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                    0cm;text-indent:16.95pt;line-height:10.9pt;'><span lang=EN-US
                    style='font-size:9.5pt;color:black'>1</span><span style='font-size:9.5pt;
                    color:black'>、获得您明确同意或基于您的主动选择，我们可能会公开披露您的个人信息；</span></p>

                    <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                    0cm;text-indent:16.95pt;line-height:10.9pt;'><span lang=EN-US
                    style='font-size:9.5pt;color:black'>2</span><span style='font-size:9.5pt;
                    color:black'>、<strong><u><span style='font-family:宋体'>如果我们确定您出现违反法律法规或严重违反农联贡菜平台相关协议及规则的情况，或为保护农联贡菜平台用户或公众的人身财产安全免遭侵害，我们可能依据法律法规或征得您同意的情况下披露关于您的个人信息</span></u></strong>，包括相关违规行为以及农联贡菜平台已对您采取的措施。例如，若您因出售假冒商品而严重违反农联贡菜规则，我们可能会公开披露您的店铺认证主体信息与违规情况。</span></p>

                    <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                    0cm;text-indent:16.95pt;line-height:10.9pt;'><span lang=EN-US
                    style='font-size:9.5pt;color:black'><br>
                    <br>
                    </span></p>

                    <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                    0cm;line-height:10.9pt;'><strong><span lang=EN-US
                    style='font-size:9.5pt;font-family:"微软雅黑",sans-serif;color:#333333'>&nbsp;&nbsp;&nbsp;&nbsp;</span></strong><strong><span
                    style='font-size:9.5pt;font-family:宋体;color:black'>（四）共享、转让、公开披露个人信息时事先征得授权同意的例外</span></strong></p>

                    <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                    0cm;text-indent:16.95pt;line-height:10.9pt;'><span
                    style='font-size:9.5pt;color:black'>以下情形中，共享、转让、公开披露您的个人信息无需事先征得您的授权同意：</span></p>

                    <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                    0cm;text-indent:16.95pt;line-height:10.9pt;'><span lang=EN-US
                    style='font-size:9.5pt;color:black'>1</span><span style='font-size:9.5pt;
                    color:black'>、与国家安全、国防安全有关的；</span></p>

                    <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                    0cm;text-indent:16.95pt;line-height:10.9pt;'><span lang=EN-US
                    style='font-size:9.5pt;color:black'>2</span><span style='font-size:9.5pt;
                    color:black'>、与公共安全、公共卫生、重大公共利益有关的；</span></p>

                    <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                    0cm;text-indent:16.95pt;line-height:10.9pt;'><span lang=EN-US
                    style='font-size:9.5pt;color:black'>3</span><span style='font-size:9.5pt;
                    color:black'>、与犯罪侦查、起诉、审判和判决执行等司法或行政执法有关的；</span></p>

                    <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                    0cm;text-indent:16.95pt;line-height:10.9pt;'><span lang=EN-US
                    style='font-size:9.5pt;color:black'>4</span><span style='font-size:9.5pt;
                    color:black'>、出于维护您或其他个人的生命、财产等重大合法权益但又很难得到本人同意的；</span></p>

                    <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                    0cm;text-indent:16.95pt;line-height:10.9pt;'><span lang=EN-US
                    style='font-size:9.5pt;color:black'>5</span><span style='font-size:9.5pt;
                    color:black'>、您自行向社会公众公开的个人信息；</span></p>

                    <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                    0cm;text-indent:16.95pt;line-height:10.9pt;'><span lang=EN-US
                    style='font-size:9.5pt;color:black'>6</span><span style='font-size:9.5pt;
                    color:black'>、从合法公开披露的信息中收集个人信息的，如合法的新闻报道、政府信息公开等渠道。</span></p>

                    <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                    0cm;text-indent:16.95pt;line-height:10.9pt;'><span
                    style='font-size:9.5pt;color:black'>请知悉，根据适用的法律，若我们<strong><u><span
                    style='font-family:宋体'>对个人信息采取技术措施和其他必要措施进行处理，使得数据接收方无法重新识别特定个人且不能复原，则此类处理后数据的共享、转让、公开披露无需另行向您通知并征得您的同意</span></u></strong>。</span></p>

                    <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                    0cm;text-indent:16.95pt;line-height:10.9pt;'><span lang=EN-US
                    style='font-size:9.5pt;font-family:"微软雅黑",sans-serif;color:#333333'>&nbsp;</span></p>

                    <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                    0cm;text-indent:16.95pt;line-height:10.9pt;'><strong><span
                    lang=EN-US style='font-size:9.5pt;font-family:宋体;color:black'>&nbsp;</span></strong><strong><span
                    style='font-size:9.5pt;font-family:宋体;color:black'>四、我们如何保护您的信息</span></strong></p>

                    <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                    0cm;text-indent:16.95pt;line-height:10.9pt;'><span
                    style='font-size:9.5pt;color:black'>（一）我们已采取符合业界标准、合理可行的安全防护措施保护您的信息，防止个人信息遭到未经授权访问、公开披露、使用、修改、损坏或丢失。例如，在您的浏览器与服务器之间交换数据时受</span><span
                    lang=EN-US style='font-size:9.5pt;font-family:"微软雅黑",sans-serif;color:#333333'>&nbsp;</span><span
                    lang=EN-US style='font-size:9.5pt;color:#333333'>SSL</span><span
                    style='font-size:9.5pt;color:black'>协议加密保护；我们同时对农联贡菜网网站提供</span><span
                    lang=EN-US style='font-size:9.5pt;color:#333333'>HTTPS</span><span
                    style='font-size:9.5pt;color:black'>协议安全浏览方式；我们会使用加密技术提高个人信息的安全性；我们会使用受信赖的保护机制防止个人信息遭到恶意攻击；我们会部署访问控制机制，尽力确保只有授权人员才可访问个人信息；以及我们会举办安全和隐私保护培训课程，加强员工对于保护个人信息重要性的认识。</span></p>

                    <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                    0cm;text-indent:16.95pt;line-height:10.9pt;'><span
                    style='font-size:9.5pt;color:black'>（二）我们有行业先进的以数据为核心、围绕数据生命周期进行的数据安全管理体系，从组织建设、制度设计、人员管理、产品技术等方面多维度提升整个系统的安全性。</span></p>

                    <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                    0cm;text-indent:16.95pt;line-height:10.9pt;'><span
                    style='font-size:9.5pt;color:black'>（三）我们会采取合理可行的措施，尽力避免收集无关的个人信息。<strong><u><span
                    style='font-family:宋体'>我们只会在达成本政策所述目的所需的期限内保留您的个人信息，除非法律有强制的存留要求，</span></u></strong><strong><span
                    style='font-family:宋体;font-weight:normal'>例如《中华人民共和国电子商务法》要求商品和服务信息、交易信息保存时间自交易完成之日起不少于三年。而我们判断前述期限的标准包括：</span></strong></span></p>

                    <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                    0cm;text-indent:16.95pt;line-height:10.9pt;'><strong><span
                    lang=EN-US style='font-size:9.5pt;font-family:宋体;color:black;font-weight:normal'>1</span></strong><strong><span
                    style='font-size:9.5pt;font-family:宋体;color:black;font-weight:normal'>、完成与您相关的交易目的、维护相应交易及业务记录、应对您可能的查询或投诉；</span></strong></p>

                    <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                    0cm;text-indent:16.95pt;line-height:10.9pt;'><strong><span
                    lang=EN-US style='font-size:9.5pt;font-family:宋体;color:black;font-weight:normal'>2</span></strong><strong><span
                    style='font-size:9.5pt;font-family:宋体;color:black;font-weight:normal'>、保证我们为您提供服务的安全和质量；</span></strong></p>

                    <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                    0cm;text-indent:16.95pt;line-height:10.9pt;'><strong><span
                    lang=EN-US style='font-size:9.5pt;font-family:宋体;color:black;font-weight:normal'>3</span></strong><strong><span
                    style='font-size:9.5pt;font-family:宋体;color:black;font-weight:normal'>、您是否同意更长的留存期间；</span></strong></p>

                    <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                    0cm;text-indent:16.95pt;line-height:10.9pt;'><strong><span
                    lang=EN-US style='font-size:9.5pt;font-family:宋体;color:black;font-weight:normal'>4</span></strong><strong><span
                    style='font-size:9.5pt;font-family:宋体;color:black;font-weight:normal'>、是否存在保留期限的其他特别约定。</span></strong></p>

                    <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                    0cm;text-indent:16.95pt;line-height:10.9pt;'><strong><u><span
                    style='font-size:9.5pt;font-family:宋体;color:black'>在您的个人信息超出保留期间后，我们会根据适用法律的要求删除您的个人信息，或使其匿名化处理。</span></u></strong></p>

                    <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                    0cm;text-indent:16.95pt;line-height:10.9pt;'><span
                    style='font-size:9.5pt;color:black'>（四）互联网并非绝对安全的环境，使用农联贡菜平台服务时，<strong><u><span
                    style='font-family:宋体'>我们强烈建议您不要使用非农联贡菜平台推荐的通信方式发送您的信息。</span></u></strong>您可以通过我们的服务建立联系和相互分享。当您通过我们的服务创建交流、交易或分享时，您可以自主选择沟通、交易或分享的对象，作为能够看到您的交易内容、联络方式、交流信息或分享内容等相关信息的第三方。</span></p>

                    <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                    0cm;text-indent:16.95pt;line-height:10.9pt;'><span
                    style='font-size:9.5pt;color:black'>在使用农联贡菜网服务进行网上交易时，您不可避免地要向交易对方或潜在的交易对方披露自己的个人信息，如<strong><span
                    style='font-family:宋体'>联络方式</span></strong>或<strong><span style='font-family:
                    宋体'>联系地址</span></strong>。请您妥善保护自己的个人信息，仅在必要的情形下向他人提供。如您发现自己的个人信息尤其是您的账户或密码发生泄露，请您立即联络农联贡菜网客服，以便我们根据您的申请采取相应措施。</span></p>

                    <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                    0cm;text-indent:16.95pt;line-height:10.9pt;'><span
                    style='font-size:9.5pt;color:black'>请注意，您在使用我们服务时自愿共享甚至公开分享的信息，可能会涉及您或他人的个人信息甚至个人敏感信息。请您更加谨慎地考虑，是否在使用我们的服务时共享甚至公开分享相关信息。</span></p>

                    <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                    0cm;text-indent:16.95pt;line-height:10.9pt;'><span
                    style='font-size:9.5pt;color:black'>请使用复杂密码，协助我们保证您的账号安全。我们将尽力保障您发送给我们的任何信息的安全性。如果我们的物理、技术或管理防护设施遭到破坏，导致信息被非授权访问、公开披露、篡改或毁坏，导致您的合法权益受损，我们将承担相应的法律责任。</span></p>

                    <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                    0cm;text-indent:16.95pt;line-height:10.9pt;'><span
                    style='font-size:9.5pt;color:black'>（五）我们将不定期更新并公开安全风险、个人信息安全影响评估报告等有关内容，您可通过农联贡菜网公告方式获得。</span></p>

                    <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                    0cm;text-indent:16.95pt;line-height:10.9pt;'><span
                    style='font-size:9.5pt;color:black'>（六）在不幸发生个人信息安全事件后，我们将按照法律法规的要求向您告知：安全事件的基本情况和可能的影响、我们已采取或将要采取的处置措施、您可自主防范和降低风险的建议、对您的补救措施等。事件相关情况我们将以邮件、信函、电话、推送通知等方式告知您，难以逐一告知个人信息主体时，我们会采取合理、有效的方式发布公告。</span></p>

                    <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                    0cm;text-indent:16.95pt;line-height:10.9pt;'><span
                    style='font-size:9.5pt;color:black'>同时，我们还将按照监管部门要求，上报个人信息安全事件的处置情况。</span></p>

                    <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                    0cm;line-height:10.9pt;'><span lang=EN-US style='font-size:
                    9.5pt;font-family:"微软雅黑",sans-serif;color:#333333'>&nbsp;</span></p>

                    <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                    0cm;text-indent:16.95pt;line-height:10.9pt;'><strong><span
                    style='font-size:9.5pt;font-family:宋体;color:black'>五、您如何管理您的信息</span></strong></p>

                    <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                    0cm;text-indent:16.95pt;line-height:10.9pt;'><b><span
                    lang=EN-US style='font-size:9.5pt;color:black'><br>
                    <br>
                    </span></b></p>

                    <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                    0cm;text-indent:16.95pt;line-height:10.9pt;'><span
                    style='font-size:9.5pt;color:black'>您可以通过以下方式访问及管理您的信息：</span></p>

                    <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                    0cm;text-indent:16.95pt;line-height:10.9pt;'><span lang=EN-US
                    style='font-size:9.5pt;color:black'><br>
                    <br>
                    </span></p>

                    <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                    0cm;text-indent:16.95pt;line-height:10.9pt;'><strong><span
                    style='font-size:9.5pt;font-family:宋体;color:black'>（一）查询、更正和补充您的信息</span></strong></p>

                    <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                    0cm;text-indent:16.95pt;line-height:10.9pt;'><span
                    style='font-size:9.5pt;color:black'>您有权查询、更正或补充您的信息。您可以通过以下方式自行进行：</span></p>

                    <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                    0cm;text-indent:19.35pt;line-height:10.9pt;'><span lang=EN-US
                    style='font-size:9.5pt;color:black'>1</span><span style='font-size:9.5pt;
                    color:black'>、登录农联贡菜网，进入“我的农联贡菜”首页，点击个人账户设置后查询、更正个人资料及个人账户相关信息；</span></p>

                    <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                    0cm;text-indent:19.35pt;line-height:10.9pt;'><span lang=EN-US
                    style='font-size:9.5pt;color:black'>2</span><span style='font-size:9.5pt;
                    color:black'>、登录手机农联贡菜客户端，进入“我的农联贡菜<span lang=EN-US>-</span>设置”对个人资料、账户与安全及我的收货地址等信息进行查询、更正或补充；</span></p>

                    <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                    0cm;text-indent:19.35pt;line-height:10.9pt;'><span lang=EN-US
                    style='font-size:9.5pt;color:black'>3</span><span style='font-size:9.5pt;
                    color:black'>、登录农联贡菜网并选择联系客服，或登录手机农联贡菜客户端并选择在线客服寻求帮助，协助您查询、更正或补充您的信息。</span></p>

                    <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                    0cm;text-indent:19.35pt;line-height:10.9pt;'><span lang=EN-US
                    style='font-size:9.5pt;color:black'><br>
                    <br>
                    </span></p>

                    <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                    0cm;text-indent:16.95pt;line-height:10.9pt;'><strong><span
                    style='font-size:9.5pt;font-family:宋体;color:black'>（二）删除您的信息</span></strong></p>

                    <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                    0cm;text-indent:16.95pt;line-height:10.9pt;'><span
                    style='font-size:9.5pt;color:black'>您可以通过“（一）查询、更正和补充您的信息”中列明的方式删除您的部分信息。</span></p>

                    <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                    0cm;text-indent:16.95pt;line-height:10.9pt;'><span
                    style='font-size:9.5pt;color:black'>在以下情形中，您可以向我们提出删除个人信息的请求：</span></p>

                    <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                    0cm;text-indent:16.95pt;line-height:10.9pt;'><span lang=EN-US
                    style='font-size:9.5pt;color:black'>1</span><span style='font-size:9.5pt;
                    color:black'>、如果我们处理个人信息的行为违反法律法规；</span></p>

                    <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                    0cm;text-indent:16.95pt;line-height:10.9pt;'><span lang=EN-US
                    style='font-size:9.5pt;color:black'>2</span><span style='font-size:9.5pt;
                    color:black'>、如果我们收集、使用您的个人信息，却未征得您的明确同意；</span></p>

                    <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                    0cm;text-indent:16.95pt;line-height:10.9pt;'><span lang=EN-US
                    style='font-size:9.5pt;color:black'>3</span><span style='font-size:9.5pt;
                    color:black'>、如果我们处理个人信息的行为严重违反了与您的约定；</span></p>

                    <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                    0cm;text-indent:16.95pt;line-height:10.9pt;'><span lang=EN-US
                    style='font-size:9.5pt;color:black'>4</span><span style='font-size:9.5pt;
                    color:black'>、如果您不再使用我们的产品或服务，或您主动注销了账号；</span></p>

                    <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                    0cm;text-indent:16.95pt;line-height:10.9pt;'><span lang=EN-US
                    style='font-size:9.5pt;color:black'>5</span><span style='font-size:9.5pt;
                    color:black'>、如果我们永久不再为您提供产品或服务。</span></p>

                    <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                    0cm;text-indent:16.95pt;line-height:10.9pt;'><span
                    style='font-size:9.5pt;color:black'>若我们决定响应您的删除请求，我们还将同时尽可能通知从我们处获得您的个人信息的主体，并要求其及时删除（除非法律法规另有规定，或这些主体已独立获得您的授权）。</span></p>

                    <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                    0cm;text-indent:16.95pt;line-height:10.9pt;'><strong><u><span
                    style='font-size:9.5pt;font-family:宋体;color:black'>当您或我们协助您删除相关信息后，因为适用的法律和安全技术，我们可能无法立即从备份系统中删除相应的信息，我们将安全地存储您的个人信息并将其与任何进一步处理隔离，直到备份可以清除或实现匿名。</span></u></strong></p>

                    <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                    0cm;text-indent:16.95pt;line-height:10.9pt;'><b><u><span
                    lang=EN-US style='font-size:9.5pt;color:black'><br>
                    <br>
                    </span></u></b></p>

                    <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                    0cm;text-indent:16.95pt;line-height:10.9pt;'><strong><span
                    style='font-size:9.5pt;font-family:宋体;color:black'>（三）改变您授权同意的范围</span></strong></p>

                    <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                    0cm;text-indent:16.95pt;line-height:10.9pt;'><span
                    style='font-size:9.5pt;color:black'>每个业务功能需要一些基本的个人信息才能得以完成（见本隐私权政策“第一部分”）。除此之外，您可以与农联贡菜网客服联系或改变您的智能移动设备的设置等方式给予或收回您的授权同意。</span></p>

                    <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                    0cm;text-indent:16.95pt;line-height:10.9pt;'><span
                    style='font-size:9.5pt;color:black'>当您收回同意后，我们将不再处理相应的个人信息。<strong><u><span
                    style='font-family:宋体'>但您收回同意的决定，不会影响此前基于您的授权而开展的个人信息处理。</span></u></strong></span></p>

                    <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                    0cm;text-indent:16.95pt;line-height:10.9pt;'><b><u><span
                    lang=EN-US style='font-size:9.5pt;color:black'><br>
                    <br>
                    </span></u></b></p>

                    <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                    0cm;text-indent:16.95pt;line-height:10.9pt;'><strong><span
                    style='font-size:9.5pt;font-family:宋体;color:black'>（四）注销您的账户</span></strong></p>

                    <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                    0cm;text-indent:16.95pt;line-height:10.9pt;'><span
                    style='font-size:9.5pt;color:black'>您可以通过以下方式申请注销您的账户：</span></p>

                    <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                    0cm;text-indent:16.95pt;line-height:10.9pt;'><span lang=EN-US
                    style='font-size:9.5pt;color:black'>1</span><span style='font-size:9.5pt;
                    color:black'>、登录农联贡菜网并选择联系客服，或登录手机农联贡菜客户端并联系在线客服寻求帮助，协助您申请注销您的账户。</span></p>

                    <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                    0cm;text-indent:16.95pt;line-height:10.9pt;'><span
                    style='font-size:9.5pt;color:black'>在您主动注销账户之后，我们将停止为您提供产品或服务，根据适用法律的要求删除您的个人信息，或使其匿名化处理。</span></p>

                    <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                    0cm;text-indent:16.95pt;line-height:10.9pt;'><span lang=EN-US
                    style='font-size:9.5pt;color:black'><br>
                    <br>
                    </span></p>

                    <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                    0cm;text-indent:16.95pt;line-height:10.9pt;'><strong><span
                    style='font-size:9.5pt;font-family:宋体;color:black'>（五）约束信息系统自动决策</span></strong></p>

                    <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                    0cm;text-indent:16.95pt;line-height:10.9pt;'><span
                    style='font-size:9.5pt;color:black'>在某些业务功能中，我们可能仅依据信息系统、算法等在内的非人工自动决策机制做出决定。如果这些决定显著影响您的合法权益，您有权要求我们做出解释，我们也将在不侵害农联贡菜网商业秘密或其他用户权益、社会公共利益的前提下提供申诉方法。</span></p>

                    <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                    0cm;text-indent:16.95pt;line-height:10.9pt;'><span lang=EN-US
                    style='font-size:9.5pt;color:black'><br>
                    <br>
                    </span></p>

                    <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                    0cm;text-indent:16.95pt;line-height:10.9pt;'><strong><span
                    style='font-size:9.5pt;font-family:宋体;color:black'>（六）响应您的上述请求</span></strong></p>

                    <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                    0cm;text-indent:16.95pt;line-height:10.9pt;'><span
                    style='font-size:9.5pt;color:black'>为保障安全，您可能需要提供书面请求，或以其他方式证明您的身份。我们可能会先要求您验证自己的身份，然后再处理您的请求。</span></p>

                    <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                    0cm;text-indent:16.95pt;line-height:10.9pt;'><span
                    style='font-size:9.5pt;color:black'>我们将在</span><span lang=EN-US
                    style='font-size:9.5pt;color:#333333'>15</span><span style='font-size:9.5pt;
                    color:black'>天内做出答复。如您不满意，还可以通过农联贡菜网客服发起投诉。</span></p>

                    <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                    0cm;text-indent:16.95pt;line-height:10.9pt;'><span
                    style='font-size:9.5pt;color:black'>对于您合理的请求，我们原则上不收取费用，但对多次重复、超出合理限度的请求，我们将酌情收取一定费用。对于与您的身份不直接关联的信息、无端重复信息，或者需要过多技术手段（例如，需要开发新系统或从根本上改变现行惯例）、给他人合法权益带来风险或者不切实际的请求，我们可能会予以拒绝。</span></p>

                    <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                    0cm;text-indent:16.95pt;line-height:10.9pt;'><span
                    style='font-size:9.5pt;color:black'>在以下情形中，按照法律法规要求，我们将无法响应您的请求：</span></p>

                    <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                    0cm;text-indent:16.95pt;line-height:10.9pt;'><span lang=EN-US
                    style='font-size:9.5pt;color:black'>1</span><span style='font-size:9.5pt;
                    color:black'>、与国家安全、国防安全有关的；</span></p>

                    <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                    0cm;text-indent:16.95pt;line-height:10.9pt;'><span lang=EN-US
                    style='font-size:9.5pt;color:black'>2</span><span style='font-size:9.5pt;
                    color:black'>、与公共安全、公共卫生、重大公共利益有关的；</span></p>

                    <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                    0cm;text-indent:16.95pt;line-height:10.9pt;'><span lang=EN-US
                    style='font-size:9.5pt;color:black'>3</span><span style='font-size:9.5pt;
                    color:black'>、与犯罪侦查、起诉、审判和执行判决等有关的；</span></p>

                    <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                    0cm;text-indent:16.95pt;line-height:10.9pt;'><span lang=EN-US
                    style='font-size:9.5pt;color:black'>4</span><span style='font-size:9.5pt;
                    color:black'>、有充分证据表明个人信息主体存在主观恶意或滥用权利的；</span></p>

                    <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                    0cm;text-indent:16.95pt;line-height:10.9pt;'><span lang=EN-US
                    style='font-size:9.5pt;color:black'>5</span><span style='font-size:9.5pt;
                    color:black'>、响应您的请求将导致您或其他个人、组织的合法权益受到严重损害的；</span></p>

                    <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                    0cm;text-indent:16.95pt;line-height:10.9pt;'><span lang=EN-US
                    style='font-size:9.5pt;color:black'>6</span><span style='font-size:9.5pt;
                    color:black'>、涉及商业秘密的。</span></p>

                    <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                    0cm;line-height:10.9pt;'><span lang=EN-US style='font-size:
                    9.5pt;font-family:"微软雅黑",sans-serif;color:#333333'>&nbsp;</span></p>

                    <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                    0cm;text-indent:16.95pt;line-height:10.9pt;'><strong><span
                    style='font-size:9.5pt;font-family:宋体;color:black'>六、我们如何处理未成年人的信息</span></strong></p>

                    <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                    0cm;text-indent:16.95pt;line-height:10.9pt;'><strong><u><span
                    style='font-size:9.5pt;font-family:宋体;color:black'>在电子商务活动中我们推定您具有相应的民事行为能力。如您为未成年人，我们要求您请您的父母或监护人仔细阅读本隐私权政策，并在征得您的父母或监护人同意的前提下使用我们的服务或向我们提供信息。</span></u></strong></p>

                    <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                    0cm;text-indent:16.95pt;line-height:10.9pt;'><span
                    style='font-size:9.5pt;color:black'>对于经父母或监护人同意使用我们的产品或服务而收集未成年人个人信息的情况，我们只会在法律法规允许、父母或监护人明确同意或者保护未成年人所必要的情况下使用、共享、转让或披露此信息。</span></p>

                    <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                    0cm;line-height:10.9pt;'><span lang=EN-US style='font-size:
                    7.5pt;font-family:"Tahoma",sans-serif;color:#333333'>&nbsp;</span></p>

                    <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                    0cm;text-indent:16.95pt;line-height:10.9pt;'><strong><span
                    style='font-size:9.5pt;font-family:宋体;color:black'>七、本隐私权政策如何更新</span></strong></p>

                    <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                    0cm;text-indent:16.95pt;line-height:10.9pt;'><span
                    style='font-size:9.5pt;color:black'>我们的隐私权政策可能变更。</span></p>

                    <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                    0cm;text-indent:16.95pt;line-height:10.9pt;'><span
                    style='font-size:9.5pt;color:black'>未经您明确同意，我们不会限制您按照本隐私权政策所应享有的权利。我们会在</span><span
                    lang=EN-US><a
                    href="javascript:;"><b><i><span
                    lang=EN-US style='font-size:9.5pt;color:windowtext;text-decoration:none'><span
                    lang=EN-US>专门页面</span></span></i></b></a></span><span style='font-size:9.5pt;
                    color:black'>上发布对隐私权政策所做的任何变更。</span></p>

                    <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                    0cm;text-indent:16.95pt;line-height:10.9pt;'><span
                    style='font-size:9.5pt;color:black'>对于重大变更，我们还会提供更为显著的通知（包括我们会通过农联贡菜网公示的方式进行通知甚至向您提供弹窗提示）。</span></p>

                    <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                    0cm;text-indent:16.95pt;line-height:10.9pt;'><span
                    style='font-size:9.5pt;color:black'>本政策所指的重大变更包括但不限于：</span></p>

                    <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                    0cm;text-indent:16.95pt;line-height:10.9pt;'><span lang=EN-US
                    style='font-size:9.5pt;color:black'>1</span><span style='font-size:9.5pt;
                    color:black'>、我们的服务模式发生重大变化。如处理个人信息的目的、处理的个人信息类型、个人信息的使用方式等；</span></p>

                    <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                    0cm;text-indent:16.95pt;line-height:10.9pt;'><span lang=EN-US
                    style='font-size:9.5pt;color:black'>2</span><span style='font-size:9.5pt;
                    color:black'>、我们在控制权等方面发生重大变化。如并购重组等引起的信息控制者变更等；</span></p>

                    <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                    0cm;text-indent:16.95pt;line-height:10.9pt;'><span lang=EN-US
                    style='font-size:9.5pt;color:black'>3</span><span style='font-size:9.5pt;
                    color:black'>、个人信息共享、转让或公开披露的主要对象发生变化；</span></p>

                    <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                    0cm;text-indent:16.95pt;line-height:10.9pt;'><span lang=EN-US
                    style='font-size:9.5pt;color:black'>4</span><span style='font-size:9.5pt;
                    color:black'>、您参与个人信息处理方面的权利及其行使方式发生重大变化；</span></p>

                    <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                    0cm;text-indent:16.95pt;line-height:10.9pt;'><span lang=EN-US
                    style='font-size:9.5pt;color:black'>5</span><span style='font-size:9.5pt;
                    color:black'>、我们负责处理个人信息安全的责任部门、联络方式及投诉渠道发生变化；</span></p>

                    <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                    0cm;text-indent:16.95pt;line-height:10.9pt;'><span lang=EN-US
                    style='font-size:9.5pt;color:black'>6</span><span style='font-size:9.5pt;
                    color:black'>、个人信息安全影响评估报告表明存在高风险。</span></p>

                    <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                    0cm;text-indent:16.95pt;line-height:10.9pt;'><span
                    style='font-size:9.5pt;color:black'>我们还会将本隐私权政策的旧版本在</span><span lang=EN-US><a
                    href="javascript:;"><b><i><span
                    lang=EN-US style='font-size:9.5pt;color:black;text-decoration:none'><span
                    lang=EN-US>农联贡菜网专门页面</span></span></i></b></a></span><span style='font-size:
                    9.5pt;color:black'>存档，供您查阅。</span></p>

                    <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                    0cm;text-indent:16.95pt;line-height:10.9pt;'><span lang=EN-US
                    style='font-size:9.5pt;font-family:"微软雅黑",sans-serif;color:#333333'>&nbsp;</span></p>

                    <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                    0cm;text-indent:16.95pt;line-height:10.9pt;'><strong><span
                    style='font-size:9.5pt;font-family:宋体;color:black'>八、如何联系我们</span></strong></p>

                    <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                    0cm;text-indent:16.95pt;line-height:10.9pt;'><span
                    style='font-size:9.5pt;color:black'>您可以通过以下方式与我们联系，我们将在<span lang=EN-US>15</span>天内回复您的请求：</span></p>

                    <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                    0cm;text-indent:16.95pt;line-height:10.9pt;'><span lang=EN-US
                    style='font-size:9.5pt;color:black'>1</span><span style='font-size:9.5pt;
                    color:black'>、如对本政策内容有任何疑问、意见或建议，您可通过农联贡菜网客服及</span><span lang=EN-US><a
                    href="javascript:;"><b><i><span lang=EN-US
                    style='font-size:9.5pt;color:black;text-decoration:none'><span lang=EN-US>农联贡菜网</span></span></i></b></a></span><span
                    style='font-size:9.5pt;color:black'>在线客服与我们联系；</span></p>

                    <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                    0cm;text-indent:16.95pt;line-height:10.9pt;'><span lang=EN-US
                    style='font-size:9.5pt;color:black'>2</span><span style='font-size:9.5pt;
                    color:black'>、如发现个人信息可能被泄露，您可以通过</span><span lang=EN-US><a
                    href="javascript:;"><b><i><span
                    style='font-size:9.5pt;color:black;text-decoration:none'>400-128-8566</span></i></b></a></span><span
                    style='font-size:9.5pt;color:black'>投诉举报；</span></p>

                    <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                    0cm;text-indent:16.95pt;line-height:10.9pt;'><span lang=EN-US
                    style='font-size:9.5pt;color:black'>3</span><span style='font-size:9.5pt;
                    color:black'>、我们还设立了个人信息保护专职部门，您可以通过与其联系。</span></p>

                    <p style='margin-top:3.05pt;margin-right:0cm;margin-bottom:3.05pt;margin-left:
                    0cm;text-indent:16.95pt;line-height:10.9pt;'><span
                    style='font-size:9.5pt;color:black'>如果您对我们的回复不满意，特别是您认为我们的个人信息处理行为损害了您的合法权益，<strong><u><span
                    style='font-family:宋体'>您还可以通过向被告住所地有管辖权的法院提起诉讼来寻求解决方案。</span></u></strong></span></p>

                    <p class=MsoNormal><span lang=EN-US>&nbsp;</span></p>

                    </div>
                `;
            }
            if (this.type == 4){
                this.title='用户协议'
                this.status=4
                this.content=`
                    <div class=WordSection1 style='font-size:14px;'>

                        <p><span ><span style='
                        
                        '>农联贡菜</span></span><span
                        style='
                        
                        '>用户协议</span></p>

                        <p><span ><o:p>&nbsp;</o:p></span></p>

                        <p><span style='
                        
                        '>提示条款</span></p>

                        <p><span ><span style='
                        
                        '>农联高科</span></span><span
                        style='
                        
                        '>科技发展有限公司依照《农联贡菜用户协议》（下称“本协议”）向用户提供本网站及移动产品，包括相关的应用程序，用户可以在该产品</span><span
                        >/</span><span style='
                        
                        '>程序中下<span
                        >单购买</span>商品。用户注册或登录前，应仔细阅读《农联贡菜用户协议》，用户应在充分阅读、理解及认可本协议的所有规定后，根据农联贡<span
                        >菜注册</span>页面提示拨打客<span >服电话</span>进行注册，客服协助客户完成注册或者客户进行登录，视为用户与农联贡菜已达成本协议。</span></p>

                        <p><span style='
                        
                        '>用户决定注册或点击登录前，请务必认真阅读、充分理解各条款内容，特别是免除或者限制责任的条款、法律适用和管辖争议解决条款，免除或者限制责任的条款可能以黑体加粗或加下划线的形式提示用户重点注意。阅读本协议的过程中，如果用户不同意本协议或其中任何条款，用户应立即停止注册或登录程序。如果用户对本协议有任何疑问</span><span
                        >,</span><span style='
                        
                        '>可通过注册页面公布的联系方式咨询。如用户勾选“同意《农联贡菜用户协议》”并通过登录或者其他任何方式使用、接受农联贡菜的任何服务，即视为用户已阅读并同意本协议，自愿接受本协议所有内容的约束。请用户在决定注册或使用服务前再次确认已知悉并完全理解本协议的所有内容。</span></p>

                        <p><span style='
                        
                        '>农联贡菜有权对本协议条款进行修改，修改后的协议自公布之日起生效，在生效后即代替原来的协议。用户可随时查阅最新协议。为给用户提供更好的服务，农联贡菜的业务将不时变化，本协议也将随之调整。农联贡菜会通过在农联贡菜客户端上发出更新版本或以其他方式提醒用户相关内容的更新，用户应当及时查阅并了解本协议的最新内容。在上述情况下，若用户继续使用农联贡菜的服务，即表示同意接受修改后的本协议并受之约束。</span></p>

                        <p><span style='
                        
                        '>本协议内容同时包括：</span></p>

                        <p><span style='
                        
                        '>（</span><span
                        >1</span><span style='
                        
                        '>）</span><span
                        >&nbsp; </span><span style='
                        
                        '>本《农联贡菜用户协议》文本（下载地址：《农联贡菜用户协议》）；</span></p>

                        <p><span style='
                        
                        '>（</span><span
                        >2</span><span style='
                        
                        '>）《隐私政策》（链接地址：《隐私政策》</span>
                        <span style='
                        
                        '>）：农联贡<span >菜非常</span>重视用户提供的个人信息和隐私的保护，将按照《隐私政策》中所公布的政策在具体服务中进行隐私及个人信息的收集、存储、使用、披露等活动。用户在注册登录账号前，应仔细阅读《隐私政策》。</span></p>

                        <p><span style='
                        
                        '>（</span><span
                        >3</span><span style='
                        
                        '>）由于互联网高速发展，为防止用户与农联贡<span
                        >菜签署</span>的本协议列明的条款，无法及时完整罗列并覆盖用户与农联贡<span >菜所有</span>权利与义务，农联贡菜售后规则、发票规则、<span
                        >配送费</span>规则、退换货规则、订单取消规则等服务规则均为本协议的补充协议，构成本协议不可分割的一部分，且具有同等法律效力。农联贡菜可按照前述关于本协议条款修改方式的约定对服务规则进行修改或调整。如服务规则与本协议有不一致之处，适用该服务规则。如用户与农联贡菜已达成《农联贡菜用户协议》，使用农联贡菜服务，视为用户同意上述服务规则。</span></p>

                        <p><span style='
                        
                        '>（</span><span
                        >4</span><span style='
                        
                        '>）第三<span
                        >方服务</span>相关的用户授权协议。为方便您在使用农联贡<span >菜服务</span>的同时，根据您自身需要，通过农联贡菜进行跳转等方式，自愿选择接受<span
                        >独立第三方服务</span>商及部分关联第三<span >方服务</span>商所提供的服务，您将在使用该第三<span
                        >方服务</span>前对相应的用户授权协议予以同意确认，以作为您和农联贡菜之间就该第三<span >方服务</span>的使用所涉及的相关事项的权利义务依据。</span></p>

                        <p><span style='
                        
                        '>一、定义条款</span></p>

                        <p><span >1.1 </span><span style='
                        
                        '>“农联贡菜”：<span
                        >指农联高科</span>科技发展有限公司运营和管理的、提供服务的域名为</span><span >www.b2b.nlyz365.com</span><span
                        style='
                        
                        '>的网站、客户端及未来技术发展出现的新的服务形态。</span></p>

                        <p><span >1.2</span><span style='
                        
                        '>“用户”：接受并同意本协议全部条款及其他全部服务规则、通过农联贡菜进行交易的农联贡<span
                        >菜注册</span>会员商户（根据农联贡菜流程直接登录视为已注册）。</span></p>

                        <p><span >1.3</span><span style='
                        
                        '>“农联贡菜服务”：<span
                        >指农联高科</span>科技发展有限公司向用户提供的商品发布、网页浏览、信息交流、商品交易以及线上空间、技术支持、相关软件、系统维护等相关服务。</span></p>

                        <p><span >1.4</span><span style='
                        
                        '>“服务规则”：指在农联贡菜上已经发布或将来可能发布的各种规范性文件，包括但不限于协议、协议附件、细则、服务规则等各类规则、使用说明等及主页、商品页面或其它页面发布的常见问题说明、商品说明、退换货说明、通知、公告、其它文字说明、服务条款等。</span></p>

                        <p><span >1.5</span><span style='
                        
                        '>“账户”：指用户作为唯一授权使用方，可以登录农联贡菜的一个服务账户（该账户形式可能是在农联贡<span
                        >菜注册</span>所获得的农联贡菜账户、用户填写的手机号、电子邮箱等农联贡<span >菜支持</span>的其他形式账户，具体形式以农联贡<span
                        >菜实施</span>为准）。</span></p>

                        <p><span >1.6</span><span style='
                        
                        '>“互联网支付服务”：指具有互联网支付合法资质的第三方支付机构为用户完成交易、转移资金提供的支付服务，详情见该第三方支付机构通过用户与其所签订的约定其所提供支付服务的协议、公司网站、电子邮件或其他形式所公布的相关规则及说明。农联贡<span
                        >菜对于</span>用户与第三方支付机构之间所产生的权利义务和争议不承担相应责任。</span></p>

                        <p><span >1.7</span><span style='
                        
                        '>“关联公司”：<span
                        >指农联高科</span>科技发展有限公司直接或间接参股、控股，或与农联高<span >科科技</span>发展有限公司受同一股东直接或间接参股、控股，或与农联高<span
                        >科科技</span>发展有限公司经营同一主打品牌、共同进行经营管理的公司。</span></p>

                        <p><span >1.8</span><span style='
                        
                        '>“销售者”：指通过农联贡<span
                        >菜实际</span>向用户销售商品或服务的主体，包括农联贡菜运营者及其分公司、子公司、关联公司，也包括未来可能引进的其它合作销售商。销售者与用户通过农联贡菜进行的商品买卖、配送、退换货等均受本协议约束。</span></p>

                        <p><span style='
                        
                        '>二、用户注册</span><span
                        >/</span><span style='
                        
                        '>登录</span></p>

                        <p><span >2.1.</span><span style='
                        
                        '>注册</span><span
                        >/</span><span style='
                        
                        '>登录资格</span></p>

                        <p><span style='
                        
                        '>用户承诺：用户是拥有符合现行有效法律法规的相关民事能力、资质能力的、有权与农联贡<span
                        >菜达成</span>本协议的合法民事主体，可以进行注册</span><span >/</span><span
                        style='
                        
                        '>登录及使用农联贡菜进行交易。</span></p>

                        <p><span ><span style='
                        
                        '>您承诺</span></span><span
                        style='
                        
                        '>并确认，您作为农联贡菜的服务对象，是以生产、经营为目的，而非以最终消费为目的的商户。</span></p>

                        <p><span >2.2.</span><span style='
                        
                        '>注册</span><span
                        >/</span><span style='
                        
                        '>登录目的</span></p>

                        <p><span style='
                        
                        '>用户承诺：用户进行用户注册</span><span
                        >/</span><span style='
                        
                        '>登录并非出于违反法律法规或破坏农联贡<span
                        >菜网络</span>交易秩序的目的。</span></p>

                        <p><span >2.3.</span><span style='
                        
                        '>注册</span><span
                        >/</span><span style='
                        
                        '>登录流程</span></p>

                        <p><span >2.3.1</span><span style='
                        
                        '>用户充分理解《农联贡菜用户协议》后，通过注册页面提示拨打客<span
                        >服电话</span>进行注册，注册完成后用户获得初始密码和账号。用户通过“初始密码</span><span >+</span><span
                        style='
                        
                        '>账号”或“手机号</span><span >+</span><span style='
                        
                        '>农联贡菜发送的验证码”进行登录，用户登录后应务必对原始登录密码进行修改。</span></p>

                        <p><span >2.3.2</span><span style='
                        
                        '>用户应确保所提供全部信息（包括名称</span><span
                        >/</span><span style='
                        
                        '>姓名、地址、联系人、联系电话、邮箱等）的真实性、完整性和准确性。用户的注册资料若有变动，应及时联系<span
                        >农联贡菜客服人</span>员进行变更。如因用户提供的信息不合法、不真实、不准确、不详尽或未及时更新的，用户需承担因此引起的相应的责任及后果。</span></p>

                        <p><span >2.3.3 </span><span style='
                        
                        '>为了用户更好的使用各项服务，尤其是第三方支付服务，保障用户账户安全，农联贡菜可能要求用户完成实名认证。</span></p>

                        <p><span >2.3.4 </span><span style='
                        
                        '>农联贡菜将对用户所提交的注册信息予以保护，不会将其披露给任何非关联的第三方，除非：</span></p>

                        <p><span style='
                        
                        '>（</span><span
                        >1</span><span style='
                        
                        '>）相关法律法规或国家机关要求；</span></p>

                        <p><span style='
                        
                        '>（</span><span
                        >2</span><span style='
                        
                        '>）农联贡菜发生相关合并、分立、收购或资产转移；</span></p>

                        <p><span style='
                        
                        '>（</span><span
                        >3</span><span style='
                        
                        '>）为提供相关服务所必须的。</span></p>

                        <p><span style='
                        
                        '>对于用户所提交的注册信息中涉及个人信息的内容，农联贡菜将严格按照《隐私政策》的规定进行收集、处理和使用。</span></p>

                        <p><span >2.3.5 </span><span style='
                        
                        '>除因历史原因、业务整合等农联贡菜所认可的特殊情况外，农联贡菜原则上只允许用户使用一个农联贡<span
                        >菜用户</span>账号。如有证据证明或农联贡菜有理由相信用户存在不当注册或不当使用多个农联贡菜账号的情形，农联贡菜可将相关账号信息进行合并或采取其他合理措施，如因用户不当注册或不当使用给农联贡菜及相关方造成损失的，用户还应承担相应的赔偿责任。此外，出于相关业务需要，农联贡菜也可对同一用户的多个账号或相关信息进行合并，如合并将对用户的权益产生实质影响，农联贡菜将在进行上述合并前事先征得用户的同意。</span></p>

                        <p><span style='
                        
                        '>三、用户服务</span></p>

                        <p><span style='
                        
                        '>农联贡菜为用户进行网络交易活动提供农联贡菜服务。</span></p>

                        <p><span >3.1</span><span style='
                        
                        '>服务内容</span></p>

                        <p><span >3.1.1</span><span style='
                        
                        '>用户有权在农联贡菜浏览商品信息、有权通过农联贡菜下达购买商品的订单、支付价款等。</span></p>

                        <p><span >3.1.2</span><span style='
                        
                        '>用户有权在农联贡菜查看其账户下的信息，有权使用农联贡菜提供的功能进行相关操作。</span></p>

                        <p><span >3.1.3</span><span style='
                        
                        '>用户有权按照农联贡<span
                        >菜发布</span>的活动规则参与农联贡菜组织的线上线下活动。</span></p>

                        <p><span >3.1.4</span><span style='
                        
                        '>农联贡<span
                        >菜承诺</span>为用户提供的其他服务。</span></p>

                        <p><span >3.2</span><span style='
                        
                        '>服务规则</span></p>

                        <p><span style='
                        
                        '>用户承诺遵守包括但不限于下列农联贡<span
                        >菜服务</span>规则：</span></p>

                        <p><span >3.2.1</span><span style='
                        
                        '>用户应当遵守法律法规、规章、规范性文件及政策要求的规定，不得在农联贡菜或利用农联贡<span
                        >菜服务</span>从事非法的或其他损害农联贡菜及第三方权益的活动：如发送或接收任何违法、违规、违反公序良俗、侵犯他人权益的信息，发送或接收传销材料或存在其他危害的信息或言论，未经农联贡菜授权使用或伪造农联贡菜电子邮件题头信息等。</span></p>

                        <p><span >3.2.2&nbsp; </span><span style='
                        
                        '>用户承诺在农联贡菜上购买商品过程中遵守法律法规、不违背社会公德及遵守诚实信用原则，不扰乱农联贡菜的正常经营秩序，用户亦不得实施以下行为：</span><span
                        style=''>&#8232;</span><span
                        style='
                        
                        '>（</span><span >1</span><span style='
                        
                        '>）不应利用农联贡菜或相关服务危害国家安全、破坏政治稳定、泄露国家秘密，不侵犯国家、社会、集体利益和第三方的合法权益，不从事违法犯罪活动，不设立用于实施诈骗，传授犯罪方法，制作或者销售违禁物品、管制物品等违法犯罪活动的网站、通讯群组，不利用网络发布涉及实施诈骗，制作或者销售违禁物品、管制物品以及其他违法犯罪活动的信息；</span></p>

                        <p><span style='
                        
                        '>（</span><span
                        >2</span><span style='
                        
                        '>）<span
                        >不</span>应制作、发布、复制、查阅和传播、存储、链接下列信息：反对宪法所确定的基本原则的；危害国家安全，泄露国家秘密，颠覆国家政权，推翻社会主义制度，煽动分裂国家，破坏国家统一的；损害国家荣誉和利益的；煽动民族仇恨、民族歧视，破坏民族团结的；破坏国家宗教政策，宣扬邪教和封建迷信的；煽动非法集会、结社、游行、示威、聚众扰乱社会秩序的；捏造、散布谣言，侵犯他人权利，扰乱经济、社会秩序，破坏社会稳定的；散布淫秽、色情、赌博、暴力、凶杀、恐怖或者教唆犯罪的；侮辱或者诽谤他人，侵害他人合法权益的；宣扬恐怖主义、极端主义的；违背当地风俗习惯的；含有法律、行政法规禁止的其他内容的；</span></p>

                        <p><span style='
                        
                        '>（</span><span
                        >3</span><span style='
                        
                        '>）<span
                        >不</span>应从<span >事下列</span>危害计算机信息网络安全的活动：对网络服务及相关软硬件设施进行破解、破坏、删除、修改或者增加的；对计算机信息网络中存储或者传输的数据和应用程序进行删除、修改或者增加的；使用软件或硬件等方式窃取他人口令、非法入侵他人计算机系统；故意制作、传播计算机病毒等破坏性程序的；其他危害计算机信息网络安全的活动；通过任何方式对农联贡<span
                        >菜造成</span>或可能造成不合理或不合比例的重大负荷；通过发送病毒、木马等行为攻击其它用户的账号或终端设备；</span></p>

                        <p><span style='
                        
                        '>（</span><span
                        >4</span><span style='
                        
                        '>）不应擅自复制和使用网络上未公开和未授权的文件。除非相关著作权人明示同意，不应在网络中擅自破解、传播、下载或复制第三人享有著作权的软件或进行其他任何侵害他人知识产权的活动；</span></p>

                        <p><span style='
                        
                        '>（</span><span
                        >5</span><span style='
                        
                        '>）不应私自传播广告信息或以“刷单”等不正当方式帮助他人提升评价或利用评价权利对其他用户、商户实施威胁、敲诈勒索；</span></p>

                        <p><span style='
                        
                        '>（</span><span
                        >6</span><span style='
                        
                        '>）不应对农联贡<span
                        >菜相关</span>服务的使用行为导致农联贡菜卷入政治和公共事件；</span></p>

                        <p><span style='
                        
                        '>（</span><span
                        >7</span><span style='
                        
                        '>）不应通过侵犯第三人合法权益、作弊、扰乱系统、实施网络攻击、恶意套现、刷信誉、批量注册、用机器注册农联贡菜账户、用机器模拟客户端等手段进行交易或参加农联贡菜及其所授权的第三方发布的任何活动。</span></p>

                        <p><span style='
                        
                        '>（</span><span
                        >8</span><span style='
                        
                        '>）未经农联贡菜事先书面许可，不应自行或授权、协助任何第三方非法抓取农联贡菜所展示的任何内容（“非法抓取”是指采用未经农联贡菜认可的程序或者非正常浏览等技术手段获取内容数据的行为），包括但不限于以任何机器人软件、蜘蛛软件、爬虫软件、刷<span
                        >屏软件</span>等非农联贡菜认可的方式访问或登录农联贡菜。</span></p>

                        <p><span style='
                        
                        '>（</span><span
                        >9</span><span style='
                        
                        '>）冒充农联贡菜工作人员欺骗其他用户；</span></p>

                        <p><span style='
                        
                        '>（</span><span
                        >10</span><span style='
                        
                        '>）下单后无正当理由拒不收货；</span></p>

                        <p><span style='
                        
                        '>（</span><span
                        >11</span><span style='
                        
                        '>）通过留言、评价等手段发送违规或垃圾信息；</span></p>

                        <p><span style='
                        
                        '>（</span><span
                        >12</span><span style='
                        
                        '>）协助他人获取不正当利益；教唆他人从事本协议所禁止的行为。</span></p>

                        <p><span style='
                        '>&#8232;</span><span >3.2.3</span><span style='
                        
                        '>未经农联贡菜同意，用户不得在农联贡菜上发布任何形式的广告。</span><span
                        style=''>&#8232;</span><span
                        >3.2.4 </span><span style='
                        
                        '>除本协议另有明确约定外，用户理解并保证不利用在农联贡菜上注册的账户进行经营活动、牟利行为及其他未经农联贡菜许可的行为，包括但不仅限于以下行为：</span></p>

                        <p><span style='
                        
                        '>①</span> <span
                        style='
                        
                        '>用户账户内的任何农联贡<span >菜优惠</span>信息（包括但不限于抵用<span
                        >券</span>、积分），由农联贡菜享有解释权和修改权，用户仅享有在农联贡菜购物时的使用权，严禁用户转卖农联贡菜账户、抵用<span
                        >券</span>、积分及其他类型的优惠券或利用农联贡菜账户进行任何经营性行为等；</span></p>

                        <p><span style='
                        
                        '>②严禁用户为获取优惠、折扣或其他利益，恶意利用技术手段或其他方式（如注册多个账户下单等），实施影响其他用户正常消费或相关合法权益、影响农联贡<span
                        >菜正常</span>销售秩序等行为；</span></p>

                        <p><span style='
                        
                        '>③如果用户是为农联贡菜提供商品或服务的供应商、代理商以及合作商家，则不得对其所供商品或服务进行回购等行为；</span></p>

                        <p><span style='
                        
                        '>④任何对商品目录、说明、价格、数量、其他用户信息或其他内容的下载、转载、收集、衍生利用、复制、出售、转售或其他形式的使用，无论是否通过</span><span
                        >Robots</span><span style='
                        
                        '>、</span><span
                        >Spiders</span><span style='
                        
                        '>、自动仪器或手工操作；</span></p>

                        <p><span >3.2.5</span><span style='
                        
                        '>如用户在使用农联贡<span
                        >菜服务</span>过程中涉及上述行为中的一项或多项，则需要对自己的行为承担法律责任。承担法律责任的形式包括但不限于：对受到侵害者进行赔偿，以及在农联贡<span
                        >菜首先</span>承担了因用户的行为导致的行政处罚或侵权损害赔偿责任等损失（含诉讼费、律师费等相关法律程序费用）后，用户应立即给予农联贡菜等额的赔偿。此外，根据具体违法违规情形，农联贡菜有权<span
                        >作出</span>独立判断，立即暂停或终止对用户提供部分或全部服务，包括锁定、注销、删除<span >帐号</span>、冻结账号内余额（如有）、取消相应交易订单、要求销售者停止发货等措施。同时，用户同意，如因用户的行为造成他人的经济损失的，农联贡菜可出于公共利益保护、商业利益保护等原则，在合法合<span
                        >规</span>的前提下，从用户的钱袋宝账户（如有）中划<span >扣相应</span>款项，用户同意并授权、委托农联贡菜进行上述划扣操作。</span></p>

                        <p><span style='
                        
                        '>用户知悉并理解，如果农联贡菜发现用户的上述违法违规行为，依据相关法律法规的规定，农联贡菜有权或有义务立即停止相关服务，删除或屏蔽相关违规信息、服务评价，并视情况进行调查取证，保存有关记录，或向国家有关机关举报。同时，农联贡菜有权自主删除、屏蔽含有该内容的任何数据信息。农联贡菜将根据国家相关法律法规要求，对依法删除、屏蔽的数据信息予以记录、保存。</span></p>

                        <p><span >&nbsp;</span></p>

                        <p><span style='
                        
                        '>四、交易规则</span></p>

                        <p><span style='
                        
                        '>用户承诺其通过农联贡菜进行交易的过程中良好遵守如下农联贡<span
                        >菜交易</span>规则。</span></p>

                        <p><span >4.1</span><span style='
                        
                        '>浏览商品信息</span></p>

                        <p><span style='
                        
                        '>用户在农联贡菜浏览商品信息时，应当仔细阅读商品信息中包含的全部内容，包括但不限于商品的名称、种类、数量、质量、价格、有效期、配送条件、退换<span
                        >货方</span>式、退款条件、售后服务等内容，其中用户应特别注意商品的退款条件等内容，用户完全接受商品信息中包含的全部内容后方可点击购买。</span></p>

                        <p><span >4.2</span><span style='
                        
                        '>提交及确认商品订单</span></p>

                        <p><span >4.2.1</span><span style='
                        
                        '>用户应当仔细阅读商品订单页面中所包含的全部内容，包括但不限于商品信息中的全部内容、为再次提示用户注意而标明的本<span
                        >单商品</span>的退款条件等内容（如有），选择及确认购买数量、价格、应付总额、接收货物的收货地址、送货时间、收货人等内容。销售者依据用户填写的收货地址及收货人进行配送，如果实际收货人与用户注册信息联系人或用户填写的收货人不一致的，实际收货人的签收或其它意思表示或行为，即视为用户的意思表示或行为，其法律效果由用户承担。</span></p>

                        <p><span >4.2.2 </span><span style='
                        
                        '>除法律另有强制性规定外，双方约定如下：农联贡菜上展示的商品和价格等信息仅仅是要约邀请，用户下单时须填写用户希望购买的商品数量、价款及支付方式、收货人、联系方式、收货地址等内容；系统生成的订单信息是计算机信息系统根据用户填写的内容自动生成的数据，仅是用户向销售者发出的合同要约；销售者收到用户的订单信息后，只有在销售者将用户在订单中订购的商品实际直接向用户发出时方视为用户与销售者之间就实际向用户发出的商品建立了合同关系；如果用户在一份订单里订购了多种商品并且销售者只给用户发出了部分商品时，用户与销售者仅就实际向用户发出的商品建立了合同关系；只有在销售者实际向用户发出了订单中订购的其他商品时，用户和销售者之间就订单中其他商品才成立合同关系。用户可以随时登录农联贡菜，查询用户的订单状态。</span></p>

                        <p><span >4.2.3</span><span style='
                        
                        '>商品交易合同关系一经成立，商品订单中所包含的全部内容即为商品合同的内容，具体包括但不限于商品的名称、种类、数量、质量、价格、有效期、配送条件、退换<span
                        >货方</span>式、退款条件、售后服务，及用户填写的商品数量、价款及支付方式、收货人、联系方式、收货地址等，用户与销售者均应当按照前述商品合同的约定履行各自的权利义务。</span></p>

                        <p><span >4.2.4</span><span style='
                        
                        '>由于市场变化及各种以合理商业努力难以控制的因素的影响，销售者无法保证用户提交的订单信息中希望购买的商品都会有货；在一些情况下，农联贡菜也会存在库存不足，以及配送员运力不足，以及不可抗力等导致的履约不能的可能。如果发生这种情况，用户或销售者均有权取消订单。用户已支付货款的，交易价款应原路返还用户付款账户。</span></p>

                        <p><span >4.2.5</span><span style='
                        
                        '>销售者有权在发现农联贡<span
                        >菜显示</span>的商品及订单明显错误、有重大瑕疵或缺货的情况下，销售者将和您协商处理。在协商无果的情况下，销售者有权单方面撤回这些信息或撤销该订单。销售者保留对商品订购数量的限制权。</span></p>

                        <p><span >4.3.</span><span style='
                        
                        '>支付商品价款</span></p>

                        <p><span style='
                        
                        '>用户应根据付款页面的提示通过网上支付农联贡<span
                        >菜完成</span>商品价款的支付。<span >除货到</span>付款的商品外（如有），用户在支付商品价款之前无权要求销售者向用户提供商品。</span></p>

                        <p><span >4.4.</span><span style='
                        
                        '>配送规则</span></p>

                        <p><span >4.4.1</span><span style='
                        
                        '>为保证用户的购物体验，如有特别标明，则商品由销售者向用户提供送货服务。在此情况下，为用户提供送货服务的一方将向用户收取一定的配送服务费用，具体金额以用户下单时系统显示的费用为准，用户知悉并授权销售者及其指定的第三方配送机构将商品送到用户所指定的收货地址。</span></p>

                        <p><span >4.4.2</span><span style='
                        
                        '>所有在农联贡菜上显示的送货时间和预计送达时间（如有）为参考时间，参考时间的计算是根据库存状况、正常的处理过程和送货时间、送货地点的基础上估计得出的，具体送出和送达时间以实际为准。如下情况的订单延迟或无法配送等，农联贡菜及销售者不承担延迟配送的责任：</span></p>

                        <p><span style='
                        
                        '>①用户提供的信息错误、地址不详细等原因导致的；</span></p>

                        <p><span style='
                        
                        '>②货物送达后无人签收，导致无法配送或延迟配送的；</span></p>

                        <p><span style='
                        
                        '>③约定特殊时间段内送货的；</span></p>

                        <p><span style='
                        
                        '>④比农联贡<span
                        >菜显示</span>送出和送达时间迟延在</span><span >24</span><span
                        style='
                        
                        '>小时以内的；</span></p>

                        <p><span style='
                        
                        '>⑤不可抗力因素导致的，例如：自然灾害、交通戒严、交通管制、突发战争等。</span></p>

                        <p><span >4.4.3 </span><span style='
                        
                        '>收货人在签收商品时，应当对商品进行验收，发现存在商品破损、表面不一或其它质量问题的，有权拒绝签收商品，留存开封和商品质量问题的视频作为证据，并在纸质配送单（收货人联和承运人联）上备注详细情况并让承运人签字确认或者直接退回商品。</span></p>

                        <p><span style='
                        
                        '>收货人未保留上述证据而拒收的，视为已签收；收货人签收后未进行验收或未留存开封和商品质量问题的证明但此后主张此类商品质量问题的，销售者及农联贡菜不承担因此产生的责任，但是无法从外观中当即发现的商品质量问题除外。</span></p>

                        <p><span >4.4.4 </span><span style='
                        
                        '>如用户下单时选择使用电子配送单，承运人在交付商品时，收货人应当场对商品进行验收，发现存在商品破损、表面不一或其它质量问题的，应直接拒收商品，留存开封和商品质量问题的视频作为证据，如收货人接收商品视为承运人已完成交付。</span></p>

                        <p><span style='
                        
                        '>承运人完成交付后，用户应及时在农联贡菜上点击确认收货，用户有七天时间进行确认，如商品存在问题或需要申请退换货等请及时联系客服，以免系统自动确认收货。</span></p>

                        <p><span style='
                        
                        '>该笔订单确认收货后视为已签收，签收后用户主张商品数量、质量问题的，销售者及农联贡菜不承担因此产生的责任，但是无法从外观中当即发现的商品质量问题除外。用户可以在农联贡菜中查看该笔订单交易的电子配送单，该电子配送单与纸质配送单具有相同的法律效力。</span></p>

                        <p><span >4.5</span><span style='
                        
                        '>退款</span><span
                        >/</span><span style='
                        
                        '>退货</span><span
                        >/</span><span style='
                        
                        '>换货规则</span></p>

                        <p><span >4.5.1</span><span style='
                        
                        '>用户支付商品价款成功后，有下列情形的，用户有权要求农联贡菜或销售者退款：</span></p>

                        <p><span style='
                        
                        '>①用户付款成功后开始配送前，因不可抗力或非用户原因，导致无法向用户提供商品的；</span></p>

                        <p><span style='
                        
                        '>②用户付款成功后，因确属情况变化导致销售者需要变更商品合同内容，用户不接受变更<span
                        >后内容</span>的。</span></p>

                        <p><span >4.5.2</span><span style='
                        
                        '>用户支付商品价款成功后，有下列情形的，用户有权要求销售者退货或换货</span><span
                        >,</span><span style='
                        
                        '>但换货商品只能针对同一商品、不同批次的更换，不支持商品间换货及差价换货：</span></p>

                        <p><span style='
                        
                        '>①因商品存在质量问题的，用户应提供相关证明文件，并应于签收订单起</span><span
                        >24</span><span style='
                        
                        '>小时内与农联贡<span
                        >菜联系</span>退换货事宜；</span></p>

                        <p><span style='
                        
                        '>②对国家质量监督检验检疫总局公告的存在质量问题的食品。</span></p>

                        <p><span >4.5.3</span><span style='
                        
                        '>用户支付商品价款成功后，有下列情形的，用户不得要求销售者及农联贡菜退货或换货或退款：</span></p>

                        <p><span style='
                        
                        '>①任何非通过农联贡菜出售的商品；</span></p>

                        <p><span style='
                        
                        '>②任何已使用过的商品；</span></p>

                        <p><span style='
                        
                        '>③任何因用户原因导致超过保质期的商品；</span></p>

                        <p><span style='
                        
                        '>④任何因非正常使用及保管导致出现质量问题的商品；</span></p>

                        <p><span style='
                        
                        '>⑤未经授权的误用、疏忽、滥用、事故、改动、不正确的使用方法所造成的商品质量问题，或撕毁、涂改标贴、防伪标记的商品；</span></p>

                        <p><span style='
                        
                        '>⑥商品的图片及信息仅供参照，具体以实物为准。因拍摄灯光及不同显示器而导致的色差等问题，不属质量问题，不予退货、换货或退款；</span></p>

                        <p><span style='
                        
                        '>⑦对于商品数量缺失的情况，只受理当场投诉，即商品送达目的地后，收货人当面清点货物数量，若有异议需当场向配送者及农联贡菜提出；对于收货人签收后发现的数量缺失的情况，不予补货或退款。</span></p>

                        <p><span >4.5.4 </span><span style='
                        
                        '>用户退货的商品应当完好。同时，除非因商品存在质量问题，退换<span
                        >货商品</span>产生的运费由用户承担。</span></p>

                        <p><span >4.5.5 </span><span style='
                        
                        '>如果农联贡菜另行发布售后规则的，该规则属于本协议的一部分，与本协议具有同等效力；如与本协议有冲突的，以农联贡菜另行发布的售后规则为准。服务规则有变更的，以新变更的规则为准，请用户注意及时查看。</span></p>

                        <p><span >4.5.6 </span><span style='
                        
                        '>实际交易之中，如果农联贡菜或销售者给予用户的退货或退款条件比本协议约定的条件更为优越，<span
                        >不</span>视为<span >农联贡菜于本</span>协议项下约定的权利的减损和义务的加重。</span></p>

                        <p><span style='
                        
                        '>五、用户的权利和义务</span></p>

                        <p><span >5.1</span><span style='
                        
                        '>用户有权按照本协议约定接受农联贡菜提供的农联贡<span
                        >菜服务</span>并在服务页面查询用户相关信息。</span></p>

                        <p><span >5.2 </span><span style='
                        
                        '>用户有权要求销售者提供与订单相符的发票，具体开票规则以农联贡菜另行发布的发票规则为准或者由用户与销售者另行协商确定。</span></p>

                        <p><span >5.3 </span><span style='
                        
                        '>用户获得初始登录密码后应及时修改，并应当妥善使用和保管农联贡菜账号、密码、数字证书（如有）、手机动态口令（如有）、账户绑定的手机号码及农联贡菜关联账户银行账户、卡号、密码、开户行预留的手机号码，及来自于农联贡菜或开户行向用户发送的校验码等与农联贡菜账户或与农联贡菜账户关联的银行账户有关的一切信息和设备。若上述信息发生泄漏等，按照以下约定处理：</span></p>

                        <p><span style='
                        
                        '>①如用户更换、暂停或终止使用上述信息或设备，或遗失或泄露前述信息或设备的，用户应及时通知农联贡菜并及时联系农联贡菜进行解绑、变更或注销处理，以减少可能发生的损失。无论是否已通知农联贡菜，因上述原因所致损失需由用户自行承担。</span></p>

                        <p><span style='
                        
                        '>②若因用户未主动或及时更改初始登录密码，或者用户主动泄露账户信息或遭受他人攻击、诈骗或其他行为导致的损失及后果，由用户自己承担。</span></p>

                        <p><span style='
                        
                        '>③当用户发现农联贡菜账号被未经其授权的第三方使用或存在其他账号安全问题时，应立即有效通知农联贡菜暂停该农联贡菜账号的服务。用户理解农联贡菜对用户的任何请求采取行动均需要合理时间，且农联贡<span
                        >菜应用</span>户的请求而采取的行动可能无法避免或阻止侵害后果的形成或扩大，除农联贡<span >菜存在</span>法定过错外，农联贡菜不承担责任。用户在未经农联贡<span
                        >菜同意</span>的情况下不得将农联贡菜账号以赠与、借用、租用、转让或其他方式处分给他人。</span></p>

                        <p><span style='
                        
                        '>④凡使用注册用户名、手机号、账户和手机验证码、密码进行交易、提出交易条件、或做出其它意思表示的，均视为用户的意思表示，因此产生的交易效果由用户承担。但用户在交易前已有效通知农联贡菜挂失账户的除外。</span></p>

                        <p><span style='
                        
                        '>六、农联贡菜的权利和义务</span></p>

                        <p><span >6.1</span><span style='
                        
                        '>如用户不具备本协议约定的注册资格，则农联贡菜有权拒绝用户进行注册，若该用户已经注册，则农联贡菜有权注销该用户的农联贡菜账号，农联贡<span
                        >菜因此</span>而遭受损失的有权向前述用户主张赔偿。同时，农联贡菜保留其他任何情况下是否接受用户注册的权利。</span></p>

                        <p><span >6.2</span><span style='
                        
                        '>农联贡<span
                        >菜发现</span>账户使用者并非账户初始注册人时，有权中止该账户的使用。</span></p>

                        <p><span >6.3</span><span style='
                        
                        '>农联贡<span
                        >菜通过</span>技术检测、人工抽检等检测方式合理怀疑用户提供的信息错误、不实、失效或不完整时，有权通知用户更正、更新信息或中止、终止为其提供农联贡菜服务。</span></p>

                        <p><span >6.4</span><span style='
                        
                        '>农联贡菜有权在发现农联贡菜上显示的任何信息存在明显错误时，对信息予以更正。</span></p>

                        <p><span >6.5</span><span style='
                        
                        '>用户付款成功前，农联贡菜有权对订单内容做出变更，如用户接受变更后的内容则用户可确认订单及付款，如用户不接受变更<span
                        >后内容</span>则有权取消订单。用户付款成功后，如确因情况变化导致需对订单内容做出变更的，农联贡菜有权单方对订单内容<span
                        >作出</span>变更，如用户接受变更则销售者按变更后的订单内容进行配送，如用户不接受变更则用户有权取消订单并要求农联贡菜全额退款。</span></p>

                        <p><span >6.6</span><span style='
                        
                        '>农联贡菜保留修改、中止或终止农联贡<span
                        >菜服务</span>的权利，农联贡菜行使前述权利将按照法律规定的程序及方式告知用户。</span></p>

                        <p><span >6.7</span><span style='
                        
                        '>农联贡<span
                        >菜应当</span>采取必要的技术手段和管理措施保障农联贡菜的正常运行，并提供必要、可靠的交易环境和交易服务，维护交易秩序。</span></p>

                        <p><span >6.8</span><span style='
                        
                        '>如用户连续一年未使用农联贡菜账号和密码登录农联贡菜，则农联贡菜在通知用户后，有权注销用户的农联贡菜账号。</span></p>

                        <p><span >6.9</span><span style='
                        
                        '>农联贡菜有权在本协议履行期间及本协议终止后保留用户的注册信息及用户使用农联贡<span
                        >菜服务</span>期间的全部交易信息，但不得非法使用该等信息。</span></p>

                        <p><span >6.10</span><span style='
                        
                        '>农联贡菜有权随时删除农联贡菜网站内各类不符合国家法律法规、规范性文件或农联贡菜网站规定的用户评价等内容信息，农联贡菜行使该等权利不需提前通知用户。</span></p>

                        <p><span style='
                        
                        '>七、用户个人信息</span></p>

                        <p><span >7.1</span><span style='
                        
                        '>用户个人信息收集与使用</span></p>

                        <p><span >7.1.1</span><span style='
                        
                        '>用户在农联贡菜网站进行注册、浏览、下单购物、参加活动等行为时，涉及用户提供的个人的真实姓名</span><span
                        >/</span><span style='
                        
                        '>名称、收货地址、联系电话、电子邮箱、订单详情等信息的，农联贡菜有权从完成交易、提供配送、售后及客户服务、开展活动、完成良好的用户体验等多种角度予以收集，并将对其中涉及个人隐私信息予以严格保护。</span></p>

                        <p><span >7.1.2</span><span style='
                        
                        '>农联贡菜还可能在下述情况下收集和使用用户个人信息：</span></p>

                        <p><span style='
                        
                        '>①农联贡菜在用户使用服务过程中可能收集的个人信息，包括日志信息、位置信息、设备信息；</span></p>

                        <p><span style='
                        
                        '>②为了维护或改进农联贡菜的产品</span><span
                        >\</span><span style='
                        
                        '>服务，从农联贡菜关联公司中获取的信息，以及收集的个人行为偏好、位置信息。</span></p>

                        <p><span >7.1.3</span><span style='
                        
                        '>请注意，无法与任何特定个人直接建立联系的数据，不属于个人信息。</span></p>

                        <p><span >7.2</span><span style='
                        
                        '>信息披露及共享：农联贡<span
                        >菜不会</span>与农联贡菜以外的任何公司、组织和个人共享用户个人的个人信息，但以下情况除外：</span></p>

                        <p><span >7.2.1</span><span style='
                        
                        '>基于法定情形下：根据法律法规的规定、诉讼争议解决需要，或行政、司法等有权机关依法提出的要求；</span></p>

                        <p><span >7.2.2</span><span style='
                        
                        '>与关联公司共享：为向用户提供一致化服务以及便于用户进行统一管理，农联贡菜可能会将用户的个人信息与农联贡菜的关联公司共享。但农联贡菜只会共享为您提供相关服务必要的个人信息。</span></p>

                        <p><span >7.2.3</span><span style='
                        
                        '>与合作伙伴分享：<span
                        >农联贡菜</span>可能会向业务合作伙伴共享为用户个人提供服务所必要的订单信息、账户信息、支付信息等。<span
                        >农联贡菜</span>的业务合作伙伴包括供应商</span><span >\</span><span
                        style='
                        
                        '>服务提供商、第三方商家、其他业务合作伙伴。</span></p>

                        <p><span >7.2.4</span><span ><span
                        style='
                        
                        '>基于协议</span></span><span style='
                        
                        '>约定：依据用户与农联贡<span
                        >菜签署</span>的相关协议</span><span >(</span><span
                        style='
                        
                        '>包括<span >在线签署</span>的电子协议及服务规则</span><span >)</span><span
                        style='
                        
                        '>或法律文件，有必要向第三方共享时；</span></p>

                        <p><span >7.2.5</span><span style='
                        
                        '>基于合理商业习惯：例如与第三方共享联合营销活动中的中奖信息，以便第三方能及时向用户个人发放奖品；或者在农联贡<span
                        >菜计划</span>与其他公司进行资本市场活动</span><span >(</span><span
                        style='
                        
                        '>包括但不限于</span><span >IPO</span><span style='
                        
                        '>，债券发行</span><span
                        >)</span><span style='
                        
                        '>接受尽职调查时等；</span></p>

                        <p><span >7.2.6</span><span style='
                        
                        '>基于学术研究；例如为科研机构开展统计或学术研究之必要；</span></p>

                        <p><span >7.2.7</span><span style='
                        
                        '>基于符合法律法规的社会公共利益等。</span></p>

                        <p><span >7.3</span><span style='
                        
                        '>随着农联贡<span
                        >菜业务</span>的发展，农联贡菜及农联贡菜的关联方有可能进行合并、收购、资产转让或类似的交易，如涉及个人信息的转让，农联贡菜会要求受让用户个人信息的公司、组织继续接受本条款的约束，否则</span><span
                        >,</span><span style='
                        
                        '>农联贡菜将要求该公司、组织重新征求用户个人的授权同意。</span></p>

                        <p><span >7.4. </span><span style='
                        
                        '>用户一经注册</span><span
                        >/</span><span style='
                        
                        '>登录，即视为同意接收来自农联贡菜的推送信息，包括但不限于营销活动信息、商品交易信息、促销信息等。为使用户及时了解丰富的商品信息，提升服务体验，农联贡菜或农联贡菜的关联公司或与农联贡<span
                        >菜合作</span>的第三方可以在法律法规允许的范围内，通过短信、电话、邮件等各种方式向用户提供前述信息。如果用户不同意接收来自农联贡菜的推送信息，可以退订。</span></p>

                        <p><span style='
                        
                        '>八、特别声明</span></p>

                        <p><span >8.1.</span><span style='
                        
                        '>用户未通过农联贡菜进行的交易均不受本协议约束，农联贡<span
                        >菜对此</span>也不承担任何责任。不属于农联贡<span >菜交易</span>的情况具体包括但不限于：用户未与销售者成立订单、用户未通过农联贡菜付款。</span></p>

                        <p><span >8.2.</span><span style='
                        
                        '>不论在何种情况下，农联贡菜对由于信息网络设备维护、信息网络连接故障、电脑、通讯或其他系统的故障、电力故障、罢工、劳动争议、暴乱、起义、骚乱、生产力或生产资料不足、火灾、洪水、风暴、爆炸、战争、政府行为、司法行政机关的命令、其他不可抗力或第三方的不作为而造成的不能服务或延迟服务不承担责任。</span></p>

                        <p><span >8.3.</span><span style='
                        
                        '>作弊、扰乱交易秩序的情况</span></p>

                        <p><span >8.3.1</span><span ><span
                        style='
                        
                        '>除活动</span></span><span style='
                        
                        '>规则另有规定外，每次活动中，每个用户只限参加一次活动（活动包括并不限于促销优惠、秒杀、抽奖等等），每个用户只能中奖一次。同一手机、同<span
                        >一联系</span>方式、同一</span><span >IP</span><span
                        style='
                        
                        '>地址、同一农联贡菜账户、同一身份证件、同一银行卡号、同一收货地址、同一终端设备号或其他可以合理显示为同一用户的情形，均视为同一用户。</span></p>

                        <p><span >8.3.2</span><span style='
                        
                        '>活动期间，如发现有用户通过不正当手段（包括但不限于侵犯第三人合法权益、作弊、扰乱系统、实施网络攻击、恶意套现、刷信誉、批量注册、用机器注册农联贡菜账户、用机器模拟客户端）参加活动而有碍其他用户公平参加本次活动或有违反活动目的之行为，农联贡菜有权取消其获奖资格或其因参加活动所获赠品及权益。如该作弊行为给农联贡<span
                        >菜造成</span>损失的，农联贡菜保留追究其赔偿的权利。</span></p>

                        <p><span >8.3.3</span><span style='
                        
                        '>对于恶意进行注册，反复交易退款，侵害农联贡<span
                        >菜实际</span>经营交易的情况，农联贡菜会停止服务、封停账号并追究责任。</span></p>

                        <p><span style='
                        
                        '>九、知识产权</span></p>

                        <p><span >9.1.</span><span style='
                        
                        '>用户理解并知悉，除另有书面声明以外，以下信息和内容的知识产权（包括但不限于专利权、著作权、商标权及商业秘密）归农联贡菜所有：</span></p>

                        <p><span >9.1.1</span><span style='
                        
                        '>在农联贡<span
                        >菜相关</span>服务中所提供的内容和信息（包括但不限于软件、技术、程序、网页、文字、图片、图像、地图、图标、音频、视频、图表、版面设计、电子文档、数据资料等）；</span></p>

                        <p><span >9.1.2</span><span style='
                        
                        '>农联贡<span
                        >菜用于</span>提供上述内容和信息的基础设施和农联贡菜（包括但不限于软件、网站、应用程序等）；</span></p>

                        <p><span >9.1.3</span><span style='
                        
                        '>在农联贡菜提供相关服务中所使用的各项商标、商业形象、商业标识、技术诀窍、标语、文案等；</span></p>

                        <p><span >9.1.4</span><span style='
                        
                        '>农联贡<span
                        >菜服务</span>的开发、运营、维护等过程中产生的所有数据和信息。</span></p>

                        <p><span style='
                        
                        '>农联贡菜所拥有的上述权利及所提供服务中所包含的任何内容的知识产权均受到法律保护，未经农联贡菜事先书面许可，用户承诺不应且<span
                        >不</span>应允许或协助任何人以任何形式（包括但不限于通过任何机器人、蜘蛛、截屏等程序或设备）进行使用、出租、出借、分发、展示、复制、修改、链接、转载、汇编、发表、出版、抓取、监视、引用或创造相关衍生作品。</span></p>

                        <p><span >9.2.</span><span style='
                        
                        '>用户理解并同意，用户在使用农联贡菜提供的服务时上传、提交、存储或发布的内容（包括但不限于文字、图片、视频、音频、动画等）均由用户原创或已获合法授权。用户通过农联贡菜上传、提交、存储或发布的任何内容的知识产权归属用户或原始著作权人所有，用户的上传、提交、存储或发布行为不会侵犯他人的知识产权或其他合法权益。</span></p>

                        <p><span style='
                        
                        '>用户知悉、理解并同意，用户一旦接受<span
                        >本服务</span>协议，即表明用户主动将上述内容<span >的非专属</span>、可转让的财产性权利，如著作权（包括但不限于：复制权、发行权、出租权、展览权、表演权、放映权、广播权、信息网络传播权、摄制权、改编权、翻译权、汇编权以及应当由著作权人享有的其他可转让权利），在全世界范围内永久、免费、独家且不可撤销地授权给农联贡菜及其关联公司，农联贡菜及其关联公司可基于该等授权使用上述内容（包括但不限于用于商业用途）或向第三方自主进行任何必要的转授权。该等授权、转授权的使用场景包括但不限于当前或其他任何网站、应用程序、产品或移动终端设备等，且农联贡菜及其关联公司或农联贡菜及其关联公司所授权许可的第三方可通过对上述授权内容进行修改、复制、改编、翻译、汇编或制作，形成衍生产品。在不违反相关法律法规的强制性规定、尊重相关原始授权内容的知识产权的基础上，该等衍生产品的相关知识产权归农联贡菜及其关联公司或农联贡菜所授权许可的第三方所有。</span></p>

                        <p><span style='
                        
                        '>用户确认并同意授权农联贡菜及其关联公司以自己的名义或委托专业<span
                        >第三方针</span>对有关用户上传、提交、存储或发布的内容（含衍生作品）的侵权行为进行独立自主的维权并获得全部赔偿。维权形式包括但不限于：监测侵权行为、发送维权函、提起诉讼或仲裁、调解、和解等。农联贡菜及其关联公司有权对维权事宜做出独立决策并予以实施。</span></p>

                        <p><span style='
                        
                        '>用户同意，因用户通过农联贡菜上传、发布的任何内容导致的知识产权侵权问题，用户将承担全部责任；如农联贡菜及其关联公司，或农联贡菜授权的其他服务提供方因第三方知识产权维权而产生损失，用户将等额赔偿。</span></p>

                        <p><span ><span style='
                        
                        '>本服务</span></span><span
                        style='
                        
                        '>协议已经构成《著作权法》第二十五条所规定的书面协议，其效力及于用户在农联贡<span >菜发布</span>的任何受著作权法保护的作品内容，无论该内容形成于<span
                        >本服务</span>协议签订前还是<span >本服务</span>协议签订后。农联贡菜及农联贡菜转授权、许可的相关方有权将用户在农联贡<span
                        >菜发表</span>的产品使用体验、产品讨论或图片进行使用或者与其他人合作使用，使用范围包括但不限于网站、电子杂志、杂志、刊物、海报、公众号文章、<span
                        >微信小</span>程序等。</span></p>

                        <p><span >9.3.</span><span style='
                        
                        '>在使用农联贡<span
                        >菜相关</span>客户端的过程中，用户可能需要下载特定软件。为了改善用户体验、修复漏洞、保障安全性等考虑，农联贡菜有权对软件进行更新，用户应该将相关软件更新至最新版本，否则农联贡菜将不保证用户能正常使用相关软件。</span></p>

                        <p><span style='
                        
                        '>如果用户从未经农联贡菜授权的第三方获取软件或与该软件名称相同的安装程序，农联贡<span
                        >菜无法</span>保证该软件能够正常使用，由此造成的相关损失，农联贡菜不予负责。</span></p>

                        <p><span >9.4.</span><span style='
                        
                        '>除非农联贡菜书面许可，用户在使用农联贡菜的软件时不得从事下列<span
                        >任一行</span>为：</span></p>

                        <p><span >9.4.1</span><span style='
                        
                        '>删除、编辑或遮挡软件及其副本上关于著作权、商标或其他权利标识或标记的信息；</span></p>

                        <p><span >9.4.2</span><span style='
                        
                        '>复制、发布、出售或出租软件或其任何部分；</span></p>

                        <p><span >9.4.3</span><span style='
                        
                        '>对软件进行反向工程、反向汇编、反向编译，或者以其他方式尝试挖掘、提取软件的源代码；</span></p>

                        <p><span >9.4.4</span><span style='
                        
                        '>其他对软件、软件所产生的数据所进行的任何增加、删减、变动的任何行为，包含制作、利用、授权各种第三方外挂、插件、系统进行上述行为。</span></p>

                        <p><span style='
                        
                        '>十、客户服务</span></p>

                        <p><span style='
                        
                        '>农联贡<span
                        >菜建立</span>专业的客服团队，并建立完善的客户服务制度，从技术、人员和制度上保障用户提问及投诉渠道的畅通，为用户提供及时的疑难解答与投诉反馈。</span></p>

                        <p><span style='
                        
                        '>十一、协议的终止</span></p>

                        <p><span >11.1.</span><span style='
                        
                        '>农联贡菜有权依据本协议约定注销用户的农联贡菜账号，本协议于账号注销之日终止。</span></p>

                        <p><span >11.2.</span><span style='
                        
                        '>在农联贡菜未向您收取服务费的情况下，农联贡菜可以任何理由自行决定终止农联贡菜服务、解除与<span
                        >您之间</span>订立的本条款，并终止您的服务密码、账户（或其任何部分）或您对农联贡菜的使用。该等情况下，农联贡菜将依法提前三十日在网站或客户端首页显著位置持续公示有关信息。停止服务后，农联贡菜将无义务为您保留账号中的任何信息，或留存、转发任何账号内的任何站内信或短消息。您同意农联贡菜不就终止农联贡<span
                        >菜服务</span>而对您或任何第三方承担任何责任。本协议于农联贡菜全部服务依法定程序及方式终止之日终止。</span></p>

                        <p><span >11.3.</span><span style='
                        
                        '>本协议终止后，用户无权要求农联贡<span
                        >菜继续</span>向其提供任何服务或履行任何其他义务，包括但不限于要求农联贡菜为用户保留或向用户披露其原农联贡菜账号中的任何信息，向用户或第三方转发任何其未曾阅读或发送过的信息等。</span></p>

                        <p><span >11.4. </span><span ><span
                        style='
                        
                        '>本服务</span></span><span style='
                        
                        '>及本协议终止后，<span
                        >农联贡菜仍享有</span>下列权利：</span></p>

                        <p><span >11.4.1</span><span style='
                        
                        '>继续保存用户留存于农联贡菜的本协议第七条所列的各类信息</span></p>

                        <p><span >11.4.2</span><span style='
                        
                        '>对于用户过往的违约行为，农联贡菜仍可依据本协议向用户追究违约责任。</span></p>

                        <p><span style='
                        
                        '>十二、违约责任</span></p>

                        <p><span >12.1</span><span style='
                        
                        '>农联贡菜或用户违反本协议的约定即构成违约，违约方应当向守约方承担违约责任。<span
                        >除违反</span>本协议第</span><span >3.2</span><span
                        style='
                        
                        '>条约定的情形以外，双方违反本协议的损害赔偿范围只包括直接损失，不包括间接损失。</span></p>

                        <p><span >12.2</span><span style='
                        
                        '>如用户违反本协议约定，农联贡菜有权取消相关交易，并有权注销其农联贡菜账号，终止为其提供农联贡菜服务，如农联贡<span
                        >菜因此</span>而遭受损失的，有权要求用户赔偿损失。</span></p>

                        <p><span >12.3.</span><span style='
                        
                        '>如因用户提供的信息不真实、不完整或不准确给农联贡<span
                        >菜造成</span>损失的，农联贡菜有权要求用户进行赔偿。</span></p>

                        <p><span >12.4.</span><span style='
                        
                        '>如因用户违反法律法规规定或本协议约定，在农联贡菜或利用农联贡<span
                        >菜服务</span>从事非法活动的，农联贡菜有权立即终止继续对其提供农联贡菜服务，注销其账号，并要求其赔偿由此给农联贡<span
                        >菜造成</span>的损失。</span></p>

                        <p><span >12.5.</span><span style='
                        
                        '>如用户以技术手段干扰农联贡菜的运行或干扰其他用户对农联贡<span
                        >菜使用</span>的，农联贡菜有权立即注销其农联贡菜账号，并有权要求其赔偿由此给农联贡<span >菜造成</span>的损失。</span></p>

                        <p><span >12.6.</span><span style='
                        
                        '>如用户以虚构事实等方式恶意诋毁农联贡菜的商誉，农联贡菜有权要求用户向农联贡<span
                        >菜公开</span>道歉，赔偿其给农联贡<span >菜造成</span>的损失，并有权终止对其提供农联贡菜服务，甚至注销其账号。</span></p>

                        <p><span >12.7 </span><span style='
                        
                        '>除上述约定外，如本协议或服务规则对相关违约责任有其他约定，应同时适用相关约定。</span></p>

                        <p><span style='
                        
                        '>十三、责任限制</span></p>

                        <p><span >13.1 </span><span style='
                        
                        '>用户理解并同意，农联贡菜会在现有技术水平和条件下尽最大努力向用户提供服务，确保服务的连贯性和安全性；但农联贡<span
                        >菜不能</span>随时预见和防范法律、技术以及其他风险，包括但不限于不可抗力，大规模的病毒、木马和黑客攻击，系统不稳定，第三<span
                        >方服务</span>瑕疵，政府管制等原因可能导致的服务中断、数据丢失以及其他的损失和风险。</span></p>

                        <p><span >13.2 </span><span style='
                        
                        '>在法律允许的范围内，农联贡菜对以下情形之一导致的服务中断或受阻不承担责任：</span></p>

                        <p><span >13.2.1</span><span style='
                        
                        '>受到计算机病毒、木马或其他恶意程序、黑客攻击的破坏；</span></p>

                        <p><span >13.2.2</span><span style='
                        
                        '>用户或农联贡菜的电脑软件、系统、硬件和通信线路出现故障；</span></p>

                        <p><span >13.2.3</span><span style='
                        
                        '>用户操作不当；</span></p>

                        <p><span >13.2.4</span><span style='
                        
                        '>用户通过非农联贡菜授权的方式使用服务；</span></p>

                        <p><span >13.2.5</span><span style='
                        
                        '>其他农联贡菜无法控制或合理预见的情形。</span></p>

                        <p><span >13.3</span><span style='
                        
                        '>用户理解并同意，在使用农联贡<span
                        >菜服务</span>的过程中，可能会遇到不可抗力等风险因素使农联贡<span >菜服务</span>发生中断。不可抗力是指不能预见、不能克服并不能避免且对一方或双方造成重大影响的客观事件，包括但不限于自然灾害如洪水、地震、瘟疫流行和风暴等以及社会事件如战争、动乱、政府行为等。出现上述情况时，农联贡菜将努力在第一时间与相关单位配合，及时进行修复，但是由此给用户造成的损失，农联贡菜将在法律允许的范围内免责。</span></p>

                        <p><span >13.4</span><span style='
                        
                        '>农联贡<span
                        >菜依据</span>本协议约定获得处理违法违规内容的权利，该权利不构成农联贡菜的义务或承诺，农联贡<span >菜不能</span>保证及时发现违法行为或进行相应处理。</span></p>

                        <p><span >13.5 </span><span style='
                        
                        '>农联贡菜提示用户，在使用<span
                        >本服务</span>的过程中，用户可能会遇到网络信息或其他用户行为带来的风险，该等风险包含他人匿名或冒名的含有威胁、诽谤、令人反感、非法、误导、欺骗等任何信息或行为所造成任何商誉损失或经济损失。请用户仔细甄别，并在遇到上述相关不法行为时及时向农联贡菜或有关机关举报或投诉。农联贡菜将对相关内容开展日常检查并在收到举报或投诉时进行相应处理，但请用户注意，农联贡菜不对非农联贡菜所发出或刊登的任何信息的真实性、适用性、合法性承担责任，也不对因第三方侵权行为给用户造成的损害负责。</span></p>

                        <p><span style='
                        
                        '>十四、通知与送达</span></p>

                        <p><span >14.1</span><span style='
                        
                        '>用户知悉并认可，农联贡菜可视情况通过下列任意一种或几种方式向用户通知重要信息：</span></p>

                        <p><span >14.1.1</span><span style='
                        
                        '>向用户注册时所提交的电子邮箱地址发送电子信息</span></p>

                        <p><span >14.1.2</span><span style='
                        
                        '>向用户注册时所提交的手机号码发送电子信息</span></p>

                        <p><span >14.1.3</span><span style='
                        
                        '>向用户提供的实际地址进行寄送纸质载体信息</span></p>

                        <p><span >14.1.4</span><span style='
                        
                        '>在网站或客户端显著位置刊登电子信息</span></p>

                        <p><span >14.1.5</span><span style='
                        
                        '>向农联贡菜网站或相应客户端的账户的站内信或其他即时通信客户端发送电子信息</span></p>

                        <p><span style='
                        
                        '>上述电子信息在发送成功或刊登完成后即视为送达。相关纸质载体的发送以相关邮寄凭证上的邮寄日期后的第五个自然日视为送达。</span></p>

                        <p><span style='
                        
                        '>上述送达方式同样可适用于相关仲裁或司法程序（含起诉、审理、执行等各阶段）。</span></p>

                        <p><span >14.2</span><span style='
                        
                        '>用户应当保证所提供的联系方式是准确、有效的，并进行适时更新，如因提供的联系方式不准确或<span
                        >怠</span>于更新等不可归责于农联贡菜的原因，导致相关通知、文件、文书无法送达或及时送达，用户将自行承担由此可能产生的法律后果。</span></p>

                        <p><span style='
                        
                        '>十五、法律适用和管辖</span></p>

                        <p><span >15.1</span><span style='
                        
                        '>本协议之订立、生效、解释、修订、补充、终止、执行与争议解决均适用中华人民共和国大陆地区法律；如法律无相关规定的，参照商业惯例或行业惯例。</span></p>

                        <p><span >15.2</span><span style='
                        
                        '>用户与农联贡菜因本协议的履行发生争议的应通过友好协商解决，协商解决不成的，任何一方均可<span
                        >向农联高科</span>科技发展有限公司注册地所属的人民法院提起诉讼。</span></p>

                        <p><span style='
                        
                        '>十六、其他</span></p>

                        <p><span >16.1</span><span style='
                        
                        '>本服务协议各条款前所列关键词仅<span
                        >供帮助</span>理解条款主旨及快速定位查询条款所用，不能代替条款的任何内容，亦不作为解释条款的依据，农联贡<span
                        >菜建议</span>用户仔细阅读各条款的具体表述，以维护用户的合法权益。</span></p>

                        <p><span >16.2</span><span style='
                        
                        '>如果<span
                        >本服务</span>协议中任何一条被视为废止、无效或因任何理由不可执行，该条应视为可分的且并不影响任何其余条款的有效性和<span
                        >可</span>执行性。</span></p>

                        <p><span >16.3</span><span style='
                        
                        '>如用户对自行查询的信息存在异议、或对<span
                        >本服务</span>协议有任何问题或建议，请联系<span >农联贡菜客服</span>部门（联系方式：</span><span
                        >400-128-8566</span><span style='
                        
                        '>）。同时，您可通过联系<span
                        >农联贡菜客服</span>部门，对您的用户信息进行查询、更正、删除，或对账户进行注销。</span></p>

                        <p><span ><o:p>&nbsp;</o:p></span></p>

                        <p><span style='
                        
                        '>再次感谢用户的耐心阅读！</span></p>

                    </div>
                `
            }
        }
    },
    methods:{
        deabtn(){
            if(this.status == 1){
                window.localStorage.setItem('discounts', 1)
            }
            if(this.status == 2){
                window.localStorage.setItem('privacy', 2)
            }
            if(this.status == 3){
                window.localStorage.setItem('runimg', 3)
            }
            if(this.status == 4){
                window.localStorage.setItem('userTreaty', 4)
            }
            this.$emit('closeDiscount');
        },
        onClickLeft(){
            this.$emit('closeDiscount');
        }
    }
}
</script>
<style>
</style>

<style scoped>
html,body{background-color: #fff;}

.van-nav-bar{
    border-bottom: 1px solid #f2f2f2;
}
.van-nav-bar .van-icon{
    color: #232323;
}
.ffc{
    margin:10px 12px;
    text-align: center
}
.ffc .discountsTitle{
    color: #212121;
    margin-bottom: 10px;
    font-size: 16px;
}
.ffc .discountsText{
    text-align: justify;
    font-size: 14px;
    margin-bottom: 10px;
}
.ffc .secBtnBox{
    display: flex;
}
.ffc .deabtn{
    border:1px solid #ee2d2d;
    background-color: #ee2d2d;
    margin: auto 22px;
    border-radius: 5px;
    height: 35px;
    line-height: 1;
    color: #fff;
    margin-top: 30px;
    flex: 1;
    display: block;
    font-size: 14px;
    
}
</style>


