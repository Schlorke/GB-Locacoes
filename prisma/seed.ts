import { PrismaClient, UserRole } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("Start seeding...");

  const adminEmail = "admin@gblocacoes.com.br";
  const adminPassword = "admin123"; // Use a strong password in production!

  // Check if admin user already exists
  const existingAdmin = await prisma.user.findUnique({
    where: { email: adminEmail },
  });

  if (existingAdmin) {
    console.log("Admin user already exists. Skipping...");
  } else {
    const hashedPassword = await bcrypt.hash(adminPassword, 10);

    await prisma.user.create({
      data: {
        name: "Admin User",
        email: adminEmail,
        password: hashedPassword,
        role: UserRole.ADMIN,
        emailVerified: new Date(), // Pre-verify the admin email
      },
    });
    console.log(`✅ Admin user created with email: ${adminEmail}`);
    console.log(`🤫 Password: ${adminPassword}`);
  }

  console.log("Seeding finished.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
