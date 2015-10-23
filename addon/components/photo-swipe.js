/* global PhotoSwipe */
/* global PhotoSwipeUI_Default */

import Em from 'ember';

var run = Em.run;

const defaultPropertiesName = {
  src: 'src',
  h: 'h',
  w: 'w',
  title: 'title'
};

export default Em.Component.extend({

  didInitAttrs() {
    const newPropertiesName = this.get('propertiesName') || {};
    this.set('propertiesName', Em.merge(defaultPropertiesName, newPropertiesName));

    this.set('_internalItems', this._buildInternalItems());
  },

  _buildInternalItems() {
    const propertiesName = this.get('propertiesName');
    const items = this.get('items');
    return Em.A(items).map((item) => {
      return {
        src: Em.get(item, propertiesName.src),
        h: Em.get(item, propertiesName.h),
        w: Em.get(item, propertiesName.w),
        title: Em.get(item, propertiesName.title)
      };
    });
  },

  onInsert: Em.on('didInsertElement', function() {

    Em.run.scheduleOnce('afterRender', this, function() {
      this.set('pswpEl', this.$('.pswp')[0]);
      this.set('pswpTheme', PhotoSwipeUI_Default);

      this._buildOptions();

      /**
       * DEPRECATED
       *
       * Code exists for backward compatability of block usage
       * up to ember-cli-photoswipe versions 1.0.1.
       */
      if (this.get('_internalItems')) {
        return this._initItemGallery();
      }
      console.log("WARNING: See https://github.com/poetic/ember-cli-photoswipe#usage");
      return this._calculateItems();
      /**
       * END DEPRECATED
       */
    });
  }),

  _buildOptions: function(getThumbBoundsFn) {
     var reqOpts = {
      history: false
    };

    if (Em.isPresent(getThumbBoundsFn)) {
      reqOpts.getThumbBoundsFn = getThumbBoundsFn;
    }

    var options = Em.merge(reqOpts, this.get('options') || {});
    this.set('options', options);
  },

  _initItemGallery: function() {
    this.set('gallery', new PhotoSwipe(
      this.get('pswpEl'),
      this.get('pswpTheme'),
      this.get('_internalItems'),
      this.get('options')
    ));
    this._reInitOnClose();
  },

  _reInitOnClose: function() {
    var component = this;
    this.get('gallery').listen('close', function() {
      run.next(function() {
        component._initItemGallery();
      });
    });
  },

  itemObserver: Em.observer('_internalItems', function(){
    var component = this;
    component._initItemGallery();
  }),

  /**
   * DEPRECATED
   *
   * Code exists for backward compatability of block usage
   * up to ember-cli-photoswipe versions 1.0.1.
   */
  click: function(evt) {

    if (this.get('_internalItems')) {
      return; // ignore - not using deprecated block form
    }

    var aElement = this.$(evt.target).parent();
    var index    = this.$("a.photo-item").index( aElement );

    if (!aElement.is('a')) { return; }

    evt.preventDefault();

    // setup options, such as index for index
    this._buildOptions(this._getBounds.bind(this));
    this.set('options.index', index);

    var pSwipe = new PhotoSwipe(
      this.get('pswpEl'),
      this.get('pswpTheme'),
      this.get('calculatedItems'),
      this.get('options')
    );
    this.set('gallery', pSwipe);
    this.get('gallery').init();
  },
  /**
   * END DEPRECATED
   */

  _getBounds: function(i) {
    var img      = this.$('img').get(i),
        position = this.$(img).position(),
        width    = this.$(img).width();
    return {x: position.left, y: position.top, w: width};
  },

  actions: {
    launchGallery(item) {
      this._buildOptions(this._getBounds.bind(this));
      if (item !== undefined) {
        var index = this.get('_internalItems').indexOf(item);
        this.set('options.index', index);
      }
      var pSwipe = new PhotoSwipe(
        this.get('pswpEl'),
        this.get('pswpTheme'),
        this.get('_internalItems'),
        this.get('options')
      );
      this.set('gallery', pSwipe);
      this.get('gallery').init();
    }
  },


  /**
   * DEPRECATED
   *
   * Code exists for backward compatability of block usage
   * up to ember-cli-photoswipe versions 1.0.1.
   */
  _calculateItems: function() {
    var items           = this.$().find('a');
    var calculatedItems = Em.A(items).map(function(i, item) {
      return {
        src:   Em.$(item).attr('href'),
        w:     Em.$(item).data('width'),
        h:     Em.$(item).data('height'),
        msrc:  Em.$(item).children('img').attr('src'),
        title: Em.$(item).children('img').attr('alt')
      };
    });
    this.set('calculatedItems', calculatedItems);
  }
  /**
   * END DEPRECATED
   */
});
