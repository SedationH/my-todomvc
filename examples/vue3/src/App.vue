<template>
  <section class="todoapp">
    <header class="header">
      <h1>todos</h1>
      <input
        class="new-todo"
        placeholder="What needs to be done?"
        autofocus
        v-model="input"
        @keyup.enter="addTodo"
      />
    </header>
    <!-- This section should be hidden by default and shown when there are todos -->
    <section class="main">
      <input
        id="toggle-all"
        class="toggle-all"
        type="checkbox"
        v-model="allDone"
      />
      <label for="toggle-all">Mark all as complete</label>
      <ul class="todo-list">
        <!-- These are here just to show the structure of the list items -->
        <!-- List items should get the class `editing` when editing and `completed` when marked as completed -->
        <li
          :class="{
            completed: todo.completed,
            editing: editingTodo === todo
          }"
          v-for="todo in todos"
          :key="todo"
        >
          <div class="view">
            <input
              class="toggle"
              type="checkbox"
              :checked="todo.completed"
            />
            <label @dblclick="edit(todo)">
              {{ todo.text }}
            </label>
            <button
              class="destroy"
              @click="remove(todo)"
            ></button>
          </div>
          <input
            class="edit"
            v-model="todo.text"
            @blur="save"
            @keyup.enter="save"
            @keyup.esc="cancel"
            v-editing-focus="editingTodo === todo"
          />
        </li>
      </ul>
    </section>
    <!-- This footer should be hidden by default and shown when there are todos -->
    <footer class="footer">
      <!-- This should be `0 items left` by default -->
      <span class="todo-count"
        ><strong>0</strong> item left</span
      >
      <!-- Remove this if you don't implement routing -->
      <ul class="filters">
        <li>
          <a class="selected" href="#/">All</a>
        </li>
        <li>
          <a href="#/active">Active</a>
        </li>
        <li>
          <a href="#/completed">Completed</a>
        </li>
      </ul>
      <!-- Hidden if no completed items are left ↓ -->
      <button class="clear-completed">
        Clear completed
      </button>
    </footer>
  </section>
  <footer class="info">
    <p>Double-click to edit a todo</p>
    <!-- Remove the below line ↓ -->
    <p>
      Template by
      <a href="http://sindresorhus.com">Sindre Sorhus</a>
    </p>
    <!-- Change this out with your name and url ↓ -->
    <p>Created by <a href="http://todomvc.com">you</a></p>
    <p>Part of <a href="http://todomvc.com">TodoMVC</a></p>
  </footer>
</template>

<script>
import { computed, ref } from 'vue'

const useAdd = todos => {
  const input = ref('')
  const addTodo = () => {
    const text = input.value && input.value.trim()
    if (text.length === 0) return
    todos.value.unshift({
      text,
      completed: false
    })
    input.value = ''
  }
  return {
    input,
    addTodo
  }
}

const useRemove = todos => {
  const remove = todo => {
    const index = todos.value.indexOf(todo)
    todos.value.splice(index, 1)
  }
  return {
    remove
  }
}

/**
 * 双击待办事项、展示编辑文本框
 * enter || blur 修改数据
 * esc 取消编辑
 * 当编辑文本框为空并保存 删除该文本框
 * 显示编辑文本框的时候自动获得焦点
 */
const useEdit = remove => {
  let beforeEditTodoText
  const editingTodo = ref(null)

  const edit = todo => {
    beforeEditTodoText = todo.text
    editingTodo.value = todo
  }

  // 下面函数处理都依赖editingTodo & edit
  const save = () => {
    // if press enter when text is '',will invoke save twice,
    // onKeyEnter and onBlur
    if (editingTodo.value === null) return
    editingTodo.value.text = editingTodo.value.text.trim()
    if (editingTodo.value.text.length === 0) {
      remove(editingTodo.value)
    }
    editingTodo.value = null
  }

  const cancel = () => {
    editingTodo.value.text = beforeEditTodoText
    editingTodo.value = null
  }

  return {
    editingTodo,
    edit,
    save,
    cancel
  }
}

/**
 * 点击checkbox, 改变所有待办事项状态
 * All Active Completed
 *
 * 显示未完成待办项的个数
 * 移除所有完成的项目
 * 如果没有待办项 隐藏main footer
 */
const useFilter = todos => {
  const allDone = computed({
    get: () => todos.value.every(todo => todo.completed),
    set: value =>
      todos.value.forEach(todo => (todo.completed = value))
  })

  return {
    allDone
  }
}

export default {
  setup() {
    const todos = ref([]),
      { remove } = useRemove(todos)
    return {
      todos,
      remove,
      ...useAdd(todos),
      ...useEdit(remove),
      ...useFilter(todos)
    }
  },
  directives: {
    editingFocus: (el, binding) =>
      binding.value && el.focus()
  }
}
</script>
