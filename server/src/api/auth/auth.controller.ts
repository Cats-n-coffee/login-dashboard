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
  @Post('login')
  @UseGuards(LocalAuthGuard)
  login(@Req() req: Request, @Res() res: Response) {
    const user = req.user as IAutheUser;
    return this.handleAuthedRequest(res, user);
  }

  @Post('register')
  async register(@Body() registerDto: RegisterDto, @Res() res: Response) {
    const user = await this.authService.registerUser(registerDto);
    return this.handleAuthedRequest(res, user);
  }

  @Get()
  refresh(@Headers('refresh') token: string) {
    return { ye: 'yeah' };
  }

  @Get('/logout')
  @UseGuards(JwtAuthGuard)
  async logout(@Req() req: Request, @Res() res: Response) {
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
