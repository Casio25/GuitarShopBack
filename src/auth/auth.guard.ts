
/* eslint-disable prettier/prettier */

import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { Request } from 'express';
import { CatalogService } from 'src/logic/Services/catalog/catalog.service';


@Injectable()
export class AuthGuard implements CanActivate {
    constructor(protected jwtService: JwtService) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);

        if (!token) {
            console.log("unauth");
            throw new UnauthorizedException();
        }
        try {
            const payload = await this.jwtService.verifyAsync(token, {
                secret: jwtConstants.secret
            });
            request['user'] = payload;
        } catch {
            throw new UnauthorizedException();
        }
        return true;
    }

    protected extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }
}

@Injectable()
export class CustomAuthGuard extends AuthGuard {
    constructor(jwtService: JwtService) {
        super(jwtService)
    }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);

        if (!token) {
            console.log("No token provided");
            return true;
        }

        try {
            console.log(token)
            const payload = await this.jwtService.verifyAsync(token, {
                secret: jwtConstants.secret
            });
            request['user'] = payload;
        } catch  {
            throw new UnauthorizedException();
            
        }

        return true;
    }
}





