import { z } from 'zod';

export const registerSchema = z
  .object({
    firstName: z.string().min(1, "Le prénom est requis."),
    lastName: z.string().min(1, "Le nom de famille est requis."),
    email: z.string().email("Email invalide."),
    password: z.string().min(6, "Le mot de passe doit contenir au moins 6 caractères."),
    confirmPassword: z.string().min(1, "La confirmation du mot de passe est requise."),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: "Les mots de passe ne correspondent pas.",
    path: ["confirmPassword"],
  });

export const loginSchema = z
  .object({
    email: z.string().email("Email invalide."),
    password: z.string().min(6, "Le mot de passe doit contenir au moins 6 caractères."),
  })

export const editProfileSchema = z.object({
  firstName: z.string().min(1, "Le prénom est requis."),
  lastName: z.string().min(1, "Le nom de famille est requis."),
});
