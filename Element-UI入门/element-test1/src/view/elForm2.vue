<template>
  <div id="app">
    <!-- 
        表单验证高级用法
        用法一：动态改变校验规则
    -->
    <!-- 
        validate-on-rule-change
        true：监听到rlues对象变化，立刻按照新的校验规则进行一次校验
        false：不会立刻进行校验
     -->
    <el-form
      inline
      :model="data"
      :rules="rules"
      ref="elForm"
      :validate-on-rule-change="false"
    >
      <el-form-item label="审批人" prop="user">
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
        <el-button type="primary" @click="addRule">添加校验规则</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'app',
  data() {
    return {
      data: {
        user: 'sam',
        region: '区域二'
      },
      rules: {
        user: [{ required: true, trigger: 'blur', message: '用户名必须录入' }]
      }
    }
  },
  methods: {
    //   动态添加 rules
    addRule() {
      // 创建新的规则
      const userValidator = (rule, value, callback) => {
        if (value.length > 3) {
          this.inputError = ''
          this.inputValidateStatus = ''
          callback()
        } else {
          callback(new Error('用户名长度必须大于3'))
        }
      }
      //   新旧规则融合（具体一个控件的规则）
      const newRule = [
        ...this.rules.user,
        { validator: userValidator, trigger: 'change' }
      ]
      //   指定prop为user的控件规则与其余控件规则合并到空对象上，赋值给指定变量
      //   不使用this.rules.user.push(newRule)原因：监听this.rules无法发现rlues下的属性变化
      //   只能将this.rules的指向改变，触发监听生效
      this.rules = Object.assign({}, this.rules, { user: newRule })
    },
    onSubmit() {
      this.$refs.elForm.validate((isValid, error) => {
        console.log(isValid, error)
      })
    }
  }
}
</script>
