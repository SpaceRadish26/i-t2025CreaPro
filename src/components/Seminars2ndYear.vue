<script setup>
import { ref, reactive } from 'vue';

// List of seminar information
const seminarInfo = [
  {
    title: "Seminarie CBTW/Positive Thinking",
    date: "27 Feb. 2024 10:00 - 12:00",
    description: "Een bondige uitleg over hoe bepaalde patronen in designs ons kunnen helpen een robuuste en toekomstbestendige oplossing te creëren.",
    location: "Digital PXL – G414",
    ore: "diamond_ore",
    correctAnswer: "Diamond Ore",
    image: `${import.meta.env.BASE_URL}diamond_ore.jpg`
  },
  {
    title: "Seminarie Cegeka: The challenge of Open Source",
    date: "23 Apr. 2024 09:00 – 11:00",
    description: "Hierin werd verteld over hoe het bedrijf omging met het Open Source initiatief, wat het inhield, en hoe belangrijk dit is voor programmeurs onderling.",
    location: "Digital PXL – G412a",
    ore: "gold_ore",
    correctAnswer: "Gold Ore",
    image: `${import.meta.env.BASE_URL}gold_ore.jpg`
  },
  {
    title: "Seminarie Uncanny",
    date: "12 Mrt. 2024 08:30 – 12:00",
    description: "Een inleiding tot AI-tools om foto's te genereren met een bijhorende demonstratie en extra uitleg over het aanpassen van parameters en bronnen om de AI te manipuleren.",
    location: "Digital PXL – G414",
    ore: "emerald_ore",
    correctAnswer: "Emerald Ore",
    image: `${import.meta.env.BASE_URL}emerald_ore.jpg`
  },
  {
    title: "Seminarie Kabisa",
    date: "14 Mei 2024 09:00 – 12:00",
    description: "In dit seminarie werd dieper ingegaan op de veiligheidsrisico's van AI, en hoe een LLM onderliggend werkt.",
    location: "Digital PXL – G414",
    ore: "redstone_ore",
    correctAnswer: "Redstone Ore",
    image: `${import.meta.env.BASE_URL}redstone_ore.jpg`
  }
];

// List of ore options for dropdown
const oreOptions = [
  "Diamond Ore",
  "Gold Ore",
  "Emerald Ore",
  "Redstone Ore",
  "Lapis Ore",
  "Coal Ore",
  "Iron Ore",
  "Copper Ore"
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
    <h2>Second Year Seminars</h2>
    <p class="instruction">Click on the ore blocks and identify the correct ore to reveal seminar information!</p>

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
            <h4>What Minecraft ore is this?</h4>
            <button class="close-btn" @click="seminar.showSelection = false">×</button>
          </div>

          <div class="selection-form">
            <select v-model="seminar.selectedOre" class="ore-dropdown">
              <option value="" disabled>Select an ore</option>
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
  </div>
</template>

<style scoped>
.incorrect-attempt {
  position: fixed;  /* Changed from absolute to fixed to center on the entire screen */
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;  /* Higher z-index to appear above everything */
  animation: fadeIn 0.3s ease-out;
}

.red-cross {
  color: #f44336;
  font-size: 6rem;  /* Larger font size */
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
  color: #4CAF50;
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
  border-left: 4px solid #4CAF50;
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
  color: #4CAF50;
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
  color: #8bc34a;
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

.incorrect-attempt {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  animation: fadeIn 0.3s ease-out;
}

.cross {
  color: #f44336;
  font-size: 3rem;
  margin-bottom: 0.5rem;
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
  color: #4CAF50;
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
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: bold;
  transition: background-color 0.2s;
}

.submit-btn:hover {
  background-color: #3e8e41;
}

.submit-btn:disabled {
  background-color: #555;
  cursor: not-allowed;
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