<template>
    <div class="container">
        <CommentList 
        v-if="userinfo.openId"
        type="user" 
        :comments="comments"
        ></CommentList>

        <div v-if="userinfo.openId">
            <div class="page-title">
                我的图书
            </div>
            <Card 
            v-for="book in books" 
            :key="book.id"
            :book = 'book'></Card>
            <div v-if="!books.length">暂时还没添加过书，快去添加几本吧</div>
        </div>
    </div>
</template>

<script>
import CommentList from '../../components/CommentList';
import Card from '../../components/Card';
import { get } from '../../util'
export default {
    components: {
        CommentList,
        Card
    },
    data () {
        return {
            comments: [],
            userinfo: {},
            books: []
        }
    },
    methods: {
        init () {
            wx.showNavigationBarLoading();
            this.getComments();
            this.getBooks();
            wx.hideNavigationBarLoading();
        },
        async getComments () {
        const comments = await get('/weapp/commentslist', {
            openid: this.userinfo.openId
        });
        this.comments = comments.list;
        console.log(this.comments);
        },
        async getBooks () {
            const books = await get('/weapp/booklist', {
                openid: this.userinfo.openId
            });
            this.books = books.list;
        }
    },
    onPullDownRefresh () {
        this.init();
        wx.stopPullDownRefresh();
    },
    onShow () {
        if (!this.userinfo.openId) {
            let userinfo = wx.getStorageSync('userinfo');
            if (userinfo) {
                this.userinfo = userinfo;
                this.init();
            }
        }
    },


}
</script>

<style lang = 'scss' scoped>
    .page-title {
       padding: 10px;
       font-size: 17px;
       background:#eee;
    }
</style>

