import React, { useEffect } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { checkAuthState } from './store/actions/authActions';
import Layout from './components/Layout';
import Home from './pages/Home';
import Products from './pages/Products';
import Categories from './pages/Categories';
import About from './pages/About';
import Contact from './pages/Contact';
import ProductDetail from './components/ProductDetail';
import Login from './components/Login';
import Register from './pages/Register';
import Cart from './pages/Cart';
import Profile from './pages/Profile';
import Checkout from './pages/Checkout';
import Error from './components/Error';
import ProductList from './components/Products/ProductList';

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout><Home /></Layout>,
        errorElement: <Error />
    },
    {
        path: "/products",
        element: <Layout><Products /></Layout>,
    },
    {
        path: "/categories",
        element: <Layout><Categories /></Layout>,
    },
    {
        path: "/about",
        element: <Layout><About /></Layout>,
    },
    {
        path: "/contact",
        element: <Layout><Contact /></Layout>,
    },
    {
        path: "/product/:id",
        element: <Layout><ProductDetail /></Layout>,
    },
    {
        path: "/login",
        element: <Layout><Login /></Layout>,
    },
    {
        path: "/register",
        element: <Layout><Register /></Layout>,
    },
    {
        path: "/cart",
        element: <Layout><Cart /></Layout>,
    },
    {
        path: "/checkout",
        element: <Layout><Checkout /></Layout>,
    },
    {
        path: "/profile",
        element: <Layout><Profile /></Layout>,
    },
    {
        path: "/product-list",
        element: <Layout><ProductList /></Layout>,
    },
    {
        path: "*",
        element: <Error />
    }
]);

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(checkAuthState());
    }, [dispatch]);

    return <RouterProvider router={router} />;
}

export default App;
