import { useEffect, useState } from "react";
import { CardSprint } from "../CardSprint/CardSprint";
import { useSprints } from "../../../hooks/useSprints";
import EditCreateModalSprint from "../PopUps/Modals/EditDeleteModalSprint/EditCreateModalSprint";
import { ISprint } from "../../../types/ISprint";
import { sprintStore } from "../../../store/sprintStore";

export const ListSprints = () => {
  
  const { sprints, getSprints } = useSprints();

  useEffect(() => {
    getSprints();
  }, []);

 const setSprintActiva = sprintStore((state) => state.setSprintActiva)
 const [modoModal, setModoModal] = useState<"crear" | "editar">("crear");
  const [openEditCreateModalSprint, setOpenEditCreateModalSprint] = useState(false)
  const handleCloseModal = () => {
    
    setOpenEditCreateModalSprint(false);
    
  };
  const handleOpenModalEdit = (sprint:ISprint)=>{
    setSprintActiva(sprint)
    setModoModal("editar");
    setOpenEditCreateModalSprint(true)
  }
  

  return (
    <div className=" !p-[8px] bg-white w-[100%] h-full flex flex-col items-center rounded-[0.4rem]">
      <div className="flex justify-between items-center w-full">
        <h3 className="text-[1.22vw] font-semibold">Lista de Sprints</h3>
        <button
          onClick={() => {
            setModoModal("crear");
            setOpenEditCreateModalSprint(true);
          }}
          className="cursor-pointer hover:text-[#C2C2C2] flex"
        >
          <span className="material-symbols-outlined !text-[1.5vw]">
            add_circle
          </span>
        </button>
      </div>

      {openEditCreateModalSprint && <EditCreateModalSprint closeModal={handleCloseModal} modo={modoModal}/>}
      <span className="inline-block w-full h-[2px] bg-[#001233] !mt-[5px]"></span>
      <div>
        {sprints && sprints.length > 0 ? (
          sprints.map((sprint) => (
            <CardSprint key={sprint.id} sprint={sprint}  handleOpenModalEdit={handleOpenModalEdit} />
          ))
        ) : (
          <p className="!mt-[15px]">No hay sprints disponibles.</p>
        )}
      </div>
    </div>
  );
};
