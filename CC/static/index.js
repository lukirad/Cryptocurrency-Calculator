document.addEventListener('DOMContentLoaded', () => {
    const apiKey = API_KEY;
    document.getElementById('convert').onclick = convert;
    document.getElementById('amount').defaultValue = 1;
});

$(document).ready(() => {
    $('#fromCurrency').select2();
    $('#toCurrency').select2();
});

const data = {
    "btc": "bitcoin",
    "eth": "ethereum",
    "bnb": "binancecoin",
    "xrp": "ripple",
    "dot": "polkadot",
    "bch": "bitcoin-cash",
    "link": "chainlink",
    "ltc": "litecoin",
    "xlm": "stellar",
    "eos": "eos",
    "yfi": "yearn-finance",
    "sats": "satoshis"
};


async function fetchData(url, options) {
    const response = await fetch(url, options);
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
}

function errorAlert() {
    if (!document.querySelector('.alert-danger')) {
        const alertDiv = document.createElement('div');
        alertDiv.className = 'alert alert-danger';
        alertDiv.role = 'alert';
        alertDiv.textContent = "You've exceeded the Rate Limit for current API plan, please refresh and try again in a minute. Please note, that conversion must include at least one cryptocurrency.";
        const contentDiv = document.querySelector('.content');
        document.body.insertBefore(alertDiv, contentDiv);
    }
}

async function convert() {
  const options = {
    method: 'GET',
    headers: {accept: 'application/json', 'x-cg-demo-api-key': API_KEY}
  };

  $('#fromCurrency').select2('destroy');
  $('#toCurrency').select2('destroy');

  const fromCurrency = document.querySelector("#fromCurrency option:checked").value;
  const toCurrency = document.querySelector("#toCurrency option:checked").value;

  let response;
  try {
      const url = `https://api.coingecko.com/api/v3/simple/price?ids=${fromCurrency}&vs_currencies=${toCurrency}&include_last_updated_at=true`;
      response = await fetchData(url, options);

      const amount = document.getElementById('amount').value;

      if (Object.keys(response).length !== 0) {
        const result = amount * response[fromCurrency][toCurrency];
        document.getElementById('convertedAmount').value = result;
        const unixTimestamp = response[fromCurrency].last_updated_at;
        displayLastUpdatedTime(unixTimestamp);
      }
      else {
        const url = `https://api.coingecko.com/api/v3/simple/price?ids=${toCurrency}&vs_currencies=${fromCurrency}&include_last_updated_at=true`;
        response = await fetchData(url, options);
        if (Object.keys(response).length !== 0) {
          const result = ((1 * amount)/(response[toCurrency][fromCurrency])).toFixed(6);
          document.getElementById('convertedAmount').value = result;
          const unixTimestamp = response[toCurrency].last_updated_at;
          displayLastUpdatedTime(unixTimestamp);
        } else {
          const alternativeFromCurrency = data[fromCurrency] || fromCurrency;
          const alternativeToCurrency = data[toCurrency] || toCurrency;

          const url = `https://api.coingecko.com/api/v3/simple/price?ids=${alternativeFromCurrency}&vs_currencies=${alternativeToCurrency}&include_last_updated_at=true`;
          response = await fetchData(url, options);

            if (Object.keys(response).length !== 0) {
              const result = amount * response[alternativeFromCurrency][alternativeToCurrency];
              document.getElementById('convertedAmount').value = result;
              const unixTimestamp = response[alternativeFromCurrency].last_updated_at;
              displayLastUpdatedTime(unixTimestamp);
            } else {
                const url = `https://api.coingecko.com/api/v3/simple/price?ids=${alternativeToCurrency}&vs_currencies=${alternativeFromCurrency}&include_last_updated_at=true`;
                response = await fetchData(url, options);
                const result = ((1 * amount)/(response[alternativeToCurrency][alternativeFromCurrency])).toFixed(6);
                document.getElementById('convertedAmount').value = result;
                const unixTimestamp = response[alternativeToCurrency].last_updated_at;
                displayLastUpdatedTime(unixTimestamp);
            }
          }
      }
  } catch(err) {
    console.error(err);
    errorAlert();
    }

  $('#fromCurrency').select2();
  $('#toCurrency').select2();
}

function swapCurrencies() {
  $('#fromCurrency').select2('destroy');
  $('#toCurrency').select2('destroy');

  const fromCurrency = document.getElementById('fromCurrency');
  const toCurrency = document.getElementById('toCurrency');

  const temp = fromCurrency.value;
  fromCurrency.value = toCurrency.value;
  toCurrency.value = temp;

  $('#fromCurrency').select2();
  $('#toCurrency').select2();
}

const displayLastUpdatedTime = (unixTimestamp) => {
    const date = new Date(unixTimestamp * 1000);
    const year = date.getFullYear();
    const month = `0${date.getMonth() + 1}`.slice(-2);
    const day = `0${date.getDate()}`.slice(-2);
    const hours = date.getHours();
    const minutes = `0${date.getMinutes()}`.slice(-2);
    const seconds = `0${date.getSeconds()}`.slice(-2);
    const formattedTime = `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
    document.getElementById('lastUpdated').innerHTML = `Last updated at: ${formattedTime}`;
}
