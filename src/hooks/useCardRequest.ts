import { useState } from "react";
import { COHERE_TYPE_GENERATE } from "@/common/constants/cohereai";
import { iResultClassify } from "@/common/interfaces/cohereia";

interface iInputCard {
  inputValid: boolean;
  typeAI: string;
  responseGenerateAI: string;
  responseClassifyAI: iResultClassify[];
}

export const useCardRequest = () => {
  const [cardRequest, setCardRequest] = useState<iInputCard>({
    inputValid: false,
    typeAI: COHERE_TYPE_GENERATE,
    responseGenerateAI: "",
    responseClassifyAI: [],
  });

  const validInput = (isValid: boolean) => {
    if (isValid == false) {
      const updatedValue = { inputValid: isValid, responseGenerateAI: "", responseClassifyAI: []};
      setCardRequest({ ...cardRequest, ...updatedValue });
    } else {
      setCardRequest({ ...cardRequest, inputValid: isValid });
    }
  };

  const setTypeAI = (typeAI: string) => {
    setCardRequest({ ...cardRequest, typeAI });
  };

  const setResponseGenerateAI = (responseAI: string) => {
    setCardRequest({ ...cardRequest, responseGenerateAI: responseAI });
  };

  const setResponseClassifyAI = (responseAI: iResultClassify[]) => {
    setCardRequest({ ...cardRequest, responseClassifyAI: responseAI });
  };

  return { cardRequest, validInput, setTypeAI, setResponseGenerateAI , setResponseClassifyAI};
};
