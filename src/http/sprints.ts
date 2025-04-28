import axios from "axios";
import { ISprint, ISprintList } from "../types/ISprint";
const API_URL = import.meta.env.VITE_API_URL_SPRINT;

export const getAllSprints = async () => {
  try {
    const response = await axios.get<ISprintList>(API_URL);
    return response.data.sprints || [];
  } catch (error) {
    console.log(error);
  }
};

export const postNuevaSprint = async (nuevaSprint: ISprint) => {
  try {
    const sprints = await getAllSprints();
    const newSprints = [...sprints!, nuevaSprint];
    await axios.put(API_URL, { sprints: newSprints });
    return nuevaSprint;
  } catch (error) {
    console.log(error);
  }
};

export const editarSprint = async (sprintActualizada: ISprint) => {
  try {
    const sprints = await getAllSprints();
    const newSprints = sprints!.map((s) =>
      s.id === sprintActualizada.id ? sprintActualizada : s
    );
    await axios.put(API_URL, { sprints: newSprints });
    return sprintActualizada;
  } catch (error) {
    console.log(error);
  }
};

export const eliminarSprintPorID = async (idSprint: string) => {
  try {
    const sprints = await getAllSprints();
    const newSprints = sprints!.filter((s) => s.id !== idSprint);
    await axios.put(API_URL, { sprints: newSprints });
    return null;
  } catch (error) {
    console.log(error);
  }
};

export const putTareaSprint = async (sprintActualizado: ISprint) => {
  try {
    const response = await axios.put(
      `${API_URL}/${sprintActualizado.id}`,
      sprintActualizado
    );
    
    return response.data;
  } catch (error) {
    console.error("Error al actualizar el sprint:", error);
    throw error;
  }
};
export const putSprintList = async (sprintListActualizado: ISprintList): Promise<void> => {
  try {
    await axios.put(`${API_URL}`, sprintListActualizado);
  } catch (error) {
    console.error("Error al actualizar la lista de sprints:", error);
    throw error;
  }
};