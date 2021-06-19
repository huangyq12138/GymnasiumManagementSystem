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
import equipment_inquiry from '@/components/view/equipment_inquiry'
import place_appointment from '@/components/view/place_appointment'
import place_check from '@/components/view/place_check'


Vue.use(Router)

export default new Router({
    routes: [{
            path: '/',
            name: 'Login',
            component: Login
        },
        {
            path: '/register',
            name: 'Register',
            component: Register
        },
        {
            path: '/Home',
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
                },
                {
                    path: '/equipment_inquiry',
                    name: 'equipment_inquiry',
                    component: equipment_inquiry,
                },
                {
                    path: '/place_appointment',
                    name: 'place_appointment',
                    component: place_appointment,
                },
                {
                    path: 'place_check',
                    name: 'place_check',
                    component: place_check,
                },
            ]
        }
    ]
})