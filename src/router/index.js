import { createWebHistory, createRouter } from "vue-router";
import HomePage from "@/views/HomePage.vue";
import AboutPage from "@/views/AboutPage.vue";
import FriendPage from "@/views/FriendPage.vue";
import User from "@/views/User.vue";
import RegisterPage from "@/views/RegisterPage.vue";
import LoginPage from "@/views/LoginPage.vue";
import ProfilePage from "@/views/ProfilePage.vue";
import PostPage from "@/views/PostPage.vue";
import NotFound from "@/views/NotFound.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: HomePage,
    children: [
      {
        path: '',
        component: AboutPage
      }
    ],
  },
  {
    path: "/about",
    name: "About",
    component: AboutPage,
  },
  {
    path: "/register",
    name: "Register",
    component: RegisterPage,
  },
  {
    path: "/login",
    name: "Login",
    component: LoginPage,
  },
  {
    path: "/profile",
    name: "Profile",
    component: ProfilePage,
  },
  {
    path: "/post",
    name: "Post",
    component: PostPage,
  },
  {
    path: "/friends",
    name: "Friend",
    component: FriendPage,
  },
  {
    path: "/user/:name",
    name: "User",
    component: User,
  },
  {
    path: "/:catchAll(.*)",
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;