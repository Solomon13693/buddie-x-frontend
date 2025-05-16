import { Chip } from "@heroui/react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../ui/table"
import { formatCurrency } from "../../../lib/formatCurrency"
import moment from "moment"
import { TransactionType } from "../../../types"
import { getStatusStyles } from "../../../utils"

const MenteeTranTable = ({ transaction }: { transaction: TransactionType[] }) => {
    return (
        <>

            <Table>

                <TableHeader>

                    <TableRow>

                        <TableHead className="px-6">
                            Amount
                        </TableHead>

                        <TableHead className="pl-6">
                            Status
                        </TableHead>

                        <TableHead className="pl-6">
                            Payment Method
                        </TableHead>

                        <TableHead className="pl-6">
                            Transaction Ref ID
                        </TableHead>

                        <TableHead className="pl-6">
                            Date
                        </TableHead>

                        <TableHead className="pl-6">
                            Refund Date
                        </TableHead>

                    </TableRow>

                </TableHeader>

                <TableBody>

                    {transaction?.map((item, index) => (

                        <TableRow key={index} className="text-xs text-black">

                            <TableCell className="px-6">
                                {formatCurrency(item?.amount)}
                            </TableCell>

                            <TableCell className="pl-6">
                                <Chip className={`text-[12px] font-light ${getStatusStyles(item?.status).bgColor} ${getStatusStyles(item?.status).textColor}`}>
                                    {item?.status}
                                </Chip>
                            </TableCell>

                            <TableCell className="pl-6">
                                {item?.payment_method}
                            </TableCell>

                            <TableCell className="pl-6">
                                {item?.transaction_reference}
                            </TableCell>

                            <TableCell className="pl-6">
                                {moment(item?.created_at).format('LLL')}
                            </TableCell>

                            <TableCell className="pl-6">
                                {item?.refund_date ? moment(item?.refund_date).format('YYYY-MM-DD HH:mm:ss') : '-----'}
                            </TableCell>


                        </TableRow>

                    ))}

                </TableBody>

            </Table>

        </>
    )
}

export default MenteeTranTable