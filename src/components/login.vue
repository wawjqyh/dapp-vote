<template>
  <div class="c-login">
    <el-input class="c-login-input" v-model="previteKey" placeholder="请输入您的私钥" />
    <el-button class="c-login-btn" type="primary" @click="handleLogin">进入</el-button>
  </div>
</template>

<script>
export default {
  name: 'cLogin',

  data() {
    return {
      previteKey: ''
    };
  },

  mounted() {
    this.$nextTick(() => {
      this.autoLogin();
    });
  },

  methods: {
    autoLogin() {
      let key = window.localStorage.getItem('key');

      if (key) {
        this.previteKey = key;
        this.handleLogin();
      }
    },

    handleLogin() {
      try {
        this.$eth.init(this.previteKey);
        window.localStorage.setItem('key', this.previteKey);
        this.$emit('onLogin');
      } catch (err) {
        this.$message({
          message: '操作失败',
          type: 'error'
        });
        console.log('登录失败');
        console.log(err);
      }
    },

    logout() {
      this.previteKey = '';
    }
  }
};
</script>

<style>
.c-login {
  position: absolute;
  width: 400px;
  left: 100px;
  top: 50%;
  transform: translate(0, -50%);
  padding: 50px;
}

.c-login-input {
  width: 100%;
}

.c-login-btn {
  width: 100%;
  margin-top: 20px !important;
}
</style>
