import { Component, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { RouterLink } from '@angular/router';
import gsap from 'gsap';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  @ViewChildren('navs') navsRefs!: QueryList<ElementRef>;
  
  ngAfterViewInit(){
    this.navsRefs.forEach((navRef, index) => {
      gsap.to(navRef.nativeElement, {
        y: 0,
        opacity: 1,
        delay: index * 0.1,
        ease: "back.out",
        duration: 0.5,
        onComplete: () => {
          console.log(`Animação do item ${index + 1} concluída!`);
        }
      });
    });
  }
}
