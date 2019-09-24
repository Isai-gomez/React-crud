import React, { Component } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

class Posts extends Component {
  confirmarelEiminacion = () => {
    const { id } = this.props.info;
    Swal.fire({
      title: "Estas seguro?",
      text: "Esta acción no se puede realizar",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar"
    }).then(result => {
      if (result.value) {
        this.props.borrarPost(id);
        Swal.fire("Eliminado", "El post ha sido eleminado", "success");
      }
    });
  };
  render() {
    const { id, title } = this.props.info;
    return (
      <tr>
        <td>{id}</td>
        <td>{title}</td>
        <td>
          <Link to={`/posts/${id}`} className="btn btn-primary">
            Ver
          </Link>
          <Link to={`/editar/${id}`} className="btn btn-warning">
            Editar
          </Link>
          <button
            onClick={this.confirmarelEiminacion}
            className="btn btn-danger"
          >
            Borrar
          </button>
        </td>
      </tr>
    );
  }
}
export default Posts;
