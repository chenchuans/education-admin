<template>
    <div class="page">
        <header class="page-header">
            <el-button type="primary" @click="handleAdd">添加老师</el-button>
        </header>
        <el-table v-loading="listLoading" :data="tableList" border style="width: 100%">
            <el-table-column fixed label="老师姓名" prop="teacherName"/>
            <el-table-column label="手机号" prop="phoneNumber"/>
            <el-table-column label="登录用户名" prop="userName"/>
            <el-table-column label="登录密码" prop="passWord"/>
            <!-- <el-table-column label="创建时间" prop="creationTime">
                <template slot-scope="{row}">
                    <span>{{ handleTimeFormatter(row.creationTime || '') }}</span>
                </template>
            </el-table-column> -->
            <el-table-column label="老师微信" prop="adminWeChatQRCode">
                <template slot-scope="{row}">
                    <image-detail :url="`${apiUrl}${row.adminWeChatQRCode}`"/>
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
import { handleTimeFormatter } from '@/utils/utils.ts';
import { getTeacher, delTeacher } from "@/api";
import Pagination from '@/components/Pagination/index.vue';
import ImageDetail from '@/components/ImageDetail/index.vue';
import PopDeleteButton from '@/components/PopDeleteButton/index.vue';
import { IMAGE_PREFIX } from '@/utils/global-variable.ts';

interface TableListType {
    id: number;
    passWord: string;
    teacherName: string;
    // creationTime: string;
    userName: string;
    adminWeChatQRCode: string;
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
        const { data } = await getTeacher({ page, size });
        this.tableList = (data as any).userList;
        this.pages.total = (data as any).total;
        this.listLoading = false;
    }

    private handleAdd() {
        this.$router.push(`/operate/teacher-management-update?type=add`);
    }

    private handleEdit(item: TableListType) {
        this.$router.push(`/operate/teacher-management-update?type=edit&editForm=${JSON.stringify(item)}`);
    }

    private handleDelete(id: number) {
        delTeacher({user: {id}}).then((res: any) => {
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
