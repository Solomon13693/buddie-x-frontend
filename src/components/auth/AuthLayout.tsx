import { ReactElement } from "react"
import { Link } from "react-router-dom"

type AuthLayoutProps = {
    children: ReactElement
}

const AuthLayout = ({ children }: AuthLayoutProps) => {

    const supportEmail = import.meta.env.VITE_SUPPORT_EMAIL ?? "support@buddiex.com"
    const supportHref = `mailto:${supportEmail}`

    return (
        <div className="flex min-h-screen flex-col bg-white">
            <header className="shrink-0 border-b border-[#EBEBEB]">

                <div className="mx-auto flex h-16 w-full container items-center justify-between gap-4 px-6 md:h-20 md:px-8">
                    <Link to="/" className="inline-flex shrink-0 items-center">
                        <img
                            src="/logo/BX_1.png"
                            className="h-12 w-auto md:h-12"
                            alt="Buddie X"
                        />
                    </Link>

                    <a
                        href={supportHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs text-[#62646A] transition-colors hover:text-[#1B1D21] md:text-xs"
                    >
                        <span className="whitespace-nowrap">Need help?</span>
                        <SupportIcon className="size-4 shrink-0 text-[#99999C]" aria-hidden />
                        <span className="whitespace-nowrap underline-offset-2 underline">
                            Contact Support
                        </span>
                    </a>
                </div>
            </header>

            <main className="auth-scope flex flex-1 items-center justify-center px-6 py-8 md:px-8">
                <div className="w-full max-w-md">{children}</div>
            </main>
        </div>
    )
}

const SupportIcon = ({ className }: { className?: string }) => (
    <svg
        className={className}
        width="16"
        height="17"
        viewBox="0 0 16 17"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
    >
        <path
            d="M12.4191 4.25476C11.3031 3.09368 9.73423 2.37109 7.99661 2.37109C6.30294 2.37109 4.76961 3.05759 3.65969 4.16751M12.4191 4.25476C13.4786 5.3571 14.1299 6.8547 14.1299 8.50443C14.1299 10.1981 13.4435 11.7314 12.3335 12.8413M12.4191 4.25476L9.78932 6.88451M9.78932 6.88451C9.77318 6.86666 9.75678 6.84906 9.74013 6.8317C9.30041 6.37349 8.68182 6.08827 7.99661 6.08827C7.32941 6.08827 6.72537 6.3587 6.28813 6.79594M9.78932 6.88451C10.1768 7.31305 10.4128 7.88118 10.4128 8.50443C10.4128 9.17163 10.1423 9.77567 9.7051 10.2129M6.3767 10.2971C6.80524 10.6846 7.37337 10.9206 7.99661 10.9206C8.66382 10.9206 9.26786 10.6501 9.7051 10.2129M6.3767 10.2971C5.8877 9.85499 5.58045 9.21559 5.58045 8.50443C5.58045 7.83722 5.85089 7.23318 6.28813 6.79594M6.3767 10.2971L3.74694 12.9269M3.74694 12.9269C4.84929 13.9864 6.34689 14.6378 7.99661 14.6378C9.69029 14.6378 11.2236 13.9513 12.3335 12.8413M3.74694 12.9269C2.58587 11.8109 1.86328 10.242 1.86328 8.50443C1.86328 6.81075 2.54978 5.27742 3.65969 4.16751M3.65969 4.16751L6.28813 6.79594M9.7051 10.2129L12.3335 12.8413"
            stroke="currentColor"
            strokeWidth="1.6"
        />
    </svg>
)

export default AuthLayout
