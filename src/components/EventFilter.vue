<template>
<v-card id="event-filter" v-if="user">
    <v-layout row wrap>
        <v-flex xs12>
            <div>
                <h1 id="filter-title">Filters</h1>
            </div>

            <div class="section">
                <h3>Language</h3>
                <v-autocomplete xs6 :items="allLangs" v-model="languagesSpoken" chips multiple style="margin: 0px 10px 0px 10px" label="What languages do you speak?">
                    <template slot="selection" slot-scope="data">
                        <v-chip :selected="data.selected" close class="chip--select-multi" @input="removeLang(data.item)">
                            {{ data.item }}
                        </v-chip>
                    </template>
                </v-autocomplete>
            </div>

            <div class="section">
                <h3>Date range</h3>
                <v-menu ref="menu1" v-model="menu1" :close-on-content-click="false" :nudge-right="40" lazy transition="scale-transition" offset-y full-width>
                    <template v-slot:activator="{ on }">
                        <v-text-field v-model="startDateFormatted" label="Date" hint="MM/DD/YYYY format" persistent-hint prepend-icon="event" @blur="date = parseDate(startDateFormatted)" v-on="on" :rules="startDateRules"></v-text-field>
                    </template>
                    <v-date-picker v-model="date" no-title @input="menu1 = false"></v-date-picker>
                </v-menu>
            </div>

            <div class="section">
                <v-menu ref="menu2" v-model="menu2" :close-on-content-click="false" :nudge-right="40" lazy transition="scale-transition" offset-y full-width>
                    <template v-slot:activator="{ on }">
                        <v-text-field v-model="endDateFormatted" label="Date" hint="MM/DD/YYYY format" persistent-hint prepend-icon="event" @blur="date2 = parseDate(endDateFormatted)" v-on="on" :rules="endDateRules"></v-text-field>
                    </template>
                    <v-date-picker v-model="date2" no-title @input="menu2 = false"></v-date-picker>
                </v-menu>
            </div>
            <br>

            <h3>Time range</h3>
            <div class="section">
                <v-text-field v-model="time.start" label="Start time" value="12:30:00" type="time" suffix="EST" required class="quarter-width"></v-text-field>
            </div>

            <div class="section">
                <v-text-field v-model="time.end" label="End time" value="12:30:00" type="time" suffix="EST" required class="quarter-width"></v-text-field>
            </div>

            <h3>Categories</h3>
            <v-select class="event-type" v-model="selectedCategories" :items="categories" chips multiple style="margin: 0px 10px 0px 10px">
                <template slot="selection" slot-scope="data">
                    <v-chip :selected="data.selected" close class="chip--select-multi" @input="removeCategory(data.item)">
                        {{ data.item }}
                    </v-chip>
                </template>
            </v-select>

            <v-btn id="search-btn" @click="filter()">Search</v-btn>
            <v-btn id="search-btn" @click="clearFilters()">Clear</v-btn>
        </v-flex>
    </v-layout>
</v-card>
</template>

<script>
/*eslint-disable*/
import { allLangs } from "../assets/languages.js";
import { usersRef } from "../database.js";

