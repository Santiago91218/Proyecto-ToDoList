import { create } from "zustand";
import { ISprint } from "../types/ISprint";


interface ISprintStore {
  sprints: ISprint[];
  sprintActiva: ISprint | null;
  setSprintActiva: (sprintActiva: ISprint | null) => void;
  setSprints: (sprints: ISprint[]) => void;
}

export const sprintStore = create<ISprintStore>((set) => ({
  sprints: [],
  sprintActiva: null,
  setSprints: (sprintsIn) => set(() => ({ sprints: sprintsIn })),
  setSprintActiva: (sprintActivaIn) =>
    set(() => ({ sprintActiva: sprintActivaIn })),
}));
