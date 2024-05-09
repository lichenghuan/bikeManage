<template>
    <el-dialog v-model="dialogVisible" title="编辑" width="1000" @close="handleClose" 
        :close-on-click-modal="false">
        <el-form :model="form" ref="formRef" :rules="rules" label-width="120px">
            <el-collapse v-model="activeNames">
                <el-collapse-item title="主体信息" name="1">
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="id" prop="_id">
                                <el-input v-model="form._id" disabled></el-input>
                            </el-form-item>
                        </el-col>

                        <el-col :span="12">
                            <el-form-item label="所属品牌" prop="brandId">
                                <el-select v-model="form.brandId" filterable placeholder=" " style="width: 100%">
                                    <el-option v-for="item in brandsList" :key="item.value" :label="item.label"
                                        :value="item.value" />
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="名称" prop="name">
                                <el-input v-model="form.name" style="width:100%"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="价格" prop="price">
                                <el-input v-model="form.price" style="width:100%"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="分类" prop="classify">
                                <el-select v-model="form.classify" clearable placeholder=" " style="width: 100%">
                                    <el-option label="公路车" value="公路车" />
                                    <el-option label="山地车" value="山地车" />
                                    <el-option label="其他" value="其他" />
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="车架材料" prop="bikeFrame">
                                <el-input v-model="form.bikeFrame" style="width:100%"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="颜色" prop="overallColor">
                                <el-input v-model="form.overallColor" style="width:100%"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="尺寸" prop="size">
                                <el-input v-model="form.size" style="width:100%"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="速别" prop="speedClassify">
                                <el-input v-model="form.speedClassify" style="width:100%"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="车重" prop="weight">
                                <el-input v-model="form.weight" style="width:100%"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="前叉" prop="frontFork">
                                <el-input v-model="form.frontFork" style="width:100%"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="车把" prop="handlebars">
                                <el-input v-model="form.handlebars" style="width:100%"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="轮组材料" prop="wheelMaterial">
                                <el-input v-model="form.wheelMaterial" style="width:100%"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="备注（其他）" prop="remark">
                                <el-input v-model="form.remark" style="width:100%" type="textarea"></el-input>
                            </el-form-item>
                        </el-col>

                    </el-row>
                </el-collapse-item>
                <el-collapse-item title="变速系统" name="2">
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="前拨" prop="frontDerailleur">
                                <el-input v-model="form.frontDerailleur" style="width:100%"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="后拨" prop="rearDerailleur">
                                <el-input v-model="form.rearDerailleur" style="width:100%"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="手变" prop="shifter">
                                <el-input v-model="form.shifter" style="width:100%"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-collapse-item>
                <el-collapse-item title="传动系统" name="3">
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="中轴" prop="bottomBracket">
                                <el-input v-model="form.bottomBracket" style="width:100%"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="飞轮" prop="freewheel">
                                <el-input v-model="form.freewheel" style="width:100%"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="牙盘" prop="crankset">
                                <el-input v-model="form.crankset" style="width:100%"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="链条" prop="chain">
                                <el-input v-model="form.chain" style="width:100%"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-collapse-item>
                <el-collapse-item title="刹车系统" name="4">
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="刹车类型" prop="brakeType">
                                <el-select v-model="form.brakeType" clearable placeholder=" " style="width: 100%">
                                    <el-option label="圈刹" value="圈刹" />
                                    <el-option label="碟刹" value="碟刹" />
                                    <el-option label="其他" value="其他" />
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="花鼓" prop="hub">
                                <el-input v-model="form.hub" style="width:100%"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-collapse-item>
                <el-collapse-item title="主图（轮播图）" name="5">
                    <el-row>
                        <el-col :span="24">
                            <el-form-item prop="mainImglist">
                                <el-upload action="#" v-model:file-list="form.mainImglist" :multiple="true"
                                    list-type="picture-card" :on-preview="handlePictureCardPreview"
                                    :before-upload="beforeAvatarUpload">
                                    <el-icon class="avatar-uploader-icon">
                                        <Plus />
                                    </el-icon>
                                </el-upload>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-collapse-item>
                <el-collapse-item title="其他图片" name="6">
                    <el-row>
                        <el-col :span="24">
                            <el-form-item>
                                <el-upload action="#" v-model:file-list="form.otherImglist" :multiple="true"
                                    list-type="picture-card" :on-preview="handlePictureCardPreview"
                                    :before-upload="beforeAvatarUpload2">
                                    <el-icon class="avatar-uploader-icon">
                                        <Plus />
                                    </el-icon>
                                </el-upload>
                            </el-form-item>
                        </el-col>
                    </el-row>

                </el-collapse-item>
            </el-collapse>
        </el-form>
        <el-dialog v-model="imgdialogVisible">
            <img w-full :src="dialogImageUrl" alt="Preview Image" />
        </el-dialog>
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
import { Delete, Download, Plus, ZoomIn } from '@element-plus/icons-vue'
import type { UploadFile } from 'element-plus'
import type { UploadProps, UploadUserFile } from 'element-plus'

