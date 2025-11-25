CREATE TABLE "usuarios" (
    "id" SERIAL PRIMARY KEY,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL UNIQUE,
    "senha" TEXT NOT NULL,
    "resetToken" TEXT,
    "resetExpira" TIMESTAMP(3)
);

CREATE TABLE "receitas" (
    "id" SERIAL PRIMARY KEY,
    "titulo" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "imagem" TEXT,
    "categoria" TEXT,
    "usuario_id" INTEGER NOT NULL,
    CONSTRAINT "receitas_usuario_id_fkey" 
        FOREIGN KEY ("usuario_id") 
        REFERENCES "usuarios"("id") 
        ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE "comentarios" (
    "id" SERIAL PRIMARY KEY,
    "texto" TEXT NOT NULL,
    "usuario_id" INTEGER NOT NULL,
    "receita_id" INTEGER NOT NULL,
    CONSTRAINT "comentarios_usuario_id_fkey" 
        FOREIGN KEY ("usuario_id") 
        REFERENCES "usuarios"("id") 
        ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "comentarios_receita_id_fkey" 
        FOREIGN KEY ("receita_id") 
        REFERENCES "receitas"("id") 
        ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE "avaliacoes" (
    "id" SERIAL PRIMARY KEY,
    "nota" INTEGER NOT NULL,
    "usuario_id" INTEGER NOT NULL,
    "receita_id" INTEGER NOT NULL,
    CONSTRAINT "avaliacoes_usuario_id_fkey" 
        FOREIGN KEY ("usuario_id") 
        REFERENCES "usuarios"("id") 
        ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "avaliacoes_receita_id_fkey" 
        FOREIGN KEY ("receita_id") 
        REFERENCES "receitas"("id") 
        ON DELETE CASCADE ON UPDATE CASCADE
);
