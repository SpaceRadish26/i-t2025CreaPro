<script setup>
import { ref } from 'vue';
import router from "@/util/router.js";

// You can replace this with your actual profile image path
const profileImage = `${import.meta.env.BASE_URL}mezelf.jpg`;
const navigateToMainPage = () => {
  // Logic to navigate back to the main page
  router.push('/')
};
</script>

<template>
  <div class="about-me-container">
    <button @click="navigateToMainPage">Terug</button>
    <h2>About Me</h2>

    <div class="profile-picture-container">
      <img :src="profileImage" alt="Profile picture" class="profile-picture" />
    </div>

    <div class="cards-container">
      <!-- Top wide card -->
      <div class="card wide-card">
        <div class="card-content">
          <h3>Wie ben ik?</h3>
          <p>
            Mijn naam is Brecht De Weyer, ik studeer Toegepaste informatica met als afstudeerrichting Applicatieontwikkeling
            aan de hogeschool PXL.  Ik ben 20 jaar oud en zit in mijn laatste jaar. Een van mijn interesses is het ontwikkelen van
            kleine mods voor games omdat hier veel uit bij te leren valt, zeker omdat je hier met veel onregelmatigheden rekening
            moet houden. Ik blijf graag op de hoogte van nieuwe technologie en ontwikkelingen binnen de IT & Robotica sector. Tijdens
            het ontwikkelen en programmeren vind ik zowel het theoretische "waarom?" als het praktische "hoe?" aspect even belangrijk.
          </p>
        </div>
      </div>

      <!-- Bottom cards -->
      <div class="cards-row">
        <div class="card">
          <div class="card-content">
            <h3>Mijn Ambities</h3>
            <p>
              Mijn eerste ambitie was om software te maken waarvan ik weet dat het effectief gebruikt én geapprecieerd wordt. Die waardering motiveert me enorm om telkens opnieuw topkwaliteit af te leveren. Het geeft me een sterk gevoel van voldoening wanneer ik zie dat wat ik maak echt een verschil kan betekenen in iemands leven of werk. Tijdens mijn stage kreeg ik de kans om dit in de praktijk te ervaren: ik werkte nauw samen met studenten uit ontwikkelings- en conflictgebieden, die mijn tool effectief gebruikten en regelmatig terugkoppeling gaven.
              Daarnaast blijft de oorlogsscheepvaartsector me intrigeren. De complexe infrastructuur, de interactie tussen systemen en de precisie die nodig is om een schip veilig en efficiënt te besturen, prikkelen mijn nieuwsgierigheid. Het lijkt me boeiend om ooit ook op dat vlak iets bij te kunnen dragen met software.
            </p>
          </div>
        </div>

        <div class="card">
          <div class="card-content">
            <h3>Mijn Competenties</h3>
            <p>
              Tijdens POP-sessies in het tweede opleidingsjaar kwamen mijn sterke logische en analytische vaardigheden naar voren via proeven en zelfkennistests. In soortgelijke sessies van de projectweek in het 2e opleidingsjaar werden deze kwaliteiten dan bevestigd door middel van proeven en zelfkennistests. Bij het IT-project werden deze vaardigheden op de proef gesteld toen we samenzaten met een niet-technisch ingesteld team van architectuur, en we de vereisten moesten analyseren en vertalen naar wat mogelijk was, hoeveel tijd het nodig zou hebben en of het paste binnen ons totaalplaatje.
              Naast mijn individuele technische kwaliteiten heb ik ook op sociaal vlak stappen gezet. In de afgelopen drie jaar heb ik bovendien ook geleerd minder passief te zijn. Discussiëren over een implementatie, zelf de werkverdeling opstellen en mensen aansporen om te beginnen zijn hier voorbeelden van. Deze eigenschap heb ik aangeleerd doorheen de verscheidene groepsprojecten over de jaren en in extracurriculaire activiteiten.
              De resultaten van de Thalento-test kwamen niet overeen met mijn zelfbeeld en de feedback van mijn teamgenoten.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.about-me-container {
  background-color: #1f1f1f;
  color: #e0e0e0;
  padding: 2rem;
  border-radius: 8px;
  min-height: 500px;
  font-family: sans-serif;
}

h2 {
  color: #4f79ff; /* Blue theme for About Me */
  font-size: 2rem;
  margin-bottom: 1.5rem;
  text-align: center;
  text-shadow: 2px 2px #000;
}

.profile-picture-container {
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
}

.profile-picture {
  width: 180px;
  height: 180px;
  border-radius: 50%;
  object-fit: cover;
  box-shadow: 0 0 20px rgba(79, 121, 255, 0.5);
  border: 4px solid #2a2a2a;
}

.cards-container {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.cards-row {
  display: flex;
  gap: 1.5rem;
}

.card {
  background-color: #2a2a2a;
  border-radius: 8px;
  flex: 1;
  overflow: hidden;
  position: relative;
}

.card::before {
  content: "";
  position: absolute;
  top: -2px;
  left: -2px;
  right: -2px;
  bottom: -2px;
  background: linear-gradient(
      45deg,
      #ff0000,
      #ff7300,
      #fffb00,
      #48ff00,
      #00ffd5,
      #002bff,
      #7a00ff,
      #ff00c8,
      #ff0000
  );
  z-index: -1;
  animation: rotate 3s linear infinite;
  border-radius: 10px;
}

.wide-card {
  width: 100%;
}

.card-content {
  background-color: #2a2a2a;
  margin: 2px;
  padding: 1.5rem;
  border-radius: 6px;
  height: calc(100% - 4px);
}

.card h3 {
  color: #4f79ff;
  margin-top: 0;
  margin-bottom: 1rem;
  font-size: 1.4rem;
}

.card p {
  line-height: 1.6;
}

.card ul {
  padding-left: 1.2rem;
  line-height: 1.6;
}

.card li {
  margin-bottom: 0.5rem;
}

@keyframes rotate {
  0% {
    background-position: 0% 0%;
  }
  100% {
    background-position: 300% 0%;
  }
}

/* Responsive styles */
@media (max-width: 768px) {
  .cards-row {
    flex-direction: column;
  }
}
</style>