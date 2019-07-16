import "./styles/main.pcss";
if (process.env.NODE_ENV === "development") {
  require("file-loader!./index.pug");
}

import "./pug/components/skills/skills";
import "./pug/components/reviews/reviews";
import "./pug/components/form-feedback/form-feedback";
import "./pug/components/slider-works/slider-works";
import "./scripts/scene-parallax";
import "./scripts/drum-parallax";
import "./scripts/menu";
