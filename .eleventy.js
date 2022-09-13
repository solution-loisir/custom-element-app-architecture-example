const schedule = require("./shortcodes/schedule");

module.exports = (config) => {
  config.addPassthroughCopy("script");
  config.addPairedShortcode('schedule', schedule);

  return {
    dir: {
      input: "src",
      output: "_site"
    },
    markdownTemplateEngine: "njk",
    templateFormats: ["njk", "md"]
  };
};