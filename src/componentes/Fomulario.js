import React, { Component } from "react";

class Formulario extends Component {
  render() {
    return (
      <form className="col-8">
        <legend className="text-center">Crear nuevo post</legend>
        <div className="form-group">
          <label>Titulo del Post:</label>
          <input
            type="text"
            className="form-control"
            placeholder="Titulo del post"
          ></input>
        </div>
        <div className="form-group">
          <label>Contenido:</label>
          <textarea
            type="text"
            className="form-control"
            placeholder="Contido...."
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
