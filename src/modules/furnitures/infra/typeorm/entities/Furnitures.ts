import User from '@modules/users/infra/typeorm/entities/User';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('furnitures')
class Furnitures {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('decimal', {
    transformer: {
      to(value) {
        return value;
      },
      from(value) {
        return parseFloat(value);
      },
    },
  })
  price: number;

  @Column()
  bought: boolean;

  @Column()
  name: string;

  @Column()
  user_id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Furnitures;
