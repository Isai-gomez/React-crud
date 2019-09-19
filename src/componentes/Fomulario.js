import React, { Component } from "react";

class Formulario extends Component {
  // crar los resf
  tituloRef = React.createRef();
  entradaRef = React.createRef();
  crearPost = e => {
    e.preventDefault();
    // leer los resf
    const post = {
      title: this.tituloRef.current.value,
      body: this.entradaRef.current.value
    };
    console.log(post);
    // enviar por props o petición de axios
    this.props.crearPost(post);
  };
  render() {
    return (
      <form onSubmit={this.crearPost} className="col-8">
        <legend className="text-center">Crear nuevo post</legend>
        <div className="form-group">
          <label>Titulo del Post:</label>
          <input
            type="text"
            className="form-control"
            placeholder="Titulo del post"
            ref={this.tituloRef}
          ></input>
        </div>
        <div className="form-group">
          <label>Contenido:</label>
          <textarea
            type="text"
            className="form-control"
            placeholder="Contido...."
            ref={this.entradaRef}
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary">
          Crear
        </button>
      </form>
    );
  }
}

export default Formulario;
