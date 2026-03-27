# React 前端学习方案
> 目标：从 0 基础到能独立完成企业级前端项目
> 对象：系统架构师（Java背景），学习目的是补充前端可视化能力
> 形式：边做边学，每阶段有实战任务，完成后能直接用到工作

---

## 学习理念

**不是看文档学，是拆真实项目学。**

我们有真实的 IoT 监控项目：
- iot-frontend（React + TS）— 你的练习场
- iot-backend（Python FastAPI）— 提供数据

每学一个概念，就往这个项目里加东西。做完了 = 学懂了 = 能用了。

---

## 学习阶段总览

| 阶段 | 内容 | 周期 |
|------|------|------|
| Stage 0 | 开发环境 + 跑通项目 | Day 1 |
| Stage 1 | JS 基础（专门给 Java 开发者） | Day 2-3 |
| Stage 2 | React 核心概念 + 组件 | Day 4-6 |
| Stage 3 | Hooks + 状态管理 | Day 7-9 |
| Stage 4 | 真实场景实战 | Day 10-12 |
| Stage 5 | 完整功能 + 部署 | Day 13-14 |

目标：14天，能独立做一个完整的 React 页面并部署上线

---

## Stage 0：开发环境（Day 1）

### 目标
本地跑通前后端，能看到数据在页面里显示

### 学习内容
1. Node.js / npm 基础（Java 开发者视角）
   - Node 是什么，npm 是什么（类比 Maven/Gradle）
   - `package.json` 是什么（类比 `pom.xml`）
   - `node_modules` 是什么（类比 Maven 本地仓库）
   - `npm run dev` 是什么（类比 `mvn spring-boot:run`）
   - `vite` 是什么（类比 Spring Boot DevTools 热重载）

2. 项目结构（Java vs React 对比）
   ```
   Java 传统项目          React 项目
   src/main/java/   ←→   src/
   Controller.java  ←→   App.tsx
   Service.java     ←→   hooks / store/
   Entity.java      ←→   types.ts
   application.yml  ←→   vite.config.ts
   ```

3. 第一个实战任务
   - [ ] 在 iot-frontend 目录下执行 `npm install`
   - [ ] 执行 `npm run dev`，浏览器打开 localhost:5173
   - [ ] 看到设备列表页面
   - [ ] 把终端里的 dev server 信息截图保存

### 验收标准
✅ npm install 不报错
✅ npm run dev 能启动
✅ 页面显示设备列表数据（哪怕是 error 状态）
✅ 能描述项目目录结构（说出 5 个关键文件的作用）

---

## Stage 1：Java 开发者学 JavaScript（Day 2-3）

### 目标
补充 JS 基础知识，重点对比 Java，快速上手

### 核心对比清单

#### 变量声明
```javascript
// JS 有三种声明方式，对比 Java
var name = "luyu";       // 函数作用域（类似 Java 的全局变量），不推荐
let age = 30;            // 块级作用域，类似 Java 的局部变量
const PI = 3.14;         // 类似 Java 的 final

// Java 对比
String name = "luyu";
int age = 30;
final double PI = 3.14;
```

#### 函数
```javascript
// 函数声明（提升）
function greet(name) {
  return "Hello, " + name;
}

// 箭头函数（ES6+，类似 Java Lambda）
const greet = (name) => {
  return "Hello, " + name;
};

// 简写（单返回值）
const greet = name => "Hello, " + name;

// Java 对比
public String greet(String name) {
    return "Hello, " + name;
}
```

#### 对象和数组
```javascript
// 对象 — 类似 Java 的 Map + 类
const user = {
  name: "luyu",
  age: 30,
  skills: ["Java", "React", "Python"]  // 数组
};

// 访问属性
user.name        // "luyu"（点号访问）
user["name"]     // "luyu"（括号访问）
user.skills[0]   // "Java"

// Java 对比
Map<String, Object> user = new HashMap<>();
user.put("name", "luyu");
user.get("name");

// 解构赋值（超实用）
const { name, age } = user;
const [first, second] = user.skills;

// 等价于
const name = user.name;
const age = user.age;
const first = user.skills[0];
const second = user.skills[1];
```

