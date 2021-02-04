import { ElementRef, Directive, Input } from '@angular/core';

@Directive({
  exportAs: 'printer',
  selector: '[my-printer]'  
})
export class Printer {
  @Input() private printClasses: string
  constructor(protected el: ElementRef) {}    

  public print() {
    const myPrintContent = this.el.nativeElement;
    
    const myPrintWindow = window.open('', 'Print Grid', 'left=300,top=100,width=1500,height=800');

    myPrintWindow.document.write(myPrintContent.outerHTML);
    const cssRef = document.createElement('link');

    cssRef.onload = () => {
      (<HTMLElement>myPrintWindow.document.querySelector('.k-grid')).style.display = 'block'
      myPrintWindow.focus();

      myPrintWindow.print();
      myPrintWindow.close();
    }

    cssRef.rel = "stylesheet";
    cssRef.href = "https://cdn.jsdelivr.net/npm/@progress/kendo-theme-default@latest/dist/all.css";
    myPrintWindow.document.head.appendChild(cssRef);

    myPrintWindow.document.close();

    return false;
  }
}