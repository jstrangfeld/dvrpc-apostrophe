var path = require("path");

var apos = require("apostrophe")({
  shortName: "dvrpc-apostrophe",
  baseUrl: "http://localhost:3000",

  // See lib/modules for basic project-level configuration of our modules
  // responsible for serving static assets, managing page templates and
  // configuring user acounts.

  modules: {
    // Apostrophe module configuration

    // Note: most configuration occurs in the respective
    // modules' directories. See lib/apostrophe-assets/index.js for an example.

    // However any modules that are not present by default in Apostrophe must at
    // least have a minimal configuration here: `moduleName: {}`

    // If a template is not found somewhere else, serve it from the top-level
    // `views/` folder of the project

    "apostrophe-templates": {
      viewsFolderFallback: path.join(__dirname, "views")
    },
    "apostrophe-db": {
      uri:
        "mongodb://dvrpc-apostrophe:dvrpc-apostrophe@ds023664.mlab.com:23664/dvrpc-apostrophe"
    },
    "apostrophe-headless": {

    },
    "apostrophe-pages": {
      restApi: true
    },
    "apostrophe-passport": {
      strategies: [
        {
          // google login via openauth
          // You must npm install --save this module in your project first
          module: "passport-google-oauth20",
          // Default is to match usernames, google has none, so match on emails
          match: "email",
          // IMPORTANT: accept only users with an email address at our company
          emailDomain: "dvrpc.org",
          options: {
            // options for passport-google-oauth20, see the documentation of
            // that module, you do not have to set callbackURL
            clientID:
              "66977152663-ernllph5ls2lako1keli0l88a5f7eo5o.apps.googleusercontent.com",
            clientSecret: "QVgvausqKYEgtRBnjvW7S_px"
          },
          // Options that must be passed to the authenticate middleware
          authenticate: {
            // minimum scopes for matching logins based on email addresses.
            // profile is absolutely required, you almost certainly want email too
            scope: ["profile", "email"]
          }
        }
      ],
      // Presence of "create" key means we'll create users on the fly
      create: {
        // Presence of "group" means we'll add them to a group...
        group: {
          // Called "google"...
          title: "google",
          // With these Apostrophe permissions (admin can do ANYTHING, so be careful)
          permissions: ["admin"]
        }
      }
    },
    "apostrophe-users": {},
    "apostrophe-workflow": {
      // IMPORTANT: if you follow the examples below,
      // be sure to set this so the templates work
      alias: "workflow"
    }
  }
});