#### 异步和 Promise
```javascript
// Java: public CompletableFuture<Result> doSomething()
// JS: Promise + async/await（语法不同，思想相同）

// 同步方式
const result = axios.get("/api/devices");

// 异步方式（最常用）
const fetchDevices = async () => {
  try {
    const response = await axios.get("/api/devices");
    const data = response.data;
    console.log(data);
  } catch (error) {
    console.error("请求失败", error);
  }
};

// Java 对比
public async Task<List<Device>> fetchDevices() {
    try {
        var response = await httpClient.GetAsync("/api/devices");
        return await response.Content.ReadAsAsync<List<Device>>();
    } catch (Exception e) {
        Console.WriteLine("请求失败");
    }
}
```

#### 模块导入导出
```javascript
// 命名导出（可导出多个）
export const PI = 3.14;
export function add(a, b) { return a + b; }

// 默认导出（每个文件一个）
export default App;

// 导入
import App, { PI, add } from './App';
import axios from 'axios';  // 从 node_modules 导入

// Java 对比
import com.example.App;
import static com.example.Math.PI;
```

#### TypeScript 类型（重要！）
```typescript
// TypeScript = JavaScript + 类型系统

// 类型注解（类似 Java）
let name: string = "luyu";
let age: number = 30;
let active: boolean = true;
let skills: string[] = ["Java", "React"];  // 数组
let user: { name: string; age: number } = { name: "luyu", age: 30 };  // 对象

// 接口（类似 Java Interface）
interface Device {
  id: string;
  name: string;
  status: "online" | "offline" | "warning";  // 联合类型，类似枚举
}

// 函数类型
const fetchDevices = async (): Promise<Device[]> => {
  // ...
};

// Java 对比
public interface Device {
    String getId();
    String getName();
    DeviceStatus getStatus();
}

public enum DeviceStatus {
    ONLINE, OFFLINE, WARNING
}
```

### 实战任务

#### Task 1.1：读懂项目里的 TypeScript 类型
打开 `src/types.ts`，对照我们的 API 响应，把每个字段的类型画出来

```typescript
// 目标：能解释下面这段代码每个部分的含义
export interface Device {
  id: string;
  name: string;
  type: 'truck' | 'sensor' | 'camera';
  status: 'online' | 'offline' | 'warning';
  location: string;
  lat: number;
  lng: number;
  speed: number;
  temp: number;
  last_update: string;
}
```

#### Task 1.2：写一个工具函数
在 `src/utils.ts` 里写一个函数：

```typescript
// 把设备状态转成中文标签
function getStatusLabel(status: Device['status']): string {
  // 实现...
}

// 使用 switch（对比 Java switch）
// 返回值：'在线' | '离线' | '告警'
```

#### Task 1.3：写一个 mock API 响应
在 `src/mocks.ts` 里写一个假数据，用来在没有后端时也能开发：

```typescript
// 模拟后端返回的设备列表
export const mockDevices: Device[] = [
  { id: "DEV-001", name: "京A·12345", type: "truck", status: "online", ... },
  { id: "DEV-002", name: "沪B·67890", type: "truck", status: "offline", ... },
];
```

### 验收标准
✅ 能用自己的话解释 JS 和 Java 的 3 个核心区别
✅ 能读懂 `types.ts` 里的每个类型定义
✅ 完成 Task 1.2，写出 `getStatusLabel` 函数
✅ 能在没有后端的情况下用 mock 数据跑通页面

---

## Stage 2：React 核心概念（Day 4-6）

### 目标
理解 React 的核心思想，能把 UI 拆成组件

### 核心概念对比

#### React 是什么（类比）
```
Java 框架（Spring）    React
依赖注入容器     ←→     组件（Component）
@Service       ←→     function App()
@ResponseBody  ←→     JSX（返回 UI 描述）
模板引擎        ←→     JSX（用 JS 写 HTML）
```

