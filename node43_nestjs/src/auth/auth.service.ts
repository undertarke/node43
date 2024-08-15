import { BadRequestException, ForbiddenException, HttpException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

    constructor(private jwtService: JwtService) { }

    signUp(userSignUp) {
        // check mail
        // thêm data
        // thông báo ...
    }

    login(userLogin) {
        try {

            // check email
            // check password
            
            // đúng thông tin
            // tạo token
            let token = this.jwtService.signAsync({ userId: 1 }, { algorithm: "HS256", expiresIn: "5m", secret: "SECRET_KEY" })
            return token

            // sai thông tin
            throw new HttpException("Sai email và mật khẩu", 401);
            // throw new UnauthorizedException("Sai email và mật khẩu")
            // throw new BadRequestException("")
            // throw new ForbiddenException("")
            // throw new InternalServerErrorException("")


        }
        catch (error) {
            console.log(error)
            if (error.status && error.status != 500)
                throw new HttpException(error.response, error.status)

            throw new HttpException("Lỗi Server", 500)
        }


    }

}


// yarn add @nestjs/passport passport passport-local @nestjs/jwt passport-jwt @types/passport-jwt