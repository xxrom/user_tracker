<!-- Google Analytics -->
<script>
  // Renamed arguments, so it will be easier to read the code
  (function (window, document, name, scriptUrl, globalMethod, a, m) {
    window["GoogleAnalyticsObject"] = globalMethod; // set marker, where global method will be stored
    (window[globalMethod] =
      window[globalMethod] ||
      function () {
        (window[globalMethod].q = window[globalMethod].q || []) // reuse or init new empty queue for arguments/events/tags 
          .push(arguments); // add new arguments from function "globalMethod" to the global q (queue) 
      }),
      (window[globalMethod].l = 1 * new Date()); // save current client time for load statistics?

    (a = document.createElement(name)), // create new <script /> element
      (m = document.getElementsByTagName(name)[0]); // get first <script /> on the page

    a.async = 1; // make async (not blocking) load script
    a.src = scriptUrl; // set src for loading "our" script
    m.parentNode.insertBefore(a, m); // insert "our" script before all scripts on the page
  })(
    window,
    document,
    "script",
    "https://www.google-analytics.com/analytics.js",
    "ga"
  ); // run function

  // this will send all tags in queue, that will be processed later, after script will be loaded
  // so we will not lose any data
  ga("create", "TAG_ID", "auto"); // use window.ga after script is loaded ? why do we need it to create ? to init new user with TAG_ID auto ?
  ga("send", "pageview"); // send first user event
</script>
<!-- End Google Analytics -->
