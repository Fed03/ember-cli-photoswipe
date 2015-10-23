import Ember from 'ember';

export default Ember.Controller.extend({
  // example 1
  psOpts: {
    index: 1
  },

  items: [
    {
      src: 'http://placekitten.com/g/600/400',
      w: 600,
      h: 400,
      title: 'whooa'
    },
    {
      src: 'http://placekitten.com/g/1200/900',
      w: 1200,
      h: 900
    }
  ],

  itemsWithUncommonProp: [
    {
      path: 'http://placekitten.com/g/600/400',
      width: 600,
      h: 400,
      title: 'whooa'
    },
    {
      path: 'http://placekitten.com/g/1200/900',
      width: 1200,
      h: 900
    }
  ],

  newPropertiesName: {
    src: 'path',
    w: 'width'
  },

  // actions
  actions: {
    initGallery: function() {
      this.get('myGallery').init();
    }
  },

  psTwoOpts: {
    hideShare: true
  }
});
