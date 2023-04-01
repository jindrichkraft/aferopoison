export interface IUserAuth {
  user_id: number;
  username: string;
  password: string;
}

export interface IUserInfo extends IUserAuth {
  displayName: string;
}

export interface IAuthData {
  userInfo: {
    displayName: IUserInfo['displayName'];
  };
  tokenData: {
    accessToken: string;
    tokenType: string;
    expiresIn: number;
  };
}
