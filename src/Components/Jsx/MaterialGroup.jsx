import { Grid, Pagination, Paper, Spoiler, Stack, Text } from "@mantine/core";
import MaterialCard from "./MaterialCard";

export default function MaterialGroup({
  data,
  page_no,
  setPageNo,
  isLoadingMaterials,
  title,
  isPaper,
}) {
  return (
    <Paper shadow="sm" withBorder p={"xs"}>
      <Stack>
        <Text fz="md" fw={500} c={"dimmed"}>
          {title}
        </Text>
        <Pagination
          p={3}
          size={"sm"}
          total={data?.total_pages}
          page={page_no}
          onChange={setPageNo}
        />
        <Spoiler showLabel="Show More " hideLabel="Show Less" maxHeight={350}>
          <Grid align="center" justify="center" p={3}>
            {(isPaper ? data?.papers : data?.materials)?.map(
              (material, index) => {
                return (
                  <Grid.Col
                    key={index}
                    span={{ base: 12, sm: 6, md: 4, lg: 3 }}
                    mih={350}
                    maw={350}
                    p={5}
                  >
                    <MaterialCard material={material} isPaper={isPaper} />
                  </Grid.Col>
                );
              }
            )}
          </Grid>
        </Spoiler>
      </Stack>
    </Paper>
  );
}