#### JSX 是什么
```jsx
// JSX = JavaScript XML，允许在 JS 里写 HTML 标记
// 最终被编译成 JavaScript

// 普通 HTML
<div className="panel">
  <h2>设备列表</h2>
</div>

// JSX（注意到 className vs class）
// 因为 JS 里 class 是关键字，所以 HTML 的 class 要写成 className

// 对比 Vue 模板
// <div class="panel">   ← Vue 用 class
// <div className="panel">  ← React 用 className
```

#### 第一个 React 组件
```tsx
// src/components/DeviceCard.tsx
// 组件文件名 = 组件名（大驼峰）

import type { Device } from '../types';

// 定义 Props 接口（类似 Java 的参数类）
interface DeviceCardProps {
  device: Device;
  onSelect: (device: Device) => void;  // 回调函数，类似 Java 的 Consumer<Device>
}

// 组件函数（类似 Java 的 @Component）
function DeviceCard({ device, onSelect }: DeviceCardProps) {
  // 返回 JSX（描述这个组件长什么样）
  return (
    <div className="device-item" onClick={() => onSelect(device)}>
      <span>{device.name}</span>
      <span>{device.status}</span>
    </div>
  );
}

// 必须导出，否则其他地方用不了
export default DeviceCard;
```

#### Props 是什么（父传子）
```tsx
// 父组件 App.tsx 里使用 DeviceCard

function App() {
  const handleSelect = (device: Device) => {
    console.log("选中了", device.name);
  };

  return (
    // 传入 props
    <DeviceCard
      device={mockDevices[0]}
      onSelect={handleSelect}
    />
  );
}

// 对比 Java
// @Autowired
// private DeviceService deviceService;
// 在模板里 {{ device.name }}
```

#### State 是什么（组件内部状态）
```tsx
import { useState } from 'react';

// useState 是 React Hook，用于在组件内部保存"会变化"的数据
// 类比 Java 的 @Scope("prototype") + 私有成员变量

function Counter() {
  // 声明一个 count 状态，初始值 0
  // setCount 是修改它的方法
  const [count, setCount] = useState(0);

  return (
    <div>
      <span>{count}</span>
      <button onClick={() => setCount(count + 1)}>
        +1
      </button>
    </div>
  );
}

// 重要规则：React 状态不可变！
// ❌ 错误：count++
// ✅ 正确：setCount(count + 1)
// ❌ 错误：devices.push(newDevice)
// ✅ 正确：setDevices([...devices, newDevice])
```

#### 事件处理
```tsx
// 普通函数
<button onClick={handleClick}>

// 内联（类似 Java 匿名内部类）
<button onClick={() => {
  console.log("clicked");
  setCount(count + 1);
}}>

// 传参数
<button onClick={(id) => handleDelete(id)}>
```

#### 条件渲染
```tsx
// 三元运算符（类似 Java 三元）
{loading ? (
  <div>加载中...</div>
) : (
  <DeviceList devices={devices} />
)}

// && 短路（类似 Java 的 loading && expr）
{error && <div className="error">{error}</div>}

// 对比 Java
// {loading ? <Loading/> : <Content/>}
```

#### 列表渲染
```tsx
// map（类似 Java Stream 的 map）
// 重要：每个列表项需要 key 属性，类似数据库主键

{devices.map((device) => (
  <DeviceCard
    key={device.id}        // React 要求 key，帮助 diff 算法高效更新
    device={device}
    onSelect={handleSelect}
  />
))}

// Java 对比
// devices.stream()
//     .map(device -> <DeviceCard device={device}/>)
//     .collect(Collectors.toList())
```

### 实战任务

#### Task 2.1：把设备列表改成组件
在 `src/components/DeviceList.tsx` 里写一个设备列表组件：

```tsx
// 要求：
// 1. 接收 devices: Device[] 作为 props
// 2. 用 map 渲染每一行
// 3. 每个设备行是一个 DeviceCard（你可以新建一个）
// 4. 如果 devices 为空，显示"暂无设备"
// 5. 添加 CSS 样式（src/components/DeviceList.css）
```

#### Task 2.2：添加一个状态切换功能
在设备列表里加一个按钮，点击可以切换"只看在线设备"：

