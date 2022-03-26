// - 10K pageviews / $8 per month       -0 - 6
// - 50K pageviews / $12 per month      -25 - 9
// - 100K pageviews / $16 per month     -50 - 12
// - 500k pageviews / $24 per month     -75 - 18
// - 1M pageviews / $36 per month       -100 - 27

const slider = document.querySelector(".card-header--slider_input");

const sliderThumb = document.querySelector(".card-header--slider_rangethumb");

const sliderProgressBar = document.querySelector(
  ".card-header--slider_progressbar"
);
const pageViews = document.querySelector(".card-header--pageviews_num");
const price = document.querySelector(".card-header--price span");

const checkBtn = document.querySelector("#mycheck");

pageViews.innerText = "100K";
price.innerText = "$16.00";

const sliderObject = [
  { sliderValue: 0, data: { pageViews: 10, monthlyPrice: 8 } },
  { sliderValue: 25, data: { pageViews: 50, monthlyPrice: 12 } },
  { sliderValue: 50, data: { pageViews: 100, monthlyPrice: 16 } },
  { sliderValue: 75, data: { pageViews: 500, monthlyPrice: 24 } },
  { sliderValue: 100, data: { pageViews: 1, monthlyPrice: 36 } },
];

getObjectData = (value, viewType) => {
  let data;
  sliderObject.forEach((item) => {
    if (item.sliderValue === value) data = item.data;
  });
  return viewType === "pageViews" ? data.pageViews : data.monthlyPrice;
};

slider.addEventListener("input", function () {
  sliderThumb.style.left = `${this.value}%`;
  sliderProgressBar.style.width = `${this.value}%`;

  pageViews.innerText = `${
    this.value < 100
      ? getObjectData(Number(this.value), "pageViews") + "K"
      : getObjectData(Number(this.value), "pageViews") + "M"
  }`;
  price.innerText = `$${getObjectData(Number(this.value))}.00`;
});

checkBtn.addEventListener("change", function () {
  if (checkBtn.checked) {
    yearlyBilling(slider);
  } else {
    monthlyBilling(slider);
  }
});

function yearlyBilling(slide) {
  slide.addEventListener("input", function () {
    const yearlyPrice =
      getObjectData(Number(slide.value)) -
      (getObjectData(Number(slide.value)) * 25) / 100;

    price.innerText = `$${yearlyPrice}.00`;
  });
}

function monthlyBilling(slide) {
  slide.addEventListener("input", function () {
    price.innerText = `$${getObjectData(Number(slide.value))}.00`;
  });
}
