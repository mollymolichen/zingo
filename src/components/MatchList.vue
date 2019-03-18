<script>

export default {
    methods: {
            matchScore(match){
                totalScore = 0;
            
                // filter by itinerary
                let itinerary = match.itinerary;	// list or {} obj
                let destInCommon = false;
                for (let i in itinerary){
                let matchStartDate = itinerary[i].startDate;
                let matchEndDate = itinerary[i].endDate;
                let yourStartDate = user.itinerary[i].startDate;
                let yourEndDate = user.itinerary[i].endDate;
                if (user.itinerary[i].city.indexOf(itinerary[i].city) != -1){
                    if (matchStartDate <= yourEndDate && matchEndDate >= yourStartDate){
                        destInCommon = true;
                    }
                    }
                }å
                if (!destInCommon){
                return 0;
                }
            
                // filter by language
                let languages = match.languages;	// list or {} obj
                let langInCommon = false;
                for (let l in languages){
                    if (user.languages.indexOf(languages[l]) != -1){
                        langInCommon = true;
                    }
                }
                if (!langInCommon){
                return 0;
                }
            
                // 30% fav activities
                let activities = match.selectedActivities;
                let activitiesInCommon = 0;
                for (let a in activities){
                    if (user.selectedActivities.indexOf(activities[a]) != -1){
                        activitiesInCommon++;
                    }
                }
                let activitiesFrac = activitiesInCommon / activities.length;
                totalScore += activitiesFrac * 0.3;
            
                // 20% lifestyle
                ifestyle;
                let lifestyleInCommon = 0;
                for (let l in lifestyle){
                    if (user.selectedLifestyle.indexOf(lifestyle[l] != -1)){
                        lifestyleInCommon++;
                    } 
                }
                let lifestyleFrac = lifestyleInCommon / lifestyle.length;
                totalScore += lifestyleFrac * 0.2;
                
                // 15% age
                let ageFrac = (18 - (age - user.age)) / 18;
                totalScore += ageFrac * 0.15;
                
                
                // 10% university
                if (match.university === user.university){
                totalScore += 0.1;
                }
            
                // 5% country
                if (match.hometown.country === user.hometown.country){
                totalScore += 0.05;
                }
            
                // 5% city
                if (match.hometown.city === user.hometown.city){
                totalScore += 0.05;
                }
            
                // 5% accommodation (if they decide to room together later on in the trip)
                let accomodationInCommon = 0;
                for (let a in accomodation){
                    if (user.selectedAccomodation.indexOf(accomodation[a] != -1){
                        accomodationInCommon++;
                    } 
                }
                let accomodationFrac = accomodationInCommon / accomodation.length;
                totalScore += accomodationFrac * 0.05;
                    
                // 5% transportation
                let transportationInCommon = 0;
                for (let t in transportation){
                    if (user.selectedTransportation.indexOf(transportation[t] != -1)){
                        transportationInCommon++;
                    } 
                }
                let transportationFrac = transportationInCommon / transportation.length;
                totalScore += transportationFrac * 0.05;
                    
                // 5% occupation
                if (match.occupation && user.occupation){
                    if (match.occupation === user.occupation){
                        totalScore += 0.05;
                    }
                }
                
                return totalScore;		// might need to multiply to scale up
            }
        }
    }
</script>