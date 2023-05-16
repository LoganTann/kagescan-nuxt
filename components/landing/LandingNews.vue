<template>
    <CoreContainer>
        <h2 class="pt-6 md:text-5xl text-3xl font-bold">Les dernières nouvelles</h2>
        <p class="pt-4">
            Pour être tenu des dernières infos à propos de notre site ou de la série Kagerou Project, rien de mieux que
            notre twitter !
        </p>

        <div class="flex mt-6">
            <iframe
                src="https://syndication.twitter.com/srv/timeline-profile/screen-name/kagescan_feed?dnt=true&embedId=twitter-widget-0&showHeader=false&showReplies=false&theme=light&transparent=false"
                class="w-full max-w-xl aspect-[6/5] m-auto outline-none"
            ></iframe>
        </div>
    </CoreContainer>
</template>
