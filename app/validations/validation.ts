import { z } from 'zod';

export const registerSchema = z
  .object({
    firstName: z.string().min(1, 'Le prénom est requis.'),
    lastName: z.string().min(1, 'Le nom de famille est requis.'),
    email: z.string().email('Email invalide.'),
    password: z.string().min(6, 'Le mot de passe doit contenir au moins 6 caractères.'),
    confirmPassword: z.string().min(1, 'La confirmation du mot de passe est requise.')
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'Les mots de passe ne correspondent pas.',
    path: ['confirmPassword']
  });

export const loginSchema = z
  .object({
    email: z.string().email('Email invalide.'),
    password: z.string().min(6, 'Le mot de passe doit contenir au moins 6 caractères.')
  });

export const editProfileSchema = z.object({
  firstName: z.string().min(1, 'Le prénom est requis.'),
  lastName: z.string().min(1, 'Le nom de famille est requis.')
});

export const eventCreateSchema = z.object({
  sport: z.number().min(1, 'Le sport est requis.'),
  location: z.string().min(1, 'La localisation est requise.'),
  city: z.number().min(1, 'La ville est requise.'),
  date: z.date(),
  participants: z.coerce.number().min(1, 'Le nombre de participants doit être >= 1')
});

