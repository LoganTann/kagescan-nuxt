<template>
    <CoreContainer>
        <div class="flex justify-evenly my-5 flex-wrap">
            <div class="flex-grow prose px-2 max-w-lg">
                <h1>Envie de rejoindre une communauté aussi morte qu'Ayano ?</h1>

                <p>"Kagerou Project Fr" est un serveur discord de taille moyenne, où vous pourrez :</p>
                <ul>
                    <li>Bénéficier de conseils si vous souhaitez découvrir et visionner la série</li>
                    <li>Être tenu aux courant des dernières nouvelles à propos de la série ou de notre commu</li>
                    <li>
                        Théoriser sur des pigeons, participer à un culte du redbeansoup ou tout simplement papoter de
                        choses moins informelles !
                    </li>
                    <li>Voire aller nous donner un coup de main pour nos fan-traductions et autres projets 😳 ??</li>
                </ul>

                <p>Si ça vous chauffe, cliquez sur le lien ci-dessous pour rejoindre le serveur.</p>

                <p class="text-center">
                    <CoreButton variant="large" to="https://discord.com/invite/7HZMAMhuaB" icon="fa-brands fa-discord">
                        Accéder au lien d'invitation
                    </CoreButton>
                </p>
            </div>
            <div class="p-4">
                <iframe
                    src="https://discord.com/widget?id=230405441845329930&theme=dark"
                    width="350"
                    height="500"
                    allowtransparency="true"
                    frameborder="0"
                    sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
                ></iframe>
            </div>
        </div>
    </CoreContainer>
</template>
<script setup lang="ts"></script>
