<template>
  <div id="app">
    <!-- 
        1.el-form容器，通过model绑定数据
        2.el-form-item容器，通过label绑定标签
        3.表单组件通过v-model绑定model中的数据 
        4.inline属性使得所有el-form-item排在一行 
        5.触发校验规则有两种：rules、prop以及v-model的结合；手动通过ref调用validate；
    -->
    <el-form inline :model="data" :rules="rules" ref="elForm">
      <!-- el-form会拿user的校验规则去检验指定el-form-item包裹的控件对应的model值 -->
      <!-- 此处必须是prop，rules必须加s -->
      <el-form-item label="审批人" prop="user">
        <el-input v-model="data.user" placeholder="审批人"></el-input>
      </el-form-item>
      <el-form-item label="活动区域">
        <el-select v-model="data.region" placeholder="活动区域">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <!-- 
          记住：prop的值必须和v-model的绑定的属性需要一样
          trigger：change、blur
          change：在输入框改变内容就会触发校验规则
          blur：在输入框中修改内容不会触发校验规则，会在最后此输入框失去焦点时触发校验规则
       -->
      <el-form-item label="changeLabel" prop="changeValue">
        <el-input v-model="data.changeValue" placeholder="111"></el-input>
      </el-form-item>
      <el-form-item label="blurLabel" prop="blurValue">
        <el-input v-model="data.blurValue" placeholder="22"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "app",
  data() {
    //  上面表单使用原生一样可以完成，为什么还是要使用el-form、el-form-item
    //  可以定义校验规则，绑定到 el-form 或 el-form-item
    const userValidator = (rule, value, callback) => {
      // 长度超过3个，通过验证
      if (value.length > 3) {
        callback();
        // 小于3个，给出提示
      } else {
        callback(new Error("用户名长度必须大于3"));
      }
    };
    return {
      // 表单数据源
      data: {
        user: "sam",
        region: "区域二",
        changeValue: "changeValue",
        blurValue: "blurValue"
      },
      // rules规则，定义为响应式数据（此处作用是将校验前置，避免点击提交后过多处理逻辑）
      // rules需要绑定到el-form上（rules）
      // rules内的属性对需要绑定在el-form-item上（props）
      rules: {
        //  具体校验规则（目前的规则都是change变化时候触发，如果手动触发校验，需要通过refs）
        user: [
          // 文字发生change变化时，如果没有填写，触发必填规则，给出提示
          { required: true, trigger: "blur", message: "用户名必须录入" },
          // 自定义校验规则：文字发生change变化时，触发userValidator函数
          { validator: userValidator, trigger: "change" }
        ],
        changeValue: [
          { required: true, trigger: "change", message: "触发change" }
        ],
        blurValue: [{ required: true, trigger: "blur", message: "触发blur" }]
      }
    };
  },
  methods: {
    onSubmit() {
      console.log(this.data);
      // 手动触发校验方法
      // isValid：当前表单是否符合校验规则
      // error：不符合校验规则的具体位置，以及理由
      this.$refs.elForm.validate((isValid, error) => {
        console.log(isValid, error);
      });
    }
  }
};
</script>
