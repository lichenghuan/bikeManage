<template>
    <div style='padding: 30px;box-sizing: border-box;'>
        <div>
            <el-button type="primary" @click="handleAdd()">新增</el-button>
        </div>
        <div style="padding: 20px 0;">
            <el-input v-model="queryForm.name" placeholder="自行车名称" style="width: 200px;margin-right: 20px;" />
            <el-button type="primary" @click="getData()">查询</el-button>
            <el-button type="primary" @click="resetForm()">重置</el-button>
        </div>

        <el-table :data="dataList" style="width: 100%" border>
            <el-table-column type="selection" fixed width="55" />
            <el-table-column type="index" label="序号" fixed width="80" />
            <el-table-column prop="_id" label="ID" />
            <el-table-column prop="name" label="自行车名称" />
            <el-table-column prop="brandId" label="所属品牌"  width="150">
                <template #default="scope">
                    <CustomTag :brandId="scope.row.brandId" :bikeBrands="bikeBrands" /> 
                </template>
            </el-table-column>
            <el-table-column prop="classify" label="分类" />
            <el-table-column prop="bikeFrame" label="车架材料" />
            <el-table-column prop="wheelset" label="轮组材料" />
            <el-table-column prop="price" label="价格" />
            <el-table-column prop="picture" label="图片">
                <template #default="scope" >
                    <div v-if="scope.row.mainImglist">
                        <el-image style="width: 100px; height: 100px" :src="scope.row.mainImglist[0].fileUrl" fit="contain" />
                    </div>
                </template>
            </el-table-column>

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
import CustomTag from '~/components/CustomTag.vue';
 

const dataList = ref([])
const pagination = ref({
    pageIndex: 1,
    pageSize: 10,
    total: 0
})

const queryForm = ref({
    name: '',
})

const bikeBrands = ref([])

const formDialogRef = ref<InstanceType<typeof FormDialog> | null>(null);


onMounted(() => {
    getAllBrand()
    getData()

    console.log(window.$cloud);
    
})


const getAllBrand = () => {
    window.$cloud.callFunction({
        name: 'getBikeBrands',
        data: {
            page: 1,
            pageSize: 1000,
        },
        success: (res: any) => {
            if (res.result) {
                bikeBrands.value = res.result.data.map((item: any) => {
                    return {
                        _id: item._id,    
                        brandName: `${item.brandName}  |  ${item.brandAlias}`,
                    }
                })
            }
        }
    });
}

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
        name: '',
    }
    getData()
}

const getData = () => {

    window.$cloud.callFunction({
        name: 'getAllBikeInfo',
        data: {
            ...pagination.value,
            ...queryForm.value
        },
        success: (res: any) => {
            console.log(res);

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
        name: 'delBikeInfo',
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