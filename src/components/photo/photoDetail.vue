<template>
  <div>
    <navBar title="图文详情"></navBar>

     <div class="tmpl">
        <div class="photo-title">
            <p>{{photoDetail.title}}</p>
            <span>发起日期:{{photoDetail.addtime}}</span>
            <span>点击数:{{photoDetail.click}}</span>
            <span>分类:{{photoDetail.fenlei}}</span>
        </div>
        <ul class="mui-table-view mui-grid-view mui-grid-9">
             <!--
                 <img  class="preview-img"  height="100" @click="$preview.open(index,photoDetail.img)"    :src="photoDetail.img" alt=""/>
             -->
            <img :src="photoDetail.img" alt=""/>
        </ul>
        <div class="photo-desc">
            <p v-text="photoDetail.content"></p>
        </div>
    </div>

   <!-- 评论模块  -->
   <div class="tmpl">
        <div class="photo-bottom">
            <ul>
                <li class="photo-comment">
                    <div>
                        <span>提交评论</span>
                       
                    </div>
                </li>
                <li class="txt-comment">
                    <textarea v-model="msg"></textarea>
                </li>
                <li>
                    <button class="mint-button mint-button--primary mint-button--large is-plain"  @click="sendComment()">
                        <!----> <label class="mint-button-text" >评论发表</label>
                    </button>

                </li>
                <li class="photo-comment">
                    <div>
                        <span>评论列表</span>
                        <span>{{num}}条评论</span>
                    </div>
                </li>
            </ul>
            <ul class="comment-list">

                <li v-for="(conmments,index) in conmments" :key="index">
                    {{conmments.user_name}}：{{conmments.content}}  {{conmments.add_time}}
                </li>

            </ul>
        </div>
    </div>
 
    <!--评论提示框-->
    
  </div>
</template>

<script>
import axios from 'axios';
 export default{
     data(){
         return{
            photoDetail:{},//图文分享信息
            conmments:[],//评论信息
            msg:'',
            num:6
         }
     },
     created(){
         let pid=this.$route.params.id;
         axios.get('../../../static/photo/photoshare0.json').then(
             res=>{
                this.photoDetail=res.data.messages[pid-13];
             }
         )

         this.loadFrist();
     },
     methods:{
        loadFrist(){
            axios.get('../../../static/comments.json').
            then(res=>{
                this.conmments=res.data.messages;
            }).catch(
                err=>{
                    console.log(err);
                }
            )
        },
         //发表评论函数
        sendComment(){
            if(this.msg==''){
                alert("内容不能为空");
            }else{
                this.conmments.unshift({
                 "user_name": "匿名用户",
                 "add_time": "2017-12-5",
                 "content": this.msg,
                })
                this.msg='';
                this.num++;
            }
           
          /* axios.post('../../../static/comments.json','content='+this.msg).
           then(res=>{
               console.log(res);
           }).catch(err=>{
               console.log(err);
           })*/




        }
     }
 }
    
</script>
<style scoped>
li {
    list-style: none;
}

ul {
    margin: 0;
    padding: 0;
}

.photo-title {
    overflow: hidden;
}

.photo-title,
.photo-desc {
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
    padding-bottom: 5px;
    margin-bottom: 5px;
    padding-left: 5px;
}

.photo-title p {
    color: #13c2f7;
    font-size: 20px;
    font-weight: bold;
}

.photo-title span {
    margin-right: 20px;
}

.mui-table-view.mui-grid-view.mui-grid-9 {
    background-color: white;
    border: 0;
}

.mui-table-view.mui-grid-view.mui-grid-9 li {
    border: 0;
}

.photo-desc p {
    font-size: 18px;
}

.mui-table-view-cell.mui-media.mui-col-xs-4.mui-col-sm-3 {
    padding: 2 2;
}

.tmpl img{
    width: 360px;
    height: 200px;
    margin: 0;
    padding: 0;
}

.photo-comment > div span:nth-child(1) {
    float: left;
    font-weight: bold;
    margin-left: 5px;
}

.photo-comment > div span:nth-child(2) {
    float: right;
}

.photo-comment {
    height: 30px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.4);
    line-height: 30px;
    margin-bottom: 5px;
}

.txt-comment {
    padding: 5 5;
}

.txt-comment textarea {
    margin-bottom: 5px;
}

.comment-list li {
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
    padding-bottom: 5px;
    margin-bottom: 5px;
    padding-left: 5px;
}

li {
    list-style: none;
}

ul {
    margin: 0;
    padding: 0;
}

.photo-bottom{
    margin-bottom: 50.5px;
}

</style>