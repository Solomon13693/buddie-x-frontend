import React from "react";
import moment from "moment";
import { Breadcrumbs } from "../../components";
import { WithdrawalHistory, WithdrawalModal } from "../../components/dashboard/mentor";
import { Button } from "../../components/ui";
import { Skeleton } from "@mantine/core";
import { formatCurrency } from "../../lib/formatCurrency";
import { useGetWallet, useGetPayoutStatus } from "../../services";
import { getPayoutLoginLink } from "../../services/mentor/payout";
import { useDisclosure } from "@mantine/hooks";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const breadcrumbItems = [
    { label: "Dashboard", href: "/mentor/dashboard" },
    { label: "Wallet" },
];

const WalletView = () => {

    const { response, isLoading } = useGetWallet()
    const { data: payoutRes } = useGetPayoutStatus()
    const payoutStatus = payoutRes?.data
    const { balance, total_income, total_withdrawal, updated_at } = response || {}

    const [ opened, { open, close } ] = useDisclosure()
    const [ loadingLoginLink, setLoadingLoginLink ] = React.useState(false)

    const handleManagePayoutAccount = async () => {
        setLoadingLoginLink(true)
        try {
            const { data } = await getPayoutLoginLink()
            if (data?.url) window.open(data.url, "_blank", "noopener,noreferrer")
            else toast.error("Could not open payout dashboard.")
        } catch {
            toast.error("Could not open payout dashboard.")
        } finally {
            setLoadingLoginLink(false)
        }
    }

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

                    <div className="flex flex-col gap-2">
                        {payoutStatus?.payouts_enabled && (
                            <p className="text-[10px] text-white/90">
                                Payouts go to your connected account. Withdraw anytime.{" "}
                                <button
                                    type="button"
                                    onClick={handleManagePayoutAccount}
                                    disabled={loadingLoginLink}
                                    className="underline text-white hover:opacity-80 disabled:opacity-50"
                                >
                                    {loadingLoginLink ? "Opening…" : "Manage payout account"}
                                </button>
                            </p>
                        )}
                        {!payoutStatus?.has_setup && (
                            <p className="text-[10px] text-amber-200">
                                <Link to="/mentor/dashboard" className="underline font-medium">Connect payout account</Link> to receive withdrawals to your bank (set up on Dashboard).
                            </p>
                        )}
                        <div className="flex items-center gap-2 justify-between">
                            <Button
                                onPress={open}
                                size="sm"
                                isDisabled={!payoutStatus?.has_setup}
                                className="bg-white text-primary px-6">
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
