<template>
<v-content class="eventcard">
    <link href="https://afeld.github.io/emoji-css/emoji.css" rel="stylesheet">
    <v-card class="event" v-if="!hide">
        <v-layout row wrap>
            <!--Profile picture-->
            <v-flex xs3>
                <router-link :to="{ name: 'Profile', params: { user: host, myProfile: false, backButtonEvents: true } }">
                    <v-avatar class="event-profile-pic">
                        <img :src="host.propicUrl">
                    </v-avatar>
                </router-link>
                <h1>{{host.firstName}}, {{host.age}} {{getFlag}}</h1>
                <h3>{{host.universityOrOccupation}}</h3>
                <v-icon v-if="!myOwnEvent" @click="expressInterest()" class="icon" :disabled="alreadyOnGuestList">favorite</v-icon>
                <v-icon v-if="!myOwnEvent" @click="openChat()" class="icon">chat_bubble</v-icon>
                <v-icon v-if="!myOwnEvent" @click="hideCard(true)" class="icon">cancel</v-icon>

                <!--If chat activated-->
                <beautiful-chat
                    :participants="participants"
                    :titleImageUrl="titleImageUrl"
                    :onMessageWasSent="onMessageWasSent"
                    :messageList="messageList"
                    :newMessagesCount="newMessagesCount"
                    :isOpen="isChatOpen"
                    :close="closeChat"
                    :icons="icons"
                    :open="openChat"
                    :showEmoji="true"
                    :showFile="true"
                    :showTypingIndicator="showTypingIndicator"
                    :colors="colors"
                    :alwaysScrollToBottom="alwaysScrollToBottom"
                    :messageStyling="messageStyling"
                    @onType="handleOnType"
                    @edit="editMessage" />
            </v-flex>

            <!--Event description-->
            <v-flex xs8>
                <h2>{{event.title}}</h2>
                <h4>{{event.dateFormatted}}, {{event.time.start}} {{amOrPm(event.time.startPm)}} - {{event.time.end}} {{amOrPm(event.time.endPm)}}</h4>
                <h4>{{event.location.locale}}, {{event.location.city}}</h4>
                <h4>{{event.shortDescription}}</h4>
                <v-btn v-if="!learnMore" @click="learnMore = true">Learn More...</v-btn>
                <p v-if="learnMore">{{event.longDescription}}</p>

                <!-- Event images -->
                <div class="event-photos">
                    <v-layout v-if="event.pics">
                        <v-layout v-for="p in event.pics" :key="p">
                            <v-flex>
                                <v-img :src="p" class="picture"></v-img>
                            </v-flex>
                        </v-layout>
                    </v-layout>
                    <v-layout v-else>
                        <v-layout>
                            <v-flex>
                                <img src="../assets/logo.png" class="picture"/>
                            </v-flex>
                        </v-layout>
                    </v-layout>
                </div>

                <!--Event categories-->
                <div id="categories">
                    <div v-for="category in event.categories" :key="category">
                        <span class="round-chip">
                            <i style="margin-right: 10px" :class=emoji[category]></i>
                            {{ category }}
                        </span>
                    </div>
                </div>
            </v-flex>

            <!--Edit button-->
            <v-flex xs1 v-if="this.host.uuid === this.user.uuid">
                <router-link :to="{ name: 'EditEvent', params: { user, event } }">
                    <v-icon class="edit-btn">edit</v-icon>
                </router-link>
            </v-flex>
        </v-layout>
    </v-card>
</v-content>
</template>

<script>
/* eslint-disable */
import {
    eventsRef,
    messagesRef
} from "../database.js";
import {
    getCountryCode
} from "../assets/countryCodes.js";
import flag from 'country-code-emoji';
import CloseIcon from 'vue-beautiful-chat/src/assets/close-icon.png'
import OpenIcon from 'vue-beautiful-chat/src/assets/logo-no-bg.svg'
import FileIcon from 'vue-beautiful-chat/src/assets/file.svg'
import CloseIconSvg from 'vue-beautiful-chat/src/assets/close.svg'

