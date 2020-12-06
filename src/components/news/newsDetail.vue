<template>
  <div>
      <navBar title='新闻详情'></navBar>
      <div class="tmpl">
        <div class="news-title">
            <p>{{detail.title}}</p>
            <div>
                <span>点击数:{{detail.click}}</span>
                <span>分类:民生经济</span>
                <span>添加时间: {{detail.addtime}}</span>
            </div>
        </div>
        <div class="news-content">{{detail.zhaiyao}}</div>
    </div>

  </div>
</template>

<script>
import axios from 'axios';

  export default{
      data(){
          return{
             detail:{}
          }
      },
      created(){

          let id=this.$route.query.id;
          //console.log(id);
          axios.get('../../static/newslist.json').
		  then(res=>{
               //console.log(res.data.message[id-13]);
               this.detail=res.data.message[id-13];
		   })
      }
  }
</script>

<style scoped>
.news-title p {
    color: #0a87f8;
    font-size: 20px;
    font-weight: bold;
}

.news-title span {
    height:12.9px;
    margin-right: 30px;
}

.news-title {
    margin-top: 5px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
}


/*主体文章的左右距离*/

.news-content {
    padding: 10 5;
}

</style>