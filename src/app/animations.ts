import {animation, style, animate, useAnimation, transition, trigger} from "@angular/animations";

export var slideDown = animation([
  style({'overflow-y': 'hidden', 'height': 0, opacity: 0 }),
  animate('500ms ease-in-out')
]);

export var slideUp = animation([
  animate('500ms ease-in-out', style({'overflow-y': 'hidden', 'height': 0, opacity: 0 }))
]);

export const verticleSlide = [
  trigger('vslider', [
    transition(':enter', [useAnimation(slideDown)]),
    transition(':leave', [useAnimation(slideUp)])
  ])
];

export var fadeOut = animation([
  animate( '300ms', style({opacity: 0 }))
]);

export var fadeIn = animation([
  style({ opacity: 0 }),
  animate( '300ms', style({opacity: 1 }))
]);

export const fadeInOut = [
  trigger('fadeInOut', [
    transition(':enter', [useAnimation(fadeIn)]),
    transition(':leave', [useAnimation(fadeOut)])
  ])
];
