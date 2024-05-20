import { Avatar, Role } from "../models/user";

interface ProviderConfig {
  name: string;
  logo: string;
}
interface Provider {
  [key: string]: ProviderConfig;
}
export const Providers: Provider = {
  google: {
    name: 'Google',
    logo: 'assets/google.svg',
  },
  github: {
    name: 'Github',
    logo: 'assets/github.svg',
  },
  discord: {
    name: 'Discord',
    logo: 'assets/discord.svg',
  },
  linkedin: {
    name: 'LinkedIn',
    logo: 'assets/linkedin.svg',
  },
};

export const Avatars = {
  panda: '/assets/panda-avatar.jpeg',
  giraff: '/assets/giraff-avatar.jpeg',
  koala: '/assets/koala-avatar.jpeg',
  doge: '/assets/dog-avatar.jpeg',
  polar: '/assets/polar-bear-avatar.jpeg',
  lion: '/assets/lion-avatar.jpeg'
}

export const Roles: Role[] = [
  {
    name: 'Developer',
  },
  {
    name: 'Merchant'
  },
  {
    name: 'Product developer'
  }

]


export const GetProvider = (name: string | undefined) => {
  let providerConfig: any = null;

  if (!name) return providerConfig;
  Object.keys(Providers).forEach((providerName, idx: number) => {
    if (name.toLowerCase().startsWith(providerName)) {
      providerConfig = Providers[providerName];
    }
  });
  if (!providerConfig) {
    providerConfig = {
      name: 'email',
      logo: null,
    };
  }
  return providerConfig;
};
