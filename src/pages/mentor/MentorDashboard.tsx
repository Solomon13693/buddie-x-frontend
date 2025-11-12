import { Progress } from "@heroui/react"
import { Switch } from "@mantine/core"
import { DashboardChart, DashboardOverview } from "../../components/dashboard"
import { useSelector, useDispatch } from "react-redux"
import { getProfileProgress, getUserProfile, fetchProfile } from "../../redux/features/authSlice"
import { Link } from "react-router-dom"
import { toggleOutOfOffice } from "../../services"
import { getErrorMessage } from "../../utils"
import toast from "react-hot-toast"
import { useState } from "react"
import type { AppDispatch } from "../../redux/store"

const MentorDashboard = () => {

  const progress = useSelector(getProfileProgress)
  const profile = useSelector(getUserProfile)
  const dispatch = useDispatch<AppDispatch>()
  const [outOfOfficeLoading, setOutOfOfficeLoading] = useState<boolean>(false)
  
  const isApproved = profile?.mentor?.approval_status === 'approved'
  const isOutOfOffice = profile?.mentor?.out_of_office || false

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