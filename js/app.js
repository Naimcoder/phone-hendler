const loadPhone = async (searchPhone, datalimit) => {
  const url = `https://openapi.programming-hero.com/api/phones?search=${searchPhone}`;
  const res = await fetch(url);
  const data = await res.json();
  displayData(data.data, datalimit);
};
// --------------------------
const displayData = (phone, datalimit) => {
  const containerPhone = document.getElementById("container-phone");
  containerPhone.innerHTML = "";
  const showall = document.getElementById("show");
  if (datalimit && phone.length > 10) {
    phone = phone.slice(0, 10);
    showall.classList.remove("d-none");
  } else {
    showall.classList.add("d-none");
  }
  // --------------------------
  // display to only 20 phone

  // display the no phone found
  const nophone = document.getElementById("no-phone-found");
  if (phone.length === 0) {
    nophone.classList.remove("d-none");
  } else {
    nophone.classList.add("d-none");
  }
  // --------------------------
  // display all phone
  phone.forEach((phones) => {
    //     console.log(phones);
    const div = document.createElement("div");
    div.classList.add("col");
    div.innerHTML = `
           <div class="card p-5">
              <img src="${phones.image}" class="card-img-top" alt="" />
              <div class="card-body">
                <h5 class="card-title">${phones.phone_name}</h5>
                <p class="card-text">
                 ${phones.slug}
                </p>
               <button onclick="displaydetalis('${phones.slug}')" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#phoneDetalisModal">Show detalis</button>
              </div>
            </div>
          `;
    containerPhone.appendChild(div);
  });
  // stop loader
  toggleSpinner(false);
};
// --------------------------
const showAlldata = (datalimit) => {
  // start loader
  toggleSpinner(true);
  const mobileinput = document.getElementById("input-fild-phone");
  const phoneVale = mobileinput.value;
  loadPhone(phoneVale, datalimit);
  //     pbl
};
// --------------------------
document.getElementById("btn-search").addEventListener("click", function () {
  showAlldata(10);
});
// --------------------------
document
  .getElementById("input-fild-phone")
  .addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      showAlldata(10);
    }
  });
// --------------------------
const toggleSpinner = (lodears) => {
  const lodaerspinner = document.getElementById("loader");
  if (lodears) {
    lodaerspinner.classList.remove("d-none");
  } else {
    lodaerspinner.classList.add("d-none");
  }
};
// --------------------------
document.getElementById("btn-show-all").addEventListener("click", function () {
  showAlldata();
  const mobileinput = document.getElementById("input-fild-phone");
  mobileinput.value = "";
});
// --------------------------
const displaydetalis = (id) => {
  const url = ` https://openapi.programming-hero.com/api/phone/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => loadphoneDetalis(data.data));
};
const loadphoneDetalis = (phone) => {
  console.log(phone);
  const title = document.getElementById("modal-title");
  title.innerText = `${phone.name}`;
  const bodyphoneDetalis = document.getElementById("modal-phone-body");
  bodyphoneDetalis.innerHTML = `
      <img src="${phone.image}" class="card-img-top-detalis" alt="" />
      <p>DisplaySize: ${
        phone.mainFeatures.displaySize
          ? phone.mainFeatures.displaySize
          : "no displaySize"
      }</P>
      <p>Memory: ${
        phone.mainFeatures.memory ? phone.mainFeatures.memory : "no memory"
      }</P>
      <p>Storage: ${
        phone.mainFeatures.storage ? phone.mainFeatures.storage : "no storage"
      }</P>
      <p>ReleaseDate: ${
        phone.releaseDate ? phone.releaseDate : "no releaseDate"
      }</P>
     `;
 

};
// --------------------------
loadPhone("phone");
