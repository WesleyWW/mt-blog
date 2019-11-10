import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

//importing view components
import Header from './components/navigation/header.view';
import Home from './components/home.view';
import CreateBlog from './components/blog/create-blog.view';
import EditBlog from './components/blog/edit-blog.view';
import Blog from './components/blog/index-blog.view';

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/blog" exact component={CreateBlog} />
          <Route path="/blog/edit/:id" exact component={EditBlog} />
          <Route path="/blog/:id" exact component={Blog} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
