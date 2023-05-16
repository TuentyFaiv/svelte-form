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

  export let context: Props["context"] = undefined;
  export let showErrors: Props["showErrors"] = undefined;
  export let ns: Props["ns"] = undefined;
  export let t: Props["t"] = undefined;
  export let options: Props["options"] = [];
  export let code: Props["code"] = "bycountry";
  export let confirm: Props["confirm"] = true;
  export let styles: Props["styles"] = undefined;
  export let success: Props["success"] = undefined;

  const globalStyles = getContext<Readable<FormStyles>>("formStyles");
  $: formStyles = $globalStyles ?? styles?.form ?? stylesinternal ?? {};
  $: ({ confirmPassword, ...fields } = fieldsSignup);

  $: store = formStore({
    fields: { ...fields, ...(confirm ? { confirmPassword } : {}) },
    ns,
    t,
    styles: {
      input: styles?.input ?? {},
      fileinput: styles?.fileinput ?? {},
      option: styles?.option ?? {},
      select: styles?.select ?? {},
      icons: styles?.icons ?? null,
    },
  });
  $: ({ submit, setField, setError, t: tf, data } = $store);
  const dispatch = createEventDispatcher<{
    submit: SignupValues;
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

  $: action = submit<SignupValues>(
    async (values) => {
      if (confirm && values.password.trim() !== values.confirmPassword.trim()) {
        const error = "password-not-match";
        setError("password", error);
        setError("confirmPassword", error);
        throw new FormError("signup-error", error);
      }
      await dispatch("submit", values);
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

<form on:submit|preventDefault={action} class={formStyles.container}>
  <div class={formStyles.box}>
    <slot>
      <Input
        name="firstName"
        label={tf("forms:first-name")}
        placeholder={tf("forms:first-name")}
        {context}
      />
      <Input
        name="lastName"
        label={tf("forms:last-name")}
        placeholder={tf("forms:last-name")}
        {context}
      />
      <Select
        name={code === "bycountry" ? "country" : "phoneCode"}
        label={tf(`forms:${code === "bycountry" ? "country" : "phone-code"}`)}
        placeholder={tf(
          `forms:${code === "bycountry" ? "country" : "phone-code"}`
        )}
        {options}
        on:choose={onChoose}
        {context}
      />
      <Input
        name="email"
        type="email"
        label={tf("forms:email")}
        placeholder={tf("forms:email")}
        {context}
      />
      <Input
        name="phone"
        type="tel"
        label={tf("forms:phone")}
        placeholder={tf("forms:phone")}
        {context}
      />
      <Input
        name="password"
        type="password"
        label={tf("forms:password")}
        placeholder={tf("forms:password")}
        {context}
      />
      {#if confirm}
        <Input
          name="confirmPassword"
          type="password"
          label={tf("forms:confirm-password")}
          placeholder={tf("forms:confirm-password")}
          {context}
        />
      {/if}
    </slot>
  </div>
  <button class={formStyles.submit} type="submit">
    {tf("forms:submit-signup")}
  </button>
  <Errors show={showErrors} {context} />
</form>
