import {Directive, ElementRef, HostBinding, HostListener, OnInit, Renderer2} from '@angular/core';

@Directive({
  selector: '[appBasichighlight]'
})
export class BasichighlightDirective implements OnInit {
  @HostBinding('style.color') color = 'black';

  constructor(private elRef: ElementRef, private renderer: Renderer2) { }

  ngOnInit() {

  }

  @HostListener('mouseenter') mouseover(eventData: Event) {
    this.color = 'blue';
  }

  @HostListener('mouseleave') mouseleave(eventData: Event) {
    this.color = 'black';
  }

}
