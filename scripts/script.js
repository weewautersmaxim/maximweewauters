Chart.defaults.global.defaultFontColor = "white";
Chart.defaults.global.legend.display = false;
//labels en data mag geen const zijn, want data wordt later aangepast als je van coin veranderd
let xlabels = [];
let ydata = [];
let minimumgetal = [];
let BitcoinMarkets = [];
let datachart = "";
let min = 0;
let max = 0;
const ctx = document
  .getElementsByClassName("c-main__myChart")[0]
  .getContext("2d");
let myChart = new Chart(ctx, {
  type: "bar",

  data: {
    labels: ["Exchange 1", "Exchanges2", "Exchange3"],
    datasets: [
      {
        label: "markets",
        data: ydata,
        backgroundColor: "#58ACDC",
        borderWidth: 1,
      },
    ],
  },
  options: {
    scales: {
      yAxes: [
        {
          ticks: {
            suggestedMin: 20,
            suggestedMax: 10,
            beginAtZero: false,
          },
        },
      ],
    },
  },
});
let Coin = document.getElementsByClassName("c-nav__list--item--text");

document.addEventListener("DOMContentLoaded", function () {
  // 1 We will query the API
  getAPI();
  NavigationClick();
  CreateChart();
});

// 2 api ophalen
const getAPI = async () => {
  // Eerst bouwen we onze url op
  // Met de fetch API proberen we de data op te halen.
  //id 90 staat voor basic bitcoin
  const data = await fetch(`https://api.coinlore.net/api/ticker/?id=90`)
    .then((r) => r.json())
    .catch((err) => console.error("an error occured: ", err));
  showResult(data);
  // Als dat gelukt is, gaan we naar onze showResult functie.
};

// 3 Met de data van de API kunnen we de app opvullen
const showResult = (queryResponse) => {
  // We gaan eerst een paar onderdelen opvullen
  // Zorg dat de juiste locatie weergegeven wordt, volgens wat je uit de API terug krijgt.
  let title = document.querySelector(".c-main__title--text");
  let price = document.querySelector(".c-js__price");
  let hour = document.querySelector(".c-js__past-hour");
  let day = document.querySelector(".c-js__past-24hours");
  let week = document.querySelector(".c-js__past-7days");
  let volume = document.querySelector(".c-js__volume");
  let PriceToBtc = document.querySelector(".c-js__price_to_btc");
  let Marketcap = document.querySelector(".c-js__marketcap");

  title.innerText = `${queryResponse[0].name}`;
  price.innerHTML = `${queryResponse[0].price_usd}`;
  hour.innerHTML = `${queryResponse[0].percent_change_1h}`;
  if (hour.innerHTML >= 0) {
    document.getElementsByClassName("c-main__li--upperlayer--pijl")[0].src =
      "design/images/pijl_omhoog_groen.svg";
  } else {
    document.getElementsByClassName("c-main__li--upperlayer--pijl")[0].src =
      "design/images/pijl_omlaag_rood.svg";
  }
  day.innerHTML = `${queryResponse[0].percent_change_24h}`;
  if (day.innerHTML >= 0) {
    document.getElementsByClassName("c-main__li--upperlayer--pijl")[1].src =
      "design/images/pijl_omhoog_groen.svg";
  } else {
    document.getElementsByClassName("c-main__li--upperlayer--pijl")[1].src =
      "design/images/pijl_omlaag_rood.svg";
  }
  week.innerHTML = `${queryResponse[0].percent_change_7d}`;
  if (week.innerHTML >= 0) {
    document.getElementsByClassName("c-main__price--pijl")[0].src =
      "design/images/pijl_omhoog_groen.svg";
    document.getElementsByClassName("c-main__li--upperlayer--pijl")[2].src =
      "design/images/pijl_omhoog_groen.svg";
  } else {
    document.getElementsByClassName("c-main__price--pijl")[0].src =
      "design/images/pijl_omlaag_rood.svg";
    document.getElementsByClassName("c-main__li--upperlayer--pijl")[2].src =
      "design/images/pijl_omlaag_rood.svg";
  }
  volume.innerHTML = `${parseFloat(queryResponse[0].volume24_native).toFixed(
    0
  )}`;
  PriceToBtc.innerHTML = `${queryResponse[0].price_btc}`;
  Marketcap.innerHTML = `${queryResponse[0].tsupply}`;

  //kijken of getal positief is of negatief
};

