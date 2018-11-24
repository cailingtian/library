<template>
  <div>
    <BookInfo :info='info'></BookInfo>
    <CommentList :comments="comments"></CommentList>
    <div class="comment" v-if="showAdd">
      <textarea v-model='comment'
      class="textarea"
      :maxlength="100"
      placeholder="请输入图书短评"
      ></textarea>

      <div class="location">
        地理位置：
        <switch color='#EA5A49' :checked='location' @change='getGeo'></switch>
        <span class="text-primary">{{location}}</span>
      </div>
      <div class="phone">
        手机型号：
        <switch color='#EA5A49' :checked='phone' @change='getPhone'></switch>
        <span class="text-primary">{{phone}}</span>
      </div>
      <button class="btn" @click="addComment">评论</button>
    </div>
    <div v-else class='text-footer'>
      未登录或者您已经评论过啦！
    </div>
  </div>
</template>
<script>
import {get, post, showModal, showSuccess} from '../../util';
import CommentList from '../../components/CommentList';
import BookInfo from '../../components/BookInfo';
export default {
  components: {
    BookInfo,
    CommentList
  },
  data(){
    return {
      userinfo: {},
      bookid:'',
      info: {},
      comment: '',
      phone: '',
      location: '',
      comments: []
    }
  },
   computed: {
    showAdd () {
      // 没登录
      if (!this.userinfo.openId) {
        return false
      }
      // 评论页面里查到有自己的openid
      if (this.comments.filter(v => v.openid === this.userinfo.openId).length) {
        return false
      }
      return true
    }
  },
  methods:{
     async addComment () {
      //验证是否输入了评论内容
      if (!this.comment) {
        return;
      } 
      //评论内容、手机型号、地理位置、图书id、用户的openid
      const data = {
        openid: this.userinfo.openId,
        bookid: this.bookid,
        comment: this.comment,
        phone: this.phone,
        location: this.location
      }
      console.log(data);
      //向后台发送数据
      try {
        await post('/weapp/addcomment', data);
        showSuccess('评论成功');
        this.comment = '';
      } catch(e) {
        showModal('评论失败', e.msg);        
      }
    },
    //获取评论列表
    async getComments () {
      const comments = await get('/weapp/commentslist', {bookid: this.bookid});
      this.comments = comments.list;
      console.log(this.comments);
    },
    //根据id获取图书详情数据
    async getDetail(){
      const info = await get('/weapp/bookdetail',{id:this.bookid});
      wx.setNavigationBarTitle({
        title: info.title
      });
      this.info = info;
      //console.log(info)
    },
    //获取地理位置
    getGeo (e) {
        //百度地图APIak码 RmKXCpjKlwyFUVVXSCXcLF4KUsOimuuy
        const ak = 'bBHLAizg4R4T8ZDfBlkPq6NxMlc4wupf'
        let url = 'http://api.map.baidu.com/geocoder/v2/'
        if (e.target.value) {
          wx.getLocation({
            success: geo => {
              wx.request({
                url,
                data: {
                  ak,
                  location: `${geo.latitude},${geo.longitude}`,
                  output: 'json'
                },
                success: res => {
                  console.log(res)
                  if (res.data.status === 0) {
                    this.location = res.data.result.addressComponent.city 
                                    + ' ' 
                                    + res.data.result.addressComponent.district;
                  } else {
                    this.location = '未知地点'
                    // console.log('出错了')
                  }
                }
              })
            }
          })
        } else {
          this.location = ''
        }
      },
      //获取手机型号
    getPhone (e) {
      if (e.target.value) {
        const phoneInfo = wx.getSystemInfoSync();
        //console.log(phoneInfo);
        this.phone = phoneInfo.model;
      } else {
        //没打开开关
        this.phone = '';
      }
    }
  },
  mounted(){
    this.bookid = this.$root.$mp.query.id;
    this.getDetail();
    this.getComments();
    const userinfo = wx.getStorageSync('userinfo');
    //console.log('userinfo', userinfo);
    if (userinfo) {
      this.userinfo = userinfo;
    } 
  }
}
</script>
<style lang='scss'>
.comment {
  margin-top: 10px;
  .textarea {
    background: #eee;
    padding: 10px;
    width: 730rpx;
    height: 200rpx;
  }
  .location {
    margin-top: 10px;
    padding: 5px 10px;
  }
  .phone {
    margin-top: 10px;
    padding: 5px 10px;
  }
}
</style>


