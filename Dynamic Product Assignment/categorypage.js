const url = "https://kea-alt-del.dk/t7/api/seasons";

fetch(url)
  .then(function (res) {
    return res.json();
  })
  .then(function (data) {
    handleSeasons(data);
  });

function handleSeasons(data) {
  console.log(data);
  data.forEach(showSeason);
}

function showSeason(season) {
  console.log(season);

  //grab the template
  const template = document.querySelector("#seasonstemplate").content;
  //clone it
  const copy = template.cloneNode(true);
  //change content
  copy.querySelector(".seasonlink").textContent = season.season;
  copy
    .querySelector(".seasonlink")
    .setAttribute("href", `productlistpage.html?season=${season.season}`);
  //grab parent
  const parent = document.querySelector("main");
  //append it
  parent.appendChild(copy);
}
