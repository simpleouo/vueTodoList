<template>
    <li>
        <label class="todoList_label">
            <input class="todoList_input" type="checkbox" v-model="todo.status" @change="todoStatusBtn">
            <span v-if="!isEditTodo">{{ todo.content }}</span>
            <input v-else style="padding: 5px" type="text" v-model="todo.content">
        </label>
        <div class="control-box">
            <a v-if="!isEditTodo" @click.prevent="isEditTodo=!isEditTodo">
                <i class="fa-solid fa-pen-to-square"></i>
            </a>
            <a v-else  @click.prevent="editTodoBtn">
                <i class="fa-solid fa-check"></i>
            </a>
            <a @click.prevent="removeTodoHandler(todo.id)">
                <i class="fa fa-times"></i>
            </a>
        </div>
        <!-- <a @click.prevent="removeTodoHandler(todo.id)">
            <i class="fa fa-times"></i>
        </a> -->
    </li>
</template>
<script setup>
import { ref } from 'vue';

import { apiEditTodo,apiTodoStatus } from "@/utils/api.js";

// const props = defineProps(['todo']);
// 注意：如果傳入的值為物件，在修改物件時，會自動與父層同步
// 但單一單一值輸入的話，會變成無法連動，要自己寫 emit，computed 去做改變
const props = defineProps({
    todo:{
        type: Object,
        required: true
    }
});
const emit = defineEmits(['removeTodoTwo']);
//宣告傳送的方法，上層接收<Com @removeTodoTwo="上層自己function"/>

//編輯內容狀態
const isEditTodo=ref(false);
const editTodoBtn = async()=>{
    try{
        const editData={ content:props.todo.content }
        const data = await apiEditTodo(props.todo.id,editData);
        alert(data.data.message);
        isEditTodo.value=false;
    }catch(e){
        console.log(e);
    }
}

//編輯done狀態
const todoStatusBtn=async()=>{
    try{
        const res = await apiTodoStatus(props.todo.id);
        alert(res.data.message);
    }catch(e){
        console.log(e);
    }
}

//移除事件傳送
const removeTodoHandler = (id) =>{
    emit('removeTodoTwo',id);
    // emit('removeTodoTwo',{ id , add:'新文字'});
}
</script>
<style scoped>
.control-box{
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>