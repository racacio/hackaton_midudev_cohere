import { Progress, Typography } from "@material-tailwind/react"

interface iInputProps {
    classNameDiv: string;
    variantTypography: string;
    labelTypography: string;
    labelProgress: string;
    valueProgress: number;
}

export const ItemClassifyAI = ({ classNameDiv, variantTypography, labelTypography, labelProgress, valueProgress }: iInputProps) => {
    return (
        <div className={classNameDiv ? classNameDiv : ""}>
            <Typography variant={variantTypography}>{labelTypography}</Typography>
            <Progress value={Math.round(valueProgress * 100)} label={ labelProgress ? labelProgress : " "} />
        </div>
    )
}