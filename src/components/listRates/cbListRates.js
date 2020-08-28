import React, {useState, useEffect} from 'react';

const dataSample = [{"currency":"EUR/USD","rate":"1.18065","bid":"1.18065","ask":"1.18074","high":"1.18146","low":"1.17843","open":"1.1798","close":"1.18065","timestamp":"1598255050872"},
{"currency":"GBP/USD","rate":"1.30894","bid":"1.30894","ask":"1.3091","high":"1.31153","low":"1.3082","open":"1.3092","close":"1.30894","timestamp":"1598255051676"},
{"currency":"GBP/HUF","rate":"389.33","bid":"389.33","ask":"389.57","high":"390.11","low":"388.25","open":"388.3","close":"389.33","timestamp":"1598255051735"},
{"currency":"EUR/JPY","rate":"124.987","bid":"124.987","ask":"125.005","high":"125.054","low":"124.682","open":"124.911","close":"124.987","timestamp":"1598255052492"},
{"currency":"NZD/USD","rate":"0.65292","bid":"0.65292","ask":"0.6531","high":"0.65481","low":"0.65245","open":"0.65357","close":"0.65292","timestamp":"1598255051625"},
{"currency":"USD/JPY","rate":"105.86","bid":"105.86","ask":"105.871","high":"105.937","low":"105.685","open":"105.873","close":"105.86","timestamp":"1598255046968"},
{"currency":"EUR/CHF","rate":"1.07628","bid":"1.07628","ask":"1.07648","high":"1.07744","low":"1.07546","open":"1.0759","close":"1.07628","timestamp":"1598255051639"},
{"currency":"USD/CHF","rate":"0.91156","bid":"0.91156","ask":"0.91172","high":"0.91273","low":"0.91107","open":"0.91192","close":"0.91156","timestamp":"1598255048426"},
{"currency":"AUD/USD","rate":"0.71751","bid":"0.71751","ask":"0.71762","high":"0.71822","low":"0.71522","open":"0.71596","close":"0.71751","timestamp":"1598255052480"},
{"currency":"USD/CAD","rate":"1.31571","bid":"1.31571","ask":"1.31591","high":"1.31861","low":"1.31521","open":"1.31791","close":"1.31571","timestamp":"1598255052422"},
{"currency":"EUR/GBP","rate":"0.9019","bid":"0.9019","ask":"0.90205","high":"0.90225","low":"0.9001","open":"0.90105","close":"0.9019","timestamp":"1598255051746"},
{"currency":"BTC/USD","rate":"11740.94","bid":"11740.94","ask":"11782.13","high":"11757.84","low":"11579.06","open":"11632.3","close":"11740.94","timestamp":"1598255050113"}]

export function CbListRates({ OnHandleChangeCurrency}) {
  const [rates, setRates] = useState([]);
  const handleChangeCurrency = OnHandleChangeCurrency;

  useEffect(() => {
    async function getRates() {
      const response = await fetch(" https://www.live-rates.com/rates");
      let data = await response.json();
      console.log('Call API live-rates/rates --> data ', data);
      if (data[0].error ) {
        data =  dataSample;
      }
      setRates(data.map(({ currency }) => ({ label: currency, value: currency })));
    }
    getRates();
  }, []);

  const OnChangeCurrency = (e) => {
      let currency = e.target.value.replace("/","");
      console.log('Select handleChangeCurrency target.value, currency ', e.target.value, currency);
      handleChangeCurrency(currency)
  }
  
  return (
    <div>
      <select placeholder="Rates" 
              name="rates" onChange={OnChangeCurrency} >
        {rates.map(({ label, value }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default CbListRates;