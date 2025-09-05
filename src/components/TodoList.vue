<template>
    <div class="todoList_items">
        <ul class="todoList_item">
            <TodoItem v-for="item in todoList" :key="item.id" :todo="item" @removeTodoTwo="emit('removeTodoOne',$event)" />
                <!-- (data)=>{emit('removeTodoOne',data)} -->
        </ul>
        <div class="todoList_statistics">
            <p> {{ doneCount }} 個已完成項目</p>
        </div>
    </div>
</template>
<script setup>
import { computed } from 'vue';
import TodoItem from './TodoItem.vue';

// const props = defineProps(['todoList']);
const props = defineProps({
    todoList:{
        type: Array,
        required: true
    }
});
const emit = defineEmits(['removeTodoOne']);
// @removeTodoTwo="emit('removeTodoOne',$event)" - 語法糖，會自己帶入子層所傳遞的值
// @removeTodoTwo="(data)=>{emit('removeTodoOne',data)}"
// @removeTodoTwo="getOne" //搭配 function getOne(data) 帶入的值就是子層傳來時所帶的值

// const getOne=(data)=>{
//     console.log('看看我');
//     console.log(data);
//     //帶入的 data 就是子層傳來時所帶的值
//     emit('removeTodoOne',data);
// }

//todo done數量
//注意：如果是取用帶入的 props 值，是這樣使用 props.todoList 
//不需要加上 .value
const doneCount = computed(()=>{
    const filter = props.todoList.filter((item)=>item.status==true)
    return filter.length;
})

</script>