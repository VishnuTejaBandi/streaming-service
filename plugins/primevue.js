import { defineNuxtPlugin } from '#app';
import PrimeVue from 'primevue/config';
import Button from 'primevue/button';
import ProgressSpinner from 'primevue/progressspinner';
import InputText from 'primevue/inputtext';
import DataView from 'primevue/dataview';
import Dropdown from 'primevue/dropdown';
import Menu from 'primevue/menu';
import Toast from 'primevue/toast';
import Ripple from 'primevue/ripple';
import ToastService from 'primevue/toastservice';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(PrimeVue, { ripple: true });
  nuxtApp.vueApp.use(ToastService);
  nuxtApp.vueApp.component('Button', Button);
  nuxtApp.vueApp.component('ProgressSpinner', ProgressSpinner);
  nuxtApp.vueApp.component('InputText', InputText);
  nuxtApp.vueApp.component('DataView', DataView);
  nuxtApp.vueApp.component('Dropdown', Dropdown);
  nuxtApp.vueApp.component('Menu', Menu);
  nuxtApp.vueApp.component('Toast', Toast);
  nuxtApp.vueApp.directive('ripple', Ripple);
});
