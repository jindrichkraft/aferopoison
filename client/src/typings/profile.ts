import { IUserInfo } from './auth';

export interface IProfile {
  username: IUserInfo['username'];
  display_name: IUserInfo['displayName'];
}
