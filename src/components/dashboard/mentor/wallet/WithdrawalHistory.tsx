import { useGetMentorWithdrawal } from "../../../../services";
import { useQueryParams } from "../../../../utils";
import FilterController from "../../../FilterController";
import Pagination from "../../../Pagination";
import { TableSkeleton } from "../../../skeleton";
import WithdrawalTable from "./WithdrawalTable";

const filters = [
    {
        label: "Filter By",
        param: "status",
        items: [
            { key: "pending", text: "Pending" },
            { key: "approved", text: "Approved" },
            { key: "rejected", text: "Rejected" },
        ],
    }
];

const WithdrawalHistory = () => {

    const { searchParams } = useQueryParams();

    const page = Number(searchParams.get("page")) || 1;
    const perPage = Number(searchParams.get("perPage")) || 20;
    const status = searchParams.get("status");

    const params = {
        page,
        perPage,
        status
    }

    const { response, isLoading } = useGetMentorWithdrawal(params)
    const { data, total } = response || {}

    return (
        <>

            <FilterController filters={filters} />

            <div className="p-3 bg-white rounded-2xl mt-5">

                {isLoading ? (

                    <TableSkeleton />

                ) : (

                    <WithdrawalTable transactions={data} />

                )}

            </div>

            <Pagination className="mt-10" perPage={perPage} total={total || 0} />

        </>
    )
}

export default WithdrawalHistory