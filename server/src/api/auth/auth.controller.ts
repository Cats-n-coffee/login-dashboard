import {
  Body,
  Controller,
  Get,
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
import { Cookies } from 'src/common/decorators';
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
  login(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const user = req.user as IAutheUser;
    return this.handleAuthedRequest(res, user);
  }

  @Post('register')
  async register(
    @Body() registerDto: RegisterDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const user = await this.authService.registerUser(registerDto);
    return this.handleAuthedRequest(res, user);
  }

  @Get('token')
  async renewToken(
    @Cookies() cookies: Record<string, string>,
    @Res({ passthrough: true }) res: Response,
  ) {
    const user = await this.authService.renewToken(cookies);
    if (user) return this.handleAuthedRequest(res, user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/logout')
  async logout(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const user = req.user as IAutheUser;
    await this.authService.logoutUser(user);
    return this.handleAuthedRequest(res, user, true);
  }

  private handleAuthedRequest(
    res: Response,
    user: IAutheUser,
    doClean?: boolean,
  ) {
    const { access, token } = doClean
      ? this.helperService.getCleanedAuthCookies(user)
      : this.helperService.getAuthCookies(user);

    res.setHeader('Set-Cookie', access.value);
    res.cookie(token.name, token.value);

    const resData = doClean ? null : user;
    res.json(resData);
  }
}
