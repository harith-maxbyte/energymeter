import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Loading from './components/Loading';
import { MainRoute } from './routers';

import { MainLayout } from './layout';


const DashboardPage1 = lazy(() => import('./Pages/Dashboard1'));
const DashboardPage2 = lazy(() => import('./Pages/Dashboard2'));
const Login = lazy(() => import('./Pages/Home/Login'));

const Routes = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Router>
        <Switch>
          <Route
           exact 
            path="/"
            component={Login}
          />
          <MainRoute
            exact
            path="/1"
            layout={MainLayout}
            component= {DashboardPage1}
          />

          <MainRoute
            exact
            path="/2"
            layout={MainLayout}
            component={DashboardPage2}
          />

          <Route path="*" component={() => <center><h2>Development in progress...</h2></center>} />

        </Switch>
      </Router>
    </Suspense>
  );
};

export default Routes;
