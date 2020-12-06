<template>
    <div class="tmpl">
        <navBar title="图文分享"></navBar>

        <!-- 引入返回导航 -->
        <div class="photo-header">
            <ul>
                <li v-for="(photoTitle,index) in photoTitle" :key="index">
                    
                    <a @click="dianji(index)">{{photoTitle.title}}</a>
                </li>
               
            </ul>
        </div>
          
        <!--信息集体显示-->
        <div class="photo-list">
            <ul>
                <li v-for="photoShare in photoShare" :key="photoShare.id">
                    <router-link :to="{name:'photodetail',params:{id:photoShare.id} }">
                        <img v-lazy="photoShare.img">
                        <p>
                            <span>{{photoShare.title}}</span>
                            <br>
                            <span>图片摘要</span>
                        </p>
                    </router-link >
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
  export default{
      data(){
          return{
              photoTitle:[],
              photoShare:[]

          }
      },
      methods:{
          
          lode(id){
               axios.get('../../../static/photo/photoshare'+id+'.json').
                then(res=>{
                 this.photoShare=res.data.messages;
                 console.log(res);
              })
          },

         dianji(index){
             this.lode(index);
         }
      },
      created(){
          axios.get('../../../static/photoshare.json').then(
              res=>{
                  this.photoTitle=res.data.messages;
                  this.photoTitle.unshift({
                      id:0,
                      title:'全部'
                  })
              }
          );
          this.lode(0);
      }
  }
</script>

<style>
.photo-header li {
    list-style: none;
    display: inline-block;
    margin-left: 10px;
    height: 30px;
}

.photo-header ul {
    /*强制不换行*/
    white-space: nowrap;
    overflow-x: auto;
    padding-left: 0px;
    margin: 5;
}


/*下面的图片*/

.photo-list li {
    list-style: none;
    position: relative;
}

.photo-list li img {
    width: 100%;
    height: 230px;
    vertical-align: top;
}

.photo-list ul {
    padding-left: 0px;
    margin: 0;
}

.photo-list p {
    position: absolute;
    bottom: 0px;
    color: white;
    background-color: rgba(0, 0, 0, 0.3);
    margin-bottom: 0px;
}

.photo-list p span:nth-child(1) {
    font-weight: bold;
    font-size: 16px;
}

.photo-header ul{
    margin: 0;
}
.tmpl{
    margin-bottom: 50.4px;
}


/*图片懒加载样式 */
image[lazy=loading] {
  width: 40px;
  height: 300px;
  margin: auto;
}


</style>
