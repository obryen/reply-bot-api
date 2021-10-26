import {
  Entity,
  Column,
  PrimaryColumn,
} from 'typeorm';

@Entity('replies')
export class Reply {
  constructor(intialData: Partial<Reply> = null) {
    if (intialData !== null) {
      Object.assign(this, intialData);
    }
  }

  @PrimaryColumn()
  id: number;

  @Column({ type: 'uuid', nullable: false })
  name: string;

  @Column({ type: 'varchar', nullable: false })
  description: string;

  @Column({ type: 'uuid', nullable: false })
  reply: string;
}
