import { createRouter, createWebHistory } from 'vue-router';
import StartPage from '../pages/StartPage.vue';
import ActivitiesPage from '../pages/ActivitiesPage.vue';
import PortalDestination from '../pages/PortalDestination.vue';
import AboutMeComponent from "@/components/AboutMeComponent.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'start',
            component: StartPage
        },
        {
            path: '/activities',
            name: 'activities',
            component: ActivitiesPage
        },
        {
            path: '/destination/:activityType',
            name: 'portalDestination',
            component: PortalDestination,
            props: true
        },
        {
            path: '/about-me',
            name: 'aboutMe',
            component: AboutMeComponent
        }
    ]
});

export default router;