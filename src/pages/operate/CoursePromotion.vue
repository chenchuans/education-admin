<template>
    <div class="page">
        <el-table v-loading="listLoading" :data="tableList" border style="width: 100%">
            <el-table-column fixed label="课程名称" prop="courseName"/>
            <el-table-column label="课程描述" prop="descContent"/>
            <el-table-column label="原价" prop="coursePrice"/>
            <el-table-column label="优惠价" prop="specialPrice"/>
            <el-table-column label="老师姓名" prop="teacherName"/>
            <el-table-column label="老师描述" prop="teacherDesc"/>
            <!-- <el-table-column label="创建时间" prop="creationTime">
                <template slot-scope="{row}">
                    <span>{{ handleTimeFormatter(row.creationTime || '') }}</span>
                </template>
            </el-table-column> -->
            <el-table-column label="封面图片" prop="courseCoverImageUrl">
                <template slot-scope="{row}">
                    <image-detail :url="`${apiUrl}${row.courseCoverImageUrl}`"/>
                </template>
            </el-table-column>
            <el-table-column width="280px" fixed="right" label="操作" prop="operation">
                <template slot-scope="{row}">
                        <el-button type="primary" size="mini" class="operation-button"
                            @click="handleClick(row.id)">推广此课程</el-button>
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
import { handleTimeFormatter, copyToClip } from '@/utils/utils.ts';
import { courseList, courseDel } from "@/api";
import Pagination from '@/components/Pagination/index.vue';
import ImageDetail from '@/components/ImageDetail/index.vue';
import PopDeleteButton from '@/components/PopDeleteButton/index.vue';
import { IMAGE_PREFIX } from '@/utils/global-variable.ts';

interface TableListType {
    courseName: string;
    id: number;
    descContent: string;
    teacherName: string;
    creationTime: string;
    specialPrice: string;
    coursePrice: string;
    teacherDesc: string;
    courseCoverImageUrl: string;
}

@Component({
    name: "CourseList",
    components: { Pagination, ImageDetail, PopDeleteButton }
})
export default class extends Vue {
    private pages: PageType = {
        page: 1,
        size: 20,
        total: 0
    };
    private apiUrl: string = IMAGE_PREFIX;
    private listLoading: boolean = true;
    private tableList: TableListType[] = [];

    created() {
        this.getList();
    }

    private handleTimeFormatter = handleTimeFormatter;

    private async getList() {
        this.tableList = [];
        const { page, size } = this.pages;
        this.listLoading = true;
        const { data } = await courseList({ page, size });
        this.tableList = (data as any).courseInfos;
        this.pages.total = (data as any).total;
        this.listLoading = false;
    }

    private handleClick(id: number) {
        // 复制此课程链接去推广
        const url = `courseId=${id}`;
        copyToClip(url);
        this.$message({
            type: 'success',
            message: '复制课程链接成功！'
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
