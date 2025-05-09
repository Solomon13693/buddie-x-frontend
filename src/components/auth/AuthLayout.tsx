import { ReactElement } from "react";

const AuthLayout = ({ children }: { children: ReactElement }) => {

    const supportEmail = import.meta.env.VITE_SUPPORT_EMAIL;

    return (
        <div className="min-h-screen flex flex-col justify-between">

            {/* HEADER */}
            <div className="w-full px-6 h-16 md:h-20 mx-auto flex items-center justify-between border-b border-gray-100">

                <a className="h-6 flex-shrink-0" href="/">
                    <img src='' alt="logo" className="w-full h-full object-contain" />
                </a>

                <div className="flex justify-end items-center text-xs md:text-sm text-gray-700">

                    <span>Need help?</span>

                    <svg
                        width="16"
                        height="17"
                        viewBox="0 0 16 17"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="mx-1">
                        <path
                            d="M12.4191 4.25476C11.3031 3.09368 9.73423 2.37109 7.99661 2.37109C6.30294 2.37109 4.76961 3.05759 3.65969 4.16751M12.4191 4.25476C13.4786 5.3571 14.1299 6.8547 14.1299 8.50443C14.1299 10.1981 13.4435 11.7314 12.3335 12.8413M12.4191 4.25476L9.78932 6.88451M9.78932 6.88451C9.77318 6.86666 9.75678 6.84906 9.74013 6.8317C9.30041 6.37349 8.68182 6.08827 7.99661 6.08827C7.32941 6.08827 6.72537 6.3587 6.28813 6.79594M9.78932 6.88451C10.1768 7.31305 10.4128 7.88118 10.4128 8.50443C10.4128 9.17163 10.1423 9.77567 9.7051 10.2129M6.3767 10.2971C6.80524 10.6846 7.37337 10.9206 7.99661 10.9206C8.66382 10.9206 9.26786 10.6501 9.7051 10.2129M6.3767 10.2971C5.8877 9.85499 5.58045 9.21559 5.58045 8.50443C5.58045 7.83722 5.85089 7.23318 6.28813 6.79594M6.3767 10.2971L3.74694 12.9269M3.74694 12.9269C4.84929 13.9864 6.34689 14.6378 7.99661 14.6378C9.69029 14.6378 11.2236 13.9513 12.3335 12.8413M3.74694 12.9269C2.58587 11.8109 1.86328 10.242 1.86328 8.50443C1.86328 6.81075 2.54978 5.27742 3.65969 4.16751M3.65969 4.16751L6.28813 6.79594M9.7051 10.2129L12.3335 12.8413"
                            stroke="#99999C"
                            strokeWidth="1.6"
                        />
                    </svg>

                    <a target="_blank" className="relative top-px border-b-2 border-transparent hover:border-black"
                        href={`mailto:${supportEmail}`} >
                        Contact Support
                    </a>

                </div>
            </div>

            {/* MAIN */}
            <div className="w-full px-6 py-20 flex justify-center">

                <div className="w-full max-w-md">

                    {children}

                </div>

            </div>

            {/* FOOTER */}
            <div className="py-10 !text-gray-500 text-center text-xs text-opacity-40">
                <div className="flex justify-center space-x-4">

                    <a className="auth-footer-links"
                        href="#"
                        target="_blank"
                        rel="noopener noreferrer">
                        Privacy Policy
                    </a>

                    <span className="flex">•</span>

                    <a className="auth-footer-links"
                        href="#"
                        target="_blank"
                        rel="noopener noreferrer">
                        Terms of Service
                    </a>

                </div>

                <div className="mt-4">© {new Date().getFullYear()} Buddie X.</div>

            </div>

        </div>
    )
}

export default AuthLayout