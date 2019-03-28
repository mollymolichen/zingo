<template>
<v-card id="event-filter">
    <v-layout row wrap>
        <v-flex xs12>
            <div>
                <h1>Filters</h1>
                <br>
            </div>
            <div>
                <h3>Language</h3>
                <!-- <v-checkbox v-model="selectedSchools" :label="schools[0]" :value="schools[0]"></v-checkbox>
                    <v-checkbox v-model="selectedSchools" :label="schools[1]" :value="schools[1]"></v-checkbox>
                    <v-checkbox v-model="selectedSchools" :label="schools[2]" :value="schools[2]"></v-checkbox>
                    <v-checkbox v-model="selectedSchools" :label="schools[3]" :value="schools[3]"></v-checkbox>
                    <v-checkbox v-model="selectedSchools" :label="schools[4]" :value="schools[4]"></v-checkbox>
                    <v-checkbox v-model="selectedSchools" :label="schools[5]" :value="schools[5]"></v-checkbox> -->
            </div>
        </v-flex>
    </v-layout>
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
    margin: 20px 0px 20px 20px;
    height: 49%;
    width: 90%;
    background-color: aliceblue !important;
    justify-content: left;
    /* align-items: left !important; */
    padding: 5px;
}
</style>
