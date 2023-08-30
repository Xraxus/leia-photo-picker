import { photoData } from "./photo-data.js";

const tagRadios = document.getElementById("tag-radios");
const getImageBtn = document.getElementById("get-image-btn");
const photoModal = document.getElementById("photo-modal");
const photoModalInner = document.getElementById("photo-modal-inner");
const controlsContainer = document.getElementById("controls-container");

tagRadios.addEventListener("change", highlightCheckedOption);
getImageBtn.addEventListener("click", renderDogPhoto);
controlsContainer.addEventListener("submit", function (e) {
    // To stop form from refreshing on submit
    e.preventDefault();
});

document.addEventListener("click", function (event) {
    if (
        event.target != photoModal &&
        event.target != getImageBtn &&
        !photoModal.contains(event.target)
    ) {
        closePhotoModal();
    }
});

function highlightCheckedOption(event) {
    const radios = document.getElementsByClassName("radio");
    for (let radio of radios) radio.classList.remove("highlight");
    document
        .getElementById(event.target.id)
        .parentElement.classList.add("highlight");
}

function closePhotoModal() {
    photoModal.style.display = "none";
}

function renderDogPhoto() {
    const photoObject = getSinglePhoto();
    photoModalInner.innerHTML = `
        <img 
        class="dog-img"
        src="./img/${photoObject.image}"
        alt="${photoObject.alt}"
        >
    `;
    photoModal.style.display = "flex";
}

function getSinglePhoto() {
    const photoArray = getMatchingPhotosArray();

    if (photoArray.length === 1) {
        return photoArray[0];
    } else {
        return photoArray[Math.floor(Math.random() * photoArray.length)];
    }
}

function getMatchingPhotosArray() {
    const selectedTag = document.querySelector(
        'input[type="radio"]:checked'
    ).value;

    const matchingPhotoArray = photoData.filter(function (photo) {
        return photo.tags.includes(selectedTag);
    });

    return matchingPhotoArray;
}

function renderTagRadios(photoData) {
    let radioItemsHTML = ``;
    const tags = getTagArray(photoData);
    for (let tag of tags) {
        radioItemsHTML += `
            <div class="radio">
                <label for="${tag}">${tag}</label>
                <input 
                type="radio"
                id="${tag}"
                value="${tag}"
                name="tags"
                required>
                </div>
                `;
    }

    tagRadios.innerHTML = radioItemsHTML;
}

function getTagArray(photoData) {
    const tagArray = [];
    for (let photo of photoData) {
        for (let tag of photo.tags) {
            if (!tagArray.includes(tag)) tagArray.push(tag);
        }
    }
    return tagArray;
}

renderTagRadios(photoData);
