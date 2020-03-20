import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app-fb.component.html',
  styleUrls: ['./app-fb.component.css']
})
export class AppFbComponent implements OnInit {
  constructor() { }

  ngOnInit(): void {
    const firebaseConfig = {
      apiKey: 'AIzaSyBa7C87C8XeLBMKrM75w7DKY3HWbzK71lo',
      authDomain: 'amsterdam-events-601e5.firebaseapp.com',
      databaseURL: 'https://amsterdam-events-601e5.firebaseio.com',
      projectId: 'amsterdam-events-601e5',
      storageBucket: 'amsterdam-events-601e5.appspot.com',
      messagingSenderId: '249406826117',
      appId: '1:249406826117:web:a0102dc5c41cab86ce2bec'
    };

    firebase.initializeApp(firebaseConfig);
    console.log('firebase initialized');
  }
}
