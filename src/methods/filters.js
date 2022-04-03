export function toCurrency(num) {
  const parts = String(num).split('.');
  const n = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return n;
}

export function transferTime(date) {
  const data = new Date(date * 1000);
  const year = data.getFullYear();
  const month = data.getMonth() + 1;
  const day = data.getDate();
  const hours = data.getHours();
  const minutes = data.getMinutes();
  const str = `
    ${year}/${month}/${day} 
    ${Number(hours) < 12 ? `上午 ${hours}` : `下午 ${hours}`}:
    ${Number(minutes) < 10 ? `0${minutes}` : minutes}`;
  // const parts = new Date(date * 1000).toISOString().split('T');
  // const day = parts[0];
  // const time = parts[1].split('.')[0];
  // str = `${day} ${time}`;
  return str;
}

export function transferToDate(date) {
  // 將時間格式改為 YYYY-MM-DDTHH:mm
  // 2022-04-16T22:27
  const data = new Date(date * 1000);
  const year = data.getFullYear();
  const month = data.getMonth() + 1;
  const day = data.getDate();
  const hours = data.getHours();
  const minutes = data.getMinutes();
  const str = `${year}-${month}-${day}T${Number(hours) < 10 ? `0${hours}` : hours}:${Number(minutes) < 10 ? `0${minutes}` : minutes}`;
  return str;
  // return new Date(date * 1000).toISOString();
  // return new Date(date * 1000).toLocaleDateString();
}
