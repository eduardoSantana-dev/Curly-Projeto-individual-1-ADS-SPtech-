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
dataPost datetime not null default current_timestamp,
img varchar(1000),
categoria varchar(30),
constraint chkCategoria check(categoria in('comum','galeria','pergunta','dica')),
idUsuario int not null,
constraint postUser foreign key (IdUsuario) references usuario(idUsuario),
primary key(idPost,IdUsuario)
)auto_increment = 100;



create table seguir_usuario (
idSeguimento int auto_increment,
idUsuarioSeguido int, 
idUsuarioSeguidor int,
constraint idUsuarioSeguido foreign key (idUsuarioSeguido) references usuario(idUsuario),
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
dataComentario datetime not null default current_timestamp,
constraint idPostComentario foreign key (idPost) references post(idPost),
constraint idUsuarioComentario foreign key (idUsuario) references usuario(idUsuario),
primary key(idComentario,idPost,idUsuario)
)auto_increment = 1000;

select * from usuario; 
select * from post;

select idUsuarioseguidor as 'segue o ',idUsuarioSeguido from seguir_usuario;



select * from curtida;
select count(idCurtida) from curtida where idPost = 137 and idUsuario = 101;

select usuario.*,post.idPost,descricao as 'desc', post.img as 'img_post', TIMESTAMPDIFF(minute,dataPost,now()) as 'minutos',count(idCurtida) as curtidas,count(idComentario) as comentarios ,count(DISTINCT postador.idUsuarioSeguidor) as seguidores,case when espectador.idUsuarioSeguidor IS NOT NULL then 1 else 0 end as seguindo
from post join usuario on post.idUsuario = usuario.idUsuario left join curtida on post.idPost = curtida.idPost  left join comentario on comentario.idPost = post.idPost left join seguir_usuario as postador on usuario.idUsuario = idUsuarioSeguido

left join seguir_usuario espectador on usuario.idUsuario = espectador.idUsuarioSeguido and espectador.idUsuarioSeguidor = 100
group by usuario.idUsuario, post.idPost order by dataPost desc;
    

select u.img,u.nome, u.arroba, comentario, timestampdiff(minute,dataComentario,now()) as 'minutos'from comentario join post on comentario.idPost = post.idPost join usuario u on u.idUsuario = comentario.idUsuario where post.idPost = 101;

insert into comentario (comentario,idPost,idUsuario) value(
'Caramba que top ein',101,100
);
select * from comentario;

delete from comentario where idComentario between 1000 and 1040;

delete from post where idPost between 100 and 140;

select usuario.*,post.idPost,descricao as 'desc', post.img as 'img_post', TIMESTAMPDIFF(minute,dataPost,now()) as 'minutos',count(curtida.idCurtida) as curtidas,count(idComentario) as comentarios ,
case when espectador.idUsuarioSeguidor IS NOT NULL then 1 else 0 end as seguindo,
case when espectadorCurtida.idUsuario IS NOT NULL then 1 else 0 end as curtido
from post join usuario on post.idUsuario = usuario.idUsuario left join curtida on post.idPost = curtida.idPost  left join comentario on comentario.idPost = post.idPost 
left join seguir_usuario espectador on usuario.idUsuario = espectador.idUsuarioSeguido and espectador.idUsuarioSeguidor = 101
left join curtida espectadorCurtida on post.idPost = espectadorCurtida.idPost and espectadorCurtida.idUsuario = 101

group by usuario.idUsuario, post.idPost;


select u.*, count(distinct seguidores.idSeguimento) as seguidores, count(distinct seguindo.idSeguimento) as seguindo,
case when espectador.idUsuarioSeguidor IS NOT NULL then 1 else 0 end as seguindo
from usuario as u left join seguir_usuario as seguidores on idUsuarioSeguido = u.idUsuario  
left join seguir_usuario as seguindo on seguindo.idUsuarioSeguidor = u.idUsuario 
left join seguir_usuario espectador on u.idUsuario = espectador.idUsuarioSeguido and espectador.idUsuarioSeguidor = 101
where idUsuario = 102
;

select post.idPost,post.img,curvatura,TIMESTAMPDIFF(minute,dataPost,now()) as 'minutos'
  from post join usuario on post.idUsuario = usuario.idUsuario left join curtida on post.idPost = curtida.idPost  left join comentario on comentario.idPost = post.idPost
  left join seguir_usuario as postador on usuario.idUsuario = idUsuarioSeguido
  where post.img != '' and post.categoria ='galeria' and curvatura like '%%'
  group by usuario.idUsuario, post.idPost order by count(distinct postador.idUsuarioSeguidor);
select * from usuario where email = "email" and senha ="senha";

update usuario set nome = 'Eduardo Santana',email ='email@email.com',arroba ='',senha = '' where idUsuario = 101;




SHOW TABLES;
/*CREATE USER 'apiCurly'@'%' IDENTIFIED BY 'Senha@forte';
GRANT SELECT,UPDATE,DELETE,INSERT ON *.* TO 'apiCurly'@'%';
FLUSH PRIVILEGES;


