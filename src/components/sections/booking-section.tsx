"use client";

import { Loader2 } from "lucide-react";
import { ChangeEvent, FormEvent, ReactNode, useMemo, useState } from "react";

import { Container } from "@/components/avulus/container";
import { CTAS, telegramBookingUrl } from "@/lib/ctas";
import { avulusCardShadow, bookButtonFullClass } from "@/lib/cta-styles";
import { cn } from "@/lib/utils";

type BookingRoom = {
  id: string;
  name: string;
};

type BookingFormValues = {
  room: string;
  date: string;
  time: string;
  name: string;
  contact: string;
};

type BookingFormErrors = Partial<Record<keyof BookingFormValues, string>>;

type BookingSectionProps = {
  rooms: BookingRoom[];
  title?: string;
  subtitle?: string;
  telegramBotUrl?: string;
};

const TIME_OPTIONS = [
  "00:00",
  "01:00",
  "02:00",
  "03:00",
  "04:00",
  "05:00",
  "06:00",
  "07:00",
  "08:00",
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
  "19:00",
  "20:00",
  "21:00",
  "22:00",
  "23:00",
] as const;

const DEFAULT_VALUES: BookingFormValues = {
  room: "",
  date: "",
  time: "",
  name: "",
  contact: "",
};

function getTodayDate() {
  const now = new Date();
  const month = `${now.getMonth() + 1}`.padStart(2, "0");
  const day = `${now.getDate()}`.padStart(2, "0");
  return `${now.getFullYear()}-${month}-${day}`;
}

function validateBookingForm(values: BookingFormValues): BookingFormErrors {
  const nextErrors: BookingFormErrors = {};

  if (!values.room) {
    nextErrors.room = "Выберите комнату.";
  }
  if (!values.date) {
    nextErrors.date = "Выберите дату.";
  }
  if (!values.time) {
    nextErrors.time = "Выберите время.";
  }
  if (!values.name.trim()) {
    nextErrors.name = "Введите имя.";
  } else if (values.name.trim().length < 2) {
    nextErrors.name = "Имя должно быть не короче 2 символов.";
  }

  const contact = values.contact.trim();
  if (!contact) {
    nextErrors.contact = "Укажите телефон или Telegram.";
  } else if (!/^(@[\w.]{4,}|[\d+()\-\s]{7,})$/i.test(contact)) {
    nextErrors.contact = "Введите Telegram (@username) или номер телефона.";
  }

  return nextErrors;
}

