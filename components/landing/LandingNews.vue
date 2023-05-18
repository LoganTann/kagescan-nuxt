<template>
    <CoreContainer>
        <h2 class="pt-6 md:text-5xl text-3xl font-bold">Les dernières nouvelles</h2>
        <p class="pt-4">Nous avons remplacé notre écran de news par un joli fil twitter.</p>

        <div class="flex mt-6 flex-wrap">
            <iframe
                src="https://syndication.twitter.com/srv/timeline-profile/screen-name/kagescan_feed?dnt=true&embedId=twitter-widget-0&showHeader=false&showReplies=false&theme=light&transparent=true&maxHeight=470px"
                class="w-full max-w-xl h-[480px] m-auto outline-none"
                scrolling="no"
            ></iframe>
            <div class="w-[360]"></div>
        </div>
    </CoreContainer>
</template>
