import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
    selector: '[appHamburgerToggle]'
})
export class HamburgerToggleDirective {
    @HostBinding('class.is-active')
    private isActive = false;
    private collapse = true;

    @HostListener('click')
    toggleActive(): void {
        this.isActive = !this.isActive;
    }

    @HostListener('click')
    toggleCollapse(): void {
        this.collapse = !this.collapse;
    }
}