import axios from "axios";
import { ISprint } from "../types/ISprint";
const API_URL = import.meta.env.VITE_API_URL_SPRINT;

export const getAllSprints = async () => {
  try {
    const response = await axios.get<ISprint[]>(API_URL);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const postNuevaSprint = async (nuevaSprint: ISprint) => {
  try {
    const response = await axios.post<ISprint>(API_URL, { ...nuevaSprint });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const editarSprint = async (sprintActualizada: ISprint) => {
  try {
    const response = await axios.put<ISprint>(
      `${API_URL}/${sprintActualizada.id}`,
      sprintActualizada
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const eliminarSprintPorID = async (idSprint: string) => {
  try {
    await axios.delete(`${API_URL}/${idSprint}`);
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
