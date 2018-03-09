exports.config = {
  // See http://brunch.io/#documentation for docs.
  files: {
    javascripts: {
      joinTo: "js/app.js"

      // To use a separate vendor.js bundle, specify two files path
      // http://brunch.io/docs/config#-files-
      // joinTo: {
      //  "js/app.js": /^(web\/static\/js)/,
      //  "js/vendor.js": /^(web\/static\/vendor)|(deps)/
      // }
      //
      // To change the order of concatenation of files, explicitly mention here
      // order: {
      //   before: [
      //     "web/static/vendor/js/jquery-2.1.1.js",
      //     "web/static/vendor/js/bootstrap.min.js"
      //   ]
      // }
    },
    stylesheets: {
      joinTo: "css/app.css",
      order: {
        before: ["node_modules/uswds/dist/css/uswds.css", "node_modules/c3/c3.css", "web/static/css/uswds-bugfixes.scss"],
        after: ["web/static/css/app.scss"] // concat app.css last
      }
    },
    templates: {
      joinTo: "js/app.js"
    }
  },

  conventions: {
    // This option sets where we should place non-css and non-js assets in.
    // By default, we set this to "/web/static/assets". Files in this directory
    // will be copied to `paths.public`, which is "priv/static" by default.
    assets: /^(static)/,
    // Ignore uswds.min.css
    ignored: /\.min.css$/
  },

  // Phoenix paths configuration
  paths: {
    // Dependencies and current project directories to watch
    watched: [
      "node_modules/uswds/dist/css/",
      "node_modules/c3/c3.css",
      "static",
      "css",
      "js",
      "vendor"
    ],

    // Where to compile files to
    public: "../priv/static"
  },

  // Configure your plugins
  plugins: {
    babel: {
      presets: ['env', 'stage-1', 'react'],
      // Do not use ES6 compiler in vendor code
      ignore: [/vendor/]
    },
    replacement: {
      replacements: [{
        files: [/\.css$/],
        match: {find: '../img/', replace: '/images/'}
      }]
    }
  },

  modules: {
    autoRequire: {
      "js/app.js": ["js/app"]
    }
  },

  npm: {
    enabled: true
  }
};
