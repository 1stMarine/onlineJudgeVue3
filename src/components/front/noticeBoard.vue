<template>
  <div class="w-95 mx-auto" style="position: absolute;bottom: 5px;right: 5px;left: 5px;">
    <div class="w-full shadow-2xl subpixel-antialiased rounded h-64 bg-black border-black mx-auto">
      <div class="flex items-center h-6 rounded-t bg-gray-100 border-b border-gray-500 text-center text-black"
        id="headerTerminal">
        <div class="flex ml-2 items-center text-center border-red-900 bg-red-500 shadow-inner rounded-full w-3 h-3"
          id="closebtn">
        </div>
        <div class="ml-2 border-yellow-900 bg-yellow-500 shadow-inner rounded-full w-3 h-3" id="minbtn">
        </div>
        <div class="ml-2 border-green-900 bg-green-500 shadow-inner rounded-full w-3 h-3" id="maxbtn">
        </div>
        <p class="text-center text-sm" style="margin: 3px;">公告栏</p>

      </div>
      <div class="pl-1 pt-1 h-auto  text-green-200 font-mono text-xs bg-black" id="console">
        <p class="pb-1"><span style="color:blueviolet ;">admin:</span> Wed Sep 25 09:11:04 on ttys002</p>
        <p class="pb-1"></p>
        <p class="pb-1"><span style="color:blueviolet ;">admin:</span> <span style="color:red ;">[关于开源试用、面试官访问] -->
          </span>开源试用、面试官可以使用试用账户登录，账户: <span style="color:aqua ;">user</span>, 密码:<span
            style="color:aqua;">12345678</span> <br>
          Open source trial, interviewers can log in using a trial account, account: <span
            style="color:aqua ;">user</span>, and password:<span style="color:aqua;">12345678</span></p>
        <p class="pb-1"><span style="color:blueviolet ;">admin:</span> <span style="color:red ;">[个人中心上线啦] -->
          </span>记录你的提交热力图，解题数量，快来体验吧</p>
        <p class="pb-1"><span style="color:blueviolet ;">admin:</span> <span style="color:red ;">[社区交流中心上线啦] -->
          </span>发布你的第一篇博客!</p>
      </div>
    </div>
  </div>

  <!-- <el-alert
  style="margin-bottom: 10px;"
    title=""
    type="info"
    effect="dark"
    description=""
    show-icon
    :closable="true"
  >
    <template #title>
      <span style="font-size: 25px;">
        关于开源试用、面试官访问
      </span>
    </template>
    <template #default>
      <span style="font-size: 15px;">
        开源试用、面试官可以使用试用账户登录，账户:  <span style="color:blue ;">user</span>, 密码:<span style="color:blue;">12345678</span> <br>
        Open source trial, interviewers can log in using a trial account, account:  <span style="color:blue ;">user</span>, and password:<span style="color:blue;">12345678</span>
      </span>
    </template>

  </el-alert> -->
</template>

<style>
.mx-auto {
  margin-top: 20px;
}
</style>