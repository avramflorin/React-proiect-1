const CommaFormatted = function(amount, nrDecimals, decimalDel='.', thousandsDelimiter=(',')) {
    if(typeof amount === 'undefined') return 0;
    amount = amount.toString();
    let a = amount.split(decimalDel,2);
    let d = a[1] ?? '';
    let i = parseInt(a[0]);
    if(isNaN(i)) { return ''; }
    let minus = '';
    if(i < 0) { minus = '-'; }
    i = Math.abs(i);
    let n = i.toString();
    a = [];
    while(n.length > 3) {
      var nn = n.substr(n.length-3);
      a.unshift(nn);
      n = n.substr(0,n.length-3);
    }
    if(n.length > 0) { a.unshift(n); }
    n = a.join(thousandsDelimiter);
    if(d.length < 1 || nrDecimals === 0) { amount = n; }
    else { amount = n + decimalDel + d.substring(0,nrDecimals); }
    amount = minus + amount;
    return amount;
    
  }

const importAllFiles = (r) => r.keys().map(r);

/**
 * aflu urmatorul id dintr-un array de obiecte
 * @param {*} arr 
 * @param {*} key 
 */
const getMaxId = function(arr, k='id') {
  if (typeof arr === "undefined") return 0;
  let id = 0;
  arr.forEach(row=>{
    id = row[k] > id && row[k];
  });
  return id + 1;
}


export {CommaFormatted, getMaxId};
export {importAllFiles};
