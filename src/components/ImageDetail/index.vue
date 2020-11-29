<template>
    <div class="image-container">
        <img class="table-image" @click="isImage = true" :src="url" alt="">
        <!-- 查看图片详情 -->
        <el-dialog title="图片详情" :visible.sync="isImage" width="70%">
            <img class="image-detail" :src="url" alt="">
        </el-dialog>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({
    name: "ImageDetail"
})
export default class extends Vue {
    @Prop({ required: true }) private url?: string;

    private isImage: boolean = false;

}
</script>

<style lang="scss" scoped>
.image-container {
    .table-image {
        width: 100px;
        height: 100px;
    }
    .image-detail {
        width: 100%;
    }
}
</style>
