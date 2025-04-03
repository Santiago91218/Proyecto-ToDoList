import { useShallow } from "zustand/shallow";
import { sprintStore } from "../store/sprintStore";
import { getAllSprints } from "../http/sprints";

export const useSprints = () => {
  const { sprints, setSprints } = sprintStore(
    useShallow((state) => ({
      sprints: state.sprints,
      setSprints: state.setSprints,
    }))
  );

  const getSprints = async () => {
    const data = await getAllSprints();
    if (data) setSprints(data);
  };

 

  return {sprints,getSprints}
};
