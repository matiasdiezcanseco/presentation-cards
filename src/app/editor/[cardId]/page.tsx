import { notFound } from "next/navigation";
import { getCardWithElements } from "~/server/actions/cards";
import { EditorClient } from "./editor-client";

interface EditorPageProps {
  params: Promise<{
    cardId: string;
  }>;
}

export default async function EditorPage({ params }: EditorPageProps) {
  const { cardId } = await params;
  const card = await getCardWithElements(cardId);

  if (!card) {
    notFound();
  }

  return <EditorClient card={card} elements={card.elements} />;
}
