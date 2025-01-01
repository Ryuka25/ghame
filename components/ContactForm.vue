<script lang="ts" setup>
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
import { z } from "zod";
import { useToast } from "~/components/ui/toast";
import { APP_NAME, WEB3FORMS_ACCESS_KEY } from "~/lib/app";

const { toast } = useToast();

const isLoading = ref(false);
const token = ref("");

const contactFormSchema = toTypedSchema(
  z.object({
    access_key: z.string().default(WEB3FORMS_ACCESS_KEY),
    subject: z
      .string()
      .default(`[IMPORTANT] ${APP_NAME} - Contact form submission`),
    name: z.string().min(1, { message: "This is required" }).min(3),
    botcheck: z.literal<boolean>(false).default(true),
    email: z
      .string()
      .min(1, { message: "This is required" })
      .email({ message: "Must be a valid email" }),
    message: z
      .string()
      .min(1, { message: "This is required" })
      .min(10, { message: "Provide more details please" }),
  }),
);

const { handleSubmit, resetForm, setFieldValue } = useForm({
  validationSchema: contactFormSchema,
});

const showErrorNotification = () => {
  toast({
    title: "🥺 Oh no, something bad happened",
    description:
      "Actually, we are unable to send your message right now. Please try again later.",
    variant: "destructive",
  });
};

const showSuccessNotification = () => {
  toast({
    title: "📧 Yup, your message has been sent!",
    description: "Your message has been sent and we will get back to you ASAP.",
  });
};

const submitForm = handleSubmit(async (values) => {
  try {
    isLoading.value = true;
    const response = await $fetch<any>("https://api.web3forms.com/submit", {
      method: "POST",
      body: values,
    });
    if (response.success) {
      showSuccessNotification();
    } else {
      showErrorNotification();
    }

    // Reset form after submission
    resetForm();
  } catch (error) {
    console.log(error);
    showErrorNotification();
  } finally {
    isLoading.value = false;
  }
});

watch(token, (value) => {
  setFieldValue("botcheck", !value);
});
</script>

<template>
  <form
    class="w-full lg:w-1/2"
    :validation-schema="contactFormSchema"
    @submit="submitForm"
  >
    <div class="grid gap-4 lg:grid-cols-2">
      <FormField v-slot="{ componentField }" name="name" class="grid gap-2">
        <FormItem>
          <FormLabel>Name</FormLabel>
          <FormControl>
            <Input
              id="password"
              type="text"
              placeholder="Full name"
              :="componentField"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
      <FormField v-slot="{ componentField }" name="email">
        <FormItem>
          <FormLabel>Email</FormLabel>
          <FormControl>
            <Input
              id="password"
              type="text"
              placeholder="you@company.com"
              :="componentField"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
      <FormField v-slot="{ componentField }" name="message">
        <FormItem class="lg:col-span-2">
          <FormLabel>Message</FormLabel>
          <FormControl>
            <Textarea
              id="message"
              class="min-h-40"
              placeholder="Leave us a message..."
              :="componentField"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
      <div class="grid gap-2 lg:col-span-2">
        <NuxtTurnstile v-model="token" />
      </div>
    </div>
    <Button type="submit" class="mt-8 w-full" :disabled="isLoading">
      Send message
    </Button>
  </form>
</template>
