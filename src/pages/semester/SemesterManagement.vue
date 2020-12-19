<template>
    <div class="page">
        <header class="page-header">
            <el-button type="primary" @click="handleAdd">添加课程期数</el-button>
        </header>
        <el-table v-loading="listLoading" :data="tableList" border style="width: 100%">
            <el-table-column fixed label="学期名称" prop="semesterName"/>
            <el-table-column fixed label="学期描述" prop="semesterDesc"/>
            <el-table-column label="学期编号" prop="orderNum"/>
            <el-table-column label="学期成员数" prop="hairCount"/>
            <el-table-column label="开始时间" prop="startTime">
                <template slot-scope="{row}">
                    <span>{{ timeFormat(row.startTime || '') }}</span>
                </template>
            </el-table-column>
             <el-table-column label="结束时间" prop="endTime">
                <template slot-scope="{row}">
                    <span>{{ timeFormat(row.endTime || '') }}</span>
                </template>
            </el-table-column>
            <el-table-column width="280px" fixed="right" label="操作" prop="operation">
                <template slot-scope="{row}">
                        <el-button size="mini" class="operation-button"
                            @click="handleEdit(row)">编辑</el-button>
                        <pop-delete-button :deleteId="row.id" @delete="handleDelete"/>
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
import { timeFormat } from '@/utils/utils.ts';
import { getSemesterList, delSemester } from "@/api";
import Pagination from '@/components/Pagination/index.vue';
import PopDeleteButton from '@/components/PopDeleteButton/index.vue';

interface TableListType {
    id: number;
    courseId: number;
    teacherId: number;
    orderNum: number;
    hairCount: number;
    startTime: string;
    endTime: string;
    semesterName: string;
    semesterDesc: string;
}

@Component({
    name: "CourseList",
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

    private timeFormat = timeFormat;

    private async getList() {
        this.tableList = [];
        const { page, size } = this.pages;
        this.listLoading = true;
        const { data } = await getSemesterList({ page, size });
        this.tableList = (data as any).semesterList;
        this.pages.total = (data as any).total;
        this.listLoading = false;
    }

    private handleAdd() {
        this.$router.push(`/operate/semester-management-update?type=add`);
    }

    private handleEdit(item: TableListType) {
        this.$router.push(`/operate/semester-management-update?type=edit&editForm=${JSON.stringify(item)}`);
    }

    private handleDelete(id: number) {
        delSemester({semester: {id}}).then((res: any) => {
            if (res.code === 200) {
                this.$message({
                    type: 'success',
                    message: '删除成功'
                })
                this.getList();
            }
        });
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
