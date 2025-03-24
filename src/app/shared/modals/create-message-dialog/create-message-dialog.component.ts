import {Component, inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {MatButton, MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {MatError, MatFormField, MatInput, MatLabel} from '@angular/material/input';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {Message} from '../../services/messages-firebase.service';

@Component({
  selector: 'app-create-message-dialog',
  imports: [
    MatIcon,
    MatIconButton,
    MatFormField,
    MatInput,
    MatLabel,
    MatError,
    ReactiveFormsModule,
    MatButton,
    FormsModule,
  ],
  templateUrl: './create-message-dialog.component.html',
})
export class MessageDialog {
  dialogRef = inject(MatDialogRef<MessageDialog>);
  data: Message = inject(MAT_DIALOG_DATA);
  form = new FormGroup({
    email: new FormControl(this.data?.email || '', [Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]),
    message: new FormControl(this.data?.message || '', [Validators.required]),
  })

  onCancelClick(): void {
    this.dialogRef.close();
  }

  submitForm() {
    if (this.form.invalid) {
      this.form.markAsTouched()
    } else {
      this.dialogRef.close({email: this.form.controls.email.value, message: this.form.controls.message.value, id: this?.data?.id});
    }
  }
}
