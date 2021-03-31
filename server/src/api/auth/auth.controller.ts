import {
  Body,
  Controller,
  Get,
  Headers,
  HttpCode,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Request, Response } from 'express';
import {
  JwtAuthGuard,
  LocalAuthGuard,
  RegisterDto,
  HelperService,
  IAutheUser,
} from 'src/common/auth';
import { AuthService } from './auth.service';

@Controller('/api/auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly helperService: HelperService,
  ) {}

  @HttpCode(200)
  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Req() req: Request, @Res() res: Response) {
    const user = req.user;
    const { access, token } = this.helperService.getAuthCookies(
      user as IAutheUser,
    );
    res.setHeader('Set-Cookie', access.value);
    res.cookie(token.name, token.value);
    res.json(user);
  }

  @Post('register')
  register(@Body() registerDto: RegisterDto) {
    return this.authService.registerUser(registerDto);
  }

  @Get()
  refresh(@Headers('refresh') token: string) {
    return { ye: 'yeah' };
  }

  @Get('/logout')
  @UseGuards(JwtAuthGuard)
  logout() {
    return null;
  }
}
