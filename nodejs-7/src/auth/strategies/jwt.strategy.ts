import { ExtractJwt, Strategy } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import {Injectable, UnauthorizedException } from "@nestjs/common";
import { UsersService } from 'src/users/users.service';
import { ConfigService } from '@nestjs/config';
import * as dotenv from 'dotenv';

dotenv.config();

// require('dotenv').config();

// const config = {
//     jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//     ignoreExpiration: false,
//     // secretOrKey: 'test123', // TODO: Поправить
//     secretOrKey: process.env.SECRET_KEY
//     // secretOrKey: configService.get<string>('JWT_SECRET'),
// };


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly userService: UsersService, configService: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: 'test123', // TODO: Поправить
            // secretOrKey: process.env.SECRET_KEY
            // secretOrKey: configService.get<string>('JWT_SECRET'),
        });
    }

    async validate(payload: any) {
        const user = await this.userService.findById(+payload.id);

        if (!user) {
          throw new UnauthorizedException('У вас нет доступа');
        }

        return {
          id: user.id,
        };
    //   return {
    //     userId: payload.sub,
    //     username: payload.username
    //   };
    }
}