<template>
    <div class="upload-container">
        <el-upload
            class="avatar-uploader"
            :headers="headers"
            :action="url"
            :multiple="false"
            :show-file-list="false"
            :on-success="handleImageSuccess">
            <img v-if="imageUrl" :src="`${imgUrl}${imageUrl}`" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { uploadImage } from "@/api";
import { getUid, getToken } from "@/utils/session";
const { VUE_IMG_HOST, VUE_APP_PARTNER_HOST } = process.env;

@Component({
    name: "UploadImage"
})
export default class extends Vue {
    @Prop({ default: "" }) private value!: string;

    private url: string = VUE_APP_PARTNER_HOST + "/common/upload";
    //  VUE_IMG_HOST ||
    private imgUrl: string  = 'http://34.96.172.236:8088/eduweb/v1/resource/';
    private headers = {
        token: getToken(),
        uuid: +getUid()
    };

    get imageUrl() {
        return this.value;
    }

    private rmImage() {
        this.$emit("remove");
    }

    private handleImageSuccess(res: any) {
        if (res.code === 200) {
            const { fileName, id } = res.data;
            const url: string = fileName;
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
