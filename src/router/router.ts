import Vue from 'vue';
import Router from 'vue-router';
import Layout from '@/layout/index.vue';
import { getUid, getToken } from '@/utils/session';

Vue.use(Router);

interface MetaType {
    title: string // the name showed in subMenu and breadcrumb (recommend set)
    icon: string  // the icon showed in the sidebar
    breadcrumb: boolean // if false, the item will be hidden in breadcrumb (default is true)
    hidden: boolean     // if true, this route will not show in the sidebar (default is false)
    access?: string
}

const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    scrollBehavior: (to, from, savedPosition) => {
        return savedPosition ? savedPosition : { x: 0, y: 0 };
    },
    routes: [
        {
            path: '/login',
            component: () => import('@/pages/login.vue'),
            meta: {
                hidden: true
            }
        },
        {
            path: '/404',
            component: () => import('@/pages/404.vue'),
            meta: {
                hidden: true
            }
        },
        {
            path: '/',
            component: Layout,
            redirect: '/home',
            children: [
                {
                    path: 'home',
                    component: () => import('@/pages/home.vue'),
                    meta: {
                        title: 'home',
                        icon: 'home'
                    }
                }
            ]
        },
        // --------------------课程管理-------------
        // {
        //     path: '/course',
        //     component: Layout,
        //     meta: {
        //         access: 'course'
        //     },
        //     children: [
        //         {
        //             path: 'all',
        //             component: () => import('@/pages/form.vue'),
        //             meta: {
        //                 title: '所有课程',
        //                 icon: 'form'
        //             }
        //         },
        //         {
        //             path: 'all',
        //             component: () => import('@/pages/form.vue'),
        //             meta: {
        //                 title: '所有课程',
        //                 icon: 'form'
        //             }
        //         },
        //         {
        //             path: 'all',
        //             component: () => import('@/pages/form.vue'),
        //             meta: {
        //                 title: '所有课程',
        //                 icon: 'form'
        //             }
        //         },
        //     ]
        // },

        // {
        //     path: '/form',
        //     component: Layout,
        //     meta: {
        //         access: 'form'
        //     },
        //     children: [
        //         {
        //             path: 'index',
        //             component: () => import('@/pages/form.vue'),
        //             meta: {
        //                 title: 'form',
        //                 icon: 'form'
        //             }
        //         }
        //     ]
        // },
        // {
        //     path: '/partner',
        //     component: Layout,
        //     meta: {
        //         access: 'partner'
        //     },
        //     children: [
        //         {
        //             path: 'index',
        //             component: () => import('@/pages/partner/index.vue'),
        //             meta: {
        //                 title: 'Partner',
        //                 icon: 'form'
        //             }
        //         }
        //     ]
        // },
        {
            path: '*',
            redirect: '/404',
            meta: {
                hidden: true
            }
        }
    ]
})

router.beforeEach((to, from, next) => {
    document.title = to.meta.title || '后台管理';

    const uid: string = getUid();
    const token: string = getToken();

    if ((!uid || !token) && to.path !== '/login') {
        return next({path: '/login'});
    }
    // if (to.path === '/login') {
    //     return next({ path: '/' });
    // }
    return next();
});

export default router;
