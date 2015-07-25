 Resolutions = new Mongo.Collection('resolutions'); // <= resolutions is the name of the Collection
// Note: Collections are Meteor's way of storing persistent data


if (Meteor.isClient) {
  Meteor.subscribe("resolutions");

  Template.body.helpers({
     resolutions: function() {
      if (Session.get('hideFinished')) {
        return Resolutions.find({checked: {$ne: true}});
      } else {
      return Resolutions.find();
      }
     },
     hideFinished: function() {
      return Session.get('hideFinished');
     }
      /* retrieving the data from an object */
      // [ the exact name as the opening #each
      // { title: "Hello Resolution #1"},
      // { title: "Bye Resolution #2"},
      // { title: "Kanye West"} ]

  });



  // if this was inside the template named resolution in the html file it would be called "Template.ressolution.events", however its directly within the body therefore its "Template.body.events"

  // inserting resolutions
  Template.body.events({
    // we're basically saying look for a submit event that will trigger .new-resolution. if 
    'submit .new-resolution': function(event) {
      var title = event.target.title.value;

      Meteor.call("addResolution", title);

      event.target.title.value = "";

      return false;
    },

    'change .hide-finished': function(event) {
      Session.set('hideFinished', event.target.checked);
    }


  });


  Accounts.ui.config({
    passwordSignupFields: "USERNAME_ONLY"
  });


}


if (Meteor.isServer) {
  Meteor.startup(function () {
    // Note: Your meteor app must be running for Mongo to run
    // code to run on server at startup
  });

  Meteor.publish("resolutions", function() {
    return Resolutions.find({
      $or: [
        { private: {$ne: true} },
        { owner: this.userId }
      ]
    });
  });
}



Meteor.methods({
  addResolution: function(title) {
    Resolutions.insert({
      title : title,
      createdAt: new Date(),
      owner: Meteor.userId()
    });
  },
  updateResolution: function(id, checked) {
    var res = Resolutions.findOne(id);

    if(res.owner !== Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }
    Resolutions.update(id, {$set: {checked: checked}});
  },
  deleteResolution: function(id) {
    var res = Resolutions.findOne(id);

    if(res.owner !== Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }
    Resolutions.remove(id);
  },
  setPrivate: function(id, private) {
    var res = Resolutions.findOne(id);

    if(res.owner !== Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }

    Resolutions.update(id, {$set: {private: private}});
  }
});

// Note: to right something within our Mongo db
// 1) while your app is running type meteor mongo in terminal
// 2) the type db.resolutions.insert({ title: "Hello Resolutions", createdAt: new Date() });
// remember resolutions is our collection, and we're inserting the above.