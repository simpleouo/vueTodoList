<template>
    <!-- sign up -->
    <div id="signUpPage" class="bg-yellow">
        <div class="conatiner signUpPage vhContainer">
            <div class="side">
            <a href="#"><img class="logoImg" src="https://raw.githubusercontent.com/hexschool/2022-web-layout-training/main/todolist/logo.png" alt=""></a>
            <img class="d-m-n" src="https://raw.githubusercontent.com/hexschool/2022-web-layout-training/main/todolist/img.png" alt="workImg">
            </div>
            <div>
            <form class="formControls" action="index.html">
                <h2 class="formControls_txt">註冊帳號</h2>
                <label class="formControls_label" for="email">Email</label>
                <input class="formControls_input" type="text" id="email" name="email" placeholder="請輸入 email" required v-model="email">
                <span v-if="emailErr && !email">此欄位不可留空</span>
                <label class="formControls_label" for="name">您的暱稱</label>
                <input class="formControls_input" type="text" name="name" id="name" placeholder="請輸入您的暱稱" v-model="nickname">
                <span v-if="nicknameErr && !nickname">此欄位不可留空</span>
                <label class="formControls_label" for="pwd">密碼</label>
                <input class="formControls_input" type="password" name="pwd" id="pwd" placeholder="請輸入密碼" required v-model="password">
                <span v-if="passwordErr && !password">此欄位不可留空</span>
                <label class="formControls_label" for="pwdAgain">再次輸入密碼</label>
                <input class="formControls_input" type="password" name="pwdAgain" id="pwdAgain" placeholder="請再次輸入密碼" required v-model="passwordAgain">
                <span v-if="passwordAgainErr">密碼不相符</span>
                <input class="formControls_btnSubmit" type="button" @click="signUpBtn" value="註冊帳號">
                <RouterLink class="formControls_btnLink" to="/">登入</RouterLink>
                <!-- <input class="formControls_btnSubmit" type="button" onclick="javascript:location.href='#todoListPage'" value="註冊帳號"> -->
                <!-- <a class="formControls_btnLink" href="#loginPage">登入</a> -->
            </form>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router';
//= api =
import { apiSignUp } from "@/utils/api.js";

const router = useRouter();

const email = ref('');
const nickname = ref('');
const password = ref('');
const passwordAgain = ref('');

//= 錯誤訊息 =
const emailErr = ref(false);
const nicknameErr = ref(false);
const passwordErr = ref(false);
const passwordAgainErr = ref(false);

const signUpBtn = async()=>{
    try{
        //= 重置錯誤訊息 =
        emailErr.value = false;
        nicknameErr.value = false;
        passwordErr.value = false;
        passwordAgainErr.value = false;

        let hsaEmpty = false;
        if(!email.value){
            emailErr.value = true;
            hsaEmpty = true;
        }
        if(!nickname.value){
            nicknameErr.value = true;
            hsaEmpty = true;
        }
        if(!password.value){
            passwordErr.value = true;
            hsaEmpty = true;
        }
        if(password.value !== passwordAgain.value){
            passwordAgainErr.value = true;
            return;
        }
        if (hsaEmpty) return;//如果有在讓他 return

        const signData={
            "email": email.value,
            "password": password.value,
            "nickname": nickname.value
        }

        const data = await apiSignUp(signData);
        const { status, uid } = data.data;
        if(status){
            document.cookie = 'uid='+uid;
            router.push('/');
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
</script>