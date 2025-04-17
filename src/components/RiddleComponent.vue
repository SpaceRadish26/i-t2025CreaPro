<script setup>
import {ref, reactive, onMounted} from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const isOpen = ref(true);
const showHint = ref(false);
const attempts = ref(0);
const errorMessage = ref('');
const isLoading = ref(true);
const characters = [
  {
    file:"the_riddler.png",
    hint: "A famous character from Batman known for his riddles.",
    alternateAnswers: ["riddler", "the riddler", "edward nigma", "edward nygma"]
  },
  {
    file:"cloud_strife.jpg",
    hint: "A character from Final Fantasy VII, known for his spiky hair and Buster Sword.",
    alternateAnswers: ["cloud", "cloud strife"]

  },
  {
    file: "tifa_lockhart.png",
    hint: "A character from Final Fantasy VII, known for her martial arts skills and bond with Cloud.",
    alternateAnswers: ["tifa", "tifa lockhart"]
  },
  {
    file: "rubeus_hagrid.jpg",
    hint: "A half-giant character from the Harry Potter series, known for his love of magical creatures.",
    alternateAnswers: ["hagrid", "rubeus hagrid"]
  },
  {
    file: "luna_snow.png",
    hint: "A korean pop star character from Marvel Comics, known for her ice powers and songs.",
    alternateAnswers: ["luna", "luna snow"]
  },
  {
    file: "hoshimi_miyabi.png",
    hint: "A character from the game 'Zenless Zone Zero', known for being a silly fox void hunter.",
    alternateAnswers: ["miyabi", "hoshimi miyabi"]
  }
]

const riddle = reactive({
  question: "Who is the following character?",
  answer: "",
  hint: "",
  image: "",
  alternateAnswers: []
});

const userAnswer = ref('');

function getRandomCharacter() {
  const randomIndex = Math.floor(Math.random() * characters.length);
  const character = characters[randomIndex];

  riddle.hint= character.hint;
  riddle.image = `${import.meta.env.BASE_URL}${character.file}`
  riddle.answer = character.file.split('.')[0].replace(/_/g, ' ');

  isLoading.value= false;
  console.log(riddle.image);
}


function checkAnswer() {
  const normalizedAnswer = userAnswer.value.trim().toLowerCase();

  if (normalizedAnswer === riddle.answer || riddle.alternateAnswers.includes(normalizedAnswer)) {
    isOpen.value = false;
    router.push('/activities');
  } else {
    attempts.value++;
    errorMessage.value = `Incorrect answer. Try again! (Attempt ${attempts.value})`;

    // Show hint after 3 failed attempts
    if (attempts.value >= 3 && !showHint.value) {
      showHint.value = true;
    }
  }
}

function handleKeyDown(event) {
  if (event.key === 'Enter') {
    checkAnswer();
  }
}

onMounted(() => {
  getRandomCharacter();
});
</script>

<template>
  <div v-if="isOpen" class="riddle-modal">
    <div class="riddle-container">
      <h2>Solve the Riddle to Continue</h2>

      <div class="riddle-question">
        <p>{{ riddle.question }}</p>
      </div>

      <div v-if="isLoading" class="loading">
        <p>Loading character image...</p>
      </div>

      <div v-else class="character-image">
        <img :src="riddle.image" alt="Mystery character" />
      </div>

      <div class="answer-input">
        <input
            type="text"
            v-model="userAnswer"
            placeholder="Your answer..."
            @keydown="handleKeyDown"
            autofocus
        />
        <button @click="checkAnswer">Submit</button>
      </div>

      <div v-if="errorMessage" class="error-message">
        {{ errorMessage }}
      </div>

      <div v-if="showHint" class="hint">
        <p><strong>Hint:</strong> {{ riddle.hint }}</p>
      </div>

      <div class="riddle-info">
        <p>You must identify this character to continue to the activities page.</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.riddle-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.85);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.riddle-container {
  background-color: #1f1f1f;
  border-radius: 10px;
  box-shadow: 0 0 20px rgba(255, 255, 255, 0.3);
  padding: 2rem;
  max-width: 500px;
  width: 90%;
  text-align: center;
  color: #e0e0e0;
  animation: fadeIn 0.5s ease-out;
}

h2 {
  color: #4CAF50;
  margin-top: 0;
  margin-bottom: 1.5rem;
  font-size: 1.8rem;
}

.riddle-question {
  font-size: 1.2rem;
  margin-bottom: 1.5rem;
  font-style: italic;
  line-height: 1.6;
  background-color: #2a2a2a;
  padding: 1rem;
  border-radius: 8px;
  border-left: 4px solid #4CAF50;
}

.character-image {
  margin-bottom: 1.5rem;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 0 15px rgba(76, 175, 80, 0.4);
  max-height: 55vh; /* 55% of viewport height */
  display: flex;
  justify-content: center;
  align-items: center;
}

.character-image img {
  max-width: 100%;
  display: block;
}

.loading {
  padding: 2rem;
  margin-bottom: 1.5rem;
  background-color: #2a2a2a;
  border-radius: 8px;
}

.answer-input {
  margin-bottom: 1.5rem;
  display: flex;
  gap: 10px;
}

.answer-input input {
  flex: 1;
  padding: 12px;
  font-size: 16px;
  border: 1px solid #444;
  background-color: #333;
  color: #fff;
  border-radius: 5px;
}

.answer-input button {
  padding: 12px 20px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.2s;
}

.answer-input button:hover {
  background-color: #3e8e41;
}

.error-message {
  color: #f44336;
  margin-bottom: 1rem;
  font-weight: bold;
}

.hint {
  background-color: #2d3748;
  padding: 1rem;
  border-radius: 5px;
  margin-bottom: 1.5rem;
  border-left: 4px solid #718096;
  text-align: left;
}

.riddle-info {
  font-size: 0.9rem;
  opacity: 0.7;
  margin-top: 1.5rem;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-20px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>