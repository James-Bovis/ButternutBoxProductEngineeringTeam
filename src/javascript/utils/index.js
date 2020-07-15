// @flow

import { useState } from 'react';

import type { Gender } from '../data/teamMembers'

const genderToPronoun = (gender: Gender): string => {
  switch (gender) {
    case 'male': {
      return 'his'
    }
    case 'female': {
      return 'her'
    }
    default: {
      throw new Error(`Cannot create genderToPronoun for gender: ${gender}`)
    }
  }
}

const capitaliseFirstLetter = (word: string): string => {
  if (word.length === 0) { throw new Error('Invalid string to capitaliseFirstLetter - empty') }
  return `${word[0].toUpperCase()}${word.slice(1)}`
}

const useLocalStorage = (key: string, initialValue: string | boolean): void => {
  // State to store our value
  // Pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = useState(() => {
    try {
      // Get from local storage by key
      const item = window.localStorage.getItem(key);
      // Parse stored json or if none return initialValue
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      // If error also return initialValue
      console.log(error);
      return initialValue;
    }
  });

  // Return a wrapped version of useState's setter function that ...
  // ... persists the new value to localStorage.
  const setValue = value => {
    try {
      // Allow value to be a function so we have same API as useState
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      // Save state
      setStoredValue(valueToStore);
      // Save to local storage
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      // A more advanced implementation would handle the error case
      console.log(error);
    }
  };

  return [storedValue, setValue];
}

export {
  genderToPronoun,
  capitaliseFirstLetter,
  useLocalStorage
}
