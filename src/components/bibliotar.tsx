import {
  JSX,
  lazy
} from 'solid-js';
import { Route, Router, useNavigate } from '@solidjs/router';

import PageNotFound from "./page-not-found/page-not-found";

export default (): JSX.Element => {

  const Home = lazy(() => import('./home/home'));
  const BookList = lazy(() => import('./books/book-list/books'));
  const Book = lazy(() => import('./books/book/book'));

  return <>
    <div
        style={{
          width:'100%',
          height:'100%'
        }}
    >
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

        {/* Page not found */}
        <Route path='*404' component={PageNotFound} />
      </Router>
    </div>
  </>
}
