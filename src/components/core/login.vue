<template>
  <div class="w-full h-100% flex flex-col">
    <!-- <Header class="h-40px flex justify-between"></Header> -->
    <div class="login flex-1 home relative flex items-center">
      <div class="w-500px h-640px absolute right-120px p-20px box rounded-20px">
        <h1 class="text-center text-28px">管理登录</h1>
        <div class="m-40px mt-60px">
          <el-form
            ref="ruleFormRef"
            label-position="top"
            size="large"
            label-width="100px"
            :model="formData"
            :rules="rules"
          >
            <el-form-item label="账号:" prop="account">
              <el-input v-model="formData.account" placeholder="请输入账号" />
            </el-form-item>
            <el-form-item class="w-full relative">
              <el-form-item label="密码:" prop="pwd" class="w-full">
                <el-input
                  :type="pwdSwitch ? 'password' : 'text'"
                  v-model="formData.pwd"
                  placeholder="请输入密码"
                />
              </el-form-item>
              <div class="absolute left-101% top-34px cursor-pointer">
                <el-icon
                  size="18px"
                  @click="pwdSwitch = true"
                  v-if="!pwdSwitch && formData.pwd"
                  ><i-ep-Hide
                /></el-icon>
                <el-icon
                  size="18px"
                  @click="pwdSwitch = false"
                  v-if="pwdSwitch && formData.pwd"
                  ><i-ep-view
                /></el-icon>
              </div>
            </el-form-item>
            <el-form-item label="验证码:" class="flex">
              <el-form-item prop="verifyCode" class="flex-1">
                <el-input
                  v-model="formData.verifyCode"
                  class="w-full"
                  clearable
                  placeholder="请输入验证码"
                />
              </el-form-item>
              <el-image
                @click="getCodeAsync"
                class="w-120px h-40px m-l-10px cursor-pointer text-color rounded-4px px-10px"
                :src="imgUrl"
                :zoom-rate="1.2"
                :initial-index="4"
                fit="cover"
              />
            </el-form-item>
            <el-form-item class="mt-50px">
              <el-button
                :disabled="
                  !formData.account || !formData.pwd || !formData.verifyCode
                "
                class="w-full"
                type="primary"
                @click="onSubmit"
                >登 录</el-button
              >
            </el-form-item>
          </el-form>
        </div>
        <div
          class="text-center leading-36px text-14px absolute bottom-0 left-150px"
        >
          All Rights Reserved by ©ISFORSEC
        </div>
      </div>
    </div>
    <!-- <Footer /> -->
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import pwdPartern from "@/utils/regular";
// import Header from "@/layout/header/index.vue";
// import Footer from "@/layout/footer/index.vue";
import type { FormInstance, FormRules } from "element-plus";
import { useUserStore } from "@/stores/user";
import { useRouter } from "vue-router";
import { login } from "@/api";
export type Form = {
  account: string;
  pwd: string;
  verifyCode: string;
  verifyId?: string;
  action?: string;
};
export type UserType = {
  user_id: number;
  user_name: string;
  account: string;
  session_id?: string;
};
const formData: Form = reactive({
  account: "",
  pwd: "",
  verifyCode: "",
  verifyId: "",
});
const imgUrl = ref<string>("");
const store = useUserStore();
const router = useRouter();
onMounted(() => {
  document.cookie = "session-id2=mdinidn"; //本地开发调试用
  getCodeAsync();
});
const getCodeAsync = async () => {
  let res = await login.getCodeApi({ action: "captcha" });
  imgUrl.value = res.data.b_64_s;
  formData.verifyId = res.data.id;
};
const pwdSwitch = ref<boolean>(true);
const ruleFormRef = ref<FormInstance>();
const validatePass = (rule: any, value: any, callback: any) => {
  if (value === "") {
    callback(new Error("请输入密码"));
  } else {
    const passed: boolean = pwdPartern.test(value);
    passed ? callback() : callback("8-16位数字和字符组合");
  }
};
const rules = reactive<FormRules>({
  account: [
    { required: true, message: "请输入账号", trigger: "blur" },
    { min: 4, max: 20, message: "4-20个字符", trigger: "blur" },
  ],
  pwd: [
    { required: true, message: "请输入密码", trigger: "blur" },
    { validator: validatePass, trigger: "blur" },
  ],
  verifyCode: [{ required: true, message: "请输入验证码", trigger: "blur" }],
});
const onSubmit = () => {
  if (!ruleFormRef.value) return;
  ruleFormRef.value!.validate(async (isValid: boolean) => {
    if (isValid) {
      const data: Form = { action: "login", ...formData };
      try {
        let res: API.Res<UserType | string> = await login.loginApi(data);
        if (res.code === -2) {
          store.$patch((state) => {
            state.userInfo.account = res.data as string;
          });
          router.push({
            path: "/changePwd/0",
          });
        } else if (res.code === 200) {
          store.set_userinfo(res.data as UserType);
          // document.cookie = "session-id2=mdinidn"; //本地开发调试用
          router.push({
            path: "/config/certificate",
          });
        }
      } catch (err) {
        formData.verifyCode = "";
        getCodeAsync();
      }
    }
  });
};
</script>
<style scoped lang="less">
.home {
  background: url("../../assets/images/bg/bg.webp") center/ 100% 100% no-repeat;
  // background-color: var(--content-bc-color);
  .box {
    background-color: #0b48567a;
    opacity: 0.8;
    color: var(--white-color);
    :deep(.el-form-item__label) {
      color: var(--white-color);
    }
    :deep(.el-input__wrapper) {
      border-radius: 8px;
    }
  }
  .text-color {
    background-color: var(--white-color);
  }
}
</style>
