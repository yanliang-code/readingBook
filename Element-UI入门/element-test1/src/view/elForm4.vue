<template>
  <div id="app">
    <!-- 
        表单属性解析
            label-position：标签位置，枚举值，left 和 top
            label-width：标签宽度
            label-suffix：标签后缀(给label统一加后缀)
            inline：行内表单
            disabled: 设置整个 form 中的表单组件全部 disabled，优先级低于表单组件自身的 disabled
                disabled内部实现：el-form通过provide、inject将自身对象传递给被el-form包裹的子组件el-input
                el-input先判断自身是否绑定禁用属性，再判断el-form对象是否绑定禁用属性（自己开发可以借鉴）
            size：控件的尺寸，也是通过disabled的机制，不过三层关系el-form、el-form-item、el-input
            hide-required-asterisk：用于控制必填项label左上角的红色星号是否显示
    -->
    <!-- 
        取消行内属性，设置表单整体宽带
     -->
    <el-form
      :inline="false"
      style="width:500px;"
      label-width="100px"
      label-position="right"
      label-suffix=":"
      disabled
      size="small"
      :hide-required-asterisk="true"
      :model="data"
      :rules="rules"
      ref="elForm"
      validate-on-rule-change
      status-icon
    >
      <el-form-item
        label="审批人"
        prop="user"
        :validate-status="status"
        :error="error"
      >
        <el-input v-model="data.user" placeholder="审批人"></el-input>
      </el-form-item>
      <el-form-item label="活动区域">
        <el-select
          v-model="data.region"
          placeholder="活动区域"
          style="width:100%;"
        >
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
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
    }
  }
}
</script>
