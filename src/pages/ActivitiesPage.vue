<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const selectedActivity = ref('');
const activities = [
  'Seminars 2nd year (minigame)',
  'Seminars 3rd year (minigame)',
  'Innovation & Personal Growth'
];

const showPortal = ref(false);

const destinationRoute = computed(() => {
  switch (selectedActivity.value) {
    case 'Seminars 2nd year (minigame)':
      return '/destination/seminars-2nd-year';
    case 'Seminars 3rd year (minigame)':
      return '/destination/seminars-3rd-year';
    case 'Project & POP-sessions':
      return '/destination/project-pop';
    case 'Innovation & Personal Growth':
      return '/destination/innovation-personal-growth';
    case 'Detailed Reports':
      return '/destination/detailed-reports';
    default:
      return '';
  }
});

function selectActivity() {
  if (selectedActivity.value) {
    showPortal.value = true;
    // Automatically navigate after showing portal for 2 seconds
    setTimeout(() => {
      router.push(destinationRoute.value);
    }, 2000);
  }
}

function goToHome() {
  router.push('/');
}
</script>

<template>
  <div class="activities-page">
    <h1 class="fancy-title">Welke activiteit wil je meer over weten?</h1>

    <div class="dropdown-container">
      <select v-model="selectedActivity">
        <option value="" disabled>Kies een optie</option>
        <option v-for="activity in activities" :key="activity" :value="activity">
          {{ activity }}
        </option>
      </select>

      <button @click="selectActivity" :disabled="!selectedActivity" class="select-btn">
        Teleporteer
      </button>
      <button class="select-btn" @click="goToHome">Terug</button>

      <div v-if="showPortal" class="portal-container">
        <div class="portal">
          <img src="/mcportal.gif" alt="Portal" class="portal-image" />
          <div class="portal-text">Entering {{ selectedActivity }}...</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.activities-page {
  text-align: center;
  padding: 2rem;
  max-width: 800px;
  margin: 0 auto;
  background-color: #1a1a1a;
  color: #e0e0e0;
  min-height: 100vh;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
  border-radius: 8px;
}

.fancy-title {
  color: #e0e0e0;
  margin: 0 auto 2rem;
  font-size: 2.5rem;
  text-align: center;
  padding: 1rem 2rem;
  position: relative;
  text-shadow: 0 0 10px rgba(170, 100, 220, 0.5);
  display: inline-block;
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

.dropdown-container {
  margin-top: 2rem;
  position: relative;
}

select {
  padding: 12px;
  font-size: 16px;
  border: 1px solid #555;
  border-radius: 5px;
  width: 300px;
  max-width: 100%;
  margin-bottom: 1rem;
  background-color: #2a2a2a;
  color: #e0e0e0;
}

.select-btn {
  padding: 12px 24px;
  font-size: 16px;
  background-color: #6a1b9a;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  display: block;
  margin: 1rem auto;
  transition: background-color 0.3s, transform 0.2s;
}

.select-btn:hover:not(:disabled) {
  background-color: #8e24aa;
  transform: translateY(-2px);
}

.select-btn:disabled {
  background-color: #3a3a3a;
  cursor: default;
}

.portal-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 100;
}

.portal {
  position: relative;
  max-width: 80%;
  max-height: 80%;
  animation: pulse 2s infinite;
  display: flex;
  justify-content: center;
  align-items: center;
}

.portal-image {
  max-width: 100%;
  max-height: 100%;
  border-radius: 50%;
  box-shadow: 0 0 30px #9c27b0;
  display: block;
  margin: 0;
}

.portal-text {
  position: absolute;
  bottom: -40px;
  left: 0;
  right: 0;
  text-align: center;
  color: white;
  font-size: 24px;
  font-weight: bold;
  text-shadow: 0 0 10px rgba(170, 100, 220, 0.8);
}

@keyframes pulse {
  0% {
    transform: scale(0.95);
    box-shadow: 0 0 0 0 rgba(138, 43, 226, 0.7);
  }

  70% {
    transform: scale(1);
    box-shadow: 0 0 0 20px rgba(138, 43, 226, 0);
  }

  100% {
    transform: scale(0.95);
    box-shadow: 0 0 0 0 rgba(138, 43, 226, 0);
  }
}
</style>