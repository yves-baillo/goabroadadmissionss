import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../components/HomePage.vue'
import ScholarshipDetail from '../components/ScholarshipDetail.vue'
import News from '../components/News.vue'
import ContactPage from '../components/ContactPage.vue'
import AboutPage from '../components/AboutPage.vue'
import ScholarshipsPage from '../components/ScholarshipsPage.vue'
import AppFooter from '../components/AppFooter.vue'
import Dashboard from '../components/Dashboard.vue'
import FaqPage from '../components/FaqPage.vue'
import TermsPage from '../components/TermsPage.vue'
import PrivacyPage from '../components/PrivacyPage.vue'
import LoginPage from '../components/LoginPage.vue'

const routes = [
  {
    path: '/',
    component: HomePage
  },
  {
    path: '/scholarship/:id',
    name: 'ScholarshipDetail',
    component: ScholarshipDetail,
    props: true
  },
  {
    path:'/news',
    component:News
  },
  {
    path:'/contact',
    component:ContactPage
  },
  {
    path:'/about',
    component:AboutPage
  },
  {
    path:'/scholarships',
    component:ScholarshipsPage
  },
  
  {
    path:'/dashboard',
    component:Dashboard
  },
  
   {
    path:'/FAQs',
    component:FaqPage
  },
    {
    path:'/terms',
    component:TermsPage
  },
    {
    path:'/privacy',
    component:PrivacyPage
  },
   {
    path:'/login',
    component:LoginPage
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
