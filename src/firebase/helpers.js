// helpers go here
import {
  getDoc,
  updateDoc,
  getDocs,
  doc,
  setDoc,
  collection,
} from '@firebase/firestore';
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from 'firebase/storage';
import { db, storage } from './firebase';

export const getAllUsers = async () => {
  const usersCol = collection(db, 'mvp_users');
  const userSnapshot = await getDocs(usersCol);
  const userList = userSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return userList;
};

export const doesUserExist = async (id) => {
  const docRef = doc(db, 'mvp_users', id);
  const docSnap = await getDoc(docRef);

  return docSnap.exists();
};

export const doesProjectExist = async (id) => {
  const docRef = doc(db, 'projects', id);
  const docSnap = await getDoc(docRef);

  return docSnap.exists();
};

// GET DATA FUNCTIONS
export const getUserData = async (id) => {
  const docRef = doc(db, 'mvp_users', id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    return null;
  }
};

export const getProjectData = async (id) => {
  const docRef = doc(db, 'projects', id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    return null;
  }
};

export const getEndorseeUserData = async (id) => {
  const docRef = doc(db, 'users', id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    return null;
  }
};

// adding users MVP - June 2, 2024
export const addStupaidUser = async (data) => {
  const uid = data?.uid;
  const docSnap = await getUserData(uid);
  if (docSnap === null) {
    const userRef = doc(db, 'mvp_users', uid);
    try {
      await setDoc(userRef, data);
      console.log('success!');
    } catch (e) {
      console.log('error is: ', e);
    }
  } else {
    console.log('user w/ the uid of ', uid, ' already exists');
  }
};

export const updateStupaidUser = async (uid, updatedFields) => {
  if (!uid) {
    console.error('UID is required!');
    return;
  }

  const userRef = doc(db, 'mvp_users', uid);
  const docSnap = await getUserData(uid);

  if (docSnap !== null) {
    try {
      await updateDoc(userRef, updatedFields);
    } catch (error) {
      console.log('error encountered while updating fields: ', error);
    }
  }
};

// user skills helper functions
export const getExistingSkillNames = async (uid) => {
  const docSnap = await getUserData(uid);
  const { skills } = docSnap;
  const res = [];
  skills.forEach((skill) => {
    res.push(skill?.skillName);
  });

  return res;
};

export const updateSkills = async (uid, skillName, updatedSkills) => {
  if (!uid) {
    console.error('UID is required!');
    return;
  }
  const userRef = doc(db, 'mvp_users', uid);
  const docSnap = await getUserData(uid);
  const { skills } = docSnap;

  const updatedSkillsArray = skills.map((skill) => {
    if (skill?.skillName === skillName) {
      return { ...skill, ...updatedSkills };
    }
    return skill;
  });

  if (skills !== null) {
    try {
      await updateDoc(userRef, { skills: updatedSkillsArray });
      console.log('success');
    } catch (error) {
      console.log('error encountered while updating fields: ', error);
    }
  }
};

export const addSkill = async (uid, newSkill) => {
  if (!uid) {
    console.error('UID is required!');
    return;
  }
  const userRef = doc(db, 'mvp_users', uid);
  const docSnap = await getUserData(uid);
  const { skills } = docSnap;

  console.log(skills, ' are the skills AFTER');
  skills.push(newSkill);
  console.log(skills, ' are the skills AFTER');

  if (skills !== null) {
    try {
      await updateDoc(userRef, { skills: skills });
      console.log('success');
    } catch (error) {
      console.log('error encountered while updating fields: ', error);
    }
  }
};

export const deleteSkillFromDB = async (uid, skillName) => {
  if (!uid) {
    console.error('UID is required!');
    return;
  }
  const userRef = doc(db, 'mvp_users', uid);
  const docSnap = await getUserData(uid);
  const { skills } = docSnap;

  const updatedSkillsArray = skills.filter(
    (skill) => skill.skillName !== skillName,
  );

  try {
    await updateDoc(userRef, { skills: updatedSkillsArray });
  } catch (error) {
    console.log('Error deleting skill: ', error);
  }
};

export const studentAlreadyAppliedForProject = async (studentId, projectId) => {
  const data = await getUserData(studentId);
  return data?.projects?.some((project) => project === projectId) || false;
};

// uploading + deleting image helpers
export const uploadImage = async (file, userId, imagePath) => {
  const storageRef = ref(storage, imagePath || `images/${userId}/${file.name}`);
  const snapshot = await uploadBytes(storageRef, file);
  const url = await getDownloadURL(snapshot.ref);
  return { url, path: snapshot.ref.fullPath };
};

