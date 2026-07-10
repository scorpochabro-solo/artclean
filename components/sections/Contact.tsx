"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { Field, fieldClass } from "@/components/ui/Field";
import { ContactActions } from "@/components/ui/ContactActions";
import { services } from "@/content/services";
import { contacts } from "@/content/contacts";
import { trackPhoneClick } from "@/lib/analytics";
import { cn } from "@/lib/utils";

// Реле формы на финском сервере (RU-сервер не достаёт Telegram, поэтому заявку
// шлёт браузер напрямую сюда, а сервер уже в бота). См. историю деплоя.
const LEAD_ENDPOINT = "https://api.aklin.ru/api/lead";

const schema = z.object({
  name: z.string().min(2, "Укажите имя"),
  phone: z.string().min(18, "Укажите телефон полностью"),
  service: z.string().min(1, "Выберите услугу"),
  comment: z.string().max(1000, "Слишком длинный комментарий").optional(),
  consent: z.literal(true, {
    errorMap: () => ({ message: "Без согласия отправка невозможна" }),
  }),
  // honeypot — должен оставаться пустым
  company: z.string().max(0).optional(),
});

type FormValues = z.infer<typeof schema>;

function formatPhone(value: string): string {
  let d = value.replace(/\D/g, "");
  if (d.startsWith("8")) d = "7" + d.slice(1);
  if (d && !d.startsWith("7")) d = "7" + d;
  d = d.slice(0, 11);
  const a = d.slice(1, 4);
  const b = d.slice(4, 7);
  const c = d.slice(7, 9);
  const e = d.slice(9, 11);
  let out = "+7";
  if (a) out += " (" + a;
  if (a.length === 3) out += ")";
  if (b) out += " " + b;
  if (c) out += "-" + c;
  if (e) out += "-" + e;
  return out;
}

type Status = "idle" | "loading" | "success" | "error";

