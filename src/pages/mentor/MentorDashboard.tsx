import { Progress } from "@heroui/react"
import { DashboardChart, DashboardOverview } from "../../components/dashboard"
import { useSelector } from "react-redux"
import { getProfileProgress } from "../../redux/features/authSlice"
import { Link } from "react-router-dom"

const MentorDashboard = () => {

  const progress = useSelector(getProfileProgress)

  return (
    <div className='space-y-5'>

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