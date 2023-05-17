// For Nuxt 3
import { library, config } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { fas, faChevronDown, faChevronUp, faChevronLeft, faChevronCircleRight, faArrowRight, faArrowLeft, faCircleArrowLeft, faGear, faFire, faBook, faComment, faRecordVinyl, faCirclePlay } from "@fortawesome/free-solid-svg-icons";
import { far, } from "@fortawesome/free-regular-svg-icons";
import { fab, faTwitter, faYoutube, faInstagram, faDiscord } from "@fortawesome/free-brands-svg-icons";

// This is important, we are going to let Nuxt worry about the CSS
config.autoAddCss = false;

// You can add your icons directly in this plugin. See other examples for how you
// can add other styles or just individual icons.
library.add(fas, far, fab);

/* add icons to the library */
library.add(
    faArrowRight,
    faArrowLeft,
    faCircleArrowLeft,
    faGear,
    faFire,
    faBook,
    faComment,
    faRecordVinyl,
    faCirclePlay,
    faTwitter,
    faYoutube,
    faInstagram,
    faDiscord,
    faChevronDown,
    faChevronUp
);

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.component("font-awesome-icon", FontAwesomeIcon, {});
});


// <font-awesome-icon icon="fa-brands fa-twitter" />
// <font-awesome-icon icon="fa-brands fa-instagram" />
// <font-awesome-icon icon="fa-brands fa-discord" />
// <font-awesome-icon icon="fa-brands fa-youtube" />