<template>
    <el-container>
        <el-aside width="5%">

        </el-aside>
        <el-container style="min-height: 105vh;">
            <el-header>

            </el-header>
            <el-main>
                <div class="common-layout">
                    <el-container>
                        <el-aside width="15%" style="margin-right: 5px;">
                            <el-row class="tac">
                                <el-col :span="24">
                                    <h3 class="mb-2">CodeSky 管理面板</h3>
                                    <el-menu default-active="/admin/setting" class="el-menu-vertical-demo"
                                        @open="handleOpen" router @close="handleClose">

                                        <el-menu-item index="/admin/setting">
                                            <el-icon>
                                                <DataLine />
                                            </el-icon>
                                            <span>站点信息</span>
                                        </el-menu-item>



                                        <el-sub-menu index="/admin/adminQuestionList">
                                            <template #title>
                                                <el-icon>
                                                    <QuestionFilled />
                                                </el-icon>
                                                <span>题目管理</span>
                                            </template>
                                            <el-menu-item index="/admin/adminQuestionList"><el-icon>
                                                    <Files />
                                                </el-icon>题目列表</el-menu-item>
                                            <el-menu-item index="/admin/addQuestion"><el-icon>
                                                    <FolderAdd />
                                                </el-icon>添加题目(xml文件)</el-menu-item>
                                            <el-menu-item index="/admin/editQuestionVue"><el-icon>
                                                    <FolderAdd />
                                                </el-icon>添加题目(手动录入)</el-menu-item>
                                        </el-sub-menu>

                                        <el-sub-menu index="/admin/adminMatchList">
                                            <template #title>
                                                <el-icon>
                                                    <Medal />
                                                </el-icon>
                                                <span>竞赛管理</span>
                                            </template>
                                            <el-menu-item index="/admin/adminMatchList"><el-icon>
                                                    <Files />
                                                </el-icon>竞赛列表</el-menu-item>
                                            <el-menu-item index="/admin/addMatch"><el-icon>
                                                    <FolderAdd />
                                                </el-icon>创建竞赛</el-menu-item>
                                        </el-sub-menu>
                                        <el-sub-menu index="/admin/adminUserList">
                                            <template #title>
                                                <el-icon>
                                                    <UserFilled />
                                                </el-icon>
                                                <span>用户管理</span>
                                            </template>
                                            <el-menu-item index="/admin/adminUserList"><el-icon>
                                                    <Files />
                                                </el-icon>用户列表</el-menu-item>
                                        </el-sub-menu>
                                    </el-menu>
                                </el-col>

                            </el-row>
                        </el-aside>
                        <el-main :style="{
                            boxShadow: `var(${getCssVarName('dark')})`,
                        }">
                            <router-view></router-view>
                        </el-main>
                    </el-container>
                </div>

            </el-main>
            <el-footer>
            </el-footer>
        </el-container>
        <el-aside width="5%"></el-aside>
    </el-container>
</template>
  
<script lang="ts" setup>
import {
    Menu as IconMenu,
    UserFilled,
    Medal,
    Files,
    QuestionFilled,
    DataLine,
    FolderAdd,
} from '@element-plus/icons-vue'
import { ref, onMounted } from 'vue'
import emitter from "@/lib/bus";
import { MittRouterNameSpace } from "@/lib/type";
import { useRouter } from "vue-router";
const router = useRouter()
const currentUrl = router.currentRoute.value.fullPath

console.log(currentUrl);

onMounted(() => {
    emitter.emit(MittRouterNameSpace.ChangeRouter, "/admin/setting");
})

const getCssVarName = (type: string) => {
    return `--el-box-shadow${type ? '-' : ''}${type}`
}
const handleOpen = (key: string, keyPath: string[]) => {
}
const handleClose = (key: string, keyPath: string[]) => {
}
</script>
  