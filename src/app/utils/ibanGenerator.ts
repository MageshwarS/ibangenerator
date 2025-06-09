export class IbanGenerator {
  // ISO 13616 Country Code -> IBAN Length map (as of 2024)
  static readonly IBAN_LENGTHS: Record<string, number> = {
    AL: 28, AD: 24, AT: 20, AZ: 28, BH: 22, BE: 16, BA: 20, BR: 29,
    BG: 22, CR: 22, HR: 21, CY: 28, CZ: 24, DK: 18, DO: 28, EE: 20,
    FO: 18, FI: 18, FR: 27, GE: 22, DE: 22, GI: 23, GR: 27, GL: 18,
    GT: 28, HU: 28, IS: 26, IE: 22, IL: 23, IT: 27, JO: 30, KZ: 20,
    KW: 30, LV: 21, LB: 28, LI: 21, LT: 20, LU: 20, MK: 19, MT: 31,
    MR: 27, MU: 30, MC: 27, MD: 24, ME: 22, NL: 18, NO: 15, PK: 24,
    PS: 29, PL: 28, PT: 25, QA: 29, RO: 24, SM: 27, SA: 24, RS: 22,
    SK: 24, SI: 19, ES: 24, SE: 24, CH: 21, TN: 24, TR: 26, AE: 23,
    GB: 22, VG: 24, XK: 20
  };

  private static readonly BANK_CODES = [
  'NBAD', // National Bank of Abu Dhabi
  'DEUT', // Deutsche Bank
  'BNPA', // BNP Paribas
  'HSBC', // HSBC Bank
  'NWBK', // NatWest Bank
  'BARC', // Barclays
  'LOYD', // Lloyds Bank
  'ABNA', // ABN AMRO Bank
  'RABO', // Rabobank
  'INGB', // ING Bank
  'BCEY', // Banque Centrale Européenne
  'BSCH', // Banco Santander
  'CAIX', // CaixaBank
  'BBVA', // Banco Bilbao Vizcaya Argentaria
  'UBSW', // UBS Switzerland
  'CSFB', // Credit Suisse
  'ICIC', // ICICI Bank
  'HDFC', // HDFC Bank
  'SCBL', // Standard Chartered
  'CBIN', // Central Bank of India
  'BOTK', // Bank of Tokyo Mitsubishi UFJ
  'CITI', // Citibank
  'CHAS', // JPMorgan Chase
  'BOFA', // Bank of America
  'BNSF', // Scotiabank
  'TDCA', // Toronto Dominion
  'NDEA', // Nordea Bank
  'SEBK', // Skandinaviska Enskilda Banken
  'DABA', // Danske Bank
  'HAND', // Svenska Handelsbanken
  'ESSE', // Swedbank
  'POAL', // PostFinance Switzerland
];


static generateIban(countryCode: string): string {
  countryCode = countryCode.toUpperCase();
  const length = this.IBAN_LENGTHS[countryCode];
  if (!length) throw new Error(`Unsupported country: ${countryCode}`);

  const bankCode = this.randomBankCode();
  const bbanLength = length - 4 - bankCode.length;
  const accountPart = this.randomDigits(bbanLength);
  const bban = bankCode + accountPart;

  const checksum = this.calculateChecksum(countryCode, bban);
  return `${countryCode}${checksum}${bban}`;
}

private static randomBankCode(): string {
  const codes = this.BANK_CODES;
  return codes[Math.floor(Math.random() * codes.length)];
}

private static randomDigits(length: number): string {
  let result = '';
  const digits = '0123456789';
  for (let i = 0; i < length; i++) {
    result += digits.charAt(Math.floor(Math.random() * digits.length));
  }
  return result;
}

private static calculateChecksum(countryCode: string, bban: string): string {
  const rearranged = bban + countryCode + '00';
  let numeric = '';
  for (const ch of rearranged) {
    numeric += /\d/.test(ch) ? ch : (ch.charCodeAt(0) - 55).toString();
  }
  const mod97 = BigInt(numeric) % 97n;
  const checksum = 98n - mod97;
  return checksum.toString().padStart(2, '0');
}

}