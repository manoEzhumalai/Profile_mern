import React from 'react';
const ProfileModule = React.lazy(() => import('../components/Profile'));
const Profile_list = React.lazy(() => import('../components/profilecrud/profile_list'));
const Profile_crud = React.lazy(() => import('../components/profilecrud/profile_crud'));


export const routes = [
    {
        name: "profile",
        path: "/profile",
        component: ProfileModule,
        sub: [
            {
                name: "subComponent1",
                path: "/profile/list",
                component: Profile_list,
            },
            {
                name: "subComponent1",
                path: "/profile/crud",
                component: Profile_crud,
            }]
    }
]