export default {
    name: 'EventCard',
    props: ['host', 'user', 'event', 'notInterested', 'messageMap'],
    data() {
        return {
            learnMore: false,
            myProfile: false,
            events: [],
            emoji: {
                "Art": "em em-art",
                "Culture": "em em-shinto_shrine",
                "Food": "em em-spaghetti",
                "History": "em em-european_castle",
                "Music": "em em-musical_note",
                "Nightlife": "em em-cocktail",
                "Outdoors": "em em-partly_sunny",
                "Sports": "em em-basketball",
                "Tours": "em em-scooter"
            },
            hide: false,

            // needed for chat
            icons: {
                open: {
                    img: OpenIcon,
                    name: 'default',
                },
                close: {
                    img: CloseIcon,
                    name: 'default',
                },
                file: {
                    img: FileIcon,
                    name: 'default',
                },
                closeSvg: {
                    img: CloseIconSvg,
                    name: 'default',
                },
            },
            
            participants: [],           // custom: only parsed when a conversation exists
            messageList: [],            // custom: list of messages between user and this event's host
            
            titleImageUrl: 'https://a.slack-edge.com/66f9/img/avatars-teams/ava_0001-34.png', // TODO: needs resizing
            newMessagesCount: 0,
            isChatOpen: false,          // to determine whether the chat window should be open or closed
            showTypingIndicator: '',    // when set to a value matching the participant.id it shows the typing indicator for the specific user
            colors: {
                header: {
                    bg: '#fce4ec',
                    text: '#222222'
                },
                launcher: {
                    bg: '#ef277c'
                },
                messageList: {
                    bg: '#f0f8ff'
                },
                sentMessage: {
                    bg: '#fce4ec',
                    text: '#222222'
                },
                receivedMessage: {
                    bg: '#eaeaea',
                    text: '#222222'
                },
                userInput: {
                    bg: '#a4dee8',
                    text: '#565867'
                }
            },                              // specifies the color scheme for the component
            alwaysScrollToBottom: false,    // when set to true always scrolls the chat to the bottom when new events are in (new message, user starts typing...)
            messageStyling: true            // enables *bold* /emph/ _underline_ and such (more info at github.com/mattezza/msgdown)
        }
    },
    methods: {
        expressInterest() {
            if (this.alreadyInterested) {
                return;
            }
            let interested = this.event.interested;
            if (!interested) {
                interested = [];
            }
            interested.push(this.user.uuid);
            eventsRef.child(this.event.eid).update({
                interested: interested
            });
        },

        // below methods are needed for chat
        sendMessage(text) {
            if (text.length > 0) {
                this.newMessagesCount = this.isChatOpen ? this.newMessagesCount : this.newMessagesCount + 1
                
                // adds message to this card's message list, gets deleted when refreshed
                this.onMessageWasSent({
                    type: 'text',               // only supports text for now
                    author: this.user.uuid,
                    data: {
                        text: text
                    }
                })
            }
        },

        onMessageWasSent(message) {
            // called when the user sends a message
            this.messageList = [...this.messageList, message]
        },

        openChat() {
            // called when the user clicks on the fab button to open the chat
            this.isChatOpen = true
            this.newMessagesCount = 0
        },

        closeChat() {
            // called when the user clicks on the botton to close the chat
            this.isChatOpen = false
        },

        handleScrollToTop() {
            // called when the user scrolls message list to top
            // leverage pagination for loading another page of messages
        },

        handleOnType() {
            console.log('Emit typing event')
        },

        editMessage(message) {
            const m = this.messageList.find(m => m.id === message.id);
            m.isEdited = true;
            m.data.text = message.data.text;
        },

        // customized methods for chat
        parseParticipants(){
            // get the two participants of a chat in obj form
            let participants = [];

            participants.push({
                id: this.user.uuid ? this.user.uuid : null,
                name: this.user.firstName ? this.user.firstName : null,
                imageUrl: this.user.propicUrl ? this.user.propicUrl : null
            });
            participants.push({
                id: this.host.uuid ? this.host.uuid : null,
                name: this.host.firstName ? this.host.firstName : null,
                imageUrl: this.host.propicUrl ? this.host.propicUrl : null
            });

            this.participants = participants;
        },

        parseMessageList(){
            // get list of all messages between user and this event's host
            // TODO: value goes under this.messageList, change to Promise
            console.log("hi");
            if (this.messageMap && this.user.uuid !== this.host.uuid){
                let key1 = [this.user.uuid, this.host.uuid];                // order in which this is entered is arbitrary
                let iter = this.messageMap.keys();
                let key2 = iter.next().value;
                while (key2){
                    if (key1.sort().join(',')=== key2.sort().join(',')){    // cond: [user1ID, user2ID] = [user2ID, user1ID], no duplicates
                        this.parseParticipants();
                        this.messageList = this.messageMap.get(key2);                  
                    }
                    key2 = iter.next().value;
                }
            } else {
                this.messageList = [];
            }
        },

        amOrPm(isPm){
             if (isPm) return "PM";
             else return "AM";
        }

    },
    computed: {
        myOwnEvent() {
            return this.user.uuid === this.host.uuid;
        },

        alreadyOnGuestList() {
            for (let g in this.event.interested) {
                // user already expressed interest in this event
                if (this.event.interested[g] === this.user.uuid) {
                    return true;
                }
            }
            for (let g in this.event.confirmed) {
                // user already confirmed to attend event
                if (this.event.confirmed[g] === this.user.uuid) {
                    return true;
                }
            }
            return false;
        },

        getFlag() {
            if (this.host.hometown.country) {
                let code = getCountryCode(this.host.hometown.country);
                return [code].map(flag)[0];
            }
        },

        hideCard(res) {
            this.hide = res;
            return res;
        }
    },

    firebase: {
        eventsRef: eventsRef,
        messagesRef: messagesRef
    },

    created(){
        this.parseMessageList();
    }
}
</script>

<style>
.eventcard {
    display: flex;
    flex-direction: column;
    margin: 20px 20px 20px 20px;
    width: 100%;
}

.event {
    padding: 20px;
    height: 50%;
    width: 100%;
    background-color: aliceblue !important;
    margin: auto;
    display: flex;
    flex-wrap: wrap;
    border-radius: 25px !important;
}

.picture {
    border-radius: 15px !important;
    height: 175px;
}

.event-profile-pic {
    display: flex;
    margin: 100px 30px 30px 100px;
    height: 150px !important;
    width: 150px !important;
    transform: scale(1.3, 1.3);
}

.icon {
    transform: scale(1.3, 1.3);
    margin: 5px 10px 5px 10px;
}

.edit-btn {
    transform: scale(1.2, 1.2);
    margin: 20px 5px 5px 5px;
}

#categories {
    display: flex;
    margin: 20px 0px 0px 20px;
}

.event-photos {
    display: flex;
    margin: 0px 0px 0px 20px;
}
</style>
