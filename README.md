<div align="center">
  <img src="docs/screenshots/brand-banner.png" alt="立可得" width="100%">
  <h1>立可得 · 智能售货机运营管理平台</h1>
  <p><b>好生活，随时来一瓶</b>　|　智能零售 · 安心选取 · 即时畅饮</p>
  <p>
    <b>三端一体</b>：运营后台（Web） · 运维 App（Android） · 售货机大屏（C 端）
  </p>
</div>

一套面向智能售货机运营方的 B 端管理系统，把**设备、点位、商品、工单、订单与运营数据**串成闭环，同时提供面向运维人员的**移动客户端**和面向消费者的**售货机大屏**。

---

## 一、三端总览

| 端 | 使用者 | 形态 / 目录 | 核心职责 |
| --- | --- | --- | --- |
| **运营后台** | 运营管理员 | `dkd-vue`（Web，`5173`） | 设备/点位/商品/策略配置，工单与订单管理，运营数据看板 |
| **运维 App** | 一线运维人员 | Android apk（模拟器运行） | 接收待办工单、查看补货/维修明细、接受或拒绝、追踪进行中工单 |
| **售货机大屏** | C 端消费者 | `screen`（静态页面） | 商品展示、扫码选货、微信/支付宝支付、出货通知 |

三端通过后端服务协同：后台下发工单 → App 接收并处理 → 大屏完成销售 → 订单与设备状态回流后台看板。

---

## 二、项目背景

随着售货机投放规模扩大，人工巡检、纸质工单、分散台账会迅速推高运营成本。本平台从运营方视角出发，把设备状态、货道库存、补货工单、销售数据统一在线化：

- **降本**：按设备状态与缺货情况生成工单，减少无效巡店；
- **提效**：点位、设备、商品、策略集中配置，运营数据实时看板；
- **增收**：按点位与商圈匹配商品和价格策略，缩短新设备盈利周期；
- **体验**：C 端用户扫码选货、移动支付，出货结果通过 MQTT 回传大屏。

业务上支持自营、加盟、点位主分成等多种合作模式。

---

## 三、系统组成

| 组成 | 目录 / 启动类 | 端口 | 职责 |
| --- | --- | --- | --- |
| 后台管理前端 | `dkd-vue` | `5173` | Vue 3 + Element Plus，黑金主题运营后台 |
| 平台管理后端 | `dkd-admin` → `com.dkd.DkdApplication` | `8080` | 登录鉴权、后台全部管理接口 |
| 运维端接口 | `dkd-app` → `com.dkd.app.Application` | `9007` | 供安卓运维 App 调用 |
| 售货机端接口 | `dkd-applet` → `com.dkd.applet.Application` | `9008` | 商品列表、下单与支付 |
| 售货机大屏 | `screen` | 静态页面 | 商品展示、扫码支付、出货通知 |
| 公共模块 | `dkd-common` / `dkd-framework` / `dkd-system` / `dkd-manage` / `dkd-quartz` / `dkd-generator` | — | 通用工具、安全框架、系统域、业务域、定时任务、代码生成 |

---

## 四、功能模块

### 运营后台

| 模块 | 主要能力 |
| --- | --- |
| 首页工作台 | 工单统计、销售统计、销售趋势、商品热榜、合作商点位 Top5、异常设备监控 |
| 工单管理 | 运营工单 / 运维工单列表，按编号模糊检索，工单详情与取消工单 |
| 点位管理 | 点位、区域、合作商维护，点位详情与设备关联 |
| 设备管理 | 设备台账、设备状态、设备类型、货道配置、编号片段搜索 |
| 人员管理 | 运维/运营人员与角色分配 |
| 商品管理 | 商品与品类、价格、规格、货道容量 |
| 订单管理 | 订单查询（单号模糊检索）、支付与出货状态 |
| 策略管理 | 价格/投放策略配置与详情 |
| 系统管理 | 用户、角色、菜单、部门、岗位、字典、参数、通知公告 |
| 系统监控 | 在线用户、操作日志、登录日志、服务监控、缓存监控 |
| 系统工具 | 表单构建、代码生成、Swagger 接口文档 |

### 运维 App

- 启动引导页：品牌露出「精准定位　及时补货」；
- 首页：运营员问候、定位区域、工单量排名、待办工单卡片；
- 工单详情：设备号、创建时间、地址、工单类型、逐货道补货明细、备注，支持**接受 / 拒绝**；
- 进行工单：进行中 / 待办工单分页切换与搜索。

### 售货机大屏

