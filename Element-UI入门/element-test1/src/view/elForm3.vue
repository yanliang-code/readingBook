<template>
  <div id="app">
    <!-- 
        表单验证高级用法
        用法二：手动控制校验状态
        加上status-icon此属性，输入框右侧会有图标进行校验状态展示
    -->
    <el-form
      inline
      :model="data"
      :rules="rules"
      ref="elForm"
      validate-on-rule-change
      status-icon
    >
      <!-- 
          validate-status代表不同的验证状态，共四种情况(没啥用)
            success：验证成功
            error：验证失败
            validating：验证中
            (空)：未验证
          error：自定义错误提示

          validate-status、error用于设置自定义错误提示
          首先，validate-status设置为error(不管输入框内的值是否符合校验规则，都会变红)，
          并且error对应的值在下方进行错误显示
       -->
      <el-form-item
        label="审批人"
        prop="user"
        :validate-status="status"
        :error="error"
      >
        <el-input v-model="data.user" placeholder="审批人"></el-input>
      </el-form-item>
      <el-form-item label="活动区域">
        <el-select v-model="data.region" placeholder="活动区域">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
        <el-button type="success" @click="showSuccess">成功校验</el-button>
        <el-button type="danger" @click="showError">失败校验</el-button>
        <el-button type="warning" @click="showValidating">校验中</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'app',
  data() {
    const userValidator = (rule, value, callback) => {
      if (value.length > 3) {
        this.inputError = ''
        this.inputValidateStatus = ''
        callback()
      } else {
        callback(new Error('用户名长度必须大于3'))
      }
    }
    return {
      data: {
        user: 'sam',
        region: '区域二'
      },
      error: '这是一个自定义的错误',
      status: 'error',
      rules: {
        user: [
          { required: true, trigger: 'blur', message: '用户名必须录入' },
          { validator: userValidator, trigger: 'change' }
        ]
      }
    }
  },
  methods: {
    onSubmit() {
      this.$refs.elForm.validate((isValid, error) => {
        console.log(isValid, error)
      })
    },
    showError() {
      this.status = 'error'
      this.error = '用户名输入有误'
    },
    showSuccess() {
      this.status = 'success'
      this.error = ''
    },
    showValidating() {
      this.status = 'validating'
      this.error = ''
    }
  }
}
</script>
