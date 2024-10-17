// rating start logic

const stars = document.querySelectorAll(".rooms__star");
const ratingValueDisplay = document.getElementById("rating-value");

stars.forEach((star) => {
  star.addEventListener("click", () => {
    const rating = star.getAttribute("data-value");

    // Mettre à jour l'affichage de la note
    ratingValueDisplay.textContent = `Note: ${rating}`;

    // Réinitialiser les étoiles
    stars.forEach((s) => s.classList.remove("selected"));

    // Ajouter la classe 'selected' aux étoiles sélectionnées
    for (let i = 0; i < rating; i++) {
      stars[i].classList.add("selected");
    }
  });
});

// horizontal slide

const slider = document.querySelector(".rooms__slider");
const leftArrow = document.querySelector(".rooms__arrow--left");
const rightArrow = document.querySelector(".rooms__arrow--right");

// Largeur d'une carte
const cardWidth = document.querySelector(".rooms__card").offsetWidth;

// Compteur pour le slide
let currentPosition = 0;

// Fonction pour slider vers la droite
rightArrow.addEventListener("click", () => {
  const maxScrollLeft = slider.scrollWidth - slider.clientWidth;
  if (currentPosition < maxScrollLeft) {
    currentPosition += cardWidth;
    slider.scrollTo({
      left: currentPosition,
      behavior: "smooth",
    });
  }
});

// Fonction pour slider vers la gauche
leftArrow.addEventListener("click", () => {
  if (currentPosition > 0) {
    currentPosition -= cardWidth;
    slider.scrollTo({
      left: currentPosition,
      behavior: "smooth",
    });
  }
});

// horizontale scroll room card

const sliderGalerie = document.querySelector(".galeries__slider");
const cards = sliderGalerie.querySelectorAll(".galeries__card");
let currentIndex = 0;
const totalCards = cards.length;

setInterval(() => {
  currentIndex = (currentIndex + 1) % totalCards; // Passe à la carte suivante
  const nextCard = cards[currentIndex];
  sliderGalerie.scrollTo({
    left: nextCard.offsetLeft, // Défile jusqu'à la position de la carte suivante
    behavior: "smooth", // Défilement doux
  });
}, 2000); // Intervalle de 2 secondes

const heroSection = document.querySelector(".hero");
const images = [
  "Assets/Images/banner-1.png",
  "Assets/Images/banner-2.png",
  "Assets/Images/banner-3.png",
];

// changeBackground heroSection

let currentIndexhero = 0;

function changeBackground() {
  // Change l'image de fond
  heroSection.style.backgroundImage = `url(${images[currentIndexhero]})`;

  // Passe à l'image suivante, et retourne au début si c'est la dernière
  currentIndexhero = (currentIndexhero + 1) % images.length;
}

// Change l'image toutes les 2 secondes
setInterval(changeBackground, 2000);
// Fonction pour récupérer les données des chambres
const chambres = [
  {
    nom: "Chambre 1",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    image: "Assets/Images/room-1.png",
    prix: "250 $",
    note: 5,
  },
  {
    nom: "Chambre 2",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    image: "Assets/Images/room-2.png",
    prix: "200 $",
    note: 4,
  },
  {
    nom: "Chambre 3",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    image: "Assets/Images/room-3.png",
    prix: "300 $",
    note: 4.5,
  },
];

const roomsContainer = document.querySelector(".rooms__slider");
const popup = document.getElementById("reservation-popup");
const closePopupBtn = document.getElementById("close-popup");
const confirmReservationBtn = document.getElementById("confirm-reservation");
const cancelReservationBtn = document.getElementById("cancel-reservation");

// Fonction pour générer les étoiles
function generateStars(note) {
  let stars = "";
  for (let i = 1; i <= 5; i++) {
    if (i <= note) {
      stars += `<img class="rooms__star" src="Assets/icon/Star-yellow.svg" alt="Étoile" data-value="${i}" />`;
    } else {
      stars += `<img class="rooms__star" src="Assets/icon/Star-gray.svg" alt="Étoile" data-value="${i}" />`;
    }
  }
  return stars;
}

