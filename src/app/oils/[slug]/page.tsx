import type { Metadata } from "next";
import { notFound } from "next/navigation";

import OilProductPage from "@/components/OilProductPage";
import { getOilBySlug, oils } from "@/content/oils";

type OilPageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return oils.map((oil) => ({ slug: oil.slug }));
}

export async function generateMetadata({
  params,
}: OilPageProps): Promise<Metadata> {
  const { slug } = await params;
  const oil = getOilBySlug(slug);

  if (!oil) return {};

  return {
    title: `${oil.name} | Being Body Oils`,
    description: `${oil.character}. ${oil.benefit}.`,
  };
}

export default async function OilPage({ params }: OilPageProps) {
  const { slug } = await params;
  const oil = getOilBySlug(slug);

  if (!oil) notFound();

  return <OilProductPage oil={oil} />;
}