- 按设备编号 `?innerCode=xxx` 拉取该机商品列表，展示图片、名称、价格与售罄状态；
- 点击商品弹出支付方式选择（微信 / 支付宝），生成支付二维码；
- MQTT 订阅出货主题，支付或出货完成后自动刷新商品列表、关闭弹窗；
- 未带设备编号时回退到演示设备 `A1000001`，商品图使用项目本地素材，断网也能演示。

---

## 五、技术栈

| 层次 | 技术 |
| --- | --- |
| 后端 | Java 8、Spring Boot 2.x、Spring Security + JWT、MyBatis + PageHelper、Druid、Quartz、Swagger 3 |
| 数据存储 | MySQL 8（`dkd1`）、Redis（会话 / 验证码 / 缓存） |
| 消息 | MQTT（设备出货通知） |
| 后台前端 | Vue 3、Vite、Element Plus 2.4、Vue Router、Pinia、ECharts、SCSS |
| 运维 App | Android（apk，接口指向 `dkd-app`） |
| 大屏 | 原生 HTML/CSS + Vue 2 + vue-resource + QRCode + MQTT.js |
| 构建 | Maven 多模块、npm / Vite |

---

## 六、目录结构

```
Dkd/
├── dkd-admin/          平台管理后端启动模块（8080）
├── dkd-app/            运维端接口（9007）
├── dkd-applet/         售货机端接口（9008）
├── dkd-common/         通用工具与常量
├── dkd-framework/      安全、拦截器等框架层
├── dkd-system/         系统域（用户/角色/菜单等）
├── dkd-manage/         业务域（设备/点位/商品/订单/工单/策略）
├── dkd-quartz/         定时任务
├── dkd-generator/      代码生成
├── dkd-vue/            运营后台前端
│   ├── public/sku/     商品缩略图（本地兜底）
│   ├── src/assets/     黑金主题样式、品牌徽标、登录背景
│   └── src/views/      各业务页面
├── screen/             售货机大屏（静态页面 + 商品图素材）
├── sql/                初始化脚本（ry_20231130.sql / quartz.sql）
├── docs/screenshots/   本文档配图（21 张）
└── redis/              本地 Redis 运行文件
```

---

## 七、本地运行

> 环境：JDK 8、Node.js ≥ 18、MySQL 8、Redis、Maven。

1. **初始化数据库**：创建 `dkd1` 库，依次导入 `sql/ry_20231130.sql`、`sql/quartz.sql`；按 `dkd-*/src/main/resources/application-druid.yml` 配置数据库与 Redis 连接。
2. **启动 Redis**：运行 `redis/redis-server.exe`（默认 `127.0.0.1:6379`）。
3. **启动后端**（三个模块分别运行各自的 Application 启动类）：
   - `dkd-admin` → `8080`
   - `dkd-app` → `9007`
   - `dkd-applet` → `9008`
4. **启动后台前端**：
   ```bash
   cd dkd-vue
   npm install
   npm run dev
   ```
   浏览器访问 `http://localhost:5173/`。
5. **打开售货机大屏**：浏览器打开 `screen/index.html?innerCode=A1000001`，或用任意静态服务器托管 `screen/` 目录（需保证 `9008` 已启动）。
6. **运维 App**：在模拟器中安装对应 apk，接口默认指向 `dkd-app`（`9007`）。

初始账号与演示数据来自 `sql/` 初始化脚本；首次登录需输入图形验证码。

---

## 八、界面预览

### 8.1 运营后台

**登录页**

![登录页](docs/screenshots/admin-login.png)

**首页工作台**

![首页工作台](docs/screenshots/admin-dashboard.png)

**工单管理 · 运营工单**

![运营工单](docs/screenshots/admin-task-list.png)

**工单详情弹窗**

![工单详情](docs/screenshots/admin-task-detail.png)

<details>
<summary>展开查看更多后台业务页（12 张）</summary>

**设备管理 / 设备状态**

| 设备管理 | 设备状态 |
| --- | --- |
| ![设备管理](docs/screenshots/admin-vm.png) | ![设备状态](docs/screenshots/admin-vm-status.png) |

**商品管理 / 订单管理**

| 商品管理 | 订单管理 |
| --- | --- |
| ![商品管理](docs/screenshots/admin-goods.png) | ![订单管理](docs/screenshots/admin-order.png) |

**点位管理 / 区域管理**

| 点位管理 | 区域管理 |
| --- | --- |
| ![点位管理](docs/screenshots/admin-node.png) | ![区域管理](docs/screenshots/admin-region.png) |

**策略管理 / 合作商管理**

| 策略管理 | 合作商管理 |
| --- | --- |
| ![策略管理](docs/screenshots/admin-policy.png) | ![合作商管理](docs/screenshots/admin-partner.png) |

**运维工单 / 人员管理**

| 运维工单 | 人员管理 |
| --- | --- |
| ![运维工单](docs/screenshots/admin-task-operation.png) | ![人员管理](docs/screenshots/admin-emp.png) |

