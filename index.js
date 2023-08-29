import { photoData } from "./photo-data.js";

const tagRadios = document.getElementById("tag-radios");
const getImageBtn = document.getElementById("get-image-btn");

renderTagRadios(photoData);

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
            name="tags">
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
    console.log(tagArray);
    return tagArray;
}
