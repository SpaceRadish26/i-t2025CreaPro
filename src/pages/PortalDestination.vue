<script setup>
import { ref, onMounted, shallowRef } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import Seminars2ndYear from '../components/Seminars2ndYear.vue';
import Seminars3rdYear from '../components/Seminars3rdYear.vue';
import InnoPersGrowthComponent from "@/components/InnoPersGrowthComponent.vue";

const router = useRouter();
const route = useRoute();
const activityType = ref(route.params.activityType);
const currentComponent = shallowRef(null);

onMounted(() => {
  // Determine which component to load based on the route parameter
  switch (activityType.value) {
    case 'seminars-2nd-year':
      currentComponent.value = Seminars2ndYear;
      break;
    case 'seminars-3rd-year':
      currentComponent.value = Seminars3rdYear;
      break;
    case 'innovation-personal-growth':
      currentComponent.value = InnoPersGrowthComponent;
      break;
    default:
      // Handle invalid route parameter
      router.push('/activities');
      break;
  }
});

function goBack() {
  router.push('/activities');
}
function goToHome() {
  router.push('/');
}
</script>

<template>
  <div class="portal-destination">
    <header>
      <h1 class="fancy-title">Bestemming bereikt</h1>
    </header>

    <main>
      <component v-if="currentComponent" :is="currentComponent" />
      <div v-else class="loading">
        <p>Loading component...</p>
      </div>
    </main>
    <button class="back-button" @click="goBack">Terug naar selectiescherm</button>

  </div>
</template>

<style scoped>
.portal-destination {
  display: block;
  margin: auto;
  max-width: 1000px;
  margin: 0 auto;
  padding: 2rem;
  background-color: #1a1a1a;
  color: #e0e0e0;
  min-height: 100vh;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
}

header {
  display: flex;
  justify-content: center; /* Change from space-between to center */
  align-items: center;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid #333;
}

.fancy-title {
  color: #e0e0e0;
  margin: 0;
  font-size: 2.5rem;
  text-align: center;
  padding: 1rem 2rem; /* Added horizontal padding */
  position: relative;
  text-shadow: 0 0 10px rgba(170, 100, 220, 0.5);
  display: inline-block; /* Added this to make the border fit the text better */
}

.fancy-title::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border: 3px solid transparent;
  border-radius: 8px;
  animation: borderAnimation 8s linear infinite;
  pointer-events: none;
}

@keyframes borderAnimation {
  0% {
    border-color: rgba(100, 0, 170, 0.7);
    box-shadow: 0 0 15px rgba(100, 0, 170, 0.5);
  }
  25% {
    border-color: rgba(170, 0, 200, 0.7);
    box-shadow: 0 0 15px rgba(170, 0, 200, 0.5);
  }
  50% {
    border-color: rgba(140, 0, 240, 0.7);
    box-shadow: 0 0 15px rgba(140, 0, 240, 0.5);
  }
  75% {
    border-color: rgba(170, 0, 200, 0.7);
    box-shadow: 0 0 15px rgba(170, 0, 200, 0.5);
  }
  100% {
    border-color: rgba(100, 0, 170, 0.7);
    box-shadow: 0 0 15px rgba(100, 0, 170, 0.5);
  }
}

.back-button {
  display: block;
  margin: 2rem auto 0;
  background-color: #6a1b9a;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s, transform 0.2s;
}

.back-button:hover {
  background-color: #8e24aa;
  transform: translateY(-2px);
}

.loading {
  text-align: center;
  padding: 3rem;
  background-color: #2a2a2a;
  border-radius: 8px;
  color: #e0e0e0;
}
</style>