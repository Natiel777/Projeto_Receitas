-- 1. Tabela 'usuarios'
CREATE TABLE "usuarios" (
    -- SERIAL é a forma idiomática do PostgreSQL para ID auto-incremento
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "resetToken" TEXT,
    -- TIMESTAMP(3) é o tipo padrão do Prisma para DateTime no PostgreSQL
    "resetExpira" TIMESTAMP(3),

    -- Define a chave primária
    CONSTRAINT "usuarios_pkey" PRIMARY KEY ("id")
);

-- 2. Tabela 'receitas'
CREATE TABLE "receitas" (
    "id" SERIAL NOT NULL,
    "titulo" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "imagem" TEXT,
    "categoria" TEXT,
    "usuario_id" INTEGER NOT NULL,

    CONSTRAINT "receitas_pkey" PRIMARY KEY ("id")
);

-- 3. Tabela 'comentarios'
CREATE TABLE "comentarios" (
    "id" SERIAL NOT NULL,
    "texto" TEXT NOT NULL,
    "usuario_id" INTEGER NOT NULL,
    "receita_id" INTEGER NOT NULL,

    CONSTRAINT "comentarios_pkey" PRIMARY KEY ("id")
);

-- 4. Tabela 'avaliacoes'
CREATE TABLE "avaliacoes" (
    "id" SERIAL NOT NULL,
    "nota" INTEGER NOT NULL,
    "usuario_id" INTEGER NOT NULL,
    "receita_id" INTEGER NOT NULL,

    CONSTRAINT "avaliacoes_pkey" PRIMARY KEY ("id")
);

-- 5. Índices únicos
-- Cria o índice UNIQUE para o email, conforme definido no seu schema.prisma
CREATE UNIQUE INDEX "usuarios_email_key" ON "usuarios"("email");


-- 6. Adição de Chaves Estrangeiras (Constraints)
-- O PostgreSQL e o Prisma usam ALTER TABLE para adicionar chaves estrangeiras

-- Chaves Estrangeiras para 'receitas'
ALTER TABLE "receitas" ADD CONSTRAINT "receitas_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "usuarios"("id") ON DELETE CASCADE;

-- Chaves Estrangeiras para 'comentarios'
ALTER TABLE "comentarios" ADD CONSTRAINT "comentarios_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "usuarios"("id") ON DELETE CASCADE;
ALTER TABLE "comentarios" ADD CONSTRAINT "comentarios_receita_id_fkey" FOREIGN KEY ("receita_id") REFERENCES "receitas"("id") ON DELETE CASCADE;

-- Chaves Estrangeiras para 'avaliacoes'
ALTER TABLE "avaliacoes" ADD CONSTRAINT "avaliacoes_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "usuarios"("id") ON DELETE CASCADE;
ALTER TABLE "avaliacoes" ADD CONSTRAINT "avaliacoes_receita_id_fkey" FOREIGN KEY ("receita_id") REFERENCES "receitas"("id") ON DELETE CASCADE;
