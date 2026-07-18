
import Logo from "@/assets/LogoLarge"
import ShinyText from "@/assets/ui/ShinyText"
import { Button } from "../../@/components/ui/button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

type navButtonType = {
    name: string
    onClick?: ()=>void;
}



const navButtonContext: navButtonType[] = [
    {name: "home",},
    {name: "opportunities",},
    {name: "profile",},

]



const NavBar = () => {

    const[inView, setInView] = useState<number>(0);

    const navigate = useNavigate();

    return (
        <div className="relative top-0 w-full h-full text-white p-[0.5%] flex items-center justify-center bg-black border-b-gray-800">
            <div className="flex gap-2 h-full border-white w-[90%] items-center ">
                <div className="h-full gap-2 items-center w-1/5 flex ">
                
                <button className="flex items-center cursor-pointer">
                <Logo/>

                <ShinyText
                    text="Refyne"
                    speed={1.5}
                    delay={0}
                    color="#777777"
                    shineColor="#ffffff"
                    spread={50}
                    direction="left"
                    yoyo={false}
                    pauseOnHover
                    disabled={false}
                    className="font-dynapuff text-2xl"
                />
                </button>


                </div>
                <div className="h-full gap-2 w-3/5 flex items-center justify-center  ">

                    {navButtonContext.map((itm, idx) => (
                        <div key={idx} className="flex group relative items-center justify-center h-full w-[20%] flex-col gap-2">
                            <button  className={`absolute hover:translate-y-1 transition-all ease-in-out h-full cursor-pointer font-poppins text-md  ${inView==idx?"translate-y-1":"translate-y-0"}`} onClick={()=>setInView(idx)}>{itm.name}</button>
                                <span
                                    className={`absolute bottom-0 left-0 h-0.5 w-full bg-white origin-center transition-transform duration-300 ${
                                        inView === idx
                                        ? "scale-x-100"
                                        : "scale-x-0"
                                    }`}
                                />
                        </div>
                        
                    ))}
                </div>
                <div className="h-full w-1/5 gap-2 flex items-center justify-center ">
                
                    <Button variant={"outline"} className={"rounded-2xl cursor-pointer font-poppins bg-gray-600/50 border-gray-500/50"}>about us</Button>
                    <Button variant={"outline"} onClick={()=>navigate("/new-job")}  className={"rounded-2xl cursor-pointer font-poppins bg-gray-600/50 border-gray-500/50"}>+ Post your job</Button>
                    
                
                </div>

            </div>
        </div>
    )
}

export default NavBar