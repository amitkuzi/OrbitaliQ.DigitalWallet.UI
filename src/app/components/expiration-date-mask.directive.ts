import { Directive, ElementRef, HostListener } from '@angular/core';


@Directive({
  selector: '[expDateMask]',
  standalone: true
})
  
export class ExpirationDateMaskDirective {

  constructor(  private element: ElementRef<HTMLDivElement>,) {
    
  }

  @HostListener('input', ['$event'])
  onInput(event: any) {
    const input = event.target;
    const inputValue = input.value.trim().replace(/\s+/g, ''); // Remove spaces
    console.log(inputValue);
    if (inputValue.length >= 5) {
      input.value = inputValue.substr(0, 5);
    }

    if (inputValue.length === 2 && !inputValue.includes('/')) {
      input.value = inputValue + '/';
    }
  }
}