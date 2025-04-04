import { FC, useState } from "react";
import { IconEditar } from "../Icons/IconEditar";
import { IconEliminar } from "../Icons/IconEliminar";
import { IconVer } from "../Icons/IconVer";
import ModalVerSprint from "../PopUps/Modals/ModalVerSprint/ModalVerSprint";
import { ISprint } from "../../../types/ISprint";
import { useNavigate } from "react-router";
import { sprintStore } from "../../../store/sprintStore";
import EditCreateModalSprint from "../PopUps/Modals/EditDeleteModalSprint/EditCreateModalSprint";
import { useSprints } from "../../../hooks/useSprints";
type IProps = {
  sprint: ISprint;
  handleOpenModalEdit: (sprint: ISprint) => void;
};

export const CardSprint: FC<IProps> = ({ sprint, handleOpenModalEdit }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const setSprintActiva = sprintStore((state) => state.setSprintActiva);
  const navigate = useNavigate();

  const handleSprintClick = () => {
    setSprintActiva(sprint);
    navigate(`/sprint/${sprint.id}`);
  };

const {eliminarSprintById} = useSprints();
const handleEliminarSprint = ()=>{
  eliminarSprintById(sprint.id!)
}

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const editarSprint = () => {
    handleOpenModalEdit(sprint);
  };
  return (
    <>
      <div className="bg-[#CAC0B3]/60 w-[17vw]  flex flex-col gap-[1.3vh] !mt-[4vh] rounded-[0.5rem] transition-all duration-200 ease-in-out shadow-lg ">
        <div
          className="border-b-[2px] border-white w-[100%] cursor-pointer"
          onClick={handleSprintClick}
        >
          <div className="flex flex-col gap-[0.2vh] !p-[0.5vw]">
            <h3 className="text-[1.5vw]">{sprint.titulo}</h3>
            <p>
              <b>Inicio:</b> {sprint.fechaInicio}
            </p>
            <p>
              <b>Cierre:</b> {sprint.fechaCierre}
            </p>
          </div>
        </div>

        <div className="flex gap-[3vw] items-center text-center justify-around !pb-[0.3vw] ">
          <div onClick={() => setIsModalOpen(true)}>
            <IconVer size={"1.6vw"} />
          </div>
          <div onClick={()=> editarSprint()}>
            <IconEditar size={"1.6vw"} />
          </div>
          <div onClick={()=> handleEliminarSprint()}>
          <IconEliminar size={"1.6vw"} />
          </div>
        </div>
        {isModalOpen && <ModalVerSprint closeModal={handleCloseModal} sprint={sprint}/>}
      </div>
    </>
  );
};
