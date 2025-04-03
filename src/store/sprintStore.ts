import { create } from "zustand";
import { ISprint } from "../types/ISprint";

interface ISprintStore {
  sprints: ISprint[];
  sprintActiva: ISprint | null;
  setSprintActiva: (sprintActiva: ISprint | null) => void;
  setSprints: (sprints: ISprint[]) => void;
  agregarNuevaSprint: (nuevaSprint: ISprint) => void;
  editarUnaSprint: (sprintEditada: ISprint) => void;
  eliminarSprint: (idSprint: string) => void;
}

export const sprintStore = create<ISprintStore>((set) => ({
  sprints: [],
  sprintActiva: null,
  setSprints: (sprintsIn) => set(() => ({ sprints: sprintsIn })),
  
  setSprintActiva: (sprintActivaIn) =>
    set(() => ({ sprintActiva: sprintActivaIn })),

  agregarNuevaSprint: (nuevaSprint) =>
    set((state) => ({ sprints: [...state.sprints, nuevaSprint] })),

  editarUnaSprint: (sprintEditada) =>
    set((state) => {
      const arraySprints = state.sprints.map((sprint) =>
        sprint.id === sprintEditada.id
          ? { ...sprint, ...sprintEditada }
          : sprint
      );
      return { sprints: arraySprints };
    }),

  eliminarSprint: (idSprint) =>
    set((state) => {
      const arraySprints = state.sprints.filter(
        (sprint) => sprint.id !== idSprint
      );
      return { sprints: arraySprints };
    }),
}));
