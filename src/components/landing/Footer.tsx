const Footer = () => {
    return (
        <div className="bg-white border-t py-10 !text-gray-500 text-center text-xs text-opacity-40">
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
    )
}

export default Footer