import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { BASE_PATH } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Страница не найдена",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <Container className="flex min-h-[70vh] flex-col items-center justify-center pb-24 pt-[calc(var(--header-h)+4rem)] text-center">
      <p className="text-eyebrow text-taupe-700">Ошибка 404</p>
      <h1 className="text-h1 mt-5">Страница не нашлась</h1>
      <p className="measure mt-6 text-[1.0625rem] leading-[1.7] text-ink-700">
        Возможно, ссылка устарела или страница переехала. Вернёмся к началу —
        там чисто и понятно.
      </p>
      <div className="mt-9">
        <Button href={`${BASE_PATH}/`}>На главную</Button>
      </div>
    </Container>
  );
}
