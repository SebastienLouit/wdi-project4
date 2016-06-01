var Team   = require('../models/team');

function teamsIndex(req, res) {
  Team.find().populate(['creator', 'members']).exec(function(err, teams){
    if (err) return res.status(404).json({message: 'Something went wrong.'});
    res.status(200).json({ teams: teams });
  });
}

function teamsCreate(req, res){
  var team      = new Team(req.body.team);
  team.creator  = req.body.user.user._id;

  team.save(function(err, team){
    var id = req.body.user.user._id;
    if (err) return res.status(500).json(err);
    return res.status(200).json(team);

    User.findById(id, function(err, user){
      user.teams.push(team);
      user.save(function(err, user) {
        res.status(201).send(team);
      });
    });
  });
}

function teamsShow(req, res){
  Team.findById(req.params.id).populate("members").exec(function(err, team){
    if (err) return res.status(404).json({message: 'Something went wrong.'});
    res.status(200).json({ team: team });
  });
}

// function teamsUpdate(req, res){

//   var id = req.params.id;
//   console.log("Team id :", id)



//   Team.findById(req.params.id, { new: true }, function(err, team) {
//     console.log("Team: ", team)
//     if (err) return res.status(500).json({message: "Something went wrong!"});
//     if (!team) return res.status(404).json({message: 'No team found.'});

//     // if (req.body.email) team.email = req.body.name;
//     // if (req.body.password) team.password = req.body.password;

//     team.save(function(err) {
//      if (err) return res.status(500).json({message: "Something went wrong!"});

//       res.status(201).json({message: 'Team successfullllllly updated.', team: team});
//     });
//   });
// }


function teamsUpdate(req, res){
  var id = req.params.id;

  Team.findByIdAndUpdate({ _id: id }, req.body.team, { new: true }, function(err, team){
    if (err) return res.status(500).send(err);
    if (!team) return res.status(404).send(err);
    res.status(200).send(team);
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
  teamsCreate: teamsCreate
};
