import { Body, Controller, Get, Headers, Post } from '@nestjs/common';

@Controller('/api/auth')
export class AuthController {
  @Post()
  login(@Body() loginDto: any) {}

  @Post()
  register(@Body() registerDto: any) {}

  @Get()
  refresh(@Headers('refresh') token: string) {
    return { ye: 'yeah' };
  }
}
