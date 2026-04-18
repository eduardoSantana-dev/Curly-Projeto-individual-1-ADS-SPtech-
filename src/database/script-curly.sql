CREATE DATABASE curly;
use curly;


create table usuario (
idUsuario int primary key auto_increment,
nome varchar(100)  not null,
arroba varchar(50)  not null,
email varchar(100) unique,
senha varchar(100)  not null,
dataNasc date,
img varchar(1000) default('semImg.png'),
curvatura char(2)  not null,
constraint chkCurvatura check(curvatura in('2A','2B','2C','3A','3B','3C','4A','4B','4C'))
) auto_increment = 100;


create table post (
idPost int auto_increment,
descricao varchar(2000) not null,
dataPost datetime not null,
img varchar(1000),
IdUsuario int unique not null,
constraint postUser foreign key (IdUsuario) references usuario(idUsuario),
primary key(idPost,IdUsuario)
)auto_increment = 100;

create table seguir_usuario (
idSeguimento int auto_increment,
idUsuarioSeguido int, 
idUsuarioSeguidor int,
constraint idSeguimento foreign key (idSeguimento) references usuario(idUsuario),
constraint idUsuarioSeguidor foreign key (idUsuarioSeguidor) references usuario(idUsuario),
primary key(idSeguimento,idUsuarioSeguido,idUsuarioSeguidor)
)auto_increment = 1000;


create table curtida (
idCurtida int auto_increment,
idPost int,
idUsuario int,
constraint idPostCurtida foreign key (idPost) references post(idPost),
constraint idUsuarioCurtida foreign key (idUsuario) references usuario(idUsuario),
primary key(idCurtida,idPost,idUsuario)
)auto_increment = 1000;


create table comentario (
idComentario int auto_increment,
comentario varchar(1000) not null,
idPost int,
idUsuario int ,
constraint idPostComentario foreign key (idPost) references post(idPost),
constraint idUsuarioComentario foreign key (idUsuario) references usuario(idUsuario),
primary key(idComentario,idPost,idUsuario)
)auto_increment = 1000;

SHOW TABLES;
/*CREATE USER 'apiCurly'@'%' IDENTIFIED BY 'Senha@forte';
GRANT SELECT,UPDATE,DELETE,INSERT ON *.* TO 'apiCurly'@'%';
FLUSH PRIVILEGES;
