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
    base: process.env.BASE_URL,
    scrollBehavior: (to, from, savedPosition) => {
        return savedPosition ? savedPosition : { x: 0, y: 0 };
    },
    routes: [
        {
            path: '/login',
            component: () => import('@/pages/Login.vue'),
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
                    component: () => import('@/pages/Home.vue'),
                    meta: {
                        title: '首页',
                        icon: 'dashboard'
                    }
                }
            ]
        },
        // --------------------课程管理-------------
        {
            path: '/course',
            component: Layout,
            meta: {
                title: '课程管理',
                access: 'course'
            },
            children: [
                {
                    path: 'list',
                    component: () => import('@/pages/course/CourseList.vue'),
                    meta: {
                        title: '所有课程'
                    }
                },
                {
                    path: 'update',
                    component: () => import('@/pages/course/CourseUpdate.vue'),
                    meta: {
                        title: '创建/编辑课程',
                        hidden: true
                    }
                },
                {
                    path: 'detail',
                    component: () => import('@/pages/catalog/CatalogList.vue'),
                    meta: {
                        title: '课程详情',
                        hidden: true
                    }
                },
                {
                    path: 'catalog-update',
                    component: () => import('@/pages/catalog/CatalogUpdate.vue'),
                    meta: {
                        title: '更新课程目录',
                        hidden: true
                    }
                },
                {
                    path: 'chapter-list',
                    component: () => import('@/pages/chapter/ChapterList.vue'),
                    meta: {
                        title: '课程小节列表',
                        hidden: true
                    }
                },
                {
                    path: 'chapter-update',
                    component: () => import('@/pages/chapter/ChapterUpdate.vue'),
                    meta: {
                        title: '更新课程小节',
                        hidden: true
                    }
                },
                {
                    path: 'content-list',
                    component: () => import('@/pages/content/ContentList.vue'),
                    meta: {
                        title: '课程内容',
                        hidden: true
                    }
                },
                {
                    path: 'content-update',
                    component: () => import('@/pages/content/ContentUpdate.vue'),
                    meta: {
                        title: '更新课程内容',
                        hidden: true
                    }
                }

            ]
        },
        // --------------------课程管理-------------
        // --------------------运营管理-------------
        {
            path: '/operate',
            component: Layout,
            meta: {
                title: '运营管理',
                access: 'operate'
            },
            children: [
                {
                    path: 'student-information',
                    component: () => import('@/pages/operate/StudentInformation.vue'),
                    meta: {
                        title: '学员信息展示'
                    }
                },
                {
                    path: 'student-detail',
                    component: () => import('@/pages/operate/StudentDetail.vue'),
                    meta: {
                        title: '学员详情'
                    }
                },
                {
                    path: 'data',
                    component: () => import('@/pages/operate/DataShow.vue'),
                    meta: {
                        title: '运营数据展示'
                    }
                },
            ]
        },
        // --------------------运营管理-------------
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
