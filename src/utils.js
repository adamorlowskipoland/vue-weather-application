export function uniqueId() {
  return Math.random().toString(16).slice(2);
}

export function saveStatePlugin(store) {
  store.subscribe(
    (mutation, state) => {
      localStorage.setItem('stations', JSON.stringify(state.stations));
      localStorage.setItem('postalCodes', JSON.stringify(state.postalCodes));
    },
  );
}
