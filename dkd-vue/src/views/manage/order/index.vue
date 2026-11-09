<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryRef" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="订单编号" prop="orderNo">
        <el-input
          v-model="queryParams.orderNo"
          placeholder="请输入订单编号"
          clearable
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item label="创建时间" style="width: 308px">
        <el-date-picker
          v-model="dateRange"
          value-format="YYYY-MM-DD"
          type="daterange"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="Search" @click="handleQuery">搜索</el-button>
        <el-button icon="Refresh" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-table v-loading="loading" :data="orderList">
      <el-table-column label="序号" type="index" align="center" prop="id" width="80" />
      <el-table-column label="订单编号" align="center" prop="orderNo" show-overflow-tooltip />
      <el-table-column label="商品名称" align="center" prop="skuName" />
      <el-table-column label="订单状态" align="center" prop="status">
        <template #default="scope">
          <dict-tag :options="orderStatusOptions" :value="scope.row.status" />
        </template>
      </el-table-column>
      <el-table-column label="订单金额" align="center" prop="amount" />
      <el-table-column label="订单时间" align="center" prop="createTime" width="180">
        <template #default="scope">
          <span>{{ parseTime(scope.row.createTime, '{y}-{m}-{d} {h}:{i}:{s}') }}</span>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total > 0"
      :total="total"
      v-model:page="queryParams.pageNum"
      v-model:limit="queryParams.pageSize"
      @pagination="getList"
    />
  </div>
</template>

<script setup name="Order">
import { listOrder } from "@/api/manage/order";

const { proxy } = getCurrentInstance();

/**
 * 订单状态字典（本地定义）
 * 来源：后端 com.dkd.manage.domain.Order 实体注释
 *   0-待支付; 1-支付完成; 2-出货成功; 3-出货失败; 4-已取消
 * 说明：演示库中 sys_dict_data 未初始化 order_status 字典，若直接 useDict 会得到
 * 空数组，DictTag 因 options.length === 0 而不渲染任何内容（列表该列空白）。
 * 这里改用本地映射，不依赖数据库初始化，保证任何环境都能正确回显。
 */
const orderStatusOptions = ref([
  { label: '待支付', value: '0', elTagType: 'warning', elTagClass: '' },
  { label: '支付完成', value: '1', elTagType: 'primary', elTagClass: '' },
  { label: '出货成功', value: '2', elTagType: 'success', elTagClass: '' },
  { label: '出货失败', value: '3', elTagType: 'danger', elTagClass: '' },
  { label: '已取消', value: '4', elTagType: 'info', elTagClass: '' },
]);

const orderList = ref([]);
const loading = ref(true);
const showSearch = ref(true);
const total = ref(0);
const dateRange = ref([]);

const data = reactive({
  queryParams: {
    pageNum: 1,
    pageSize: 10,
    orderNo: null,
    createTime: null,
  }
});

const { queryParams } = toRefs(data);

/** 查询订单列表 */
function getList() {
  loading.value = true;
  listOrder(proxy.addDateRange(queryParams.value, dateRange.value)).then(response => {
    orderList.value = response.rows;
    total.value = response.total;
    loading.value = false;
  });
}

/** 搜索按钮操作 */
function handleQuery() {
  queryParams.value.pageNum = 1;
  getList();
}

/** 重置按钮操作 */
function resetQuery() {
  dateRange.value = [];
  proxy.resetForm("queryRef");
  handleQuery();
}

getList();
</script>
