<template>
    <el-dialog :title="title" :visible.sync="dialogVisible">
        <el-form ref="form" :rules="rules" :model="form" label-width="120px" class="form">
            <el-form-item label="内容类型" prop="contentType">
                <el-radio-group v-model="form.contentType">
                    <el-radio label="IMAGE">图片类型</el-radio>
                    <el-radio label="TEXT">文本类型</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item v-if="form.contentType === 'TEXT'" label="内容详情" prop="textContent">
                <el-input :rows="8" v-model="form.textContent" type="textarea"/>
            </el-form-item>
            <el-form-item v-if="form.contentType === 'IMAGE'" label="内容图片" prop="imageUrl">
                <upload-image @remove="imageRemove" @success="imageSuccess" v-model="form.imageUrl"/>
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
import { contentUpdate } from "@/api";
import UploadImage from '@/components/UploadImage/index.vue';

interface FormType {
    chapterId: any;
    courseId: any;
    catalogId: any;
    contentType: string;
    creationTime: string;
    id: number | null;
    imageUrl: string;
    imageUrlId: number;
    isFirstContent: boolean;
    preContentId: number;
    textContent: string;
    updateTime: string;
}

interface ImageDataType {
    url: string;
    id: number;
}

@Component({
    name: "chapterUpdate",
    components: { UploadImage }
})
export default class extends Vue {
    @Prop({ required: true }) private currentItem?: FormType;
    @Prop({ default: 'add' }) private type?: string;
    @Prop({ default: false }) private dialogVisible?: boolean;
    @Prop({ default: 0 }) private tableListLength?: number;
    private form: FormType = {
        chapterId: 0,
        courseId: 0,
        catalogId: 0,
        contentType: 'TEXT',
        creationTime: '',
        id: null,
        imageUrl: '',
        imageUrlId: 0,
        isFirstContent: false,
        preContentId: 0,
        textContent: '',
        updateTime: '',
    };
    private title: string = '';
    private submitLoading: boolean = false;
    private rules = {
        textContent: [
            { required: true, message: '请输入目录描述', trigger: 'blur' }
        ],
        imageUrl: [
            { required: true, message: '请上传图片', trigger: 'change' }
        ]
    };

    created() {
        const { type, tableListLength } = this;
        const { courseId, catalogId, chapterId } = this.$route.query;
        this.title = type === 'edit' ? '更新内容' : '创建内容';
        if (type === 'edit') {
            this.form = this.currentItem as any;
        } else if (type === 'add' && tableListLength === 0) {
            this.form.isFirstContent = true;
        }
        delete this.form.creationTime;
        delete this.form.updateTime;
        this.form.courseId = courseId;
        this.form.chapterId = chapterId;
        this.form.catalogId = catalogId;
    }

    private imageRemove() {
        this.form.imageUrlId = 0;
        this.form.imageUrl = '';
    }

    private imageSuccess(data: ImageDataType) {
        const {url, id} = data;
        this.form.imageUrlId = id;
        this.form.imageUrl = url;
    }

    private onSubmit(formName: string) {
        this.submitLoading = true;
        // (this.$refs[formName] as any).validate((valid: boolean) => {
            // if (valid) {
        if (this.form.contentType === 'TEXT') {
            this.imageRemove();
        } else {
            this.form.textContent = '';
        }
        contentUpdate({courseContentInfo: this.form}).then((res: any) => {
            this.submitLoading = false;
            this.$message({
                type: 'success',
                message: '提交成功'
            });
            this.$emit('submitSuccess');
        });
            // } else {
            //     this.submitLoading = false;
            //     this.$message.error('错误提交!!');
            //     return false;
            // }
        // });
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