export function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      phone: "",
      service: "",
      comment: "",
      consent: false as unknown as true,
      company: "",
    },
  });

  const phoneReg = register("phone");

  const onSubmit = async (data: FormValues) => {
    setStatus("loading");
    try {
      // ponytail: без заголовков → тип text/plain → «простой» CORS-запрос без
      // preflight; бэкенд всё равно парсит тело как JSON.
      const res = await fetch(LEAD_ENDPOINT, {
        method: "POST",
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="section-y">
      <Container>
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <Reveal>
              <Eyebrow>Контакты</Eyebrow>
            </Reveal>
            <Reveal delay={0.06}>
              <h2 className="text-h2 mt-5">
                Доверьте чистоту <em className="font-medium italic">нам</em>
              </h2>
            </Reveal>
            <Reveal delay={0.12}>
              <dl className="mt-10 space-y-7">
                <div>
                  <dt className="text-eyebrow text-taupe-700">Телефон</dt>
                  <dd className="mt-2">
                    <a
                      href={contacts.phoneHref}
                      onClick={() => trackPhoneClick()}
                      className="font-display text-2xl text-ink-900 transition-colors hover:text-ink-700"
                    >
                      {contacts.phone}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="text-eyebrow text-taupe-700">Instagram</dt>
                  <dd className="mt-2">
                    <a
                      href={contacts.instagram.href}
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                      className="text-ink-900 underline-offset-4 hover:underline"
                    >
                      {contacts.instagram.handle}
                      <span aria-hidden="true">*</span>
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="text-eyebrow text-taupe-700">География</dt>
                  <dd className="mt-2 text-ink-900">{contacts.city}</dd>
                </div>
                {contacts.hours && (
                  <div>
                    <dt className="text-eyebrow text-taupe-700">Часы работы</dt>
                    <dd className="mt-2 text-ink-900">{contacts.hours}</dd>
                  </div>
                )}
              </dl>
            </Reveal>
            <Reveal delay={0.16}>
              <ContactActions className="mt-8" />
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <div className="rounded-[24px] border border-milk-200 bg-milk-50 p-6 md:p-8">
              {status === "success" ? (
                <div className="flex min-h-[420px] flex-col items-start justify-center">
                  <h3 className="text-h3">Заявка отправлена</h3>
                  <p className="mt-3 text-ink-700">
                    Спасибо! Мы получили вашу заявку и свяжемся с вами в
                    ближайшее время. Если удобнее — позвоните нам:
                  </p>
                  <a
                    href={contacts.phoneHref}
                    onClick={() => trackPhoneClick()}
                    className="mt-5 font-display text-2xl text-ink-900 underline-offset-4 hover:underline"
                  >
                    {contacts.phone}
                  </a>
                  <button
                    type="button"
                    onClick={() => setStatus("idle")}
                    className="mt-6 text-sm font-medium text-taupe-700 underline-offset-4 hover:underline"
                  >
                    Вернуться к форме
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
                  <Field label="Имя" htmlFor="name" error={errors.name?.message}>
                    <input
                      id="name"
                      type="text"
                      autoComplete="name"
                      className={fieldClass}
                      {...register("name")}
                    />
                  </Field>

                  <Field label="Телефон" htmlFor="phone" error={errors.phone?.message}>
                    <input
                      id="phone"
                      type="tel"
                      inputMode="tel"
                      autoComplete="tel"
                      placeholder="+7 (___) ___-__-__"
                      className={fieldClass}
                      {...phoneReg}
                      onChange={(e) => {
                        e.target.value = formatPhone(e.target.value);
                        phoneReg.onChange(e);
                      }}
                    />
                  </Field>

                  <Field label="Услуга" htmlFor="service" error={errors.service?.message}>
                    <select
                      id="service"
                      className={cn(fieldClass, "appearance-none")}
                      defaultValue=""
                      {...register("service")}
                    >
                      <option value="" disabled>
                        Выберите услугу
                      </option>
                      {services.map((s) => (
                        <option key={s.slug} value={s.title}>
                          {s.title}
                        </option>
                      ))}
                    </select>
                  </Field>

                  <Field
                    label="Комментарий (необязательно)"
                    htmlFor="comment"
                    error={errors.comment?.message}
                  >
                    <textarea
                      id="comment"
                      rows={3}
                      className={cn(fieldClass, "resize-none")}
                      {...register("comment")}
                    />
                  </Field>

                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute left-[-9999px] h-0 w-0 overflow-hidden"
                  >
                    <label htmlFor="company">Компания</label>
                    <input
                      id="company"
                      type="text"
                      tabIndex={-1}
                      autoComplete="off"
                      {...register("company")}
                    />
                  </div>

                  <div>
                    <label className="flex cursor-pointer items-start gap-3 text-sm text-ink-700">
                      <input
                        type="checkbox"
                        className="mt-1 h-4 w-4 shrink-0 accent-ink-900"
                        {...register("consent")}
                      />
                      <span>
                        Соглашаюсь с{" "}
                        <Link
                          href="/privacy"
                          className="text-ink-900 underline underline-offset-2"
                        >
                          политикой конфиденциальности
                        </Link>{" "}
                        и даю согласие на обработку персональных данных
                      </span>
                    </label>
                    {errors.consent && (
                      <p className="mt-1.5 text-sm font-medium text-ink-900" role="alert">
                        {errors.consent.message}
                      </p>
                    )}
                  </div>

                  {status === "error" && (
                    <p className="text-sm font-medium text-ink-900" role="alert">
                      Не удалось отправить заявку. Попробуйте ещё раз или позвоните:{" "}
                      <a href={contacts.phoneHref} className="underline">
                        {contacts.phone}
                      </a>
                      .
                    </p>
                  )}

                  <Button
                    type="submit"
                    arrow={false}
                    disabled={status === "loading"}
                    className="w-full"
                  >
                    {status === "loading" ? "Отправляем…" : "Отправить заявку"}
                  </Button>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
