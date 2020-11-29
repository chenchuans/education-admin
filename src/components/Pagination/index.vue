<template>
    <div :class="{'hidden': hidden}" class="pagination-container">
        <el-pagination
            :background="background"
            :current-page.sync="currentPage"
            :page-size.sync="pageSize"
            :layout="layout"
            :page-sizes="pageSizes"
            :total="total"
            v-bind="$attrs"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
        />
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { scrollTo } from "@/utils/scroll-to";

@Component({
    name: "Pagination"
})
export default class extends Vue {
    @Prop({ required: true }) private total!: number;
    @Prop({ default: 1 }) private page!: number;
    @Prop({ default: 20 }) private size!: number;
    @Prop({ default: () => [10, 20, 50, 100, 200] }) private pageSizes!: number[];
    @Prop({ default: "total, sizes, prev, pager, next, jumper" })
    private layout!: string;
    @Prop({ default: true }) private background!: boolean;
    @Prop({ default: true }) private autoScroll!: boolean;
    @Prop({ default: false }) private hidden!: boolean;

    get currentPage() {
        return this.page;
    }

    set currentPage(value) {
        this.$emit("update:page", value);
    }

    get pageSize() {
        return this.size;
    }

    set pageSize(value) {
        this.$emit("update:size", value);
    }

    handleSizeChange(value: number) {
        this.$emit("pagination", { page: this.currentPage, size: value });
        if (this.autoScroll) {
            scrollTo(0, 800);
        }
    }

    handleCurrentChange(value: number) {
        this.$emit("pagination", { page: value, size: this.pageSize });
        if (this.autoScroll) {
            scrollTo(0, 800);
        }
    }
}
</script>

<style lang="scss" scoped>
.pagination-container {
    display: flex;
    justify-content: flex-end;
    background: #fff;
    padding: 32px 16px;
}

.pagination-container.hidden {
    display: none;
}
</style>