// Fonction pour générer les cartes de chambres
function generateRoomCards() {
  roomsContainer.innerHTML = ""; // Efface le contenu HTML existant

  chambres.forEach((chambre) => {
    const roomCard = document.createElement("div");
    roomCard.classList.add("rooms__card");

    roomCard.innerHTML = `
            <div class="rooms__image-container">
                <img class="rooms__image" src="${chambre.image}" alt="${
      chambre.nom
    }" />
                <div class="rooms__content">
                    <h3 class="rooms__title">${chambre.nom}</h3>
                    <div class="rooms__rating">
                        ${generateStars(chambre.note)}
                    </div>
                    <div class="rooms__rating_value">Note: ${chambre.note}</div>
                </div>
            </div>
            <div class="rooms__description-container">
                <p class="rooms__description">${chambre.description}</p>
                <div class="rooms__button">
                    <button class="rooms__reserve-button">Réserver</button>
                    <div class="rooms__price">
                        <p class="rooms__price-value">${chambre.prix}</p>
                        <p class="rooms__price-text">par nuit</p>
                    </div>
                </div>
            </div>
        `;

    roomsContainer.appendChild(roomCard);

    // Ajout des événements de clic sur le bouton Réserver
    const reserveButton = roomCard.querySelector(".rooms__reserve-button");
    reserveButton.addEventListener("click", () => {
      // Stocker la chambre sélectionnée dans une variable
      popup.setAttribute("data-chambre-nom", chambre.nom); // Stocke le nom de la chambre dans le pop-up
      popup.style.display = "flex"; // Ouvrir le pop-up
    });

    // Ajout des événements de clic sur les étoiles pour la chambre
    const stars = roomCard.querySelectorAll(".rooms__star");
    const ratingValueDisplay = roomCard.querySelector(".rooms__rating_value");

    stars.forEach((star) => {
      star.addEventListener("click", () => {
        const rating = star.getAttribute("data-value");

        // Mettre à jour l'affichage de la note
        ratingValueDisplay.textContent = `Note: ${rating}`;

        // Réinitialiser les étoiles
        stars.forEach((s) => s.classList.remove("selected"));

        // Ajouter la classe 'selected' aux étoiles sélectionnées
        for (let i = 0; i < rating; i++) {
          stars[i].classList.add("selected");
        }
      });
    });
  });
}

// Fonction pour fermer le pop-up
function closePopup() {
  popup.style.display = "none"; // Fermer le pop-up
}

// Événements pour fermer le pop-up
closePopupBtn.addEventListener("click", closePopup);
cancelReservationBtn.addEventListener("click", closePopup);

// Événement pour confirmer la réservation
confirmReservationBtn.addEventListener("click", () => {
  const nom = document.getElementById("nom").value;
  const date = document.getElementById("date").value;
  const jours = document.getElementById("jours").value;
  const chambreNom = popup.getAttribute("data-chambre-nom"); // Récupérer le nom de la chambre sélectionnée

  if (nom && date && jours && chambreNom) {
    const message = `**Réservation confirmée !**\n\nCher(e) ${nom},\n\nNous avons le plaisir de vous confirmer votre réservation. Voici les détails de votre séjour :\n\n- **Chambre :** ${chambreNom}\n- **Date :** ${date}\n- **Durée :** ${jours} nuit(s)\n- **Prix total :** ${jours} nuit(s) à ${
      chambres.find((chambre) => chambre.nom === chambreNom).prix
    }.\n\nPour confirmer votre réservation, veuillez appeler le numéro **+243 800 000 000** et suivre les instructions.\n\nMerci de votre confiance et à très bientôt !`;

    // Vérifier si WhatsApp est disponible
    const isWhatsAppAvailable = confirm(
      "Avez-vous WhatsApp? Cliquez sur 'OK' pour envoyer via WhatsApp ou 'Annuler' pour envoyer par email."
    );

    if (isWhatsAppAvailable) {
      // Ouvrir WhatsApp avec le message pré-rempli
      const whatsappUrl = `https://wa.me/qr/S3TAFHLND3UHL1?text=${encodeURIComponent(
        message
      )}`;
      window.open(whatsappUrl, "_blank");
    } else {
      // Ouvrir le client de messagerie avec le message pré-rempli
      const email = "reservation@immokongo.com"; // Remplacez par l'adresse email souhaitée
      const subject = "Confirmation de Réservation";
      const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(
        subject
      )}&body=${encodeURIComponent(message)}`;
      window.open(mailtoLink, "_blank");
    }

    closePopup(); // Fermer le pop-up après confirmation
  } else {
    alert("Veuillez remplir tous les champs.");
  }
});

// Appel de la fonction pour générer les cartes de chambres
generateRoomCards();

// fonction pour localiser ou on est

document.addEventListener("DOMContentLoaded", function () {
  const links = document.querySelectorAll(".header__link");

  // Fonction pour définir la classe active en fonction de l'URL
  function setActiveLink() {
    const currentUrl = window.location.href;

    links.forEach((link) => {
      const linkUrl = link.href;

      // Vérifiez si l'URL du lien correspond à l'URL actuelle
      if (currentUrl === linkUrl) {
        link.parentElement.classList.add("active");
      } else {
        link.parentElement.classList.remove("active");
      }
    });
  }

  // Appeler la fonction pour définir l'état actif au chargement
  setActiveLink();

  // Écouter les clics sur les liens
  links.forEach((link) => {
    link.addEventListener("click", function () {
      // Supprimez la classe 'active' de tous les éléments
      links.forEach((item) => {
        item.parentElement.classList.remove("active");
      });

      // Ajoutez la classe 'active' à l'élément cliqué
      this.parentElement.classList.add("active");
    });
  });
});
