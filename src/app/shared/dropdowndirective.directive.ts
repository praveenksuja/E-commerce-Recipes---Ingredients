import {Directive, HostBinding, HostListener} from '@angular/core';

@Directive({
  selector: '[appDropdowndirective]'
})
export class DropdowndirectiveDirective {

  @HostBinding('class.open') onOpen = false;
  @HostListener('click') toggleOpen(){
    this.onOpen = !this.onOpen;
  }
  constructor () { }

}
