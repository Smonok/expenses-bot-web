import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatListModule } from '@angular/material/list';
import { MatExpansionModule  } from '@angular/material/expansion';

@NgModule({
    imports: [
        MatSidenavModule,
        MatIconModule,
        MatButtonModule,
        MatListModule,
        MatMenuModule,
        MatToolbarModule,
        CommonModule,
        MatExpansionModule,
        MatTabsModule
    ],
    exports: [
        MatSidenavModule,
        MatIconModule,
        MatButtonModule,
        MatListModule,
        MatMenuModule,
        MatToolbarModule,
        CommonModule,
        MatExpansionModule,
        MatTabsModule
    ]
})
export class MaterialModule { }