import { FC } from "react";
import CardTareaSprint from "../CardTareaSprint/CardTareaSprint";


interface IProps {
  title: string;
}

const ContainerTareaSprint: FC<IProps> = ({ title }) => {
  return (
    <div className="bg-[#D9D9D9] flex-1 rounded-[7px] flex flex-col items-center">
      <div className="!pt-3 mx-auto w-[90%] border-b-2 border-[#001233] text-xl font-bold text-center">
        <h1 className="">{title}</h1>
      </div>

      <div className="w-[100%] flex justify-center !mt-[10px]">
        <CardTareaSprint />
      </div>
    </div>
  );
};

export default ContainerTareaSprint;
