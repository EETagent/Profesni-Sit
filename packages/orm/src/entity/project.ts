import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./user/user";

@Entity()
export class Project {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  about!: string;

  //@Column({ array: true })
  //enrolledUsers!: string[];

  @CreateDateColumn()
  createdAt!: Date;

  @ManyToMany(type => User) @JoinTable() 
  users!: User[];
}
