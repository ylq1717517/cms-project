<template>
  <div>
    <!-- 头部内容-->

    <mt-header title="信息管理系统"></mt-header>
    
    <router-view>     </router-view>
    
    <!-- 底部内容-->
    <nav class="mui-bar mui-bar-tab">
			<router-link class="mui-tab-item " :to="{name:'home'}">
				<span class="mui-icon mui-icon-home-filled"></span>
				<span class="mui-tab-label">首页</span>
			</router-link>
      <router-link class="mui-tab-item"  :to="{name:'member'}">
				<span class="mui-icon mui-icon-contact">  </span>
				<span class="mui-tab-label">会员</span>
			</router-link>
			<router-link class="mui-tab-item"  :to="{name:'shopcart'}">
				<span class="mui-icon mui-icon-list">   <span class="mui-badge">{{pickNum}}</span>  </span>
				<span class="mui-tab-label">购物车</span>
			</router-link>
			<router-link class="mui-tab-item" :to="{name:'search'}">
				<span class="mui-icon mui-icon-search"></span>
				<span class="mui-tab-label">查找</span>
			</router-link>
		</nav>

  </div>
</template>

<script>
import connect from './components/common/connect.js'; 
export default {
  data(){
    return{
      pickNum:''
    }
  },
  created(){




	 connect.$on('addShopcart',number=>{
		// this.pickNum=Number(this.pickNum) + number;
		this.pickNum = number;
	 })
  }
}
</script>

<style scoped>

.mui-bar{
	position:fixed;
	margin-bottom: 0px;
}
.mui-bar .mui-bar-tab{
	margin-bottom: 0px;
}

</style>>

