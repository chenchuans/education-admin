<template>
    <div class="page">
        <h3>{{title}}</h3>
        <el-form ref="form" :rules="rules" :model="form" label-width="120px" class="form">
            <el-form-item label="目录名称" prop="courseName">
                <el-input v-model="form.courseName"/>
            </el-form-item>
            <el-form-item label="目录描述" prop="descContent">
                <el-input v-model="form.descContent" type="textarea"/>
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
import { catalogUpdate } from "@/api";

interface FormType {
    catalogName: string;
    id: number | null;
    catalogDescContent: string;
    creationTime: string;
    updateTime: string;
    courseId: any;
}

@Component({
    name: "CatalogUpdate"
})
export default class extends Vue {
    private form: FormType = {
        id: null,
        catalogName: '',
        catalogDescContent: '',
        creationTime: '',
        updateTime: '',
        courseId: this.$route.query.courseId
    };
    private title: string = '';
    private submitLoading: boolean = false;
    private rules = {
        catalogName: [
            { required: true, message: '请输入目录名称', trigger: 'blur' },
            { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
        ],
        catalogDescContent: [
            { required: true, message: '请输入目录描述', trigger: 'blur' }
        ]

    };

    created() {
        const { type } = this.$route.query;
        this.title = type === 'edit' ? '更新目录' : '创建目录';
        if (type === 'edit') {
            this.form = (JSON.parse(this.$route.query.editForm as any));
        }
        delete this.form.creationTime;
        delete this.form.updateTime;
    }

    private onSubmit(formName: string) {
        this.submitLoading = true;
        (this.$refs[formName] as any).validate((valid: boolean) => {
            if (valid) {
                catalogUpdate({cataloInfo: this.form}).then((res: any) => {
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
