<svelte:options immutable />

<script lang="ts">
  import { createEventDispatcher, onDestroy } from "svelte";
  import { fade } from "svelte/transition";
  import { generateDatas } from "$lib/logic/utils/objects.js";
  import { useForm } from "$lib/logic/stores/form.js";

  import type { Option, Props } from "./Option.proptypes.js";

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

  $: externalOptionsStyles = styles?.options ? ` ${styles.options}` : "";
  $: externalFieldStyles = styles?.field ? ` ${styles.field}` : "";
  $: externalLabelStyles = styles?.label ? ` ${styles.label}` : "";
  $: externalInputStyles = styles?.input ? ` ${styles.input}` : "";
  $: externalContentStyles = styles?.content ? ` ${styles.content}` : "";
  $: externalErrorStyles = styles?.error ? ` ${styles.error}` : "";

  onDestroy(() => {
    setField(name, undefined);
  });
</script>

<fieldset class="options{externalOptionsStyles}" {disabled}>
  {#each options as { id: idOption, value, label, a11y } (`${name}-option-${value}`)}
    {@const id = idOption ?? `${name}-option-${value}`}
    <label
      for={id}
      class="field{externalFieldStyles}"
      data-checked={$data[name] === value}
      title={a11y?.title ?? label}
      {...datasets}
    >
      <p class="label{externalLabelStyles}">
        {label}
      </p>
      <input
        class="input{externalInputStyles}"
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
        <div class="content{externalContentStyles}">
          <slot />
        </div>
      {/if}
    </label>
  {/each}
  {#if $errors[name]}
    <span class="error{externalErrorStyles}" transition:fade>
      <slot name="error" error={$errors[name]}>
        {$errors[name]}
      </slot>
    </span>
  {/if}
</fieldset>

<style>
  .options {
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
  .field {
    display: block;
    box-sizing: inherit;
    flex: 1;
    width: 100%;
    padding: 8px;
    border-radius: var(--s-form-radius);
    border: var(--s-form-border);
    &:hover {
      cursor: pointer;
      border-color: var(--s-form-accent);
      border-width: 2px;
    }
    &[data-checked="true"] {
      border-color: var(--s-form-success);
      border-width: 2px;
    }
    &[data-checked="false"] {
      & > p {
      }
    }
  }
  .label {
    width: 100%;
    box-sizing: inherit;
    padding: 0;
    margin: 0;
    color: var(--s-form-text);
    font-size: 16px;
    line-height: 18px;
    font-family: var(--s-form-font);
    text-align: center;
  }
  .input {
    position: absolute;
    display: block;
    box-sizing: inherit;
    margin: 0;
    visibility: hidden;
    top: 0;
    left: 0;
    z-index: 0;
  }
  .content {
    width: 100%;
    box-sizing: inherit;
  }
  .error {
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
