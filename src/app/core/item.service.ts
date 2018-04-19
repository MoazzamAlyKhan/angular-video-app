import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore'

import { Item } from '../models/item';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ItemService {

  itemsCollection: AngularFirestoreCollection<Item>;
  items: Observable<Item[]>;

  constructor(public afs: AngularFirestore) {

    this.itemsCollection = this.afs.collection('items');

    this.items = this.itemsCollection.snapshotChanges().map(changes =>{
      return changes.map(a => {
        const data = a.payload.doc.data() as Item;
        data.id = a.payload.doc.id;
        return data;
      });
    });
   }

   getItems(){
     return this.items;
   }

   addItem(item: Item){
     this.itemsCollection.add(item);
   }
  

}

