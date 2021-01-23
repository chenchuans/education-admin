<template>
    <el-form ref="form" :rules="rules" :model="form" label-width="200px" class="form">
        <h2 class="title">编辑学生状况</h2>
        <el-form-item label="微信昵称" prop="wxNiceName">
            <el-input style="width: 200px" v-model="form.wxNiceName"/>
        </el-form-item>
        <el-form-item label="真实姓名" prop="realName">
            <el-input style="width: 200px" v-model="form.realName"/>
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
            <el-input style="width: 200px" v-model="form.phone"/>
        </el-form-item>
        <el-form-item label="是否添加老师微信" prop="isAddWeChat">
            <el-radio-group v-model="form.isAddWeChat">
                <el-radio :label="true">是</el-radio>
                <el-radio :label="false">否</el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item label="是否填写资料" prop="isEditProfile">
            <el-radio-group v-model="form.isEditProfile">
                <el-radio :label="true">是</el-radio>
                <el-radio :label="false">否</el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item label="是否加入微信群" prop=" isInWeChatGroup">
            <el-radio-group v-model="form.isInWeChatGroup">
                <el-radio :label="true">是</el-radio>
                <el-radio :label="false">否</el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item label="是否参与开营仪式" prop="isParticipateInTheOpeningCeremony">
            <el-radio-group v-model="form.isParticipateInTheOpeningCeremony">
                <el-radio :label="true">是</el-radio>
                <el-radio :label="false">否</el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item label="是否全价课程" prop="isFullPrice">
            <el-radio-group v-model="form.isFullPrice">
                <el-radio :label="true">是</el-radio>
                <el-radio :label="false">否</el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item label="是否好评" prop="isGoodPraise">
            <el-radio-group v-model="form.isGoodPraise">
                <el-radio :label="true">是</el-radio>
                <el-radio :label="false">否</el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item label="是否退出群聊" prop="isLeaveWeChatGroup">
            <el-radio-group v-model="form.isLeaveWeChatGroup">
                <el-radio :label="true">是</el-radio>
                <el-radio :label="false">否</el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item label="是否体验课升级到全价课" prop="isTransformationToFullPrice">
            <el-radio-group v-model="form.isTransformationToFullPrice">
                <el-radio :label="true">是</el-radio>
                <el-radio :label="false">否</el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item label="是否完课" prop="isFinishClass">
            <el-radio-group v-model="form.isFinishClass">
                <el-radio :label="true">是</el-radio>
                <el-radio :label="false">否</el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" :loading="submitLoading" @click="onSubmit('form')">{{submitLoading ? '提交中...' : '提交'}}</el-button>
            <el-button @click="onCancel">取消</el-button>
        </el-form-item>
    </el-form>
</template>

<script lang="ts" scoped>
import { Component, Vue, Prop } from "vue-property-decorator";
import { saveStudyInfo } from "@/api";
import { isPhone } from "@/utils/validate";

interface FormType {
    id: number;
    isAddWeChat: boolean;
    isEditProfile: boolean;
    isFinishClass: boolean;
    isFullPrice: boolean;
    isGoodPraise: boolean;
    isInWeChatGroup: boolean;
    isLeaveWeChatGroup: boolean;
    isParticipateInTheOpeningCeremony: boolean;
    isTransformationToFullPrice: boolean;
    orderId: number;
    phone: string;
    realName: string;
    wxNiceName: string;
}


@Component({
    name: "EditLearningSituation"
})
export default class extends Vue {
    private form: FormType = {
        id: 0,
        isAddWeChat: false,
        isEditProfile: false,
        isFinishClass: false,
        isFullPrice: false,
        isGoodPraise: false,
        isInWeChatGroup: false,
        isLeaveWeChatGroup: false,
        isParticipateInTheOpeningCeremony: false,
        isTransformationToFullPrice: false,
        orderId: 0,
        phone: '',
        realName: '',
        wxNiceName: ''
    };
    private validatePhone: any = (rule: any, value: string, callback: any) => {
        if (!isPhone(value)) {
            return new callback(new Error('请输入大于0的数字'));
        } else {
            callback();
        }
    };
    private submitLoading: boolean = false;
    private rules = {
        phone: [
            { required: true, message: '请输入', trigger: 'blur' },
            { validator: this.validatePhone, message: '请输入11位正确的手机号', trigger: 'blur' }
        ],
        wxNiceName: [
            { required: true, message: '请输入微信昵称', trigger: 'blur' }
        ],
        realName: [
            { required: true, message: '请输入真实姓名', trigger: 'blur' }
        ]
    };

    created() {
        const {form} = this.$route.query;
        this.form = JSON.parse(form as any);
    }

    private onSubmit(formName: string) {
        this.submitLoading = true;
        (this.$refs[formName] as any).validate((valid: boolean) => {
            if (valid) {
                saveStudyInfo({studentLearningStatus: this.form}).then((res: any) => {
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
        this.$router.go(-1);
    }
}
</script>

<style lang="scss" scoped>
.form {
    width: 600px;
}
.title {
    height: 40px;
    line-height: 40px;
    text-indent: 40px;
}
</style>
