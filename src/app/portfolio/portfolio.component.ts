import { Component, AfterViewInit, QueryList, ElementRef, ViewChildren, ViewChild, OnDestroy } from '@angular/core';
import gsap from 'gsap';
import { CSSRulePlugin } from 'gsap/dist/CSSRulePlugin';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { ParticlesComponent } from '../particles/particles.component';
import { NgxTypedWriterModule } from 'ngx-typed-writer';
import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'

gsap.registerPlugin(gsap);

interface tecs {
  icon: string,
  description: string,
}

@Component({
  standalone: true,
  imports: [NgxTypedWriterModule, ParticlesComponent, FontAwesomeModule],
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent {
  @ViewChild('texts') textsRef!: ElementRef;
  @ViewChildren('navs') navsRefs!: QueryList<ElementRef>;
  @ViewChild('writer') writerRef!: ElementRef;
  @ViewChild('dot', { static: false }) dotRef!: ElementRef;
  @ViewChild('image') imageRef!: ElementRef;
  @ViewChild('text') textRef!: ElementRef;
  @ViewChild('text2') text2Ref!: ElementRef;
  @ViewChild('text3') text3Ref!: ElementRef;
  @ViewChildren('cards') cardsRefs!: QueryList<ElementRef>;
  @ViewChildren('cardsProjects') cardsProjectsRefs!: QueryList<ElementRef>;

  strings: string[] = [
    'Desenvolvedor Full Stack',
    'Cientista da Computação',
    'Apaixonado por programação'
  ];

  tecnologies: tecs[] = [
    { icon: 'devicon-typescript-plain', description: 'TypeScript' },
    { icon: 'devicon-angularjs-plain', description: 'Angular' },
    { icon: 'devicon-nestjs-original', description: 'Nest JS' },
    { icon: 'devicon-github-original', description: 'Github' },
    { icon: 'devicon-git-plain', description: 'Git' },
  ]

  faArrowUpRightFromSquare = faArrowUpRightFromSquare;

  ngAfterViewInit(): void {
    if (typeof window !== "undefined") {
      gsap.registerPlugin(CSSRulePlugin, ScrollTrigger);
    }

    setTimeout(() => {
      this.createAnimations();
    }, 100);
  }

  ngOnDestroy(): void {
    this.killAllTweens();
  }

  private createAnimations(): void {
    gsap.to(this.textsRef.nativeElement, {
      // scrollTrigger: {
      //   trigger: this.textsRef.nativeElement,
      //   start: "0", // Inicia a animação quando 90% do elemento estiver visível no topo da janela
      //   end: "top 27%", // Conclui a animação quando 80% do elemento estiver visível no topo da janela
      //   scrub: true,
      //   invalidateOnRefresh: true
      // },
      x: 0,
      opacity: 1,
      ease: "power2.out",
      duration: 1,
      onComplete: () => {
        console.log("Animação de texto concluída!");
      }
    });

    gsap.to(this.imageRef.nativeElement, {
      x: 0,
      opacity: 3,
      ease: "power2.out",
      duration: 1,
      onComplete: () => {
        console.log("Animação de texto concluída!");
      }
    });

    gsap.to(this.textRef.nativeElement, {
      scrollTrigger: {
        trigger: this.textRef.nativeElement,
        start: "top 75%", // Inicia a animação quando 90% do elemento estiver visível no topo da janela
        end: "top 0%", // Conclui a animação quando 80% do elemento estiver visível no topo da janela
        scrub: true,
        invalidateOnRefresh: true
      },
      scale: 1.0,
      opacity: 1,
      duration: 1,
      ease: 'power2.out',
      onComplete: () => {
        console.log('Animação completa!');
      }
    });

    gsap.to(this.text2Ref.nativeElement, {
      scrollTrigger: {
        trigger: this.text2Ref.nativeElement,
        start: "top 75%",
        end: "top 0%",
        scrub: true,
        invalidateOnRefresh: true
      },
      scale: 1.0,
      opacity: 1,
      duration: 1,
      ease: 'power2.out',
      onComplete: () => {
        console.log('Animação completa!');
      }
    });

    gsap.to(this.text3Ref.nativeElement, {
      scrollTrigger: {
        trigger: this.text3Ref.nativeElement,
        start: "top 75%",
        end: "top 0%",
        scrub: true,
        invalidateOnRefresh: true
      },
      scale: 1.0,
      opacity: 1,
      duration: 1,
      ease: 'power2.out',
      onComplete: () => {
        console.log('Animação completa!');
      }
    });

    this.cardsRefs.forEach((cardsRef, index) => {
      gsap.from(cardsRef.nativeElement, {
        scrollTrigger: {
          trigger: this.text2Ref.nativeElement,
          start: 'top 65%%',
          end: 'top 10%',
          scrub: true,
          invalidateOnRefresh: true
        },
        y: index % 2 === 0 ? '200' : '-200',
        scale: 1.3,
        opacity: 0,
        delay: 0.1,
        ease: "power2.out",
        duration: 0.5,
        onComplete: () => {
          console.log(`Animação do item ${index + 1} concluída!`);
        }
      });
      // cardsRef.nativeElement.addEventListener('mouseenter', () => {
      //   gsap.to(cardsRef.nativeElement, { scale: 1.1, duration: 0.3 });
      // });

      // cardsRef.nativeElement.addEventListener('mouseleave', () => {
      //   gsap.to(cardsRef.nativeElement, { scale: 1.0, duration: 0.3 });
      // });
    });

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: '.container-card-projects',
        start: 'top 65%%',
        end: 'top 10%',
        scrub: true,
        markers: true,
      },
    });

    this.cardsProjectsRefs.forEach((cardsProjectsRefs, index) => {
      const isRight = index % 2 === 0;
      timeline.from(cardsProjectsRefs.nativeElement, {
        x: isRight ? '-200px' : '200px',
        opacity: 0,
        scale: 1.2,
        duration: 1,
        ease: 'power2.out',
      });
    });
  }

  private killAllTweens(): void {
    gsap.killTweensOf([
      this.textsRef.nativeElement,
      ...this.navsRefs.toArray().map(ref => ref.nativeElement),
    ]);
  }
}
