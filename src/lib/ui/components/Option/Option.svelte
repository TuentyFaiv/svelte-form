<script lang="ts">
  import { getContext, onDestroy } from "svelte";
  import { fade } from "svelte/transition";

  import type { InputContext } from "$lib/logic/typing/globals.proptypes";
  import type { Option, Props } from "./Option.proptypes";

  import * as stylesinternal from "./Option.styles";

  export let label: Props["label"];
  export let name: Props["name"];
  export let id: Props["id"];
  export let value: Props["value"];
  export let context: Props["context"] = "form";
  export let onSelect: Props["onSelect"] = null;

  let input: Option;

  const form = getContext<InputContext>(context);
  const {
    data,
    errors,
    styles: { option: styles },
    check,
    setField,
    t,
  } = $form;

  $: title = `${label} ${$errors[name] ? t(`${$errors[name]}`) : ""}`;

  async function onCheck(event: FocusEvent | Event) {
    await check(event);
    onSelect?.(value);
  }

  onDestroy(() => {
    setField(name, undefined);
  });
</script>

<label
  for={id}
  class={styles.field ?? stylesinternal.field}
  data-checked={$data[name] === value}
  {title}
>
  <p class={styles.label ?? stylesinternal.label}>{label}</p>
  <input
    class={styles.input ?? stylesinternal.input}
    type="radio"
    {id}
    bind:this={input}
    on:blur={onCheck}
    on:input={onCheck}
    {name}
    {value}
    {...$$restProps}
  />
  <div class={styles.content ?? stylesinternal.content}>
    <slot />
  </div>
  {#if $errors[name]}
    <span class={styles.error ?? stylesinternal.error} transition:fade|local>
      {t(`${$errors[name]}`)}
    </span>
  {/if}
</label>
