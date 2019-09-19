import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import axios from "axios";

import Header from "./Header";
import Navegacion from "./Navegacio";
import Post from "./Post";
import SinglePost from "./SinglePost";
import Formulario from "./Fomulario";

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
  borrarPost = id => {
    axios
      .delete(`https://jsonplaceholder.typicode.com/posts/${id}`)
      .then(res => {
        if (res.status === 200) {
          const posts = [...this.state.posts];
          let resultado = posts.filter(post => post.id !== Number(id));
          this.setState({ posts: resultado });
        }
      });
  };
  crearPost = post => {
    axios
      .post(`https://jsonplaceholder.typicode.com/posts`, { post })
      .then(res => {
        if (res.status === 201) {
          let postId = { id: res.data.id };
          const nuevoPost = Object.assign({}, res.data.post, postId);

          this.setState(prevState => ({
            posts: [...prevState.posts, nuevoPost]
          }));
        }
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
                  return (
                    <Post
                      posts={this.state.posts}
                      borrarPost={this.borrarPost}
                    ></Post>
                  );
                }}
              ></Route>

              <Route
                exact
                path="/posts/:postId"
                render={props => {
                  let idPost = props.location.pathname.replace("/posts/", "");
                  const posts = this.state.posts;
                  let filtro;
                  filtro = posts.filter(post => post.id === Number(idPost));
                  return <SinglePost post={filtro[0]}> </SinglePost>;
                }}
              ></Route>
              <Route
                exact
                path="/crear"
                render={() => {
                  return <Formulario crearPost={this.crearPost}> </Formulario>;
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
