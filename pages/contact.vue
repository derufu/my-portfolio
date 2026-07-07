<template>
  <main class="min-h-screen">
    <AppHeader class="mb-8" title="Contact me" :description="description" />

    <div
      v-if="status === 'success'"
      class="rounded-2xl border border-primary-200 bg-primary-50 p-8 text-center dark:border-primary-500/20 dark:bg-primary-500/10"
    >
      <div
        class="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary-500 text-white"
      >
        <Icon name="heroicons:paper-airplane-solid" class="h-6 w-6" />
      </div>
      <h2 class="text-lg font-semibold text-gray-900 dark:text-white">
        Message sent — thank you!
      </h2>
      <p class="mx-auto mt-2 max-w-md text-sm text-gray-600 dark:text-gray-400">
        Your message is on its way to my inbox. I'll get back to you at the
        email you provided. In the meantime, feel free to explore my work.
      </p>
      <div class="mt-5 flex justify-center gap-3">
        <UButton to="/projects" color="primary" label="See my work" />
        <UButton
          color="gray"
          variant="soft"
          label="Send another"
          @click="reset()"
        />
      </div>
    </div>

    <UForm
      v-else
      :state="state"
      :validate="validate"
      class="space-y-5"
      @submit="onSubmit"
    >
      <UFormGroup label="Your name" name="name">
        <UInput
          v-model="state.name"
          size="lg"
          placeholder="Jane Doe"
          icon="heroicons:user"
        />
      </UFormGroup>

      <UFormGroup label="Your email" name="email" required>
        <UInput
          v-model="state.email"
          type="email"
          size="lg"
          placeholder="you@example.com"
          icon="heroicons:envelope"
        />
      </UFormGroup>

      <UFormGroup label="Message" name="message" required>
        <UTextarea
          v-model="state.message"
          :rows="6"
          size="lg"
          placeholder="Tell me about your project, video edit, or anything you'd like to collaborate on…"
        />
      </UFormGroup>

      <!-- honeypot: hidden from humans, catches bots -->
      <input
        v-model="honey"
        type="text"
        tabindex="-1"
        autocomplete="off"
        class="hidden"
        aria-hidden="true"
      />

      <UAlert
        v-if="status === 'error'"
        color="red"
        variant="soft"
        icon="heroicons:exclamation-triangle"
        :title="errorMessage"
        :description="`You can also email me directly at ${email}.`"
      />

      <div class="flex items-center justify-between gap-4">
        <p class="text-xs text-gray-400 dark:text-gray-500">
          Prefer email?
          <a
            :href="`mailto:${email}`"
            class="font-medium text-primary-600 hover:underline dark:text-primary-400"
            >{{ email }}</a
          >
        </p>
        <UButton
          type="submit"
          size="lg"
          color="primary"
          trailing-icon="heroicons:paper-airplane"
          :loading="status === 'submitting'"
          :label="status === 'submitting' ? 'Sending…' : 'Send message'"
        />
      </div>
    </UForm>
  </main>
</template>

<script setup>
const { contact } = useAppConfig();
const email = contact?.email || "delf.boston@gmail.com";
const relayEndpoint =
  contact?.formEndpoint || `https://formsubmit.co/ajax/${email}`;

const description =
  "Have a project, a video to edit, or just want to say hi? Drop your email and a message and it'll land straight in my inbox.";

useSeoMeta({
  title: "Contact | Delf Boston",
  description,
});

const state = reactive({ name: "", email: "", message: "" });
const honey = ref("");
const status = ref("idle");
const errorMessage = ref("");

function validate(data) {
  const errors = [];
  if (!data.email) {
    errors.push({ path: "email", message: "Please enter your email" });
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.push({ path: "email", message: "Enter a valid email address" });
  }
  if (!data.message || data.message.trim().length < 5) {
    errors.push({ path: "message", message: "Please write a short message" });
  }
  return errors;
}

async function sendViaRelay() {
  await $fetch(relayEndpoint, {
    method: "POST",
    headers: { Accept: "application/json" },
    body: {
      name: state.name || "Anonymous",
      email: state.email,
      message: state.message,
      _subject: `Portfolio contact from ${state.name || state.email}`,
      _template: "table",
      _captcha: "false",
    },
  });
}

async function onSubmit() {
  if (honey.value) return; // bot trap
  status.value = "submitting";
  errorMessage.value = "";
  try {
    // Primary: our server route (Gmail SMTP on Vercel).
    await $fetch("/api/contact", {
      method: "POST",
      body: {
        name: state.name,
        email: state.email,
        message: state.message,
        _honey: honey.value,
      },
    });
    status.value = "success";
  } catch (err) {
    // If the server hasn't been configured with Gmail creds yet (503),
    // fall back to the no-backend relay so the form still works.
    if (err?.statusCode === 503 || err?.response?.status === 503) {
      try {
        await sendViaRelay();
        status.value = "success";
        return;
      } catch (_) {
        /* fall through to error */
      }
    }
    status.value = "error";
    errorMessage.value =
      "Sorry, your message couldn't be sent right now. Please try again.";
  }
}

function reset() {
  state.name = "";
  state.email = "";
  state.message = "";
  status.value = "idle";
}
</script>
