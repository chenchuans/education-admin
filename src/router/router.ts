import Vue from 'vue';
import Router from 'vue-router';
import Layout from '@/layout/index.vue';
import { getUid, getToken, getRole } from '@/utils/session';

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
            component: () => import('@/pages/base/Login.vue'),
            meta: {
                hidden: true,
                role: 'ADMIN'
            }
        },
        {
            path: '/404',
            component: () => import('@/pages/base/404.vue'),
            meta: {
                hidden: true,
                role: 'ADMIN'
            }
        },
        {
            path: '/',
            component: Layout,
            redirect: '/home',
            children: [
                {
                    path: 'home',
                    component: () => import('@/pages/base/Home.vue'),
                    meta: {
                        title: '首页',
                        icon: 'dashboard',
                        role: 'ADMIN'
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
                icon: 'dashboard',
                access: 'course',
                role: 'ADMIN'
            },
            children: [
                {
                    path: 'list',
                    component: () => import('@/pages/course/CourseList.vue'),
                    meta: {
                        title: '所有课程',
                        role: 'ADMIN'
                    }
                },
                {
                    path: 'update',
                    component: () => import('@/pages/course/CourseUpdate.vue'),
                    meta: {
                        title: '创建/编辑课程',
                        hidden: true,
                        role: 'ADMIN'
                    }
                },
                {
                    path: 'version-list',
                    component: () => import('@/pages/version/VersionList.vue'),
                    meta: {
                        title: '课程详情',
                        hidden: true,
                        role: 'ADMIN'
                    }
                },
                {
                    path: 'version-update',
                    component: () => import('@/pages/version/VersionUpdate.vue'),
                    meta: {
                        title: '版本编辑',
                        hidden: true,
                        role: 'ADMIN'
                    }
                },
                {
                    path: 'catalog-list',
                    component: () => import('@/pages/catalog/CatalogList.vue'),
                    meta: {
                        title: '版本详情',
                        hidden: true,
                        role: 'ADMIN'
                    }
                },
                {
                    path: 'chapter-list',
                    component: () => import('@/pages/chapter/ChapterList.vue'),
                    meta: {
                        title: '课程小节列表',
                        hidden: true,
                        role: 'ADMIN'
                    }
                },
                {
                    path: 'content-list',
                    component: () => import('@/pages/content/ContentList.vue'),
                    meta: {
                        title: '课程内容',
                        hidden: true,
                        role: 'ADMIN'
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
                access: 'operate',
                role: 'ADMIN'
            },
            children: [
                {
                    path: 'semester-management',
                    component: () => import('@/pages/semester/SemesterManagement.vue'),
                    meta: {
                        title: '学期管理',
                        role: 'TEACHER'
                    }
                },
                {
                    path: 'semester-management-update',
                    component: () => import('@/pages/semester/SemesterManagementUpdate.vue'),
                    meta: {
                        title: '学期管理编辑',
                        hidden: true,
                        role: 'TEACHER'
                    }
                },
                {
                    path: 'teacher-management',
                    component: () => import('@/pages/teacher/TeacherManagement.vue'),
                    meta: {
                        title: '老师管理',
                        role: 'TEACHER'
                    }
                },
                {
                    path: 'teacher-management-update',
                    component: () => import('@/pages/teacher/TeacherManagementUpdate.vue'),
                    meta: {
                        title: '老师管理编辑',
                        hidden: true,
                        role: 'TEACHER'
                    }
                },
                {
                    path: 'course-promotion',
                    component: () => import('@/pages/operate/CoursePromotion.vue'),
                    meta: {
                        title: '课程推广',
                        role: 'ADMIN'
                    }
                },
                {
                    path: 'learning-situation',
                    component: () => import('@/pages/operate/LearningSituation.vue'),
                    meta: {
                        title: '学生学习状况',
                        role: 'ADMIN'
                    }
                },
            ]
        },
        // --------------------运营管理-------------
        {
            path: '*',
            redirect: '/404',
            meta: {
                hidden: true,
                role: 'ADMIN'
            }
        }
    ]
})

router.beforeEach((to, from, next) => {
    document.title = to.meta.title || '后台管理';

    const uid: string = getUid();
    const token: string = getToken();
    const role: string = getRole();

    if (to.meta.role === 'TEACHER' && role === 'TEACHER') {
        // 普通管理员和超级管理员权限校验
        return next({ path: '/404' });
    }

    if ((!uid || !token) && to.path !== '/login') {
        return next({path: '/login'});
    }
    return next();
});

export default router;
