function arrToPHPString(arr){
    let str = "[";
    arr.forEach((ax) => {str += "'"+ax+"',"});
    str = str.slice(0, -1);
    str += "]"
    return str;
}

function ErrorException(message) {
  this.message = message;
  this.name = 'Error Exception';
}

function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

String.prototype.cap = function (){
    return (this.charAt(0).toUpperCase() + this.slice(1));
}

function addToAdditionalList (Arr){
    Arr.forEach(str => {
        const arr = str.split(":");
        AdditionalFormatList[arr[0]] = (arr[1]+":"+arr[2]);
    })
}

function _copy_to_clipboard(code){
    navigator.clipboard.writeText(code);
}
