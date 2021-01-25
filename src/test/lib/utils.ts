import AWS from "aws-sdk";
import { v4 as uuidv4 } from "uuid";

const chime = new AWS.Chime({ region: "us-east-1" });
chime.endpoint = new AWS.Endpoint(
  "https://service.chime.aws.amazon.com/console"
);

async function getMeetingId() {
  const meetingResponse = await chime
    .createMeeting({
      ClientRequestToken: uuidv4(),
      MediaRegion: "us-west-2",
    })
    .promise();
  return meetingResponse;
}

export { getMeetingId };
