<template>
    <!-- ToDo List -->
    <div id="todoListPage" class="bg-half">
    <nav>
        <h1><a href="#">ONLINE TODO LIST</a></h1>
        <ul>
        <li class="todo_sm"><a href="#"><span>{{ userName }}</span></a></li>
        <li><a @click.prevent="logOutBtn">登出</a></li>
        </ul>
    </nav>
    <div class="conatiner todoListPage vhContainer">
        <div class="todoList_Content">
            <TodoForm :todoTxt="todoTxt" @sendTodoTxt="todoTxt = $event" @sendTodo="addTodo"/>
        <!-- <div class="inputBox">
            <input type="text" placeholder="請輸入待辦事項">
            <a href="#">
            <i class="fa fa-plus"></i>
            </a>
        </div> -->
        <div class="todoList_list">
            <ul class="todoList_tab">
                <li><a @click.prevent="changeTag('all')" :class="actTag == 'all'?'active':''">全部</a></li>
                <li><a @click.prevent="changeTag('todo')" :class="actTag == 'todo'?'active':''">待完成</a></li>
                <li><a @click.prevent="changeTag('done')" :class="actTag == 'done'?'active':''">已完成</a></li>
            <!-- <li><a href="#" class="active">全部</a></li>
            <li><a href="#">待完成</a></li>
            <li><a href="#">已完成</a></li> -->
            </ul>
            <TodoList v-if="todolistFilter.length" :todoList="todolistFilter" @removeTodoOne="removeTodoFun"/>
            <div v-else style="padding: 20px; text-align: center;">尚未輸入待辦事項</div>
            <!-- <div class="todoList_items">
                <ul class="todoList_item">
                    <li>
                    <label class="todoList_label">
                        <input class="todoList_input" type="checkbox" value="true">
                        <span>把冰箱發霉的檸檬拿去丟</span>
                    </label>
                    <a href="#">
                        <i class="fa fa-times"></i>
                    </a>
                    </li>
                    <li>
                    <label class="todoList_label">
                        <input class="todoList_input" type="checkbox" value="true">
                        <span>打電話叫媽媽匯款給我</span>
                    </label>
                    <a href="#">
                        <i class="fa fa-times"></i>
                    </a>
                    </li>
                    <li>
                    <label class="todoList_label">
                        <input class="todoList_input" type="checkbox" value="true">
                        <span>整理電腦資料夾</span>
                    </label>
                    <a href="#">
                        <i class="fa fa-times"></i>
                    </a>
                    </li>
                    <li>
                    <label class="todoList_label">
                        <input class="todoList_input" type="checkbox" value="true">
                        <span>繳電費水費瓦斯費</span>
                    </label>
                    <a href="#">
                        <i class="fa fa-times"></i>
                    </a>
                    </li>
                    <li>
                    <label class="todoList_label">
                        <input class="todoList_input" type="checkbox" value="true">
                        <span>約vicky禮拜三泡溫泉</span>
                    </label>
                    <a href="#">
                        <i class="fa fa-times"></i>
                    </a>
                    </li>
                    <li>
                    <label class="todoList_label">
                        <input class="todoList_input" type="checkbox" value="true">
                        <span>約ada禮拜四吃晚餐</span>
                    </label>
                    <a href="#">
                        <i class="fa fa-times"></i>
                    </a>
                    </li>
                </ul>
                <div class="todoList_statistics">
                    <p> 5 個已完成項目</p>
                </div>
            </div> -->
        </div>
        </div>
    </div>
    </div>
</template>
<script setup>
import { computed, onMounted, ref } from 'vue';
//= api =
import { apiSignCheck,apiSignOut,apiGetTodoList,apiAddTodo,apiDelTodo } from "@/utils/api.js";
import { useRouter } from 'vue-router';
import TodoForm from '@/components/TodoForm.vue';
import TodoList from '@/components/TodoList.vue';

const router = useRouter();

const userId=ref('');
const userName=ref('-');

const actTag = ref('all');
const todolist = ref([
    // {
    //   "id": "1",
    //   "createTime": 1620281234,
    //   "content": "把冰箱發霉的檸檬拿去丟",
    //   "status": false
    // },
    // {
    //   "id": "2",
    //   "createTime": 1620281234,
    //   "content": "打電話叫媽媽匯款給我",
    //   "status": true
    // },
    // {
    //   "id": "3",
    //   "createTime": 1620281234,
    //   "content": "整理電腦資料夾",
    //   "status": true
    // },
    //  {
    //   "id": "4",
    //   "createTime": 1620281234,
    //   "content": "繳電費水費瓦斯費",
    //   "status": true
    // },
    //  {
    //   "id": "5",
    //   "createTime": 1620281234,
    //   "content": "約vicky禮拜三泡溫泉",
    //   "status": true
    // },
]);

//取得登入者資訊
onMounted(async()=>{
    try{
        const userData = await apiSignCheck();
        const { nickname, uid } = userData.data;
        userId.value = uid;
        userName.value = nickname;
    }catch(e){
        console.log(e);
        router.push('/');
    }
})
//取的todo列表
onMounted(async()=>{
    try{
        const data = await apiGetTodoList();
        todolist.value = data.data.data;
    }catch(e){
        console.log(e);
    }
})

//切換狀態
const changeTag=(txt)=>{
    actTag.value = txt;
}

//登出按鈕
const logOutBtn = async()=>{
    try{
        const signOutData = await apiSignOut();
        if(signOutData.data.status){
            //刪除 token
            setCookie('vue3-todolist-token','',-1);
            alert('登出成功');
            router.push('/');
        }
    }catch(e){
        console.log(e);
    }
}

//新增todo
const todoTxt = ref('');
const addTodo = async(txt)=>{
    try{
        if(txt){
            const addData = { content: txt };
            const res = await apiAddTodo(addData);
            const { id,content,createTime } = res.data.newTodo;
            todolist.value.push({
                id,
                createTime,
                content,
                status: false
            })
            todoTxt.value = '';
        }
    }catch(e){
        console.log(e)
    }
}

//移除todo
const removeTodoFun = async(id)=>{
    try{
        const delInd = todolist.value.findIndex((item)=>item.id==id);
        const isDel=confirm(`是否刪除 "${todolist.value[delInd].content}"`);
        if(isDel){
            const res = await apiDelTodo(id);
            if(res.data.status){
                todolist.value.splice(delInd,1);
                //或是可以用 filter 把除了這個以外的選出來，是另類刪除
                alert(res.data.message);
            }
        }
    }catch(e){
        console.log(e);
    }
}

//tdo狀態篩選
const todolistFilter = computed(()=>{
    let filterList;
    if(actTag.value=='all'){
        filterList = todolist.value;
    }else if(actTag.value=='todo'){
        filterList = todolist.value.filter((item)=>item.status==false)
    }else if(actTag.value=='done'){
        filterList = todolist.value.filter((item)=>item.status==true)
    }
    return filterList;
})

//cookie設置
function setCookie(ckey,cval,exdays){
    const date = new Date();
    date.setDate(date.getDate() + exdays); 
    document.cookie = `${ckey}=${cval}; expires=${date.toUTCString()};`;
    //document.cookie = `vue3-todolist-token=abc123; expires=${date.toUTCString()}; path=/`;
}
</script>