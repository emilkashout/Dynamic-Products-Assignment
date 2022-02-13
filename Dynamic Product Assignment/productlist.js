const urlParams = new URLSearchParams(window.location.search);
const season = urlParams.get("season");

const url = "https://kea-alt-del.dk/t7/api/products?season=" + season;
fetch(url)
  .then(function (res) {
    return res.json();
  })
  .then(function (data) {
    handleProductList(data);
  });

function handleProductList(data) {
  console.log(data);
  data.forEach(showProduct);
}

document.querySelector("h2").textContent = season;

function showProduct(product) {
  console.log(product);
  //grab the template
  const template = document.querySelector("#oneproducttemplate").content;
  //clone it
  const copy = template.cloneNode(true);
  //change content
  copy
    .querySelector(".productlink")
    .setAttribute("href", `productpage.html?id=${product.id}`);
  copy.querySelector(
    ".subtle"
  ).textContent = `${product.articletype} | ${product.brandname}`;
  copy.querySelector("h3").textContent = product.productdisplayname;

  copy.querySelector(
    "img.productimage"
  ).src = `https://kea-alt-del.dk/t7/images/webp/1000/${product.id}.webp`;
  //document.querySelector("img.productimage").alt = product.productdisplayname;

  copy.querySelector(".dprice").textContent = `${product.price}` + "kr";
  if (product.soldout) {
    copy.querySelector("article").classList.add("soldout");
  }
  if (product.discount) {
    copy.querySelector(".percentage").textContent = product.discount + "%";
    copy.querySelector("article").classList.add("onsale");
    const newPrice = (product.price = (product.price / 100) * product.discount);
    copy.querySelector(".discount .newprice").textContent = newPrice + "kr";
  } else {
    copy.querySelector(".percentage").style.display = "none";
    copy.querySelector(".dprice").style.display = "none";
    copy.querySelector(".newprice").textContent = product.price + "kr";
  }

  //grab parent
  const parent = document.querySelector("main");
  //append it
  parent.appendChild(copy);
}
