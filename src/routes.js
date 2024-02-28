import Home from './views/HomePage.vue'
import Acao from './views/AcaoPage.vue'
const routes = [
    {
        path: '/',
        component: Home
    },
    {
        name: "acao",
        path: "/acoes/:acao",
        component: Acao
    }
]

export default routes