import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

export interface ConfirmDialogData {
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
}

@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule
  ],
  template: `
    <div class="confirm-dialog">
      <div class="dialog-icon">
        <mat-icon color="warn">warning</mat-icon>
      </div>
      
      <h2 mat-dialog-title>{{ data.title }}</h2>
      
      <mat-dialog-content>
        <p class="dialog-message">{{ data.message }}</p>
      </mat-dialog-content>
      
      <mat-dialog-actions align="end">
        <button mat-button (click)="onCancel()">
          {{ data.cancelText || 'Cancelar' }}
        </button>
        <button mat-raised-button color="warn" (click)="onConfirm()">
          {{ data.confirmText || 'Confirmar' }}
        </button>
      </mat-dialog-actions>
    </div>
  `,
  styles: [`
    .confirm-dialog {
      padding: 20px;
    }
    
    .dialog-icon {
      text-align: center;
      margin-bottom: 20px;
    }
    
    .dialog-icon mat-icon {
      font-size: 64px;
      width: 64px;
      height: 64px;
      color: #f44336;
    }
    
    h2 {
      text-align: center;
      font-size: 24px;
      font-weight: 500;
      margin-bottom: 16px;
      color: #333;
    }
    
    .dialog-message {
      text-align: center;
      font-size: 16px;
      color: #666;
      margin: 20px 0;
      line-height: 1.5;
    }
    
    mat-dialog-content {
      min-width: 400px;
    }
    
    mat-dialog-actions {
      padding-top: 20px;
      gap: 10px;
    }
    
    button {
      min-width: 100px;
    }
  `]
})
export class ConfirmDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ConfirmDialogData
  ) {}

  onConfirm(): void {
    this.dialogRef.close(true);
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}