const formModel = {
    _id: '',
    name: '',
    classify: '',
    bikeFrame: '',
    wheelset: '',
    price: '',
    brandId: '',
    overallColor: '',
    size: '',
    speedClassify: '',
    weight: '',
    frontFork: '',
    handlebars: '',
    wheelMaterial: '',
    remark: '',
    frontDerailleur: '',
    rearDerailleur: '',
    shifter: '',
    bottomBracket: '',
    freewheel: '',
    crankset: '',
    chain: '',
    brakeType: '',
    hub: '',
    mainImglist: [{
        "fileID": '',
        "fileUrl": '',
        "name": '',
        "url": ''
    }],
    otherImglist: [{
        "fileID": '',
        "fileUrl": '',
        "name": '',
        "url": ''
    }],
}
let form = reactive(formModel);
const formRef = ref<InstanceType<typeof ElForm> | null>(null);
const rules = ref({
    name: [{ required: true, message: '必填项', trigger: 'blur' }],
    classify: [{ required: true, message: '必填项', trigger: 'blur' }],
    bikeFrame: [{ required: true, message: '必填项', trigger: 'blur' }],
    wheelset: [{ required: true, message: '必填项', trigger: 'blur' }],
    price: [{ required: true, message: '必填项', trigger: 'blur' }],
    brandId: [{ required: true, message: '必填项', trigger: 'blur' }],
    mainImglist: [{ required: true, message: '必填项', trigger: 'blur' }],
    brakeType: [{ required: true, message: '必填项', trigger: 'blur' }],
    speedClassify: [{ required: true, message: '必填项', trigger: 'blur' }],
});

const activeNames = ref(['1','2','3','4','5','6'])
const emit = defineEmits(['success', 'fail']); // 定义可以触发的事件 
const dialogVisible = ref(false);
const brandsList = ref([])
const imageUrl = ref('')
const dialogImageUrl = ref('')
// const mainImglist = ref([]);
const imgdialogVisible = ref(false)


const handlePictureCardPreview = (file: UploadFile) => {
    dialogImageUrl.value = file.url!
    imgdialogVisible.value = true
}


const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
    // if (rawFile.type !== 'image/jpeg') {
    //     ElMessage.error('Avatar picture must be JPG format!')
    //     return false
    // } else if (rawFile.size / 1024 / 1024 > 2) {
    //     ElMessage.error('Avatar picture size can not exceed 2MB!')
    //     return false
    // }
    // return true
    uploadImg(rawFile, 1)
}



const beforeAvatarUpload2: UploadProps['beforeUpload'] = (rawFile) => {
    // if (rawFile.type !== 'image/jpeg') {
    //     ElMessage.error('Avatar picture must be JPG format!')
    //     return false
    // } else if (rawFile.size / 1024 / 1024 > 2) {
    //     ElMessage.error('Avatar picture size can not exceed 2MB!')
    //     return false
    // }
    // return true
    uploadImg(rawFile, 2)
}

const uploadImg = (rawFile: any, uType: number) => {
    const reader = new FileReader();
    reader.readAsDataURL(rawFile);
    reader.onload = (e) => {
        // e.target.result 就是文件的 Base64 编码字符串  
        const base64Data = e.target.result;
        let cPath = `example/${new Date().getTime()}.png`
        window.$cloud.callFunction({
            name: 'uploadImage',
            data: {
                cloudPath: cPath,
                imageBase64: base64Data
            },
            success: (res: any) => {
                console.log(res);
                if (res.result.errMsg == 'uploadFile:ok') {
                    let resData = res.result;
                    let url = "https://636c-cloud1-5gadhcpyecc20c29-1325713285.tcb.qcloud.la/" + cPath;

                    if (uType == 1) {
                        form.mainImglist.push({
                            "fileID": resData.fileID,
                            "fileUrl": url,
                            "name": cPath,
                            "url": url
                        })
                    } else {
                        form.otherImglist.push({
                            fileID: resData.fileID,
                            fileUrl: url,
                            name: cPath,
                            url: url
                        })
                    }

                } else {
                    ElMessage.error('上传失败')
                }

            },
            fail: (err: any) => {
                console.log('fail');
                console.log(err);
                ElMessage.error('上传失败')
            }
        });
    };

}


const openDialog = (id: string = '') => {
    resetForm()
    getAllBrand();
    dialogVisible.value = true;
    if (id) {
        getBikeById(id);
    }
}

const getBikeById = (id) => {
    window.$cloud.callFunction({
        name: 'getBikeDataById',
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

const getAllBrand = () => {
    window.$cloud.callFunction({
        name: 'getBikeBrands',
        data: {
            page: 1,
            pageSize: 1000,
        },
        success: (res: any) => {
            if (res.result) {
                brandsList.value = res.result.data.map((item: any) => {
                    return {
                        value: item._id,
                        label: `${item.brandName}  |  ${item.brandAlias}`,
                    }
                })
            }
        }
    });
}

const handleClose = () => {

}

function submitForm() {
    formRef.value?.validate((valid) => {
        if (valid) {
            if (form._id) {   //编辑
                window.$cloud.callFunction({
                    name: 'editBikeInfo',
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
                    name: 'addBikeInfo',
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
.avatar-uploader .avatar {
    width: 178px;
    height: 178px;
    display: block;
}

.avatar-uploader .el-upload {
    border: 1px dashed var(--el-border-color);
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);
}
</style>