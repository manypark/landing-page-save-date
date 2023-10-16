import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: 'input[numbersOnly]',
})
export class OnlyNumbersDirective {

  constructor(private readonly elRef: ElementRef) { }
  @HostListener('input', ['$event'])
  onInputChange(event: Event): void {
    
    const numbersOnly = /[^0-9]*/g

    const initValue = this.elRef.nativeElement.value;
    this.elRef.nativeElement.value = initValue.replace(numbersOnly, '')
    if (initValue !== this.elRef.nativeElement.value) {
      event.stopPropagation();
    }
  }

}
