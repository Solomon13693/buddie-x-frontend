import moment from "moment";
import { TableHeader, TableHead, Table, TableBody, TableRow, TableCell } from "../../ui/table";
import { MentorTransaction } from "../../../types";
import { formatCurrency } from "../../../lib/formatCurrency";

const MentorTransTable = ({ transactions }: { transactions: MentorTransaction[] }) => {
    return (
        <>
            <Table className=''>
                <TableHeader className='!bg-slate-100'>
                    <TableRow>
                        <TableHead className="px-6">
                            Date
                        </TableHead>
                        <TableHead className="px-6">
                            Type
                        </TableHead>
                        <TableHead className="pl-6">
                            Money In
                        </TableHead>
                        <TableHead className="pl-6">
                            Money Out
                        </TableHead>
                        <TableHead className="pl-6">
                            Balance
                        </TableHead>
                        <TableHead className="pl-6">
                            Prev Balance
                        </TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {transactions.map((transaction, index) => (
                        <TableRow className="text-xs font-normal text-off-black" key={index}>

                            <TableCell className="px-6">
                                {moment(transaction.created_at).format('LL')}
                            </TableCell>

                            <TableCell className="px-6">
                                {transaction.event}
                            </TableCell>

                            <TableCell className="px-6">
                                {transaction.type === 'credit' ? (
                                    <span className="text-success">
                                        {formatCurrency(transaction.amount)}
                                    </span>
                                ) : (
                                    <span>---</span>
                                )}
                            </TableCell>

                            <TableCell className="px-6">
                                {transaction.type === 'debit' ? (
                                    <span className="text-error-400">
                                        - {formatCurrency(transaction.amount || 0)}
                                    </span>
                                ) : (
                                    <span>---</span>
                                )}
                            </TableCell>

                            <TableCell className="px-6">
                                {formatCurrency(transaction.new_balance)}
                            </TableCell>

                            <TableCell className="px-6">
                                {formatCurrency(transaction.previous_balance)}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </>
    );
}

export default MentorTransTable;
