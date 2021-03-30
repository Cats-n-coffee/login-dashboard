import { Body, Controller, Get, Headers, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('/api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('login')
  login(@Body() loginDto: any) {}

  @Post('register')
  register(@Body() registerDto: any) {}

  @Get()
  refresh(@Headers('refresh') token: string) {
    return { ye: 'yeah' };
  }
}
