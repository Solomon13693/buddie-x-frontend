import { Link, useNavigate } from "react-router-dom";
import Container from "../Container";
import { Button } from "../ui";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { getUserProfile } from "../../redux/features/authSlice";
import AccountDropdown from "./AccountDropdown";
import NavBar from "./NavBar";

const Header = () => {

    const { token } = useSelector((state: RootState) => state.auth)

    const profile = useSelector(getUserProfile)

    const navigate = useNavigate();

    return (

        <div className="bg-white py-4 sm:py-5 border-b sticky auto-scroll top-0 left-0 right-0 z-40">

            <Container>

                <header className="fiexed z-40 flex gap-4 w-full flex-row flex-nowrap items-center justify-between text-sm">

                    <ul className="flex gap-x-6 md:gap-x-16 flex-row flex-nowrap items-center">

                        <Link to='/'>

                            <img
                                src='/images/logo/logo.svg'
                                className='w-20'
                                width={90}
                                height={28}
                                alt='Logo'
                            />

                        </Link>

                    </ul>

                    {/* Right Section */}
                    <div className="inline-flex gap-x-3 items-center">

                        {token ? (

                            <AccountDropdown profile={profile} />

                        ) : (

                            <>

                                <div className="items-center gap-x-3 hidden lg:flex">

                                    <Button onPress={() => navigate('/login')} className="hover:bg-primary hover:text-white" variant="bordered">
                                        Log in
                                    </Button>

                                    <Button onPress={() => navigate('/register')} className="bg-black">Get started today</Button>

                                </div>

                                <div className="lg:hidden block">
                                    <NavBar />
                                </div>

                            </>

                        )}

                    </div>

                </header>

            </Container>

        </div>

    );
};

export default Header;
