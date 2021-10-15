<template>
  <div class="c-account">
    <div class="c-account-title">我的账户</div>

    <div class="message">
      <i class="el-icon-bank-card" />
      <span>{{ balance }} ETH</span>
    </div>
    <div>
      <i class="el-icon-location-information" />
      <span>{{ address }}</span>
    </div>

    <i class="el-icon-switch-button" @click="handleLogout" />
  </div>
</template>

<script>
export default {
  name: 'cAccount',

  data() {
    return {
      balance: 0,
      address: ''
    };
  },

  mounted() {
    this.$nextTick(() => {
      this.getBalance();
      this.getAddress();
    });
  },

  methods: {
    async getBalance() {
      try {
        let balance = await this.$eth.wallet.getBalance();
        let val = balance.toString() / 1000000000000000000;
        this.balance = val.toFixed(5);

        this.$emit('onUpdateBalance', this.balance);
      } catch (err) {
        this.$message({
          message: '获取余额失败',
          type: 'error'
        });
        console.log('获取余额失败');
        console.log(err);
      }
    },

    getAddress() {
      this.address = this.$eth.wallet.address;
      this.$emit('onUpdateAddress', this.address);
    },

    handleLogout() {
      this.$confirm('确定退出？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          window.localStorage.removeItem('key');
          this.$emit('onLogout');
        })
        .catch(() => {});
    }
  }
};
</script>

<style>
.c-account {
  position: relative;
  padding: 20px 40px;
  border-bottom: 1px solid #ddd;
  box-shadow: 0 0 10px #ccc;
}

.c-account-title {
  line-height: 30px;
  font-size: 14px;
  font-weight: bold;
  color: rgb(53, 139, 238);
}

.message {
  display: flex;
  align-items: center;
  line-height: 30px;
}

.c-account div i {
  color: rgb(53, 139, 238);
  font-size: 20px;
}

.c-account div span {
  margin-left: 10px;
}

.el-icon-switch-button {
  position: absolute;
  color: #f00;
  font-size: 20px;
  right: 40px;
  top: 50px;
  cursor: pointer;
}
</style>
