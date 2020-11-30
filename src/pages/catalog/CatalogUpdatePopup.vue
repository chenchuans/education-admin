<template>
    <el-dialog :title="title" :visible.sync="dialogVisible">
        <el-form ref="form" :rules="rules" :model="form" label-width="120px" class="form">
            <el-form-item label="目录名称" prop="catalogName">
                <el-input v-model="form.catalogName"/>
            </el-form-item>
            <el-form-item label="目录序号" prop="orderNum">
                <el-input v-model="form.orderNum"/>
            </el-form-item>
            <el-form-item label="目录描述" prop="catalogDescContent">
                <el-input v-model="form.catalogDescContent" type="textarea"/>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" :loading="submitLoading" @click="onSubmit('form')">{{submitLoading ? '提交中...' : '提交'}}</el-button>
                <el-button @click="onCancel">取消</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>

<script lang="ts" scoped>
import { Component, Vue, Prop } from "vue-property-decorator";
import { catalogUpdate } from "@/api";

interface FormType {
    catalogName: string;
    id: number | null;
    catalogDescContent: string;
    creationTime: string;
    updateTime: string;
    courseId: any;
    orderNum: number;
}

@Component({
    name: "CatalogUpdate"
})
export default class extends Vue {
    @Prop({ required: true }) private currentItem?: FormType;
    @Prop({ default: 'add' }) private type?: string;
    @Prop({ default: false }) private dialogVisible?: boolean;
    private form: FormType = {
        id: null,
        catalogName: '',
        catalogDescContent: '',
        creationTime: '',
        updateTime: '',
        courseId: '',
        orderNum: 0
    };
    private title: string = '';
    private submitLoading: boolean = false;
    private rules = {
        catalogName: [
            { required: true, message: '请输入目录名称', trigger: 'blur' },
            { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
        ],
        orderNum: [
            { required: true, message: '请输入目录序号', trigger: 'blur' }
        ],
        catalogDescContent: [
            { required: true, message: '请输入目录描述', trigger: 'blur' }
        ]

    };

    created() {
        const { type } = this;
        this.title = type === 'edit' ? '更新目录' : '创建目录';
        if (type === 'edit') {
            this.form = this.currentItem as any;
        }
        delete this.form.creationTime;
        delete this.form.updateTime;
        this.form.courseId = this.$route.query.courseId;
    }

    private onSubmit(formName: string) {
        this.submitLoading = true;
        (this.$refs[formName] as any).validate((valid: boolean) => {
            if (valid) {
                catalogUpdate({courseCatalogInfo: this.form}).then((res: any) => {
                    this.submitLoading = false;
                    this.$message({
                        type: 'success',
                        message: '提交成功'
                    });
                    this.$emit('submitSuccess');
                });
            } else {
                this.submitLoading = false;
                this.$message.error('错误提交!!');
                return false;
            }
        });
    }

    private onCancel() {
        this.$emit('submitSuccess', 'cancel');
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
