<template>
    <div id="app">
      <router-view></router-view>
    </div>
</template>

<script>
export default {
  metaInfo: {
    title: 'lemon-cli'
  }
}
</script>

<style lang="stylus" scoped>
#app {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}
</style>
