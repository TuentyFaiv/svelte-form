<script lang="ts">
  import { onDestroy, getContext } from "svelte";
  import { fade } from "svelte/transition";

  import type { InputContext } from "$lib/logic/typing/globals.proptypes";
  import type { Input, Props } from "./Input.proptypes";

  import * as stylesinternal from "./Input.styles";

  export let name: Props["name"];
  export let label: Props["label"];
  export let id: Props["id"] = null;
  export let icons: Props["icons"] = null;
  export let type: Props["type"] = "text";
  export let context: Props["context"] = "form";
  export let datas: Props["datas"] = {};

  let input: Input;
  let checked = false;
  let show = false;

  const form = getContext<InputContext>(context);
  const {
    data,
    errors,
    styles: { input: styles },
    setField,
    check,
    t,
  } = $form;

  function toggleShow() {
    show = !show;
  }

  $: title = `${label} ${$errors[name] ? t(`${$errors[name]}`) : ""}`;

  $: datasets = Object.keys(datas).reduce(
    (acc, key) => ({
      ...acc,
      [`data-${key}`]: datas[key],
    }),
    {}
  );

  $: {
    if (type === "checkbox") {
      setField(name, checked, false);
    }
  }

  onDestroy(() => {
    setField(name, undefined);
  });
</script>

<label
  for={id ?? name}
  class={styles.field ?? stylesinternal.field}
  data-type={type}
  data-checked={checked}
  {...datasets}
  {title}
>
  <p class={styles.label ?? stylesinternal.label}>
    {label}
    <slot />
    {#if datas.labeltwo}
      {datas.labeltwo}
    {/if}
  </p>
  {#if type === "textarea"}
    <textarea
      class={styles.area ?? stylesinternal.area}
      id={id ?? name}
      bind:this={input}
      on:blur={check}
      {name}
      {...$$restProps}
    />
  {:else if type === "checkbox"}
    <input
      class={styles.check ?? stylesinternal.check}
      id={id ?? name}
      type="checkbox"
      bind:this={input}
      on:blur={check}
      on:input={check}
      bind:checked
      {name}
      {...$$restProps}
    />
  {:else}
    <input
      class={styles.input ?? stylesinternal.input}
      id={id ?? name}
      bind:this={input}
      on:blur={check}
      on:input={check}
      type={type === "password" && show ? "text" : type}
      value={$data[name] ?? ""}
      {name}
      {...$$restProps}
    />
  {/if}
  {#if type === "password"}
    <button
      type="button"
      class={styles.show ?? stylesinternal.show}
      on:click={toggleShow}
    >
      {#if icons}
        <img
          class={styles.icon ?? stylesinternal.icon}
          src={show ? icons.show : icons.hide}
          alt={t("forms:show-hide")}
        />
      {:else}
        {t("forms:show-hide")}
      {/if}
    </button>
  {/if}
  {#if $errors[name]}
    <span class={styles.error ?? stylesinternal.error} transition:fade|local>
      {t(`${$errors[name]}`)}
    </span>
  {/if}
</label>
