<template>
    <div class="upload-container">
        <el-upload
            class="avatar-uploader"
            :headers="headers"
            :action="url"
            :multiple="false"
            :show-file-list="false"
            :file-list="fileList"
            :on-success="handleImageSuccess">
                <el-button size="small" type="primary">点击上传资料</el-button>
                <span style="margin-left: 30px" v-if="fileList.length > 0">文件名: {{fileList[0].name}}</span>
        </el-upload>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { uploadImage } from "@/api";
import { getUid, getToken } from "@/utils/session";
import { IMAGE_PREFIX, VUE_APP_PARTNER_HOST } from "@/utils/global-variable.ts";

@Component({
    name: "UploadImage"
})
export default class extends Vue {
    @Prop({ default: "" }) private value!: string;

    private url: string = VUE_APP_PARTNER_HOST + "/common/upload";
    private dialogVisible: boolean = false;
    private imgUrl: string  = IMAGE_PREFIX;
    private fileList: any[] = [];
    private headers = {
        token: getToken(),
        uuid: +getUid()
    };

    get imageUrl() {
        return this.value;
    }

    created() {
        const { value } = this;
        if (value) {
            this.fileList = [{name: value, url: `${this.imgUrl}${value}`}];
        }
    }

    private handlePictureCardPreview() {
        this.dialogVisible = true;
    }

    private handleImageSuccess(res: any) {
        if (res.code === 200) {
            const { fileName, id } = res.data;
            const url: string = fileName;
            this.fileList = [{name: fileName, url: `${this.imgUrl}${fileName}`}];
            this.$message({
                type: "success",
                message: res.message
            });
            this.$emit("success", { id, url });
        }
    }
}
</script>

<style lang="scss" scoped>
.upload-container {
    width: 100%;
    position: relative;
    @include clearfix;
    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
        border-color: #409eff;
    }
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
    }
    .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }
}
</style>
