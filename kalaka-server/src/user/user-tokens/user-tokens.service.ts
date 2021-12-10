/*import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as moment from 'moment';
import {
  FindManyOptions,
  FindOneOptions,
  RemoveOptions,
  Repository,
} from 'typeorm';

import { E_TOKEN_TYPE, UserToken } from './entity/user-token.entity';

@Injectable()
export class UserTokensService {
  constructor(
    @InjectRepository(UserToken)
    private readonly userTokenRepository: Repository<UserToken>,
  ) {}

  public async find(options?: FindManyOptions): Promise<UserToken[]> {
    return await this.userTokenRepository.find(options);
  }

  public async findOne(
    id?: number,
    options?: FindOneOptions,
  ): Promise<UserToken> {
    return await this.userTokenRepository.findOne(id, options);
  }

  public async delete(
    entities: UserToken[],
    options?: RemoveOptions,
  ): Promise<UserToken[]> {
    return await this.userTokenRepository.remove(entities, options);
  }

  public async issueToken(
    type: E_TOKEN_TYPE,
    userId: number,
    payload?: Record<string, unknown>,
  ): Promise<UserToken> {
    const token = new UserToken();

    token.type = type;
    token.userId = userId;
    token.payload = { ...payload };

    return await this.userTokenRepository.save(token);
  }

  public async verifyToken(token: UserToken): Promise<boolean> {
    return token.updatedAt === null;
  }

  public async invalidateToken(id: number): Promise<void> {
    await this.userTokenRepository.update(id, {
      expirationDate: new Date(moment().format('YYYY-MM-DD HH:mm:ss')),
    });
  }
}
*/
