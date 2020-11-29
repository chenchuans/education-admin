<template>
    <el-popover placement="top" width="160" v-model="visible">
        <p>确定要删除当前项吗</p>
        <div style="text-align: right; margin: 0">
            <el-button size="mini" type="text" @click="visible = false">取消</el-button>
            <el-button type="primary" size="mini" @click="handleClick">确定</el-button>
        </div>
        <el-button class="operation-button" size="mini" :type="type"  slot="reference">删除</el-button>
    </el-popover>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({
    name: "PopDeleteButton"
})
export default class extends Vue {
    @Prop({ default: 'danger' }) private type?: string;
    @Prop({ required: true }) private deleteId?: number | string;

    private visible: boolean = false;

    private handleClick() {
        this.$emit('delete', this.deleteId);
    }
}
</script>

<style lang="scss" scoped>
.operation-button {
    margin: 0 10px;
}
</style>
