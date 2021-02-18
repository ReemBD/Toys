import { Dashboard } from './pages/Dashboard'
import { LoginSignup } from './pages/LoginSignup'
import { ToyAppPage } from './pages/ToyAppPage'
import { ToyDetails } from './pages/ToyDetails'
import { ToyEdit } from './pages/ToyEdit'
import { ToyReview } from './pages/ToyReview'
import { About } from './pages/About.jsx'
import { UserDetails } from './pages/UserDetails.jsx'
import { Chat } from './pages/Chat'

export const routes = [
    {
        path: "/",
        component: ToyAppPage
    },
    {
        path: "/toy/:toyId",
        component: ToyDetails
    },
    {
        path: "/edit/:toyId?",
        component: ToyEdit
    },
    {
        path: "/dashboard",
        component: Dashboard
    },
    {
        path: "/login",
        component: LoginSignup
    },
    {
        path: "/review/:toyId",
        component: ToyReview
    },
    {
        path: "/about",
        component: About
    },
    {
        path: "/profile",
        component: UserDetails
    },
]