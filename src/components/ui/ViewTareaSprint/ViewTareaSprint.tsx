import { useEffect, useState } from "react";
import ContainerTareaSprint from "../ContainerTareaSprint/ContainerTareaSprint";
import { CrearTarea } from "../PopUps/CrearTarea/CrearTarea";
import { sprintStore } from "../../../store/sprintStore";
import { useParams } from "react-router";

export const ViewTareasSprint = () => {
  const [modal, setModal] = useState<boolean>(false);
  const { id } = useParams(); 

  const { sprints, setSprintActiva } = sprintStore();

  useEffect(() => {
    const sprint = sprints.find((s) => s.id === id);
    if (sprint) {
      setSprintActiva(sprint);
    }
  }, [id, sprints]);


  const sprintActiva = sprintStore((state) => state.sprintActiva);

  const handleCloseModal = () => {
    setModal(false);
  };

  return (
    <div className="flex flex-col">
      <div className=" flex h-[8vh] !p-6 justify-between items-center">
        <h3 className="text-[1.7vw]">{sprintActiva?.titulo}</h3>

        <button
          onClick={() => {
            setModal(true);
          }}
          className="bg-[#001233]/90 w-32 h-8 text-[#CAC0B3] text-base rounded-md hover:bg-[#001233] cursor-pointer"
        >
          Añadir Tarea
        </button>
      </div>
      {modal && <CrearTarea closeModal={handleCloseModal} />}
      <div className="flex justify-center h-[87vh] !p-[10px] gap-[1vw]">
        <ContainerTareaSprint title="Pendiente" />
        <ContainerTareaSprint title="Progreso" />
        <ContainerTareaSprint title="Completado" />
      </div>
    </div>
  );
};
