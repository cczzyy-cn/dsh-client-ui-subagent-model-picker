# @dsh-external/dsh-client-ui-subagent-model-picker

DSH「插件配置」里的**能力描述配置卡片**（浏览器面）。配合宿主导签 `@dsh-external/dsh-subagent-model-picker`
使用：本卡片负责在「设置 → 插件 → 插件配置」渲染一个**可收起**的「子代理模型能力描述」卡，
让你为每个 `provider/model` 维护能力描述；保存写入 `subagent-model-picker` 设置命名空间，
供 `list_subagent_models` 带出，作为主会话自主选型的依据。

## 功能

- **下拉选择模型**：从 `remote.session.modelCatalog()` 拉取当前部署的可选 `provider/model`。
- **能力描述输入框**（多行）+ **保存**：把选中模型的能力描述写回 `subagent-model-picker`。
- **可收起**卡片（标题+说明，chevron 展开/收起），单列布局不溢出。
- **样式一致**：用 `@deepseek-ai/dsh-client-ui-primitives`（`Button`/`IconChevronDownOutline14`）
  与 `--dsw-*` 设计 token + CSS Modules，外观对齐其它插件配置卡。
- **稳健降级**：`settingsScope` 与 `remote.session` 为**嵌套注入（可选）**；`missingPrimitives`
  守卫在宿主缺所需 primitive 时跳过注册，不崩溃。

## 对应设置（settings.yaml）

```yaml
subagent-model-picker:
  descriptions:
    - provider: qwen
      model: qwen3.8-27b-iq3xxs-vision:latest
      capabilities: 27B·xxs量化·视觉·本地Ollama
```

## 安装

```bash
# 普通依赖（含 dsh.client）
dsh plugin --profile web add github:cczzyy-cn/dsh-client-ui-subagent-model-picker#v0.1.8
```

再在 profile `cordis.patch.yml` 追加一行 roster：

```yaml
- insert:
  - id: client-subagent-model-picker
    name: '@dsh-external/dsh-client-ui-subagent-model-picker'
```

重启 `dsh web` 生效。

## 构建

浏览器卡片由 harness 的 `clientBundle`/`tsdown` 构建（`src/client` → `lib/client.js`）。
`lib/` 已随仓库发布；如需改动 `src/`，在 `deepseek-harness/packages/client` 下用 `tsdown` 重新打包后回写 `lib/`。

## 版本要点

- **v0.1.8** — `box-sizing: border-box` 修正 `select`/`textarea` 右侧边距。
- **v0.1.7** — 默认收起、描述改为多行 `textarea`、select 样式对齐 Input、内边距调整。
- **v0.1.6** — 嵌套注入加 `remote`，并打印 `loadModels` 失败原因。
- **v0.1.5** — 修正 `modelCatalog` 的 `RemoteResult` 解包（`res.ok`/`res.value.groups`）。
- **v0.1.4** — 改为可收起 + 下拉选模型 + 描述输入 + 保存（去掉添加/删除）。
- **v0.1.3** — `settingsScope` 嵌套注入 + `missingPrimitives` 守卫（dsh-market 模式）。
- **v0.1.2** — 用 `dsh-client-ui-primitives` + CSS 模块对齐插件卡外观。
- **v0.1.1** — 修复 `useSyncExternalStore(scope.subscribe, scope.getSnapshot)` 丢失 `this` 的崩溃。
