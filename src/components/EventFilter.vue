<template>
<v-card id="event-filter">
    <v-layout row wrap>
        <v-flex xs12>
            <div>
                <h1 id="filter-title">Filters</h1>
            </div>

            <div class="section">
                <h3>Language</h3>
                <v-autocomplete xs6 :items="allLangs" v-model="languagesSpoken" chips multiple style="margin: 0px 10px 0px 10px" label="What languages do you speak?">
                    <template slot="selection" slot-scope="data">
                        <v-chip :selected="data.selected" close class="chip--select-multi">
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
                <v-text-field v-model="time.startTime" label="Start time" value="12:30:00" type="time" suffix="EST" required class="quarter-width"></v-text-field>
            </div>

            <div class="section">
                <v-text-field v-model="time.endTime" label="End time" value="12:30:00" type="time" suffix="EST" required class="quarter-width"></v-text-field>
            </div>

            <h3>Categories</h3>
            <v-select class="event-type" v-model="selectedCategories" :items="categories" chips multiple style="margin: 0px 10px 0px 10px">
                <template slot="selection" slot-scope="data">
                    <v-chip :selected="data.selected" close class="chip--select-multi">
                        {{ data.item }}
                    </v-chip>
                </template>
            </v-select>

            <v-btn id="search-btn" @click="filter()">Search</v-btn>
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
            this.setFilterApplied(true);

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

                // TODO: location (itinerary)

                // startDate, endDate
                let yourStartDate = this.date;
                let yourEndDate = this.date2;
                if (yourStartDate && yourEndDate){
                    let eventDate = this.events[e].date;
                    if (eventDate < yourStartDate || eventDate > yourEndDate) continue;
                }
                
                // selectedCategories: too strict?
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
            this.setFilters(this.filtered);
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
                startTime: "",
                endTime: "",
                startTimePm: false,
                endTimePm: false
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
                "Art",
                "Culture",
                "Food",
                "History",
                "Music",
                "Nightlife",
                "Outdoors",
                "Sports",
                "Tours",
                "Other"
            ],
            selectedCategories: [],
            users: []
        }
    },
    props: ['events', 'filtered', 'setFilterApplied', 'setFilters'],
    watch: {
        date(val) {
            this.startDateFormatted = this.formatDate(this.date);
        },
        date2(val) {
            this.endDateFormatted = this.formatDate(this.date2);
        }
    },
    mounted() {

    }
}
</script>

<style>
#event-filter {
    display: flex;
    flex-direction: column;
    margin: 20px 0px 20px 20px;
    height: 95%;
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
    margin: 100px 0px 0px 0px;
}

.section {
    margin: 20px 10px 30px 10px;
}
</style>