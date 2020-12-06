<template>
    <div>
        <navBar title="商品详情"></navBar>

        <div class="outer-swiper">
            <div class="swiper">
               <img :src="goodsdetail.img_url" alt=""/>
            </div>
        </div>
        <div class="product-desc">
            <ul>
                <li><span class="product-desc-span">
                    {{goodsdetail.title}}
                </span></li>
                <li class="price-li">市场价：
                    <s>￥{{goodsdetail.market_price}}</s> 销售价：<span>￥{{goodsdetail.sell_price}}</span></li>
                <li class="number-li">购买数量：<span @click="sub()">-</span><span>{{number}}</span><span @click="add()">+</span></li>
                <li>
                    <mt-button type="primary">立即购买</mt-button>
                    <mt-button type="danger" @click="addShopcart">加入购物车</mt-button>
                </li>
            </ul>
        </div>
        <transition name="ball">
            <!--
            <div class="ball"></div>
            -->
        </transition>
        <div class="product-props">
            <ul>
                <li>商品参数</li>
                <li>商品货号：TF3441231</li>
                <li>库存情况：999件</li>
                <li>上架时间：{{goodsdetail.add_time}}</li>
            </ul>
        </div>
        <div class="product-info">
            <ul>
                <li>
                    <mt-button type="primary" size="large" plain>图文介绍</mt-button>
                </li>
                <li>
                    <mt-button type="danger" size="large" plain>商品评论</mt-button>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
import axios from 'axios';
import connect from '../common/connect.js'; 


//引入prod工具对象
import prodTools from '../common/prodTools.js';

export default{
    data(){
        return{
              goodsdetail:{},
              number:1
        }
    },
    created(){
        //获取路由id
        let id=this.$route.query.id;
        axios.get('../../../static/goods/goodslist.json').
        then(res=>{
             this.goodsdetail=res.data.messages[id-13];
         })
    },
    methods:{
        //商品数量点击
        sub(){
           if(this.number>1){
              this.number--;
           }
         },
         add(){
             this.number++;
         },
         //添加购物车    
         addShopcart(){
             //开始emit

            

            //调用工具对象来添加商品
            prodTools.addOrUpdata({
                id:this.goodsdetail.id,
                number:this.number
            })
            let t=prodTools.getProds();
            let sum=0;
            for(var key in t){
                sum=sum+t[key];
            }
            connect.$emit('addShopcart',sum);
            //输出最终数据 
           // console.log(prodTools.getProds());

        }

    }
}

</script>
<style scoped>
.ball-enter-active {
    animation: bounce-in 1s;
}

@keyframes bounce-in {
    0% {
        transform: translate3d(0, 0, 0);
    }
    50% {
        transform: translate3d(140px, -50px, 0);
    }
    75% {
        transform: translate3d(160px, 0px, 0);
    }
    100% {
        transform: translate3d(140px, 300px, 0);
    }
}

.swiper {
    border: 1px solid rgba(0, 0, 0, 0.2);
    margin: 8px;
    width: 95%;
    border-radius: 15px;
    overflow: hidden;
}

.outer-swiper,
.product-desc,
.product-props,
.product-info {
    border-radius: 5px;
    border: 1px solid rgba(0, 0, 0, 0.2);
    margin: 3px;
}


/*请ulpadding*/

.outer-swiper ul,
.product-desc ul,
.product-props ul,
.product-info ul {
    padding: 0;
}

.product-desc ul li,
.product-props ul li,
.product-info ul li {
    list-style: none;
    font-size: 15px;
    color: rgba(0, 0, 0, 0.5);
    margin-top: 8px;
}

.product-desc ul >:nth-child(1) span {
    color: blue;
    font-size: 22px;
    font-weight: bold;
}

.product-desc ul >:nth-child(1) {
    border-bottom: 1px solid rgba(0, 0, 0, 0.5);
}

.product-desc ul,
.product-info ul,
.product-props ul {
    padding-left: 10px;
}

.price-li span {
    color: red;
    font-size: 25px;
}

.price-li s {
    margin-right: 16px;
}


/*加减*/

.number-li span {
    display: inline-block;
    border: 2px solid rgba(0, 0, 0, 0.1);
    width: 25px;
}


/*商品参数*/

.product-props ul >:nth-child(1) {
    text-align: left;
}

.product-props ul:not(:nth-child(1)) {
    margin-left: 40px;
}

.product-info ul {
    margin-bottom: 70px;
    padding: 0 5;
}

.number-li span {
    text-align: center;
}

.number-li >:nth-child(2) {
    width: 40px;
}

.ball {
    border-radius: 50%;
    background-color: red;
    width: 24px;
    height: 24px;
    position: absolute;
    top: 440px;
    left: 120px;
    display: inline-block;
    z-index: 9999;
}


.swiper img{
    height:347px;
}
</style>
