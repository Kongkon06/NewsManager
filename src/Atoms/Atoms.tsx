import { atom } from "recoil";

interface Subscriber {
    id: string;
    email: string;
    dateJoined: string;
  }
  
interface Newsletter {
    id: string;
    title: string;
    status: string;
    created: string;
  }
  
  // Atom to store an array of Subscriber objects
  export const allSubscribersAtom = atom<Subscriber[]>({
    key: "allSubscribers",
    default: [],
  });

  export const allNewsLetterAtom = atom<Newsletter[]>({
    key: "allNewLetters",
    default: [],
  });