export function BookingSection({
  rooms,
  title = "бронирование",
  subtitle = "Оставьте заявку, и мы свяжемся с вами для подтверждения.",
  telegramBotUrl = CTAS.telegram.url,
}: BookingSectionProps) {
  const [values, setValues] = useState(DEFAULT_VALUES);
  const [errors, setErrors] = useState<BookingFormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const minDate = useMemo(() => getTodayDate(), []);

  const handleChange =
    (field: keyof BookingFormValues) =>
    (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const nextValue = event.target.value;
      setValues((current) => ({ ...current, [field]: nextValue }));

      if (errors[field]) {
        setErrors((current) => ({ ...current, [field]: undefined }));
      }
      if (isSuccess) {
        setIsSuccess(false);
      }
    };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validateBookingForm(values);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    setIsSubmitting(true);
    setIsSuccess(false);

    const roomName =
      rooms.find((room) => room.id === values.room)?.name ?? values.room;

    const telegramUrl = telegramBookingUrl(
      {
        room: roomName,
        date: values.date,
        time: values.time,
        name: values.name,
        contact: values.contact,
      },
      telegramBotUrl,
    );

    window.open(telegramUrl, "_blank", "noopener,noreferrer");

    setIsSubmitting(false);
    setIsSuccess(true);
    setValues(DEFAULT_VALUES);
  };

  return (
    <section
      id="book"
      className="scroll-mt-28 bg-avulus-black py-14 lg:py-20"
      aria-label="Форма бронирования"
    >
      <Container>
        <div
          className={cn(
            "mx-auto w-full max-w-4xl border border-white/20 bg-white/[0.03] p-5 sm:p-8 lg:p-10",
            avulusCardShadow,
          )}
        >
          <h2 className="text-3xl font-black uppercase tracking-tight text-white sm:text-4xl">
            {title}
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/75 sm:text-base">
            {subtitle}
          </p>

          <form className="mt-8 space-y-5" onSubmit={handleSubmit} noValidate>
            <div className="grid gap-4 sm:grid-cols-2">
              <FormField label="Комната" error={errors.room}>
                <select
                  name="room"
                  value={values.room}
                  onChange={handleChange("room")}
                  className={inputClassName}
                  aria-invalid={Boolean(errors.room)}
                >
                  <option value="">Выберите комнату</option>
                  {rooms.map((room) => (
                    <option key={room.id} value={room.id}>
                      {room.name}
                    </option>
                  ))}
                </select>
              </FormField>

              <FormField label="Дата" error={errors.date}>
                <input
                  name="date"
                  type="date"
                  min={minDate}
                  value={values.date}
                  onChange={handleChange("date")}
                  className={inputClassName}
                  aria-invalid={Boolean(errors.date)}
                />
              </FormField>

              <FormField label="Время" error={errors.time}>
                <select
                  name="time"
                  value={values.time}
                  onChange={handleChange("time")}
                  className={inputClassName}
                  aria-invalid={Boolean(errors.time)}
                >
                  <option value="">Выберите время</option>
                  {TIME_OPTIONS.map((slot) => (
                    <option key={slot} value={slot}>
                      {slot}
                    </option>
                  ))}
                </select>
              </FormField>

              <FormField label="Имя" error={errors.name}>
                <input
                  name="name"
                  type="text"
                  autoComplete="name"
                  placeholder="Ваше имя"
                  value={values.name}
                  onChange={handleChange("name")}
                  className={inputClassName}
                  aria-invalid={Boolean(errors.name)}
                />
              </FormField>
            </div>

            <FormField
              label="Телефон / Telegram"
              error={errors.contact}
              description="Пример: +7 999 123-45-67 или @avulus_user"
            >
              <input
                name="contact"
                type="text"
                autoComplete="tel"
                placeholder="+7 или @username"
                value={values.contact}
                onChange={handleChange("contact")}
                className={inputClassName}
                aria-invalid={Boolean(errors.contact)}
              />
            </FormField>

            <div className="space-y-3 pt-1">
              <button
                type="submit"
                disabled={isSubmitting}
                className={cn(
                  bookButtonFullClass,
                  "h-[54px] text-sm tracking-wide disabled:cursor-not-allowed disabled:opacity-70",
                )}
              >
                {isSubmitting ? (
                  <span className="inline-flex items-center gap-2">
                    <Loader2 className="size-4 animate-spin" />
                    Отправляем...
                  </span>
                ) : (
                  CTAS.telegram.label
                )}
              </button>

              {isSuccess && (
                <p
                  className="border border-avulus-green/35 bg-avulus-green/10 px-4 py-3 text-sm text-avulus-green"
                  role="status"
                >
                  Открыли Telegram — отправьте сообщение, чтобы подтвердить бронь.
                </p>
              )}
            </div>
          </form>
        </div>
      </Container>
    </section>
  );
}

function FormField({
  label,
  error,
  description,
  children,
}: {
  label: string;
  error?: string;
  description?: string;
  children: ReactNode;
}) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-xs font-semibold uppercase tracking-wider text-white/90">
        {label}
      </span>
      {children}
      {description && <span className="text-xs text-white/55">{description}</span>}
      {error && <span className="text-xs text-avulus-red">{error}</span>}
    </label>
  );
}

const inputClassName = cn(
  "h-[52px] w-full border border-white/20 bg-black px-4 text-sm text-white outline-none transition-colors",
  "focus:border-white/70",
  "aria-invalid:border-avulus-red",
);
