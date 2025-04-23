import {
  JSX,
  lazy
} from 'solid-js';
import { Route, Router, useNavigate } from '@solidjs/router';

import PageNotFound from "./page-not-found/page-not-found";
import NavbarUtil from './utility/navbar-util';


export default (): JSX.Element => {

  const Home = lazy(() => import('./home/home'));
  const BookList = lazy(() => import('./books/book-list/books'));
  const Book = lazy(() => import('./books/book/book'));
  const Admin = lazy(() => import('./admin/admin'));
  const Librarian = lazy(() => import('./librarian/librarian'));
  const Login = lazy(() => import('./auth/login/login'));
  const Register = lazy(() => import('./auth/register/register'));
  const UserProfile = lazy(() => import('./user-profile/user-profile'));

  return <>
    
    <div
        style={{
          width:'100%',
          height:'100%',
          background: '#e3d6c3',
          display: 'flex',
          "flex-direction": 'column',
          "min-height": '100vh'
        }}
    >
      <NavbarUtil></NavbarUtil>
      <Router>
        {/* Redirects */}
        <Route path={'/'} component={(): JSX.Element => {
          const navigate = useNavigate();
          navigate('/home', { replace: true });
          return <>REDIRECTING</>
        }} />

        {/* App paths */}
        <Route path={'/home'} component={Home} />
        <Route path={'/books'} component={BookList} />
        <Route path={'/books/:id'} component={Book} />
        <Route path={'/login'} component={Login} />
        <Route path={'/register'} component={Register} />

        {/* Auth paths */}
        <Route path={'/admin'} component={Admin} />
        <Route path={'/librarian'} component={Librarian} />
        <Route path={'/profile'} component={UserProfile} />
        

        {/* Page not found */}
        <Route path='*404' component={PageNotFound} />
      </Router>
    </div>
  </>
}
