<script setup lang="ts">
import Nav from '@/components/front/Nav.vue';
import Footer from '@/components/front/footer.vue';
import noticeBoard from '@/components/front/noticeBoard.vue';
import QuestionList from '@/views/problem/index.vue'
import { useRoute } from 'vue-router';

const route = useRoute()
</script>



<template>
  <Nav></Nav>
  <div class="common-layout">

    <RouterView :key="route.path">

    </RouterView>

    <Footer></Footer>
  </div>
</template>

<style scoped lang="scss">
.container {
  width: 3000px;
  height: 100%;
  display: flex;
  flex-direction: row;

}

.left,
.right {
  width: 10%;
}

.mid {
  width: 80%;

}

#sub-footer {
  text-shadow: none;
  color: #f5f5f5;
  background: #1b1b1b;
}

.copyright {
  text-align: left;
  font-size: 14px;
}

#sub-footer ul.social-network {
  float: right;
  list-style: none;
}

li {
  display: inline;
  margin-left: 10px;
}
</style>