```tsx
// 效果类似 Java 的 Filter
const [showOnlineOnly, setShowOnlineOnly] = useState(false);

const filteredDevices = showOnlineOnly
  ? devices.filter(d => d.status === 'online')
  : devices;
```

### 验收标准
✅ 能用自己的话解释"什么是 React 组件"
✅ 能说出 Props 和 State 的区别
✅ 能独立写一个展示设备信息的组件
✅ 能用 map 渲染列表并解释为什么需要 key
✅ 能写一个带条件渲染（loading/error/empty）的组件

---

## Stage 3：Hooks + 状态管理（Day 7-9）

### 目标
掌握 React Hooks，用 Zustand 做全局状态管理

### 核心 Hooks

#### useState — 状态
```tsx
// 基础用法（见过）
const [count, setCount] = useState(0);

// 对象状态
const [user, setUser] = useState({ name: "", age: 0 });

// 重要：对象状态要整体替换，不能只改一个字段
// ❌ 错误：user.name = "luyu"
// ✅ 正确：setUser({ ...user, name: "luyu" })
```

#### useEffect — 副作用
```tsx
// useEffect = 组件挂载/更新/卸载时要执行的"副作用"
// 类比 Java 的 @PostConstruct + @PreDestroy

import { useEffect } from 'react';

// 模拟生命周期
useEffect(() => {
  // 1. 组件首次渲染（挂载）后执行
  console.log("组件挂载了");

  // 2. 可选：返回一个清理函数（卸载时）
  return () => {
    console.log("组件卸载了");
  };
}, []);  // 空依赖数组 = 只在挂载时执行一次（类似 @PostConstruct）

// 带依赖
useEffect(() => {
  fetchDevices();  // 重新发请求
}, [deviceId]);  // deviceId 变了就重新执行

// 实际例子：发 API 请求
useEffect(() => {
  const fetchData = async () => {
    const res = await axios.get("/api/devices");
    setDevices(res.data.devices);
  };
  fetchData();
}, []);  // 页面加载时只执行一次

// Java 对比
// @PostConstruct
// public void init() { fetchData(); }
// @PreDestroy
// public void cleanup() { ... }
```

#### useRef — DOM 引用
```tsx
// useRef 用于访问 DOM 元素，或者保存一个"不想触发重新渲染"的值
import { useRef } from 'react';

const inputRef = useRef<HTMLInputElement>(null);

// focus 输入框（类似 Java 的 document.getElementById）
<input ref={inputRef} />
<button onClick={() => inputRef.current?.focus()}>聚焦</button>
```

#### useCallback — 缓存函数
```tsx
// useCallback = 缓存一个函数，避免每次渲染都创建新函数
// 类比 Java 的方法引用

const handleClick = useCallback((id: string) => {
  setDevices(devices.map(d => d.id === id ? { ...d, selected: true } : d));
}, [devices]);  // devices 变了才重新创建

// 传给子组件的函数最好用 useCallback 包裹
// 避免子组件每次都认为 props 变了而重新渲染
```

#### 自定义 Hook
```tsx
// 自定义 Hook = 把可复用的逻辑抽出来（类似 Java 的 @Service）
// 命名规范：以 use 开头

function useDevices() {
  const [devices, setDevices] = useState<Device[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("/api/devices").then(res => {
      setDevices(res.data.devices);
      setLoading(false);
    });
  }, []);

  return { devices, loading };
}

// 在组件里使用（类似 @Autowired）
function DevicePage() {
  const { devices, loading } = useDevices();
  return loading ? <div>加载中</div> : <DeviceList devices={devices} />;
}
```

### Zustand 状态管理（全局状态）

