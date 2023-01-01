---
title: useDebounceFn
group:
---

# useDebounceFn

优雅的使用 addEventListener。

## 使用示例

<code src="../../packages/hooks/src/Tools/useDebounceFn/demo/base.tsx" />

## API

```ts
const {
  run,
  cancel,
  flush
} = useDebounceFn(
  fn: (...args: any[]) => any,
  options?: Options
);
```

### 参数

| 参数 | 说明               | 类型         | 默认值 |
| ---- | ------------------ | ------------ | ------ |
| fn       | The function to debounce.          | `(...args: any[]) => any` | -       |
| options  | Config for the debounce behaviors. | `Options`                 | -       |