<template>
    <div class="page">
        <el-table :data="tableList" border>
            <el-table-column align="center" label="name" width="65" />
            <!-- <el-table-column
            class-name="status-col"
            label="Status"
            width="110"
            >
            <template slot-scope="{row}">
                <el-tag :type="row.status | articleStatusFilter">
                {{ row.status }}
                </el-tag>
            </template>
            </el-table-column>-->
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
import { PageType, ResponseType } from "@/utils/type-list";
import { courseList, courseUpdate, courseDel } from "@/api";
import Pagination from '@/components/Pagination/index.vue';

interface TableListType {
    name: string;
}

@Component({
    name: "CourseList",
    components: { Pagination }
})
export default class extends Vue {
    private pages: PageType = {
        page: 1,
        size: 20,
        total: 0
    };
    private listLoading = true;
    private tableList: TableListType[] = [];

    created() {
        this.getList();
    }

    private async getList() {
        const { page, size } = this.pages;
        this.listLoading = true;
        const { data } = await courseList({ page, size });
        this.tableList = (data as any).courseInfos;
        this.pages.total = (data as any).total;
        this.listLoading = false;
    }
}
</script>

<style lang="scss" scoped>
.page {
    &-container {
        margin: 30px;
    }

    &-text {
        font-size: 30px;
        line-height: 46px;
    }
}
</style>
