import { Box, Card, CardContent, Typography } from "@mui/material";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";
import Grid from "@mui/material/Unstable_Grid2";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import { getOrderStatus } from "~/models/orderStatus.server";

export const loader = async ({ params }) => {
  const { von, lastName } = params;
  const result = await getOrderStatus(von, lastName);
  return json(result);
};

function BasicStatusCard({ title, children, ...props }) {
  return (
    <Grid {...props}>
      <Card sx={{ minWidth: 150 }}>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {title}
          </Typography>
          <Typography variant="h5" component="div">
            {children}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
}

function DocumentCard({ title, url, found }) {
  return (
    <BasicStatusCard title={title}>
      {found ? <a href={url}>Found</a> : "Not yet"}
    </BasicStatusCard>
  );
}

function MilestoneTimeline({ timeline }) {
  return (
    <Timeline>
      {timeline.map((milestone, index) => (
        <TimelineItem key={milestone.code}>
          {milestone.completed && (
            <TimelineOppositeContent color="text.secondary">
              {milestone.completedDate}
            </TimelineOppositeContent>
          )}
          <TimelineSeparator>
            <TimelineDot variant={milestone.completed ? "filled" : "outline"} />
            {index !== timeline.length - 1 && <TimelineConnector />}
          </TimelineSeparator>
          <TimelineContent>
            {milestone.code} - {milestone.name}
          </TimelineContent>
        </TimelineItem>
      ))}
    </Timeline>
  );
}

export default function OrderStatus() {
  const {
    image,
    statusCode,
    statusDesc,
    vehicle,
    von,
    vin,
    windowStickerFound,
    windowStickerUrl,
    buildSheetFound,
    buildSheetUrl,
    modelYear,
    brandName,
    specModel,
    trimCode,
    timeline,
  } = useLoaderData();
  return (
    <main>
      <Box>
        <Grid container>
          <Grid sx={{ textAlign: "center" }} md={6}>
            <img src={image} alt={vehicle} style={{ width: "90%" }} />
          </Grid>
          <Grid md={6}>
            <Grid container spacing={2}>
              <BasicStatusCard title="Order number">{von}</BasicStatusCard>
              <BasicStatusCard title="Current status">
                {statusCode} - {statusDesc}
              </BasicStatusCard>
              <BasicStatusCard title="VIN" md={8}>
                {vin}
              </BasicStatusCard>
              <DocumentCard
                title="Window sticker"
                found={windowStickerFound}
                url={windowStickerUrl}
                md={5}
              />
              <DocumentCard
                title="Build sheet"
                found={buildSheetFound}
                url={buildSheetUrl}
                md={5}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid container sx={{ mt: 2 }}>
          <Grid xs={6}>
            <Typography align="center" variant="h4" gutterBottom>
              Vehicle specs
            </Typography>
            <Grid container spacing={2}>
              <BasicStatusCard title="Year">{modelYear}</BasicStatusCard>
              <BasicStatusCard title="Make">{brandName}</BasicStatusCard>
              <BasicStatusCard title="Model">{specModel}</BasicStatusCard>
              <BasicStatusCard title="Trim code">{trimCode}</BasicStatusCard>
            </Grid>
          </Grid>
          <Grid xs={6}>
            <Typography align="center" variant="h4" gutterBottom>
              Timeline
            </Typography>
            <MilestoneTimeline timeline={timeline} />
          </Grid>
        </Grid>
      </Box>
    </main>
  );
}
