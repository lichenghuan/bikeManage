<template>
    <div style='padding: 30px;box-sizing: border-box;'>
        <div>
            <el-button type="primary" @click="handleAdd()">新增</el-button>
        </div>
        <div style="padding: 20px 0;">
            <el-input v-model="queryForm.brandName" placeholder="品牌名称" style="width: 200px;margin-right: 20px;" />
            <el-input v-model="queryForm.brandAlias" placeholder="品牌别名/英文名" style="width: 200px;margin-right: 20px;" />
            <el-button type="primary" @click="getData()">查询</el-button>
            <el-button type="primary" @click="resetForm()">重置</el-button>
        </div>

        <el-table :data="dataList" style="width: 100%" border>
            <el-table-column type="selection" fixed width="55" />
            <el-table-column type="index" label="序号" fixed width="80" />
            <el-table-column prop="_id" label="品牌ID" />
            <el-table-column prop="brandName" label="品牌名称" />
            <el-table-column prop="brandAlias" label="品牌别名/英文名" />
            <el-table-column prop="country" label="所属国家" />
            <el-table-column fixed="right" label="操作" width="200">
                <template #default="scope">
                    <el-button link type="primary" @click="handleEdit(scope.row._id)">
                        编辑
                    </el-button>
                    <el-popconfirm title="确定删除?" @confirm="handleDel(scope.row._id)">
                        <template #reference>
                            <el-button link type="primary">
                                删除
                            </el-button>
                        </template>
                    </el-popconfirm>
                </template>
            </el-table-column>
        </el-table>

        <el-pagination v-model:current-page="pagination.pageIndex" v-model:page-size="pagination.pageSize"
            style="padding: 20px 0;display: flex;justify-content: flex-end;" :page-sizes="[10, 20, 50, 100]"
            layout="total, sizes, prev, pager, next, jumper" background :total="pagination.total"
            @size-change="sizeChangeHandle" @current-change="currentChangeHandle" />

        <FormDialog ref="formDialogRef" @success="getData" />
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { ElMessage } from "element-plus";

import FormDialog from './form.vue';

const dataList = ref([])
const pagination = ref({
    pageIndex: 1,
    pageSize: 10,
    total: 0
})

const queryForm = ref({
    brandName: '',
    brandAlias: ''
})

const formDialogRef = ref<InstanceType<typeof FormDialog> | null>(null);


onMounted(() => {
    getData()
})

const sizeChangeHandle = (val: number) => {
    pagination.value.pageSize = val;
    getData()
}
const currentChangeHandle = (val: number) => {
    pagination.value.pageIndex = val;
    getData()
}

const resetForm = () => {
    queryForm.value = {
        brandName: '',
        brandAlias: ''
    }
    getData()
}

const getData = () => {
    window.$cloud.callFunction({
        name: 'getBikeBrands',
        data: {
            ...pagination.value,
            ...queryForm.value
        },
        success: (res) => {
            if (res.result) {
                dataList.value = res.result.data || [];
                pagination.value.total = res.result.totalCount || 0;
                pagination.value.pageIndex = res.result.pageIndex || 1;
                pagination.value.pageSize = res.result.pageSize || 10;
            }
        }
    });
}

const handleEdit = (id: string = '') => {
    if (formDialogRef.value) {
        formDialogRef.value.openDialog(id);
    }
}
const handleAdd = () => {
    if (formDialogRef.value) {
        formDialogRef.value.openDialog();
    }
}
const handleDel = (id: string = '') => {
    window.$cloud.callFunction({
        name: 'delBikeBrand',
        data: {
            _id: id
        },
        success: (res: any) => {
            if (res.result.success) {
                ElMessage.success('删除成功');
                getData()
            }
        }
    });
}

</script>




<style scoped></style>