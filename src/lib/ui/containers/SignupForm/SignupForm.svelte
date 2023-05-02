<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { formStore } from "$lib/logic/stores/index.js";
  import { fieldsSignup } from "$lib/logic/schemas/index.js";
  import { countries } from "$lib/logic/utils/countries.js";
  import { FormError } from "$lib/logic/utils/errors.js";

  import type { SelectOption } from "$lib/logic/typing/globals/interfaces.js";
  import type { SignupValues } from "$lib/logic/typing/schemas/auth.js";
  import type { Props } from "./SignupForm.proptypes.js";

  import * as stylesinternal from "./SignupForm.styles.js";

  import { Errors, Input, Select } from "$lib/ui/components/index.js";

  export let context: Props["context"] = undefined;
  export let showErrors: Props["showErrors"] = undefined;
  export let ns: Props["ns"] = undefined;
  export let t: Props["t"] = undefined;
  export let styles: Props["styles"] = undefined;

  const store = formStore({
    fields: fieldsSignup,
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
  const { submit, setField, setError, t: tf } = $store;
  const dispatch = createEventDispatcher<{
    submit: SignupValues;
    error: unknown;
    finish: never;
  }>();

  const optionsCountries: SelectOption[] = countries.map(
    ({ name, code, flag }) => ({
      label: `${flag} ${name}`,
      value: code,
    })
  );

  $: action = submit<SignupValues>(
    async (values) => {
      if (values.password.trim() !== values.confirmPassword.trim()) {
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
    }
  );
</script>

<form
  on:submit|preventDefault={action}
  class={styles?.form?.container ?? stylesinternal.container}
>
  <div class={styles?.form?.box ?? stylesinternal.box}>
    <slot>
      <Input name="firstName" label={tf("forms:first-name")} {context} />
      <Input name="lastName" label={tf("forms:last-name")} {context} />
      <Select
        name="country"
        label={tf("forms:country")}
        options={optionsCountries}
        on:choose={({ detail }) => {
          const country = countries.find(({ code }) => code === detail);
          setField("phoneCode", country?.dial_code);
        }}
        {context}
      />
      <Input name="email" type="email" label={tf("forms:email")} {context} />
      <Input name="phone" type="tel" label={tf("forms:phone")} {context} />
      <span />
      <Input
        name="password"
        type="password"
        label={tf("forms:password")}
        {context}
      />
      <Input
        name="confirmPassword"
        type="password"
        label={tf("forms:confirm-password")}
        {context}
      />
    </slot>
  </div>
  <button class={styles?.form?.submit ?? stylesinternal.submit} type="submit">
    {tf("forms:submit-signup")}
  </button>
  <Errors show={showErrors} {context} />
</form>
