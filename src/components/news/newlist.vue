<template>
  <div>
      

      <navBar title="新闻列表"></navBar>
      <!--  图文列表     -->
      <div class="tmpl">
        <ul class="mui-table-view">
            <li class="mui-table-view-cell mui-media" v-for="newslist in newslist" :key="newslist.id">
                <router-link :to="{name:'newsdetail',query:{id:newslist.id}}">
                    <img class="mui-media-object mui-pull-left" :src="newslist.img">
                    <div class="mui-media-body">
                        <span v-text="newslist.title"></span>
                        <div class="news-desc">
                            <p>点击数：{{newslist.click}}</p>
                            <p>发表时间：{{newslist.addtime}}</p>
                        </div>
                    </div>
                </router-link>
            </li>
        </ul>
    </div>
  </div>

</template>

<script>
import axios from 'axios';
   export default{
	   data(){
		   return {
               newslist:[]
		   }
	   },
	   created() {
		   axios.get('../../static/newslist.json').
		   then(res=>{
               console.log(res);
               this.newslist=res.data.message;
		   })

	   }
   }
</script>

<style scoped>
.tmpl{
  margin-bottom: 50.5px;

}

.mui-table-view{
    overflow:auto;
}

.mui-media-body p {
    color: #0bb0f5;
}

.news-desc p:nth-child(1) {
    float: left;
}

.news-desc p:nth-child(2) {
    width:144px;
    float: right;
    overflow:hidden;
}
</style>>



