<template>
	<div
		class="flex-1 bg-[url(@/assets/images/login-bg.png),url(@/assets/images/login-bg-center.jpg)] bg-center [background-size:cover,409px_473px] bg-no-repeat">
	</div>
	<div class="flex-1 flex justify-center items-center">
		<div>
			<h1 class="text-[28px] mb-10 text-center font-semibold">
				{{ $t('MDR') }}<span class="block text-[34px] whitespace-pre-wrap">{{ $t('PTaDFC') }}</span>
			</h1>
			<div class="">
				<Form @submit="onSubmit">
					<label class="block mb-3.5">
						<div class="relative">
							<div class="relative">
								<div class="absolute inset-y-0 flex items-center pl-3">
									<img src="@/assets/images/account-icon.png" alt="" />
								</div>
								<Field :name="$t('account')" type="email" rules="required|email"
									:placeholder="$t('account_placeholder')"
									class="w-full pl-10 border border-light-gray focus:border-light-gray focus:shadow-none focus:ring-0 rounded px-4 py-3 placeholder:text-[#ccc] placeholder:font-medium"
									:class="{ 'placeholder:text-sm': lang === 'en' }" />
							</div>
							<ErrorMessage :name="$t('account')" class="text-sm text-red-medium" />
						</div>
					</label>
					<label class="block mb-8">
						<div class="relative">
							<div class="relative">
								<div class="absolute inset-y-0 flex items-center pl-3">
									<img src="@/assets/images/password-icon.png" alt="" />
								</div>
								<Field :name="$t('password')" type="password" rules="required" :placeholder="$t('password_placeholder')"
									class="w-full pl-10 border border-light-gray focus:border-light-gray focus:shadow-none focus:ring-0 rounded px-4 py-3 placeholder:text-[#ccc] placeholder:font-medium"
									:class="{ 'placeholder:text-sm': lang === 'en' }" />
							</div>
							<ErrorMessage :name="$t('password')" class="text-sm text-red-medium" />
						</div>
					</label>
					<button type="submit" class="bg-main py-3 w-full rounded text-white hover:bg-primary-dark">
						{{ $t('login') }}
					</button>
				</Form>
			</div>
		</div>
	</div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { Form, Field, ErrorMessage, configure, defineRule } from 'vee-validate';
import { required, email } from '@vee-validate/rules';
import { localize } from '@vee-validate/i18n';
import en from '@vee-validate/i18n/dist/locale/en.json';
import zh_TW from '@vee-validate/i18n/dist/locale/zh_TW.json';
import { useUserStore } from "@/stores/user";
import { storeToRefs } from "pinia";
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
defineRule('required', required);
defineRule('email', email);

configure({
	generateMessage: localize({
		en,
		zh_TW,
	}),
});


const router = useRouter()

const user = useUserStore()
const { loginFun } = user
const { lang } = storeToRefs(user)

const onSubmit = async (values) => {
	try {
		console.log(values)
		const emailKey = t('account')
		const passwordKey = t('password')
		const formData = new FormData();
		formData.append('email', values[emailKey]);
		formData.append('password', values[passwordKey]);
		const data = await loginFun(formData)
		if (data.status === 'success') {
			router.push('/');
		}
	} catch (error) {
		console.log(error)
	}
}

// const { errors, meta, defineField, handleSubmit, isSubmitting } = useForm({
// 	validationSchema: yup.object({
// 		email: yup.string().required().email(),
// 		password: yup.string().required()
// 	})
// });
// const [email, emailAttrs] = defineField('email')
// const [password, passwordAttrs] = defineField('password')

// const onSubmit = handleSubmit(async (values) => {
// 	// alert(JSON.stringify(values, null, 2))
// 	try {
// 		const formData = new FormData();
// 		formData.append('email', values.email);
// 		formData.append('password', values.password);
// 		const data = await loginFun(formData)
// 		if (data.status === 'success') {
// 			router.push('/');
// 		}
// 	} catch (error) {
// 		console.log(error)
// 	}

// }, ({ errors }) => {
// 	console.log(errors)
// 	const firstError = Object.keys(errors)[0];
// 	const el = document.querySelector(`[name="${firstError}"]`);
// 	el.focus()
// })

</script>

<style lang="scss" scoped></style>
