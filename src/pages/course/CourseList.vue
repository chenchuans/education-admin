<template>
    <div class="page">
        <header class="page-header">
            <el-button type="primary" @click="handleAdd">添加课程</el-button>
        </header>
        <el-table :data="tableList" border style="width: 100%">
            <el-table-column fixed label="课程名称" prop="courseName"/>
            <el-table-column label="课程描述" prop="descContent"/>
            <el-table-column label="老师姓名" prop="teacherName"/>
            <el-table-column label="创建时间" prop="creationTime">
                <template slot-scope="{row}">
                    <span>{{ row.creationTime.substr(0, 10) }}</span>
                </template>
            </el-table-column>
            <el-table-column label="封面图片" prop="courseCoverImageUrl">
                <template slot-scope="{row}">
                    <img @click="handleImage(`${apiUrl}${row.courseCoverImageUrl}`)" class="table-image" :src="`${apiUrl}${row.courseCoverImageUrl}`" alt="">
                </template>
            </el-table-column>
            <el-table-column fixed="right" label="操作" prop="operation">
                <template slot-scope="{row}">
                        <el-button size="mini" class="operation-button"
                            @click="handleEdit(row)">编辑</el-button>
                        <!-- <el-popconfirm title="确定要删除当前项吗" @cancel="handleCancel" @confirm="handleDelete(row.id)">
                            <el-button class="operation-button" size="mini" type="danger" slot="reference">删除</el-button>
                        </el-popconfirm> -->
                        <el-button @click="handleDelete(row.id)" class="operation-button" size="mini" type="danger" >删除</el-button>
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

        <!-- 查看每一项图片详情 -->
        <el-dialog title="图片详情" :visible.sync="isImage" width="70%">
            <img class="image-detail" :src="currentImage" alt="">
        </el-dialog>
    </div>
</template>

<script lang="ts" scoped>
import { Component, Vue } from "vue-property-decorator";
import { PageType, ResponseType } from "@/utils/type-list.ts";
import { courseList, courseUpdate, courseDel } from "@/api";
import Pagination from '@/components/Pagination/index.vue';
// const { VUE_IMG_HOST } = process.env;

interface TableListType {
    courseName: string;
    id: number;
    descContent: string;
    teacherName: string;
    creationTime: string;
    courseCoverImageUrl: string;
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
    private currentImage: string = '';
    private isImage: boolean = false;
    private apiUrl: string = 'http://34.96.172.236:8088/eduweb/v1/resource/';
    private listLoading: boolean = true;
    private tableList: TableListType[] = [];

    created() {
        this.getList();
    }

    private async getList() {
        this.tableList = [];
        const { page, size } = this.pages;
        this.listLoading = true;
        const { data } = await courseList({ page, size });
        this.tableList = (data as any).courseInfos;
        this.pages.total = (data as any).total;
        this.listLoading = false;
    }

    private handleAdd() {
        this.$router.push(`/course/update?type=add`);
    }

    private handleEdit(item: TableListType) {
        this.$router.push(`/course/update?type=edit&editForm=${JSON.stringify(item)}`);
    }

    private handleDelete(id: number) {
        courseDel({courseInfo: {id}}).then((res: any) => {
            if (res.code === 200) {
                this.$message({
                    type: 'success',
                    message: '删除成功'
                })
                this.getList();
            }
        });
    }
    // private handleCancel() {
    //     console.log(11)
    // }

    private handleImage(url: string) {
        this.currentImage = url;
        this.isImage = true;
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
    .table-image {
        width: 100px;
        height: 100px;
    }
    .image-detail {
        width: 100%;
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
