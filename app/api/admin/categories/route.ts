import { type NextRequest, NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { z } from "zod";
import crypto from "node:crypto";
import { prisma } from "@/lib/prisma";

function slugify(text: string) {
  return text
    .normalize("NFKD")
    .replace(/[^\w\s-]/g, "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/--+/g, "-")
    .replace(/^-+|-+$/g, "");
}

const CategorySchema = z
  .object({
    name: z.string().min(1, "O nome da categoria é obrigatório"),
    description: z.string().optional(),
    icon: z.string().optional().nullable(),
    iconColor: z.string().min(1, "Cor do ícone é obrigatória"),
    bgColor: z.string().min(1, "Cor de fundo é obrigatória"),
    fontColor: z.string().min(1, "Cor da fonte é obrigatória"),
  })
  .strict();

// GET /api/admin/categories - List all categories
export async function GET() {
  try {
    const categories = await prisma.category.findMany({
      include: {
        _count: {
          select: {
            equipments: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(categories);
  } catch (error) {
    console.error("Error fetching categories:", error);
    return NextResponse.json(
      { error: "Erro ao buscar categorias" },
      { status: 500 },
    );
  }
}

// POST /api/admin/categories - Create new category
export async function POST(request: NextRequest) {
  try {
    if (!process.env.DATABASE_URL) {
      console.error("[API POST /admin/categories] DATABASE_URL não definido");
      return NextResponse.json(
        { error: "Configuração do banco de dados ausente." },
        { status: 500 },
      );
    }

    let raw;
    try {
      raw = await request.json();
    } catch (_err) {
      return NextResponse.json({ error: "JSON inválido" }, { status: 400 });
    }

    if (!raw.icon) delete raw.icon;

    if (process.env.NODE_ENV !== "production") {
      console.log("[CATEGORY_PAYLOAD]", raw);
    }

    let parsed;
    try {
      parsed = CategorySchema.parse(raw);
    } catch (err) {
      console.error("[CATEGORY_ERROR]", err);
      return NextResponse.json({ error: "Dados inválidos" }, { status: 400 });
    }

    const { name, description, icon, iconColor, bgColor, fontColor } = parsed;

    const slug = slugify(name);

    const existingCategory = await prisma.category.findFirst({
      where: {
        OR: [{ name: { equals: name.trim(), mode: "insensitive" } }, { slug }],
      },
    });

    if (existingCategory) {
      return NextResponse.json(
        { error: "Categoria já existente" },
        { status: 409 },
      );
    }

    const category = await prisma.category.create({
      data: {
        id: crypto.randomUUID(),
        name: name.trim(),
        description: description?.trim() || null,
        icon: icon?.trim() || null,
        iconColor: iconColor?.trim() || "#000000",
        bgColor: bgColor?.trim() || "#e0e0e0",
        fontColor: fontColor?.trim() || "#000000",
        slug,
      },
    });

    return NextResponse.json(category, { status: 201 });
  } catch (error) {
    console.error("Error creating category:", error);

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      console.error(
        "[API POST /admin/categories] Prisma error:",
        error.code,
        error.message,
      );

      if (error.code === "P2002") {
        return NextResponse.json(
          { error: "Categoria já existente" },
          { status: 409 },
        );
      }

      return NextResponse.json(
        { error: "Erro ao processar dados da categoria." },
        { status: 400 },
      );
    }

    return NextResponse.json(
      { error: "Erro ao criar categoria" },
      { status: 500 },
    );
  }
}
