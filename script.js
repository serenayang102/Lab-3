// The three images (the same files are reused in both stories)
const IMAGES = {
  late:     { src: "media/late.png",     alt: "late to work." },
  scream:     { src: "media/AH.png",     alt: "screaming." },
  crash: { src: "media/crash.png", alt: "car crash." }
};

// Each story is an ordered list of steps: which image, and what it means in that order.
const STORIES = {
  carCrash: [
    { image: "crash",     stage: "Beginning", text: "Mary gets into a car crash on her way to work." },
    { image: "scream",     stage: "Middle",    text: "It is so scary, she screams" },
    { image: "late", stage: "End",       text: "Mary is late for work, and her boss is angry." }
  ],
  fired: [
    { image: "late",     stage: "Beginning", text: "Mary is late for work because she got stuck in traffic." },
    { image: "scream", stage: "Middle",    text: "Mary is crashing out because her boss fires her." },
    { image: "crash",     stage: "End",       text: "Mary gets road rage and crashes." }
  ]
};

// State
let currentStory = "carCrash";
let currentStep = 0;

// Elements
const sceneEl = document.getElementById("scene");
const stageEl = document.getElementById("stage");
const captionEl = document.getElementById("caption");
const dotsEl = document.getElementById("dots");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const storyBtns = document.querySelectorAll(".story-btn");

// Draw the current step: image, caption, progress dots, button states
function render() {
  const steps = STORIES[currentStory];
  const step = steps[currentStep];
  const img = IMAGES[step.image];

  sceneEl.classList.add("fading");
  setTimeout(() => {
    sceneEl.src = img.src;
    sceneEl.alt = img.alt;
    sceneEl.classList.remove("fading");
  }, 150);

  stageEl.textContent = step.stage;
  captionEl.textContent = step.text;

  dotsEl.innerHTML = "";
  steps.forEach((_, i) => {
    const dot = document.createElement("li");
    if (i === currentStep) dot.classList.add("on");
    dotsEl.appendChild(dot);
  });

  prevBtn.disabled = currentStep === 0;
  nextBtn.textContent = currentStep === steps.length - 1 ? "Start over" : "Next";
}

function goNext() {
  const lastIndex = STORIES[currentStory].length - 1;
  currentStep = currentStep >= lastIndex ? 0 : currentStep + 1;
  render();
}

function goPrev() {
  if (currentStep > 0) {
    currentStep--;
    render();
  }
}

function switchStory(name) {
  currentStory = name;
  currentStep = 0;
  storyBtns.forEach(btn => btn.classList.toggle("active", btn.dataset.story === name));
  render();
}

// Event listeners
nextBtn.addEventListener("click", goNext);
prevBtn.addEventListener("click", goPrev);
sceneEl.addEventListener("click", goNext);
storyBtns.forEach(btn => btn.addEventListener("click", () => switchStory(btn.dataset.story)));
document.addEventListener("keydown", e => {
  if (e.key === "ArrowRight") goNext();
  if (e.key === "ArrowLeft") goPrev();
});

// Start
render();
