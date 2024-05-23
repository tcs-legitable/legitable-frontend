// helpers go here
import { getDoc, doc, setDoc } from "@firebase/firestore";
import { db } from "./firebase";

export const getUserData = async (id) => {
  const docRef = doc(db, "users", id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    return null;
  }
};

export const addUser = async (uid, name, email, photoURL) => {
  const docSnap = await getUserData(uid);
  if (docSnap == null) {
    let data = {
      email: email,
      name: name,
      firstName: name.split(" ")[0],
      uid: uid,
      photoURL: photoURL,
      endorsees: [],
    };

    const userRef = doc(db, "users", uid);
    try {
      await setDoc(userRef, data);
      console.log("success!");
    } catch (e) {
      console.log("error is: ", e);
    }
  } else {
    console.log("user w/ the uid of ", uid, " already exists");
  }
};

// endorsee functions
export const addEndorsee = async (uid, data) => {
  const endorseeData = data;
  const userData = await getUserData(uid);
  const { endorsees } = userData;
  const updatedEndorsees = [...endorsees, endorseeData];

  const docRef = doc(db, "users", uid);
  try {
    await setDoc(docRef, { endorsees: updatedEndorsees }, { merge: true });
    console.log("doc update success!");
  } catch (error) {
    console.error("error updating document: ", error);
  }
};

export const deleteEndorsee = async (id, uid) => {
  const userData = await getUserData(uid);
  const { endorsees } = userData;
  const updatedEndorsees = endorsees.filter((endorsee) => endorsee.id !== id);

  const docRef = doc(db, "users", uid);
  try {
    await setDoc(docRef, { endorsees: updatedEndorsees }, { merge: true });
    console.log("endorsee is deleted of id: ", id);
  } catch (e) {
    console.log("error deleting endorsee w/ id of ", id, " and error of: ", e);
  }
};

export const getEndorsees = async (uid) => {
  const userData = await getUserData(uid);
  const { endorsees } = userData;
  console.log(endorsees, " within");
  return endorsees;
};

// waitlist functions
export const addWaitlistEntry = async (collection, name, email, id) => {
  let data = {
    email: email,
    name: name,
  };

  const docRef = doc(db, collection, id);
  try {
    await setDoc(docRef, data);
    console.log("success!");
  } catch (e) {
    console.log("error is: ", e);
  }
};
