"use server";

import { revalidatePath } from "next/cache";
import { eq, and, desc } from "drizzle-orm";
import { db } from "~/server/db";
import { cards } from "~/server/db/schema";
import { getSession } from "~/server/better-auth/server";

export async function getUserCards() {
  const session = await getSession();
  if (!session?.user) {
    return [];
  }

  const userCards = await db.query.cards.findMany({
    where: eq(cards.userId, session.user.id),
    orderBy: [desc(cards.updatedAt)],
  });

  return userCards;
}

export async function createCard(data?: { title?: string; width?: number; height?: number }) {
  const session = await getSession();
  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  const id = crypto.randomUUID();
  
  await db.insert(cards).values({
    id,
    userId: session.user.id,
    title: data?.title || "Untitled Presentation",
    width: data?.width || 1200,
    height: data?.height || 630,
    backgroundColor: "#ffffff",
  });

  revalidatePath("/dashboard");
  return { success: true, id };
}

export async function deleteCard(cardId: string) {
  const session = await getSession();
  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  // Ensure the card belongs to the user
  const result = await db
    .delete(cards)
    .where(and(eq(cards.id, cardId), eq(cards.userId, session.user.id)))
    .returning();

  if (result.length === 0) {
    throw new Error("Card not found or unauthorized");
  }

  revalidatePath("/dashboard");
  return { success: true };
}

export async function updateCard(
  cardId: string,
  data: { title?: string; width?: number; height?: number; backgroundColor?: string }
) {
  const session = await getSession();
  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  const result = await db
    .update(cards)
    .set({
      ...data,
      updatedAt: new Date(),
    })
    .where(and(eq(cards.id, cardId), eq(cards.userId, session.user.id)))
    .returning();

  if (result.length === 0) {
    throw new Error("Card not found or unauthorized");
  }
    
  revalidatePath("/dashboard");
  return { success: true };
}