```tsx
// Zustand = 轻量级全局状态管理（类似 Java 的 ApplicationContext Bean）
// 相比 Redux 更简单，类似 Java 的事件总线模式

// src/store/deviceStore.ts

import { create } from 'zustand';

interface DeviceStore {
  devices: Device[];
  selectedDevice: Device | null;
  loading: boolean;
  // 类似 Java 的 Action/Consumer
  fetchDevices: () => Promise<void>;
  selectDevice: (device: Device | null) => void;
}

export const useDeviceStore = create<DeviceStore>((set) => ({
  devices: [],
  selectedDevice: null,
  loading: false,

  // 类似 Java 的 @Bean + @Scope("singleton")
  fetchDevices: async () => {
    set({ loading: true });
    const res = await axios.get("/api/devices");
    set({ devices: res.data.devices, loading: false });
  },

  selectDevice: (device) => set({ selectedDevice: device }),
}));

// 在任何组件里使用
function DeviceDetail() {
  const { devices, selectedDevice, selectDevice } = useDeviceStore();
  return <div>...</div>;
}
```

### 实战任务

#### Task 3.1：把 API 调用改成自定义 Hook
从 `App.tsx` 里把 fetchDevices 逻辑抽出来，变成 `useDevices` Hook

```tsx
// 放到 src/hooks/useDevices.ts
// 要求：
// 1. 返回 devices, loading, error
// 2. 自动发请求
// 3. 支持手动刷新（加一个 refresh 函数）
```

#### Task 3.2：添加设备搜索功能
在 App 里加一个搜索框，搜索设备名称：

```tsx
// 要求：
// 1. 加一个 searchText state
// 2. 加一个输入框 onChange 更新 searchText
// 3. 过滤逻辑：devices.filter(d => d.name.includes(searchText))
// 4. 搜索框和结果显示分开（体现组件拆分）
```

#### Task 3.3：添加告警级别过滤
在告警面板加一个按钮组，可以筛选"只看严重告警"

### 验收标准
✅ 能解释 useEffect 的依赖数组三种情况（无、[]、[dep]）
✅ 能写一个自定义 Hook 并在组件里使用
✅ 能描述 Zustand 和 React Props 的区别
✅ 能独立添加一个新的全局状态（比如告警列表）到 Zustand store

---

## Stage 4：真实场景实战（Day 10-12）

### 目标
综合运用，做一个真实场景的功能模块

### 功能模块：设备详情面板

#### 功能描述
点击设备列表的某一行，右侧滑出一个详情面板

#### 技术要点
1. 组件通信（子 → 父）：通过 props 的回调函数
2. 条件渲染（面板显示/隐藏）
3. 详情数据：从 store 的 selectedDevice 读取
4. 关闭按钮：清空 selectedDevice

```tsx
// 实现步骤：
// 1. 新建 DeviceDetailPanel.tsx 组件
// 2. 在 App.tsx 引入，点击设备行时调用 selectDevice
// 3. 面板用 CSS 定位（position: fixed 或 absolute）
// 4. 加一个关闭按钮，点击清空 selectedDevice
```

### 功能模块：历史记录面板

#### 功能描述
选中设备后，能看到它的历史操作记录（用 mock 数据）

#### 技术要点
1. 组件组合（多个小组件组合成大页面）
2. Mock 数据：构造历史记录数组
3. 时间格式化工具函数
4. 列表 + 时间轴 UI

### 功能模块：刷新和加载状态

#### 功能描述
- 下拉刷新（模拟）
- 加载时显示 skeleton 屏

#### 技术要点
```tsx
// Skeleton 屏 = 骨架屏（数据还没到时显示灰色占位块）
// 体验比转圈圈好，类似 Java 的 loading="lazy"

{loading ? (
  <div className="skeleton-list">
    <div className="skeleton-item"></div>
    <div className="skeleton-item"></div>
    <div className="skeleton-item"></div>
  </div>
) : (
  <DeviceList devices={devices} />
)}
```

### CSS 技巧（React 里写样式）

```tsx
// 三种方式：
// 1. CSS Modules（推荐，每个组件独立样式）
import './DeviceList.css';

// 2. 内联样式（简单）
<div style={{ color: 'red', fontSize: 14 }}>

// 3. CSS 变量（主题）
<div className="panel" styleName="--primary: #3b82f6">

// 对比 Java
// 模板里直接写 style 不太优雅
// React 的 CSS Modules = 类似 Vue 的 scoped CSS
```

### 实战任务

