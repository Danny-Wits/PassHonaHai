import {
  Avatar,
  Badge,
  Center,
  Group,
  Paper,
  Spoiler,
  Stack,
  Table,
  Text,
} from "@mantine/core";
import { CiSquareChevUp } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { PageRoutes } from "../../Scripts/Const";
import { FieldColor } from "./UsersTable";
function LeaderboardTable({ users, title, label, isMobile, logo }) {
  const navigate = useNavigate();
  const rows = users?.map((user_info, index) => (
    <Table.Tr key={index} style={{ cursor: "pointer" }}>
      <Table.Td>
        <Group
          gap="sm"
          maw={150}
          onClick={() =>
            navigate(PageRoutes.PublicProfile, { state: { user_info } })
          }
          style={{ cursor: "pointer" }}
        >
          <Avatar
            size={30}
            src={user_info?.profile_picture_url}
            radius={30}
            name={user_info?.name}
            variant={"light"}
            color={"initials"}
          />
          <Text fz="sm" fw={500} truncate={"end"} w={"60%"}>
            {user_info?.name}
          </Text>
        </Group>
      </Table.Td>
      <Table.Td>
        <Badge
          color={FieldColor[user_info?.field]}
          variant={logo ? "light" : "dot"}
        >
          <Group gap={3} align="center">
            {logo}
            {user_info?.total_count}
          </Group>
        </Badge>
      </Table.Td>
    </Table.Tr>
  ));
  return (
    <Paper shadow="md" p={"md"}>
      <Stack>
        <Center>
          <Text fz={isMobile ? "md" : "xl"} fw={500} c={"dimmed"}>
            {title}
          </Text>
        </Center>
        <Spoiler
          maxHeight={310}
          showLabel={"Show More"}
          hideLabel={<CiSquareChevUp size={26} color="gray" />}
        >
          <Table highlightOnHover w={"100%"}>
            <Table.Thead>
              <Table.Tr>
                <Table.Th c={"dimmed"}>User</Table.Th>
                <Table.Th c={"dimmed"}>{label}</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>{rows}</Table.Tbody>
          </Table>
        </Spoiler>
      </Stack>
    </Paper>
  );
}

export default LeaderboardTable;
