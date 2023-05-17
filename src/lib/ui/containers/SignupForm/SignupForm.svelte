<script lang="ts">
  import { createEventDispatcher, getContext } from "svelte";
  import { formStore } from "$lib/logic/stores/index.js";
  import { fieldsSignup } from "$lib/logic/schemas/index.js";
  import { FormError } from "$lib/logic/utils/errors.js";

  import type { Readable } from "svelte/store";
  import type { FormStyles } from "$lib/logic/typing/globals/proptypes.js";
  import type { SignupValues } from "$lib/logic/typing/schemas/auth.js";
  import type { Props } from "./SignupForm.proptypes.js";

  import * as stylesinternal from "./SignupForm.styles.js";

  import { Errors, Input, Select } from "$lib/ui/components/index.js";

  export let submit: Props["submit"];
  export let context: Props["context"] = undefined;
  export let showErrors: Props["showErrors"] = undefined;
  export let ns: Props["ns"] = undefined;
  export let options: Props["options"] = [];
  export let code: Props["code"] = "bycountry";
  export let confirm: Props["confirm"] = true;
  export let styles: Props["styles"] = undefined;
  export let success: Props["success"] = undefined;
  export let t: Props["t"] = (msg) => msg;
  export let texts: Props["texts"];

  const globalStyles = getContext<Readable<FormStyles>>("formStyles");
  $: formStyles = $globalStyles ?? styles?.form ?? stylesinternal ?? {};
  const { confirmPassword, ...fields } = fieldsSignup;

  $: store = formStore({
    fields: { ...fields, ...(confirm ? { confirmPassword } : {}) },
    ns,
    styles: {
      input: styles?.input ?? {},
      fileinput: styles?.fileinput ?? {},
      option: styles?.option ?? {},
      select: styles?.select ?? {},
      icons: styles?.icons ?? null,
    },
  });
  $: ({ submit: onSubmit, setField, setError, loading } = $store);
  const dispatch = createEventDispatcher<{
    error: unknown;
    finish: never;
    choose: { setField: typeof setField; value: string };
  }>();

  function onChoose({ detail }: CustomEvent<string>) {
    dispatch("choose", {
      setField,
      value: detail,
    });
  }

  $: action = onSubmit<SignupValues>(
    async (values) => {
      if (confirm && values.password.trim() !== values.confirmPassword.trim()) {
        const error = "password-not-match";
        setError("password", error);
        setError("confirmPassword", error);
        throw new FormError("signup-error", error);
      }
      await submit(values);
    },
    {
      error(err) {
        dispatch("error", err);
      },
      finish: () => {
        dispatch("finish");
      },
      context,
      success,
    }
  );
</script>

{#if $loading}
  <slot name="loading" />
{/if}

<form on:submit|preventDefault={action} class={formStyles.container}>
  <div class={formStyles.box}>
    <slot>
      <Input
        name="firstName"
        label={texts.firstname.label}
        placeholder={texts.firstname.placeholder}
        {context}
        {t}
      />
      <Input
        name="lastName"
        label={texts.lastname.label}
        placeholder={texts.lastname.placeholder}
        {context}
        {t}
      />
      <Select
        name={code === "bycountry" ? "country" : "phoneCode"}
        label={code === "bycountry"
          ? texts.country.label
          : texts.phonecode.label}
        placeholder={code === "bycountry"
          ? texts.country.placeholder
          : texts.phonecode.placeholder}
        {options}
        on:choose={onChoose}
        {context}
        {t}
      />
      <Input
        name="email"
        type="email"
        label={texts.email.label}
        placeholder={texts.email.placeholder}
        {context}
        {t}
      />
      <Input
        name="phone"
        type="tel"
        label={texts.phone.label}
        placeholder={texts.phone.placeholder}
        {context}
        {t}
      />
      <Input
        name="password"
        type="password"
        label={texts.password.label}
        placeholder={texts.password.placeholder}
        {context}
        {t}
      />
      {#if confirm}
        <Input
          name="confirmPassword"
          type="password"
          label={texts?.confirmPassword?.label}
          placeholder={texts?.confirmPassword?.placeholder}
          {context}
          {t}
        />
      {/if}
    </slot>
  </div>
  <button class={formStyles.submit} type="submit">
    <slot name="submit" />
  </button>
  <Errors show={showErrors} {context} {t} />
</form>
