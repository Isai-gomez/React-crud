import React, { Component } from "react";

import Listado from "./Listado";

class Post extends Component {
  state = {};
  render() {
    return (
      <div className="col-12 col-md-8">
        <h2 className="text-center">Post</h2>
        <Listado
          posts={this.props.posts}
          borrarPost={this.props.borrarPost}
        ></Listado>
      </div>
    );
  }
}
export default Post;
