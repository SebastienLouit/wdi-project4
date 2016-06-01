var Team   = require('../models/team');

function teamsIndex(req, res) {
  Team.find().populate(['creator', 'members']).exec(function(err, teams){
    if (err) return res.status(404).json({message: 'Something went wrong.'});
    res.status(200).json({ teams: teams });
  });
}

function teamsCreate(req, res){
  var team     = new Team(req.body.team);
  team.creator = req.body.user._id;
  team.members.push(req.body.user._id);

  team.save(function(err, team){
    if (err) return res.status(500).json(err);
    return res.status(200).json({ team: team });
  });
}

function teamsShow(req, res){
  Team
  .findById(req.params.id)
  .populate(["members", "creator", "requests.sender"]).exec(function(err, team){
    if (err) return res.status(404).json({message: 'Something went wrong.'});
    res.status(200).json({ team: team });
  });
}

function teamsUpdate(req, res){
  var id = req.params.id;

  Team.findByIdAndUpdate({ _id: id }, req.body.team, { new: true }, function(err, team){
    if (err) return res.status(500).json(err);
    if (!team) return res.status(404).json(err);
    res.status(200).json({ team: team });
  });
}

function teamsJoin(req, res){
  var id = req.params.id;

  Team.findByIdAndUpdate({ _id: id },
    { $addToSet: { members: req.body.user_id } }, { new: true })
    .populate(["members", "creator"])
    .exec(function(err, team){
    if (err) return res.status(500).json(err);
    if (!team) return res.status(404).json(err);
    res.status(200).json({ team: team });
  });
}

function teamsLeave(req, res){
  var id = req.params.id;

  Team.findByIdAndUpdate({ _id: id },
    { $pull: { members: req.body.user_id } }, { new: true })
    .populate(["members", "creator"])
    .exec(function(err, team){
    if (err) return res.status(500).json({message: 'Something went wrong.'});
    if (!team) return res.status(404).json({message: 'Something went wrong.'});
    res.status(200).json({ team: team });
  });
}

function teamsDelete(req, res){
  Team.findByIdAndRemove({_id: req.params.id}, function(err){
   if (err) return res.status(404).json({message: 'Something went wrong.'});
   res.status(200).json({message: 'Team has been successfully deleted'});
  });
}

module.exports = {
  teamsIndex:  teamsIndex,
  teamsShow:   teamsShow,
  teamsUpdate: teamsUpdate,
  teamsDelete: teamsDelete,
  teamsCreate: teamsCreate,
  teamsJoin:   teamsJoin,
  teamsLeave:  teamsLeave,
};
