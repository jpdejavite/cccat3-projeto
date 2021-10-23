import InvalidCpf from '../errors/invalid-cpf.error';

const CPF_LENGTH = 11;
const CPF_SIZE_WITH_MASK = 14;
const DIGIT_1_BASE_MULTIPLIER = 10;
const DIGIT_2_BASE_MULTIPLIER = 11;


const calculateMod11 = (num: number): number => {
  const remainder = num % 11;

  return remainder < 2 ? 0 : 11 - remainder;
};
const calculateVerificationDigits = (onlyNumberString: string): string => {
  let digito1Sum = 0;
  let digito2Sum = 0;
  const sizeWithoutVerificationDigits = onlyNumberString.length - 2;

  // calculate both digits in one loop for efficiency
  for (let index = 0; index < sizeWithoutVerificationDigits; index++) {
    const num = parseInt(onlyNumberString[index], 10);
    digito1Sum += (DIGIT_1_BASE_MULTIPLIER - index) * num;
    digito2Sum += (DIGIT_2_BASE_MULTIPLIER - index) * num;
  }


  const dg1 = calculateMod11(digito1Sum);
  digito2Sum += 2 * dg1;
  const dg2 = calculateMod11(digito2Sum);

  return `${dg1}${dg2}`;
};

const areAllDigitsRepeated = (onlyNumberString: string): boolean => {
  let allDigitsAreEqual = true;
  const firtsChar = onlyNumberString[0];
  for (const stringChar of onlyNumberString) {
    allDigitsAreEqual = allDigitsAreEqual && firtsChar === stringChar;
  }

  return allDigitsAreEqual;
};

const removeMask = (rawString: string): string => {
  return rawString.replace(/[^0-9]/ig, '');
};

const isLengthValid = (rawString: string): boolean => {
  if (rawString === '') {
    return false;
  }
  return rawString.length === CPF_LENGTH || rawString.length === CPF_SIZE_WITH_MASK;
};

const validate = (rawString: string): boolean => {
  if (!isLengthValid(rawString)) {
    return false;
  }

  const onlyNumberString = removeMask(rawString);

  if (areAllDigitsRepeated(onlyNumberString)) {
    return false;
  }

  const calculatedVerificationDigits = calculateVerificationDigits(onlyNumberString);
  const verificationDigits = onlyNumberString.substring(onlyNumberString.length - 2, onlyNumberString.length);
  return verificationDigits === calculatedVerificationDigits;
};


class Cpf {
  constructor(private readonly cpf: string) {
    if (!validate(cpf)) {
      throw new InvalidCpf();
    }
  }

  public getValue(): string {
    return this.cpf;
  }
}

export default Cpf;
