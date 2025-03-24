import {Component, inject} from '@angular/core';
import {MatButton, MatIconButton} from '@angular/material/button';
import {MatDialog} from '@angular/material/dialog';
import {MessageDialog} from '../shared/modals/create-message-dialog/create-message-dialog.component';
import {Message, MessagesFirebaseService} from '../shared/services/messages-firebase.service';
import {AsyncPipe, DatePipe} from '@angular/common';
import {
  MatCell, MatCellDef,
  MatColumnDef,
  MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow, MatRowDef,
  MatTable
} from '@angular/material/table';
import {MatIcon} from '@angular/material/icon';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-messages',
  imports: [
    MatButton,
    AsyncPipe,
    MatTable,
    MatColumnDef,
    MatHeaderCell,
    MatCell,
    MatHeaderRow,
    MatRow,
    MatHeaderRowDef,
    MatHeaderCellDef,
    MatCellDef,
    MatRowDef,
    DatePipe,
    MatIcon,
    MatIconButton,
  ],
  templateUrl: './messages.component.html'
})
export class MessagesComponent {
  messagesService = inject(MessagesFirebaseService)
  messages = this.messagesService.getMessages()
  dialog = inject(MatDialog)
  displayedColumns: string[] = ['id', 'email', 'message', 'date', 'buttons'];
  snackBar = inject(MatSnackBar);

  openCreateMessageDialog(): void {
    const dialogRef = this.dialog.open(MessageDialog);

    dialogRef.afterClosed().subscribe((result: {email: string, message: string}) => {
      if (result) {
        this.messagesService.addMessage({
            email: result.email,
            created_at: new Date(),
            message: result.message
        } as Message)
          .subscribe(() => {
            this.snackBar.open('Message successfully created!');
          })
      }
    });
  }

  onEditClick(row: Message){
    const dialogRef = this.dialog.open(MessageDialog, {
      data: row
    });

    dialogRef.afterClosed().subscribe((result: {email: string, message: string, id: string}) => {
      if (result) {
        this.messagesService.updateMessage({
          email: result.email,
          created_at: new Date(),
          message: result.message,
          id: result.id
        } as Message)
          .subscribe(() => {
            this.snackBar.open('Message successfully updated!');
          })
      }
    });
  }

  onDeleteClick(row: Message){
    const confirmation = confirm('Are you sure you want to delete this message?')

    if (confirmation) {
      this.messagesService.removeMessage(row.id)
        .subscribe(() => {
          this.snackBar.open('Message successfully deleted!');
        })
    }
  }
}
