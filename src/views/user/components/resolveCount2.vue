<template>
    <div class="demo-progress">
        <el-form>
            <el-form-item label="简单">
                <el-progress :text-inside="true" :stroke-width="24" :percentage="100" status="success" />
            </el-form-item>
            <el-form-item label="中等"><el-progress :text-inside="true" :stroke-width="24" :percentage="80"
                    status="warning" /></el-form-item>

            <el-form-item label="困难">
                <el-progress :text-inside="true" :stroke-width="24" :percentage="50" status="exception" />


            </el-form-item>
            <el-form-item label="噩梦">
                <el-progress :text-inside="true" :stroke-width="24" :percentage="70" />
            </el-form-item>
        </el-form>

    </div>
</template>
  
<style scoped>
.demo-progress .el-progress--line {
    margin-bottom: 30px;
    width: 90%;
}




</style>