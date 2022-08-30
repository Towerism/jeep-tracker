import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";

export function MilestoneTimeline({ timeline = [] }) {
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
