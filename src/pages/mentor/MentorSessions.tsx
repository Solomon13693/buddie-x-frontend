import { useDisclosure } from "@mantine/hooks";
import { Breadcrumbs } from "../../components";
import { Button } from "../../components/ui";
import { useGetMentorSessions } from "../../services";
import { MentorSessionModal, SessionTable } from "../../components/dashboard/mentor";
import { TableSkeleton } from "../../components/skeleton";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { fetchSettings } from "../../redux/features/generalDataSlice";
import { useEffect } from "react";
import EmptyState from "../../components/EmptyState";

const breadcrumbItems = [
  { label: "Dashboard", href: "/mentor/dashboard" },
  { label: "Sessions" },
];

const MentorSessions = () => {

  const dispatch = useDispatch<AppDispatch>();
  const [opened, { open, close }] = useDisclosure()

  const { response, isLoading } = useGetMentorSessions();
  const { data } = response || {};

  useEffect(() => {
    dispatch(fetchSettings());
  }, [dispatch]);

  return (
    <>

      <Breadcrumbs items={breadcrumbItems} isDisabled={false} />

      <div className="flex justify-end mb-4">
        <Button onPress={() => open()}>Add Session</Button>
      </div>

      <div className="bg-white rounded-2xl p-5">

        {isLoading ? (

          <TableSkeleton />
          
        ) : data && data.length > 0 ? (

          <SessionTable data={data} />

        ) : (

          <EmptyState emptyText="No Session Added Yet" />

        )}

      </div>

      <MentorSessionModal open={opened} onClose={close} />

    </>
  )
}

export default MentorSessions