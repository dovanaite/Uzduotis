const imageList = document.querySelector(".imagesList");
const buttonMoreImg = document.getElementById("moreImgBtn");
const previewImg = document.getElementById("imagePreview");
const imageInfo = document.getElementById("imageInfo");
const grayscaleFilter = document.getElementById("grayscaleFilter");
const grayscaleLabel = document.getElementById("grayscaleLabel");
const blurFilter = document.getElementById("blurFilter");
const blurLabel = document.getElementById("blurLabel");
const filtersDiv = document.querySelector(".filtersDiv");
const grayscaleDiv = document.getElementById("grayscaleDiv");
const blurDiv = document.getElementById("blurDiv");

let imageDataList = [];

//CALLING FETCH FUNCTION
getImage();

let currentItem;

//BUTTON FOR GETTING MORE IMAGES
buttonMoreImg.addEventListener("click", getImage);

//FETCH IMAGES FROM API FUNCTION
async function getImage() {
  const pageNumber = imageDataList.length / 10 + 1;
  const response = await fetch(
    `https://picsum.photos/v2/list?page=${pageNumber}&limit=10`
  );
  const result = await response.json();
  for (const singleItem of result) {
    imageDataList.push(singleItem);
    const imageTag = setImage(singleItem);

    imageTag.addEventListener("click", () => {
      showImageInfo(singleItem);
      currentItem = singleItem.download_url;
      removeHidden();
      filterConditions();

      //BIG IMAGE PROTECTED FROM SAVING
      previewImg.addEventListener("contextmenu", (e) => {
        e.preventDefault();
      });
    });

    //SMALL IMAGE PROTECTED FROM SAVING
    imageTag.addEventListener("contextmenu", (e) => {
      e.preventDefault();
    });
  }
}

function removeHidden() {
  filtersDiv.classList.remove("hidden");
  grayscaleDiv.classList.remove("hidden");
  blurDiv.classList.remove("hidden");
  blurFilter.classList.remove("hidden");
  grayscaleFilter.classList.remove("hidden");
}

//FILTERS FUNCIONALITY FOR BIG IMAGE
function filterConditions() {
  if (grayscaleFilter.checked === true) {
    previewImg.src = `${currentItem}?grayscale&blur=${blurFilter.value}`;
  } else {
    previewImg.src = `${currentItem}?blur=${blurFilter.value}`;
  }
}

//BLUR FILTER
blurFilter.addEventListener("change", () => {
  filterConditions();
});

//GRAYSCALE FILTER
grayscaleFilter.addEventListener("change", () => {
  filterConditions();
});

//FUNCTION FOR DISPLAYING SMALL IMAGES
function setImage(res) {
  img = document.createElement("img");
  img.classList.add("smallImg");
  imageList.appendChild(img);
  img.src = res.download_url;
  return img;
}

//FUNCTION FOR SHOWING INFO ABOUT AUTHOR, HEIGHT AND WIDTH
function showImageInfo(data) {
  imageInfo.innerText = `Author: ${data.author}, height: ${data.height} px, width: ${data.width} px`;
  // ${data.author}.classList.add("bold");
}
