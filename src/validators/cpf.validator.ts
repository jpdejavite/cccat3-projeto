const CPF_LENGTH = 11;
const CPF_SIZE_WITH_MASK = 14;
const DIGIT_1_BASE_MULTIPLIER = 10;
const DIGIT_2_BASE_MULTIPLIER = 11;


const CpfValidator = {
  calculateMod11(num: number): number {
    const remainder = num % 11;

    return remainder < 2 ? 0 : 11 - remainder;
  },
  calculateVerificationDigits(onlyNumberString: string): string {
    let digito1Sum = 0;
    let digito2Sum = 0;
    const sizeWithoutVerificationDigits = onlyNumberString.length - 2;

    // calculate both digits in one loop for efficiency
    for (let index = 0; index < sizeWithoutVerificationDigits; index++) {
      const num = parseInt(onlyNumberString[index], 10);
      digito1Sum += (DIGIT_1_BASE_MULTIPLIER - index) * num;
      digito2Sum += (DIGIT_2_BASE_MULTIPLIER - index) * num;
    }


    const dg1 = CpfValidator.calculateMod11(digito1Sum);
    digito2Sum += 2 * dg1;
    const dg2 = CpfValidator.calculateMod11(digito2Sum);

    return `${dg1}${dg2}`;
  },
  areAllDigitsRepeated(onlyNumberString: string): boolean {
    let allDigitsAreEqual = true;
    const firtsChar = onlyNumberString[0];
    for (const stringChar of onlyNumberString) {
      allDigitsAreEqual = allDigitsAreEqual && firtsChar === stringChar;
    }

    return allDigitsAreEqual;
  },
  removeMask(rawString: string): string {
    return rawString.replace(/[^0-9]/ig, '');
  },
  isLengthValid(rawString: string): boolean {
    if (rawString === '') {
      return false;
    }
    return rawString.length === CPF_LENGTH || rawString.length === CPF_SIZE_WITH_MASK;
  },
  validate(rawString: string): boolean {
    if (!CpfValidator.isLengthValid(rawString)) {
      return false;
    }

    const onlyNumberString = CpfValidator.removeMask(rawString);

    if (CpfValidator.areAllDigitsRepeated(onlyNumberString)) {
      return false;
    }

    const calculateVerificationDigits = CpfValidator.calculateVerificationDigits(onlyNumberString);
    const verificationDigits = onlyNumberString.substring(onlyNumberString.length - 2, onlyNumberString.length);
    return verificationDigits === calculateVerificationDigits;
  },
};

export default CpfValidator;
