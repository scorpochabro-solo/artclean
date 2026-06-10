export interface Fact {
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
}

// TODO (бриф 5.2): подтвердить цифры у заказчика. Значения ниже — частично плейсхолдеры.
export const facts: Fact[] = [
  { value: 7, label: "услуг — для дома, офиса и территории" },
  { value: 100, suffix: "%", label: "профессиональная химия и протоколы" },
  // TODO: «часов обучения» — плейсхолдер, заменить на реальное число.
  { value: 120, suffix: "+", label: "часов обучения команды" },
];
