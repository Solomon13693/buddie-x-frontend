import moment from "moment";
import { TableHeader, TableHead, Table, TableBody, TableRow, TableCell } from "../../../ui/table";
import { Chip } from "@heroui/react";
import { getStatusStyles } from "../../../../utils";
import { formatCurrency } from "../../../../lib/formatCurrency";

const WithdrawalTable = ({ transactions }: { transactions: any[] }) => {

    return (
        <>

            <Table>

                <TableHeader className="bg-slate-100">
                    <TableRow>
                        <TableHead className="px-6">Date</TableHead>
                        <TableHead className="px-6">Status</TableHead>
                        <TableHead className="pl-6">Amount</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {transactions.map((transaction, index) => (
                        <TableRow className="text-xs font-normal text-off-black" key={index}>

                            <TableCell className="px-6">
                                {moment(transaction.created_at).format('LL')}
                            </TableCell>

                            <TableCell className="px-6 capitalize">
                                <Chip className={`text-[12px] font-light ${getStatusStyles(transaction?.status).bgColor} ${getStatusStyles(transaction?.status).textColor}`}>
                                    {transaction?.status}
                                </Chip>
                            </TableCell>

                            <TableCell className="px-6 font-medium">
                                {formatCurrency(transaction.amount)}
                            </TableCell>

                        </TableRow>
                    ))}
                </TableBody>
            </Table>

        </>
    );
};

export default WithdrawalTable;
