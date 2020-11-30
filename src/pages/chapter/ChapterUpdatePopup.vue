<template>
    <el-dialog :title="title" :visible.sync="dialogVisible">
        <el-form ref="form" :rules="rules" :model="form" label-width="120px" class="form">
            <el-form-item label="小节名称" prop="chapterName">
                <el-input v-model="form.chapterName"/>
            </el-form-item>
            <el-form-item label="小节描述" prop="chapterDesc">
                <el-input v-model="form.chapterDesc" type="textarea"/>
            </el-form-item>
            <el-form-item label="小节序号" prop="orderNum">
                <el-input v-model="form.orderNum"/>
            </el-form-item>
            <el-form-item label="上传小节图片" prop="courseCoverImageUrl">
                <upload-image @remove="imageRemove" @success="imageSuccess" v-model="form.materialsUrl"/>
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
import { chapterUpdate } from "@/api";
import UploadImage from '@/components/UploadImage/index.vue';

interface FormType {
    chapterName: string;
    id: number | null;
    chapterDesc: string;
    materialsUrl: string;
    materialsUrlId: number;
    creationTime: string;
    updateTime: string;
    courseId: any;
    catalogId: any;
    orderNum: number;
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
    private form: FormType = {
        id: null,
        chapterName: '',
        chapterDesc: '',
        materialsUrl: '',
        materialsUrlId: 0,
        creationTime: '',
        updateTime: '',
        courseId: '',
        catalogId: '',
        orderNum: 0
    };
    private title: string = '';
    private submitLoading: boolean = false;
    private rules = {
        chapterName: [
            { required: true, message: '请输入目录名称', trigger: 'blur' },
            { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
        ],
        orderNum: [
            { required: true, message: '请输入目录名称', trigger: 'blur' }
        ],
        chapterDesc: [
            { required: true, message: '请输入目录描述', trigger: 'blur' }
        ],
        materialsUrl: [
            { required: true, message: '请上传图片', trigger: 'change' }
        ]
    };

    created() {
        const { type } = this;
        const { courseId, catalogId } = this.$route.query;
        this.title = type === 'edit' ? '更新目录' : '创建目录';
        if (type === 'edit') {
            this.form = this.currentItem as any;
        }
        delete this.form.creationTime;
        delete this.form.updateTime;
        this.form.courseId = courseId;
        this.form.catalogId = catalogId;
    }

    private imageRemove() {
        this.form.materialsUrlId = 0;
        this.form.materialsUrl = '';
    }

    private imageSuccess(data: ImageDataType) {
        const {url, id} = data;
        this.form.materialsUrlId = id;
        this.form.materialsUrl = url;
    }

    private onSubmit(formName: string) {
        this.submitLoading = true;
        (this.$refs[formName] as any).validate((valid: boolean) => {
            if (valid) {
                chapterUpdate({courseChapterInfo: this.form}).then((res: any) => {
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
