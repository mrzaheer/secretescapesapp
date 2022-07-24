import Home from "./pages/Home";
import Search from "./pages/Search";
import SaleDetails from "./pages/SaleDetails.tsx";

interface Route {
    key: string,
    title: string,
    path: string,
    enabled: boolean,
    component: () => JSX.Element
}

export const appRoutes: Array<Route> = [
    {
        key: 'home-route',
        title: 'Home',
        path: '/',
        enabled: true,
        component: Home
    },
    {
        key: 'search-route',
        title: 'Search',
        path: '/search',
        enabled: true,
        component: Search
    },
    {
        key: 'saledetails-route',
        title: 'Sale Details',
        path: '/sale/:id',
        enabled: true,
        component: SaleDetails
    }
]