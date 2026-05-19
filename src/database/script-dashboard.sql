insert into usuario 
(nome, arroba, email, senha, dataNasc, dataRegistro, curvatura)
values
('Ana Clara', '@anaclara', 'ana@gmail.com', '123456', '2004-03-15', '2026-05-01 10:15:00', '3A'),

('Beatriz Lima', '@bia.lima', 'bia@gmail.com', '123456', '2002-07-20', '2026-05-02 14:30:00', '4B'),

('Camila Souza', '@cami.souza', 'camila@gmail.com', '123456', '2001-11-08', '2026-05-03 09:45:00', '2C'),

('Daniela Alves', '@dani.alves', 'dani@gmail.com', '123456', '2003-01-25', '2026-05-04 18:20:00', '3C'),

('Eduarda Rocha', '@duda.rocha', 'eduarda@gmail.com', '123456', '2005-06-10', '2026-05-05 11:00:00', '4A'),

('Fernanda Costa', '@fer.costa', 'fernanda@gmail.com', '123456', '2000-09-12', '2026-05-06 16:40:00', '2B'),

('Gabriela Mendes', '@gabi.m', 'gabi@gmail.com', '123456', '2004-12-01', '2026-05-07 08:10:00', '3B'),

('Helena Martins', '@helena.mt', 'helena@gmail.com', '123456', '2002-05-18', '2026-05-08 20:25:00', '4C'),

('Isabela Freitas', '@isa.freitas', 'isabela@gmail.com', '123456', '2001-08-30', '2026-05-09 13:50:00', '2A'),

('Julia Ribeiro', '@ju.ribeiro', 'julia@gmail.com', '123456', '2003-10-05', '2026-05-09 17:35:00', '3A');

select
(select count(*) from usuario) as usuarios,

(select count(*) from post) postagens,


(select count(*) from usuario where curvatura like "2%") as usuarios_ondulado,
(select count(*) from usuario where curvatura like "3%") as usuarios_cacheado,
(select count(*) from usuario where curvatura like "4%") as usuarios_crespo,


(select count(*) from usuario u join post p on p.idUsuario = u.idUsuario where curvatura like "2%") as posts_ondulado,
(select count(*) from usuario u join post p on p.idUsuario = u.idUsuario where curvatura like "3%") as posts_cacheado,
(select count(*) from usuario u join post p on p.idUsuario = u.idUsuario where curvatura like "4%") as posts_
;

select count(*) usuarios, date(dataRegistro) as dia from usuario group by dia;


select idUsuario,nome,arroba,img, count(distinct seguidores.idSeguimento) as seguidores
from usuario as u left join seguir_usuario as seguidores on idUsuarioSeguido = u.idUsuario
group by idUsuario order by seguidores desc limit 3;

select nome,arroba,img from usuario order by dataRegistro desc limit 3;

select count(*),hour(dataCurtida) from curtida group by hour(dataCurtida);

select u.*,count(distinct seguidores.idSeguimento) as seguidores 
from usuario as u left join seguir_usuario as seguidores on idUsuarioSeguido = u.idUsuario
where statusUsuario = 'ativo' and (nome like '%mt%' or arroba like '%mt%')
group by idUsuario order by dataRegistro desc ;


update usuario set statusUsuario = 'desativado' where idUsuario =109;

delete from comentario where idPost = 109;
delete from curtida where idPost = 109;
delete from post where idPost = 109;


  select usuario.*,post.idPost,descricao as 'desc', post.img as 'img_post', TIMESTAMPDIFF(minute,dataPost,now()) as 'minutos',count(DISTINCT curtida.idCurtida) as curtidas,count(DISTINCT idComentario) as comentarios
    ,count(DISTINCT postador.idUsuarioSeguidor) as seguidores, categoria
    from post join usuario on post.idUsuario = usuario.idUsuario left join curtida on post.idPost = curtida.idPost  
    left join comentario on comentario.idPost = post.idPost left join seguir_usuario as postador on usuario.idUsuario = idUsuarioSeguido
    where statusUsuario = 'ativo'  
    group by usuario.idUsuario, post.idPost order by seguidores desc;
    
    
    
    SELECT 
CASE
    WHEN HOUR(dataPost) BETWEEN 0 AND 6 THEN '0:00-7:00'
    WHEN HOUR(dataPost) BETWEEN 7 AND 11 THEN '7:00-12:00'
    WHEN HOUR(dataPost) BETWEEN 12 AND 17 THEN '12:00-18:00'
    WHEN HOUR(dataPost) BETWEEN 18 AND 23 THEN '18:00-00:00'
END AS faixaHorario,


COUNT(*) AS posts

FROM post
GROUP BY faixaHorario
ORDER BY MIN(HOUR(dataPost));


SELECT 
CASE
    WHEN HOUR(dataCurtida) BETWEEN 0 AND 6 THEN '0:00-7:00'
    WHEN HOUR(dataCurtida) BETWEEN 7 AND 11 THEN '7:00-12:00'
    WHEN HOUR(dataCurtida) BETWEEN 12 AND 17 THEN '12:00-18:00'
    WHEN HOUR(dataCurtida) BETWEEN 18 AND 23 THEN '18:00-00:00'
END AS faixaHorario,

COUNT(*) AS curtidas

FROM curtida
GROUP BY faixaHorario
ORDER BY MIN(HOUR(dataCurtida));

SELECT 
CASE
    WHEN HOUR(dataComentario) BETWEEN 0 AND 6 THEN '0:00-7:00'
    WHEN HOUR(dataComentario) BETWEEN 7 AND 11 THEN '7:00-12:00'
    WHEN HOUR(dataComentario) BETWEEN 12 AND 17 THEN '12:00-18:00'
    WHEN HOUR(dataComentario) BETWEEN 18 AND 23 THEN '18:00-00:00'
END AS faixaHorario,

COUNT(*) AS comentarios

FROM comentario
GROUP BY faixaHorario
ORDER BY MIN(HOUR(dataComentario));
