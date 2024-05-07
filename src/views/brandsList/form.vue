<template>
    <el-dialog v-model="dialogVisible" title="编辑" width="1000" @close="handleClose" draggable :close-on-click-modal="false">
        <el-form :model="form" ref="formRef" :rules="rules" label-width="120px">
            <el-row>
                <el-col :span="12">
                    <el-form-item label="品牌ID" prop="_id">
                        <el-input v-model="form._id" disabled></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="品牌中文名称" prop="brandName">
                        <el-input v-model="form.brandName" style="width:100%"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="品牌别名/英文名" prop="brandAlias">
                        <el-input v-model="form.brandAlias" style="width:100%"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="所属国家" prop="country">
                        <el-input v-model="form.country" style="width:100%"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="dialogVisible = false">取消</el-button>
                <el-button type="primary" @click="submitForm">提交</el-button>
            </div>
        </template>
    </el-dialog>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { ElMessage } from "element-plus";

import { defineEmits } from 'vue';

const emit = defineEmits(['success', 'fail']); // 定义可以触发的事件 

const dialogVisible = ref(false);


const formModel = {
    _id: '',
    brandName: '',
    brandAlias: '',
    country: '',
}
let form = reactive(formModel);

const formRef = ref<InstanceType<typeof ElForm> | null>(null);
const rules = ref({
    brandName: [{ required: true, message: '必填项', trigger: 'blur' }],
    brandAlias: [{ required: true, message: '必填项', trigger: 'blur' }],
    country: [{ required: true, message: '必填项', trigger: 'blur' }],
});

const openDialog = (id: string = '') => {
    resetForm()
    dialogVisible.value = true;
    if (id) {
        getBrandById(id);
    }
}

const getBrandById = (id) => {
    window.$cloud.callFunction({
        name: 'getBrandById',
        data: {
            _id: id,
        },
        success: (res: any) => {
            if (res.result) {
                Object.assign(form, res.result);
            }
        }
    });
}

const handleClose = () => {
    console.log('弹窗关闭');

}

function submitForm() {
    formRef.value?.validate((valid) => {
        if (valid) {
            if (form._id) {   //编辑
                window.$cloud.callFunction({
                    name: 'editBikeBrand',
                    data: form,
                    success: (res: any) => {
                        if (res.result.success) {
                            dialogVisible.value = false;
                            ElMessage.success('编辑成功')
                            emit('success');
                            console.log(res);

                        }
                    }
                });
            } else {  //新增
                window.$cloud.callFunction({
                    name: 'addBikeBrand',
                    data: form,
                    success: (res: any) => {
                        if (res.result.success) {
                            dialogVisible.value = false;
                            ElMessage.success('新增成功')
                            emit('success');
                        }
                    }
                });
            }
        }
    });
}


function resetForm() {
    // 遍历表单对象的每个键  
    for (const key in form) {
        form[key] = '';
    }
}


defineExpose({
    openDialog
});
</script>

<style scoped>
/* 在这里添加组件的样式 */
</style>