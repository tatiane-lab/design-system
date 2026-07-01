import {
  Component,
  Input,
  Output,
  EventEmitter,
  HostListener,
  ViewChild,
  ElementRef,
  AfterViewInit,
  OnDestroy,
  signal,
} from '@angular/core';

@Component({
  selector: 'ui-modal',
  standalone: true,
  template: `
    <div
      class="modal-backdrop"
      [class.is-open]="isOpen"
      role="dialog"
      [attr.aria-modal]="true"
      [attr.aria-labelledby]="titleId"
      [attr.aria-describedby]="descId"
      (click)="onBackdropClick($event)"
    >
      <div #panel class="modal-panel" tabindex="-1">
        <header class="modal-header">
          <h2 [id]="titleId" class="modal-title">{{ title }}</h2>
          <button
            class="modal-close"
            (click)="close()"
            aria-label="Close dialog"
          >×</button>
        </header>

        <div [id]="descId" class="modal-body">
          <ng-content />
        </div>

        @if (showFooter) {
          <footer class="modal-footer">
            <ng-content select="[slot=footer]" />
          </footer>
        }
      </div>
    </div>
  `,
})
export class ModalComponent implements AfterViewInit, OnDestroy {
  @Input({ required: true }) title = '';
  @Input() isOpen = false;
  @Input() showFooter = true;

  @Output() closed = new EventEmitter<void>();

  @ViewChild('panel') panelRef!: ElementRef<HTMLDivElement>;

  private static idCounter = 0;
  titleId = `modal-title-${++ModalComponent.idCounter}`;
  descId = `modal-desc-${ModalComponent.idCounter}`;

  private previouslyFocused: HTMLElement | null = null;

  ngAfterViewInit() {
    if (this.isOpen) this.trapFocus();
  }

  ngOnDestroy() {
    this.restoreFocus();
  }

  @HostListener('keydown.escape')
  onEscape() {
    this.close();
  }

  close() {
    this.closed.emit();
    this.restoreFocus();
  }

  onBackdropClick(event: MouseEvent) {
    if ((event.target as HTMLElement).classList.contains('modal-backdrop')) {
      this.close();
    }
  }

  private trapFocus() {
    this.previouslyFocused = document.activeElement as HTMLElement;
    this.panelRef?.nativeElement.focus();
  }

  private restoreFocus() {
    this.previouslyFocused?.focus();
  }
}
