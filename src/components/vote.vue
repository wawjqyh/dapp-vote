<template>
  <div class="c-vote">
    <div class="c-vote-title">选出最帅前端</div>

    <ul class="c-vote-list" v-loading="loading">
      <li
        v-for="(item, index) in list"
        :key="index"
        :class="{ active: index === selected }"
        @click="handleSelect(index)"
      >
        <img class="image" :src="item.image" />
        <div class="name">{{ item.name }}</div>
        <div class="votes">{{ item.votes }}</div>
      </li>
    </ul>

    <div class="btn-row">
      <el-button type="primary" :loading="submiting" @click="handleVote" style="width: 150px">
        <span v-if="submiting">等待打包...</span>
        <span v-else>投票</span>
      </el-button>
    </div>
    <div class="tip">投票将消耗 0.1 ETH</div>
  </div>
</template>

<script>
import { utils } from 'ethers';

export default {
  name: 'cVote',

  props: {
    balance: String
  },

  data() {
    return {
      selected: null,

      list: [
        { name: '邓燊', votes: 0, image: require('../assets/u-0.png') },
        { name: '李集良', votes: 0, image: require('../assets/u-1.png') },
        { name: '邱宇航', votes: 0, image: require('../assets/u-2.png') },
        { name: '饶文斌', votes: 0, image: require('../assets/u-3.png') },
        { name: '王鑫', votes: 0, image: require('../assets/u-4.png') },
        { name: '徐旺', votes: 0, image: require('../assets/u-5.png') },
        { name: '杨利东', votes: 0, image: require('../assets/u-6.png') },
        { name: '钟大康', votes: 0, image: require('../assets/u-7.png') },
        { name: '周会余', votes: 0, image: require('../assets/u-8.png') }
      ],

      loading: false,
      submiting: false
    };
  },

  mounted() {
    this.getVotes();
  },

  methods: {
    handleSelect(index) {
      this.selected = index;
    },

    async getVotes() {
      this.loading = true;

      try {
        for (let i = 0; i < this.list.length; i++) {
          const res = await this.$eth.contract.list(i);
          this.list[i].votes = res.votes.toString();
        }
      } catch (err) {
        this.$message({
          message: '获取票数失败',
          type: 'error'
        });
        console.log('获取票数失败');
        console.log(err);
      }

      this.loading = false;
    },

    async handleVote() {
      if (typeof this.selected !== 'number') {
        this.$message({
          message: '请选择',
          type: 'error'
        });
        return false;
      }
      if (this.balance < 0.1) {
        this.$message({
          message: '您的余额不足',
          type: 'error'
        });
        return false;
      }

      this.submiting = true;

      try {
        let call = await this.$eth.contract.vote(this.selected, { value: utils.parseEther('0.1') });
        await call.wait(1);

        this.$message({
          message: '投票成功！',
          type: 'success'
        });

        this.selected = null;

        // 更新票数
        this.getVotes();

        this.$emit('onVote');
      } catch (err) {
        this.$message({
          message: '投票失败',
          type: 'error'
        });
        console.log('投票失败');
        console.log(err);
      }

      this.submiting = false;
    }
  }
};
</script>

<style>
.c-vote {
  padding-top: 20px;
}

.c-vote-title {
  font-size: 18px;
  text-align: center;
}

.c-vote-list {
  margin: 20px 0 0 0;
  padding: 0 40px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.c-vote-list li {
  position: relative;
  width: 150px;
  height: 150px;
  border-radius: 5px;
  overflow: hidden;
  margin-bottom: 30px;
  border: 3px solid #fff;
  cursor: pointer;
}

.active {
  border-color: rgb(72, 130, 236) !important;
}

.image {
  display: block;
  width: 100%;
  height: 100%;
}

.name {
  position: absolute;
  height: 40px;
  line-height: 40px;
  width: 100%;
  left: 0;
  bottom: 0;
  text-align: center;
  background-color: rgba(255, 255, 255, 0.6);
}

.votes {
  position: absolute;
  top: 5px;
  right: 5px;
  width: 50px;
  height: 20px;
  line-height: 20px;
  border-radius: 10px;
  text-align: center;
  color: #fff;
  background-color: rgb(91, 145, 245);
}

.btn-row {
  display: flex;
  justify-content: center;
}
.tip {
  font-size: 12px;
  text-align: center;
  color: #bbb;
  padding: 5px 0 50px 0;
}
</style>
