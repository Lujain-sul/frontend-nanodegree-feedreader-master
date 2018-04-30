/* feedreader.js
*
* This is the spec file that Jasmine will read and contains
* all of the tests that will be run against your application.
*/

/* We're placing all of our tests within the $() function,
* since some of these tests may require DOM elements. We want
* to ensure they don't run until the DOM is ready.
*/
$(function() {
  /* This is our first test suite - a test suite just contains
  * a related set of tests. This suite is all about the RSS
  * feeds definitions, the allFeeds variable in our application.
  */
  describe('RSS Feeds', function() {
    /* This is our first test - it tests to make sure that the
    * allFeeds variable has been defined and that it is not
    * empty. Experiment with this before you get started on
    * the rest of this project.
    */
    it('are defined', function() {
      expect(allFeeds).toBeDefined();
      expect(allFeeds.length).not.toBe(0);
    });

    /* TODO: Write a test that loops through each feed
    * in the allFeeds object and ensures it has a URL defined
    * and that the URL is not empty.
    */
    it('should loop through each feed and ensure it has a URL which is not empty', function() {
      for (let feed of allFeeds) {
        // url is defined
        expect(feed.url).toBeDefined();
        // url is not empty
        expect(feed.url.length).not.toBe(0);
      }
    });

    /* TODO: Write a test that loops through each feed
    * in the allFeeds object and ensures it has a name defined
    * and that the name is not empty.
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

  /* TODO: Write a new test suite named "The menu" */
  describe('The menu', function() {
    /* TODO: Write a test that ensures the menu element is
    * hidden by default. You'll have to analyze the HTML and
    * the CSS to determine how we're performing the
    * hiding/showing of the menu element.
    */
    it('should ensure that menu element is hidden by default', function() {
      // call init function to set the page to initial state
      spyOn(window, 'init');
      init();
      expect(init).toHaveBeenCalled();

      // check that body className is .menu-hidden, if so the menu is hidden
      let className = $('body').attr("class");
      expect(className).toEqual('menu-hidden');
    });

    /* TODO: Write a test that ensures the menu changes
    * visibility when the menu icon is clicked. This test
    * should have two expectations: does the menu display when
    * clicked and does it hide when clicked again.
    */
    it('should ensure that menu visibility is changed when the menu icon is clicked', function() {
      let icon = $('.menu-icon-link');
      let className;

      // simulate clicking on menu icon, to show the menu
      icon.click();
      // check that body className is not .menu-hidden, if so the menu is not hidden
      className = $('body').attr("class");
      expect(className).not.toEqual('menu-hidden');

      // simulate clicking on menu icon again, to hide the menu
      icon.click();
      // check that body className is .menu-hidden, if so the menu is hidden
      className = $('body').attr("class");
      expect(className).toEqual('menu-hidden');
    });

  });

  /* TODO: Write a new test suite named "Initial Entries" */
  describe('Initial Entries', function() {
    /* TODO: Write a test that ensures when the loadFeed
    * function is called and completes its work, there is at least
    * a single .entry element within the .feed container.
    * Remember, loadFeed() is asynchronous so this test will require
    * the use of Jasmine's beforeEach and asynchronous done() function.
    */
    let entries;
    beforeEach(function (done) {
      // load the forth feed
      loadFeed(3);

      // wait for loadFeed to complete for 10000
      setTimeout(function() {
        // get all articles with className .entry, then execute the spec
        entries = $('.entry');
        done();
      }, 10000);
    });

    it('should ensure that there is at least a single .entry element when the loadFeed completes', function() {
      // check that entries length is at least one
      expect(entries.length).toBeGreaterThan(0);
    });

  });

  /* TODO: Write a new test suite named "New Feed Selection" */
  describe('New Feed Selection', function() {
    /* TODO: Write a test that ensures when a new feed is loaded
    * by the loadFeed function that the content actually changes.
    * Remember, loadFeed() is asynchronous.
    */
    let currContainer;
    let newContainer;
    beforeEach(function (done) {
      // for the current feed, get first h2 child of div with className .feed
      currContainer = $('.feed h2:first-child').html();
      // load the second feed
      loadFeed(1);

      // wait for loadFeed to complete for 10000
      setTimeout(function() {
        // for the newly loaded feed, get first h2 child of div with className .feed,
        // then execute the spec
        newContainer = $('.feed h2:first-child').html()
        done();
      }, 10000);
    });

    it('should ensure that when a new feed is loaded the content actually changes', function() {
      // check that first h2 of current feed is not equal to first h2 of newly loaded feed,
      // if so content actually changed
      expect(currContainer).not.toEqual(newContainer);
    });

  });

}());
