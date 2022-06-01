import MeetingService from "../../services/MeetingService.js";

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
  const meetingId = req.params.meetingId;
  meeting
    .readMeeting(meetingId)
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
  const meetingId = req.params.meetingId;
  const meetingDTO = req.body;
  meeting
    .updateMeeting(meetingId, meetingDTO)
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
  const meetingId = req.params.meetingId;
  meeting
    .deleteMeeting(meetingId)
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

const findPlaces = (req, res) => {
  const meetingId = req.params.meetingId;
  meeting
    .findPlaces(meetingId)
    .then((places) => {
      res.json(places);
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
};

const findUsers = (req, res) => {
  const meetingId = req.params.meetingId;
  meeting
    .findUsers(meetingId)
    .then((users) => {
      res.json(users);
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
};

const findActivities = (req, res) => {
  const meetingId = req.params.meetingId;
  meeting
    .findActivities(meetingId)
    .then((activities) => {
      res.json(activities);
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
};

export {
  createMeeting,
  readMeeting,
  updateMeeting,
  deleteMeeting,
  findPlaces,
  findUsers,
  findActivities,
};