</details>

### 8.2 运维 App

> 以下 4 张来自 mumu 模拟器实机截图。

| 启动引导页 | 首页 · 待办工单 |
| --- | --- |
| ![启动页](docs/screenshots/app-splash.png) | ![App首页](docs/screenshots/app-home.png) |

| 工单详情 · 接受 / 拒绝 | 进行工单 |
| --- | --- |
| ![工单详情](docs/screenshots/app-task-detail.png) | ![进行工单](docs/screenshots/app-task-running.png) |

### 8.3 售货机大屏

| 商品列表 | 支付方式选择 |
| --- | --- |
| ![售货机大屏](docs/screenshots/screen-goods.png) | ![支付弹窗](docs/screenshots/screen-pay.png) |

---

## 九、改造与修复记录

| 类别 | 内容 |
| --- | --- |
| 品牌视觉 | 全站统一「立可得管理后台」；黑金主题（主金 `#d4af37`、墨底 `#0d0f13`）；重绘黑金「立」字方章 logo 与 favicon；登录/注册页换黑金飘带背景；售货机大屏同步黑金并换品牌 KV |
| 图片本地化 | 大屏商品图、后台商品缩略图均由失效外链改为项目自带本地素材，断网仍可完整演示 |
| 名称清理 | 清除页面标题、页脚、菜单、接口文档标题、部门/用户/公告演示数据中的旧名称；初始化 SQL 同步更新 |
| 功能修复 | 售货机商品回显（设备编号兜底 + 空值保护）；订单状态字典；点位/策略详情弹窗参数污染；工单统计 SQL；设备/订单/工单/区域的模糊搜索 |
| 交互清理 | 移除订单管理、设备状态两个未完成的「查看详情」弹窗；隐藏可切回白底的浅色侧栏主题 |

所有改造保持接口契约不变，未改动运维 apk。

---

## 十、配图清单

全部 21 张位于 `docs/screenshots/`，均已嵌入本文档第八节。

| 端 | 文件 | 内容 |
| --- | --- | --- |
| 品牌 | `brand-banner.png` | 品牌头图 |
| 后台 | `admin-login.png` | 登录页 |
| 后台 | `admin-dashboard.png` | 首页工作台 |
| 后台 | `admin-task-list.png` | 运营工单列表 |
| 后台 | `admin-task-detail.png` | 工单详情弹窗 |
| 后台 | `admin-task-operation.png` | 运维工单 |
| 后台 | `admin-vm.png` | 设备管理 |
| 后台 | `admin-vm-status.png` | 设备状态 |
| 后台 | `admin-goods.png` | 商品管理 |
| 后台 | `admin-order.png` | 订单管理 |
| 后台 | `admin-node.png` | 点位管理 |
| 后台 | `admin-region.png` | 区域管理 |
| 后台 | `admin-policy.png` | 策略管理 |
| 后台 | `admin-partner.png` | 合作商管理 |
| 后台 | `admin-emp.png` | 人员管理 |
| App | `app-splash.png` | 启动引导页 |
| App | `app-home.png` | 首页 / 待办工单 |
| App | `app-task-detail.png` | 工单详情 / 接受拒绝 |
| App | `app-task-running.png` | 进行工单 |
| 大屏 | `screen-goods.png` | 商品列表 |
| 大屏 | `screen-pay.png` | 支付方式选择 |

**当前无需补充必填截图**：后台业务页由无头浏览器按真实登录态自动截取，App 由模拟器实机截图，大屏由浏览器截取，三端均已覆盖。可选增强项见第十二节。

---

## 十一、注意事项

- 登录页验证码由后端生成，样式与业务无关，保持原样。
- 大屏 `screen/index.html` 中 `domain` 指向 `http://localhost:9008`、MQTT 地址指向演示服务器；换网络演示时按需修改这两处。
- `screen/css/black-gold.css` 是大屏黑金主题覆盖层，删除 `index.html` 中对该文件的引用即可回到原橙黄样式。
- 后台主题设置里已隐藏浅色侧栏选项，避免切换后破坏黑金视觉；需要恢复时移除 `Settings/index.vue` 对应节点上的 `v-if="false"`。
- 商品图片：数据库仍存外链，后台列表与大屏均由前端按文件名映射到本地素材（`dkd-vue/public/sku/`、`screen/images/sku-*.png`）；新增商品若不在 1~9 编号内会回退原链接。
- `application.yml` 与 Swagger 标题的改动需**重启 8080** 才生效；数据库演示数据改动立即生效。
- 各模块 `target/classes` 下的 Mapper XML 由开发时热加载同步，修改 Mapper 后如未生效可重启对应服务。

---
