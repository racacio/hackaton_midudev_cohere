import { Typography, IconButton } from "@material-tailwind/react";

const year: number = new Date().getFullYear();

interface iSocial {
    color: string,
    name: string,
    path: string,
}

interface iFooter {
    title: string,
    description: string,
    socials: iSocial[],
    copyright: any,
};

const footerItem: iFooter = {
    title: "Material Tailwind",
    description:
        "Easy to use React components for Tailwind CSS and Material Design.",
    socials: [
        {
            color: "purple",
            name: "instagram",
            path: "https://www.instagram.com/reyacacio/",
        },
        {
            color: "blue",
            name: "linkedin",
            path: "https://www.linkedin.com/in/reinaldo-jose-acacio-sedano-650027163",
        },
        {
            color: "black",
            name: "github",
            path: "https://github.com/racacio",
        },
    ],
    copyright: (
        <>
            Copyright © {year} Material Tailwind by{" "}
            <a
                href="https://www.creative-tim.com?ref=mtk"
                target="_blank"
                className="text-blue-gray-500 underline transition-colors hover:text-blue-500"
            >
                Creative Tim
            </a>
            .{" "}Modified by Reinaldo Acacio.
        </>
    ),
};

export const Footer = () => {
    const { title, description, socials, copyright } =  footerItem;
    return (
        <footer className="relative px-4 pt-8 pb-6">
            <div className="container mx-auto">
                <div className="flex flex-wrap pt-6 text-center lg:text-left">
                    <div className="w-full px-4 lg:w-6/12">
                        <Typography variant="h4" className="mb-4" color="blue-gray">
                            {title}
                        </Typography>
                        <Typography className="font-normal text-blue-gray-500">
                            {description}
                        </Typography>
                        <div className="mx-auto mt-6 mb-8 flex justify-center gap-2 md:mb-0 lg:justify-start">
                            {socials.map(({ color, name, path }: iSocial) => (
                                <a
                                    key={name}
                                    href={path}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <IconButton color="white" className="rounded-full">
                                        <Typography color={color}>
                                            <i className={`fa-brands fa-${name}`} />
                                        </Typography>
                                    </IconButton>
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
                <hr className="my-6 border-gray-300" />
                <div className="flex flex-wrap items-center justify-center md:justify-between">
                    <div className="mx-auto w-full px-4 text-center">
                        <Typography
                            variant="small"
                            className="font-normal text-blue-gray-500"
                        >
                            {copyright}
                        </Typography>
                    </div>
                </div>
            </div>
        </footer>
    )
}