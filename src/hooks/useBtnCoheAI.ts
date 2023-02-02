import { useState } from "react";

interface iInputBtn {
  classBtn: string;
  iconBtn: string;
  altBtn: string;
  textBtn: string;
}

export const useBtnCohereAI = () => {
  const [confBtn, setConfBtn] = useState<iInputBtn>({
    classBtn: "",
    iconBtn: "",
    altBtn: "",
    textBtn: "",
  });
  return { confBtn, setConfBtn };
};
