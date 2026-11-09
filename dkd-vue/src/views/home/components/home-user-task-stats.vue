<template>
  <div class="box home-user-task-stats bgc1">
    <div class="header">
      <div class="title">
        工单统计<span class="sub-title">{{ start }} ~ {{ end }}</span>
      </div>
    </div>
    <div v-if="userTaskStats.length" class="body">
      <div class="stats">
        <div class="item">
          <div class="num color1 text-shadow1">
            {{ userTaskStats[0].total + userTaskStats[1].total }}
          </div>
          <div class="text color2">工单总数（个）</div>
        </div>
      </div>
      <div class="stats">
        <div class="item">
          <div class="num color1 text-shadow1">
            {{
              userTaskStats[0].completedTotal + userTaskStats[1].completedTotal
            }}
          </div>
          <div class="text color2">完成工单（个）</div>
        </div>
      </div>
      <div class="stats">
        <div class="item">
          <div class="num color1 text-shadow1">
            {{
              userTaskStats[0].progressTotal + userTaskStats[1].progressTotal
            }}
          </div>
          <div class="text color2">进行工单（个）</div>
        </div>
      </div>
      <div class="stats">
        <div class="item">
          <div class="num color1 text-shadow1">
            {{ userTaskStats[0].cancelTotal + userTaskStats[1].cancelTotal }}
          </div>
          <div class="text color2">取消工单（个）</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import dayjs from 'dayjs';
// 定义变量
const repair = ref(false);
const orderCountNum = ref(0);
const orderAmountNum = ref(0);
const start = dayjs().startOf('month').format('YYYY.MM.DD');
const end = dayjs().endOf('day').format('YYYY.MM.DD');
const userTaskStats = ref([
  {
    total: 6,
    completedTotal: 4,
    cancelTotal: 1,
    progressTotal: 1,
    workerCount: 16,
    repair: false,
    date: null,
  },
  {
    total: 6,
    completedTotal: 4,
    cancelTotal: 1,
    progressTotal:1,
    workerCount: 12,
    repair: true,
    date: null,
  },
]);
// 定义方法
const orderCount = () => {
  const month = {
    start: dayjs().startOf('month').format('YYYY-MM-DD HH:mm:ss'),
    end: dayjs().endOf('day').format('YYYY-MM-DD HH:mm:ss'),
  };
};
</script>
<style lang="scss" scoped>
// TODO: 首页、人效统计、对账统计样式抽出组件
.home-user-task-stats {
  display: flex;
  flex-direction: column;
  height: calc((100vh - 120px) * 0.2);
  min-height: 166px;
  background: #1a1e25;
  border-radius: 20px;

  .body {
    flex: 1;
    display: flex;

    .stats {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;

      .item {
        display: inline-flex; // 关键点
        flex-direction: column;

        .num {
          height: 50px;
          font-size: 36px;
          font-family: PingFangSC-Semibold, PingFang SC;
          font-weight: 600;
          line-height: 50px;
          text-shadow: 2px 4px 12px rgba(212, 175, 55, 0.35);
        }

        .text {
          height: 17px;
          margin-top: 3px;
          font-size: 12px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #a9aaae;
          line-height: 17px;
        }

        .color1 {
          color: #f0d998;
        }

        .color2 {
          color: #a9aaae;
        }

        .color3 {
          color: #e8b96a;
        }

        .color4 {
          color: #c9a06a;
        }

        .text-shadow1 {
          text-shadow: 2px 4px 12px rgba(212, 175, 55, 0.35);
        }

        .text-shadow2 {
          text-shadow: 2px 4px 12px rgba(212, 175, 55, 0.30);
        }
      }
    }
  }
}

.bgc1 {
  background: #1a1e25;
}

.bgc2 {
  background: #1a1e25;
}
</style>