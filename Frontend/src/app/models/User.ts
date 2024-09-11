export interface User {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  dob: Date;
  userType: string; 
  location: string;
  profilePicture?: string | ArrayBuffer | null;
}

