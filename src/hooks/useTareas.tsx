import { useShallow } from "zustand/shallow";
import { tareaStore } from "../store/tareaStore";
import {
  editarTarea,
  eliminarTareaPorID,
  getAllTareas,
  postNuevaTarea,
} from "../http/tarea";
import { ITarea } from "../types/ITarea";

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
    } catch (error) {
      eliminarTarea(nuevaTarea.id!);
      console.log("Hubo un error al momento de crear la tarea");
    }
  };

  const putEditarTarea = async (tareaEditada: ITarea) => {
    const estadoPrevio = tareas.find((el) => el.id === tareaEditada.id);
    editarUnaTarea(tareaEditada);
    try {
      await editarTarea(tareaEditada);
    } catch (error) {
      if (estadoPrevio) editarUnaTarea(estadoPrevio);
      console.log("Hubo un error al editar la tarea");
    }
  };

  const eliminarTareaById = async (idTarea: string) => {
    const estadoPrevio = tareas.find((el) => el.id === idTarea);
    eliminarTarea(idTarea);

    try {
      await eliminarTareaPorID(idTarea);
    } catch (error) {
      if (estadoPrevio) agregarNuevaTarea(estadoPrevio);
      console.log("Hubo un error al eliminar la tarea");
    }
  };

  return {
    getTareas,
    crearTarea,
    putEditarTarea,
    eliminarTareaById,
    tareas
  };
};
