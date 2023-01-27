<script lang="ts">
  import { onDestroy, getContext } from "svelte";
  import { fade } from "svelte/transition";

  import type { InputContext } from "@typing/globals.proptypes";
  import type { Input, Props } from "./Input.proptypes";

  import * as styles from "./Input.styles";

  export let name: Props["name"];
  export let label: Props["label"];
  export let id: Props["id"] = null;
  export let type: Props["type"] = "text";
  export let context: Props["context"] = "form";
  export let icons: Props["icons"] = null;
  export let datas: Props["datas"] = {};
  export let t: Props["t"] = (msg) => msg;

  let input: Input;
  let checked = false;
  let show = false;

  const form = getContext<InputContext>(context);
  const { data, errors, setField, check, setError } = $form;

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
    setError(name);
    setField(name, undefined, false);
  });
</script>

<label
  for={id ?? name}
  class={styles.field}
  data-type={type}
  data-checked={checked}
  {...datasets}
  {title}
>
  <p class={styles.paragraph}>
    {label}
    <slot />
    {#if datas.labeltwo}
      {datas.labeltwo}
    {/if}
  </p>
  {#if type === "textarea"}
    <textarea
      class={styles.area}
      id={id ?? name}
      bind:this={input}
      on:blur={check}
      {name}
      {...$$restProps}
    />
  {:else if type === "checkbox"}
    <input
      class={styles.check}
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
      class={styles.area}
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
    <button type="button" class={styles.show} on:click={toggleShow}>
      {#if icons}
        <img
          class={styles.showIcon}
          src={show ? icons.show : icons.hide}
          alt={t("forms:show-hide")}
        />
      {:else}
        {t("forms:show-hide")}
      {/if}
    </button>
  {/if}
  {#if $errors[name]}
    <span class={styles.error} transition:fade|local>
      {t(`${$errors[name]}`)}
    </span>
  {/if}
</label>
