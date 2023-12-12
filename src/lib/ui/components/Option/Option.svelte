<svelte:options immutable />

<script lang="ts">
  import { createEventDispatcher, onDestroy } from "svelte";
  import { fade } from "svelte/transition";
  import { generateDatas } from "$lib/logic/utils/objects.js";
  import { useForm } from "$lib/logic/stores/form.js";
  import { getStyle } from "$lib/logic/utils/styles.js";

  import type { UserEvent } from "$lib/logic/typing/globals/types.js";
  import type { Events, Option, Props } from "./Option.proptypes.js";

  export let name: Props["name"];
  export let context: Props["context"] = "form";
  export let disabled: Props["disabled"] = false;
  export let datas: Props["datas"] = {};
  export let options: Props["options"] = [];

  let inputs: Record<string, Option> = {};

  const dispatch = createEventDispatcher<Events>();
  $: form = useForm(context);
  $: ({ data, errors, styles: ctxStyles, check, setField } = $form);
  $: ({ option: styles, replace } = $ctxStyles);

  function onSelect(value: string) {
    dispatch("choose", value);
  }

  async function onCheck(
    event: UserEvent<HTMLInputElement, FocusEvent | Event>,
  ) {
    await check(event);
    onSelect(event.currentTarget.value);
  }

  $: datasets = generateDatas(datas);

  $: optionsStyle = getStyle({
    replace,
    style: "svform-options",
    external: styles?.options,
  });
  $: fieldStyle = getStyle({
    replace,
    style: "svform-field",
    external: styles?.field,
  });
  $: labelStyle = getStyle({
    replace,
    style: "svform-label",
    external: styles?.label,
  });
  $: inputStyle = getStyle({
    replace,
    style: "svform-input",
    external: styles?.input,
  });
  $: contentStyle = getStyle({
    replace,
    style: "svform-content",
    external: styles?.content,
  });
  $: errorStyle = getStyle({
    replace,
    style: "svform-error",
    external: styles?.error,
  });

  onDestroy(() => {
    setField(name, undefined);
  });
</script>

<fieldset class={optionsStyle} {disabled}>
  {#each options as { id: idOption, value, label, a11y } (`${name}-option-${value}`)}
    {@const id = idOption ?? `${name}-option-${value}`}
    <label
      for={id}
      class={fieldStyle}
      data-checked={$data[name] === value}
      title={a11y?.title ?? label}
      {...datasets}
    >
      <p class={labelStyle}>
        {label}
      </p>
      <input
        class={inputStyle}
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
        <div class={contentStyle}>
          <slot />
        </div>
      {/if}
    </label>
  {/each}
  {#if $errors[name]}
    <span class={errorStyle} transition:fade={{ duration: 200 }}>
      <slot name="error" error={$errors[name]}>
        {$errors[name]}
      </slot>
    </span>
  {/if}
</fieldset>

<style>
  .svform-options {
    position: relative;
    box-sizing: border-box;
    display: flex;
    width: 100%;
    padding: 0;
    margin: 0;
    justify-content: center;
    align-items: stretch;
    border: none;
    gap: 10px;
    flex-wrap: wrap;
    z-index: 0;
  }
  .svform-field {
    display: block;
    box-sizing: inherit;
    flex: 1;
    width: 100%;
    padding: 4px;
    border-radius: var(--s-form-radius);
    border: var(--s-form-border);
  }
  .svform-field:hover {
    cursor: pointer;
    border-color: var(--s-form-accent);
    padding: 3px 4px;
    border-width: 2px;
  }
  .svform-field[data-checked="true"] {
    border-color: var(--s-form-success);
    padding: 3px 4px;
    border-width: 2px;
  }
  /* .svform-field[data-checked="false"] {
  }
  .svform-field[data-checked="false"] > p {
  } */
  .svform-label {
    width: 100%;
    box-sizing: inherit;
    padding: 0;
    margin: 0;
    color: var(--s-form-text);
    font-size: 14px;
    line-height: 16px;
    font-family: var(--s-form-font);
    text-align: center;
  }
  .svform-input {
    position: absolute;
    display: block;
    box-sizing: inherit;
    margin: 0;
    visibility: hidden;
    top: 0;
    left: 0;
    z-index: 0;
  }
  .svform-content {
    width: 100%;
    box-sizing: inherit;
  }
  .svform-error {
    position: absolute;
    display: block;
    box-sizing: inherit;
    padding: 3px 5px;
    background-color: var(--s-form-error);
    color: var(--s-form-text-error);
    font-size: 12px;
    line-height: 12px;
    font-family: var(--s-form-font);
    border-radius: var(--s-form-radius);
    transform: translateY(115%);
    left: 0;
    bottom: 0;
    cursor: default;
    z-index: 0;
  }
</style>
