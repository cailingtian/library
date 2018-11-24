<template>
    <div class="swiper">
        <swiper
            :indicator-dots = 'true'
            indicator-color = '#ccc'
            indicator-active-color = '#EA5A49'
            :autoplay = 'true'
            :interval = '5000'
            :duration = '500'
            :circular = 'true'
        >
            <div v-for="(top, imgIndex) in imgUrls"
                :key="imgIndex">
                <swiper-item>
                    <img 
                    class="slide-img" 
                    mode="aspectFit"
                    @click="bookDetail(img)" 
                    v-for="img in top"
                    :key="img.id"
                    :src="img.image">
                </swiper-item>
            </div>
        </swiper>
    </div>
</template>

<script>
export default {
    props: ['tops'],
    computed: {
        imgUrls () {
            //将9张图片数组切成3组，每组三张
            let res = this.tops;
            return [res.slice(0, 3), res.slice(3, 6), res.slice(6)]
        }
    },
    methods: {
        bookDetail (item) {
            wx.navigateTo({
                url: '/pages/detail/main?id=' + item.id
            })
        }
    }
}
</script>

<style lang='scss' scoped>
.swiper {
    margin-top: 5px;
    .slide-img {
        width: 33%;
        height: 250rpx;
    }
}

</style>


