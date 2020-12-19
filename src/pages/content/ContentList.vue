<template>
    <div class="page">
        <header class="page-header">
            <el-button type="primary" @click="handleAdd">添加内容</el-button>
        </header>
        <el-table v-loading="listLoading" :data="tableList" border style="width: 100%">
            <el-table-column fixed label="内容类型" prop="contentType">
             <template slot-scope="{row}">
                    <span>{{ contentTypeList[row.contentType] }}</span>
                </template>
            </el-table-column>
            <el-table-column label="内容" prop="textContent"/>
            <!-- <el-table-column label="创建时间" prop="creationTime">
                <template slot-scope="{row}">
                    <span>{{ handleTimeFormatter(row.creationTime || '') }}</span>
                </template>
            </el-table-column> -->
            <el-table-column label="正确答案" prop="correctAnswer"/>
            <el-table-column label="答案提示" prop="answerTips"/>
            <el-table-column label="内容图片" prop="imageUrl">
                <template slot-scope="{row}">
                    <image-detail :url="`${apiUrl}${row.imageUrl}`"/>
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
        <content-update-popup v-if="dialogVisible" :dialogVisible="dialogVisible" :type="type" :preContentId="preContentId" :currentItem="currentItem" ref="popup" @submitSuccess="submitSuccess" :tableListLength="tableList.length"/>
    </div>
</template>

<script lang="ts" scoped>
import { Component, Vue } from "vue-property-decorator";
import { PageType, ResponseType } from "@/utils/type-list.ts";
import { handleTimeFormatter } from '@/utils/utils.ts';
import { contentList, contentDel } from "@/api";
import Pagination from '@/components/Pagination/index.vue';
import PopDeleteButton from '@/components/PopDeleteButton/index.vue';
import ImageDetail from '@/components/ImageDetail/index.vue';
import ContentUpdatePopup from './ContentUpdatePopup.vue';
import { IMAGE_PREFIX } from '@/utils/global-variable.ts';

interface TableListType {
    chapterId: number;
    contentType: string;
    creationTime: string;
    id: number;
    imageUrl: string;
    imageUrlId: number;
    isFirstContent: boolean;
    preContentId: number;
    textContent: string;
    updateTime: string;
}

@Component({
    name: "ContentList",
    components: { Pagination, PopDeleteButton, ContentUpdatePopup, ImageDetail }
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
    private apiUrl: string = IMAGE_PREFIX;
    private currentItem: TableListType = {
        chapterId: 0,
        contentType: '',
        creationTime: '',
        id: 0,
        imageUrl: '',
        imageUrlId: 0,
        isFirstContent: false,
        preContentId: 0,
        textContent: '',
        updateTime: ''
    };
    private preContentId: number = 0;
    private contentTypeList = {
        TEXT: '文本',
        TITLE: '标题',
        IMAGE: '图片',
        ANSWER: '题目'
    }

    created() {
        this.getList();
    }

    private handleTimeFormatter = handleTimeFormatter;

    private async getList() {
        this.tableList = [];
        const { page, size } = this.pages;
        const { courseId, catalogId, chapterId } = this.$route.query;
        this.listLoading = true;
        const { data } = await contentList({page, size, courseContentInfo: {
            courseId, catalogId, chapterId
        }});
        this.tableList = (data as any).courseContentInfos;
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
        const len: number = this.tableList.length;
        if (len > 0) {
            this.preContentId = this.tableList[len - 1].id || 0;
        }
    }

    private handleEdit(item: TableListType) {
        this.type = 'edit';
        this.currentItem = item;
        this.preContentId = item.preContentId;
        this.dialogVisible = true;
    }

    private handleDelete(id: number) {
        const { courseId, catalogId, chapterId } = this.$route.query;
        contentDel({courseContentInfo: {id, courseId, catalogId, chapterId}}).then((res: any) => {
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
