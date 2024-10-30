import "@/assets/styles/index.scss"
import 'primeicons/primeicons.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import zhTW from '@/locales/zh-TW.json'
import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura' //目前PrimeVue提供的預設主題之一
import Lara from '@primevue/themes/lara' //目前PrimeVue提供的預設主題之一
import Nora from '@primevue/themes/nora' //目前PrimeVue提供的預設主題之一
import ToastService from 'primevue/toastservice';
import { definePreset } from '@primevue/themes'; //配置 客製化設定

const MyCustom = definePreset(Aura, {
	semantic: {
		primary: {
			//引入主題色 ( 要修改其他在元件內修改 )
			50: '#fffbec',
			100: '#fff6d4',
			200: '#ffe9a7',
			300: '#ffd870',
			400: '#ffbb36',
			500: '#ffa40f',
			600: '#fa8c05',
			700: '#c86706',
			800: '#9e500e',
			900: '#7f420f',
			950: '#452005'
		},
	}
});

const app = createApp(App)
app.use(PrimeVue, {
	theme: {
		preset: MyCustom,
		options: {
			prefix: 'p', // 前綴，預設為 p
			darkModeSelector: '.my-app-dark',
			cssLayer: { // tailwindCSS 及 primeVue 載入順序設定
				name: 'primevue',
				order: 'tailwind-base, primevue, tailwind-utilities'
			},
		},
	},
	pt: {
		global: {
			css:``
			// 全域css設定
			// css: `
			// .p-datepicker-today > .custom-test {
			//     background-color: red;
			// }
			// .p-dialog-close-button:hover{
			//     background-color: red;
			// }
			// `
		},
	},
	locale: zhTW['zh-TW']
});

app.use(createPinia())
app.use(router)
app.use(ToastService)
app.mount('#app')
