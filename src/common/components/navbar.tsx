import { Navbar as MTNavbar, Typography } from "@material-tailwind/react";
import { Link } from "react-router-dom";

interface iNavbar {
    brandName: string,
}

const navbarItem: iNavbar = {
    brandName: "Hackathon Midudev - Cohere - Inteligencia Artificial"
}

export const Navbar = () => {
    const { brandName } = navbarItem;
    return (
        <MTNavbar color="transparent" className="p-3">
            <div className="container mx-auto flex items-center justify-between text-white">
                <Link to="/">
                    <Typography className="mr-4 ml-2 cursor-pointer py-1.5 font-bold">
                        {brandName}
                    </Typography>
                </Link>
            </div>
        </MTNavbar>
    )
}