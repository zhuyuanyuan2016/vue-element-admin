<template>
  <div class="app-container">
    <el-form :inline="true" :model="dataForm" @keyup.enter.native="getDataList()">
      <el-form-item>
        <el-input v-model="dataForm.key" placeholder="参数名" clearable />
      </el-form-item>
      <el-form-item>
        <el-button @click="getDataList()">查询</el-button>
      </el-form-item>
    </el-form>

    <el-table
      v-loading="dataListLoading"
      :data="dataList"
      border
      style="width: 100%;"
      @selection-change="selectionChangeHandle"
    >
      <el-table-column
        type="selection"
        header-align="center"
        align="center"
        width="50"
      />
      <el-table-column
        prop="id"
        header-align="center"
        align="center"
        label="编号"
      />
      <el-table-column
        prop="name"
        header-align="center"
        align="center"
        label="名称"
      />

      <el-table-column
        prop="isFactory"
        header-align="center"
        align="center"
        label="是否为品牌制造商：0->不是；1->是"
      />
      <el-table-column
        prop="showStatus"
        header-align="center"
        align="center"
        label="是否显示"
      >
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.showStatus"
            :active-value="1"
            active-color="#13ce66"
            inactive-color="#ff4949"
            :inactive-value="0"
            @change="printSwitch(scope.row)"
          />
        </template>
      </el-table-column>
      <el-table-column
        prop="image_uri"
        header-align="center"
        align="center"
        label="品牌logo"
      >
        <template slot-scope="scope">
          <div class="demo-image__preview">
            <el-image
              style="width: 100px; height: 100px"
              :src="scope.row.image_uri"
              :preview-src-list="Array.of(scope.row.image_uri)"
            />
          </div>
        </template>
      </el-table-column>

      <el-table-column
        fixed="right"
        header-align="center"
        align="center"
        width="150"
        label="操作"
      >
        <!--        <template slot-scope="scope">-->
        <!--&lt;!&ndash;          <el-button type="text" size="small" @click="addOrUpdateHandle(scope.row.id)">修改</el-button>&ndash;&gt;-->
        <!--&lt;!&ndash;          <el-button type="text" size="small" @click="deleteHandle(scope.row.id)">删除</el-button>&ndash;&gt;-->
        <!--        </template>-->
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getDataList" />

    <!-- 弹窗, 新增 / 修改 -->
  </div>
</template>

<script>
import Pagination from '@/components/Pagination/index'
import { fetchList } from '@/api/advertiset'
export default {
  components: {
    Pagination
  },
  data() {
    return {
      status: null,
      dataForm: {
        key: ''
      },
      listQuery: {
        page: 1,
        limit: 20
      },
      dataList: [],
      total: 0,
      dataListLoading: false,
      dataListSelections: [],
      addOrUpdateVisible: false
    }
  },
  created() {
    this.getDataList()
  },
  methods: {
    // 获取数据列表
    getDataList() {
      this.dataListLoading = true
      // this.listQuery
      fetchList(this.listQuery).then(response => {
        this.dataList = response.data.items
        this.total = response.data.total
        this.dataListLoading = false
      })
    },
    // 多选
    selectionChangeHandle(val) {
      this.dataListSelections = val
    },
    printSwitch(row) {
      console.log(row)
    }

  }
}
</script>

<style scoped>
  .edit-input {
    padding-right: 100px;
  }
  .cancel-btn {
    position: absolute;
    right: 15px;
    top: 10px;
  }
</style>

