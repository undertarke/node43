import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy,"jwt_node") {
    constructor(config: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Bearer ...
            ignoreExpiration: false, // bật tắt expiredIn
            secretOrKey: "SECRET_KEY",
        });
    }

    async validate(tokenDecode) {
        
        return 123;
    }
}