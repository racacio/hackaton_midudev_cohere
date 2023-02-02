import { Card, CardBody, CardFooter, Button, Textarea, Typography, Select, Option, Input } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { checkIsEnglish, correctTranscription, emailCopy, headlineMarketAnalysis } from "@/services/cohereai";
import { COHERE_TYPE_GENERATE, COHERE_TYPE_CLASSIFY, COHERE_LABEL_ECONOMY, COHERE_LABEL_HEALTH, COHERE_LABEL_TECHNOLOGY } from '@/common/constants/cohereai';
import { useBtnCohereAI } from "@/hooks/useBtnCoheAI";

interface iCardReqProps {
    isValidInput: boolean;
    validInput: (params: any) => any;
    setTypeAI: (params: any) => any;
    setResponseGenerateAI: (params: any) => any;
    setResponseClassifyAI: (params: any) => any;
}
interface iOptionSelect {
    key: string,
    title: string,
    label: string,
    labelError: string,
    placeholder: string;
    type: string,
    example: any,
}
const lOptionsSelect: iOptionSelect[] = [
    {
        key: "0", title: 'Correct Transcription',
        label: 'This is text transcription corrector. Given a transcribed excerpt with errors, the model responds with the correct version of the excerpt.',
        labelError: "You are not using English or the text is too short!",
        placeholder: 'Put text transcription to corrector', type: COHERE_TYPE_GENERATE,
        example: (<>
            <Typography variant="paragraph" color="blue-gray">
                Example:
            </Typography>
            <Typography variant="paragraph" color="blue-gray">
                I am balling into hay to read port missing credit card. I lost by card when I what's at the grocery store and I need to see sent a new one.
            </Typography>
        </>),
    },
    {
        key: '1', title: 'Email Copy',
        label: 'This email writing program can generate full emails from simple commands.',
        labelError: "You are not using English or the text is too short!",
        placeholder: 'Put simple commands to generate full emails', type: COHERE_TYPE_GENERATE,
        example: (<>
            <Typography variant="paragraph" color="blue-gray">
                Example:
            </Typography>
            <Typography variant="paragraph" color="blue-gray">
                Tell Kiyan that they made it to the next round.
            </Typography>
        </>
        ),
    },
    {
        key: '2', title: 'Headline Market Analysis',
        label: `Input one or more text for Cohere to classify based on your training examples labels (${COHERE_LABEL_ECONOMY},${COHERE_LABEL_HEALTH},${COHERE_LABEL_TECHNOLOGY}).`,
        labelError: "You are not add text to list classify!",
        placeholder: 'Text to classify', type: COHERE_TYPE_CLASSIFY,
        example: (<>
            <Typography variant="paragraph" color="blue-gray">
                Example:
            </Typography>
            <Typography variant="paragraph" color="blue-gray">
                As Gas Prices Went Up, So Did the Hunt for Electric Vehicles.
            </Typography>
        </>
        ),
    }
];

interface iItemInputs {
    key: number,
    input: string,
}

let isClearBtn: boolean = false;
let nextKey: number = 0;

