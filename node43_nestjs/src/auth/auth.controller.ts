import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }


  // sign up
  @Post("/sign-up")
  signUp(@Body() userSignUp) {
    return this.authService.signUp(userSignUp)
  }

  // login
  @HttpCode(200)
  @Post("/login")
  login(@Body() userLogin) {
    return this.authService.login(userLogin)
  }


}


