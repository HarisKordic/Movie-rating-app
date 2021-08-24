// Convert time to hours and minutes
export const calcTime = (time) => {
  const hours = Math.floor(time / 60);
  const mins = time % 60;
  return `${hours}h ${mins}m`;
};
// Convert a number to money formatting
export const convertMoney = (money) => {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  });
  return formatter.format(money);
};

export const isPersistedState = (stateName) => {
  //Returning the name provided from the sessionStorage:
  const sessionState = sessionStorage.getItem(stateName); //Can be swapped to localStorage();
  return sessionState && JSON.parse(sessionState); //If sessionState is not null it returns stringified sessionState;
};
