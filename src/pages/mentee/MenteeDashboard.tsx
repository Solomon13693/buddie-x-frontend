import { MenteeChart, MenteeOverview } from "../../components/dashboard/mentee"

const MenteeDashboard = () => {

    return (
        <div className='space-y-5'>

            <MenteeOverview />

            <MenteeChart />

        </div>
    )
}

export default MenteeDashboard