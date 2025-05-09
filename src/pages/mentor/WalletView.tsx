import moment from "moment";
import { Breadcrumbs } from "../../components";
import { WithdrawalHistory, WithdrawalModal } from "../../components/dashboard/mentor";
import { Button } from "../../components/ui";
import { Skeleton } from "@mantine/core";
import { formatCurrency } from "../../lib/formatCurrency";
import { useGetWallet } from "../../services";
import { useDisclosure } from "@mantine/hooks";

const breadcrumbItems = [
    { label: "Dashboard", href: "/mentor/dashboard" },
    { label: "Wallet" },
];

const WalletView = () => {

    const { response, isLoading } = useGetWallet()
    const { balance, total_income, total_withdrawal, updated_at } = response || {}

    const [ opened, { open, close } ] = useDisclosure()

    return (
        <>

            <Breadcrumbs items={breadcrumbItems} />

            <div className="grid w-full gap-3 grid-cols-auto md:grid-cols-2 lg:grid-cols-3 mb-8">

                <div className="p-5 2xl:p-5 space-y-4 bg-slate-700 rounded-2xl">

                    <h2 className="text-xs md:text-sm text-white">Wallet Balance</h2>

                    {isLoading ? (
                        <Skeleton height={24} width="25%" radius="sm" />
                    ) : (
                        <h1 className="text-lg md:text-xl font-semibold text-white">
                            {formatCurrency(balance)}
                        </h1>
                    )}

                    <div className="flex items-center gap-2 justify-between">

                        <Button onPress={open} size="sm" className="bg-white text-primary px-6">
                            Withdraw
                        </Button>

                        <p className="text-[10px] text-white">
                            <span className="font-medium text-xs">Last Updated</span> <br />
                            {isLoading ? (
                                <Skeleton height={16} width="40%" radius="sm" />
                            ) : (
                                updated_at ? moment(updated_at).format("MMM D, YYYY h:mm A") : "-"
                            )}
                        </p>

                    </div>

                </div>

                <div className="p-5 2xl:p-5 space-y-4 bg-white text-black rounded-2xl border border-gray-200">

                    <h2 className="text-xs md:text-sm">Total Income</h2>

                    {isLoading ? (
                        <Skeleton height={24} width="25%" radius="sm" />
                    ) : (
                        <h1 className="text-lg md:text-xl font-semibold">
                            {formatCurrency(total_income)}
                        </h1>
                    )}

                </div>

                <div className="p-5 2xl:p-5 space-y-4 bg-white text-black rounded-2xl border border-gray-200">

                    <h2 className="text-xs md:text-sm">Total Withdrawal</h2>

                    {isLoading ? (
                        <Skeleton height={24} width="25%" radius="sm" />
                    ) : (
                        <h1 className="text-lg md:text-xl font-semibold">
                            {formatCurrency(total_withdrawal)}
                        </h1>
                    )}

                </div>

            </div>

            <WithdrawalHistory />

            <WithdrawalModal open={opened} onClose={close} />

        </>
    )
}

export default WalletView;
