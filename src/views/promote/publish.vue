<template>
    <div class="app-container">
        <el-row>
            <el-col :span="16" :offset="4">
                <el-card class="box-card">
                    <div slot="header">
                        标题：
                        <el-input v-model="title" style="width:200px;"></el-input>
                    </div>
                    <div class="statistics-box">
                        <div ref="toolbar" class="toolbar"></div>
                        <div ref="editor" class="text"></div>
                    </div>
                    <div style="text-align:right;padding:10px;">
                        <el-button size="small" type="primary" @click="addPublicReport">发布</el-button>
                    </div>
                    <!-- <div v-html="editorContent"></div> -->
                </el-card>

            </el-col>
        </el-row>

    </div>
</template>

<script>
// todo xss 攻击
import E from 'wangeditor'
export default {
  name: 'editor',
  data() {
    return {
      title: '',
      centerDialogVisible: false,
      editorContent: ''
    }
  },
  methods: {
    getContent: function() {
      alert(this.editorContent)
    },
    addPublicReport() {
      const form = {
        title: this.title,
        content: this.editorContent
      }
      this.$store.dispatch('addPublicReport', form).then((res) => {
        console.log(res)
      }).catch((err) => {
        this.$message({
          showClose: true,
          message: err.response.data.message,
          type: 'error',
          duration: 5 * 1000
        })
      })
    }
  },
  mounted() {
    var editor = new E(this.$refs.toolbar, this.$refs.editor)
    editor.customConfig.onchange = (html) => {
      this.editorContent = html
    }
    editor.create()
  }
}
</script>

<style scoped>
.statistics-box .toolbar {
    padding: 5px;
 border: 1px solid #ccc; 
}
.statistics-box .text {
 border: 1px solid #ccc;
 height: 400px;
}
</style>