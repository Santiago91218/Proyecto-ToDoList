import { create } from "zustand";
import { ISprint } from "../types/ISprint";

//Esto hay que sacarlo
const objet =  [{
    "id": "1",
    "fechaInicio": "2025-03-04",
    "fechaCierre": "2025-03-11",
    "nombre": "Sprint 122",
    "tareas": [
      {
        "id": "2",
        "titulo": "Tarea 2",
        "descripcion": "Descripcion de la segunda tarea",
        "estado": "Pendiente",
        "fechaLimite": "2025-03-06"
      }
    ]
  },{
    "id": "2",
    "fechaInicio": "2025-03-04",
    "fechaCierre": "2025-03-11",
    "nombre": "Sprint das",
    "tareas": [
      {
        "id": "3",
        "titulo": "Tarea 2",
        "descripcion": "Descripcion de la segunda tarea",
        "estado": "Pendiente",
        "fechaLimite": "2025-03-06"
      }
    ]
  }]

interface ISprintStore {
  sprints: ISprint[];
  sprintActiva: ISprint | null;
  setSprintActiva: (sprintActiva: ISprint | null) => void;
  setSprints: (sprints: ISprint[]) => void;
}

export const sprintStore = create<ISprintStore>((set) => ({
  sprints: objet,
  sprintActiva: null,
  setSprints: (sprintsIn) => set(() => ({ sprints: sprintsIn })),
  setSprintActiva: (sprintActivaIn) =>
    set(() => ({ sprintActiva: sprintActivaIn })),
}));
