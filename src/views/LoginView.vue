<template>
	<div
		class="flex-1 bg-[url(@/assets/images/login-bg.png),url(@/assets/images/login-bg-center.jpg)] bg-center [background-size:cover,409px_473px] bg-no-repeat">
	</div>
	<div class="flex-1 flex justify-center items-center">
		<div>
			<h1 class="text-[28px] mb-10 text-center font-semibold">
				多功能數位靶場<span class="block text-[34px]">攻擊演練與數位鑑識競賽</span>
			</h1>
			<div class="">
				<form @submit="onSubmit">
					<label class="block mb-3.5">
						<div class="relative">
							<div class="relative">
								<div class="absolute inset-y-0 flex items-center pl-3">
									<img src="@/assets/images/account-icon.png" alt="" />
								</div>
								<input v-model="email" v-bind="emailAttrs" type="email" name="email"
									class="w-full pl-10 border border-light-gray focus:border-light-gray focus:shadow-none focus:ring-0 rounded px-4 py-3 placeholder:text-[#ccc] placeholder:font-medium"
									placeholder="請輸入帳號" />
							</div>
							<span v-if="errors.email && meta.touched" class="text-sm text-red-medium">{{ errors.email
								}}</span>
						</div>
					</label>
					<label class="block mb-8">
						<div class="relative">
							<div class="absolute inset-y-0 flex items-center pl-3">
								<img src="@/assets/images/password-icon.png" alt="" />
							</div>
							<input v-model="password" type="password" v-bind="passwordAttrs" name="password"
								class="w-full pl-10 border border-light-gray focus:border-light-gray focus:shadow-none focus:ring-0 rounded px-4 py-3 placeholder:text-[#ccc] placeholder:font-medium"
								placeholder="請輸入密碼" />
							<span v-if="errors.password && meta.touched" class="text-sm text-red-medium">{{
					errors.password }}</span>
						</div>
					</label>
					<button type="submit" :disabled="isSubmitting"
						class="bg-main py-3 w-full rounded text-white hover:bg-primary-dark">
						登入
					</button>
				</form>
			</div>
		</div>
	</div>
</template>

<script setup>
// import { ref } from "vue";
import { useRouter } from "vue-router";
import { useForm } from 'vee-validate';
import * as yup from 'yup';
import { useUserStore } from "@/stores/user";
// import { storeToRefs } from "pinia";

const router = useRouter()

const user = useUserStore()
const { loginFun } = user

const { errors, meta, defineField, handleSubmit, isSubmitting } = useForm({
	validationSchema: yup.object({
		email: yup.string().required().email(),
		password: yup.string().required()
	})
});
const [email, emailAttrs] = defineField('email')
const [password, passwordAttrs] = defineField('password')

const onSubmit = handleSubmit(async (values) => {
	// alert(JSON.stringify(values, null, 2))
	try {
		const formData = new FormData();
		formData.append('email', values.email);
		formData.append('password', values.password);
		const data = await loginFun(formData)
		if (data.status === 'success') {
			router.push('/');
		}
	} catch (error) {
		console.log(error)
	}

}, ({ errors }) => {
	console.log(errors)
	const firstError = Object.keys(errors)[0];
	const el = document.querySelector(`[name="${firstError}"]`);
	el.focus()
})

</script>

<style lang="scss" scoped></style>
