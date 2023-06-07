// For Nuxt 3
import { library, config } from "@fortawesome/fontawesome-svg-core";
import {
    faArrowLeft,
    faArrowRight,
    faBook,
    faChevronCircleRight,
    faChevronDown,
    faChevronLeft,
    faChevronUp,
    faCircleArrowLeft,
    faCirclePlay,
    faComment,
    faCompactDisc,
    faFire,
    faGear,
    faGlobe,
    faPenNib,
    faRecordVinyl,
    faArrowUpRightFromSquare,
    fas,
} from "@fortawesome/free-solid-svg-icons";
import {
    faCirclePlay as farCirclePlay,
    faComment as farComment,
    far,
    faStar as farStar,
} from "@fortawesome/free-regular-svg-icons";
import { fab, faTwitter, faYoutube, faInstagram, faDiscord } from "@fortawesome/free-brands-svg-icons";

// This is important, we are going to let Nuxt worry about the CSS
config.autoAddCss = false;

// You can add your icons directly in this plugin. See other examples for how you
// can add other styles or just individual icons.
library.add(fas, far, fab);

/* add icons to the library */
library.add(
    faArrowLeft,
    faArrowRight,
    faBook,
    faChevronCircleRight,
    faChevronDown,
    faChevronLeft,
    faChevronUp,
    faCircleArrowLeft,
    faCirclePlay,
    faComment,
    faCompactDisc,
    faDiscord,
    faFire,
    faGear,
    faGlobe,
    faInstagram,
    faPenNib,
    farCirclePlay,
    farComment,
    faRecordVinyl,
    farStar,
    faTwitter,
    faYoutube,
    faArrowUpRightFromSquare
);

export default defineNuxtPlugin(() => {
    // unused.
    // applied fix from https://github.com/FortAwesome/vue-fontawesome/issues/447#issuecomment-1476257130
});
