export interface IResponseFindByEmail {
  id: string;
  name: string;
  email: string;
  image: string;
  role: string;
  isBlocked: false;
  isDeleted: true;
  passwordHash: string;
  createdAt: Date;
  updatedAt: Date;
  UserPermissions: [{ Permission: { name: string } }];
}
