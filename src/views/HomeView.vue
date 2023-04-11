<script setup lang="ts">
import Nav from '@/components/front/Nav.vue';
import QuestionList from '@/views/problem/index.vue'
</script>

<template>



  <el-container>

<el-header>
  <Nav></Nav>
</el-header>
<el-main class="container">
  <div class="left"></div>
  <div class="mid">
    <RouterView>
      
    </RouterView>
  </div>
  <div class="right"></div>
</el-main>
<el-footer>

</el-footer>
</el-container>
</template>

<style scoped>
.container{
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: row;
}
.left ,.right{
width: 10vw;
}
.mid{
  width: 80vw;

}

</style>
