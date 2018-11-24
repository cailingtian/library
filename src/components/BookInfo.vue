<template>
    <div class="bookInfo">
        <div class="thumb">
             <img 
             class="back-img" 
             :src="info.image"
             mode="scaleToFill">

             <img 
             class="img" 
             :src="info.image"
             mode="aspectFit">

             <div class="info">
                 <div class="title">
                     {{info.title}}
                 </div>
                 <div class="author">
                     {{info.author}}
                 </div>
             </div>
        </div>
        <div class="detail">
            <img :src="userinfo.image" class='avatar' mode='aspectFit'>
            {{userinfo.nickName}}
            <div class="right text-primary">
                {{info.rate}}分 
                <Rate :value='info.rate'></Rate>
            </div>
        </div>
        <div class="detail">
            {{info.publisher}}
             <div class="right">
                {{info.price}}
            </div>
        </div>
        <div class="tags">
            <div class="badge" v-for="tag in info.tags" :key="tag">{{tag}}</div>
        </div>
        <div class="summary">
            <p v-for="(sum, i) in info.summary" :key="i">{{sum}}</p>
        </div>
    </div>
</template>

<script>
import Rate from './Rate'
export default {
    components: {
        Rate
    },
    props: ['info'],
     computed: {
        userinfo () {
            return this.info.user_info || {}
        }
    }
}  
</script>


<style lang='scss'>
.bookInfo { 
    font-size: 14px;
    .badge {
        display: inline-block;
        margin: 5px;
        border: 1px solid #EA5A49;
        border-radius: 10px;
        text-align: center;
        padding: 5px;
        color: #EA5A49;
    }
    .summary {
        padding: 0 10px;
        margin-top: 10px;
        p {
            text-indent: 2em;
            font-size: 14px;
        }
    }
    .detail {
        padding: 5px 10px;
        .avatar {
            width: 20px;
            height: 20px;
            border-radius: 50%;
            vertical-align: middle;
        }
        .right {
            float: right;
        } 
    }
    .thumb {
        width: 750rpx;
        height: 500rpx;
        overflow: hidden;
        .back-img {
            filter: blur(15px);
            width: 100%;
        }
        .img {
            position: absolute;
            width: 100%;
            height: 300rpx;
            left: 0;
            top: 30rpx;
        }
       .info{
            color:white;
            position: absolute;
            width:100%;
            left:0;
            top:330rpx;
            text-align: center;
            .title{
                font-size:20px;
            }
            .author{
                font-size: 14px;
            }
        }
    }
}
</style>

