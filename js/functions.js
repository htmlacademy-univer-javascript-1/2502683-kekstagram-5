function isStringValid(string, maxLength) {
    if(string.length <= maxLength) 
        return true
    else
        return false;
}

function isPalindrome(string) {
    const normalizedString = string
      .toLowerCase()
      .replace(/[^a-zа-яё0-9]/g, '');
  
    return normalizedString === normalizedString.split('').reverse().join('');
  }

function имяФункции(inputData) {
    if (typeof inputData === 'number') {
        inputData = Math.abs(inputData).toString();
    }
    let digits = inputData.replace(/\D/g, '');
    return digits.length > 0 ? parseInt(digits, 10) : NaN;
}
