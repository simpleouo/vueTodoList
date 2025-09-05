<template>
    <div class="inputBox">
        <input type="text" placeholder="請輸入待辦事項" v-model.trim="getTodoTxt">
        <a @click.prevent="addBtn">
            <i class="fa fa-plus"></i>
        </a>
    </div>
</template>
<script setup>
import { computed, ref } from 'vue';

// const todoTxt = ref('');
const props = defineProps(['todoTxt']);
const emit = defineEmits(['sendTodo','sendTodoTxt']);
const addBtn=()=>{
    emit('sendTodo',getTodoTxt.value);
}
const getTodoTxt = computed({
  get() {
    return props.todoTxt
  },
  set(val) {
    return emit('sendTodoTxt', val)
  },
  // get: () => props.titleTwo,
  // set: (val) => emit('update:titleTwo', val),
})




// const props = defineProps({
//     todoTxt:{
//         type: String,
//         required: true
//     }
// })
// const emit = defineEmits(['setTodo']);
// const todo = computed({
//     get(){
//         return todoTxt.value;
//     },
//     set(val){
//         emit('setTodo',val);
//     }
// })
</script>