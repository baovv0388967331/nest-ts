import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Message } from 'common/constants/app.constants';
import { MessageCode } from 'common/constants/messageCode';
import { verifyData } from 'common/utils/jwt';
import { ApiUnauthorizedException } from 'core/types/apiException.type';
import { IApplicantSign } from 'core/types/applicantSign.type';
import { IDataSign } from 'core/types/dataSign.type';

const getToken = (context: ExecutionContext, prefix: string) => {
  const request = context.switchToHttp().getRequest() as any;
  const token = (request.headers['x-access-token'] || request.headers.authorization || '') as string;
  if (token && token.startsWith(prefix)) {
    return token.slice(prefix.length, token.length);
  }
};

@Injectable()
export class AuthenticateUser implements CanActivate {
  public constructor(private readonly reflector: Reflector) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.get<boolean>('isPublic', context.getHandler());
    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest() as any;
    const token = getToken(context, 'Bearer ');
    if (token) {
      try {
        const payload = verifyData<IDataSign>(token);
        if (payload.userId && payload.userDiv && payload.sessionId) {
          request.user = payload;

          return true;
        }
      } catch (ex) {
        if (ex.name === 'TokenExpiredError') {
          throw new ApiUnauthorizedException(MessageCode.expiredToken, Message.expiredToken);
        }
      }
    }

    throw new ApiUnauthorizedException(MessageCode.badToken, Message.badToken);
  }
}

@Injectable()
export class AuthenticateApplicant implements CanActivate {
  public constructor(private readonly reflector: Reflector) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.get<boolean>('isPublic', context.getHandler());
    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest() as any;
    const token = getToken(context, 'Bearer ');

    if (token) {
      try {
        const payload = verifyData<IApplicantSign>(token);
        if (payload.applicantId && payload.sessionId) {
          request.user = payload;

          return true;
        }

        throw new ApiUnauthorizedException(MessageCode.badToken, Message.badToken);
      } catch (ex) {
        if (ex.name === 'TokenExpiredError') {
          throw new ApiUnauthorizedException(MessageCode.expiredToken, Message.expiredToken);
        }
      }
    }

    throw new ApiUnauthorizedException(MessageCode.badToken, Message.badToken);
  }
}

@Injectable()
export class AuthenticatePublicApiKey implements CanActivate {
  public constructor(private readonly reflector: Reflector) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.get<boolean>('isPublic', context.getHandler());
    if (isPublic) {
      return true;
    }

    const token = getToken(context, 'Key ');

    return token === process.env.PUBLIC_API_KEY;
  }
}
