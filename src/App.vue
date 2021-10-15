<template>
  <div id="app">
    <v-login ref="refLogin" v-if="!isLogin" @onLogin="handleLogin" />

    <div v-else>
      <v-account
        ref="refAccount"
        @onLogout="handleLogout"
        @onUpdateBalance="handleUpdateBalance"
        @onUpdateAddress="handleUpdateAddress"
      />
      <v-vote :balance="balance" @onVote="handleVote" />

      <v-admin v-if="address && address === owner" />
    </div>
  </div>
</template>

<script>
import vLogin from './components/login.vue';
import vAccount from './components/account.vue';
import vVote from './components/vote.vue';
import vAdmin from './components/admin.vue';

export default {
  name: 'App',

  components: {
    vLogin,
    vAccount,
    vVote,
    vAdmin
  },

  data() {
    return {
      isLogin: false,
      balance: '0',
      address: '',
      owner: ''
    };
  },

  methods: {
    handleLogin() {
      this.isLogin = true;

      this.getOwner();
    },

    handleLogout() {
      this.isLogin = false;
      this.$nextTick(() => {
        this.$refs.refLogin.logout();
      });
    },

    handleUpdateBalance(val) {
      this.balance = val;
    },

    handleUpdateAddress(ads) {
      this.address = ads;
    },

    handleVote() {
      this.$refs.refAccount.getBalance();
    },

    async getOwner() {
      try {
        const res = await this.$eth.contract.owner();
        this.owner = res;
      } catch (err) {
        this.$message({
          message: '获取管理员失败',
          type: 'error'
        });
        console.log('获取管理员失败');
        console.log(err);
      }
    }
  }
};
</script>

<style>
body,
html {
  margin: 0;
  padding: 0;
  background-color: rgb(51, 47, 44);
  height: 100%;
  color: #333;
  font-size: 14px;
}

* {
  box-sizing: border-box;
}

#app {
  position: relative;
  width: 600px;
  min-height: 100%;
  margin: 0 auto;
  background-color: #fff;
  overflow-x: hidden;
}
</style>
