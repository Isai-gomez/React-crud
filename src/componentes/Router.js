import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import axios from "axios";

import Header from "./Header";
import Navegacion from "./Navegacio";
import Post from "./Post";
import SinglePost from "./SinglePost";

class Router extends Component {
  state = {
    posts: []
  };
  componentDidMount() {
    this.obtenerPost();
  }
  obtenerPost = () => {
    axios.get(`https://jsonplaceholder.typicode.com/posts`).then(res => {
      this.setState({ posts: res.data });
    });
  };
  render() {
    return (
      <BrowserRouter>
        <div className="container">
          <div className="row justify-content-center">
            <Header />
            <Navegacion />
            <Switch>
              <Route
                exact
                path="/"
                render={() => {
                  return <Post posts={this.state.posts}></Post>;
                }}
              ></Route>

              <Route
                exact
                path="/posts/:postId"
                render={props => {
                  let idPost = props.location.pathname.replace("/posts/", "");
                  const posts = this.state.posts;
                  let filtro;
                  filtro = posts.filter(post => post.id == idPost);
                  return <SinglePost post={filtro[0]}> </SinglePost>;
                }}
              ></Route>
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}
export default Router;
