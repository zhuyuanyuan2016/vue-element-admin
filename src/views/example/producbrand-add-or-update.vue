<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible"
  >
    <el-form ref="dataForm" :model="dataForm" :rules="dataRule" label-width="80px" @keyup.enter.native="dataFormSubmit()">
      <el-form-item label="名称" prop="name">
        <el-input v-model="dataForm.name" placeholder="名称" />
      </el-form-item>
      <el-form-item label="首字母" prop="firstLetter">
        <el-input v-model="dataForm.firstLetter" placeholder="首字母" />
      </el-form-item>
      <el-form-item label="排序" prop="sort">
        <el-input v-model="dataForm.sort" placeholder="排序" />
      </el-form-item>
      <el-form-item label="是否为品牌制造商：0->不是；1->是" prop="isFactory">
        <el-input v-model="dataForm.isFactory" placeholder="是否为品牌制造商：0->不是；1->是" />
      </el-form-item>
      <el-form-item label="是否显示" prop="showStatus">
        <el-input v-model="dataForm.showStatus" placeholder="是否显示" />
      </el-form-item>
      <el-form-item label="品牌logo" prop="logo">
        <el-input v-model="dataForm.logo" placeholder="品牌logo" />
      </el-form-item>
      <el-form-item label="专区大图" prop="bigPic">
        <el-input v-model="dataForm.bigPic" placeholder="专区大图" />
      </el-form-item>
      <el-form-item label="品牌故事" prop="brandStory">
        <el-input v-model="dataForm.brandStory" placeholder="品牌故事" />
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      visible: false,
      dataForm: {
        id: 0,
        name: '',
        firstLetter: '',
        sort: '',
        isFactory: '',
        showStatus: '',
        logo: '',
        bigPic: '',
        brandStory: ''
      },
      dataRule: {
        name: [
          { required: true, message: '名称不能为空', trigger: 'blur' }
        ],
        firstLetter: [
          { required: true, message: '首字母不能为空', trigger: 'blur' }
        ],
        sort: [
          { required: true, message: '排序不能为空', trigger: 'blur' }
        ],
        isFactory: [
          { required: true, message: '是否为品牌制造商：0->不是；1->是不能为空', trigger: 'blur' }
        ],
        showStatus: [
          { required: true, message: '是否显示不能为空', trigger: 'blur' }
        ],
        logo: [
          { required: true, message: '品牌logo不能为空', trigger: 'blur' }
        ],
        bigPic: [
          { required: true, message: '专区大图不能为空', trigger: 'blur' }
        ],
        brandStory: [
          { required: true, message: '品牌故事不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    init(id) {
      this.dataForm.id = id || 0
      this.visible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].resetFields()
        if (this.dataForm.id) {
          this.$http({
            url: this.$http.adornUrl(`/web/producbrand/info/${this.dataForm.id}`),
            method: 'get',
            params: this.$http.adornParams()
          }).then(({ data }) => {
            if (data && data.code === 0) {
              this.dataForm.name = data.producbrand.name
              this.dataForm.firstLetter = data.producbrand.firstLetter
              this.dataForm.sort = data.producbrand.sort
              this.dataForm.isFactory = data.producbrand.isFactory
              this.dataForm.showStatus = data.producbrand.showStatus
              this.dataForm.logo = data.producbrand.logo
              this.dataForm.bigPic = data.producbrand.bigPic
              this.dataForm.brandStory = data.producbrand.brandStory
            }
          })
        }
      })
    },
    // 表单提交
    dataFormSubmit() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.$http({
            url: this.$http.adornUrl(`/web/producbrand/${!this.dataForm.id ? 'save' : 'update'}`),
            method: 'post',
            data: this.$http.adornData({
              'id': this.dataForm.id || undefined,
              'name': this.dataForm.name,
              'firstLetter': this.dataForm.firstLetter,
              'sort': this.dataForm.sort,
              'isFactory': this.dataForm.isFactory,
              'showStatus': this.dataForm.showStatus,
              'logo': this.dataForm.logo,
              'bigPic': this.dataForm.bigPic,
              'brandStory': this.dataForm.brandStory
            })
          }).then(({ data }) => {
            if (data && data.code === 0) {
              this.$message({
                message: '操作成功',
                type: 'success',
                duration: 1500,
                onClose: () => {
                  this.visible = false
                  this.$emit('refreshDataList')
                }
              })
            } else {
              this.$message.error(data.msg)
            }
          })
        }
      })
    }
  }
}
</script>
