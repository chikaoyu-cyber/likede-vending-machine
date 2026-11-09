<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryRef" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="设备编号" prop="innerCode">
        <el-input
          v-model="queryParams.innerCode"
          placeholder="请输入设备编号"
          clearable
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="Search" @click="handleQuery">搜索</el-button>
        <el-button icon="Refresh" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-table v-loading="loading" :data="vmList">
      <el-table-column label="序号" type="index" width="55" align="center" />
      <el-table-column label="设备编号" align="center" prop="innerCode" />
      <el-table-column label="设备型号" align="center" prop="vmTypeId">
        <template #default="scope">
          <div v-for="item in vmTypeList" :key="item.id">
            <span v-if="item.id == scope.row.vmTypeId">{{ item.name }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="详细地址" align="left" prop="addr" show-overflow-tooltip />
      <el-table-column label="运营状态" align="center" prop="vmStatus">
        <template #default="scope">
          <dict-tag :options="vm_status" :value="scope.row.vmStatus" />
        </template>
      </el-table-column>
      <el-table-column label="设备状态" align="center" prop="runningStatus">
        <template #default="scope">
          {{ scope.row.runningStatus != null ? (JSON.parse(scope.row.runningStatus).status === true ? '正常' : '异常') : '异常' }}
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

<script setup name="Vm">
import { listVm } from "@/api/manage/vm";
import { listVmtype } from "@/api/manage/vmtype";
import { loadAllParams } from "@/api/page";

const { proxy } = getCurrentInstance();
const { vm_status } = proxy.useDict('vm_status');

const vmList = ref([]);
const loading = ref(true);
const showSearch = ref(true);
const total = ref(0);
const vmTypeList = ref([]);

const data = reactive({
  queryParams: {
    pageNum: 1,
    pageSize: 10,
    innerCode: null,
  }
});

const { queryParams } = toRefs(data);

/** 查询设备管理列表 */
function getList() {
  loading.value = true;
  listVm(queryParams.value).then(response => {
    vmList.value = response.rows;
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
  proxy.resetForm("queryRef");
  handleQuery();
}

/** 查询设备类型列表（用于型号名称回显） */
function getVmTypeList() {
  listVmtype(loadAllParams).then(response => {
    vmTypeList.value = response.rows;
  });
}

getVmTypeList();
getList();
</script>
