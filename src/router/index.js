import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Login from '@/components/Login'
import Register from '@/components/Register'
import User from '@/components/router/User'
import Notice from '@/components/router/Notice'
import Place from '@/components/router/Place'
import Contest from '@/components/router/Contest'
import Equipment from '@/components/router/Equipment'
import Money from '@/components/router/Money'

Vue.use(Router)

export default new Router({
    routes: [{
            path: '/',
            name: 'Home',
            component: Home,
            children: [{
                    path: '/user',
                    name: 'User',
                    component: User,
                },
                {
                    path: '/notice',
                    name: 'Notice',
                    component: Notice,
                },
                {
                    path: '/place',
                    name: 'Place',
                    component: Place,
                },
                {
                    path: '/contest',
                    name: 'Contest',
                    component: Contest,
                },
                {
                    path: '/equipment',
                    name: 'Equipment',
                    component: Equipment,
                },
                {
                    path: '/money',
                    name: 'Money',
                    component: Money,
                }
            ]
        },
        {
            path: '/login',
            name: 'Login',
            component: Login
        },
        {
            path: '/register',
            name: 'Register',
            component: Register
        }
    ]
})