#### Task 4.1：完成设备详情面板
实现完整的侧边详情面板，包含：
- 设备基本信息（名称/状态/位置）
- 实时数据（速度/温度）
- 历史记录列表
- 关闭按钮

#### Task 4.2：添加分页
设备列表超过 10 条时分页显示

```tsx
// 思路：
// 1. 总数 / 每页条数 = 总页数
// 2. 当前页 state
// 3. slice((page-1)*pageSize, page*pageSize) 显示当前页
```

#### Task 4.3：添加空状态和错误状态
- 无设备时显示空状态插图（emoji 或 SVG）
- API 请求失败时显示错误提示 + 重试按钮

### 验收标准
✅ 能独立完成设备详情面板
✅ 能用 CSS 控制面板显示/隐藏动画
✅ 能实现分页功能
✅ 代码能说明每个组件的 Props 接口（类似 JavaDoc）

---

## Stage 5：部署上线（Day 13-14）

### 目标
把项目部署到 GitHub Pages，能通过 URL 访问

### 步骤

#### 1. 构建生产版本
```bash
npm run build
# 会在 dist/ 目录生成静态文件
```

#### 2. 配置 GitHub Pages
```bash
# 在 GitHub 仓库 Settings → Pages → Source: Deploy from a branch → gh-pages
```

#### 3. 自动部署（GitHub Actions）
```yaml
# .github/workflows/deploy.yml
name: Deploy to GitHub Pages
on:
  push:
    branches: [main]
jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
      - run: npm ci
      - run: npm run build
      - uses: actions/upload-pages-artifact@v3
        with:
          path: dist
      - uses: actions/deploy-pages@v4
```

#### 4. 自定义域名（可选）
如果有域名，可以配置 CNAME

### API 代理问题
部署到 GitHub Pages 后，前端请求 localhost:8000 会跨域。
需要配置代理：

```typescript
// vite.config.ts
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8000',  // 开发环境代理到本地后端
        changeOrigin: true,
      }
    }
  }
})
```

注意：生产环境（GitHub Pages）不能代理到本地后端。需要后端部署到云服务器，或者用 Vercel/Railway 的免费额度。

### 验收标准
✅ `npm run build` 成功生成 dist/
✅ GitHub Pages URL 能打开页面
✅ 能说清楚开发环境和生产环境的区别

---

## 学习资源汇总

### 官方文档（按优先级）
1. React 官方教程（react.dev）— 必读前3章
2. TypeScript 官方-handbook — 类型部分
3. Zustand GitHub README — 5分钟看完

### 工具网站
- [vite.dev](https://vite.dev) — 快速查配置
- [typescriptlang.org/docs](https://www.typescriptlang.org/docs/) — TS 速查
- [zustand demo](https://zustand.docs.pmnd.rs/) — 状态管理

### AI 辅助学习
- 不懂的概念：用 Claude Code / ChatGPT 搜索
- 看不懂的代码：截图发给 AI 解释
- 报错信息：直接复制给 AI 看

---

## 常见问题 FAQ

**Q: Java 开发者学 React 最难的是什么？**
A: 思维转变。Java 是"对象+方法"，React 是"数据+渲染"。React 不操作 DOM，而是描述 UI，框架自动同步。理解"React 是声明式的"是最大的槛。

**Q: 什么时候需要用 TypeScript？**
A: 现在！TS 是 React 的标配，有 TS IDE 会给很好的智能提示，降低出错率。

**Q: 为什么用 Zustand 而不是 Redux？**
A: Zustand 更简单，5分钟能上手。Redux 太重，TypeScript 支持也不如 Zustand。

**Q: 感觉内容很多，学不会怎么办？**
A: 记住：学 = 做。看完一个概念后立刻在项目里找对应场景用出来。哪怕只是改了 CSS 样式，也比只看不动手强。

**Q: 遇到报错怎么办？**
A: 1. 先读错误信息（95% 的问题看报错就懂了）2. 复制错误信息到 AI 3. 看 Stack Overflow

---

## 下一步

准备好本地环境后，告诉我"Stage 0 完成了"，我带你进入 Stage 1。
