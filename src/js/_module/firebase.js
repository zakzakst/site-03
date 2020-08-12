import firebase from 'firebase/app'
import 'firebase/database'
import 'firebase/auth'
import 'firebase/storage'
import { fireConfig } from './firebase-config'

let fireApp

if(!fireApp && !firebase.apps.length) {
  fireApp = firebase.initializeApp(fireConfig)
} else {
  fireApp = firebase.app()
}

export default fireApp
