// DOM Elements
const universityList = document.getElementById("university-list");
const locationFilter = document.getElementById("location");
const tuitionFilter = document.getElementById("tuition");
const ieltsFilter = document.getElementById("ielts");
const filterBtn = document.getElementById("filterBtn");

let universities = [];

// Function to render university cards
function renderUniversities(data) {
  universityList.innerHTML = "";
  if (data.length === 0) {
    universityList.innerHTML = `<p class="text-white/70  text-3xl p-5 col-span-full text-center">No universities match your criteria.</p>`;
    return;
  }

  data.forEach((university) => {
    const card = document.createElement("div");
    card.className =
      "border-2 border-white/70 p-4 rounded-lg shadow backdrop-blur-sm flex flex-col h-full";
    card.innerHTML = `
    <div class="h-40 mb-4">
      <img src="${university.image}" alt="${university.name}" class="w-full h-full object-contain rounded-md">
    </div>
    <h2 class="text-white text-xl font-semibold mb-2">${university.name}</h2>
    <div class="flex-grow overflow-y-auto mb-4">
      <p class="text-sm text-white/70 mb-1"><strong>Location:</strong> ${university.location}</p>
      <p class="text-sm text-white/70 mb-1"><strong>Tuition Fees:</strong> £${university.tuition}</p>
      <p class="text-sm text-white/70 mb-1"><strong>IELTS Requirement:</strong> ${university.ielts}</p>
      <p class="text-sm text-white/70 mb-1"><strong>Student Satisfaction:</strong> ${university.satisfaction}%</p>
      <p class="text-sm text-white/70 mb-1"><strong>Ranking:</strong> ${university.ranking}</p>
    </div>
  `;
    universityList.appendChild(card);
  });
}
// Function to filter universities based on selected criteria
function filterUniversities() {
  const selectedLocation = locationFilter.value;
  const maxTuition = parseFloat(tuitionFilter.value);
  const minIELTS = parseFloat(ieltsFilter.value);

  let filtered = universities;

  if (selectedLocation) {
    filtered = filtered.filter((u) => u.location === selectedLocation);
  }

  if (!isNaN(maxTuition)) {
    filtered = filtered.filter((u) => u.tuition <= maxTuition);
  }

  if (!isNaN(minIELTS)) {
    filtered = filtered.filter((u) => u.ielts >= minIELTS);
  }

  renderUniversities(filtered);
}

// Load university data from JSON file
fetch("assets/js/unis.json")
  .then((response) => response.json())
  .then((data) => {
    universities = data;
    renderUniversities(universities); // show all initially
  })
  .catch((error) => console.error("Error loading university data:", error));

// Button event listener
filterBtn.addEventListener("click", filterUniversities);
