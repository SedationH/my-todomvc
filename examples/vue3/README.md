## Reactivity API

### refs

https://v3.vuejs.org/api/refs-api.html#ref

对所需内容进行响应式处理

>  响应式的内部实现逻辑
>
> 1. getter 收集依赖
> 2. setter 触发依赖 进行更新

ref的结构

```ts
interface Ref<T> {
  value: T
}

function ref<T>(value: T): Ref<T>
```

包裹了一层，通过value拿数据，从而统一Primitive Value & Object的响应式数据创建和使用方式



### Computed values

```js
const count = ref(1)
const plusOne = computed({
  get: () => count.value + 1,
  set: val => {
    count.value = val - 1
  }
})

plusOne.value = 1
console.log(count.value) // 0
```





## Application API

### directive

https://v3.vuejs.org/api/application-api.html#directive

```js
import { createApp } from 'vue'
const app = createApp({})

// register
app.directive('my-directive', {
  // Directive has a set of lifecycle hooks:
  // called before bound element's attributes or event listeners are applied
  created() {},
  // called before bound element's parent component is mounted
  beforeMount() {},
  // called when bound element's parent component is mounted
  mounted() {},
  // called before the containing component's VNode is updated
  beforeUpdate() {},
  // called after the containing component's VNode and the VNodes of its children // have updated
  updated() {},
  // called before the bound element's parent component is unmounted
  beforeUnmount() {},
  // called when the bound element's parent component is unmounted
  unmounted() {}
})

// register (function directive)
app.directive('my-directive', () => {
  // this will be called as `mounted` and `updated`
})

// getter, return the directive definition if registered
const myDirective = app.directive('my-directive')
```

