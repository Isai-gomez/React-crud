import React, { Component } from "react";

import Posts from "./Posts";

class Listado extends Component {
  mostrarPost = () => {
    const post = this.props.posts;
    if (post.length === 0) {
      return null;
    }
    return (
      <React.Fragment>
        {Object.keys(post).map(post => (
          <Posts key={post} info={this.props.posts[post]} />
        ))}
      </React.Fragment>
    );
  };

  render() {
    return (
      <table className="table">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Titulo</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>{this.mostrarPost()}</tbody>
      </table>
    );
  }
}
export default Listado;
