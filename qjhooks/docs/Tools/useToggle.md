---
title: useToggle
group:
---

# useToggle

优雅的使用

## 使用示例

<code src="../../packages/hooks/src/Tools/useToggle/demo/base.tsx" />

## API

```ts
const [value, { toggle, setPre, setNext }] = useToggle(defaultValue?: boolean);
```

### 参数

| 参数         | 说明                     | 类型 | 默认值  |
| ------------ | ------------------------ | ---- | ------- |
| defaultValue | 可选项，传入默认的状态值 | `T`  | `false` |


### 结果

| 参数    | 说明     | 类型      |
| ------- | -------- | --------- |
| value   | 状态值   | -         |
| actions | 操作集合 | `Actions` |

### Actions事件

| 参数     | 说明                                                                            | 类型                      |
| -------- | ------------------------------------------------------------------------------- | ------------------------- |
| toggle   | 切换 state                                                                      | `() => void`              |
| setPre  | 设置为 defaultValue                                                             | `() => void`              |
| setNext | 设置为 defaultValue 的反值 | `() => void`              |