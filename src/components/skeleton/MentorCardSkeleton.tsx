import { Card, Skeleton, Group, Stack, Box } from '@mantine/core';

const MentorCardSkeleton = () => {
    return (
        <Card className="rounded-xl border p-2.5">
            <Box className="relative overflow-hidden">
                <Skeleton height={200} radius="md" mb={10} />
            </Box>

            <Stack gap="xs">
                <Skeleton height={20} width="60%" radius="sm" />
                <Skeleton height={15} width="40%" radius="sm" />
                <Group p="apart">
                    <Skeleton height={15} width="30%" radius="sm" />
                    <Skeleton height={15} width="30%" radius="sm" />
                </Group>
                <Group p="apart">
                    <Skeleton height={15} width="30%" radius="sm" />
                    <Skeleton height={15} width="30%" radius="sm" />
                </Group>
            </Stack>
        </Card>
    );
};

export default MentorCardSkeleton;
