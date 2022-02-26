import moment from "moment"

export const ENDPOINT = 'https://testdemosite.azurewebsites.net/'    //http://13.71.123.199 //http://20.204.74.75 
export const DEVICE_ENDPOINT = 'https://testdemosite.azurewebsites.net/api/'
export const dayDate = new Date().toLocaleDateString()              // '12/29/2021'//
export const weekDate = new Date().toLocaleDateString()              // '12/29/2021'//
export const monthDate = new Date().toLocaleDateString()              // '12/29/2021'//
export const yearDate = new Date().toLocaleDateString()              // '12/29/2021'//
export const START_TIME = moment().subtract(3, 'h').format("X")
export const END_TIME = moment().format("X")