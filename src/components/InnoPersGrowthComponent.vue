<script setup>
import { ref, reactive } from 'vue';

const activitiesInfo = [
  {
    type: "Innovatieroute",
    name: "Application Integration",
    description: "De twee applicaties waarmee IBM het meest werkt werden gedemonstreerd aan de hand van uitleg en een doe-het-zelf stappenplan.",
    location: "Elfde Liniestraat 25 – gebouw G",
    date: "24 Sep. - 8 Okt. 2024",
    time: "08:30 – 17:00 (elke Dinsdag)"
  },
  {
    type: "Hackathon",
    name: "Healthcare Innovation Challenge",
    description: "Een groep moest een mobiele applicatie maken met simpele spelletjes zoals \"klik 5 vissen\" of \"welke vorm is niet juist\", de andere groep een website om revalidatieprocessen simpeler te maken.",
    location: "Corda 7 – CC711",
    date: "10-11 Feb. 2024",
    time: "08:30 – 17:00"
  },
  {
    type: "Development",
    name: "Projectweek 2TIN",
    description: "Hier werd eerst meer uitleg gegeven over hoe het Research Project te werk ging gaan. Het 2e deel bestond uit gesprekken, workshops en een POP-sessie die te maken hadden met het functioneren in team en jezelf te ontwikkelen.",
    location: "Elfde Liniestraat 24 – Gebouw B",
    date: "12-16 Feb. 2024",
    time: "08:30 – 17:00"
  },
  {
    type: "POP Sessie",
    name: "Brein aan het werk! Niet storen!",
    description: "Deze sessie ging over hoe gevaarlijk een smartphone en technologie was en hoe we beter meer offline konden gaan. Ook werd kort besproken hoe triggers te vermijden.",
    location: "Elfde Liniestraat 24 – Gebouw B",
    date: "5 Mrt. 2024",
    time: "2 uur"
  },
  {
    type: "POP Sessie",
    name: "POPping",
    description: "Hierin werden je persoonlijke skills en talenten naar voor gebracht. Er werd gekeken naar je sterke punten en werkpunten, waarna we advies kregen hoe we konden verbeteren als persoon.",
    location: "Elfde Linie Campus – Gebouw B",
    date: "7 Mrt. 2024",
    time: "2 uur"
  },
  {
    type: "POP Sessie",
    name: "My Team and I",
    description: "Een sessie waarin meer geleerd werd over hoe je moet omgaan met problemen in teamverband. Ook werd het belang van communicatie aangehaald samen met vergevingsgezindheid.",
    location: "Corda 7 – CC711",
    date: "16 Okt. 2024",
    time: "2 uur"
  }
];


const activities = reactive(
    activitiesInfo.map(info => ({
      ...info,
      expanded: false
    }))
);


function toggleDetails(activity) {
  activity.expanded = !activity.expanded;
}
</script>

<template>
  <div class="inno-pers-container">
    <h2>Innovation & Personal Growth</h2>
    <p class="instruction">Hier staan alle pop-sessies, projectweek en innovatieroute.</p>

    <div class="activities-list" v-if="activities.length > 0">
      <div v-for="(activity, index) in activities"
           :key="index"
           class="activity-card"
           :class="{ 'expanded': activity.expanded }">

        <div class="activity-header" @click="toggleDetails(activity)">
          <div class="activity-type-badge">{{ activity.type }}</div>
          <h3>{{ activity.name }}</h3>
          <div class="expand-icon">{{ activity.expanded ? '▼' : '►' }}</div>
        </div>

        <div v-if="activity.expanded" class="activity-details">
          <p class="description">{{ activity.description }}</p>
          <div class="meta-info">
            <div class="location">
              <span class="icon">📍</span> {{ activity.location }}
            </div>
            <div class="datetime">
              <span class="icon">📅</span> {{ activity.date }}
              <span class="icon clock">🕒</span> {{ activity.time }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.inno-pers-container {
  background-color: #1f1f1f;
  color: #e0e0e0;
  padding: 2rem;
  border-radius: 8px;
  min-height: 500px;
}

h2 {
  color: #4CAF50; /* Green color theme for innovation */
  font-size: 2rem;
  margin-bottom: 1rem;
  text-align: center;
  font-family: sans-serif;
  text-shadow: 2px 2px #000;
}

.instruction {
  text-align: center;
  margin-bottom: 2rem;
  padding: 1rem;
  background-color: #2a2a2a;
  border-radius: 5px;
  border-left: 4px solid #4CAF50;
}

.activities-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.activity-card {
  background-color: #2a2a2a;
  border-radius: 8px;
  overflow: hidden;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
}

.activity-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.4);
}

.activity-header {
  padding: 1rem;
  display: flex;
  align-items: center;
  cursor: pointer;
  position: relative;
}

.activity-type-badge {
  background-color: #4CAF50;
  color: white;
  padding: 0.3rem 0.7rem;
  border-radius: 15px;
  font-size: 0.8rem;
  font-weight: bold;
  margin-right: 1rem;
  min-width: 80px;
  text-align: center;
}

.activity-header h3 {
  flex-grow: 1;
  margin: 0;
  font-size: 1.2rem;
  color: #e0e0e0;
}

.expand-icon {
  color: #4CAF50;
  font-size: 1rem;
  transition: transform 0.3s;
}

.expanded .expand-icon {
  transform: rotate(180deg);
}

.activity-details {
  padding: 0 1rem 1.5rem 1rem;
  animation: slideDown 0.3s ease;
}

.description {
  margin-bottom: 1rem;
  line-height: 1.6;
}

.meta-info {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1rem;
  background-color: rgba(0, 0, 0, 0.2);
  padding: 0.8rem;
  border-radius: 5px;
}

.location, .datetime {
  display: flex;
  align-items: center;
  font-size: 0.9rem;
}

.icon {
  margin-right: 0.5rem;
}

.clock {
  margin-left: 1rem;
}

.no-activities {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 300px;
}

.placeholder-content {
  background-color: #2a2a2a;
  border-radius: 8px;
  padding: 3rem;
  text-align: center;
  width: 100%;
  max-width: 600px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
}

.placeholder-icon {
  font-size: 4rem;
  margin-bottom: 1rem;
  animation: float 3s ease-in-out infinite;
}

.placeholder-content h3 {
  color: #4CAF50;
  font-size: 1.8rem;
  margin-bottom: 1rem;
}

.placeholder-info {
  color: #aaa;
  font-style: italic;
  margin-top: 1.5rem;
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes float {
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-15px);
  }
  100% {
    transform: translateY(0);
  }
}
</style>