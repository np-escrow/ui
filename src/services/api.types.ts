export type Signin = {
  message: string;
};

export type UserMetadata = {
  senderOnboarding: boolean;
  recipientOnboarding: boolean;
};

export type ResSignin = {
  accessToken: string;
  metadata: UserMetadata;
};

export type ResBalance = {
  entire: number;
  accessible: number;
};
