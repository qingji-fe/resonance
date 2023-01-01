---
title: useThrottleFn
group:
---

# useThrottleFn

优雅的使用 addEventListener。

## 使用示例

<code src="../../packages/hooks/src/Tools/useThrottleFn/demo/base.tsx" />

## API

```ts
const {
  run,
  cancel,
  flush
} = useThrottleFn(
  fn: (...args: any[]) => any,
  options?: Options
);
```

### 参数

| 参数 | 说明               | 类型         | 默认值 |
| ---- | ------------------ | ------------ | ------ |
| fn       | 需要节流的函数          | `(...args: any[]) => any` | -       |
| options  | 配置节流的行为. | `Options`                 | -       |