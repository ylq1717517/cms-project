<template>
  <div>
    


    <!-- 轮播图-->
    


     <mt-swipe :auto="4000">
       <mt-swipe-item v-for="(img,index) in imgs" :key="index"> 
              <img :src="img.img" alt=""/>  
       </mt-swipe-item>
      
     </mt-swipe>
      <!--九宫格-->

      <div class="mui-content">
		        <ul class="mui-table-view mui-grid-view mui-grid-9">
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3" v-for="(imgs2,index) in imgs2" :key="index">
                  <router-link :to='{name:imgs2.name1}'>
                    <img :src="imgs2.img" alt="imgs2.img"/>
		                <div class="mui-media-body">
                      {{imgs2.name}}
                    </div>
                  </router-link>
                </li>
		        </ul> 
		</div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  data(){
    return{
      imgs:[],
      imgs2:[]
    }
  },
  created(){
    axios.get("../../static/lunbo.json").
	  then(res=>{
      console.log(res);
      this.imgs=res.data.message;
    })
    
    axios.get("../../static/night.json").
    then(res=>{
      console.log(res);
      this.imgs2=res.data.message;
    })
  }
}
</script>

<style scoped>
body{
  background-color: white;
}

.mint-swipe{
  height:200px;
}

.mint-swipe img{
  height:200px;
}

.mui-content img{
  height: 40.8px;
  width:40.8px;
}

.mui-grid-view.mui-grid-9{
  background-color:#fff;
}

.mui-grid-view.mui-grid-9 .mui-table-view-cell{
  border:0px;
}

.mui-content > .mui-table-view:first-child{
  border:0px;
}
</style>
