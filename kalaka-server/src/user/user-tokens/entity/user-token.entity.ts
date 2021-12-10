/*
import { v4 as uuidv4 } from 'uuid';

export enum E_TOKEN_TYPE {
  //ACCOUNT_ACTIVATION = 'ACCOUNT_ACTIVATION',
  PASSWORD_RESET = 'PASSWORD_RESET',
  //CHANGE_EMAIL = 'CHANGE_EMAIL',
}

@Entity({ name: 'user_tokens' })
export class UserToken {
  @PrimaryGeneratedColumn('increment')
  public readonly id: number;

  @Column({
    name: 'type',
    enumName: 'type_enum',
    type: 'enum',
    enum: E_TOKEN_TYPE,
    default: E_TOKEN_TYPE.PASSWORD_RESET,
  })
  public type: E_TOKEN_TYPE;

  @Column()
  public value: string;

  @Column()
  public expirationDate: Date;

  @Column()
  public userId: number;

  @Column('json', {
    nullable: true,
    default: null,
  })
  public payload: Record<string, unknown>;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn({ nullable: true })
  updatedAt?: Date;

  @BeforeInsert()
  async generateToken() {
    this.value = uuidv4();
  }

  @BeforeInsert()
  async setEmailVerificationTokenExpirationDate() {
    this.expirationDate = new Date(
      moment().add(7, 'days').format('YYYY-MM-DD HH:mm:ss'),
    );
  }
}
*/
