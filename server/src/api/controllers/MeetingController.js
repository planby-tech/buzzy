import MeetingService from "../../services/MeetingService";

const meeting = new MeetingService();

const createMeeting = (req, res) => {
  const groupId = req.params.groupId;
  const meetingDTO = req.body;
  meeting
    .createMeeting(groupId, meetingDTO)
    .then((meeting) => {
      res.json({
        message: "Meeting was created successfully!!",
        meeting: meeting,
      });
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
};

const readMeeting = (req, res) => {
  const groupId = req.params.groupId;
  const meetingId = req.params.meetingId;
  meeting
    .readMeeting(groupId, meetingId)
    .then((meeting) => {
      res.json({
        message: "Meeting information",
        meeting: meeting,
      });
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
};

const updateMeeting = (req, res) => {
  const groupId = req.params.groupId;
  const meetingId = req.params.meetingId;
  const meetingDTO = req.body;
  meeting
    .updateMeeting(groupId, meetingId, meetingDTO)
    .then((meeting) => {
      res.json({
        message: "Meeting was updated successfully!!",
        meeting: meeting,
      });
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
};

const deleteMeeting = (req, res) => {
  const groupId = req.params.groupId;
  const meetingId = req.params.meetingId;
  meeting
    .deleteMeeting(groupId, meetingId)
    .then((meeting) => {
      res.json({
        message: "Meeting was deleted successfully!!",
        meeting: meeting,
      });
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
};

export { createMeeting, readMeeting, updateMeeting, deleteMeeting };
