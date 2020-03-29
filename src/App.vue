<template>
  <div id="app">
    <!-- 如果不加控制会缓存所有的组件实例 -->
    <!-- 只有keep-alive包裹就会缓存所有的 -->
<keep-alive>
    <router-view   v-if="$route.meta.isAlive"/>
</keep-alive>
    <router-view   v-if="!$route.meta.isAlive"/>

  </div>
</template>

<style lang="less">

</style>
