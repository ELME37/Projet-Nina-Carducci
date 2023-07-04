/**************************************************************************
 * Déclarations des variables
*************************************************************************/

    const filter = document.querySelector('.filter')
    const img_gallery = document.querySelectorAll('.gallery-item img')
    const galleryItems = document.querySelectorAll('.gallery-item')
    const container_item = document.querySelectorAll('.container_item')

 
   const images = document.querySelectorAll('img[data-index]');

   const lightbox = document.querySelector('.lightbox');
   const lightbox_container = document.querySelector('.lightbox_container')
   const lightboxImage = lightbox.querySelector('img');
   const prevButton = lightbox.querySelector('.lightbox_prev');
   const nextButton = lightbox.querySelector('.lightbox_next');

   let currentIndex = 0;

/**************************************************************************
 * Affichage des boutons de filtre
*************************************************************************/
function initFilterOnPageHome () {

    //Réinitilisation des filtres
    filter.innerHTML=""

     // Création du bouton "Tous" pour tous afficher
     const button_all = document.createElement('button')
     button_all.classList.add('button_filter')
     button_all.innerHTML = `<span>Tous</span>`

    filter.appendChild(button_all)

    // Affichage de tous les images au click du bouton Tous
    button_all.addEventListener('click', () => {
        for(let i = 0; i < img_gallery.length; i++) {
            container_item[i].classList.remove('inactif')
        }
    })

    // Extraction des tags uniques
    let uniqueTags = [];

    for (let i = 0; i < galleryItems.length; i++) {
        const galleryTag = galleryItems[i].dataset.galleryTag

        // Vérifier si la valeur du tag existe déjà dans le tableau uniqueTags
        if (uniqueTags.indexOf(galleryTag) === -1) {
            uniqueTags.push(galleryTag);
        }
    }

    // Tri par ordre alphabétique des filtres
    uniqueTags.sort()

    // Création des autres boutons pour filtrer
    for (let j = 0; j < uniqueTags.length; j++) {
        const button_filter = document.createElement('button')
        button_filter.classList.add('button_filter')
        button_filter.innerHTML = `<span>${uniqueTags[j]}</span>`

        filter.appendChild(button_filter)

         // Affichage des travaux selon le filtre
        button_filter.addEventListener('click', async () =>  {
            for (let i = 0; i < galleryItems.length; i++) {
            
                container_item[i].classList.remove('inactif')
                const galleryTag = galleryItems[i].dataset.galleryTag

                if (galleryTag !== uniqueTags[j]) {
                    container_item[i].classList.add('inactif')
                }
            } 
        })
    }

    // Gestion des couleurs des filtres
    button_filter = document.querySelectorAll('.button_filter')

    button_all.classList.add('actif')

    for (let active_button of button_filter) {
        active_button.addEventListener('click', () => {

            for (let inactive_button of button_filter) {
                inactive_button.classList.remove('actif')
            }

            active_button.classList.add('actif')
        })
    }
}

/**************************************************************************
 * Appel de la fonction initialisation des filtres au démarrage du site
*************************************************************************/
initFilterOnPageHome();

 // Parcourir les images pour récupéer le dataset
 images.forEach((image) => {
    image.addEventListener('click', () => {
      const index = parseInt(image.dataset.index);
      displayLightbox(index);
    });
  });
  
/**************************************************************************
 * Affichage de la lightbox avec l'image correspondante
*************************************************************************/
   function displayLightbox(index) {
     lightboxImage.src = images[index].src;
     currentIndex = index;
     lightbox.classList.add('active');
   }

/**************************************************************************
 * Affichage de l'image précédente
*************************************************************************/
   function displayPreviousImage() {
     currentIndex = (currentIndex - 1 + images.length) % images.length;
     displayLightbox(currentIndex);
   }

/**************************************************************************
 * Affichage de l'image suivante
*************************************************************************/
   function displayNextImage() {
     currentIndex = (currentIndex + 1) % images.length;
     displayLightbox(currentIndex);
   }

   // Click sur les boutons "Précédent" et "Suivant"
   prevButton.addEventListener('click', displayPreviousImage);
   nextButton.addEventListener('click', displayNextImage);

   /**************************************************************************
 * Fermeture de la lightbox
*************************************************************************/
   function closeLightbox() {
    lightbox.classList.remove('active');
  }

   // Fermeture de la lightbox lorsqu'on clique à l'extérieur de l'image
   lightbox.addEventListener('click', (event) => {
     if (event.target === lightbox || event.target === lightbox_container) {
       closeLightbox();
     }
   });