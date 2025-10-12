import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';


@Component({
  selector: 'app-product-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatSnackBarModule
  ],
  template: `
    <h2 mat-dialog-title>{{ isEditMode ? 'Editar Produto' : 'Novo Produto' }}</h2>
    <mat-dialog-content>
      <form [formGroup]="productForm" class="product-form">
        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Nome do Produto</mat-label>
          <input matInput formControlName="name" placeholder="Digite o nome">
          <mat-error *ngIf="productForm.get('name')?.hasError('required')">
            Nome é obrigatório
          </mat-error>
        </mat-form-field>

        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Descrição</mat-label>
          <textarea matInput formControlName="description" rows="3" placeholder="Digite a descrição"></textarea>
        </mat-form-field>

        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Preço</mat-label>
          <input matInput type="number" formControlName="price" placeholder="0.00" step="0.01">
          <span matPrefix>R$ &nbsp;</span>
          <mat-error *ngIf="productForm.get('price')?.hasError('required')">
            Preço é obrigatório
          </mat-error>
          <mat-error *ngIf="productForm.get('price')?.hasError('min')">
            Preço deve ser maior que zero
          </mat-error>
        </mat-form-field>

        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Estoque</mat-label>
          <input matInput type="number" formControlName="stock" placeholder="0">
          <mat-error *ngIf="productForm.get('stock')?.hasError('min')">
            Estoque não pode ser negativo
          </mat-error>
        </mat-form-field>

        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Categoria</mat-label>
          <mat-select formControlName="category">
            <mat-option value="Eletrônicos">Eletrônicos</mat-option>
            <mat-option value="Acessórios">Acessórios</mat-option>
            <mat-option value="Móveis">Móveis</mat-option>
            <mat-option value="Roupas">Roupas</mat-option>
            <mat-option value="Livros">Livros</mat-option>
            <mat-option value="Geral">Geral</mat-option>
          </mat-select>
        </mat-form-field>
      </form>
    </mat-dialog-content>

    <mat-dialog-actions align="end">
      <button mat-button (click)="onCancel()">Cancelar</button>
      <button mat-raised-button color="primary" (click)="onSave()" [disabled]="!productForm.valid || loading">
        {{ loading ? 'Salvando...' : 'Salvar' }}
      </button>
    </mat-dialog-actions>
  `,
  styles: [`
    .product-form { display: flex; flex-direction: column; padding: 20px 0; }
    .full-width { width: 100%; margin-bottom: 15px; }
    mat-dialog-content { min-width: 500px; }
  `]
})
export class ProductDialogComponent implements OnInit {
  productForm!: FormGroup;
  isEditMode = false;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private dialogRef: MatDialogRef<ProductDialogComponent>,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: Product | null
  ) {}

  ngOnInit(): void {
    this.isEditMode = !!this.data;
    this.initForm();
  }

  initForm(): void {
    this.productForm = this.fb.group({
      name: [this.data?.name || '', [Validators.required]],
      description: [this.data?.description || ''],
      price: [this.data?.price || '', [Validators.required, Validators.min(0.01)]],
      stock: [this.data?.stock || 0, [Validators.min(0)]],
      category: [this.data?.category || 'Geral', [Validators.required]]
    });
  }

  onSave(): void {
    if (this.productForm.valid) {
      this.loading = true;
      const productData = this.productForm.value;
      const request = this.isEditMode
        ? this.productService.updateProduct(this.data!.id!, productData)
        : this.productService.createProduct(productData);

      request.subscribe({
        next: () => {
          this.showMessage(this.isEditMode ? 'Produto atualizado com sucesso!' : 'Produto criado com sucesso!', 'success');
          this.dialogRef.close(true);
        },
        error: (error) => {
          this.showMessage('Erro ao salvar produto: ' + error.message, 'error');
          this.loading = false;
        }
      });
    }
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }

  showMessage(message: string, type: 'success' | 'error'): void {
    this.snackBar.open(message, 'Fechar', {
      duration: 3000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
      panelClass: type === 'success' ? ['success-snackbar'] : ['error-snackbar']
    });
  }
}