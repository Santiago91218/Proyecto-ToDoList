import axios from "axios";
import { IBacklog, ITarea } from "../types/ITarea";
const API_URL = import.meta.env.VITE_API_URL_BACKLOG;

export const getAllTareas = async () => {
  try {
    const response = await axios.get<IBacklog>(API_URL);
    return response.data.tareas;
  } catch (error) {
    console.log(error);
  }
};

export const postNuevaTarea = async (nuevaTarea: ITarea) => {
  try {
    const tareas = await getAllTareas();
    const nuevasTareas = [...tareas!, nuevaTarea];
    await axios.put(API_URL, { tareas: nuevasTareas }); 
    return nuevaTarea;
  } catch (error) {
    console.log(error);
  }
};

export const editarTarea = async (tareaActualizada: ITarea) => {
  try {
    const tareas = await getAllTareas();
    const nuevasTareas = tareas!.map((t) => (t.id === tareaActualizada.id ? tareaActualizada : t));
    await axios.put(API_URL, { tareas: nuevasTareas });
    return tareaActualizada;
  } catch (error) {
    console.log(error);
  }
};

export const eliminarTareaPorID = async (idTarea: string) => {
  try {
    const tareas = await getAllTareas();
    const nuevasTareas = tareas!.filter((t) => t.id !== idTarea);
    await axios.put(API_URL, { tareas: nuevasTareas });
    return null;
  } catch (error) {
    console.log(error);
  }
};

export const eliminarTareaBacklog = async (idTarea: string) => {
  try {
    const tareas = await getAllTareas();
    const nuevasTareas = tareas!.filter((t) => t.id !== idTarea);
    await axios.put(API_URL, { tareas: nuevasTareas });
    return null;
  } catch (error) {
    console.error("Error al eliminar la tarea del backlog", error);
    throw error;
  }
};