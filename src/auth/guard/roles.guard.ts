import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

@Injectable()
export class RolesGuard implements CanActivate {

  constructor(private reflector:Reflector) {}

  canActivate(context: ExecutionContext): boolean
  {
    
    const Role = this.reflector.getAllAndOverride('roles', [context.getHandler(), context.getClass()]);
    
    if(!Role) {
      return true;
    }

    const role_user = context.switchToHttp().getRequest().user.role;
    return role_user === Role;
    
  }
}
