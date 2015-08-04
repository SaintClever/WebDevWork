PlayersList = new Meteor.Collection('players');


// 12) Instead of returning a string lets return the players by creating an {{each}} block and loop through it.
//  a) within the js file player’s function, after return type PlayersList.find();

if(Meteor.isClient){ /* client_open */

  Meteor.subscribe('thePlayers');

  Template.leaderboard.player = function(){
    var currentUserId = Meteor.userId();
    // We place in curly braces / brackets because we CANNOT to define a second argument without a first argument. -1 means to sort the documents in desending order, meaning from the highest value to the lowest value / or the highest score to the lowest score.

    // for the names we have it in the ascending order, from a - z, therefore is from the lowest value to the greatest value.

    // this ensures that the currently logged in user only sees players he created
    return PlayersList.find({ createdBy: currentUserId }, {sort: {score: -1, name: 1}});
  }

  // the helper function selectedClass is used to create a class call "selected" within the html
  // we do this by added {{selectedClass}} within the html and using css to adjust the background-color
  Template.leaderboard.selectedClass = function(){

    // as discussed before the Session.set has two parameters, the name and the data.
    // the name seems to represent the data, therefore they're the same thing
    // for ex. Session.set('nesta parchment', 'saint. clever')
    // both names equal to the same person, therefore if the background is highligted yellow when selected

    var playerId = this._id;
    var selectedPlayer = Session.get('selectedPlayer');
    if(selectedPlayer === playerId){
      return 'selected'
      // return this._id
    }
  }

  // Inside this funciton we recieve the id of the currently selected player and for the sake of convinience once again we place it inside a variable called "selectedPlayer"

  // we use a fineOne function because we want to retreive a single Document from inside this helper function
  Template.leaderboard.showSelectedPlayer = function(){
    var selectedPlayer = Session.get('selectedPlayer');
    return PlayersList.findOne(selectedPlayer);
  }

  // events is a method used to attach events to a template
  Template.leaderboard.events({
    // we create and event called click, specify what we want it to effect, specifically the li.player class in the html and give it a function
    'click li.player': function(){

      var playerId = this._id
      // this - this within this._id refers to the Document of the player that has just been clicked within that Collection
      // _id - _id within this._id refers to the name of the Field that contains the unique id of the player within that Collection

      // Note: Because we want the Field or the unique id when replace the data within the Sesscion.set to the playerId variable.
      // A Session.set requires two parameters; A name and data. The data can be a string or a variable
      Session.set('selectedPlayer', playerId);

      // A Session.get requires the name of the 1st parameter within the Session.set
      // lets make it a variable so we have an easier time referancing it
      var selectedPlayer = Session.get('selectedPlayer');

      // lets run a test and display the Session.get variable in the console
      console.log(selectedPlayer);
    },

    // for our button we create another click within the Template.leader.events
    // create an id name #increment thats associated to the id html button
    // Once again we c
    'click #increment': function(){
      var selectedPlayer = Session.get('selectedPlayer');

      // we then use mongoDB's update function
      // NOTE: because we want to upadate the unique id associated with that Document
          // we have to specify what part of the document to change

      // the _id: selectedPlayer is to find the location of the Document
      // the score: 5 is how we actually change the Document


      /* NOTE: By default in mongoDB when you update the Collection or Data the previous information is replaced. To prevent this use the "$", which allows us to update the document without deleting any prior or important information */ 

      // MongoDB operators
      // $set - sets a desired value
      // $inc - increments up by a desired value

      // PlayersList.update({_id: selectedPlayer}, {$inc: {score: 5}});
      Meteor.call('modifyPlayerScore', selectedPlayer, 5);
    },
    'click #decrement': function(){
      var selectedPlayer = Session.get('selectedPlayer');
      // PlayersList.update({_id: selectedPlayer}, {$inc: {score: -5}});
      Meteor.call('modifyPlayerScore', selectedPlayer, -5);
    },
    'click #remove': function(){
      // retrieve the unique id stored in the selected player Session
      var selectedPlayer = Session.get('selectedPlayer');
      // use MongoDB "remove" function to find the document of the currently selected player and remove it from the Collection
      // PlayersList.remove(selectedPlayer);
      Meteor.call('removePlayer', selectedPlayer);
    }

  });


  // the addPlayerForm keyword is a reference to the addPlayerForm Template, and the events keyword is used for find events
  // NOTE: events must be attached to specific Template
  Template.addPlayerForm.events({
  // NOTE: We’re attached the events submit function to the form. Also a form could be more than a click, a enter could be used therefore we use  submit rather than click

  // NOTE: by passing the event within the function as the first argument we're able to use this keyword as a reference for the event
    'submit form': function(event){ 
      // this prevents the default behavior of the form occuring, (refresshing the page)
      event.preventDefault(); // <- 1)prevent the default behavior of the form
      var playerNameVar = event.target,playerName.value; // <- 2)get the value of the input field
      console.log(playerNameVar);
      // var currentUserId = Meteor.userId(); // <- 1a) Meteor.userId retrieves the unique id of the currently logged in user
      // PlayersList.insert({ // <- 3)use MongoDB insert method to push info into the input field
      //   name: playerNameVar,
      //   score: 0,
      //   createdBy: currentUserId // <- 1b) this contains the unique id of the currenlty logged in account at the moment. This is how we associate a player to the currenlty logged in user
      // })
      Meteor.call('insertPlayerData', playerNameVar);
    }
  });


} /* client_close */





// However we can run PlayersList.find().fetch() in our Meteor.isSever
if(Meteor.isSever) { /* server_open */
  Meteor.publish('thePlayers', function(){
    var currentUserId = this.userId;
    // the below specified data that we want viewable to the viewers
    return PlayersList.find({ createdBy: currentUserId });
  });

  Meteor.methods({
    'insertPlayerData': function(playerNameVar){
      var currentUserId = Meteor.userId();
      PlayersList.insert({
        name: playerNameVar,
        score: 0,
        createdBy: currentUserId
      })
      console.log("Hello world");
    },
    'removePlayer': function(selectedPlayer){
      PlayersList.remove(selectedPlayer);
    },
    'modifyPlayerScore': function(selectedPlayer, scoreValue){
      PlayersList.update({_id: selectedPlayer}, {$inc: {score: scoreValue}});
    }
  });

} /* server_close */



