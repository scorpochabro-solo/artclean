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
import { contacts } from "@/content/contacts";
import { trackPhoneClick } from "@/lib/analytics";
import { ruTypo } from "@/lib/utils";

const schema = z.object({
  name: z.string().min(2, "Укажите имя"),
  phone: z.string().min(18, "Укажите телефон полностью"),
  consent: z.literal(true, {
    errorMap: () => ({ message: "Без согласия отправка невозможна" }),
  }),
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

const darkField =
  "w-full rounded-xl border border-milk-100/25 bg-transparent px-4 py-3 text-milk-50 transition-colors duration-300 placeholder:text-taupe-500 focus:border-milk-100 focus:outline-none";

/** Форма обратной связи №1 — короткая, в тёмной секции. Офлайн-режим (см. Contact). */
export function LeadCta() {
  const [done, setDone] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      phone: "",
      consent: false as unknown as true,
      company: "",
    },
  });

  const phoneReg = register("phone");

  return (
    <section id="lead" className="on-dark section-y bg-ink-900 text-milk-100">
      <Container className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <div>
          <Reveal>
            <Eyebrow tone="dark">Расчёт стоимости</Eyebrow>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="text-h2 mt-5 text-milk-50">
              Рассчитаем вашу{" "}
              <em className="font-medium italic">уборку</em>
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="measure mt-6 leading-[1.7] text-milk-200">
              {ruTypo(
                "Оставьте имя и телефон — зададим пару вопросов о пространстве, предложим сценарий и назовём стоимость. Смета фиксируется до начала работ.",
              )}
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          {done ? (
            <div className="rounded-[24px] border border-milk-100/20 p-7 md:p-9">
              <h3 className="text-h3 text-milk-50">Почти готово</h3>
              <p className="mt-3 text-milk-200">
                Онлайн-приём заявок сейчас настраивается. Позвоните нам — мы на
                связи и быстро всё рассчитаем.
              </p>
              <a
                href={contacts.phoneHref}
                onClick={() => trackPhoneClick()}
                className="mt-5 inline-block font-display text-2xl text-milk-50 underline-offset-4 hover:underline"
              >
                {contacts.phone}
              </a>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit(() => setDone(true))}
              noValidate
              className="space-y-4 rounded-[24px] border border-milk-100/20 p-7 md:p-9"
            >
              <div>
                <label htmlFor="v2-name" className="mb-2 block text-sm font-medium text-milk-200">
                  Имя
                </label>
                <input
                  id="v2-name"
                  type="text"
                  autoComplete="name"
                  className={darkField}
                  {...register("name")}
                />
                {errors.name && (
                  <p className="mt-1.5 text-sm text-milk-50" role="alert">
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="v2-phone" className="mb-2 block text-sm font-medium text-milk-200">
                  Телефон
                </label>
                <input
                  id="v2-phone"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  placeholder="+7 (___) ___-__-__"
                  className={darkField}
                  {...phoneReg}
                  onChange={(e) => {
                    e.target.value = formatPhone(e.target.value);
                    phoneReg.onChange(e);
                  }}
                />
                {errors.phone && (
                  <p className="mt-1.5 text-sm text-milk-50" role="alert">
                    {errors.phone.message}
                  </p>
                )}
              </div>

              <div
                aria-hidden="true"
                className="pointer-events-none absolute left-[-9999px] h-0 w-0 overflow-hidden"
              >
                <label htmlFor="v2-company">Компания</label>
                <input
                  id="v2-company"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  {...register("company")}
                />
              </div>

              <div>
                <label className="flex cursor-pointer items-start gap-3 text-sm text-milk-200">
                  <input
                    type="checkbox"
                    className="mt-1 h-4 w-4 shrink-0 accent-milk-100"
                    {...register("consent")}
                  />
                  <span>
                    Соглашаюсь с{" "}
                    <Link
                      href="/privacy"
                      className="text-milk-50 underline underline-offset-2"
                    >
                      политикой конфиденциальности
                    </Link>{" "}
                    и даю согласие на обработку персональных данных
                  </span>
                </label>
                {errors.consent && (
                  <p className="mt-1.5 text-sm text-milk-50" role="alert">
                    {errors.consent.message}
                  </p>
                )}
              </div>

              <Button type="submit" tone="dark" arrow={false} className="w-full">
                Получить расчёт
              </Button>
            </form>
          )}
        </Reveal>
      </Container>
    </section>
  );
}
