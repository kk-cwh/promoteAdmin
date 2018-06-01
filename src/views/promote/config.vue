<template>
  <div class="app-container">

    <el-row>
      <el-col :span="24">
        <div class="form-content">
          <el-form :inline="true" :model="queryForm" class="demo-form-inline" size="small">
            <el-form-item label="配置ID">
              <el-input v-model="queryForm.id" placeholder="配置ID" style="width:100px;"></el-input>
            </el-form-item>
            <el-form-item label="名称">
              <el-input v-model="queryForm.name" placeholder="名称" style="width:150px;"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" icon="el-icon-search" @click="queryList" :loading="loading">查询</el-button>
            </el-form-item>
            <el-form-item>
              <el-button type="info" plain @click="clearData">清空查询</el-button>
            </el-form-item>
            <el-form-item>
              <el-button icon="el-icon-circle-plus" type="danger" @click="toAdd">新增</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-col>
    </el-row>

    <el-row :gutter="20">
      <el-col :span="24">
        <div class="table-content">
          <el-table border v-loading="loading" :data="tableData" row-class-name="report-row-item" cell-class-name="report-cell-item" size="mini">
            <el-table-column prop="id" label="推广ID">
            </el-table-column>
            <el-table-column prop="name" label="名称">
            </el-table-column>
            <el-table-column prop="template_name" label="推广模板">
            </el-table-column>
            <el-table-column prop="down_url" label="宣传页下载">
            </el-table-column>
            <el-table-column label="推广二维码">

              <template slot-scope="scope">
                <el-row :gutter="10">
                  <el-col :xs="24" :sm="24" :md="10" :lg="10" :xl="10">
                    <div>
                      <qrcode :val="scope.row.qrcode_url" :size="50">
                      </qrcode>
                    </div>
                  </el-col>
                  <el-col :xs="24" :sm="24" :md="14" :lg="14" :xl="14">
                    <el-popover trigger="click" placement="left">
                      <qrcode :val="scope.row.qrcode_url" :size="120">
                      </qrcode>
                      <div slot="reference" class="name-wrapper">
                        <el-tag size="small" style="cursor: pointer;">查看大图</el-tag>
                      </div>
                    </el-popover>
                  </el-col>
                </el-row>

              </template>

            </el-table-column>
            <el-table-column prop="down_url" label="推广落地页">
            </el-table-column>
            <el-table-column  label="下载地址二维码">
              <template slot-scope="scope">
                <el-row :gutter="10">
                  <el-col :xs="24" :sm="24" :md="10" :lg="10" :xl="10">
                    <div>
                      <qrcode :val="scope.row.down_url" :size="50">
                      </qrcode>
                    </div>
                  </el-col>
                  <el-col :xs="24" :sm="24" :md="14" :lg="14" :xl="14">
                    <el-popover trigger="click" placement="left">
                      <qrcode :val="scope.row.down_url" :size="120">
                      </qrcode>
                      <div slot="reference" class="name-wrapper">
                        <el-tag size="small" style="cursor: pointer;">查看大图</el-tag>
                      </div>
                    </el-popover>
                  </el-col>
                </el-row>

              </template>

            </el-table-column>
            <el-table-column prop="down_url" label="安装包地址">
            </el-table-column>
            <el-table-column prop="created_at" label="创建时间">
            </el-table-column>
            <!-- <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button @click="showReport(scope.row)" type="text" size="mini">查看</el-button>
                <el-button type="text" size="mini">编辑</el-button>
              </template>
            </el-table-column> -->
          </el-table>
        </div>
      </el-col>
      <el-col :span="24" style="text-align:right;padding-right:30px;">
        <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[2,10, 20, 30, 40, 50]" :page-size="per_page" layout="   total , prev, pager, next, jumper" :total="total">
        </el-pagination>
      </el-col>
    </el-row>

    <el-dialog :visible.sync="addDialogVisible" width="480px" center>
      <div slot="title" style="font-size:15px;font-weight:bold;">添加推广配置</div>
      <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="140px" size="small">
        <el-form-item label="代理ID" prop="agency_id">
          <el-input v-model="ruleForm.agency_id" style="width:200px"></el-input>
        </el-form-item>
        <el-form-item label="推广名称" prop="name">
          <el-input v-model="ruleForm.name" style="width:200px"></el-input>
        </el-form-item>
        <el-form-item label="二维码地址" prop="qrcode_url">
          <el-input v-model="ruleForm.qrcode_url" style="width:200px"></el-input>
        </el-form-item>
        <el-form-item label="下载地址" prop="down_url">
          <el-input v-model="ruleForm.down_url" style="width:200px"></el-input>
        </el-form-item>
        <el-form-item label="">
          <el-button @click="addDialogVisible = false">关 闭</el-button>
          <el-button type="primary" @click="addPromotionConfig">保 存</el-button>
        </el-form-item>
        <!-- <el-form-item label="备注">
          <el-input type="textarea" v-model="ruleForm.desc"></el-input>
        </el-form-item> -->
      </el-form>
    </el-dialog>

  </div>
