import { createPinia } from "pinia";
import { createApp } from "vue";
import App from "./App.vue";
import messagePlugin from "./plugins/message";
import popconfirmPlugin from "./plugins/popconfirm";
import todoListsPlugin from "./plugins/todoLists";
import tooltipPlugin from "./plugins/tooltip";
import router from "./router";
import "./style.less";

const app = createApp(App);
const pinia = createPinia();

app.use(router);
app.use(pinia);
app.use(messagePlugin);
app.use(tooltipPlugin);
app.use(popconfirmPlugin);
app.use(todoListsPlugin);

app.config.globalProperties.marked = marked;
app.config.globalProperties.console = console;

app.mount("#app");
