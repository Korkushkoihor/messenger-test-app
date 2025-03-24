import {inject, Injectable} from '@angular/core';
import {
  addDoc,
  collectionData,
  deleteDoc,
  doc,
  Firestore,
  setDoc
} from '@angular/fire/firestore';
import {
  collection,
  query,
  orderBy,
} from 'firebase/firestore';
import {from, Observable} from 'rxjs';

export interface Message {
  message: string;
  email: string;
  id: string;
  created_at: Date
}

@Injectable({
  providedIn: 'root'
})
export class MessagesFirebaseService {
  firestore = inject(Firestore);
  messagesCollection = collection(this.firestore, 'messages');

  getMessages(): Observable<Message[]> {
    const messagesQuery = query(
      collection(this.firestore, 'messages'),
      orderBy('created_at', 'asc')
    );

    return collectionData(messagesQuery, { idField: 'id' }) as Observable<Message[]>;
  }

  addMessage(message: Message): Observable<string> {
    const promise =
      addDoc(this.messagesCollection, message)
        .then(response => response.id);

    return from(promise);
  }

  removeMessage(id: string): Observable<void> {
    const docRef = doc(this.firestore, 'messages/' + id);
    const promise = deleteDoc(docRef);

    return from(promise);
  }

  updateMessage(message: Message): Observable<void> {
    const docRef = doc(this.firestore, 'messages/' + message.id);
    const promise = setDoc(docRef, message);

    return from(promise);
  }
}
