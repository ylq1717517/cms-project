<template>
    <div>
        <navBar title="商品列表"></navBar>

        <ul class="mui-table-view mui-grid-view">
            <li class="mui-table-view-cell mui-media mui-col-xs-6" v-for="goodslist in goodslist" :key="goodslist.id">
                <router-link :to="{name:'goodsdetail',query:{id:goodslist.id}}">
                    <img class="mui-media-object" :src="goodslist.img_url">
                    <div class="mui-media-body">{{goodslist.title}}</div>
                    <div class="desc">
                        <div class="sell">
                            <span>￥{{goodslist.sell_price}}</span>
                            <s>￥{{goodslist.market_price}}</s>
                        </div>
                        <div class="detail">
                            <div class="hot">
                                热卖中
                            </div>
                            <div class="count">
                                剩99件
                            </div>
                        </div>
                    </div>
                </router-link >
            </li>
            
        </ul>
    </div>
</template>
<script>
import axios from 'axios';
 export default{
     data(){
         return{
            goodslist:[]
         }
     },
     created(){
         axios.get('../../../static/goods/goodslist.json').
         then(res=>{
             this.goodslist=res.data.messages;
         })

     }
 }
</script>
<style scoped>
.mui-table-view.mui-grid-view .mui-table-view-cell > a:not(.mui-btn) {
    margin: 0px;
    padding: 0px;
    border: 1px solid #5c5c5c;
    box-shadow: 0 0 4px #666;
}

.sell > span {
    float: left;
    color: red;
    text-align: left;
}

.detail >.hot {
    float: left;
    text-align: left;
    font-size: 15px;
}

.detail >.count {
    float: right;
    text-align: right;
    font-size: 15px;
}


/*撑开，去除浮动没有的高度*/

.detail {
    overflow: hidden;
}

.desc {
    color: rgba(92, 92, 92, 0.8);
    background-color: rgba(0, 0, 0, 0.2);
}

.mui-table-view.mui-grid-view .mui-table-view-cell .mui-media-object {
    height: 200px;
}
</style>
