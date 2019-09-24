import React, { Component } from "react";

class Editar extends Component {
  // crar los resf
  tituloRef = React.createRef();
  entradaRef = React.createRef();
  editarPost = e => {
    e.preventDefault();
    // leer los resf
    const post = {
      title: this.tituloRef.current.value,
      body: this.entradaRef.current.value,
      id: this.props.post.id
    };
    // console.log(post);
    // enviar por props o petición de axios
    this.props.editarPost(post);
  };
  cargarFormulario = () => {
    if (!this.props.post) return null;
    const { title, body } = this.props.post;
    return (
      <form onSubmit={this.editarPost} className="col-8">
        <legend className="text-center">Editar post</legend>
        <div className="form-group">
          <label>Titulo del Post:</label>
          <input
            type="text"
            className="form-control"
            defaultValue={title}
            ref={this.tituloRef}
          ></input>
        </div>
        <div className="form-group">
          <label>Contenido:</label>
          <textarea
            type="text"
            className="form-control"
            defaultValue={body}
            ref={this.entradaRef}
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary">
          Guardar Cambios
        </button>
      </form>
    );
  };
  render() {
    return <React.Fragment>{this.cargarFormulario()}</React.Fragment>;
  }
}

export default Editar;
