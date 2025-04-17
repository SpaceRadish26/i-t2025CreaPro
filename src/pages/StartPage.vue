<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import RiddleComponent from "@/components/RiddleComponent.vue";

const router = useRouter();
const buttonPosition = ref({ x: 50, y: 50 });
const realButtonRef = ref(null);
const showRiddle = ref(false);
function showRiddleModal() {
  showRiddle.value = true;
}
function moveButton() {
  if (!realButtonRef.value) return;

  const buttonWidth = realButtonRef.value.offsetWidth;
  const buttonHeight = realButtonRef.value.offsetHeight;

  // Account for transform: translate(-50%, -50%) when calculating boundaries
  // Button needs to stay half its width from left/right edges
  // And half its height from top/bottom edges
  const minX = buttonWidth / 2 + 20;
  const maxX = window.innerWidth - buttonWidth / 2 - 700;
  const minY = buttonHeight / 2 + 20;
  const maxY = window.innerHeight - buttonHeight / 2 - 120;

  // Generate random position within safe boundaries
  const x = minX + Math.random() * (maxX - minX);
  const y = minY + Math.random() * (maxY - minY);

  buttonPosition.value = { x, y };
}

function navigateToActivities() {
  router.push('/activities');
}

onMounted(() => {
  // Set initial position in the center of the screen
  buttonPosition.value = {
    x: window.innerWidth / 2,
    y: window.innerHeight / 2
  };
});
</script>

<template>
  <div class="start-page">
    <h1 class="fancy-title">Welcome to Brecht's creative portfolio, filled with riddles & shenanigans</h1>

    <div class="buttons-container">
      <button class="fake-button" @click="showRiddleModal">Either solve this character quiz riddle</button>

      <button
          ref="realButtonRef"
          class="real-button"
          @mouseenter="moveButton"
          @click="navigateToActivities"
          :style="{
          left: buttonPosition.x + 'px',
          top: buttonPosition.y + 'px'
        }"
      >
        or find a way to get this button's link
      </button>
    </div>

    <RiddleComponent v-if="showRiddle"></RiddleComponent>
  </div>
</template>

<style scoped>
.start-page {
  text-align: center;
  padding: 2rem;
  width: 100%;
  height: 100vh;
  position: relative;
  background-color: #1a1a1a;
  color: #e0e0e0;
  max-width: 1000px;
  margin: 0 auto;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
}

.fancy-title {
  color: #e0e0e0;
  margin: 0 auto 2rem;
  font-size: 2rem;
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

.buttons-container {
  margin-top: 2rem;
  position: relative;
  height: 70vh;
  width: 100%;
}

button {
  padding: 12px 24px;
  font-size: 18px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin: 10px;
}

.fake-button {
  background-color: #6a1b9a;
  color: white;
  transition: background-color 0.3s, transform 0.2s;
}

.fake-button:hover {
  background-color: #8e24aa;
  transform: translateY(-2px);
}

.real-button {
  background-color: #f44336;
  color: white;
  position: absolute;
  transform: translate(-50%, -50%);
  z-index: 100;
  transition: background-color 0.3s;
}

.real-button:hover {
  background-color: #e53935;
}
</style>