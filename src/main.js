import "./styles/main.pcss";
if (process.env.NODE_ENV === "development") {
  require("file-loader!./index.pug");
}

import "./pug/components/skills/skills";
import "./pug/components/reviews/reviews";
