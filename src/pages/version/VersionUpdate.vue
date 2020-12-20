<template>
    <div class="page">
        <h3>{{title}}</h3>
        <el-form ref="form" :rules="rules" :model="form" label-width="120px" class="form">
            <el-form-item label="版本名称" prop="versionName">
                <el-input v-model="form.versionName"/>
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
import { versionUpdate } from "@/api";

interface FormType {
    id: number | null;
    versionName: string;
}

interface ImageDataType {
    url: '',
    id: number;
}

@Component({
    name: "VersionUpdate"
})
export default class extends Vue {
    private form: FormType = {
        versionName: '',
        id: null
    };
    private title: string = '';
    private submitLoading: boolean = false;
    private rules = {
        versionName: [
            { required: true, message: '请输入版本名字', trigger: 'blur' },
            { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
        ]

    };

    created() {
        const { type } = this.$route.query;
        this.title = type === 'edit' ? '更新版本' : '创建版本';
        if (type === 'edit') {
            this.form = (JSON.parse(this.$route.query.editForm as any));
        }
    }

    private onSubmit(formName: string) {
        this.submitLoading = true;
        (this.$refs[formName] as any).validate((valid: boolean) => {
            if (valid) {
                const { versionName, id } = this.form;
                const { courseId } = this.$route.query;
                versionUpdate({courseVersionInfo: {
                    courseId: +courseId, versionName, id
                }}).then((res: any) => {
                    this.submitLoading = false;
                    this.$message({
                        type: 'success',
                        message: '提交成功'
                    });
                    this.$router.go(-1);
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
