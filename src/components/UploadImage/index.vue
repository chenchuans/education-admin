<template>
    <div class="upload-container">
        <el-upload
            class="avatar-uploader"
            :headers="headers"
            :action="url"
            :multiple="false"
            :show-file-list="false"
            :on-success="handleImageSuccess">
                <img v-if="imageUrl" :src="`${imgUrl}${imageUrl}`" class="avatar"/>
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            <!-- <div slot="file">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                <span v-if="imageUrl" class="el-upload-list__item-actions">
                    <span class="el-upload-list__item-preview" @click="handlePictureCardPreview">
                        <i class="el-icon-zoom-in"></i>
                    </span>
                    <span class="el-upload-list__item-delete" @click="handleRemoveImage">
                        <i class="el-icon-delete"></i>
                    </span>
                </span>
            </div> -->
        </el-upload>
        <!-- <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="`${imgUrl}${imageUrl}`" alt="">
        </el-dialog> -->
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
    private imgUrl: string  = IMAGE_PREFIX;
    private dialogVisible: boolean = false;
    private headers = {
        token: getToken(),
        uuid: +getUid()
    };

    get imageUrl() {
        return this.value;
    }

    private handleRemoveImage() {
        this.$emit("remove");
    }

    private handlePictureCardPreview() {
        this.dialogVisible = true;
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
