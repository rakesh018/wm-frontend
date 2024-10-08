import { atom, selector } from "recoil";
import Base_Url from "./config";

// export const profileAtom = atom({
//   key: "profileAtom", // unique ID (with respect to other atoms/selectors)
//   default: {
//     // Default value or handle error state
//     _id: "",
//     phone: "",
//     email: "",
//     uid: "",
//     balance: 0,
//     referralCode: "",
//   },
// });

export const betSlipsAtom = atom({
  //store betSlips of a particular user
  key: "betSlipsAtom",
  default: [],
});

export const profileAtom = atom({
  key: "profileAtom",
  default: selector({
    key: "profileAtomSelector",
    get: async () => {
      try {
        const res = await fetch(
           `${Base_Url}/profile/getProfile`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        ); //to simulate the delay artificially so to check loading
        return res.json();
      } catch (error) {
        return {
          // Default value or handle error state
          _id: "",
          phone: "",
          email: "",
          uid: "",
          balance: 0,
          referralCode: "",
        };
      }
    },
  }),
});
