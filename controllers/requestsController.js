var Team    = require("../models/team");

function requestsIndex(req, res){
  Team.find({ creator: req.params.id, "requests.status": "pending" })
  .populate(["members", "creator", "requests.sender", "requests.team"]).exec(function(err, teams){
    if (err) return res.status(500).json({message: 'Something went wrong.'});
    return res.status(200).json({ teams: teams });
  });
}

function requestsCreate(req, res){
  Team.findByIdAndUpdate({ _id: req.params.id },
    {
      $addToSet:
      {
        requests: {
          sender: req.body.user_id
        }
      }
    }, {
      new: true
    })
    .populate(["members", "creator", "requests.sender"])
    .exec(function(err, team){
      if (err) return res.status(500).json({message: 'Something went wrong.'});
      return res.status(200).json({ team: team });
    });
}

// function requestsAccept(req, res){
//   Team.findByIdAndUpdate(
//     {
//       _id: req.params.team_id,
//       requests: {$elemMatch: { _id: req.params.id}}
//     },
//     {
//       $set: {
//         "requests.$": {
//           status: "accepted"
//         }
//       },
//       $addToSet: {
//         members: req.body.sender_id
//       }
//     }, { new: true })
//     .populate(["members", "creator"])
//     .exec(function(err, team){
//     if (err) return res.status(500).json(err);
//     if (!team) return res.status(404).json(err);
//     res.status(200).json({ message: "Request was accepted." });
//   });
// }

function requestsAccept(req, res){
  Team.findById(req.params.team_id)
    .populate(["members", "creator"])
    .exec(function(err, team) {
      team.requests.forEach(function(teamRequest) {
        if (teamRequest.id == req.params.id) {
          teamRequest.status = "accepted";
          team.members.push(teamRequest.sender);
        }
      });
      team.save(function(err, team) {
        if (err) return res.status(500).json(err);
        if (!team) return res.status(404).json(err);
        res.status(200).json({ message: "Request was accepted.", team: team });
      });
    });
}

function requestsReject(req, res){
  Team.findByIdAndUpdate({ _id: req.params.team_id, "requests._id": req.params.id },
    {
      $set: {
        "requests.$.status": "rejected",
      },
      $addToSet: {
        members: req.body.sender_id
      }
    }, { new: true })
    .populate(["members", "creator"])
    .exec(function(err, team){
    if (err) return res.status(500).json(err);
    if (!team) return res.status(404).json(err);
    res.status(200).json({ message: "Request was rejected." });
  });
}

module.exports = {
  requestsIndex:  requestsIndex,
  requestsCreate: requestsCreate,
  requestsAccept: requestsAccept,
  requestsReject: requestsReject
};

//
// db.mycollection.update(
//   {"sessions.0.issues": {$elemMatch: {id: <yourValue>}}
// }, {$set: {"sessions.0.issues.$.text": "newText"}})