export default {
    name: 'EventFilter',
    methods: {
        formatDate(date) {
            if (!date) {
                return null;
            }
            const [year, month, day] = date.split('-');
            return `${month}/${day}/${year}`;
        },

        parseDate(date) {
            if (!date) {
                return null;
            }
            const [month, day, year] = date.split('/');
            return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
        },

        // contingent on which filters are filled out, may need null check
        // 5 checks: host speaks same language, same location, date falls w/i range, time falls w/i range, categories w/i range
        filter(){
            this.filtered = [];

            for (let e in this.events){
                // reset
                let langInCommon = false;
                let categoryInCommon = false;

                // languagesSpoken
                if (this.languagesSpoken.length){
                    for (let l in this.languagesSpoken){
                        let lang = this.languagesSpoken[l];
                        let hostID = this.events[e].host;
                        let hostLangs = this.getHostLang(hostID);
                        if (hostLangs && hostLangs.indexOf(lang) != -1){
                            langInCommon = true;
                            break;
                        }
                    }
                    if (!langInCommon) continue;
                }

                // TODO: location (itinerary), not used for MVP since not enough events/locations

                // startDate, endDate
                let yourStartDate = this.date;
                let yourEndDate = this.date2;
                if (yourStartDate && yourEndDate){
                    let eventDate = this.events[e].date;
                    if (eventDate < yourStartDate || eventDate > yourEndDate) continue;
                }

                // start, end
                let yourStartTime = this.time.start;
                let yourEndTime = this.time.end;
                let eventStartTime = this.events[e].time.start;
                let eventEndTime = this.events[e].time.end;
                if (yourStartTime && (eventStartTime < yourStartTime)) continue;
                if (yourEndTime && (eventEndTime > yourEndTime)) continue;
                
                // selectedCategories
                if (this.selectedCategories.length){
                    for (let s in this.selectedCategories){
                        let category = this.selectedCategories[s];
                        let eventCategories = this.events[e].categories;
                        if (eventCategories && eventCategories.indexOf(category) != -1){
                            categoryInCommon = true;
                            break;
                        }
                    }
                    if (!categoryInCommon) continue;
                }

                // passes all filters
                this.filtered.push(this.events[e]);
            }
            console.log(this.filtered);
            this.setEvents(this.filtered);      // this.events = this.filtered;
        },

        getHostLang(hostID){
            this.getUsers();

            for (let u in this.users){
                if (this.users[u].uuid === hostID){
                    return this.users[u].languagesSpoken;
                }
            }
        },

        getUsers() {
            let allUsers = null;
            usersRef.on("value", function (snapshot) {
                allUsers = snapshot.val();
            });
            for (let u in allUsers) {
                this.users.push(allUsers[u]);
            }
        },

        removeLang(item) {
            if (this.languagesSpoken){
                this.languagesSpoken.splice(this.languagesSpoken.indexOf(item), 1);
                this.languagesSpoken = [...this.languagesSpoken];
            }
        },

        removeCategory(item) {
            if (this.selectedCategories){
                this.selectedCategories.splice(this.selectedCategories.indexOf(item), 1);
                this.selectedCategories = [...this.selectedCategories];
            }
        },

        clearFilters(){
            this.startDateFormatted = this.formatDate(new Date().toISOString().substr(0, 10));      // back to current date
            this.endDateFormatted = this.formatDate(new Date().toISOString().substr(0, 10));
            this.time.start = "";
            this.time.end = "";

            for (let lang in this.languagesSpoken){
                this.removeLang(this.languagesSpoken[lang]);
            }
            for (let category in this.selectedCategories){
                this.removeCategory(this.selectedCategories[category]);
            }
        }
    },
    data() {
        return {
            allLangs: allLangs,
            languagesSpoken: [],

            // date and time
            date: new Date().toISOString().substr(0, 10),
            date2: new Date().toISOString().substr(0, 10),
            startDateFormatted: this.formatDate(new Date().toISOString().substr(0, 10)),
            endDateFormatted: this.formatDate(new Date().toISOString().substr(0, 10)),
            time: {
                start: "",
                end: "",
                startFormatted: "",
                endFormatted: ""
            },
            menu1: false,
            menu2: false,
            startDateRules: [
                v => v > date2 || "Start date must be before end date"
            ],
            endDateRules: [
                v => v < date || "End date must be after start date"
            ],
            categories: [
               "🎨 Art",
                "⛩ Culture",
                "🍝 Food",
                "🏰 History",
                "🎵 Music",
                "🍸 Nightlife",
                "⛅ Outdoors",
                "🏀 Sports"
            ],
            selectedCategories: [],
            users: []
        }
    },
    props: ['events', 'filtered', 'user', 'setEvents'],
    watch: {
        date(val) {
            this.startDateFormatted = this.formatDate(this.date);
        },
        date2(val) {
            this.endDateFormatted = this.formatDate(this.date2);
        }
    }
}
</script>

<style>
#event-filter {
    display: flex;
    flex-direction: column;
    margin: 20px 0px 20px 20px;
    height: 99.5%;
    width: 90%;
    background-color: aliceblue !important;
    justify-content: left;
    padding: 5px;
    border-radius: 25px !important;
}

#filter-title {
    margin: 15px 0px 15px 0px;
}

#search-btn {
    margin: 100px 10px 0px 10px;
}

.section {
    margin: 20px 10px 30px 10px;
}
</style>