<template>
    <CoreContainer>
        <div class="flex justify-evenly my-5">
            <div class="flex-grow prose">
                <h1>Envie de rejoindre une communauté aussi morte qu'Ayano ?</h1>

                <p>"Kagerou Project Fr" est un serveur discord de taille moyenne, où vous pourrez :</p>
                <ul>
                    <li>Bénéficier de conseils si vous souhaitez découvrir et visionner la série</li>
                    <li>Être tenu aux courant des dernières nouvelles à propos de la série ou de notre commu</li>
                    <li>Donner un coup de main pour nos fan-traductions et autres projets 😳 ??</li>
                    <li>
                        Théoriser sur des pigeons, participer à un culte du redbeansoup ou tout simplement papoter de
                        choses moins informelles !
                    </li>
                </ul>

                <p>Ça vous chauffe ? Cliquez sur le lien ci-dessous pour rejoindre le serveur.</p>

                <CoreButton variant="large" to="https://discord.com/invite/7HZMAMhuaB">
                    Accéder au lien d'invitation
                </CoreButton>
            </div>
            <div>
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
