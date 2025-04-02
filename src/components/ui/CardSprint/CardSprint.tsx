import { FC, useState } from "react";
import { IconEditar } from "../Icons/IconEditar";
import { IconEliminar } from "../Icons/IconEliminar";
import { IconVer } from "../Icons/IconVer";
import ModalSprint from "../PopUps/ModalSprint/ModalSprint";
import { ISprint } from "../../../types/ISprint";
import { useNavigate } from "react-router";
import { sprintStore } from "../../../store/sprintStore";

interface IProps {
  sprint: ISprint;
}

export const CardSprint: FC<IProps> = ({ sprint }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const setSprintActiva = sprintStore((state) => state.setSprintActiva);
  const navigate = useNavigate();

  const handleSprintClick = () => {
    setSprintActiva(sprint);
    navigate(`/sprint/${sprint.id}`);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div
      className="bg-[#CAC0B3]/60 w-[17vw] !p-[0.5vw] flex flex-col gap-[1.3vh] !mt-[4vh] rounded-[0.5rem] cursor-pointer transition-all duration-200 ease-in-out hover:translate-y-[-1px] shadow-lg "
      onClick={handleSprintClick}
    >
      <div className="flex flex-col gap-[0.2vh]">
        <h3 className="text-[1.5vw]">{sprint.nombre}</h3>
        <p>
          <b>Inicio:</b> {sprint.fechaInicio}
        </p>
        <p>
          <b>Cierre:</b> {sprint.fechaCierre}
        </p>
      </div>
      <div className="flex gap-[3vw] items-center justify-around ">
        <div onClick={() => setIsModalOpen(true)}>
          <IconVer size={"1.6vw"} />
        </div>
        <IconEditar size={"1.6vw"} />
        <IconEliminar size={"1.6vw"} />
      </div>
      {isModalOpen && <ModalSprint closeModal={handleCloseModal} />}
    </div>
  );
};
