import { Component } from '@angular/core';
import { NavigationBarComponent } from "../../components/navigation-bar/navigation-bar.component";
import { PmContainerComponent } from "../../components/pm-container/pm-container.component";
import { MatDialog } from '@angular/material/dialog';
import { AddNewCardDialogComponent } from '../../components/add-new-card-dialog/add-new-card-dialog.component';

@Component({
    selector: 'app-wallet-page',
    standalone: true,
    templateUrl: './wallet-page.component.html',
    styleUrl: './wallet-page.component.css',
    imports: [NavigationBarComponent, PmContainerComponent,AddNewCardDialogComponent]
})
export class WalletPageComponent {
    constructor(private dialog: MatDialog) {}
  AddNewCard() {
        const dialogRef = this.dialog.open(AddNewCardDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog result:', result);
      // Here you can handle the result of the dialog
    });
  }

}
