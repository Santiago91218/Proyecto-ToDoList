import { useShallow } from "zustand/shallow";
import { sprintStore } from "../store/sprintStore";

export const useSprints = () => {
  const { sprints, setSprints } = sprintStore(
    useShallow((state) => ({
      sprints: state.sprints,
      setSprints: state.setSprints,
    }))
  );

 

  return {sprints}
};
