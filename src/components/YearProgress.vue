<template>
    <div class="progressbar">
        <progress :percent="percent" color="#EA5A49"></progress>
        <p>{{year}}年已经过去了{{days}}天，{{percent}}%</p>
    </div>
</template>

<script>
export default {
  methods: {
    isLeapYear () {
      const year = new Date().getFullYear()
      // 判断是否为闰年
      if (year % 400 === 0) {
        return true
      } else if (year % 4 === 0 && year % 100 !== 0) {
        return true
      } else {
        return false
      }
    },
    getDayOfYear () {
      return this.isLeapYear() ? 366 : 365
    }

  },
  computed: {
    year () {
      // 返回当前时间的年份
      return new Date().getFullYear()
    },
    days () {
      // 获取今年已经过去了多少天
      let start = new Date()
      start.setMonth(0)
      start.setDate(1)
      // start表示今年的1月1日
      // 今天的时间戳减去今年第一天的时间戳
      let offSet = new Date().getTime() - start.getTime()
      // console.log(offSet);
      return parseInt((offSet / 1000 / 60 / 60 / 24) + 1)
    },
    percent () {
      return (this.days / this.getDayOfYear() * 100).toFixed(1)
    }

  }

}
</script>

<style lang="scss">
.progressbar {
    width:100%;
    text-align: center;
    margin-top: 15px;
    margin-bottom: 50px;
    progress{
        margin-bottom: 15px;
    }
}
</style>


