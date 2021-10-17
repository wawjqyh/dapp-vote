<template>
  <div class="c-admin">
    <el-button type="primary" @click="handleEnd">结束投票</el-button>
  </div>
</template>

<script>
export default {
  name: 'cAdmin',

  data() {
    return {
      loading: false
    };
  },

  methods: {
    async handleEnd() {
      this.loading = true;

      try {
        let call = await this.$eth.contract.endVote();
        await call.wait(1);

        this.$message({
          message: '操作成功',
          type: 'success'
        });
      } catch (err) {
        console.log('结束投票失败');
        console.log(err);
      }

      this.loading = false;
    }
  }
};
</script>

<style>
.c-admin {
  position: relative;
  padding: 20px 40px;
  border-top: 1px solid #ddd;
  box-shadow: 0 0 10px #ccc;
  display: flex;
  justify-content: center;
}
</style>
