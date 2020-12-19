<template>
    <div class="page">
        <h3>{{title}}</h3>
        <el-form ref="form" :rules="rules" :model="form" label-width="120px" class="form">
            <el-form-item label="学期名称" prop="semesterName">
                <el-input v-model="form.semesterName" />
            </el-form-item>
            <el-form-item label="学期描述" prop="semesterDesc">
                <el-input v-model="form.semesterDesc" />
            </el-form-item>
            <el-form-item label="学期编号" prop="orderNum">
                <el-input v-model="form.orderNum" />
            </el-form-item>
            <el-form-item label="学期成员数" prop="hairCount">
                <el-input v-model="form.hairCount" />
            </el-form-item>
            <el-form-item label="当前课程" prop="courseId">
                <el-select v-model="form.courseId" filterable placeholder="请选择">
                    <el-option
                        v-for="item in courseList"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                    ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="老师姓名" prop="teacherId">
                <el-select v-model="form.teacherId" filterable placeholder="请选择">
                    <el-option
                        v-for="item in teacherList"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                    ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="开始截止时间" prop="startTime">
                <el-date-picker
                    v-model="time"
                    type="datetimerange"
                    :picker-options="pickerOptions"
                    range-separator="至"
                    start-placeholder="开始时间"
                    end-placeholder="截止时间"
                    align="right"
                    @change="dateChange"
                />
            </el-form-item>
            <el-form-item>
                <el-button
                    type="primary"
                    :loading="submitLoading"
                    @click="onSubmit('form')"
                >{{submitLoading ? '提交中...' : '提交'}}</el-button>
                <el-button @click="onCancel">取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script lang="ts" scoped>
import { Component, Vue } from "vue-property-decorator";
import { getCourseSelect, getTeacherSelect, saveSemester } from "@/api";

interface FormType {
    id: number | null;
    courseId: number;
    teacherId: number;
    orderNum: number;
    hairCount: number;
    startTime: number;
    endTime: number;
    semesterName: string;
    semesterDesc: string;
}

@Component({
    name: "SemesterManagementUpdate"
})
export default class extends Vue {
    private form: FormType = {
        id: null,
        courseId: 0,
        teacherId: 0,
        orderNum: 0,
        hairCount: 0,
        startTime: 0,
        endTime: 0,
        semesterName: '',
        semesterDesc: ''
    };
    private time: any[] = [];
    private title: string = '';
    private submitLoading: boolean = false;
    private courseList: [] = [];
    private teacherList: [] = [];
    private rules = {
        orderNum: [
            { required: true, message: '请输入老师姓名', trigger: 'blur' }
        ],
        hairCount: [
            { required: true, message: '请输入学期人数', trigger: 'blur' }
        ],
        semesterName: [
            { required: true, message: '请输入学期名称', trigger: 'blur' }
        ]
    };
    private pickerOptions = {
            shortcuts: [
                {
                    text: '最近一天',
                    onClick(picker: any) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 1);
                        picker.$emit('pick', [start, end]);
                    }
                },
                {
                    text: '最近三天',
                    onClick(picker: any) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 3);
                        picker.$emit('pick', [start, end]);
                    }
                },
                {
                    text: '最近一周',
                    onClick(picker: any) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                        picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '最近一个月',
                    onClick(picker: any) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                        picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '最近三个月',
                    onClick(picker: any) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                        picker.$emit('pick', [start, end]);
                    }
                }
            ]
    };

    created() {
        this.getCourseSelect();
        this.getTeacherSelect();
        const { type } = this.$route.query;
        this.title = type === 'edit' ? '更新课程期数' : '创建课程期数';
        if (type === 'edit') {
            this.form = (JSON.parse(this.$route.query.editForm as any));
            const {startTime, endTime} =  this.form;
            this.time = [startTime, endTime];
        }
    }

    private getCourseSelect() {
        getCourseSelect({}).then((res: any) => {
            if (res.code === 200) {
                this.courseList = res.data.map((item: any) => {
                    const {courseName, id} = item;
                    return {value: id, label: courseName};
                });
                if (this.$route.query.type === 'add' && this.courseList.length > 0) {
                    this.form.courseId = (this.courseList as any)[0].value;
                }
            } else if (res.code === 201) {
                this.$message.error(res.message);
            }
        });
    }

    private getTeacherSelect() {
        getTeacherSelect({}).then((res: any) => {
            if (res.code === 200) {
                this.teacherList = res.data.map((item: any) => {
                    const {teacherName, id} = item;
                    return {value: id, label: teacherName};
                });
                if (this.$route.query.type === 'add' && this.teacherList.length > 0) {
                    this.form.teacherId = (this.teacherList as any)[0].value;
                }
            } else if (res.code === 201) {
                this.$message.error(res.message);
            }
        });
    }

    private dateChange(value: any) {
        console.log(222, value, this.time);

    }

    private onSubmit(formName: string) {
        this.submitLoading = true;
        (this.$refs[formName] as any).validate((valid: boolean) => {
            if (valid) {
                this.form.startTime = new Date((this.time as any)[0]).getTime();
                this.form.endTime = new Date((this.time as any)[1]).getTime();
                saveSemester({semester: this.form}).then((res: any) => {
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
