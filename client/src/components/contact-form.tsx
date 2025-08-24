import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
// Usunięto import apiRequest, ponieważ nie będzie już używany
// import { apiRequest } from "@/lib/queryClient";
import type { ContactFormData } from "@/types";

const contactSchema = z.object({
  name: z.string().min(2, "Imię musi mieć co najmniej 2 znaki"),
  email: z.string().email("Nieprawidłowy adres email"),
  project: z.string().min(1, "Wybierz typ projektu"),
  message: z.string().min(10, "Wiadomość musi mieć co najmniej 10 znaków"),
});

export function ContactForm() {
  const { t } = useTranslation();
  const { toast } = useToast();

  const FORMSPREE_ENDPOINT = "https://formspree.io/f/mrbazknv";

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      project: "",
      message: "",
    },
  });

  const submitFormMutation = useMutation({
    // Zaktualizowana funkcja mutacji do wysyłania danych do Formspree
    mutationFn: async (data: ContactFormData) => {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        // Formspree zwraca błędy w treści odpowiedzi
        const errorData = await response.json();
        throw new Error(errorData.error || "Nie udało się wysłać formularza.");
      }

      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Wiadomość wysłana!",
        description: "Dziękujemy za kontakt. Odpowiemy w ciągu 24 godzin.",
      });
      form.reset();
    },
    onError: (error) => {
      toast({
        title: "Błąd",
        description:
          "Nie udało się wysłać wiadomości. Spróbuj ponownie później.",
        variant: "destructive",
      });
      console.error("Contact form submission error:", error);
    },
  });

  const onSubmit = (data: ContactFormData) => {
    submitFormMutation.mutate(data);
  };

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="max-w-2xl mx-auto space-y-6 animate-slide-in"
      data-testid="contact-form"
    >
      {/* Reszta kodu JSX formularza pozostaje bez zmian */}
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <Label
            htmlFor="name"
            className="block text-sm font-medium mb-2 text-white"
          >
            {t("contact.name")}
          </Label>
          <Input
            {...form.register("name")}
            data-testid="input-name"
            type="text"
            id="name"
            placeholder="Jan Kowalski"
            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:ring-2 focus:ring-accent/50 focus:border-accent text-white placeholder-white/80"
          />
          {form.formState.errors.name && (
            <p className="text-red-400 text-sm mt-1">
              {form.formState.errors.name.message}
            </p>
          )}
        </div>

        <div>
          <Label
            htmlFor="email"
            className="block text-sm font-medium mb-2 text-white"
          >
            {t("contact.email")}
          </Label>
          <Input
            {...form.register("email")}
            data-testid="input-email"
            type="email"
            id="email"
            placeholder="jan@example.com"
            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:ring-2 focus:ring-accent/50 focus:border-accent text-white placeholder-white/80"
          />
          {form.formState.errors.email && (
            <p className="text-red-400 text-sm mt-1">
              {form.formState.errors.email.message}
            </p>
          )}
        </div>
      </div>

      <div>
        <Label
          htmlFor="project-select"
          className="block text-sm font-medium mb-2 text-white"
        >
          {t("contact.project")}
        </Label>
        <Select onValueChange={(value) => form.setValue("project", value)}>
          <SelectTrigger
            id="project-select"
            data-testid="select-project"
            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:ring-2 focus:ring-accent/50 focus:border-accent text-white data-[placeholder]:text-white/80"
          >
            <SelectValue placeholder={t("contact.project")} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="website">
              {t("contact.projectTypes.website")}
            </SelectItem>
            <SelectItem value="webapp">
              {t("contact.projectTypes.webapp")}
            </SelectItem>
            <SelectItem value="ecommerce">
              {t("contact.projectTypes.ecommerce")}
            </SelectItem>
            <SelectItem value="tutorial">
              {t("contact.projectTypes.tutorial")}
            </SelectItem>
            <SelectItem value="other">
              {t("contact.projectTypes.other")}
            </SelectItem>
          </SelectContent>
        </Select>
        {form.formState.errors.project && (
          <p className="text-red-400 text-sm mt-1">
            {form.formState.errors.project.message}
          </p>
        )}
      </div>

      <div>
        <Label
          htmlFor="message"
          className="block text-sm font-medium mb-2 text-white"
        >
          {t("contact.message")}
        </Label>
        <Textarea
          {...form.register("message")}
          data-testid="textarea-message"
          id="message"
          rows={5}
          placeholder="Opisz swój pomysł na projekt..."
          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:ring-2 focus:ring-accent/50 focus:border-accent text-white placeholder-white/80"
        />
        {form.formState.errors.message && (
          <p className="text-red-400 text-sm mt-1">
            {form.formState.errors.message.message}
          </p>
        )}
      </div>

      <div className="text-center">
        <Button
          data-testid="button-submit"
          type="submit"
          disabled={submitFormMutation.isPending}
          className="bg-accent hover:bg-accent-light text-accent-foreground px-8 py-4 rounded-lg font-semibold transition-all duration-200 hover:scale-105"
        >
          {submitFormMutation.isPending
            ? "Wysyłanie..."
            : `🚀 ${t("contact.submit")}`}
        </Button>
      </div>
    </form>
  );
}
