import {
  Accessor,
  createEffect,
  from,
  JSX,
  lazy,
  onMount,
  useContext
} from 'solid-js';
import { Route, Router, useNavigate } from '@solidjs/router';

import { DIContextProvider } from "../services/di-context-provider.service";
import { AppService } from "../services/app.service";

import { RegisteredUser } from "../interfaces/authentication.interfaces";

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

  const app: AppService = useContext(DIContextProvider)!.resolve(AppService);

  const token: Accessor<string | undefined> = from(app.authentication.token$);
  const user: Accessor<RegisteredUser | undefined> = from(app.authentication.user$);

  onMount((): void => {
    app.authentication.checkIfAuthenticated();
  });

  createEffect((): void => {
    console.log('token: ', token());
    console.log('user: ', user());
  });

  const BookCreate = () => <Book mode={'create'} />
  const BookView = () => <Book mode={'view'} />

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
        <Route path={'/books/:id'} component={BookView} />
        <Route path={'/login'} component={Login} />
        <Route path={'/register'} component={Register} />

        {/* Auth paths */}
        <Route path={'/admin'} component={Admin} />
        <Route path={'/librarian'} component={Librarian} />
        <Route path={'/profile'} component={UserProfile} />
        <Route path={'/books/create'} component={BookCreate} />

        {/* Page not found */}
        <Route path='*404' component={PageNotFound} />
      </Router>
    </div>
  </>
}
