import { createWebHistory, createRouter } from "vue-router";
import HomePage from "@/views/HomePage.vue";
import AboutPage from "@/views/AboutPage.vue";
import FriendPage from "@/views/FriendPage.vue";
import FindFriendPage from "@/views/FindFriendPage.vue";
import User from "@/views/User.vue";
import RegisterPage from "@/views/RegisterPage.vue";
import LoginPage from "@/views/LoginPage.vue";
import ProfilePage from "@/views/ProfilePage.vue";
import PostPage from "@/views/PostPage.vue";
import ContactPage from "@/views/ContactPage.vue";
import CompanyPage from "@/views/CompanyPage.vue";
import NotFound from "@/views/NotFound.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: HomePage,
    children: [
      {
        path: 'profile',
        components: {
          helper: ProfilePage
        }
      },
      {
        path: 'friends',
        components: {
          helper: FriendPage
        }
      },
      {
        path: 'find-friends',
        components: {
          helper: FindFriendPage
        }
      },
      {
        path: 'post',
        components: {
          helper: PostPage,
        }
      }
    ],
  },
  {
    path: "/about",
    name: "About",
    component: AboutPage,
    children: [
      {
        path: 'contact',
        components: {
          helper: ContactPage
        }
      },
      {
        path: 'company',
        components: {
          default: ContactPage,
          helper: CompanyPage,
        }
      }
    ],
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
    path: "/find-friends",
    name: "FindFriend",
    component: FindFriendPage,
  },
  {
    path: "/contact",
    name: "Contact",
    component: ContactPage,
  },
  {
    path: "/company",
    name: "Company",
    component: CompanyPage,
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