<template>
    <div>
     <!--头部标签-->
      <navBar title="商品购物车"></navBar>

        <div class="pay-detail">
            <ul>
                <li class="p-list" v-for="(goodsList,index) in goodsList" :key="index">
                    <mt-switch v-model="goodsList.isPicked" ></mt-switch>
                    <img :src="goodsList.img_url">
                    <div class="pay-calc">
                        <p>{{goodsList.title}}</p>
                        <div class="calc">
                            <span>￥{{goodsList.sell_price}}</span>
                            <span @click="sub(index)">-</span>
                            <span>{{goodsList.num}}</span>
                            <span @click="add(index)">+</span>
                            <a href="javascript:;" @click="del(index)">删除</a>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
        <div class="show-price">
            <div class="show-1">
                <p>总计(不含运费):</p>
                <span>已经选择商品:{{payment.num}}件，总价￥{{payment.sum}}元</span>
            </div>
            <div class="show-2">
                <mt-button type="danger" size="large">去结算</mt-button>
            </div>
        </div>
    </div>
</template>

<script>
import prodTools from '../common/prodTools.js';
import axios from 'axios';
import connect from '../common/connect.js';

  export default{
    data(){
      return{
          goodsList:[],
          isPicked:'',
        
      }
    },
    created(){
     //获取local数据
     let prods=prodTools.getProds();//购买商品的数据 prods: {18:1,15:1}
     let flag=Object.keys(prods);//购买商品的id号 [14,16,17,20]
      axios.get('../../../static/goods/goodslist.json').
         then(res=>{
            for(var i=0;i<flag.length;i++){
                let Data=res.data.messages[flag[i]-13];
                this.goodsList.push(Data);  
             }
            //往数组里面添加商品数量
            this.goodsList.forEach((ele,index)=>{
               if(prods[ele.id]){/*
                ele.num=prods[ele.id];
                ele.isPicked=true;  vue里面添加属性是没有办法做到响应的*/
                this.$set(ele,'num',prods[ele.id]);
                this.$set(ele,'isPicked',true);
               }
            })
         })
      //往app.vue里面的下标添加数字
     let t=prodTools.getProds();
     let sum=0;
     for(var key in t){
        sum=sum+t[key];
    }
    connect.$emit('addShopcart',sum);
  
    },
    methods:{
         add(index){
             let t=0;
             this.goodsList[index].num++;
             this.goodsList.forEach((ele)=>{
                  t=t+ele.num;
             })
             connect.$emit('addShopcart',t);
         },
         sub(index){
             let t=0;
             if(this.goodsList[index].num>1){
                  this.goodsList[index].num--;
                  this.goodsList.forEach((ele)=>{
                       t=t+ele.num;
                 })
                 connect.$emit('addShopcart',t);
             }
         },
         //商品选择按钮对应下面图标数字变化
         /*      
         
         
         
         */
         del(index){
             prodTools.delete(this.goodsList[index].id);//删除本地内存
             this.goodsList.splice(index,1);//删除渲染的数组
            
            let t=0;
            this.goodsList.forEach((ele)=>{
                t+=ele.num;
            })
            connect.$emit('addShopcart',t);


             

         }

          
        

    },
    computed:{
        payment(){
            let num=0;
            let sum=0;
            this.goodsList.forEach((ele)=>{
                if(ele.isPicked){
                   sum+=ele.num*ele.sell_price;
                   num+=ele.num;
                }
            })
            return {
                num,sum
            }
            
        }
    }
  }
</script>

<style scoped>
.pay-detail ul li {
    list-style: none;
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
    margin-bottom: 3px;
}

.pay-detail ul {
    padding-left: 5px;
    margin-top: 5px;
}

.pay-detail ul li img {
    width: 80px;
    height: 80px;
    display: inline-block;
    vertical-align: top;
    margin-top: 10px;
}

.pay-detail ul li >:nth-child(1),
.pay-detail ul li >:nth-child(3) {
    display: inline-block;
}

.pay-calc p {
    display: inline-block;
    width: 250px;
    overflow: hidden;
    color: blue;
    font-size: 15px;
    margin-bottom: 10px;
}

.pay-detail ul li >:nth-child(1) {
    line-height: 80px;
}

.calc:nth-child(1) {
    color: red;
    font-size: 20px;
}

.calc span:not(:nth-child(1)) {
    border: 1px solid rgba(0, 0, 0, 0.3);
    display: inline-block;
    width: 20px;
    text-align: center;
}

.calc a {
    margin-left: 20px;
}

.show-1,
.show-2 {
    display: inline-block;
}

.show-1,
.show-2 {
    margin-left: 30px;
}

.show-price {
    background-color: rgba(0, 0, 0, 0.2);
}

.show-price{
    margin-bottom: 56px;
}
</style>
