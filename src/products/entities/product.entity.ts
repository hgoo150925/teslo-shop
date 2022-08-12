import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

// Entity es la representación de este Objeto en la base de datos
// Esto sería una Tabla en la BD

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', {
    unique: true, // El titulo debe ser unico, los productos no pueden tener el mismo nombre
  })
  title: string;
}
