<template>
    <div class="page">
        <header class="page-header">
            <el-button type="primary" @click="handleAdd">添加版本</el-button>
        </header>
        <el-table v-loading="listLoading" :data="tableList" border style="width: 100%">
            <el-table-column label="版本名字" prop="versionName"/>
            <el-table-column width="280px" fixed="right" label="操作" prop="operation">
                <template slot-scope="{row}">
                        <el-button size="mini" class="operation-button"
                            @click="handleEdit(row)">编辑</el-button>
                        <pop-delete-button :deleteId="row.id" @delete="handleDelete"/>
                        <el-button size="mini" class="operation-button"
                            @click="handleDetail(row.id)">版本详情</el-button>
                </template>
            </el-table-column>
        </el-table>
        <pagination
            v-show="pages.total > 0"
            :total="pages.total"
            :page.sync="pages.page"
            :size.sync="pages.size"
            @pagination="getList"
        />
    </div>
</template>

<script lang="ts" scoped>
import { Component, Vue } from "vue-property-decorator";
import { PageType, ResponseType } from "@/utils/type-list.ts";
import { versionList, versionDel } from "@/api";
import Pagination from '@/components/Pagination/index.vue';
import PopDeleteButton from '@/components/PopDeleteButton/index.vue';

interface TableListType {
    versionName: string;
    id: number;
}

@Component({
    name: "VersionList",
    components: { Pagination, PopDeleteButton }
})
export default class extends Vue {
    private pages: PageType = {
        page: 1,
        size: 20,
        total: 0
    };
    private listLoading: boolean = true;
    private tableList: TableListType[] = [];

    created() {
        this.getList();
    }

    private async getList() {
        this.tableList = [];
        const { page, size } = this.pages;
        const { courseId } = this.$route.query;
        this.listLoading = true;
        const { data } = await versionList({ page, size, courseVersionInfo: { courseId } });
        this.tableList = (data as any).courseVersionInfos;
        this.pages.total = (data as any).total;
        this.listLoading = false;
    }

    private handleAdd() {
        const { courseId } = this.$route.query;
        this.$router.push(`/course/version-update?type=add&courseId=${courseId}`);
    }

    private handleEdit(item: TableListType) {
        const { courseId } = this.$route.query;
        this.$router.push(`/course/version-update?type=edit&editForm=${JSON.stringify(item)}&courseId=${courseId}`);
    }

    private handleDelete(id: number) {
        versionDel({courseVersionInfo: {id}}).then((res: any) => {
            if (res.code === 200) {
                this.$message({
                    type: 'success',
                    message: '删除成功'
                })
                this.getList();
            }
        });
    }

    private handleDetail(id: number) {
        const { courseId } = this.$route.query;
        this.$router.push(`/course/catalog-list?courseId=${courseId}&versionId=${id}`);
    }
}
</script>

<style lang="scss" scoped>
.page {
    width: 100%;
    padding: 20px;
    box-sizing: border-box;
    &-header {
        margin: 10px 0;
        height: 50px;
    }
    &-text {
        font-size: 30px;
        line-height: 46px;
    }
    .operation-button {
        margin: 0 10px;
    }
}
</style>