export const deleteImage = async (imagePath) => {
  const imageRef = ref(storage, imagePath);
  await deleteObject(imageRef);
};

// student applies for a project
export const applyForProject = async (
  studentId,
  projectId,
  applicationDescription,
) => {
  const userExists = await doesUserExist(studentId);
  const projectExists = await doesProjectExist(projectId);
  const studentApplied = await studentAlreadyAppliedForProject(
    studentId,
    projectId,
  );
  if (userExists && projectExists && !studentApplied) {
    // updating the user side
    const studentRef = doc(db, 'mvp_users', studentId);
    const studentSnap = await getDoc(studentRef);
    const updatedStudentData = {
      ...studentSnap.data(),
      projects: [...(studentSnap.data().projects || []), projectId],
    };

    // updating the project side
    const projectRef = doc(db, 'projects', projectId);
    const projectSnap = await getDoc(projectRef);

    const projectApplication = {
      studentId: studentId,
      studentName: studentSnap.data().full_name,
      applicationDescription: applicationDescription,
      time_applied: new Date().toISOString(),
    };
    const updatedProjectData = {
      ...projectSnap.data(),
      applications: [
        ...(projectSnap.data().applications || []),
        projectApplication,
      ],
    };
    try {
      await setDoc(studentRef, updatedStudentData);
      await setDoc(projectRef, updatedProjectData);
      return true;
    } catch (e) {
      console.log('error: ', e);
      return false;
    }
  }
};

// old when endorsees was a thing
export const addUser = async (uid, name, email, photoURL) => {
  const docSnap = await getEndorseeUserData(uid);
  if (docSnap == null) {
    let data = {
      email: email,
      name: name,
      firstName: name.split(' ')[0],
      uid: uid,
      photoURL: photoURL,
      endorsees: [],
    };

    const userRef = doc(db, 'users', uid);
    try {
      await setDoc(userRef, data);
      console.log('success!');
    } catch (e) {
      console.log('error is: ', e);
    }
  } else {
    console.log('user w/ the uid of ', uid, ' already exists');
  }
};

// endorsee functions
export const addEndorsee = async (uid, data) => {
  const endorseeData = data;
  const userData = await getEndorseeUserData(uid);
  const { endorsees } = userData;
  const updatedEndorsees = [...endorsees, endorseeData];

  const docRef = doc(db, 'users', uid);
  try {
    await setDoc(docRef, { endorsees: updatedEndorsees }, { merge: true });
    console.log('doc update success!');
  } catch (error) {
    console.error('error updating document: ', error);
  }
};

export const deleteEndorsee = async (id, uid) => {
  const userData = await getEndorseeUserData(uid);
  const { endorsees } = userData;
  const updatedEndorsees = endorsees.filter((endorsee) => endorsee.id !== id);

  const docRef = doc(db, 'users', uid);
  try {
    await setDoc(docRef, { endorsees: updatedEndorsees }, { merge: true });
    console.log('endorsee is deleted of id: ', id);
  } catch (e) {
    console.log('error deleting endorsee w/ id of ', id, ' and error of: ', e);
  }
};

export const getEndorsees = async (uid) => {
  const userData = await getEndorseeUserData(uid);
  const { endorsees } = userData;
  console.log(endorsees, ' within');
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
    console.log('success!');
  } catch (e) {
    console.log('error is: ', e);
  }
};

export const addOrganizationWaitlistEntry = async (
  name,
  organizationName,
  email,
  socialLink,
  country,
  city,
  id,
) => {
  let data = {
    name: name,
    organizationName: organizationName,
    email: email,
    socialLink: socialLink,
    country: country,
    city: city,
  };

  const docRef = doc(db, 'organization', id);
  try {
    await setDoc(docRef, data);
    console.log('success!');
  } catch (e) {
    console.log('error is: ', e);
  }
};

export const addStudentWaitlistEntry = async (
  name,
  email,
  id,
  school,
  year,
  country,
  city,
  projectPref,
  skills,
) => {
  let data = {
    email: email,
    name: name,
    school: school,
    year: year,
    country: country,
    city: city,
    projectPref: projectPref,
    skills: skills,
  };

  const docRef = doc(db, 'student', id);
  try {
    await setDoc(docRef, data);
    console.log('success!');
  } catch (e) {
    console.log('error is: ', e);
  }
};
