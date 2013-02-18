var people = new Meteor.Collection("People");

if (Meteor.isClient) {
  Template.stats.greeting = function () {
    return "Calling all Carnevales";
  };

  // Template.hello.events({
  //   'click input' : function () {
  //     // template data, if any, is available in 'this'
  //     if (typeof console !== 'undefined')
  //       console.log("You pressed the button");
  //   }
  // });

  Template.stats.people = function () {
    return people.find({}, {sort: {Name: 1}});
  };

  Session.set('adding_person', false);

  Template.stats.new_person = function () {
    return Session.equals('adding_person', true)
  };

  Template.stats.events({
    'click #btnNew': function (e,t)
    {Session.set('adding_person', true); Meteor.flush();
                  focusText(t.find("#add-name"));
    },
    'keyup #add-state': function (e,t) {
      if (e.which === 13)
      {
        var nameVal = $('#add-name').val();
        var stateVal = String(e.target.value || "");
        if (stateVal)
        {
          people.insert({Name:nameVal, State:stateVal});
          Session.set('adding_person', false);
        }
      }
    },
    'focusout #add-state': function(e,t) {
      Session.set('adding_person',false);
    }
  });

  function focusText(i) {
    i.focus();
    i.select();
  };
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
