<template>
    <div class="page">
        <h3>{{title}}</h3>
        <el-form ref="form" :rules="rules" :model="form" label-width="120px" class="form">
            <el-form-item label="课程名称" prop="courseName">
                <el-input v-model="form.courseName"/>
            </el-form-item>
            <el-form-item label="课程描述" prop="descContent">
                <el-input v-model="form.descContent" type="textarea"/>
            </el-form-item>
            <el-form-item label="原价" prop="coursePrice">
                <el-input v-model="form.coursePrice"/>
            </el-form-item>
            <el-form-item label="优惠价" prop="specialPrice">
                <el-input v-model="form.specialPrice"/>
            </el-form-item>
            <el-form-item label="老师姓名" prop="teacherName">
                <el-input v-model="form.teacherName"/>
            </el-form-item>
            <el-form-item label="老师描述" prop="teacherDesc">
                <el-input v-model="form.teacherDesc" type="textarea"/>
            </el-form-item>
            <el-form-item label="上传封面" prop="courseCoverImageUrl">
                <upload-image @remove="imageRemove" @success="imageSuccess" v-model="form.courseCoverImageUrl"/>
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
import { courseUpdate } from "@/api";

interface FormType {
    courseName: '',
    id: number | null;
    descContent: '',
    teacherName: '',
    courseCoverImageUrlId: number;
    courseCoverImageUrl: '',
    creationTime: '',
    updateTime: '',
    specialPrice: '',
    coursePrice: '',
    teacherDesc: '',
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
        courseName: '',
        id: null,
        descContent: '',
        teacherName: '',
        courseCoverImageUrlId: 0,
        courseCoverImageUrl:'',
        creationTime: '',
        updateTime: '',
        specialPrice: '',
        coursePrice: '',
        teacherDesc: ''
    };
    private title: string = '';
    private submitLoading: boolean = false;
    private rules = {
        courseName: [
            { required: true, message: '请输入课程名称', trigger: 'blur' },
            { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
        ],
        descContent: [
            { required: true, message: '请输入课程描述', trigger: 'blur' }
            // { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
        ],
        teacherName: [
            { required: true, message: '请输入老师姓名', trigger: 'blur' },
            { min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur' }
        ],
        teacherDesc: [
            { required: true, message: '请输入老师描述', trigger: 'blur' }
        ],
        specialPrice: [
            { required: true, message: '请输入优惠价', trigger: 'blur' }
        ],
        coursePrice: [
            { required: true, message: '请输入原价', trigger: 'blur' }
        ],
        courseCoverImageUrl: [
            { required: true, message: '请上传封面图片', trigger: 'change' },
        ]

    };

    created() {
        const { type } = this.$route.query;
        this.title = type === 'edit' ? '更新课程' : '创建课程';
        if (type === 'edit') {
            this.form = (JSON.parse(this.$route.query.editForm as any));
        }
        delete this.form.creationTime;
        delete this.form.updateTime;
    }

    private imageRemove() {
        this.form.courseCoverImageUrlId = 0;
        this.form.courseCoverImageUrl = '';
    }

    private imageSuccess(data: ImageDataType) {
        const {url, id} = data;
        this.form.courseCoverImageUrlId = id;
        this.form.courseCoverImageUrl = url;
    }

    private onSubmit(formName: string) {
        this.submitLoading = true;
        (this.$refs[formName] as any).validate((valid: boolean) => {
            if (valid) {
                courseUpdate({courseInfo: this.form}).then((res: any) => {
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
