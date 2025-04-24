<script setup>
import { ref, reactive } from 'vue';


const seminarInfo = [
  {
    title: "Seminarie Cegeka: Enterprise Architecture",
    date: "20 Nov. 2024 13:30-17:30",
    description: "Hierin werd uitgelegd wat Enterprise Architecture nu juist inhoudt, en hoe Cegeka dit als bedrijf toepast binnen hun IT-consultancy context.",
    location: "Corda 7 – CC712",
    ore: "ancient_debris",
    correctAnswer: "Ancient Debris",
    image: `${import.meta.env.BASE_URL}ancient_debris.jpg`
  },
  {
    title: "Seminarie Inetum: AI Chatbots",
    date: "4 Dec. 2024 13:30 – 17:30",
    description: "Hierin werd getoond hoe we met behulp van Copiloot Studio onze eigen AI-chatbots konden maken en verschillende parameters instellen om zo hun gedrag te personaliseren.",
    location: "Corda 7 – CC712",
    ore: "nether_quartz_ore",
    correctAnswer: "Nether Quartz Ore",
    image: `${import.meta.env.BASE_URL}nether_quartz_ore.jpg`
  },
  {
    title: "Seminarie IBM: Quantum Computing",
    date: "6 Nov. 2024 13:15 – 16:00",
    description: "In dit seminarie werd de aandacht gevestigd op het gebruik van Quantum Computing technieken samen met AI en \"prompt engineering\".",
    location: "Corda 7 – CC712",
    ore: "deepslate_diamond_ore",
    correctAnswer: "Deepslate Diamond Ore",
    image: `${import.meta.env.BASE_URL}deepslate_diamond_ore.jpg`
  },
  {
    title: "Seminarie nocomputer: Prompt Engineering",
    date: "23 Okt. 2024 13:30 – 17:30",
    description: "In dit seminarie werd kort uitgelegd hoe \"prompt engineering\" werkt en hoe LLM's in elkaar zitten, samen met de ecologische impact die het gebruik ervan heeft op onze planeet.",
    location: "Corda 7 – CC714",
    ore: "nether_gold_ore",
    correctAnswer: "Nether Gold Ore",
    image: `${import.meta.env.BASE_URL}nether_gold_ore.jpg`
  }
];


const oreOptions = [
  "Ancient Debris",
  "Nether Gold Ore",
  "Nether Quartz Ore",
  "Deepslate Diamond Ore",
  "Deepslate Emerald Ore",
  "Deepslate Lapis Ore",
  "Deepslate Iron Ore",
  "Deepslate Coal Ore"
];

// Reactive state
const seminars = reactive(
    seminarInfo.map(info => ({
      ...info,
      revealed: false,
      showSelection: false,
      incorrectAttempt: false,
      selectedOre: ""
    }))
);

// Show selection for a seminar
function showSelection(seminar) {
  // Reset any other open selections
  seminars.forEach(s => {
    if (s !== seminar) {
      s.showSelection = false;
    }
  });

  seminar.showSelection = true;
  seminar.incorrectAttempt = false;
  seminar.selectedOre = ""; // Reset selection
}

// Check answer
function checkAnswer(seminar) {
  if (seminar.selectedOre === seminar.correctAnswer) {
    // Correct answer
    seminar.revealed = true;
    seminar.showSelection = false;

    // Play success sound
    const audio = new Audio('/sounds/mining_success.mp3');
    audio.play();
  } else {
    // Wrong answer - show a red cross in the middle of the screen
    seminar.incorrectAttempt = true;
    seminar.showSelection = false;  // Hide the selection popup

    // Hide incorrect notification after 2 seconds
    setTimeout(() => {
      seminar.incorrectAttempt = false;
      seminar.showSelection = true;  // Show selection popup again
    }, 2000);
  }
}
</script>

