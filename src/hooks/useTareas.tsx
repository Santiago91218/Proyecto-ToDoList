import { useShallow } from "zustand/shallow";
import { tareaStore } from "../store/tareaStore";
import {
  editarTarea,
  eliminarTareaPorID,
  getAllTareas,
  postNuevaTarea,
} from "../http/tarea";
import { ITarea } from "../types/ITarea";
import Swal from "sweetalert2";

export const useTareas = () => {
  const {
    tareas,
    setArrayTareas,
    agregarNuevaTarea,
    eliminarTarea,
    editarUnaTarea,
  } = tareaStore(
    useShallow((state) => ({
      tareas: state.tareas,
      setArrayTareas: state.setArrayTareas,
      agregarNuevaTarea: state.agregarNuevaTarea,
      eliminarTarea: state.eliminarTarea,
      editarUnaTarea: state.editarUnaTarea,
    }))
  );

  const getTareas = async () => {
    const result = await getAllTareas();
    if (result) setArrayTareas(result);
  };

  const crearTarea = async (nuevaTarea: ITarea) => {
    agregarNuevaTarea(nuevaTarea);
    try {
      await postNuevaTarea(nuevaTarea);
      Swal.fire({
        title: "Tarea creada con exito",
        icon: "success",
        draggable: true,
      });
    } catch (error) {
      eliminarTarea(nuevaTarea.id!);
      console.log("Hubo un error al momento de crear la tarea");
      Swal.fire({
        title: "Error",
        text: "No se pudo crear la tarea",
        icon: "error",
      });
    }
  };

  const putEditarTarea = async (tareaEditada: ITarea) => {
    const estadoPrevio = tareas.find((el) => el.id === tareaEditada.id);
    editarUnaTarea(tareaEditada);
    try {
      await editarTarea(tareaEditada);
      Swal.fire({
        title: "Tarea editada con exito",
        icon: "success",
        draggable: true,
      });
    } catch (error) {
      if (estadoPrevio) editarUnaTarea(estadoPrevio);
      console.log("Hubo un error al editar la tarea");
      Swal.fire({
        title: "Error",
        text: "No se pudo editar la tarea",
        icon: "error",
      });
    }
  };

  const eliminarTareaById = async (idTarea: string) => {
    const estadoPrevio = tareas.find((el) => el.id === idTarea);
    eliminarTarea(idTarea);

    try {
      await eliminarTareaPorID(idTarea);
      Swal.fire({
        title: "Eliminado!",
        text: "La tarea se ha eliminado.",
        icon: "success",
      });
    } catch (error) {
      if (estadoPrevio) agregarNuevaTarea(estadoPrevio);
      console.log("Hubo un error al eliminar la tarea");
      Swal.fire({
        title: "Error",
        text: "No se pudo eliminar la tarea",
        icon: "error",
      });
    }
  };
  return {
    getTareas,
    crearTarea,
    putEditarTarea,
    eliminarTareaById,
    tareas,
  };
};
