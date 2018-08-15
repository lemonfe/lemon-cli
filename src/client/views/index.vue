<template>
  <div class="main">
    <h1>lemon-cli</h1>
    <h4 class="github-address">GitHub： <a href="https://github.com/lemonfe/lemon-cli" target="_blank">https://github.com/lemonfe/lemon-cli</a></h4>
    <h4 class="github-address">演示地址： <a href="http://www.overape.com/" target="_blank">http://www.overape.com</a></h4>
    <div class="content" v-html="blogDetail.html"></div>
    </div>
</template>

<script>
import {
  mapState,
  mapMutations,
  mapActions
} from 'vuex'

export default {
  metaInfo: {
    title: 'lemon-cli'
  },
  data () {
    return {
    }
  },
  asyncData ({store, router}) {
    return store.dispatch('fetchBlogDetail', {id: 2})
  },
  mounted () {
    if (this.blogDetail === '') {
      this.fetchBlogDetail({id: 1})
    }
  },
  methods: {
    ...mapMutations(['clearBlogDetail']),
    ...mapActions(['fetchBlogDetail'])
  },
  computed: {
    ...mapState(['blogDetail'])
  },
  beforeRouteLeave (to, from, next) {
    this.clearBlogDetail()
    next()
  }
}
</script>

<style lang="scss" scoped>
  .main {
    width: 800px;
    margin: auto;
    padding: 20px;
    h2 {
      line-height: 50px;
    }
  }
</style>