<template>
  <div class="seminars-container">
    <h2>Third Year Seminars</h2>
    <p class="instruction">Kies de juiste erts die overeen komt met de foto om de gegevens te onthullen!</p>

    <ul class="seminars-list">
      <li v-for="(seminar, index) in seminars" :key="index" class="seminar-item">
        <!-- Revealed seminar info -->
        <div v-if="seminar.revealed" class="seminar-info">
          <h3>{{ seminar.title }}</h3>
          <div class="seminar-details">
            <span class="date">{{ seminar.date }}</span>
            <span class="location">{{ seminar.location }}</span>
            <p>{{ seminar.description }}</p>
          </div>
        </div>

        <div v-else class="ore-block" @click="showSelection(seminar)">
          <img :src="seminar.image" :alt="seminar.ore" />
          <div v-if="seminar.incorrectAttempt" class="incorrect-attempt">
            <div class="red-cross">✖</div>
          </div>
        </div>

        <!-- Ore selection popup -->
        <div v-if="seminar.showSelection" class="ore-selection">
          <div class="ore-header">
            <h4>Welke Minecraft erts is dit?</h4>
            <button class="close-btn" @click="seminar.showSelection = false">×</button>
          </div>

          <div class="selection-form">
            <select v-model="seminar.selectedOre" class="ore-dropdown">
              <option value="" disabled>Kies een optie</option>
              <option v-for="option in oreOptions" :key="option" :value="option">
                {{ option }}
              </option>
            </select>

            <button
                class="submit-btn"
                @click="checkAnswer(seminar)"
                :disabled="!seminar.selectedOre"
            >
              Mine
            </button>
          </div>
        </div>
      </li>
    </ul>

    <!-- Placeholder message when no seminars are available -->
    <div v-if="seminars.length === 0" class="no-seminars">
      <p>Iets ging grandioos mis!</p>
      <div class="placeholder-ores">
        <img src="/ancient_debris.jpg" alt="Ancient Debris" class="placeholder-ore" />
        <img src="/nether_quartz_ore.jpg" alt="Nether Quartz Ore" class="placeholder-ore" />
        <img src="/deepslate_diamond_ore.jpg" alt="Deepslate Diamond Ore" class="placeholder-ore" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.incorrect-attempt {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  animation: fadeIn 0.3s ease-out;
}

.red-cross {
  color: #f44336;
  font-size: 6rem;
  animation: pulse 0.5s infinite alternate;
  text-shadow: 0 0 10px rgba(255, 0, 0, 0.7);
}

@keyframes pulse {
  from { transform: scale(1); }
  to { transform: scale(1.2); }
}

.seminars-container {
  background-color: #1f1f1f;
  color: #e0e0e0;
  padding: 2rem;
  border-radius: 8px;
  min-height: 500px;
}

h2 {
  color: #FF9800; /* Changed to orange to distinguish from 2nd year */
  font-size: 2rem;
  margin-bottom: 1rem;
  text-align: center;
  font-family: 'Minecraft', sans-serif;
  text-shadow: 2px 2px #000;
}

.instruction {
  text-align: center;
  margin-bottom: 2rem;
  padding: 1rem;
  background-color: #2a2a2a;
  border-radius: 5px;
  border-left: 4px solid #FF9800; /* Changed to match header */
}

.seminars-list {
  list-style: none;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
}

.seminar-item {
  position: relative;
  min-height: 200px;
  background-color: #2a2a2a;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
  transition: transform 0.2s, box-shadow 0.2s;
}

.seminar-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.4);
}

.seminar-info {
  padding: 1.5rem;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.seminar-info h3 {
  color: #FF9800;
  margin-top: 0;
  margin-bottom: 1rem;
  font-size: 1.3rem;
}

.seminar-details {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

.date {
  display: inline-block;
  background-color: #333;
  color: #ffcc00;
  padding: 0.3rem 0.6rem;
  border-radius: 4px;
  font-size: 0.9rem;
  margin-bottom: 1rem;
}

.location {
  display: inline-block;
  background-color: #3b3b3b;
  color: #FF9800;
  padding: 0.3rem 0.6rem;
  border-radius: 4px;
  font-size: 0.9rem;
  margin-bottom: 1rem;
  margin-left: 0.5rem;
}

.ore-block {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  background-color: #333;
  position: relative;
  min-height: 200px;
}

.ore-block img {
  max-width: 100%;
  max-height: 100%;
  transition: transform 0.2s;
}

.ore-block:hover img {
  transform: scale(1.05);
}

.ore-selection {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #333;
  border: 2px solid #555;
  border-radius: 8px;
  padding: 1.5rem;
  z-index: 10;
  width: 300px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.7);
  animation: scaleIn 0.2s ease-out;
}

.ore-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.ore-header h4 {
  margin: 0;
  color: #FF9800;
}

.close-btn {
  background: none;
  border: none;
  color: #ccc;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0;
  line-height: 1;
}

.selection-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.ore-dropdown {
  padding: 0.8rem;
  background-color: #2a2a2a;
  color: #e0e0e0;
  border: 1px solid #555;
  border-radius: 4px;
  width: 100%;
  font-size: 1rem;
}

.submit-btn {
  padding: 0.8rem;
  background-color: #FF9800;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: bold;
  transition: background-color 0.2s;
}

.submit-btn:hover {
  background-color: #F57C00;
}

.submit-btn:disabled {
  background-color: #555;
  cursor: not-allowed;
}

/* Styles for placeholder when no seminars are available */
.no-seminars {
  text-align: center;
  padding: 3rem;
  background-color: #2a2a2a;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
}

.placeholder-ores {
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-top: 2rem;
}

.placeholder-ore {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
  transition: transform 0.3s ease;
}

.placeholder-ore:hover {
  transform: scale(1.1);
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes scaleIn {
  from { transform: translate(-50%, -50%) scale(0.9); opacity: 0; }
  to { transform: translate(-50%, -50%) scale(1); opacity: 1; }
}
</style>