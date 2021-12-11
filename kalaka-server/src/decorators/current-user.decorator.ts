import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { JwtPayload } from 'src/auth/jwt.payload';

export const CurrentUser = createParamDecorator(
  async (data: unknown, ctx: ExecutionContext) => {
    const userData = await ctx.switchToHttp().getRequest().user;

    if (!userData) {
      return null;
    }

    return {
      _id: userData._id,
      email: userData.email,
      firstName: userData.firstName,
      lastName: userData.lastName,
      contacts: userData.contacts,
      location: userData.location,
      emergencyContacts: userData.emergencyContacts,
      phone: userData.phone,
      profileImageUrl: userData.profileImageUrl,
    };
  },
);
