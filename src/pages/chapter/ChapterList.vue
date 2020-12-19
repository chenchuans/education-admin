<template>
    <div class="page">
        <header class="page-header">
            <el-button type="primary" @click="handleAdd">添加小节</el-button>
        </header>
        <el-table v-loading="listLoading" :data="tableList" border style="width: 100%">
            <el-table-column fixed label="小节名称" prop="chapterName"/>
            <el-table-column label="小节描述" prop="chapterDesc"/>
            <el-table-column label="序号" prop="orderNum"/>
            <!-- <el-table-column label="创建时间" prop="creationTime">
                <template slot-scope="{row}">
                    <span>{{ handleTimeFormatter(row.creationTime || '') }}</span>
                </template>
            </el-table-column> -->
            <el-table-column width="280px" fixed="right" label="操作" prop="operation">
                <template slot-scope="{row}">
                        <el-button size="mini" class="operation-button"
                            @click="handleEdit(row)">编辑</el-button>
                        <pop-delete-button :deleteId="row.id" @delete="handleDelete"/>
                        <el-button size="mini" class="operation-button"
                            @click="handleDetail(row.id)">小节详情</el-button>
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
        <chapter-update-popup v-if="dialogVisible" :dialogVisible="dialogVisible" :type="type" :currentItem="currentItem" ref="popup" @submitSuccess="submitSuccess"/>
    </div>
</template>

<script lang="ts" scoped>
import { Component, Vue } from "vue-property-decorator";
import { PageType, ResponseType } from "@/utils/type-list.ts";
import { handleTimeFormatter } from '@/utils/utils.ts';
import { chapterList, chapterDel } from "@/api";
import Pagination from '@/components/Pagination/index.vue';
import PopDeleteButton from '@/components/PopDeleteButton/index.vue';
import ChapterUpdatePopup from './ChapterUpdatePopup.vue';
import { IMAGE_PREFIX } from '@/utils/global-variable.ts';

interface TableListType {
    chapterName: string;
    id: number;
    orderNum: number;
    chapterDesc: string;
    creationTime: string;
}

@Component({
    name: "ChapterList",
    components: { Pagination, PopDeleteButton, ChapterUpdatePopup }
})
export default class extends Vue {
    private pages: PageType = {
        page: 1,
        size: 20,
        total: 0
    };
    private listLoading: boolean = true;
    private tableList: TableListType[] = [];
    private type: string = 'add';
    private dialogVisible: boolean = false;
    private currentItem: TableListType = {
        chapterName: '',
        orderNum: 0,
        id: 0,
        creationTime: '',
        chapterDesc: ''
    };

    created() {
        this.getList();
    }

    private handleTimeFormatter = handleTimeFormatter;

    private async getList() {
        this.tableList = [];
        const { page, size } = this.pages;
        const { courseId, catalogId } = this.$route.query;
        this.listLoading = true;
        const { data } = await chapterList({page, size, courseChapterInfo: {
            courseId, catalogId
        }});
        this.tableList = (data as any).courseChapterInfos;
        this.pages.total = (data as any).total;
        this.listLoading = false;
    }

    private submitSuccess(value?: string) {
        this.dialogVisible = false;
        if (value !== 'cancel') {
            this.getList();
        }
    }

    private handleAdd() {
        this.type = 'add';
        this.dialogVisible = true;
    }

    private handleEdit(item: TableListType) {
        this.type = 'edit';
        this.currentItem = item;
        this.dialogVisible = true;
    }

    private handleDelete(id: number) {
        const { courseId, catalogId } = this.$route.query;
        chapterDel({courseChapterInfo: {id, courseId, catalogId}}).then((res: any) => {
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
        const { courseId, catalogId } = this.$route.query;
        this.$router.push(`/course/content-list?courseId=${courseId}&chapterId=${id}&catalogId=${catalogId}`);
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
