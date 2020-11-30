<template>
    <div class="page">
        <header class="page-header">
            <el-button type="primary" @click="handleAdd">添加内容</el-button>
        </header>
        <el-table v-loading="listLoading" :data="tableList" border style="width: 100%">
            <el-table-column fixed label="内容类型" prop="contentType">
             <template slot-scope="{row}">
                    <span>{{ row.contentType === 'TEXT' ? '文本' : '图片' }}</span>
                </template>
            </el-table-column>
            <el-table-column label="内容描述" prop="textContent"/>
            <el-table-column label="创建时间" prop="creationTime">
                <template slot-scope="{row}">
                    <span>{{ handleTime(row.creationTime || '') }}</span>
                </template>
            </el-table-column>
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
        <content-update-popup v-if="dialogVisible" :dialogVisible="dialogVisible" :type="type" :currentItem="currentItem" ref="popup" @submitSuccess="submitSuccess" :tableListLength="tableList.length"/>
    </div>
</template>

<script lang="ts" scoped>
import { Component, Vue } from "vue-property-decorator";
import { PageType, ResponseType } from "@/utils/type-list.ts";
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

    created() {
        this.getList();
    }

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
    }

    private handleEdit(item: TableListType) {
        this.type = 'edit';
        this.currentItem = item;
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

    private handleTime(value: string) {
        return value.substr(0, 10);
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
