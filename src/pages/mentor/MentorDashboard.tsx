import { Progress } from "@heroui/react"
import { Switch } from "@mantine/core"
import { Button } from "../../components/ui"
import { DashboardChart, DashboardOverview } from "../../components/dashboard"
import { useSelector, useDispatch } from "react-redux"
import { getProfileProgress, getUserProfile, fetchProfile } from "../../redux/features/authSlice"
import { Link, useSearchParams } from "react-router-dom"
import { toggleOutOfOffice, useGetPayoutStatus, useCreateOnboardingLink } from "../../services"
import { getErrorMessage } from "../../utils"
import toast from "react-hot-toast"
import { useState, useEffect } from "react"
import type { AppDispatch } from "../../redux/store"

const MentorDashboard = () => {

  const progress = useSelector(getProfileProgress)
  const profile = useSelector(getUserProfile)
  const dispatch = useDispatch<AppDispatch>()
  const [searchParams, setSearchParams] = useSearchParams()
  const [outOfOfficeLoading, setOutOfOfficeLoading] = useState<boolean>(false)

  const { data: payoutData, refetch: refetchPayout } = useGetPayoutStatus()
  const payoutStatus = payoutData?.data
  const { mutateAsync: createOnboardingLink, isPending: onboardingLinkLoading } = useCreateOnboardingLink()
  
  const isApproved = profile?.mentor?.approval_status === 'approved'
  const isOutOfOffice = profile?.mentor?.out_of_office || false

  useEffect(() => {
    const payout = searchParams.get("payout")
    if (payout === "return") {
      refetchPayout().then(({ data }) => {
        const status = data?.data?.status_message
        if (status === "enabled") {
          toast.success("Payouts are now enabled. You can withdraw funds from your wallet.")
        } else if (status === "pending") {
          toast.success("Verification pending. We'll notify you once your account is ready for payouts.")
        } else {
          toast("Complete the steps in Stripe to enable payouts.", { icon: "ℹ️" })
        }
      })
      setSearchParams((p) => { p.delete("payout"); return p }, { replace: true })
    }
  }, [searchParams.get("payout")])

  const handleConnectPayout = async () => {
    try {
      const base = window.location.origin
      const returnUrl = `${base}/mentor/dashboard?payout=return`
      const refreshUrl = `${base}/mentor/dashboard?payout=refresh`
      const { data } = await createOnboardingLink({ return_url: returnUrl, refresh_url: refreshUrl })
      if (data?.url) window.location.href = data.url
    } catch (error) {
      toast.error(getErrorMessage(error))
    }
  }

  const handleToggleOutOfOffice = async (checked: boolean) => {
    setOutOfOfficeLoading(true)
    try {
      const response = await toggleOutOfOffice(checked)
      toast.success(response?.message || (checked ? 'Out of office mode enabled' : 'Out of office mode disabled'))
      dispatch(fetchProfile())
    } catch (error) {
      toast.error(getErrorMessage(error))
    } finally {
      setOutOfOfficeLoading(false)
    }
  }

  return (
    <div className='space-y-5'>

      {isApproved && !payoutStatus?.payouts_enabled && (
        <div className="bg-white border p-4 rounded-xl">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-1">Set up payouts to get paid</h3>
              <p className="text-xs text-gray-600">
                {payoutStatus?.has_setup
                  ? payoutStatus?.status_message === "pending"
                    ? "Verification pending. We'll notify you when payouts are enabled."
                    : "Complete your Stripe account to receive payments from completed sessions."
                  : "Connect your bank account so we can pay you after sessions are completed."}
              </p>
            </div>
            <Button
              onPress={handleConnectPayout}
              isLoading={onboardingLinkLoading}
              className="bg-black text-white shrink-0"
              size="sm"
            >
              {payoutStatus?.has_setup ? "Complete setup" : "Connect payout account"}
            </Button>
          </div>
        </div>
      )}

      {isApproved && payoutStatus?.payouts_enabled && (
        <div className="bg-white border p-4 rounded-xl">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-1">Payouts enabled</h3>
              <p className="text-xs text-gray-600">
                You can withdraw funds from your <Link to="/mentor/dashboard/wallet" className="text-primary underline">Wallet</Link>.
              </p>
            </div>
          </div>
        </div>
      )}

      {isApproved && (
        <div className="bg-white border p-4 rounded-xl">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-1">Out of Office</h3>
              <p className="text-xs text-gray-600">
                When enabled, all days will be marked as unavailable
              </p>
            </div>
            <Switch
              checked={isOutOfOffice}
              onChange={(event) => handleToggleOutOfOffice(event.currentTarget.checked)}
              size="md"
              color="red"
              disabled={outOfOfficeLoading}
            />
          </div>
        </div>
      )}

      {progress != 100 && (
        <div className="bg-white border p-5 rounded-xl space-y-3">

          <h2 className="font-semibold text-base md:text-lg">Boost Your Profile</h2>

          <p className="text-xs text-gray-600">
            Increase your visibility by completing your profile.{" "}
            <Link to="settings" className="text-primary underline">
              Complete your profile
            </Link>.
          </p>

          <Progress color="primary" size="sm" value={progress} />

        </div>
      )}

      <DashboardOverview />

      <DashboardChart />

    </div>
  )
}

export default MentorDashboard