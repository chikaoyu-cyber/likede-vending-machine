<template>
  <div class="box home-sku-sale-stats bgc2">
    <div class="header">
      <div class="title">
        销售统计<span class="sub-title">{{ start }} ~ {{ end }}</span>
      </div>
    </div>
    <div class="body">
      <div class="stats">
        <div class="item">
          <div class="num color3 text-shadow2">
            {{ orderCountNum }}
          </div>
          <div class="text color4">订单量（个）</div>
        </div>
      </div>
      <div class="stats">
        <div class="item">
          <div class="num color3 text-shadow2">
            {{
              orderAmountNum > 10000
                ? (orderAmountNum / 10000).toFixed(2)
                : orderAmountNum
            }}
          </div>
          <div class="text color4">
            销售额（{{ orderAmountNum > 10000 ? '万元' : '元' }}）
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import dayjs from 'dayjs';
// 定义变量
const repair = ref(false);
const orderCountNum = ref(7358);
const orderAmountNum = ref(7351);
const start = dayjs().startOf('month').format('YYYY.MM.DD');
const end = dayjs().endOf('day').format('YYYY.MM.DD');
// 定义方法
const orderCount = () => {
  const month = {
    start: dayjs().startOf('month').format('YYYY-MM-DD HH:mm:ss'),
    end: dayjs().endOf('day').format('YYYY-MM-DD HH:mm:ss'),
  };
};
</script>
<style lang="scss" scoped>
.home-sku-sale-stats {
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

// .bgc1 {
//   background: #1a1e25;
//   background-image: url('~@/assets/home/circle.png'), url('~@/assets/home/task.png');
//   background-repeat: no-repeat, no-repeat;
//   background-position: 0 0, calc(100% - 12px) 100%;
// }

// .bgc2 {
//   background: #FBEFE8 url('~@/assets/home/sale.png') no-repeat calc(100% - 12px) 100%;
// }
</style>
