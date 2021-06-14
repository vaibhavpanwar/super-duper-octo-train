import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages";
import ListItem from "./pages/list";

function App() {
  return (
    <>
      <Router>
        <div className="container">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/companies" component={ListItem} />
          </Switch>
        </div>
      </Router>
    </>
  );
}

export default App;