export const CardRequestAI = ({ isValidInput, validInput, setTypeAI, setResponseGenerateAI, setResponseClassifyAI }: iCardReqProps) => {
    const [optionSelect, setOptionSelect] = useState(lOptionsSelect[0]);
    const [loadData, setLoadData] = useState<boolean>(false);
    const [inputText, setInputText] = useState<string>('');
    const [listText, setListText] = useState<iItemInputs[]>([]);
    const { confBtn, setConfBtn } = useBtnCohereAI();

    useEffect(() => {
        if (optionSelect == null) return;
        setTypeAI(optionSelect.type);
    }, [optionSelect])

    useEffect(() => {
        if (optionSelect.type !== COHERE_TYPE_CLASSIFY) return;
        if (!listText.length) {
            nextKey = 0;
            if (!isClearBtn) {
                validInput(false);
            } else {
                isClearBtn = false;
            }
        } else {
            if (!isValidInput) {
                validInput(true);
            }
        }
    }, [listText])

    useEffect(() => {
        let classBtn = "mt-8";
        let iconBtn = loadData ? "fa-solid fa-spinner" : "fa-solid fa-play";
        let altBtn = loadData ? "Loading icon" : "Run icon";
        let textBtn = loadData ? "Loading..." : "Run";
        setConfBtn({ ...confBtn, classBtn, iconBtn, altBtn, textBtn });
    }, [loadData]);

    const handSelectChange = async (e: any) => {
        const option: iOptionSelect = lOptionsSelect[e];
        setOptionSelect(option);
        handleClear();
    };

    const handleTextChange = async (e: any) => {
        const { value } = e.target;
        setInputText(value);
        const isValid = value.length > 0;
        if (!isValid) {
            validInput(false);
            return;
        }
        const isEnglish = await checkIsEnglish(value);
        validInput(isEnglish);
    };

    const handleAddList = async () => {
        const elemInputText = (document.getElementById('inputText') as HTMLInputElement);
        const inputText = elemInputText.value;
        setListText([...listText, { key: nextKey++, input: inputText }]);
        elemInputText.value = '';
    }

    const handleDelList = async (index: number) => {
        setListText(listText.filter(a => a.key !== index));
    }

    const handleClick = async () => {
        let promise = null;
        setLoadData(true);
        if (optionSelect.key == '0') {
            promise = correctTranscription(inputText);
        } else if (optionSelect.key == '1') {
            promise = emailCopy(inputText);
        } else if (optionSelect.key == '2') {
            promise = headlineMarketAnalysis(listText.map(e => e.input));
        }
        const value = await promise;
        if (optionSelect.key == '2') {
            setResponseClassifyAI(value);
        }
        else {
            setResponseGenerateAI(value);
        }
        setLoadData(false);
    };

    const handleClear = async () => {
        isClearBtn = true;
        setInputText('');
        setListText([]);
        validInput(false);
    };

    return (
        <Card className="rounded-2xl shadow-lg shadow-gray-500/10">
            <CardBody className="px-8 text-center">
                <Typography variant="h5" className="mb-2" color="blue-gray">
                    COHERE Examples
                </Typography>
                <Select variant="standard" label="Select Presets" value={optionSelect.key} onChange={handSelectChange}>
                    {lOptionsSelect.map(({ key, title, type }: iOptionSelect) => <Option key={key} value={key}>{type} - {title}</Option>)}
                </Select>
                <Typography variant="h6" className="mt-4 underline" color="blue-gray">
                    {optionSelect.title}
                </Typography>
                <div className="border-dotted border-4 border-sky-500 rounded-lg mt-2 px-2 py-2 text-justify">
                    <Typography variant="paragraph" color="blue-gray">
                        {optionSelect.label}
                    </Typography>
                    {optionSelect.example}
                </div>
                {optionSelect.type == COHERE_TYPE_GENERATE && (<Textarea
                    variant="standard" size="lg" rows={8} placeholder={optionSelect.placeholder} onChange={handleTextChange} value={inputText}
                />)}
                {optionSelect.type == COHERE_TYPE_CLASSIFY && (<>
                    <Input
                        id="inputText" variant="standard" size="lg" placeholder={optionSelect.placeholder} icon={<i className="fa-solid fa-check-to-slot" onClick={handleAddList} ></i>}
                    />
                    <div className="flex flex-col rounded-md border-gray-90">
                        {listText.map((item) => (
                            <Input key={item.key} id={item.key.toString()} disabled
                                variant="standard" size="lg" defaultValue={`- ${item.input}`} icon={<i className="fa-solid fa-eraser" onClick={() => handleDelList(item.key)} ></i>}
                            />
                        ))}
                    </div>
                </>)}
                {!isValidInput && (
                    <div className="flex justify-center gap-4 mt-2 mb-2">
                        <strong className="text-red-800">
                            {optionSelect.labelError}
                        </strong>
                    </div>
                )}
                <CardFooter divider className="flex justify-center gap-4 py-1">
                    <Button variant={loadData ? "outlined" : "gradient"} size="lg" className={confBtn.classBtn} disabled={!isValidInput || loadData} onClick={handleClick}>
                        {confBtn.textBtn} <i className={confBtn.iconBtn} />
                    </Button>
                    <Button variant="gradient" size="lg" className="mt-8" disabled={!isValidInput || loadData} color="red" onClick={handleClear}>
                        Clear
                    </Button>
                </CardFooter>
            </CardBody>
        </Card>
    );
}