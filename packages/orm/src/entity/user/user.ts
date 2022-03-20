import { IsEmail, Length } from "class-validator";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToOne,
  JoinColumn,
} from "typeorm";

import { UserDetails } from "./details";

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column("text", { unique: true, nullable: false })
  @IsEmail()
  email!: string;

  @Column("text", { select: false })
  @Length(8, 128)
  password!: string;

  @Column("text")
  firstName!: string;

  @Column("text")
  lastName!: string;

  @Column("text", { nullable: true })
  birthDay!: string;

  @Column("text", { nullable: true })
  about!: string;

  @Column("text", { nullable: true })
  class!: string;

  @Column("text", { nullable: true })
  imagePath!: string;

  @Column("boolean", { default: false, nullable: false })
  blocked!: boolean;

  @CreateDateColumn()
  registeredAt!: Date;

  @OneToOne(() => UserDetails, { cascade: true, onDelete: "CASCADE" })
  @JoinColumn()
  userdetails!: UserDetails;
}
