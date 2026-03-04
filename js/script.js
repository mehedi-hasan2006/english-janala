const fetchLesson = () => {
  fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((res) => res.json())
    .then((data) => displayLesson(data.data));
};
fetchLesson();

const displayLesson = (lessons) => {
  let lessonContainer = document.getElementById("lessonContainer");
  lessonContainer.innerHTML = "";

  for (let lesson of lessons) {
    let lessonContent = document.createElement("div");

    lessonContent.innerHTML = `
            <button id="lessonBtn-${lesson.level_no}" onclick= 'getLessonData(${lesson.level_no})' class="btn btn-outline btn-primary font-semibold lessonBtn"><i class="fa-solid fa-book-open"></i> Lesson - ${lesson.level_no} </button>
        `;
    lessonContainer.appendChild(lessonContent);
  }
};

const removeActiveClass = () => {
  let lessonBtn = document.querySelectorAll(".lessonBtn");
  lessonBtn.forEach((btn) => btn.classList.remove("active"));
};

const getLessonData = (id) => {
  fetch(`https://openapi.programming-hero.com/api/level/${id}`)
    .then((res) => res.json())
    .then((data) => {
      removeActiveClass();
      let clickBtn = document.getElementById(`lessonBtn-${id}`);
      clickBtn.classList.add("active");
      displayLessonData(data.data);
    });
};

const loadWordDetails = async (id) => {
  let url = `https://openapi.programming-hero.com/api/word/${id}`;

  const res = await fetch(url);
  const details = await res.json();
  displayDetails(details.data);
};

const displayDetails = (word) => {
  let detailsContainer = document.getElementById("detailsContainer");
  detailsContainer.innerHTML = `
    <div class="text-left ">
            <div class="p-5 border border-sky-200 rounded-md mb-3 space-y-2">
                <h1 class="font-bold text-2xl font-bangla"> ${word.word} (<i class="fa-solid fa-microphone-lines"></i> : ${word.pronunciation})
                </h1>

                <p class="font-semibold mt-6">Meaning</p>
                <p class="font-bangla"> ${word.meaning ? word.meaning : "অর্থ পাওয়া যায়নি"} </p>

                <p class="font-semibold mt-6">Parts of Speech</p>
                <p class=""> ${word.partsOfSpeech}</p>

                <p class="font-semibold mt-6">Example</p>
                <p class=""> ${word.sentence}</p>

                <p class="font-bangla font-semibold">সমার্থক শব্দগুলো</p>

                <div>
                    <span class="btn bg-[#EDF7FF]">${word.synonyms[0]}</span>
                    <span class="btn bg-[#EDF7FF]">${word.synonyms[1]}</span>
                    <span class="btn bg-[#EDF7FF]">${word.synonyms[2]}</span>
                </div>
            </div>

            <button class="btn btn-primary rounded-lg">Complete Learning</button>
        </div>
  `;

  let showModal = document.getElementById("my_modal").showModal();
};

const displayLessonData = (words) => {
  let getLessonData = document.getElementById("getLessonData");
  getLessonData.innerHTML = "";

  if (words.length == 0) {
    getLessonData.innerHTML = `
        <div class="col-span-full text-center space-y-3">
            <img class ="mx-auto " src = "./assets/alert-error.png"/>
            <p class="text-[14px] text-gray-400 font-bangla">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
            <p class="font-bangla font-medium text-2xl">নেক্সট Lesson এ যান</p>
        </div>
    `;
    return;
  }
  words.forEach((word) => {
    let lessonDataContent = document.createElement("div");
    lessonDataContent.innerHTML = `
        <div class="bg-base-100 p-8 rounded-lg space-y-3">
                <h2 class="font-bold text-2xl">${word.word ? word.word : "শব্দ পাওয়া যায়নি"}</h2>
                <p class="font-medium text-[20px]"> Meaning / Pronounciation</p>
                <p class="font-bangla font-semibold text-2xl ">"${word.meaning ? word.meaning : "অর্থপাওয়া যায়নি"} / ${word.pronunciation ? word.pronunciation : "উচ্চারণ পাওয়া যায়নি"}"</p>
                <div class="flex justify-between">
                    <button onclick="loadWordDetails(${word.id})" class="btn bg-[#1A91FF10] hover:bg-[#1A91FF70]"><i class="fa-solid fa-circle-info"></i></button>
                    <button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF70]"><i class="fa-solid fa-volume-high"></i></button>
                </div>
        </div>
    `;
    getLessonData.appendChild(lessonDataContent);
  });
};
