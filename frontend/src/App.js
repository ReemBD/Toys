import { routes } from './routes.js'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { AppHeader } from './cmps/AppHeader.jsx'
import './assets/scss/styles.scss';


export function App() {
  return (
    <main>
      <Router>
        <AppHeader />
        <Switch>
          {routes.map(route => <Route exact path={route.path} key={route.path} component={route.component} />)}
        </Switch>
      </Router>
    </main>
  );
}

