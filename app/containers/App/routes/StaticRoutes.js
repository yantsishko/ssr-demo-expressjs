import Users from './../../pages/Users';
import UsersGender from './../../pages/UsersGender';
import NotFound from './../../pages/NotFound';

export const StaticRoutesConfig = [
  {
    key: 'usersGender',
    component: UsersGender,
    exact: true,
    path: '/users-gender/:gender',
  },
  {
    key: 'USERS',
    component: Users,
    exact: true,
    path: '/users',
  },
  {
    key: 'main',
    component: Users,
    exact: true,
    path: '/',
  },
  {
    key: 'not-found',
    component: NotFound,
  },
];
