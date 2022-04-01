import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('users_codes_auth')
class UserCodesAuth {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  code_auth: string;

  @Column()
  email: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default UserCodesAuth;
