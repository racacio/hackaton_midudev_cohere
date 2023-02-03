import { Accordion, AccordionBody, AccordionHeader, Card, CardBody, Progress, Typography } from "@material-tailwind/react";
import { useState } from "react";
import { COHERE_LABEL_ECONOMY, COHERE_LABEL_HEALTH, COHERE_LABEL_TECHNOLOGY, COHERE_TYPE_CLASSIFY, COHERE_TYPE_GENERATE } from "@/common/constants/cohereai";
import { iResultClassify } from "@/common/interfaces/cohereia";
import { ItemClassifyAI } from "@/components/item-classify-AI";

interface iCardResProps {
    typeAI: string;
    responseGenerateAI: string;
    responseClassifyAI: iResultClassify[];
}

interface iAccordionProps {
    id: number;
    open: number;
}

const Icon = ({ id, open }: iAccordionProps) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`${id === open ? "rotate-180" : ""
                } h-5 w-5 transition-transform`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
        >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
    );
}

export const CardResponseAI = ({ typeAI, responseGenerateAI, responseClassifyAI }: iCardResProps) => {
    const [open, setOpen] = useState(0);

    const handleOpen = (value: number) => {
        setOpen(open === value ? -1 : value);
    };

    return (
        <Card className="rounded-2xl shadow-lg shadow-gray-600/10">
            <CardBody className="py-4 px-4 text-center">
                <Typography variant="h5" className="mb-4" color="blue-gray">
                    COHERE Response
                </Typography>
                <div className={!responseGenerateAI && !responseClassifyAI.length ? "" : "w-full border-dotted border-4 border-sky-500 rounded-lg"}>
                    {typeAI == COHERE_TYPE_GENERATE && responseGenerateAI && (
                        <Typography variant="paragraph" className="mt-2 px-2 py-2 text-justify">
                            {responseGenerateAI}
                        </Typography>)
                    }
                    {typeAI == COHERE_TYPE_CLASSIFY && (
                        responseClassifyAI.map((classify, index) => (
                            <Accordion key={index} className="mb-2 px-2 py-2" open={open === index} icon={<Icon id={index} open={open} />}>
                                <AccordionHeader onClick={() => handleOpen(index)}>
                                    <Typography variant="h6">
                                        {classify.input}
                                    </Typography>
                                </AccordionHeader>
                                <Progress value={Math.round(classify.confidence * 100)} label={`${classify.prediction}`} />
                                <AccordionBody>
                                    <ItemClassifyAI classNameDiv="mb-2" variantTypography="paragraph" labelTypography={COHERE_LABEL_ECONOMY} labelProgress="" valueProgress={classify.labels.Economy.confidence} />
                                    <ItemClassifyAI classNameDiv="mb-2" variantTypography="paragraph" labelTypography={COHERE_LABEL_HEALTH} labelProgress="" valueProgress={classify.labels.Health.confidence} />
                                    <ItemClassifyAI classNameDiv="" variantTypography="paragraph" labelTypography={COHERE_LABEL_TECHNOLOGY} labelProgress="" valueProgress={classify.labels.Technology.confidence} />
                                </AccordionBody>
                            </Accordion>)
                        ))
                    }
                </div>
            </CardBody>
        </Card>
    );
}