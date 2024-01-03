// This file configures an instance of the Prisma client

import { PrismaClient } from '@prisma/client';

declare global {
    var prisma: PrismaClient | undefined;
} // Assigns the global namespace to a variable

// REVIEW: What is globalThis?
export const db = globalThis.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') globalThis.prisma = db; // only save the prisma client as a global variable if we are in development
// so in production, each time we call prisma, we are creating a new instance of the prisma client

// TODO: The feature of updating visibility when artis delete tatoos / profile is not implemented yet.
//TODO:
// 1. Descomentar para activar el middleware para marcar "isComplete"
// 2. Es algo lento, optimistic update
// 3. Fíjate la cantidad llamadas que se hacen a la base de datos, es eso normal??
// prisma.$use(async (params, next) => {
//   if (
//     params.model === "ArtistProfile" &&
//     (params.action === "create" || params.action === "update")
//   ) {
//     if (isUserProfileComplete(params.args.data)) {
//       params.args.data.isComplete = true;
//     } else {
//       params.args.data.isComplete = false;
//     }
//   }
//   return next(params);
// });

// function isUserProfileComplete(data) {
//   const { artisticName, email, bio, phone, website, styles, socials } = data;
//     artisticName,
//     email,
//     bio,
//     phone,
//     website,
//     styles,
//     socials,
//   });
//   if (
//     artisticName &&
//     email &&
//     bio &&
//     phone &&
//     // website &&
//     styles &&
//     socials
//   ) {
//     return true;
//   } else {
//     return false;
//   }
// }
