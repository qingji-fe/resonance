---
title: useLocalStorage
group:
---

# useLocalStorage

优雅的使用

## 使用示例

<code src="../../packages/hooks/src/Tools/useLocalStorage/demo/base.tsx" />

## API

```ts
interface Options{
  defaultValue?: any | (() => void);
  expire?: number;
}
interface SetOptions {
  value?: any
  expire?: number
}
interface Actions {
  setValue: (value: SetOptions) => void;
  removeValue: () => void;
}

const [state, setState] = useLocalStorageState(
  key: string,
  options: Options
): [any?, Actions];
```

### 参数

| 参数         | 说明                     | 类型 | 默认值  |
| ------------ | ------------------------ | ---- | ------- |
| defaultValue | 可选项，传入默认的状态值 | `any | (() => any)`  |  |


### 结果

| 参数    | 说明     | 类型      |
| ------- | -------- | --------- |
| value   | 状态值   | -         |
| actions | 操作集合 | `Actions` |

### Actions事件

| 参数     | 说明                                                                            | 类型                      |
| -------- | ------------------------------------------------------------------------------- | ------------------------- |
| setValue  | 设置为 值                                                            | `({value, expire}) => void`              |
| removeValue | 删除值 | `() => void`              |