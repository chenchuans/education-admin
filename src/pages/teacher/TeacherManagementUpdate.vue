<template>
    <div class="page">
        <h3>{{title}}</h3>
        <el-form ref="form" :rules="rules" :model="form" label-width="120px" class="form">
            <el-form-item label="老师姓名" prop="teacherName">
                <el-input v-model="form.teacherName"/>
            </el-form-item>
            <el-form-item label="老师手机号" prop="phoneNumber">
                <el-input v-model="form.phoneNumber"/>
            </el-form-item>
            <el-form-item label="登录用户名" prop="userName">
                <el-input v-model="form.userName"/>
            </el-form-item>
            <el-form-item label="登录密码" prop="passWord">
                <el-input v-model="form.passWord"/>
            </el-form-item>
            <el-form-item label="上传老师微信" prop="adminWeChatQRCode">
                <upload-image @remove="imageRemove" @success="imageSuccess" v-model="form.adminWeChatQRCode"/>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" :loading="submitLoading" @click="onSubmit('form')">{{submitLoading ? '提交中...' : '提交'}}</el-button>
                <el-button @click="onCancel">取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script lang="ts" scoped>
import { Component, Vue } from "vue-property-decorator";
import UploadImage from '@/components/UploadImage/index.vue';
import { saveTeacher } from "@/api";

interface FormType {
    teacherName: string;
    id: number | null;
    phoneNumber: string;
    adminWeChatQRCode: string;
    userName: string;
    passWord: string;
}

interface ImageDataType {
    url: '',
    id: number;
}

@Component({
    name: "CourseUpdate",
    components: { UploadImage }
})
export default class extends Vue {
    private form: FormType = {
        teacherName: '',
        phoneNumber: '',
        userName: '',
        id: null,
        passWord: '',
        adminWeChatQRCode:''
    };
    private title: string = '';
    private submitLoading: boolean = false;
    private rules = {
        teacherName: [
            { required: true, message: '请输入老师姓名', trigger: 'blur' },
            { min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur' }
        ],
        phoneNumber: [
            { required: true, message: '请输入老师手机号', trigger: 'blur' }
        ],
        userName: [
            { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        passWord: [
            { required: true, message: '请输入用户密码', trigger: 'blur' }
        ],
        adminWeChatQRCode: [
            { required: true, message: '请上传老师微信', trigger: 'change' },
        ]

    };

    created() {
        const { type } = this.$route.query;
        this.title = type === 'edit' ? '更新老师信息' : '创建老师信息';
        if (type === 'edit') {
            this.form = (JSON.parse(this.$route.query.editForm as any));
        }
    }

    private imageRemove() {
        this.form.adminWeChatQRCode = '';
    }

    private imageSuccess(data: ImageDataType) {
        this.form.adminWeChatQRCode = data.url;
    }

    private onSubmit(formName: string) {
        this.submitLoading = true;
        (this.$refs[formName] as any).validate((valid: boolean) => {
            if (valid) {
                saveTeacher({user: this.form}).then((res: any) => {
                    this.submitLoading = false;
                    if (res.code === 200) {
                        this.$message({
                            type: 'success',
                            message: '提交成功'
                        });
                        this.$router.go(-1);
                    } else if (res.code === 201) {
                        this.$message.error('提交失败!!');
                    }
                });
            } else {
                this.submitLoading = false;
                this.$message.error('错误提交!!');
                return false;
            }
        });
    }

    private onCancel() {
        this.$message({
            message: "已取消",
            type: "warning"
        });
        this.$router.go(-1);
    }
}
</script>

<style lang="scss" scoped>
.page {
    width: 100%;
    padding: 20px;
    box-sizing: border-box;
    .form {
        width: 600px;
    }
}
.line {
    text-align: center;
}
</style>