</template>

<script>
import qrcode from '@/components/Qrcode'

export default {
  components: {
    qrcode: qrcode
  },
  data() {
    return {
      loading: false,
      queryForm: { id: '', name: '' },
      total: 0,
      per_page: 15,
      currentPage: 1,
      addDialogVisible: false,
      ruleForm: {
        name: '',
        agency_id: '',
        qrcode_url: '',
        down_url: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入推广名称', trigger: 'blur' }
        ],
        qrcode_url: [
          { required: true, type: 'url', message: '请输入合法的二维码地址', trigger: 'change' }
        ],
        down_url: [
          { required: true, type: 'url', message: '请输入合法的下载地址', trigger: 'blur' }
        ],
        agency_id: [
          { required: true, message: '请输入代理ID', trigger: 'blur' }
        ]
      },
      tableData: [

      ]
    }
  },
  mounted() {
    // this.init()
  },
  methods: {
    init() {
      this.per_page = 15
      this.currentPage = 1
      this.queryList()
    },
    handleSizeChange(val) {
      this.per_page = val
      this.currentPage = 1
      this.queryList()
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.queryList()
    },
    queryList() {
      this.loading = true
      this.tableData = []
      this.$store.dispatch('PromotionConfig', this.queryForm).then((res) => {
        this.tableData = []
        if (res.data && res.data.length) {
          res.data.forEach((item, index) => {
            this.tableData.push(
              {
                id: item.id,
                name: item.name,
                agency_id: item.agency_id,
                template_id: item.template_id,
                template_name: item.template_name,
                qrcode_img: item.qrcode_img,
                qrcode_url: item.qrcode_url,
                down_img: item.down_img,
                down_url: item.down_url,
                updated_at: item.updated_at,
                created_at: item.created_at
              }
            )
          })
        }
        if (res.meta && res.meta.pagination) {
          this.total = res.meta.pagination.total
          this.per_page = res.meta.pagination.per_page
        }
        this.loading = false
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    },
    toAdd() {
      this.addDialogVisible = true
      // this.ruleForm = {}
    },
    addPromotionConfig() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.addDialogVisible = false
          this.$store.dispatch('AddPromotionConfig', this.ruleForm).then((res) => {

          }).catch((err) => {
            this.$message({
              showClose: true,
              message: err.response.data.message,
              type: 'error',
              duration: 5 * 1000
            })
          })
        } else {
          return false
        }
      })
    },
    showReport(row) {
    },
    clearData() {
      this.queryForm = {
        id: '',
        name: ''
      }
      this.tableData = []
      this.total = 0
    }
  }
}
</script>

<style scoped>
.table-content {
  margin: 0 20px 10px 20px;
}

.form-content {
  min-height: 36px;
  line-height: 36px;
  padding: 10px 10px 0 10px;
}

.agent-count {
  min-height: 36px;
  line-height: 36px;
  padding-left: 20px;
  background: #efefef;
}
</style>




