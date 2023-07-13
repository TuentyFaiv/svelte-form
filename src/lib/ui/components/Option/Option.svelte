<svelte:options immutable />

<script lang="ts">
  import { createEventDispatcher, onDestroy } from "svelte";
  import { fade } from "svelte/transition";
  import { cx } from "@emotion/css";
  import { generateDatas } from "$lib/logic/utils/objects.js";
  import { useForm } from "$lib/logic/stores/form.js";

  import type { Option, Props } from "./Option.proptypes.js";

  import * as stylesinternal from "./Option.styles.js";

  export let name: Props["name"];
  export let context: Props["context"] = "form";
  export let disabled: Props["disabled"] = false;
  export let datas: Props["datas"] = {};
  export let options: Props["options"] = [];

  let inputs: Record<string, Option> = {};

  const dispatch = createEventDispatcher<{ choose: string }>();
  const form = useForm(context);
  const { data, errors, styles: ctxStyles, check, setField } = $form;
  $: ({ option: styles } = $ctxStyles);

  function onSelect(value: string) {
    dispatch("choose", value);
  }

  async function onCheck(event: FocusEvent | Event) {
    await check(event);
    onSelect((event.target as HTMLInputElement).value);
  }

  $: datasets = generateDatas(datas);

  onDestroy(() => {
    setField(name, undefined);
  });
</script>

<fieldset class={cx(stylesinternal.options, styles?.options ?? "")} {disabled}>
  {#each options as { id: idOption, value, label, a11y } (`${name}-option-${value}`)}
    {@const id = idOption ?? `${name}-option-${value}`}
    <label
      for={id}
      class={cx(stylesinternal.field, styles?.field ?? "")}
      data-checked={$data[name] === value}
      title={a11y?.title ?? label}
      {...datasets}
    >
      <p class={cx(stylesinternal.label, styles?.label ?? "")}>
        {label}
      </p>
      <input
        class={cx(stylesinternal.input, styles?.input ?? "")}
        type="radio"
        {id}
        bind:this={inputs[id]}
        on:blur={onCheck}
        on:input={onCheck}
        {name}
        {value}
        {...$$restProps}
      />
      {#if $$slots.default}
        <div class={cx(stylesinternal.content, styles?.content ?? "")}>
          <slot />
        </div>
      {/if}
    </label>
  {/each}
  {#if $errors[name]}
    <span class={cx(stylesinternal.error, styles?.error ?? "")} transition:fade>
      <slot name="error" error={$errors[name]}>
        {$errors[name]}
      </slot>
    </span>
  {/if}
</fieldset>
