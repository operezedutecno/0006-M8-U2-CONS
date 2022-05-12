
create table marcas(
	id serial primary key,
	nombre varchar not null
);

create table computadoras(
	id serial primary key,
	marca_id integer not null,
	ram varchar not null,
	almacenamiento varchar not null,
	foto varchar,
	foreign key (marca_id) references marcas(id)
);

insert into marcas(nombre) values('Lenovo'),('HP'),('ASUS'),('Compaq'),('Toshiba');

insert into computadoras(marca_id, ram, almacenamiento) values(1, '8GB', '1TB');