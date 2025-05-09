import { ReactElement } from "react";
import AuthBg from "./AuthBg";


const RegLayout = ({ children }: { children: ReactElement }) => {
    return (
        <div className="flex">

            <div className="hidden lg:flex lg:w-[35%] 2xl:w-1/3">
                <AuthBg />
            </div>

            <div className="flex-1 flex justify-center px-4 lg:px-8 xl:px-12">

                <div className="w-full max-w-lg xl:max-w-xl px-2 mx-auto lg:mx-12 shrink-0">

                    {children}

                </div>

            </div>

        </div>
    );
};

export default RegLayout;
