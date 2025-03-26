import { IconEditar } from "../Icons/IconEditar";
import { IconEliminar } from "../Icons/IconEliminar";
import { IconVer } from "../Icons/IconVer";

export const CardSprint = () => {
  return (
    <div className="bg-[#CAC0B3]/60 w-[17vw] !p-[0.5vw] flex flex-col gap-[1.3vh] !mt-[4vh] rounded-[0.5rem]">
      <div className="flex flex-col gap-[0.2vh]">
        <h3 className="text-[1.5vw]">NombreSprint</h3>
        <p>
          <b>Inicio:</b> 2025-04-05
        </p>
        <p>
          <b>Cierre:</b> 2025-04-05
        </p>
      </div>
      <div className="flex gap-[3vw] items-center justify-around ">
        <IconVer size={"1.6vw"} />
        <IconEditar size={"1.6vw"} />
        <IconEliminar size={"1.6vw"} />
      </div>
    </div>
  );
};
