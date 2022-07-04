import axios from 'axios';

const apiFrom2012 = axios.create({
    baseURL: 'https://api.bcb.gov.br/dados/serie/bcdata.sgs.195/dados?formato=json',
})

const apiTill2012 = axios.create({
    baseURL: 'http://api.bcb.gov.br/dados/serie/bcdata.sgs.25/dados?formato=json',
})

export { apiFrom2012, apiTill2012 };