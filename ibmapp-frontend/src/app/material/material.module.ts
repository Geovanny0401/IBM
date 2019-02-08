import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatTableModule, MatPaginatorModule, MatToolbarModule, MatIconModule, MatCardModule, MatFormFieldModule, MatInputModule, MatSnackBarModule, MatSidenavModule, MatMenuModule, MatDividerModule, MatDialogModule, MatSortModule, MatPaginatorIntl, MatSelectModule, MatDatepickerModule, MAT_DATE_LOCALE, MatNativeDateModule, MatExpansionModule, MatListModule, MatAutocompleteModule } from '@angular/material';
import { MatPaginatorImpl } from './mat-paginator';

@NgModule({
    imports: [ CommonModule,
        BrowserAnimationsModule,
        MatButtonModule,
        MatTableModule,
        MatPaginatorModule,
        MatToolbarModule,
        MatIconModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatSnackBarModule,
        MatSidenavModule,
        MatMenuModule,
        MatDividerModule,
        MatDialogModule,
        MatSortModule,
        MatSelectModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatExpansionModule,
        MatListModule,
        MatAutocompleteModule],
    exports: [MatButtonModule,
        MatTableModule,
        MatPaginatorModule,
        MatToolbarModule,
        MatIconModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatSnackBarModule,
        MatSidenavModule,
        MatMenuModule,
        MatDividerModule,
        MatDialogModule,
        MatSortModule,
        MatSelectModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatExpansionModule,
        MatListModule,
        MatAutocompleteModule],
        providers: [{ provide: MatPaginatorIntl, useClass: MatPaginatorImpl } ,
            { provide: MAT_DATE_LOCALE, useValue: 'es-ES'}
          ],
})
export class MaterialModule {}