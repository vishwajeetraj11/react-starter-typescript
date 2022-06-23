/*
https://www.youtube.com/watch?v=kTKYpkLb3u8
*/
import { User } from './thirdParty';

type City = User['address']['city'];

type IdorName = User['id' | 'name'];

type UserId = User['id'];
type UserAddress = User['address'];

/*
keyof operator
It is used to query the names of the property of types and represent them as a union.
*/

function updateAddress(id: UserId, newAddress: UserAddress) {}

type UserProperties = keyof User;

let userProperty: UserProperties = 'id';
let someStr: string = userProperty;
// userProperty

function getProperty<T, K extends keyof T>(obj: T, key: K) {
  return obj[key];
}

const user = { name: 'John Doe' };

const userId = getProperty(user, 'name');

/*
Actual implementation
    addEventListener<K extends keyof DocumentEventMap>(type: K, listener: (this: Document, ev: DocumentEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;

*/

document.addEventListener('click', (e) => {});
document.addEventListener('keypress', (e) => {});

interface MyMouseEvent {
  x: number;
  y: number;
}

interface MyKeyboardEvent {
  key: string;
}

interface MyEventObjects {
  click: MyMouseEvent;
  keypress: MyKeyboardEvent;
}

function handleEvent<K extends keyof MyEventObjects>(
  eventName: K,
  callback: (e: MyEventObjects[K]) => void
) {
  if (eventName === 'click') {
    callback({ x: 0, y: 8 } as MyEventObjects[K]);
  } else if (eventName === 'keypress') {
    callback({ key: 'Enter' } as MyEventObjects[K]);
  }
}

handleEvent('click', (e) => {});
handleEvent('keypress', (e) => {});

type MyEvents = MyEventObjects[keyof MyEventObjects];

/*-----------------------------------------------------------------*/
export const x = 4;
