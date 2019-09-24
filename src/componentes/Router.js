import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

import Header from "./Header";
import Navegacion from "./Navegacio";
import Post from "./Post";
import SinglePost from "./SinglePost";
import Formulario from "./Fomulario";
import Editar from "./Editar";

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
          Swal.fire("Post creado!", "Se creo correctamente!", "success");
          let postId = { id: res.data.id };

          const nuevoPost = Object.assign({}, postId, res.data.post);

          this.setState(prevState => ({
            posts: [...prevState.posts, nuevoPost]
          }));
        }
      });
  };
  editarPost = postActualizado => {
    // console.log(postActualizado);
    const { id } = postActualizado;
    console.log(postActualizado);
    axios
      .put(`https://jsonplaceholder.typicode.com/posts/${id}`, {
        postActualizado
      })
      .then(res => {
        if (res.status === 200) {
          this.obtenerPost();
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
                      crearPost
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
              <Route
                exact
                path="/editar/:postId"
                render={props => {
                  let idPost = props.location.pathname.replace("/editar/", "");
                  const posts = this.state.posts;
                  let filtro;
                  filtro = posts.filter(post => post.id === Number(idPost));
                  return (
                    <Editar post={filtro[0]} editarPost={this.editarPost}>
                      {" "}
                    </Editar>
                  );
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
