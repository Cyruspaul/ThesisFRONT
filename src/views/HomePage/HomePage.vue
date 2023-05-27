<template>
  <div class="w-100 d-flex justify-content-center align-items-center" style="height: 100vh">

    <a-form :model="form" :style="{ 'width': '400px'}" class="" @submit="handleSubmit">
      <a-form-item field="username" label="Username">
        <a-input
            v-model="form.username"
            placeholder=""
        />
      </a-form-item>
      <a-form-item field="password" label="Password">
        <a-input-password v-model="form.password" placeholder=""/>
      </a-form-item>
      <a-form-item field="validationcode" label="Code">
        <a-input v-model="form.validationcode" placeholder=""/>
        <span
            class="w-100 h-100 text-center bg-light fw-bold text-primary px-0 py-1 ms-3">
            123
          </span>
      </a-form-item>
      <a-form-item field="usertype">
        <a-radio-group v-model="form.usertype" type="radio">
          <a-radio :model-value="form.usertype" value="Teacher">教师</a-radio>
          <a-radio :model-value="form.usertype" value="Supervisor"> 系部管理员</a-radio>
        </a-radio-group>
      </a-form-item>
      <a-form-item>
        <a-button html-type="submit" long status="normal" type="primary">Submit</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
import router from "../../router";


export default {
  name: 'Homepage',
  data() {
    return {
      form: {
        username: "Cyrus",
        password: "123456",
        validationcode: "123",
        usertype: "Supervisor",
      },

    }
  },
  methods: {
    handleSubmit(data) {
      // console.log(data)
      // store.state.UserInfo.usertype.value = this.form.usertype.toUpperCase()
      router.push({path: "/" + this.form.usertype.toLowerCase()})
    }
  }
};
</script>
