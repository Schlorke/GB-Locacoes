import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function resetAdminPassword() {
  try {
    console.log("🔑 Redefinindo a senha do usuário administrador...");

    const adminEmail = "admin@gblocacoes.com.br";
    const newPassword = "admin123"; // A nova senha que você deseja definir

    // Hash da nova senha
    const hashedPassword = await bcrypt.hash(newPassword, 12);

    // Encontrar o usuário e atualizar a senha
    const updatedUser = await prisma.user.update({
      where: { email: adminEmail },
      data: { password: hashedPassword },
    });

    if (updatedUser) {
      console.log("✅ Senha do usuário administrador redefinida com sucesso!");
      console.log("Email:", updatedUser.email);
      console.log("Nova Senha (texto puro):", newPassword);
      console.log("Role:", updatedUser.role);
    } else {
      console.log("❌ Usuário administrador não encontrado para redefinir a senha.");
    }
  } catch (error) {
    console.error("❌ Erro ao redefinir a senha do usuário admin:", error);
  } finally {
    await prisma.$disconnect();
  }
}

resetAdminPassword();
