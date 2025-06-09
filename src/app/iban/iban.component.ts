import { Component, HostListener, OnInit } from '@angular/core';
import { IbanGenerator } from '../utils/ibanGenerator';

@Component({
  selector: 'app-iban',
  templateUrl: './iban.component.html',
  styleUrls: ['./iban.component.css']
})
export class IbanComponent implements OnInit {
  supportedCountries = Object.keys(IbanGenerator.IBAN_LENGTHS);
  filteredCountries: string[] = [];
  selectedCountry = '';
  iban = '';
  copied = false;

  dropdownOpen = false;
  inputValue = '';

  ngOnInit() {
    this.filteredCountries = this.supportedCountries;
  }

  onInputChange(value: string) {
    this.inputValue = value.toUpperCase();
    this.filteredCountries = this.supportedCountries.filter(code =>
      code.includes(this.inputValue)
    );
    this.dropdownOpen = this.filteredCountries.length > 0;
    this.selectedCountry = '';
  }

  selectCountry(code: string) {
    this.inputValue = code;
    this.selectedCountry = code;
    this.dropdownOpen = false;
  }

  generate() {
    try {
      const country = this.selectedCountry || this.inputValue;
      this.iban = IbanGenerator.generateIban(country);
      this.copied = false;
    } catch {
      this.iban = 'Invalid country code';
    }
  }

  copyToClipboard() {
    if (!this.iban) return;
    navigator.clipboard.writeText(this.iban).then(() => {
      this.copied = true;
      setTimeout(() => (this.copied = false), 2000);
    });
  }

  @HostListener('document:click', ['$event'])
  clickOutside(event: Event) {
    const target = event.target as HTMLElement;
    if (!target.closest('.combo-container')) {
      this.dropdownOpen = false;
    }
  }
}