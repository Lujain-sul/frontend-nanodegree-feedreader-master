/* feedreader.js
*
* This is the spec file that Jasmine will read and contains
* all of the tests that will be run against your application.
*/

/* All tests are within the $() function,
*  to ensure they don't run until the DOM is ready.
*/
$(function() {
  /* This suite is about the RSS feeds definitions,
  *  and the allFeeds variable in our application.
  */
  describe('RSS Feeds', function() {
    /* Check that allFeeds variable has been defined
    *  and that it is not empty.
    */
    it('are defined', function() {
      expect(allFeeds).toBeDefined();
      expect(allFeeds.length).not.toBe(0);
    });

    /* Loop through each feed and ensure it has a
    *  URL defined and that the URL is not empty.
    */
    it('should loop through each feed and ensure it has a URL which is not empty', function() {
      for (let feed of allFeeds) {
        // URL is defined
        expect(feed.url).toBeDefined();
        // URL is not empty
        expect(feed.url.length).not.toBe(0);
      }
    });

    /* Loop through each feed and ensure it has a
    *  name defined and that the name is not empty.
    */
    it('should loop through each feed and ensure it has a name which is not empty', function() {
      for (let feed of allFeeds) {
        // name is defined
        expect(feed.name).toBeDefined();
        // name is not empty
        expect(feed.name.length).not.toBe(0);
      }
    });

  });

  /* This suite is about the menu initial state,
  *  and hide/show function.
  */
  describe('The menu', function() {
    /* Check that the menu element is hidden by default. */
    it('should ensure that menu element is hidden by default', function() {
      // Call init function to set the page to initial state
      spyOn(window, 'init');
      init();
      expect(init).toHaveBeenCalled();

      // Check that body has className .menu-hidden, if so the menu is hidden
      let isHidden = $('body').hasClass('menu-hidden');
      expect(isHidden).toBe(true);
    });

    /* Check that the menu visibility is changed when
    *  menu icon is clicked.
    */
    it('should ensure that menu visibility is changed when the menu icon is clicked', function() {
      let icon = $('.menu-icon-link');
      let isHidden;

      // Simulate clicking on menu icon, to show the menu
      icon.click();
      // Check that body has not className .menu-hidden, if so the menu is not hidden
      isHidden = $('body').hasClass('menu-hidden');
      expect(isHidden).toBe(false);

      // Simulate clicking on menu icon again, to hide the menu
      icon.click();
      // Check that body has className .menu-hidden, if so the menu is hidden
      isHidden = $('body').hasClass('menu-hidden');
      expect(isHidden).toBe(true);
    });

  });

  /* This suite is about the feed initial state. */
  describe('Initial Entries', function() {
    /* Check that when the loadFeed is completed, there is at least
    *  a single .entry element within the .feed container.
    */
    let entries;
    beforeEach(function (done) {
      // Load the forth feed
      loadFeed(3);

      // Wait for loadFeed to complete for 10000
      setTimeout(function() {
        // Get all articles with className .entry inside .feed, then execute the spec
        entries = $('.feed .entry');
        done();
      }, 10000);
    });

    it('should ensure that there is at least a single .entry element when the loadFeed completes', function() {
      // Check that entries length is at least one
      expect(entries.length).toBeGreaterThan(0);
    });

  });

  /* This suite is about loading new feed. */
  describe('New Feed Selection', function() {
    /* Check that when a new feed is loaded the content actually changes. */
    let header;
    let newHeader;
    beforeEach(function(done) {
      // Nested callback
      loadFeed(0, function() {
        // For the first feed, get first h2 child of div with className .feed
        header = $('.feed h2:first-child').html();

        // Load different feed
        loadFeed(1, function(){
          // For the second feed, get first h2 child of div with className .feed
          newHeader = $('.feed h2:first-child').html();

          // Execute the spec as all loading is completed
          done();
        });
      });
    });

    it('should ensure that when a new feed is loaded the content actually changes', function() {
      // Check that first h2 of first feed is not equal to first h2 of second
      //  feed, if so content actually changed
      expect(header).not.toEqual(newHeader);
    });

  });

}());
