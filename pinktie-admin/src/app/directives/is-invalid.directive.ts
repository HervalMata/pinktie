import {Directive, ElementRef, Input} from '@angular/core';
import {NgControl} from "@angular/forms";

@Directive({
  selector: '[IsInvalid]'
})
export class IsInvalidDirective {

  constructor(
    private element: ElementRef,
    private control: NgControl
  ) { }

  ngOnINit() {
    toogleClassInvalid(this.control, this.element.nativeElement);
  }

}

@Directive({
  selector: '[IsInvalidControl]'
})
export class IsInvalidControlDirective {
  control: NgControl;
  constructor(private element: ElementRef) {
  }
  ngOnINit() {
    toogleClassInvalid(this.control, this.element.nativeElement);
  }
  @Input()
  set isInvalidControl(value) {
    this.control = value;
  }
}
function toogleClassInvalid(control: NgControl, nativeElement: any) {
  control.valueChanges.subscribe(() => {
    if (control.invalid && (control.dirty || control.touched)) {
      if (!nativeElement.classList.contains('is-invalid')) {
        nativeElement.classList.add('is-invalid');
      }
    } else {
      nativeElement.classList.remove('is-invalid');
    }
  })
}
