<script setup lang="ts">
import Nav from '@/components/front/Nav.vue';
import QuestionList from '@/views/problem/index.vue'
</script>

<template>
  <div class="common-layout">
    <el-container style="min-height: 100vh;">

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
        <div id="sub-footer">
          <div>
            <el-row>
              <el-col :span="12">
                <div class="copyright" style="margin-left: 20%;">

                  <p>&copy; CodeSky 2023 All right reserved.
                  </p>
                  <p>
                    桂ICP备 2023003399号-1
                  </p>
                </div>
              </el-col>
              <el-col :span="12">
                <ul class="social-network" style="margin-right: 20%;">
                  <li><a href="https://gitee.com/aa760303601_AA/SpringBoot_OnlineJudge_Systeam.git" data-placement="top"
                      target="_blank" title="github"><icon-github theme="outline" size="24"
                        fill="#f8f8f8"></icon-github></a></li>
                  <li><a href="http://t.csdn.cn/i7dyC" data-placement="top" title="CSDN"
                      target="_blank"><icon-topic-discussion theme="outline" size="24"
                        fill="#f8f8f8"></icon-topic-discussion></a></li>

                </ul>
              </el-col>
            </el-row>
          </div>
        </div>
      </el-footer>

      <!-- <el-footer style="background-color: black;color: white;">
<span style="display: flex;justify-content: center;">
  桂ICP备 2023003399号-1
</span>
</el-footer> -->
    </el-container>
  </div>
</template>

<style scoped>
.container {
  width: 100vw;
  height: 80vh;
  display: flex;
  flex-direction: row;

}

.left,
.right {
  width: 10vw;
}

.mid {
  width: 80vw;

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
}</style>
