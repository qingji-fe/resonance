---
title: useEventListener
group:
---

# useEventListener

优雅的使用 addEventListener。

## 使用示例

<code src="../../packages/hooks/src/Dom/useEventListener/demo/base.tsx" />

## API

```ts
useEventListener(
  eventType: string,
  callback: (ev: Event) => void,
  options?: Options,
);
```

### 参数

| 参数 | 说明               | 类型         | 默认值 |
| ---- | ------------------ | ------------ | ------ |
| eventType   | 事件名称 | `string` | -      |
| callback   | 事件处理函数 | `(ev: Event) => void` | -      |
| options   | 对象target获取dom | ` {target: window}` | -      |