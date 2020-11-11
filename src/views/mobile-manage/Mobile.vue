<template>
  <div  class="app-wrapper">
      <MobileMain />
  </div>
</template>

<script>
import  MobileMain  from './MobileMain'
import ResizeMixin from './mixin/ResizeHandler'

export default {
  name: 'Mobile',
  components: {
    MobileMain
  },
  mixins: [ResizeMixin],
  computed: {
    // sidebar() {
    //   return this.$store.state.app.sidebar
    // },
    device() {
      return this.$store.state.app.device
    },
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === 'mobile'
      }
    }

  },
  methods: {
    handleClickOutside() {
      this.$store.dispatch('closeSideBar', { withoutAnimation: false })
    }
  }

}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "~@/styles/mixin.scss";
  .app-wrapper {
    @include clearfix;
    background-color: aliceblue;
    position: relative;
    height: 100%;
    width: 100%;
  }
  .drawer-bg {
    background: #000;
    opacity: 0.3;
    width: 100%;
    top: 0;
    height: 100%;
    position: absolute;
    z-index: 999;
  }
</style>
