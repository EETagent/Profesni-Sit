import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity()
export class UserDetails {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column("text", { nullable: true })
  details!: string;

  @CreateDateColumn()
  registeredAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