function NavigationClick() {
  let a = document.getElementsByClassName("c-nav__list--item");
  let b = document.getElementsByClassName("c-nav__list--item--border");

  for (let i = 0; i < a.length; i++) {
    a[i].addEventListener("click", async function ChosenCoin() {
      for (let j = 0; j < a.length; j++) {
        b[j].classList.remove("u-selected");
      }
      b[i].classList.add("u-selected");
      switch (Coin[i].innerHTML) {
        case "ETH":
          document.getElementsByClassName("c-header__logo")[0].src =
            "design/images/ethereum.png";
          const dataETH = await fetch(
            `https://api.coinlore.net/api/ticker/?id=80`
          )
            .then((r) => r.json())
            .catch((err) => console.error("an error occured: ", err));
          showResult(dataETH);
          CreateChart(Coin[i].innerHTML);
          break;
        case "BTC":
          document.getElementsByClassName("c-header__logo")[0].src =
            "design/images/Bitcoin.png";
          const dataBTC = await fetch(
            `https://api.coinlore.net/api/ticker/?id=90`
          )
            .then((r) => r.json())
            .catch((err) => console.error("an error occured: ", err));
          showResult(dataBTC);
          CreateChart(Coin[i].innerHTML);
          break;
        case "TRH":
          document.getElementsByClassName("c-header__logo")[0].src =
            "design/images/tether.png";
          const dataRBY = await fetch(
            `https://api.coinlore.net/api/ticker/?id=518`
          )
            .then((r) => r.json())
            .catch((err) => console.error("an error occured: ", err));
          showResult(dataRBY);
          CreateChart(Coin[i].innerHTML);
          break;
      }
    });
  }
}

//hier begint code voor de chart.js data op te halen en te plaatsen

// 2 api ophalen
async function getAPIchart(coindata) {
  // Eerst bouwen we onze url op
  // Met de fetch API proberen we de data op te halen.
  //id 90 staat voor basic bitcoin

  if (coindata == "ETH") {
    datachart = await fetch(`https://api.coinlore.net/api/coin/markets/?id=80`)
      .then((r) => r.json())
      .catch((err) => console.error("an error occured: ", err));
  } else if (coindata == "TRH") {
    datachart = await fetch(`https://api.coinlore.net/api/coin/markets/?id=89`)
      .then((r) => r.json())
      .catch((err) => console.error("an error occured: ", err));
  } else {
    datachart = await fetch(`https://api.coinlore.net/api/coin/markets/?id=90`)
      .then((r) => r.json())
      .catch((err) => console.error("an error occured: ", err));
  }
  showResultchart(datachart, coindata);
  // Als dat gelukt is, gaan we naar onze showResultchart functie.
}

// 3 Met de data van de API kunnen we de app opvullen
const showResultchart = (queryResponse, coindata) => {
  xlabels = [];
  BitcoinMarkets = [];
  ydata = [];
  // We gaan eerst een paar onderdelen opvullen
  // Zorg dat de juiste locatie weergegeven wordt, volgens wat je uit de API terug krijgt.
  //er zijn 50 markets in de array
  for (let i = 0; i < 50; i++) {
    if (coindata == "ETH") {
      if (queryResponse[i].base == "ETH") {
        BitcoinMarkets.push(queryResponse[i]);
        min = parseFloat(BitcoinMarkets[0].price_usd) - 5;
        max = parseFloat(BitcoinMarkets[0].price_usd) + 5;
      }
    } else if (coindata == "TRH") {
      if (queryResponse[i].base == "XLM") {
        BitcoinMarkets.push(queryResponse[i]);
        min = parseFloat(BitcoinMarkets[0].price_usd) - 0.001;
        max = parseFloat(BitcoinMarkets[0].price_usd) + 0.001;
      }
    } else {
      if (queryResponse[i].base == "BTC") {
        BitcoinMarkets.push(queryResponse[i]);
        min = parseFloat(BitcoinMarkets[0].price_usd) - 10;
        max = parseFloat(BitcoinMarkets[0].price_usd) + 10;
      }
    }
  }
  for (let j = 0; j < 8; j++) {
    xlabels.push(BitcoinMarkets[j].name);
    ydata.push(parseFloat(BitcoinMarkets[j].price_usd));
  }
};

async function CreateChart(coindata) {
  await getAPIchart(coindata);
  const ctx = document
    .getElementsByClassName("c-main__myChart")[0]
    .getContext("2d");
  myChart.destroy();
  myChart = new Chart(ctx, {
    type: "bar",

    data: {
      labels: xlabels,
      datasets: [
        {
          label: "markets",
          data: ydata,
          backgroundColor: "#58ACDC",
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        yAxes: [
          {
            ticks: {
              callback: function (value, index, values) {
                return "$" + value;
              },
              suggestedMin: min,
              suggestedMax: max,
              beginAtZero: false,
            },
          },
        ],
      },
    },
  });
}
