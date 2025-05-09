import { useDisclosure } from "@mantine/hooks";
import { Button } from "../../../ui";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./../../../ui/table";
import moment from "moment";
import { useState } from "react";
import MentorSessionModal from "./MentorSessionModal";
import { useDeleteSession } from "../../../../services";
import { SessionType } from "../../../../types";
import toast from "react-hot-toast";
import { getErrorMessage } from "../../../../utils";
import DeleteModal from "../../../modal/DeleteModal";
import { formatCurrency } from "../../../../lib/formatCurrency";

const SessionTable = ({ data }: { data: SessionType[] }) => {

    const [opened, { open, close }] = useDisclosure();
    const [openedEdit, { open: openEdit, close: closeEdit }] = useDisclosure();
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [selected, setSelected] = useState<SessionType | null>(null);

    const { mutate, isPending } = useDeleteSession();

    const handleDelete = () => {
        if (!selectedId) return;
        mutate(
            { id: selectedId },
            {
                onSuccess: (data) => {
                    toast.success(data?.message);
                    close();
                },
                onError: (err) => {
                    toast.error(getErrorMessage(err));
                },
            }
        );
    };

    return (
        <>
            <Table>
                <TableHeader className="bg-slate-100">
                    <TableRow>
                        <TableHead className="px-4">Title</TableHead>
                        <TableHead className="px-4">Frequency</TableHead>
                        <TableHead className="px-4">Duration (mins)</TableHead>
                        <TableHead className="px-4">Sessions</TableHead>
                        <TableHead className="px-4">Price</TableHead>
                        <TableHead className="px-4">Created At</TableHead>
                        <TableHead className="px-4">Actions</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {data.map((item) => (
                        <TableRow className="text-xs text-black" key={item.id}>
                            <TableCell className="px-4">{item.title}</TableCell>
                            <TableCell className="px-4 capitalize">{item.frequency}</TableCell>
                            <TableCell className="px-4">{item.duration}</TableCell>
                            <TableCell className="px-4">{item.sessions_count}</TableCell>
                            <TableCell className="px-4">{formatCurrency(item.price)}</TableCell>
                            <TableCell className="px-4">
                                {moment(item.created_at).format("LLL")}
                            </TableCell>
                            <TableCell className="px-4">
                                <div className="flex items-center gap-2">
                                    <Button
                                        color="success"
                                        onPress={() => {
                                            openEdit();
                                            setSelected(item);
                                        }}
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        onPress={() => {
                                            setSelectedId(item.id || '');
                                            open();
                                        }}
                                        color="danger"
                                    >
                                        Delete
                                    </Button>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            <MentorSessionModal item={selected} open={openedEdit} onClose={closeEdit} />

            <DeleteModal
                onDelete={handleDelete}
                loading={isPending}
                title="Session"
                open={opened}
                setOpen={close}
            />

        </>
    );
};

export default SessionTable;
