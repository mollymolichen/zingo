<template>
<v-card id="event-filter">
    <v-container grid-list-md text-xs-center>
        <v-layout row wrap>
            <v-flex xs12>
                <div id="matches-filter">
                    <h1>Filters</h1>
                </div>
                <div id="matches-filter">
                    <h3>School</h3>
                    <!-- <v-checkbox v-model="selectedSchools" :label="schools[0]" :value="schools[0]"></v-checkbox>
                        <v-checkbox v-model="selectedSchools" :label="schools[1]" :value="schools[1]"></v-checkbox>
                        <v-checkbox v-model="selectedSchools" :label="schools[2]" :value="schools[2]"></v-checkbox>
                        <v-checkbox v-model="selectedSchools" :label="schools[3]" :value="schools[3]"></v-checkbox>
                        <v-checkbox v-model="selectedSchools" :label="schools[4]" :value="schools[4]"></v-checkbox>
                        <v-checkbox v-model="selectedSchools" :label="schools[5]" :value="schools[5]"></v-checkbox> -->
                </div>
            </v-flex>
        </v-layout>
    </v-container>
</v-card>
</template>

<script>
/*eslint-enable*/
export default {
    name: 'EventFilter',
    data() {
        return {

        }
    }
}
</script>

<style>
#event-filter {
	display: flex;
	flex-direction: column;
	height: 100%;
	width: 20%;
	background-color: aliceblue !important;
}

#matches-filter {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: left;
    padding: 5px;
    text-align: left;
}
</style>
