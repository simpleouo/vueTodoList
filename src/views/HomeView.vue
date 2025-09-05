<template>
    <div id="loginPage" class="bg-yellow">
        <div class="conatiner loginPage vhContainer ">
            <div class="side">
                <a href="#"><img class="logoImg" src="https://raw.githubusercontent.com/hexschool/2022-web-layout-training/main/todolist/logo.png" alt=""></a>
                <img class="d-m-n" src="https://raw.githubusercontent.com/hexschool/2022-web-layout-training/main/todolist/img.png" alt="workImg">
            </div>
            <div>
                <form class="formControls" action="index.html">
                    <h2 class="formControls_txt">最實用的線上代辦事項服務</h2>
                    <label class="formControls_label" for="email">Email</label>
                    <input class="formControls_input" type="text" id="email" name="email" placeholder="請輸入 email" required v-model="email">
                    <span v-if="emailErr && !email">此欄位不可留空</span>
                    <label class="formControls_label" for="pwd">密碼</label>
                    <input class="formControls_input" type="password" name="pwd" id="pwd" placeholder="請輸入密碼" required v-model="password">
                    <span v-if="passwordErr && !password">此欄位不可留空</span>
                    <input class="formControls_btnSubmit" type="button" @click="loginBtn" value="登入">
                    <RouterLink class="formControls_btnLink" to="/sign">註冊帳號</RouterLink>
                    <!-- <input class="formControls_btnSubmit" type="button" onclick="javascript:location.href='#todoListPage'" value="登入"> -->
                    <!-- <a class="formControls_btnLink" href="#signUpPage">註冊帳號</a> -->
                </form>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

//= api =
import { apiSignIn } from "@/utils/api.js";

const router = useRouter();

const email = ref('');
const password = ref('');

const emailErr = ref(false);
const passwordErr = ref(false);

// const apiUrl='https://todolist-api.hexschool.io/';

const loginBtn = async()=>{
    try{
        //= 重置錯誤訊息 =
        emailErr.value = false;
        passwordErr.value = false;

        let hsaEmpty = false;
        if(!email.value){
            emailErr.value = true;
            hsaEmpty = true;
        }
        if(!password.value){
            passwordErr.value = true;
            hsaEmpty = true;
        }
        if (hsaEmpty) return;//如果有在讓他 return

        const signInData={
            "email": email.value,
            "password": password.value
        }

        const data = await apiSignIn(signInData);
        const { status, nickname, exp, token } = data.data;
        if(status){
            document.cookie = `vue3-todolist-token=${token}; expires=${exp}`
            alert('登入成功');
            router.push('/todolist');
        }
    }catch(e){
        // console.log(e.response);
        let errTxt;
        if(Array.isArray(e.response.data.message)){
            errTxt = e.response.data.message.join(" / ");
        }else{
            errTxt = e.response.data.message;
        }
        alert(errTxt);
    }
}

//驗證信箱
function isValidEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

//cookie設置
function setCookie(ckey,cval,exdays){
    const date = new Date();
    date.setDate(date.getDate() + exdays); 
    document.cookie = `${ckey}=${cval}; expires=${date.toUTCString()};`;
    //document.cookie = `vue3-todolist-token=abc123; expires=${date.toUTCString()}; path=/`;
}

</script>
