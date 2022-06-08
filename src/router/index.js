import {createWebHistory, createRouter} from "vue-router";

const routes = [
    {
        path: "/",
        name: "Home",
        redirect: "profile",
        component: import("@/views/HomePage.vue"),
        children: [
            {
                path: 'profile',
                components: {
                    helper: () => import("@/views/ProfilePage.vue")
                }
            },
            {
                path: 'friends',
                components: {
                    helper: () => import("@/views/FriendPage.vue")
                }
            },
            {
                path: 'find-friends',
                components: {
                    helper: () => import("@/views/FindFriendPage.vue")
                }
            },
            {
                path: 'my-post',
                components: {
                    helper: import("@/views/MyPostPage.vue"),
                }
            },
            {
                path: 'post',
                components: {
                    helper: import("@/views/PostPage.vue"),
                }
            }
        ],
    },
    {
        path: "/register",
        name: "Register",
        component: import("@/views/RegisterPage.vue"),
    },
    {
        path: "/login",
        name: "Login",
        component: import("@/views/LoginPage.vue"),
    },
    {
        path: "/:catchAll(.*)",
        component: import("@/views/NotFound.vue"),
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;